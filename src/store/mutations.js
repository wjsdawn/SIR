export default {
  increment(state, payload) {
    console.log(payload);
    // 变更状态
    state.count += payload.amount;
  },
  getPredictData(state, payload) {
    state.predictData = payload
    console.log("返回预测值", state.predictData)
  },
  setParames(state, payload){
    state.parames[payload['name']] = payload['value']
    console.log("返回预测值", state.parames['localParames'])
  },
  setModelData(state, payload){
    state.ModelData = payload
    console.log("测试",state.ModelData)
  },
  addSliderArr(state, payload) {
    state.SliderArr[payload].push(1)
  },
  delSliderArr(state, payload) {
    state.SliderArr[payload['name']].splice(payload['index'], 1)
  }
};
