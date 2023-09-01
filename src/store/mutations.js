export default {
  increment(state, payload) {
    console.log(payload);
    // 变更状态
    state.count += payload.amount;
  },
  getPieChartData(state, payload) {
    state.pieChartData = payload;
  },
  getScatterChartData(state, payload) {
    state.scatterChartData = payload;
  },
  getBarChartData(state, payload) {
    state.barChartData = payload
  },
  getPredictData(state, payload) {
    state.predictData = payload
    console.log("返回预测值", state.predictData)
  },
  changePopulation(state, payload) {
    state.parames['population'] = payload
  },
  changeDays(state, payload) {
    state.parames['days'] = payload
  },
  changeNames1(state, payload) {
    state.parames['names1'] = payload
  },
  changeValues1(state, payload) {
    state.parames['values1'] = payload
  }
};
