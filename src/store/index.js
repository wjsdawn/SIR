import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
const state = {
  simulationIndex:0,
  scatterChartData: null,
  pieChartData:null,
  barChartData: null,
  lineIsdDrawing: false,
  //装预测模拟数据
  predictData: null,


  SliderArr: [[], [], [], [], []],
  parames: {
    localParames: {
      'population': 0,
      'days': 0,
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
  },
  //用来记录评估数据
  evaluationList: [],
  
  //后续可能删除的无用变量
  evaluationPre:null,//evaluation的算式
  MAPE: 0,
  evaluation_p: null,

  evaluatedState:[],

  startMaxDay: null,//参数面板startDay的最大值
  isShowSubmit:false,//是否展现参数设置面板的提交按钮
  EvaluationData:{
    TruthData:{
      upload:false,
      select:"",
      file:null
    },
    StartDay:"",
    EvaluatedState:{
      select: "",
      evaluationPre:""
    },
    Metrics:{
      MAPE:false,
      RMSE:false
    }
  }
  
}
export default createStore({
  state,
  mutations,
  actions,
});
