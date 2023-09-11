import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
const state = {
  count: 1,
  scatterChartData: null,
  pieChartData:null,
  barChartData: null,
  lineIsdDrawing:false,
  predictData: null,
  SliderArr: [[], [], [], [], []],
  parames: {
    localParames: {
      'population': 0,
      'days': 7,
      'names1': [],
      'values1': [],
    },
    epidemicParames: {
      'Beta': 0,
      'Alpha': 0,
      'Gamma': 0,
      'names2': [],
      'values2': []
    },
    interventionParames: {
      'sday': 0,
      'names3': [],
      'values3_bf':[],
      'values3_af':[],
    },
    healthParames: {
      'maxbed': 0,
      'names4': [],
      'values4': []
    },
    vaccaineParames: {
      'vacRate': 0,
      'effecRare': 0,
      'names5': [],
      'values5': []
     }
  },
  ModelData:{
        'Number_initial':{},
        'transition':[],
        'stateAllNum':null,
  }
}
export default createStore({
  state,
  mutations,
  actions,
});
