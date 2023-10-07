<template>
  <div class="evaluation">
    <div class="evaluation_infectious" id="evaluation_infectious">
      <div class="infectious-header">
        <div class="infectious-title" id="infectious-title">Evaluation Setting</div>
        <el-button v-if="$store.state.isShowSubmit" type="danger" size="small">Submit <el-icon class="el-icon--right">
            <check />
          </el-icon>
        </el-button>
      </div>
      <div class="infectious-container" id="infectious-container">
        <div class="evaluation-setting">
          <div class="evaluation-params">Truth Data</div>
          <div class="evaluation-value"><el-select v-model="$store.state.EvaluationDate.TruthData.select" clearable
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
                <p>上传文件的后缀名为.xlsx，其格式如下：</p>
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
            <el-date-picker v-model="$store.state.EvaluationDate.StartDay" type="date" placeholder="Pick a day"
              style="width: 100%" />
          </div>
        </div>
        <div class="evaluation-setting">
          <div class="evaluation-params">Evaluated State</div>
          <div class="evaluation-value" id="evaluated-state">
            <el-input v-model="$store.state.EvaluationDate.EvaluatedState.evaluationPre" placeholder="表达式"
              class="input-with-select">
              <template #prepend>
                <el-select v-model="$store.state.EvaluationDate.EvaluatedState.select" placeholder="Select">
                  <el-option v-for="(item, index) in $store.state.evaluatedState" :label="item" :key="index"
                    :value="index" />
                </el-select>
              </template>
            </el-input>
          </div>
        </div>
        <div class="evaluation-setting">
          <div class="evaluation-params">Metrics</div>
          <div class="evaluation-value"><el-checkbox label="MAPE" size="large"
              v-model="$store.state.EvaluationDate.Metrics.MAPE" />
            <el-checkbox label="RMSE" size="large" v-model="$store.state.EvaluationDate.Metrics.RMSE" />
          </div>
        </div>
      </div>
    </div>
    <div id="evaluation">
      <evaluationGraph v-for="(item, index) in $store.state.evaluationList" :key="index" :count="index" :data="item">
      </evaluationGraph>
    </div>
  </div>
</template>

<script>
import drawLineChart from './evaluationHelp';
import Bus from '@/components/EventBus';
import evaluationGraph from './evaluationGraph.vue';
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
          value: '易感者',
          label: '易感者',
        },
        {
          value: '潜伏者',
          label: '潜伏者',
        },
        {
          value: '感染者',
          label: '感染者',
        },
        {
          value: '移除者',
          label: '移除者',
        }
      ]
    };
  },
  mounted() {
  },
  computed: {
    Search() {
      return Search
    },
    lineChartData() {
      // console.log('computed值', this.$store.state.predictData);
      return this.$store.state.evaluation_p;
    },
    // MAPE() {
    //   return this.$store.state.MAPE;
    // },
  },
  methods: {
    handleCommand() {

    },
    handleChange(file) {
      let Data = new FormData()//创建一个表单
      Data.append("file", file.raw)
      //状态变更
      this.$store.state.EvaluationDate.TruthData.upload = true
      this.$store.state.EvaluationDate.TruthData.select = null
      this.$store.state.EvaluationDate.TruthData.file = Data
      //
      ElMessage({
        message: 'File uploaded successfully',
        type: 'success',
      })
      console.log(Data.get("file"))
      console.log(file)
    }
  },
  watch: {
  },
};
</script>

<style>
@import './evaluation.css';
</style>
