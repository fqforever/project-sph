<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>

          <!-- 没有用户名(没登录) -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
            <!-- routeer-link的本质就是a标签，所有可以有样式 -->
          </p>

          <!-- 登录了 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" 
          class="input-error input-xxlarge" v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="gosearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name:'',
  data(){
    return{
      keyword:''
    }
  },
  methods: {
    gosearch(){
      //this.$router.push('/search/' + this.keyword  + "?keyword=" + this.keyword.toUpperCase()) //1字符串形式
      //this.$router.push(`/search/${this.keyword}?keyword=${this.keyword.toUpperCase()}`)  //2模板字符串形式
      // this.$router.push({  //3对象形式
      //   name:'search',
      //   params:{
      //     keyword:this.keyword
      //   },
      // })
      if(this.$route.query){  //判断如果有query参数，也带过去 (搜索框)
        let location = {name:"search",params:{keyword:this.keyword || undefined}}
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
    
    async logout(){
      try {
        await this.$store.dispatch('userLogout')  //如果退出成功
        this.$router.push('/home')   //回到首页
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    this.$bus.$on("clear",()=>{  //全局事件总线(on一个clear函数)(关键词的面包屑)
      this.keyword = ''
    })
  },
  computed:{
    userName(){
      return this.$store.state.user.userInfo.name
    }
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>