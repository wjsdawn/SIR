import { getPieChartDataRequest } from '@/api/pieChartApi.js';
import { getScatterChartDataRequest } from '@/api/scatterChartApi.js';
import { getBarChartDataRequest } from '@/api/barChartApi.js'
import { getSimulationPredictDataRequest } from '@/api/projectFooterApi.js';
import { getEvaluationPredictDataRequest } from '@/api/EvaluationApi';
export default {
  async getPieChartDataAsync(context) {
    // 发送请求
    context.commit('getPieChartData', await getPieChartDataRequest());
  },
  async getScatterChartDataAsync(context, id) {
    // 发送带参数的请求
    context.commit('getScatterChartData', await getScatterChartDataRequest());
  },
  async getBarChartDataAsync(context){
    context.commit('getBarChartData', await getBarChartDataRequest());
  },
  //得到模型预测结果
  async getSimulationPredictDataAsync(context, payload) {
    context.commit('getSimulationPredictData', await getSimulationPredictDataRequest(payload));
  },

  //得到模型评估结果
  async getEvaluationPredictDataAsync(context, payload) {
    context.commit('getEvaluationPredictData', await getEvaluationPredictDataRequest(payload));
  },

  async setParamesAsync(context, payload){ 
    context.commit('setParames', payload);
  },
  async addSliderArrAsync(context,payload){ 
    context.commit('addSliderArr',payload);
  },
  async delSliderArrAsync(context,payload){ 
    context.commit('delSliderArr',payload);
  },
  async setEvaluationPreAsync(context,payload){ 
    context.commit('setEvaluationPre',payload);
  }
 
};
