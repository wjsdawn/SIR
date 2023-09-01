<template>
    <div class="parameterRight1">
        <div class="parameterRight1-header">
            <div id="parameterRight1-title">Interventions</div>
        </div>
        <div class="parameterRight1-container">     
           <div class="start-day">
             <span class="startday-title">StartDay</span>
             <el-slider class="sli-startday"  input-size="mini" v-model="value1" label="11" show-input
              :show-input-controls="false" :max="50000000" :format-tooltip="formatTooltip" ></el-slider>
           </div>
           <div class="change">
             <!-- <span class="change-title">Days</span>
             <el-slider class="sli-change"  input-size="mini" v-model="value2" label="11" show-input
             :show-input-controls="false" :max="50000000" :format-tooltip="formatTooltip" ></el-slider>
           </div>                        -->
         </div>   
        </div>
    </div>
</template>

<script>
export default {
 data() {
   return {
     value1: 0,
     value2: 0,
   }
 },
 methods: {
   formatTooltip(val) {
     return val / 100;
   }
 }
}
</script>

<style scoped>
@import './parameterRight1.css';
</style>