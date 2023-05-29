let myPlugins = {}

myPlugins.install = function(Vue,options){
       //Vue.prototype.$bus:任何组件都能使用
    Vue.directive(options.name,(element,params)=>{   //不是directioves,没有s!!!
        element.innnerHTML = params.value.toUpperCase()
    })
}

export default myPlugins