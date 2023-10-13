<template>
  <div class="projectFooter">
    <div class="parameter-header">
      <span class="parameter-title">Parameter</span>
      <div class="parameter-dropdown">
        <el-dropdown size="small" @command="handleCommand">
          <el-button class="el-dropdown-link" size="small" type="primary">
            Add <el-icon class="el-icon--right"><arrow-up /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="0" divided icon="el-icon-plus">
                <el-icon>
                  <Plus />
                </el-icon>Location
              </el-dropdown-item>
              <el-dropdown-item command="1" divided icon="el-icon-plus">
                <el-icon>
                  <Plus />
                </el-icon>Epidemic
              </el-dropdown-item>
              <el-dropdown-item command="2" divided icon="el-icon-plus">
                <el-icon>
                  <Plus />
                </el-icon>Interventions
              </el-dropdown-item>
              <el-dropdown-item command="3" divided icon="el-icon-plus">
                <el-icon>
                  <Plus />
                </el-icon>Healthcare
              </el-dropdown-item>
              <el-dropdown-item command="4" divided icon="el-icon-plus">
                <el-icon>
                  <Plus />
                </el-icon>Vaccine
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-button class="submit" type="danger" size="small" @click="submit">Submit <el-icon class="el-icon--right">
          <check />
        </el-icon>
      </el-button>
    </div>
    <div class="parameter-container">
      <div class="parameter-left">
        <parameterLeft />
      </div>
      <div class="parameter-middle">
        <parameterMiddle />
      </div>
      <div class="parameter-right1">
        <parameterRight1 />
      </div>
      <div class="parameter-right2">
        <parameterRight2 />
      </div>
      <div class="parameter-right3">
        <parameterRight3 />
      </div>
    </div>
  </div>
</template>
<script>
import {
  ArrowUp,
  Check, Plus
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'

import parameterLeft from './parameterLeft.vue';
import parameterMiddle from './parameterMiddle.vue';
import parameterRight1 from './parameterRight1.vue';
import parameterRight2 from './parameterRight2.vue';
import parameterRight3 from './parameterRight3.vue';
import store from '../../store';
export default {
  name: 'projectFooter',
  components: {
    ArrowUp,
    Plus,
    parameterLeft,
    parameterMiddle,
    parameterRight1,
    parameterRight2,
    parameterRight3,
    Check,
  },
  methods: {
    check() {
      if ((this.$store.state.EvaluationDate.TruthData.select === null && this.$store.state.EvaluationDate.TruthData.upload === false) || this.$store.state.EvaluationDate.StartDay === null || this.$store.state.EvaluationDate.EvaluatedState.select === null || this.$store.state.EvaluationDate.EvaluatedState.evaluationPre === null || (this.$store.state.EvaluationDate.Metrics.MAPE === false && this.$store.state.EvaluationDate.Metrics.RMSE === false)) {
        return "Evaluation"
      } else if (this.$store.state.parames.localParames.population === null || this.$store.state.parames.localParames.days === null) return "Parameter";
      else return "Successful"
    },
    submit() {
      // if (this.check() === "Evaluation") {
      //   ElMessage({
      //     message: 'The evaluation setting has not been fully configured yet.',
      //     type: "warning"
      //   })
      // } else if (this.check() === "Parameter") {
      //   if (this.$store.state.parames.localParames.population === null) {
      //     ElMessage({
      //       message: "The Population(N)'s parameter cannot be zero.",
      //       type: "warning"
      //     })
      //   } else {
      //     ElMessage({
      //       message: "'The Days's parameter cannot be zero.",
      //       type: "warning"
      //     })
      //   }
      // }
      // else if (this.check() === "Successful") {
      //   ElMessage({
      //     message: 'Submission successful',
      //     type: 'success',
      //   })
      //   this.$store.dispatch('getPredictDataAsync', {
      //     parames: this.$store.state.parames,
      //     ModelData: this.$store.state.ModelData,
      //     evaluation_setting: this.$store.state.EvaluationDate
      //   });
      // }
      this.$store.dispatch('getSimulationPredictDataAsync', {
        parames: this.$store.state.parames,
        ModelData: this.$store.state.ModelData,
        // evaluation_setting: this.$store.state.EvaluationDate
      });
      // this.$store.state.EvaluationDate.TruthData.select=null
      // this.$store.state.EvaluationDate.StartDay=null
      // this.$store.state.EvaluationDate.EvaluatedState.select=null
      // this.$store.state.EvaluationDate.EvaluatedState.evaluationPre=null
      // this.$store.state.EvaluationDate.Metrics.MAPE=false
      // this.$store.state.EvaluationDate.Metrics.RMSE=false

      // this.$store.dispatch('getPredictDataAsync', {
      //   parames: this.$store.state.parames,
      //   ModelData: this.$store.state.ModelData,
      //   evaluation_p: this.$store.state.evaluationPre
      // });
      this.$store.state.isShowSubmit = true
      // console.log("参数面板",{
      //   parames: this.$store.state.parames,
      //   ModelData: this.$store.state.ModelData,
      //   evaluation_p: this.$store.state.evaluationPre
      // })
    },
    handleCommand(command) {
      this.$store.dispatch('addSliderArrAsync', command)
    },
  },
};
</script>
<style scoped>
@import './projectFooter.css';
</style>
