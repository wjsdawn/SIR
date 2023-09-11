<template>
  <div class="projectFooter">
    <div class="parameter-header">
      <span class="parameter-title">Parameter</span>
      <div class="parameter-dropdown">
        <el-dropdown size="small" @command="handleCommand">
          <el-button
            class="el-dropdown-link"
            size="small"
            type="primary">
            Add <el-icon class="el-icon--right"><arrow-up/></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="0" divided icon="el-icon-plus">
                    <el-icon><Plus/></el-icon>Location 
                </el-dropdown-item>
                <el-dropdown-item command="1" divided icon="el-icon-plus">
                    <el-icon><Plus/></el-icon>Epidemic
                </el-dropdown-item>
                <el-dropdown-item command="2" divided icon="el-icon-plus">
                    <el-icon><Plus/></el-icon>Interventions
                </el-dropdown-item>
                <el-dropdown-item command="3" divided icon="el-icon-plus">
                    <el-icon><Plus/></el-icon>Healthcare
                </el-dropdown-item>
                <el-dropdown-item command="4" divided icon="el-icon-plus">
                    <el-icon><Plus/></el-icon>Vaccine
                </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-button
        class="submit"
        type="danger"
        size="small"
        @click="submit"
        >Submit <el-icon class="el-icon--right"><check /></el-icon>
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
  Delete,
  Edit,
  Search,
  Share,
  Upload,
  Check,
  Plus,
  ArrowDown,
  Right,
} from '@element-plus/icons-vue';

import parameterLeft from './parameterLeft.vue';
import parameterMiddle from './parameterMiddle.vue';
import parameterRight1 from './parameterRight1.vue';
import parameterRight2 from './parameterRight2.vue';
import parameterRight3 from './parameterRight3.vue';
export default {
  name: 'projectFooter',
  components: {
    parameterLeft,
    parameterMiddle,
    parameterRight1,
    parameterRight2,
    parameterRight3,
    Check,
  },
  methods: {
    submit() {
      this.$store.dispatch('getPredictDataAsync', {
        parames: this.$store.state.parames,
        ModelData: this.$store.state.ModelData,
      });
    },
    handleCommand(command) {
       this.$store.dispatch('addSliderArrAsync',command)
    },
  },
};
</script>
<style scoped>
@import './projectFooter.css';
</style>
