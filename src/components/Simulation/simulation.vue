<template>
  <div class="simulation">
    <div class="simulation-header">
      <div id="simulation-title">Simulation</div>
      <div id="simulation-button">
        <div v-if="!reset" style="display: flex; align-items: center">
          <img src="../../assets/bofang.png" v-if="!isPlay" @click="playProcess" alt="" />
          <img src="../../assets/zanting.png" v-else @click="pauseProcess" alt="" />
        </div>
        <div style="display: flex; align-items: center" v-else>
          <img src="../../assets/重置.png" @click="resetProcess" alt="" />
        </div>
        <img class="simulation-img" src="../../assets/prev-step.png" alt="" @mousedown="startBackward"
          @mouseup="stopRepeat" />
        <img class="simulation-img" src="../../assets/next-step.png" alt="" @mousedown="forwardProgress"
          @mouseup="stopRepeat" />
      </div>
    </div>
    <div class="simulation-container" id="simulation-container"></div>
  </div>
</template>
<script>
import drawStackChart from './simulationHelp';
import * as echarts from 'echarts';
import Bus from "@/components/EventBus";
export default {
  name: 'StackChart',
  data() {
    return {
      intervalId: null,
      reset: false,
      isPlay: true,
      names: ['Susceptible', 'Exposed', 'Infected', 'Recovered'], //各类型人群名
      numbers: [
        [9, 8, 7, 7, 6, 4, 2],
        [4, 5, 6, 7, 4, 3, 1],
        [7, 9, 9, 10, 6, 5, 4],
        [1, 3, 5, 6, 7, 8, 9]],
      //各类型人群及其各天人数字典
      time: [1, 2, 3, 4, 5, 6, 7], //存放预测日期
      index: 0,
      time1: [],
      sereiesData: [
        {
          name: 'Susceptible',
          type: 'line',
          stack: 'Total',
          data: []
        },
        {
          name: 'Exposed',
          type: 'line',
          stack: 'Total',
          data: [],
        },
        {
          name: 'Infected',
          type: 'line',
          stack: 'Total',
          data: [],
        },
        {
          name: 'Recovered',
          type: 'line',
          stack: 'Total',
          data: [],
        },
      ],
    };
  },
  mounted() {
    Bus.on('submit-parameter', () => {
      this.pauseProcess();
    });
    this.intervalId = setInterval(this.processAnimate, 500);
    //渲染完成后，清空数组，避免不同阶段push的堆积
    this.stateNum = 0;
  },
  computed: {
    stackChartData() {
      return this.$store.state.predictData;
    },
  },
  methods: {
    processAnimate() {
      this.time1.push(this.time[this.index]);
      for (let i = 0; i < this.numbers.length; i++)  this.sereiesData[i].data.push(this.numbers[i][this.index])
      drawStackChart(
        'simulation-container',
        this.names,
        this.time1,
        this.sereiesData
      );
      this.index += 1;
      this.$store.state.simulationIndex=this.index;
      if (this.index === this.time.length) {
        this.reset = true;
        this.isPlay = false;
        clearInterval(this.intervalId);
      }
    },
    backAnimate() {
      this.index -= 1;
      this.$store.state.simulationIndex=this.index;
      this.time1.pop();
      for (let item of this.sereiesData) item.data.pop();
      drawStackChart(
        'simulation-container',
        this.names,
        this.time1,
        this.sereiesData
      );
      if (this.index === 0) {
        clearInterval(this.intervalId);
      }
    },
    playProcess() {
      //事件之开始播放
      Bus.emit('play-process');
      this.isPlay = true;
      this.intervalId = setInterval(this.processAnimate, 500);
    },
    pauseProcess() {
      //事件之暂停
      Bus.emit('pause-process');
      this.isPlay = false;
      clearInterval(this.intervalId);
    },
    resetProcess() {
      Bus.emit('reset-process')
      //事件之重置
      this.reset = false;
      this.isPlay = true;
      this.time1 = [];
      this.index = 0;
      for (let item of this.sereiesData) item.data = [];
      this.intervalId = setInterval(this.processAnimate, 500);
    },
    startBackward() {
      if (this.isPlay === false && this.index >= 1) {
        //事件之后退
        Bus.emit('start-backward')
        this.backAnimate();
        this.reset = false;
        this.intervalId = setInterval(this.backAnimate, 250);
      }
    },
    stopRepeat() {
      if (!this.isPlay) {
        //事件之停止前进或者后退点击
        Bus.emit('stop-repeat')
        clearInterval(this.intervalId);
      }
    },
    forwardProgress() {
      if (this.isPlay === false && this.index < this.time.length) {
        //事件之前进
        Bus.emit('forward-progress')
        this.processAnimate();
        this.intervalId = setInterval(this.processAnimate, 250);
      }
    },
    predictDataProcess(predictData) {
      //初始化数据
      this.reset = false;
      this.isPlay = true;
      this.names = [];
      this.time = [];
      this.time1 = [];
      this.index = 0;
      this.numbers = [];
      this.sereiesData = [];

      var pre = predictData;
      var T = this.$store.state.parames['localParames']['days'];
      for (let i = 1; i <= T; i++) this.time.push(i);
      //处理类型名
      this.names = Object.keys(this.$store.state.ModelData['Number_initial']);

      console.log("预测数据得到", pre);
      console.log("日期得到", this.time);
      console.log("名称得到", this.names);
      for (let i = 0; i < this.names.length; i++)    this.numbers.push(pre[this.names[i]]);

      for (var i = 0; i < this.names.length; i++) {
        var item = {
          name: this.names[i],
          type: 'line',
          stack: 'Total',
          data: [],
        };
        this.sereiesData.push(item);
      }
      this.intervalId = setInterval(this.processAnimate, 500);
    },
  },
  watch: {
    stackChartData: {
      handler(nval) {
        this.predictDataProcess(nval)
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

.simulation>.simulation-header {
  height: 5%;
  display: flex;
}

img {
  width: 2.5em;
  height: 2.5em;
}

.simulation-img {
  margin-left: 5%;
}

.simulation>.simulation-container {
  height: 95%;
}

#simulation-title {
  width: 85%;
  height: 100%;
  text-align: left;
  font-size: 1.5em;
}

#simulation-button {
  height: 100%;
  width: 15%;
  display: flex;
  align-items: center;
}
</style>
