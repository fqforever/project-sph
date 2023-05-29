//search模块的小仓库
import { reqGetSearchInfo } from "@/api"
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({commit},params={}){ //获取search数据 
        let result = await reqGetSearchInfo(params) //params形参，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象(所以上面给一个默认参数{})
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
const getters = {  //getters为简化数据而生
    goodsList(state){  //形参state是当前仓库中的，并非大仓库中的
        return state.searchList.goodsList || [] //没网或者网速较慢的时候，return的是undefined,再遍历就不对了
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}