<template>
  <div class="evaluation">
    <div class="evaluation_infectious" id="evaluation_infectious">
         <div class="infectious-header">
            <div class="infectious-title" id="infectious-title">Evaluation_I</div>
            <span class="MAPE_I">MAPE = 0.93</span>
         </div>
        <div class="infectious-container" id="infectious-container">
       
        </div>
    </div>

    <!-- <el-divider id="divider1"></el-divider> -->

    <div class="evaluation_2"></div>

    <!-- <el-divider id="divider2"></el-divider> -->

    <div class="evaluation_3"></div>
  </div>
</template>

<script>
import drawLineChart from "./evaluationHelp";

export default {
  name: 'evaluation',
  mounted() {
    // console.log(this.barChartData);
    // let data = this.barChartData
    drawLineChart('infectious-container');
  },
};
</script>

<style>
@import './evaluation.css';
</style>
