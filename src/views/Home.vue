<template>
  <!-- 摆放各个组件以及布局 -->
  <div class="layout">
    <div class="top">
        <ProjectHeader/>
    </div>
    <div class="middle">
      <div class="middle-left">
          <StatusCanvas />
      </div>
      <div class="middle-middle">
          <Simulation />
      </div>
      <div class="middle-right">
         <Evaluation />
      </div>
    </div>
    <div class="bottom">
        <ProjectFooter/>
<!--      <h2>{{ count }}</h2>-->
<!--      <button @click="add">+1</button>-->
<!--      <p>{{ pieChartData && pieChartData.length }}</p>-->
<!--      <p>{{ scatterChartData && scatterChartData.length }}</p>-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StatusCanvas from '@/components/StatusCanvas/statusCanvas.vue';
import ScatterChart from '@/components/ScatterChart/scatterChart.vue';
import ProjectHeader from '@/components/ProjectHeader/projectHeader.vue';
import ProjectFooter from '@/components/ProjectFooter/projectFooter.vue';
import Simulation from "@/components/Simulation/simulation.vue";
import Evaluation from "@/components/Evaluation/evaluation.vue";
export default {
  name: 'Home',
  components: {
    ProjectHeader,
    StatusCanvas,
    ScatterChart,
    ProjectFooter,
    Simulation,
    Evaluation
  },
  mounted() {
    console.log(this.count);
    const id = 32311;
  },
  computed: {
    // 获取vuex中的数据，并且声明为组价的计算属性
    count() {
      return this.$store.state.count;
    },
    scatterChartData() {
      return this.$store.state.scatterChartData;
    },
    pieChartData() {
      return this.$store.state.pieChartData;
    },
    barChartData() {
      return this.$store.state.barChartData;
    }
  },
  methods: {
    add() {
      this.$store.commit('increment', {
        amount: 10,
      });
    },
  },
};
</script>
<style scoped>
@import './Home.css';

</style>