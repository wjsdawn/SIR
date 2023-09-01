<template>
  <div class="parameterLeft">
    <div class="parameterLeft-header">
      <div class="parameterLeft-title">Location</div>
      <div class="parameterLeft-button">
        <el-button
          type="primary"
          @click="add"
        >添加</el-button>
      </div>
    </div>
    <el-scrollbar style="height: 100%;">
      <!--为啥一定要把这个写在最外层，css中container的三个部分才能都生效横向felx呢-->
    <div class="parameterLeft-container" style="max-height: 100px;" >
     <!--这里把最大高度限制了 flex布局还有用吗-->
        <div class="population">
        <span class="population-title">Population(N)</span>
        <el-slider
          class="sli-population"
          input-size="mini"
          v-model="population"
          label="11"
          show-input
          :show-input-controls="false"
          :max="50000000"
          :format-tooltip="formatTooltip"
        ></el-slider>
       </div>
      <div class="days">
        <span class="days-title">Days</span>
        <el-slider
          class="sli-days"
          input-size="mini"
          v-model="days"
          label="11"
          show-input
          :show-input-controls="false"
          :max="50000000"
          :format-tooltip="formatTooltip"
        ></el-slider>
      </div>
      
      <div class="add" v-for="(item, index) in array" :key="index">
        <!-- <span class="title">Population(N)</span> -->
        <el-input class="title" style="width:20%;margin-right:10px" v-model="names1[index]" placeholder="参数名" clearable></el-input>
        <el-slider
          class="sli"
          input-size="mini"
          v-model="values1[index]"
          label="11"
          show-input
          :show-input-controls="false"
          :max="50000000"
          :format-tooltip="formatTooltip"
        ></el-slider>
        <el-button
          class="delete"
          type="danger"
          size="small"
          icon="el-icon-delete"
          circle
          @click="del(index)"
          >删除</el-button
        >
      </div>    
        <!-- </div> -->
   
    </div>
    </el-scrollbar>
  </div>
</template>

<script>

export default {
    data() {
      return {
        population: 0,
        days: 0,
        array: [], //创建一个数组
        names1: [], //接收每个input框的值
        values1: [],
      };
  },
    // computed: {
    //   this.$store.dispatch('saveDbSource', this.DbSource);
    // },
    watch: {
      population: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changePopulationAsync', newVal)
        }
      },
      days: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changeDaysAsync', newVal)
        }
      },
      names1: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changeNames1Async', newVal)
          // console.log('测试names1',newVal)
        },
        immediate: true,
        deep: true //对于数组来说要加上深度监听才行
      },
      values1: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changeValues1Async', newVal)
        },
        immediate: true,
        deep: true
      },
    },
    methods: {
      formatTooltip(val) {
        return val / 100;
      },
      add() {
        this.array.push(1); //通过添加array的值，增加input的个数
      },
      del(index) {
        this.names1.splice(index, 1);
        this.values1.splice(index, 1); //先删除form中value对应索引的值
        this.array.splice(index, 1); //然后删除array对应索引的值，实现点击删除按钮，减少input框效果
      },
      // async loadMore() {
      //   if (this.busy) return
      //   this.busy = true
      //   await new Promise(resolve => setTimeout(resolve, 2000))
      //   this.array.push(1);
      //   this.busy = false
      // }
  
    },
  };
</script>

<style scoped>
@import './parameterLeft.css';
</style>
