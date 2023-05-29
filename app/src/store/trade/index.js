import { reqAddressInfo,reqOrderInfo } from "@/api"
const state = {
    address:[],
    orderInfo:{}
}

const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}

const action = {  
    async getUserAddress({commit}){    //获取用户地址信息
        let result = await reqAddressInfo()
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
        }
    },
    async getOrderInfo({commit}){    //获取交易订单信息
        let result = await reqOrderInfo()
        if(result.code == 200){
            commit('GETORDERINFO',result.data)
        }
    },
}

const getters = {

}

export default{
    state,
    mutations,
    action,
    getters
}


