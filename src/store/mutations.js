export default {

  //更新中间的模型视图数据
  getSimulationPredictData(state, payload) {
   state.predictData = payload;
  
  },

  //更新评估视图列表数据
  getEvaluationPredictData(state, payload)
  {
    console.log("预测返回数据为", payload);
      state.evaluationList.push(payload);
  },


  //删除一个评估图表结果
  deleteEvaluationItem(state, payload)
  {
    state.evaluationList.splice(payload, 1)
  },
  
  setEvaluation(state, payload)
  {
    state.EvaluationData=payload
  },

  setParames(state, payload){
    state.parames[payload['name']] = payload['value']
  },
  setModelData(state, payload){
    state.ModelData = payload
    state.evaluatedState=Object.keys(payload['Number_initial'])
    console.log("测试", state.ModelData)
    console.log("状态结果",Object.keys(payload['Number_initial']))
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
