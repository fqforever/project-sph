<template>
  <div id="app">
    <Header/>
    <router-view ></router-view> 
    <!-- 路由组件不是直接使用名字作为标签了 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  mounted(){
    //优化：使得仓库早就准备好三级列表(这样请求只用执行一次)
    //挂载完毕后，可以向服务器发请求
    this.$store.dispatch("categoryList"); //通知vuex发请求，获取数据，储存于仓库中
  }
}
</script>

<style>

</style>
