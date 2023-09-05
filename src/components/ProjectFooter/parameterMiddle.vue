<template>
    <div class = "parameterMiddle">
        <div class="parameterMiddle-header">
            <div id="parameterMiddle-title">Epidemic</div>
        </div>

        <el-scrollbar style="height: 100%;">
        <div class="parameterMiddle-container" style="max-height: 100px;" >
            <div class = "container-top">
                <!-- <span class="basicNum">BasicNumber(R0)</span> -->
                <span class="beta">Beta</span>
                <el-slider class="sli-beta"  input-size="mini" v-model="epidemicParames['Beta']" label="11" show-input
                :show-input-controls="false" :max="500" :format-tooltip="formatTooltip" ></el-slider>
            </div>
            <div class = "container-middle">
                <!-- <span class="infectiousTime">InfectiousTime(Tf)</span> -->
                <span class="alpha">Alpha</span>
                <el-slider class="sli-alpha"  input-size="mini" v-model="epidemicParames['Alpha']" label="11" show-input
                :show-input-controls="false" :max=1 :step="0.001" :format-tooltip="formatTooltip" ></el-slider>
            </div>
            <div class = "container-bottom">
                <span class="gamma">Gamma</span>
                <el-slider class="sli-gamma"  input-size="mini" v-model="epidemicParames['Gamma']" label="11" show-input
                :show-input-controls="false" :max=1 :step="0.001" :format-tooltip="formatTooltip" ></el-slider>
            </div>
            <div class="add" v-for="(item, index) in this.$store.state.SliderArr[1]" :key="index">
           <el-input class="title"  v-model="epidemicParames['names2'][index]" placeholder="参数名" clearable></el-input>
          <el-slider
            class="sli"
            input-size="mini"
            v-model="epidemicParames['values2'][index]"
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
            <el-icon><Close/></el-icon>
            </el-button
          >
            </div>
        </div>  
        </el-scrollbar>
    </div>
</template>

<script>
export default {
 data() {
   return {
    epidemicParames:{
     Beta: 0,
     Alpha: 0,
     Gamma: 0,
     array: [],
     names2: [],
     values2: []
    }
   }
  },
 watch: {
      epidemicParames: {
        handler(newVal) {
          this.$store.dispatch('setParamesAsync', { 'name': 'epidemicParames', 'value': newVal })
        },
        immediate: true,
        deep: true
      },
    },
 methods: {
   formatTooltip(val) {
     return val;
   },
   del(index) {
       
        this.epidemicParames['names2'].splice(index, 1);
        this.epidemicParames['values2'].splice(index, 1); //先删除form中value对应索引的值
        this.$store.dispatch('delSliderArrAsync',{'name':1,'index':index})//然后删除array对应索引的值，实现点击删除按钮，减少input框效果
   },
 }
}
</script>

<style scoped src='./parameterMiddle.css'>
</style>
<style scoped src='../../assets/styles/slider.css'>
</style>