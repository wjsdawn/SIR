import { getPieChartDataRequest } from '@/api/pieChartApi.js';
import { getScatterChartDataRequest } from '@/api/scatterChartApi.js';
import { getBarChartDataRequest } from '@/api/barChartApi.js'
import { getPredictDataRequest } from '@/api/projectFooterApi.js'
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
  async getPredictDataAsync(context, payload) {
    console.log("model",payload)
    context.commit('getPredictData', await getPredictDataRequest(payload));
  },
  async setParamesAsync(context, payload){ 
    context.commit('setParames', payload);
  },
  async addSliderArrAsync(context,payload){ 
    context.commit('addSliderArr',payload);
  },
  async delSliderArrAsync(context,payload){ 
    context.commit('delSliderArr',payload);
  }
  
};
