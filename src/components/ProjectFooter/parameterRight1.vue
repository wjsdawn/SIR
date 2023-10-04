<template>
    <div class="parameterRight1">
        <div class="parameterRight1-header">
            <div id="parameterRight1-title">Interventions</div>
        </div>
        <el-scrollbar style="height: 100%;">
        <div class="parameterRight1-container" style="max-height: 100px;">     
           <div class="start-day">
             <span class="startday-title">StartDay</span>
             <el-slider class="sli-startday"  input-size="mini" v-model="interventionParames['sday']" label="11" show-input
              :show-input-controls="false" :max="400" :format-tooltip="formatTooltip" ></el-slider>
           </div>
           <div class="add" v-for="(item, index) in this.$store.state.SliderArr[2]" :key="index">
              <el-input class="title"  v-model="interventionParames['names3'][index]" placeholder="参数名" clearable></el-input>
              <span class="colon">:</span>
              <el-input-number
                  class="input_bf"
                  placeholder="before"
                  v-model="interventionParames['values3_bf'][index]"
                  :controls="false"
                  clearable>
              </el-input-number>
              <el-divider direction="vertical"></el-divider>
              <el-input-number
                  class="input_af"
                  placeholder="after"
                  v-model="interventionParames['values3_af'][index]"
                  clearable
                  :controls="false">
              </el-input-number>
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
     interventionParames: {
       sday: 0,
       names3: [],
       values3_bf:[],
       values3_af:[],
     }
   }
  },
  watch: {
    interventionParames: {
        handler(newVal) {
          this.$store.dispatch('setParamesAsync', { 'name': 'interventionParames', 'value': newVal })
        },
        immediate: true,
        deep: true
      },
    },
 methods: {
   del(index) {
        this.interventionParames['names3'].splice(index, 1);
        this.interventionParames['values3_bf'].splice(index, 1); //先删除form中value对应索引的值
        this.interventionParames['values3_af'].splice(index, 1);
        this.$store.dispatch('delSliderArrAsync',{'name':2,'index':index})//然后删除array对应索引的值，实现点击删除按钮，减少input框效果
      },
 }
}
</script>

<style scoped src='./parameterRight1.css'>
</style>
