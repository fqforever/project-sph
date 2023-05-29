<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props:['list'],  //接收外部传来的数据
  watch:{  
    list:{
      immediate:true, //因为数据是父亲给的，已经是完整的了，所以数据不会发生变化。
                     //加一个immediate，使其一上来就监听一次。否则数据不变，监听不到
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          //$nextTick可以保证页面中的结构一定有的，经常和很多插件一起使用(因为很多插件都需要DOM存在)
          var mySwiper = new Swiper(this.$refs.cur, { //vue当中用ref，就不直接操作dom了
            //direction: 'vertical', // 垂直切换选项 (不写的话，默认水平方向切换)
            loop: true, // 循环模式选项 (false的话，点到最后一个就点不了了)
            // 如果需要分页器 (底部的小球球)
            pagination: {
              el: ".swiper-pagination",
              clickable: true, //点击小球也可以切换，不写默认为false
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    }
  }
};
</script>

<style>
</style>