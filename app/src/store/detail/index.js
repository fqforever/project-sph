import { reqGoodInfo,reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid_token'  //封装游客身份模块uuid,生成一个随机字符串(生成之后不能再变了)
const state = {
    goodInfo:{},
    uuid_token:getUUID()  //游客临时身份(加入购物车时生成)
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    async getGoodInfo({commit},skuId){     //获取产品信息 
        let result = await reqGoodInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){  //加入购物车
        let result = await reqAddOrUpdateShopCart(skuId,skuNum) //注意这里：前台将数据带给服务器，服务器写入数据成功之后，并没有返回其他的数据，只是返回code=200,代表这次操作成功。所以不用三连环来存储服务器返回的数据
        if(result.code == 200){  //代表服务器加入购物车成功
            return "ok"
        }else{
            return Promise.reject(new Error('fail'))  //加入购物车失败
        }
    }
}
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView ||{} //服务器数据没回来的时候，初始数据是空对象，其categoryView为undefined 。所以或一下，至少返回一个空对象
    },
    skuInfo(state){  //简化产品信息
        return state.goodInfo.skuInfo ||{} 
    },
    spuSaleAttrList(state){  //产品售卖属性的简化
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}