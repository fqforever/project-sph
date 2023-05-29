import Vue from 'vue'
import Vuex from 'vuex'  //和路由一样的过程

Vue.use(Vuex)

// const state  = {
//     count:1
// }
// const mutations = {
//     ADD(state,count){
//         state.count++
//     }
// }
// const actions = {
//     add(context){
//         context.commit('ADD')
//     }
// }
// const getters = {} 
// export default new Vuex.Store({   //对外暴露store的一个实例
//     state,
//     mutations,
//     actions,
//     getters
// })

import home from './home'  //vuex模块化
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})

