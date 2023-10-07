export default {
  increment(state, payload) {
    console.log(payload);
    // 变更状态
    state.count += payload.amount;
  },
  getPredictData(state, payload) {
    state.evaluationList.push({});
    // state.predictData = payload.preData
    // state.evaluation_p = payload.evaluation_p
    // state.MAPE = payload.MAPE
    
  },
  //删除一个评估图表结果
  deleteEvaluationItem(state, payload)
  {
    state.evaluationList.splice(payload, 1)
  },
  
  setParames(state, payload){
    state.parames[payload['name']] = payload['value']
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
  },
  setEvaluationPre(state, payload) {
    state.evaluationPre = payload
  }
};
