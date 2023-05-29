//vee-validate插件：表单验证区域
import Vue from "vue";
import VeeValidate from "vee-validate"
import zh_CN from 'vee-validate/dist/locale/zh_CN.js'  //使提示信息为中文
Vue.use(VeeValidate)

//表单验证  (这里会用就行，不用死记硬背)
VeeValidate.Validator.localize('zh_CN',{
    message:{
        ...zh_CN.message,  //上面import这里使用
        is:(fileld)=> `${field}必须与密码相同`
    },
    attributes:{
        phone:'手机号', //让每个英文字段展示的内容
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        agree:'协议'
    }
})

//自定义校验规则(协议前的勾选)
VeeValidate.Validator.extend('agree',{
    validate:value=>{
        return value
    },
    getMessage:field=>field + '必须同意'
})