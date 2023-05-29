import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"

const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({commit}){   //修改购物车列表数据
        let result = await reqCartList()
        //console.log(result)  //先测试一下能否获得到。
        if(result.code == 200){
            commit("GETCARTLIST",result.data)
        }
    },
    async deleteCartListBySkuId({commit},skuId){  //删除购物车某一个产品
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("fail"))
        }
    },
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("fail"))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){  //删除全部产品 (getters换成state也行)
                            //调用context中的别的
        let PromiseAll = []  
        getters.cartList.cartInfoList.forEach(item=>{  //遍历购物车中的全部商品
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''  //做一个判断，否则无论是否是想删的，全部都会删掉  (返回值是promise类型)
            PromiseAll.push(promise)  //promise为删除的,如果全部删除成功，则返回成功
        })
        return Promise.all(PromiseAll)  //返回结果
    },
    updateAllCartIsChecked({dispatch,state},isChecked){     //修改全部产品的状态
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }   
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
}

export default{
    state,
    mutations,
    actions,
    getters
}