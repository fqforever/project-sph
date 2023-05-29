const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,  //关闭语法检查
  //配置代理服务器(跨域)
  devServer:{     //这里的代码可以在webpack官网的devServer模块找到
    proxy:{
      '/api':{  //前端发来的请求接口中有api,代理服务器就开始工作
        target:'http://gmall-h5-api.atguigu.cn', //后端服务器地址
        //pathRewrite:{'^/api':''}  //路径重写(前面重写过了，这里就不用了)
      }                   //注意配置文件配置好之后要重新运行一下
    }
  }
})
