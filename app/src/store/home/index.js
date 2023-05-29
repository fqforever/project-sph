import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api/index.js"

//home模块的小仓库
const state = {
    categoryList:[], //state中数据的初始值别瞎写，服务器返回的是数据，那就写数组
    bannerList:[], //轮播图初始数据
    floorList:[] //floor组件初始数据
}
const mutations = {
    CATEGORYLIST(state,categoryList){ //修改state，修改值为categoryList
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    //通过api里面的接口函数调用，向服务器发请求，获取服务器数据:
    async categoryList({commit}){
        let result = await reqCategoryList() //await等待返回的结果
        if(result.code == 200){
            commit("CATEGORYLIST",result.data)
        }
    },
    //获取轮播图的数据:(mock出来的)
    async getBannerList({commit}){ //开始三连环：括号里面写：{commit}
        let result = await reqGetBannerList()  
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}