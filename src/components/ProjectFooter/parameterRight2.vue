<template>
    <div class="parameterRight2">
        <div class="parameterRight2-header">
            <div id="parameterRight2-title">Healthcare</div>
        </div>
        <div class="parameterRight2-container">     
           <div class="max-beds">
             <span class="maxBeds-title">Max Beds</span>
             <el-slider class="sli-maxBeds"  input-size="mini" v-model="value1" label="11" show-input
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
@import './parameterRight2.css';
</style>