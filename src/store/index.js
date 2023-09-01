import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
const state = {
  count: 1,
  scatterChartData: null,
  pieChartData:null,
  barChartData: null,
  predictData:null,
  parames: {
        'population': 0,
        'days': 7,
        'names1': [], 
        'values1': [], 
        'Beta': 0,
        'Alpha': 0,
        'Gamma': 0,
        'array': [],
        'names2': [],
        'values2': []
    }
  
}
export default createStore({
  state,
  mutations,
  actions,
});
