//先引入mockjs模块
import Mock from 'mockjs'
//引入json数据格式  (为啥JSON数据格式根本没有对外暴露，但是可以引入呢？)
//因为webpack默认对外暴露的有：图片，JSON格式的数据 (js文件一定要对外暴露的)
import banner from './banner.json'
import floor from './floor.json'

//mock数据  (第一个参数是参数请求地址，第二个参数是请求数据)
Mock.mock("/mock/banner",{code:200,data:banner})  //模拟首页轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})