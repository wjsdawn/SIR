<template>
    <div class="parameterRight2">
        <div class="parameterRight2-header">
            <div id="parameterRight2-title">Healthcare</div>
        </div>
        <el-scrollbar style="height: 100%;">
        <div class="parameterRight2-container" style="max-height: 100px;">     
           <div class="max-beds">
             <span class="maxBeds-title">Max Beds</span>
             <el-slider class="sli-maxBeds"  input-size="mini" v-model="healthParames['maxbed']" label="11" show-input
              :show-input-controls="false" :max="50000000" :format-tooltip="formatTooltip" ></el-slider>
           </div>
           <div class="add" v-for="(item, index) in this.$store.state.SliderArr[3]" :key="index">   
            <el-input class="title"  v-model="healthParames['names4'][index]" placeholder="输入参数名" clearable></el-input>
            <el-slider
              class="sli"
              input-size="mini"
              v-model="healthParames['values4'][index]"
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
            </el-button>
           </div>     
        </div>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
 data() {
   return {
     healthParames: {
       maxbed: 0,
       names4: [],
       values4: []
     }
   }
  },
  watch: {
    healthParames: {
        handler(newVal) {
          this.$store.dispatch('setParamesAsync', { 'name': 'healthParames', 'value': newVal })
        },
        immediate: true,
        deep: true
      },
    },
 methods: {
   formatTooltip(val) {
     return val / 100;
   },
   del(index) {
        this.healthParames['names4'].splice(index, 1);
        this.healthParames['values4'].splice(index, 1); //先删除form中value对应索引的值
        this.$store.dispatch('delSliderArrAsync',{'name':3,'index':index})//然后删除array对应索引的值，实现点击删除按钮，减少input框效果
      },
 }
}
</script>

<style scoped src="./parameterRight2.css" >
</style>
<style scoped src='../../assets/styles/slider.css'>
</style>