//登录与注册的模块(两个放一起的)
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import { setToken,getToken,removeToken } from '@/utils/token'
const state = {
    code:"",
    token:getToken(),   //另一种不用引入函数的写法：localStorage.getItem('TOKEN')：没存的时候就是null，和空字符串是一样的
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){  //清除肯定不带参了
        state.token = '',
        removeToken(),  //清除localstorage中的
        state.userInfo = {}
    }
}
const actions = {
    async getCode({commit},phone){   //获取验证码
        let result = await reqGetCode(phone)  //获取验证码的这个接口，把验证码返回，但是正常情况，是后台把验证码发到用户手机上，正常情况下是没有data的(没钱)
        if(result.code == 200){  //正常情况下没有这部分
            commit("GETCODE",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))  //对应alert的error.message内容
        }

    },
    async userRegister({commit},user){  //用户注册(传入的参数为一个对象)
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogin({commit},data){   //登录
        let result = await reqUserLogin(data)
        if(result.code == 200){
            commit("USERLOGIN",result.data.token)
            //localStorage.setItem("token",result.data.token)  //持久化存储token(本来就是字符串就不用转了)
            setToken(result.data.token) //装逼写法
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo({commit}){    //获取用户信息
        let result = await reqUserInfo()
        if(result.code == 200){
            commit("GETUSERINFO",result.data)  //根据请求头的token返回相应的信息
            return 'ok'  //没有promise，因为成功或者失败，未来组件一捞就知道了
        }else{
            return Promise.reject(new Error('fail'))  //后来导航守卫加的
        }
    },
    async userLogout({commit}){    //退出登录
        let result = await reqLogout()    //向服务器发一次请求，通知服务器清除token
        if(result.code == 200){
            commit("CLEAR")  //清除肯定不带参了(提交到mutation中操作state)。前台开始清
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}