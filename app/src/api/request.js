//对于axios进行二次封装
import axios from "axios"

//引入进度条
import nprogress from 'nprogress' 
import "nprogress/nprogress.css"

//在当前模块中引入store
import store from '@/store'     

const requests =  axios.create({  //创造一个requests接口
    //配置对象
    baseURL:"/api", //基础路径
    timeout:5000  //超时5ss
})

requests.interceptors.request.use((config)=>{ //请求拦截器：在发请求之前，请求拦截器可以检测，可以在请求发出之前做一些事情
    if(store.state.detail.uuid_token){
        config.headers.userTempId =  store.state.detail.uuid_token   //给请求头添加一个字段userTempId(这个字段是和后台老师商量好的)
    }

    if(store.state.user.token){  //需要携带token给服务器(token字段也是和后台老师商量好的)
        config.headers.token = store.state.user.token
    }

    nprogress.start() //进度条开始

    return config  //config:配置对象，对象里面有一个属性很重要(header请求头)
})

requests.interceptors.response.use((res)=>{  //相应拦截器:响应之后
    nprogress.done()//进度条结束
    
    return res.data  //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一个事情
},(error=>{   //响应失败的回调函数
    return Promise.reject(new Error('fail'))
}))

export default requests  //对外暴露