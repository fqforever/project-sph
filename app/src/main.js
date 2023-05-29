import Vue from 'vue'
import App from './App.vue'

//引入全局组件:
import TypeNav from '@/components/TypeNav'  //1三级联动
import Carsousel from '@/components/Carousel'  //2轮播图
import Pagination from '@/components/Pagination'  //3分页器
import { MessageBox } from 'element-ui';   //4 element按需引入(这里的不是Messagebox...找半天)

//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsousel.name,Carsousel)
Vue.component(Pagination.name,Pagination)
//Vue.component(Button.name,Button)       //全局注册

Vue.prototype.$msgbox = MessageBox;  //注册组件的时候，除了全局注册，还有一种写法是挂在原型上
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

import router from './router'//引入路由

import store from './store'  //引入仓库

//测试：
// import {reqCategoryList} from '@/api'
// reqCategoryList()  //一调用就发请求

import '@/mock/mockServe.js'  //只需要引入，不用import A from B(因为mockServejs文件根本没有暴露)
import "swiper/css/swiper.css" //因为有多处用到这个样式，所以直接在入口文件处引入
                               //样式没有import A from B

import * as API from '@/api'      //统一接收api文件夹里面全部请求函数(这样就不用引入很多函数了)
import atm from '@/assets/1.jpg'    //统一引入(奥特曼)

import VueLazyload from 'vue-lazyload'  //引入图片懒加载插件
Vue.use(VueLazyload,{
  loading:atm        //懒加载默认图片  
})

import myPlugins from '@/plugins/myPlugins' //引入自定义插件
Vue.use(myPlugins,{
  name:'upper'
})

import "@/plugins/validate.js"   //引入表单验证

new Vue({
  render: h => h(App),
  beforeCreate(){      
    Vue.prototype.$bus = this   //全局事件总线的配置(清除关键字的时候用到)
    Vue.prototype.$API = API    //挂载到原型对象上(这样所有组件都能用)
  },
  router,                     //注册路由
  store            //注册仓库 (然后组件实例对象身上就会多了一个$store的属性 )
}).$mount('#app')


