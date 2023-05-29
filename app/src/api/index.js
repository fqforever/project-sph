//当前这个模块：对API进行统一管理
import requests from "./request"; 

//三级联动接口     /api/product/getBaseCategoryList  get   无参数 (给的文档中)

export const reqCategoryList = ()=>{  //将接口封装成一个函数(只要调用这个函数，就向服务器发请求)
    //发请求
    return requests({
        url:'/product/getBaseCategoryList', //接口文档中给的地址(baseurl写了。。)
        methods: 'get'
    })
}

import mockRequests from './mockAjax'  

export const reqGetBannerList = ()=>{
    return mockRequests({
        url:'/banner',  //模拟服务器的地址
        methods:'get'
    })
}

export const reqFloorList = ()=>{
    return mockRequests.get("/floor")  //axios的两种写法
}

//获取search模块数据  接口文档中：  地址：/api/list  请求方式：post (请求要带参数)  调用的时候要至少传一个空对象: reqGetSearchInfo({})
export const reqGetSearchInfo = (params)=>{  //这个函数需要接受外部传递的参数
    return requests({
        url:'/list',
        method:"post",//没有s, 且双引号(否则报错，不知道为啥和上面不一样) 
        data:params    //vue中的是methods
    })
}

//获取detail模块数据       地址： /api/item/{ skuId }   get
export const reqGoodInfo = (skuId)=>{  //传的参数告诉服务器你具体要谁的信息
    return requests({
        url:`/item/${skuId}`,
        method:"get"
    })
}

//将产品添加到购物车，或者更新已添加产品的个数(存储到database)   /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:"post"
    })
}

//获取购物车列表数据的接口
export const reqCartList = ()=>{
    return requests({
        url:`/cart/cartList`,
        method:"get"
    })
}

//删除购物车产品的接口
export const reqDeleteCartById = (skuId)=>{
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:"delete"  //这里大小写都行
    })
}

//修改商品的选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>{
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:"get" 
    })
}

//获取验证码的接口
export const reqGetCode = (phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:"get" 
    })
}

//注册
export const reqUserRegister = (params)=>{   //url中没有参数的位置，则写在data中
    return requests({
        url:`/user/passport/register`,
        method:"post",
        data:params
    })
}

//登录
export const reqUserLogin = (params)=>{
    return requests({
        url:`/user/passport/login`,
        method:"post",
        data:params
    })
}

//获取用户的登录信息(需要带着token向服务器要信息)
export const reqUserInfo = ()=>{
    return requests({
        url:`/user/passport/auth/getUserInfo`,
        method:"get"
    })
}

//退出登录
export const reqLogout = ()=>{
    return requests({
        url:`/user/passport/logout`,
        method:"get"
    })
}

//获取用户地址信息
export const reqAddressInfo = ()=>{
    return requests({
        url:`user/userAddress/auth/findUserAddressList`,
        method:"get"
    })
}

//获取交易订单信息
export const reqOrderInfo = ()=>{
    return requests({
        url:`/order/auth/trade`,
        method:"get"
    })
}

//提交订单
export const reqSubmitOrder = (tradeNo,data)=>{  //query+data的方式
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:"post",
        data:data
    })
}

//获取支付订单信息(后台告诉应该付多少钱)
export const reqPayInfo = (orderId)=>{  //query+data的方式
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

//查询订单支付状态
export const reqPayStatus = (orderId)=>{  //query+data的方式
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

//获取个人中心我的订单列表
export const reqMyOrderList = (page,limit)=>{  //query+data的方式
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}
