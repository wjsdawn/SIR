<template>
  <div class="evaluation">
    <div class="evaluation_infectious" id="evaluation_infectious">
      <div class="infectious-header">
        <div class="infectious-title" id="infectious-title">Evaluation Setting</div>
        <el-button v-if="$store.state.isShowSubmit" type="danger" size="small" @click="submit">
          Evaluate <el-icon class="el-icon--right">
            <check />
          </el-icon>
        </el-button>
      </div>
      <div class="infectious-container" id="infectious-container">
        <div class="evaluation-setting">
          <div class="evaluation-params">Truth Data</div>
          <div class="evaluation-value"><el-select v-model="EvaluationData.TruthData.select" clearable
              placeholder="Select" style="flex: 1.2">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-popover placement="left-start" :width="300">
              <template #reference>
                <el-upload style="flex: 1" action="#" :on-change="handleChange" :show-file-list=false
                  :auto-upload=false><el-button type="primary">upload</el-button>
                </el-upload>
              </template>
              <div style="width: 300px">
                <p>上传文件的后缀名为.csv，其格式如下：</p>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="Date" width="180" />
                  <el-table-column prop="value" label="Value" width="180" />
                </el-table>
              </div>
            </el-popover>
          </div>
        </div>
        <div class="evaluation-setting">
          <div class="evaluation-params">Start Day</div>
          <div class="evaluation-value">
            <el-date-picker v-model="EvaluationData.StartDay" type="date" placeholder="Pick a day" style="width: 100%" />
          </div>
        </div>
        <div class="evaluation-setting">
          <div class="evaluation-params">Evaluated State</div>
          <div class="evaluation-value" id="evaluated-state">
            <el-input v-model="EvaluationData.EvaluatedState.evaluationPre" placeholder="表达式" class="input-with-select">
              <template #prepend>
                <el-select v-model="EvaluationData.EvaluatedState.select" placeholder="Select">
                  <el-option v-for="(item, index) in  $store.state.evaluatedState" :label="item" :key="index"
                    :value="item" />
                </el-select>
              </template>
            </el-input>
          </div>
        </div>
        <div class="evaluation-setting">
          <div class="evaluation-params">Metrics</div>
          <div class="evaluation-value"><el-checkbox label="MAPE" size="large" v-model="EvaluationData.Metrics.MAPE" />
            <el-checkbox label="RMSE" size="large" v-model="EvaluationData.Metrics.RMSE" />
          </div>
        </div>
      </div>
    </div>
    <div id="evaluation">
      <evaluationGraph v-for="(item, index) in $store.state.evaluationList" :key="index" :count="index">
      </evaluationGraph>
    </div>
  </div>
</template>

<script>
import drawLineChart from './evaluationHelp';
import Bus from '@/components/EventBus';
import evaluationGraph from './evaluationGraph.vue';
import { axiosInstance } from '@/api/config';
import {
  ArrowDown,
  Check, Search
} from '@element-plus/icons-vue';
import { ElMessage, ElPopover } from 'element-plus'

export default {
  name: 'evaluation',
  components: {
    ArrowDown,
    Check,
    evaluationGraph
  },
  data() {
    return {
      EvaluationData: {
        TruthData: {
          upload: false,
          select: "",
          file: null
        },
        StartDay: "",
        EvaluatedState: {
          select: "",
          evaluationPre: ""
        },
        Metrics: {
          MAPE: false,
          RMSE: false
        }
      },
      fileList: [],
      tableData: [
        {
          date: '2016-05-03',
          value: 101
        },
        {
          date: '2016-05-02',
          value: 103
        },
        {
          date: '2016-05-04',
          value: 100
        }
      ],
      options: [
        {
          value: 'Susceptible',
          label: 'Susceptible',
        },
        {
          value: 'Exposed',
          label: 'Exposed',
        },
        {
          value: 'Infected',
          label: 'Infected',
        },
        {
          value: 'Recovered',
          label: 'Recovered',
        }
      ]
    };
  },
  mounted() {
  },
  computed: {

  },
  methods: {
    submit() {
      this.$store.commit('setEvaluation', this.EvaluationData)
      this.$store.dispatch('getEvaluationPredictDataAsync', {
        evaluation_setting: this.EvaluationData
      });
      this.EvaluationData.TruthData.upload = false
      this.EvaluationData.TruthData.file = null
      Bus.emit('submit-parameter');
    },
    handleChange(file) {
      // let Data = new FormData()//创建一个表单
      // Data.append("file", file.raw)
      //状态变更
      const reader = new FileReader();
      reader.readAsDataURL(file.raw)
      reader.onload = () => {
        this.EvaluationData.TruthData = {
          upload: true,
          select: null,
          file: reader.result
        }
      }
      ElMessage({
        message: 'File uploaded successfully',
        type: 'success',
      })
    }
  },
  watch: {
    // ModelData: {
    //   handler(nval) {
    //     console.log(this.EvaluationData)
    //   },
    //   deep: true,
    //   imemediate: true,
    // },
  },
};
</script>

<style>
@import './evaluation.css';
</style>
