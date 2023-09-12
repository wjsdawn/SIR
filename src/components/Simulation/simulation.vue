<template>
  <div class="simulation">
    <div class="simulation-header">
      <div id="simulation-title">Simulation</div>
    </div>
    <div class="simulation-container" id="simulation-container"></div>
  </div>
</template>
<script>
import drawStackChart from './simulationHelp';
import * as echarts from 'echarts';
export default {
  name: 'StackChart',
  data() {
    return {
      // stackChartData: [],
      names: ['易感者', '潜伏者', '感染者', '移除者'], //各类型人群名
      numbers: [
                [9, 8, 7, 7, 6, 4, 2],
                [4, 5, 6, 7, 4, 3, 1],
                [7, 9, 9, 10, 6, 5, 4],
                [1, 3, 5, 6, 7, 8, 9]],
      //各类型人群及其各天人数字典
      time: [1, 2, 3, 4, 5, 6, 7], //存放预测日期
      sereiesData: [
        {
          name: '易感者',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [9, 8, 7, 7, 6, 4, 2],
        },
        {
          name: '潜伏者',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [4, 5, 6, 7, 4, 3, 1],
        },
        {
          name: '感染者',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [7, 9, 9, 10, 6, 5, 4],
        },
        {
          name: '移除者',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: [1, 3, 5, 6, 7, 8, 9],
        },
      ], //动态seireis
    };
  },
  mounted() {
    drawStackChart(
      'simulation-container',
      this.names,
      this.time,
      this.sereiesData
    ),
      //渲染完成后，清空数组，避免不同阶段push的堆积
      (this.names = []);
    this.numbers = {};
    this.time = [];
    this.stateNum = 0;
    this.sereiesData = [];
  },
  computed: {
    stackChartData() {
      // console.log('computed值', this.$store.state.predictData);
      return this.$store.state.predictData;
    },
  },
  methods: {
    predictDataProcess(predictData) {
      var pre = predictData;
      var T = this.$store.state.parames['localParames']['days'];
      //处理类型名
      var num_init = this.$store.state.ModelData['Number_initial'];
      for (var key in num_init) {
        this.names.push(key);
      }
      //构造类型 人数 字典
      for (var j = 0; j < this.names.length; j++) {
          this.numbers[j] = []
          for (var i = 0; i < pre.length; i++) {
              this.numbers[j].push(pre[i][j]);
        }
      }
     
      // this.stateNum = this.$store.state.ModelData.stateAllNum
      for (var m = 1; m <= T; m++) {
        this.time.push(m);
      }
    },
    sereiesDataProcess() {
      for (var i = 0; i < this.names.length; i++) {
        var item = {
          name: this.names[i],
          type: 'line',
          stack: 'Total',
          emphasis: {
            focus: 'series',
          },
          data: this.numbers[i],
        };
        this.sereiesData.push(item);
      }
    },
  },
  watch: {
    stackChartData: {
      handler(nval) {
        this.predictDataProcess(nval)
        this.sereiesDataProcess()
        drawStackChart(
          'simulation-container',
          this.names,
          this.time,
          this.sereiesData
        );
        this.names = [];
        this.numbers = {};
        this.time = [];
        this.stateNum = 0;
        this.sereiesData = [];
      },
      deep: true,
      imemediate: true,
    },
  },
};
</script>
<style scoped>
.simulation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.simulation > .simulation-header {
  flex: 0.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.simulation > .simulation-container {
  flex: 4;
}
#simulation-title {
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 1.5em;
}
</style>
