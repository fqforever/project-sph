//路由配置信息:

//引用一级路由组件
//import Home from '../pages/Home'  
 
// const foo = ()=>{     //路由懒加载
//     return import("../pages/Home")
// }

import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引用二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [  
    {
        path: '/home',
        //component: Home,
        //component:foo,     //路由懒加载
        component:()=>import("../pages/Home"),  //懒加载的简写形式
        meta: { show: true } //路由元信息 (显不显示Footer)
    },
    {
        name: 'search',
        path: '/search/:keyword?', //params占位 (加一个问号，表示可传可不传)
        component: Search,
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    //重定向，在项目跑起来的时候，访问/，立马定向到首页
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/detail/:skuid', //路由跳转的时候需要带上产品的id给详情页面
        component: Detail,
        meta: { show: false }
    },
    {
        name:'addcartsuccess',
        path: '/addcartsuccess', 
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        name:'shopcart',
        path: '/shopcart', 
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade', 
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path == "/shopcart"){  //从shopcart来的才能去trade页面
                next()
            }else{
                next(false)  //如果不是从shopcart来的，就从哪里来的还回哪里去
            }
        }
    },
    {
        path: '/pay', 
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path == "/trade"){  
                next()
            }else{
                next(false)  
            }
        }
    },
    {
        path: '/paysuccess', 
        component: PaySuccess,
        meta: { show: true },
    },
    {
        path: '/center', 
        component: Center,
        meta: { show: true },
        children:[   //二级路由组件
            {
                path:"myorder",
                component:MyOrder
            },
            {
                path:"grouporder",
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'   //重定向(上来就显示myorder)
            }
        ]
    },
]