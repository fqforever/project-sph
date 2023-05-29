import { v4 as uuidv4 } from 'uuid' 
export const getUUID = ()=>{   //要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储(localStorage)
    let uuid_token = localStorage.getItem('UUIDTOKEN') //先看本地存储有没有uuid，
    if(!uuid_token){    //如果本地没有
        uuid_token = uuidv4()   //就生成游客临时身份
        localStorage.setItem('UUIDTOKEN',uuid_token)   //本地存储，使之成为唯一的
    }
    return uuid_token  //封装函数一定要有返回值(否则返回值就是undefined)
}