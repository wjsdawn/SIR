<template>
  <div class="parameterLeft">
    <div class="parameterLeft-header">
      <div class="parameterLeft-title">Location</div>
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
          v-model="localParames['population']"
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
          v-model="localParames['days']"
          show-input
          :show-input-controls="false"
          :max="400"
          :format-tooltip="formatTooltip"
        ></el-slider>
      </div>
      
      <div class="add" v-for="(item, index) in this.$store.state.SliderArr[0]" :key="index">
        <!-- <span class="title">Population(N)</span> -->
        <el-input class="title"  v-model="localParames['names1'][index]" placeholder="输入参数名" clearable></el-input>
        <el-slider
          class="sli"
          input-size="mini"
          v-model="localParames['values1'][index]"
          label="11"
          show-input
          :show-input-controls="false"
          :max="50000000"
          :format-tooltip="formatTooltip"
        ></el-slider>
        <el-button
          class="delete"
          size="small"
          @click="del(index)">
          <el-icon ><Close/></el-icon>
          </el-button
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
        localParames:{
          population: null,
          days: null,
          array: [], //创建一个数组
          names1: [], //接收每个input框的值
          values1: [],
      }
      };
  },
    watch: {
      localParames: {
        handler(newVal) {
          this.$store.dispatch('setParamesAsync', { 'name': 'localParames', 'value': newVal })
        },
        immediate: true,
        deep: true
      },
    },
    methods: {
      formatTooltip(val) {
        return val;
      },
      // add() {
      //   this.array.push(1); //通过添加array的值，增加input的个数
      // },
      del(index) {
        this.localParames['names1'].splice(index, 1);
        this.localParames['values1'].splice(index, 1); //先删除form中value对应索引的值
        this.$store.dispatch('delSliderArrAsync',{'name':0,'index':index})//然后删除array对应索引的值，实现点击删除按钮，减少input框效果
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

<style scoped src='./parameterLeft.css'>
</style>
<style scoped src='../../assets/styles/slider.css'>
</style>
