//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router' // 引用插件
//使用插件
Vue.use(VueRouter)

import store from '@/store'  //引入store(导航守卫要用里面的token)

// import Home from '../pages/Home'
// import Search from '../pages/Search'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import Detail from '../pages/Detail'

import routes from './routes'
//配置路由
let router = new VueRouter({
    routes, //(完整写法：routes:routes) 

    //[ //
    //     {
    //         path:'/home',
    //         component:Home,
    //         meta:{show:true} //路由元信息
    //     },
    //     {
    //         name:'search',
    //         path:'/search/:keyword?', //params占位 (加一个问号，表示可传可不传)
    //         component:Search,
    //         meta:{show:true}
    //     },
    //     {
    //         path:'/login',
    //         component:Login,
    //         meta:{show:false}
    //     },
    //     {
    //         path:'/register',
    //         component:Register,
    //         meta:{show:false}
    //     },
    //     //重定向，在项目跑起来的时候，访问/，立马定向到首页
    //     {
    //         path:'*',
    //         redirect:'/home'
    //     },
    //     {
    //         path:'/detail/:skuid', //路由跳转的时候需要带上产品的id给详情页面
    //         component:Detail,
    //         meta:{show:false}
    //     }
    // ]

    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }  //具体顶部0px
    }
})

router.beforeEach(async (to, from, next) => {   //配置全局前置守卫
    next()//为了测试，先全都放行
    let token = store.state.user.token
    let name = store.state.userInfo.name
    if (token) {
        if (to.path == '/login') {  //登录了还去login
            next('/home')
        } else {                    //登录了但去的不是login
            if (name) {   //如果用户名已有，则放行
                next()
            } else {      //如果没有，则派发action，存储用户信息后再跳转
                try {
                    await store.dispatch('getUserInfo')  //注意async的位置在上面
                    next()
                } catch (error) {   //捞不到数据的情况：token失效=>清除token
                    await store.dispatch('userLogout')  //不再trycatch套娃了
                    next('/login')
                }
            }
        }
    } else {         //未登录,不能去交易相关，不能去支付相关(pay,paysuccess),不能去个人中心
        let toPath = to.path  //获取用户想要去的页面
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {   //用indexOf (toPath是字符串)，就可以把pay和paysuccess全部包括而不用写两遍
            next('/login?redirect'+ toPath)  //把未登录时候想去的地方存在query中(相应的，login路由那里要改一下)
        } else {
            next()
        }

    }
})

export default router