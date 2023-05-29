<template>
  <div class="type-nav">
    <div class="container">
      <!-- 给全部商品分类外面加一个大盒子 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">  
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="gosearch">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
              <h3 @mouseenter="changeIndex(index)">
                <a 
                :data-categoryName="c1.categoryName"
                :data-catagory1Id="c1.categoryId">{{c1.categoryName}}</a>
                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                <!-- 声明式导航会出现卡顿现象，改用a标签 -->
              </h3>
              <!-- 二级,三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a 
                      :data-categoryName="c1.categoryName" 
                      :data-catagory2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <a 
                        :data-categoryName="c1.categoryName" 
                        :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          </div>
        </transition>
        
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//全局组件都放在components下

import { mapState } from "vuex";

//import _ from 'lodash'  // 这种引入方式是把lodash全部功能函数引入
import throttle from "lodash/throttle"; //按需引入

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, //别设置为0，因为index的初始值为0
      show: true,  //默认情况为显示
    };
  },
  mounted() {
    //因为路由跳转，组件进行销毁，就多次创建仓库(后来放到了app.vue中)

    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        //state参数，即为大仓库中的数据
        return state.home.categoryList; //当然也可以用箭头函数的简写形式
      },
    }),
  },
  methods: {
    // changeIndex(index){ //鼠标移入事件
    //   this.currentIndex = index
    // },
    changeIndex: throttle(function (index) {
      //es5，节流写法
      this.currentIndex = index;
    }, 50),

    leaveIndex() {
      //鼠标移出事件
      this.currentIndex = -1; //注意this别丢了
      if (this.$route.path != "/home") {
        //判断是search组件时，才会执行
        this.show = false;
      }
    },
    gosearch(event) {
      //this.$router.push('/search')
      let node = event.target;
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;    //节点有一个dataset属性，可以获取节点的自定义属性
      if (categoryname) {   //把a挑出来
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {        //区分具体是哪一个a
          query.category1Id = category1id; 
        } else if (category2id) {     //区分具体是哪一个a
          query.category2Id = category2id;
        } else {                     //区分具体是哪一个a
          query.category3Id = category3id;
        }
        // location.query = query //给location配置对象添加query属性
        // this.$router.push(location);

        //(合并参数)跳转之前来个判断
        if (this.$route.params){   //判断如果路由跳转的时候，带有params参数，也捎带传递过去
          location.params = this.$route.params
          location.query = query;
          this.$router.push(location);
          }
      }
    },
    enterShow() {
      //当鼠标移入时，让商品分类列表进行展示
      this.show = true;
    },
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画样式
    .sort-enter{ //进入状态
      height: 0px;
    }
    .sort-enter-to{  //结束状态
      height: 461px;
    }
    .sort-enter-active{  //定义动画的时间，速率
      transition: all 0.5s linear;
    }
  }
}
</style>