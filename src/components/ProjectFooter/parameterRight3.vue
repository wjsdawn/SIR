<template>
    <div class="parameterRight3">
        <div class="parameterRight3-header">
            <div id="parameterRight3-title">Vaccine</div>
        </div>
        <el-scrollbar style="height: 100%;">
        <div class="parameterRight3-container" style="max-height: 100px;">     
           <div class="vaccine-rate">
             <span class="vaccineRate-title">VaccineRate</span>
             <el-slider class="sli-vaccineRate"  input-size="mini" v-model="vaccaineParames['vacRate']" label="11" show-input
              :show-input-controls="false" :max=1 :step="0.001" :format-tooltip="formatTooltip" ></el-slider>
           </div>
           <div class="effective">
             <span class="effective-title">Effectiveness</span>
             <el-slider class="sli-effective"  input-size="mini" v-model="vaccaineParames['effecRare']" label="11" show-input
             :show-input-controls="false" :max=1 :step="0.001" :format-tooltip="formatTooltip" ></el-slider>
           </div>  
           <div class="add" v-for="(item, index) in this.$store.state.SliderArr[4]" :key="index">    
            <el-input class="title"  v-model="vaccaineParames['names5'][index]" placeholder="输入参数名" clearable></el-input>
            <el-slider
              class="sli"
              input-size="mini"
              v-model="vaccaineParames['values5'][index]"
              show-input
              :show-input-controls="false"
              :max="50000000"
              :format-tooltip="formatTooltip"></el-slider>
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
     vaccaineParames: {
       vacRate: 0,
       effecRare: 0,
       names5: [],
       values5: []
      }
   }
  },
  watch: {
    vaccaineParames: {
        handler(newVal) {
          this.$store.dispatch('setParamesAsync', {'name': 'vaccaineParames', 'value': newVal })
        },
        immediate: true,
        deep: true
      },
    },
 methods: {
   del(index) {
        this.vaccaineParames['names5'].splice(index, 1);
        this.vaccaineParames['values5'].splice(index, 1); //先删除form中value对应索引的值
        this.$store.dispatch('delSliderArrAsync',{'name':4,'index':index})//然后删除array对应索引的值，实现点击删除按钮，减少input框效果
      },
 }
}
</script>

<style  scoped src="./parameterRight3.css">
</style>
<style scoped src='../../assets/styles/slider.css'>
</style>
