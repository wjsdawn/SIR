<template>
    <div class="simulation">
        <!--    <h1>{{ msg }}</h1>-->
        <!--    <p>{{ pieChartData && pieChartData[0] }}</p>-->
        <div class="simulation-header">
            <div id="simulation-title">simulation</div>
        </div>
        <div class="simulation-container" id="simulation-container">
            <svg class="simulation-svg"></svg>
        </div>
    </div>
</template>
<script>
import { drawBarChart } from "./simulationHelp";
import * as d3 from 'd3'
export default {
  name: 'barChart',
  props: {
    barChartData: [],
  },
  mounted() {
    console.log(this.barChartData);
    let data = this.barChartData
    drawBarChart('.simulation-svg',data)
  }
}
</script>
<style scoped>
.simulation{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.simulation>.simulation-header{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.simulation>.simulation-container{
    flex: 4;
}
#simulation-title{
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 1.5em;
}
</style>