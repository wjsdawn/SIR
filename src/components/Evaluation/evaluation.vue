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
    <div class="evaluation_2"></div>
    <div class="evaluation_3"></div>
  </div>
</template>

<script>
import drawLineChart from "./evaluationHelp";

export default {
  name: 'evaluation',
  data() {
    return {
      time: [1,2,3,4,5,6,7],//构造时间序列
      data_T: [600, 800, 700, 750, 1100, 1230, 1220],//真实值
      data_P:[820, 932, 901, 934, 1290, 1330, 1320] //预测值
    }
  },
  mounted() {
    drawLineChart('infectious-container', this.time, this.data_T, this.data_P)
    this.time = [],
    this.data_T = [],
    this.data_P = []
  },
  computed: {
    lineChartData() {
      // console.log('computed值', this.$store.state.predictData);
      return this.$store.state.predictData;
    },
  },
  methods: {
    predictDataProcess(predictData){
      var pre = predictData.index;
      var T = this.$store.state.parames['localParames']['days'];;
      //构造横坐标时间序列
      for (var m = 1; m <= T; m++) {
        this.time.push(m);
      }
      //从预测值中，剖离感染者一类
      //目前。只能说找到I那一列的列号，再遍历预测值找出来。但存在局限性
      var num_init = this.$store.state.ModelData['Number_initial']
      var flag_I = 0
      var stateNum = this.$store.state.ModelData.stateAllNum
      //找感染者列号
      for (var key in num_init) {
          if (key == 'I') {
             return
        }
        flag_I++
      }
      //剥离感染者数据
      for (var i = 0; i < pre.length; i++) {
           this.data_P.push(pre[i][flag_I])    
      }
        
    }
  },
   watch: {
      lineChartData: {
        handler(nval) {
          this.predictDataProcess(nval);
          drawLineChart('infectious-container', this.time, this.data_T, this.data_P);
          this.time = [],
          this.data_T = [],
          this.data_P = []
        },
        deep: true,
        imemediate: true,
      },
    },
};
</script>

<style>
@import './evaluation.css';
</style>
