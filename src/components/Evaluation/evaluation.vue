<template>
  <div class="evaluation">
    <div class="evaluation_infectious" id="evaluation_infectious">
      <div class="infectious-header">
        <div class="infectious-title" id="infectious-title">Evaluation_I</div>
        <div class="infectious-dropdown">
          <el-dropdown size="small" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-input
                  v-model="evaluationPre"
                  placeholder="请输入公式"
                ></el-input>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <span class="MAPE_I">MAPE = {{ MAPE }}%</span>
      </div>
      <div class="infectious-container" id="infectious-container"></div>
    </div>
    <div class="evaluation_2"></div>
    <div class="evaluation_3"></div>
  </div>
</template>

<script>
import drawLineChart from './evaluationHelp';
import Bus from '@/components/EventBus';

export default {
  name: 'evaluation',
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
    };
  },
  mounted() {
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
    this.intervalId = setInterval(this.processAnimate, 500);
  },
  computed: {
    lineChartData() {
      // console.log('computed值', this.$store.state.predictData);
      return this.$store.state.evaluation_p;
    },
    MAPE() {
      return this.$store.state.MAPE;
    },
  },
  methods: {
    predictDataProcess(predictData) {
      var T = this.$store.state.parames['localParames']['days'];;
      //构造横坐标时间序列
      for (var m = 1; m <= T; m++) {
        this.time.push(m);
      }

      //先写死的真实值
      this.data_T = [
        1, 9, 14, 15, 13, 18, 26, 35, 46, 60, 83, 107, 167, 192, 222, 260, 277,
        299, 312, 331, 326, 323, 320, 321, 311, 307, 303, 300, 285, 265, 254,
        235,
      ];
    },
    processAnimate() {
      this.time1.push(this.time[this.index]);
      this.data_T1.push(this.data_T[this.index]);
      this.data_P1.push(this.data_P[this.index]);
      this.index += 1;
      drawLineChart(
        'infectious-container',
        this.time1,
        this.data_T1,
        this.data_P1
      );
      if (this.index === this.time.length) {
        clearInterval(this.intervalId);
      }
    },
    backAnimate() {
      this.index -= 1;
      this.time1.pop();
      this.data_T1.pop();
      this.data_P1.pop();
      drawLineChart(
        'infectious-container',
        this.time1,
        this.data_T1,
        this.data_P1
      );
      if (this.index === 0) {
        clearInterval(this.intervalId);
      }
    },
    predictDataProcess(predictData) {
      var pre = predictData;
      var T = this.$store.state.parames['localParames']['days'];

    },
  },
  watch: {
    evaluationPre: {
      handler(newVal) {
        this.$store.dispatch('setEvaluationPreAsync', newVal);
      },
      immediate: true,
      deep: true,
    },
    lineChartData: {
      handler(nval) {
        this.predictDataProcess(nval);
        this.time1 = [];
        this.data_T1 = [];
        this.data_P1 = [];
        this.index = 0;
        this.processAnimate() 
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
