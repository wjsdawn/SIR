<template>
  <div class="evaluation-results">
    <div class="evaluation-title">
      <div>Evaluation_{{ count + 1 }}</div>
      <div>
        <el-button @click="deleteItem" type="danger" size="small">Delete
          <el-icon style="margin-left: 3px;">
            <Delete/>
          </el-icon>
        </el-button>
      </div>
    </div>
    <div class="evaluation-Graph">
    </div>
    <div id="evaluation-metrics">
      <div v-if="item['MAPE']['flag']==='true'">MAPE:{{item['MAPE']['value']}}%</div>
      <div v-if="item['RMSE']['flag']==='true'">RMSE:{{item['RMSE']['value']}}%</div>
    </div>
  </div>
</template>
<script>
import drawLineChart from './evaluationHelp';
import Bus from '@/components/EventBus';
import * as echarts from 'echarts';
import {option} from './evaluationGraph'

export default {
  props: ['count'],
  data() {
    return {
      time: [1, 2, 3, 4, 5, 6, 7], //构造时间序列
      time1: [],
      data_T: [600, 800, 700, 750, 1100, 1230, 1220], //真实值
      data_T1: [],
      data_P: [820, 932, 901, 934, 1290, 1330, 1320], //预测值
      data_P1: [],
      evaluationPre: null,
      index: 0,
      intervalId: null,
      myOption: option,
      myChart: null,
      MAPE:null,
      RMSE:null
    }
  },
  methods: {
    deleteItem() {
      this.$store.commit('deleteEvaluationItem', this.count)
      // this.$store.state.evaluationList.splice(this.count, 1)
    },
    //开始启动动画
    processAnimate() {
      this.time1.push(this.time[this.index]);
      this.data_T1.push(this.data_T[this.index]);
      this.data_P1.push(this.data_P[this.index]);
      this.index += 1;
      this.myOption.xAxis.data = this.time1;
      this.myOption.series[0].data = this.data_P1;
      this.myOption.series[1].data = this.data_T1;
      option && this.myChart.setOption(this.myOption);
      if (this.index === this.time.length) {
        clearInterval(this.intervalId);
      }
    },

    processAnimateInit() {
      this.time1.push(this.time[this.index]);
      this.data_T1.push(this.data_T[this.index]);
      this.data_P1.push(this.data_P[this.index]);
      this.index += 1;
      this.myOption.xAxis.data = this.time1;
      this.myOption.series[0].data = this.data_P1;
      this.myOption.series[1].data = this.data_T1;
      option && this.myChart.setOption(this.myOption);
      if (this.index === this.$store.state.simulationIndex) {
        clearInterval(this.intervalId);
      }
    },
    //回退
    backAnimate() {
      this.index -= 1;
      this.time1.pop();
      this.data_T1.pop();
      this.data_P1.pop();
      this.myOption.xAxis.data = this.time1;
      this.myOption.series[0].data = this.data_P1;
      this.myOption.series[1].data = this.data_T1;
      option && this.myChart.setOption(this.myOption);
      if (this.index === 0) {
        clearInterval(this.intervalId);
      }
    },
    addMonitor() {
      Bus.on('play-process', () => {
        this.intervalId = setInterval(this.processAnimate, 500);
      });
      Bus.on('pause-process', () => {
        clearInterval(this.intervalId);
      });
      Bus.on('reset-process', () => {
        this.time1 = [];
        this.data_T1 = [];
        this.data_P1 = [];
        this.index = 0;
        this.intervalId = setInterval(this.processAnimate, 500);
      });
      Bus.on('stop-repeat', () => {
        clearInterval(this.intervalId);
      });
      Bus.on('forward-progress', () => {
        this.processAnimate();
        this.intervalId = setInterval(this.processAnimate, 250);
      });
      Bus.on('start-backward', () => {
        this.backAnimate();
        this.intervalId = setInterval(this.backAnimate, 250);
      });
    },
    deleteMonitor() {
      Bus.off('play-process');
      Bus.off('pause-process');
      Bus.off('reset-process');
      Bus.off('stop-repeat');
      Bus.off('forward-progress');
      Bus.off('start-backward');
    }
  },
  mounted() {
    this.data_T = this.item['data_T'];
    this.data_P = this.item['data_P'];
    this.time = [];
    var T = this.$store.state.parames['localParames']['days'];
    for (let i = 1; i <= T; i++) this.time.push(i);

    var chartDom = document.getElementsByClassName('evaluation-Graph')[this.count];
    this.myChart = echarts.init(chartDom);

    // this.myOption.xAxis.data = this.time;
    // this.myOption.series[0].data = this.data_P;
    // this.myOption.series[1].data = this.data_T;

    // option && this.myChart.setOption(this.myOption);

    this.addMonitor();
    this.intervalId = setInterval(this.processAnimateInit, 500);

  },
  computed: {
    item() {
      return this.$store.state.evaluationList[this.count];
    },
    EvaluationData() {
      return this.$store.state.EvaluationData;
    },
    listItem() {
      return this.$store.state.evaluationList;
    }
  },
  watch: {
    listItem: {
      handler(newVal) {
        if (this.count+1 < newVal.length) {
          this.myOption.xAxis.data = this.time;
          this.myOption.series[0].data = this.data_P;
          this.myOption.series[1].data = this.data_T;
          option && this.myChart.setOption(this.myOption);
          this.deleteMonitor()
        } else  if (this.count+1 === newVal.length) {
          console.log("添加监听")
          this.addMonitor();
        }
      },
      deep: true,
      imemediate: true,
    }
  },
}
</script>
<style>
@import './evaluationGraph.css';
</style>