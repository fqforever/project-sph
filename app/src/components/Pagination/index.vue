<template>
  <div class="pagination">
    <!-- (左) -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start >1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start >2">···</button>
    <!-- (中) -->
    <button
      v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo == page}">
      {{ page }}
    </button>
    <!-- (右) -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo == totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],//接收
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize); //向上取整
    },
    startNumAndEndNum() {   //关键点
      //计算连续的页码的起始数字与结束数字
      let start = 0, //先声明两个变量并赋予起始值
        end = 0;
      if (this.continues > this.totalPage) {
        //不正常现象(总页数还没有连续页码多)
        start = 1;
        end = this.totalPage;
      } else {
        //正常现象
        start = this.pageNo - parseInt(this.continues / 2);  //parseInt是向下取整
        end = this.pageNo + parseInt(this.continues / 2);
        if (start < 1) {
          //把出现不正常的现象(start为0或者是负数)纠正
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          //把出现不正常的现象(end数字大于总页码)纠正
          end = this.totalPage;
          start = this.totalPage - this.continues + 1; //(举一个实际的例子就懂了)
        }
      }
      return { start, end }; //这一句千万别忘了！(将修改后的值return出去)
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.class{
    background-color: skyblue;
}
</style>
