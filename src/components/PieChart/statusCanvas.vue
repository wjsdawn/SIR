<template>
  <div class="pieChart">
<!--    <h1>{{ msg }}</h1>-->
<!--    <p>{{ pieChartData && pieChartData[0] }}</p>-->
    <div class="pieChart-header">
      <h1>pieChart(后端获取数据若缺省则使用默认值)</h1>
      <h1>echarts绘制</h1>
    </div>
    <div class="pieChart-container" id="pieChart-container">
        <svg id="blue-editor" style="width: 100%;height: 100%" @dblclick="statusCanvasClick"></svg>
    </div>
  </div>
</template>

<script>
import * as d3  from 'd3'
import statusLine from './statusLine';
import statusComponent from "./statusComponent";
export default {
  name: 'PieChart',
  props: {
    msg: String,
    pieChartData: Array,
  },
  data() {
    return{

    }
  },
  methods:{

    statusCanvasClick(e){
      // 线条绘制
      // console.log("statusCanvasClick点击")
      // console.log(e)
      // console.log(e.parentX)
      // console.log(e.x)
      // let container = d3.select("#blue-editor")
      // let line = new statusLine(
      //   container,
      //   "line",
      //    [e.x,e.y],
      //   "asd",
      //   "ad",
      //   '#ffe700'
      // )
      // container.on("mousemove",function () {
      //   let coordinates = d3.mouse(this)
      //   console.log(coordinates);
      //   line.dynamicGenerateCurveLine(coordinates)
      //
      // })

      // 绘制状态组件
      let container = d3.select("#blue-editor")
      let options = {
        id:"1",
        name:"名字"
      }
      let temp = new statusComponent(container,options)
      // temp.drawComponent()
    }
  },
  mounted() {
    let that = this;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pieChart{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.pieChart>.pieChart-header{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.pieChart>.pieChart-container{
  flex: 4;
}
</style>