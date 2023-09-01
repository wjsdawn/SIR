<template>
    <div class="parameterRight3">
        <div class="parameterRight3-header">
            <div id="parameterRight3-title">Vaccine</div>
        </div>
        <div class="parameterRight3-container">     
           <div class="vaccine-rate">
             <span class="vaccineRate-title">VaccineRate</span>
             <el-slider class="sli-vaccineRate"  input-size="mini" v-model="value1" label="11" show-input
              :show-input-controls="false" :max="50000000" :format-tooltip="formatTooltip" ></el-slider>
           </div>
           <div class="effective">
             <span class="effective-title">Effectiveness</span>
             <el-slider class="sli-effective"  input-size="mini" v-model="value2" label="11" show-input
             :show-input-controls="false" :max="50000000" :format-tooltip="formatTooltip" ></el-slider>
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
@import './parameterRight3.css';
</style>