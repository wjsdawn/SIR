<template>
    <div class="projectFooter">
        <div class="parameter-header">
            <span class="parameter-title">Parameter</span>
            <el-button
                class="submit"
                type="danger"
                size="small"
                icon="Check"
                @click="submit"
                >Submit</el-button>    
        </div>
        <div class="parameter-container">
            <div class="parameter-left">
                <parameterLeft/>
            </div>
            <div class="parameter-middle">
                <parameterMiddle/>
            </div>
            <div class="parameter-right1">
                <parameterRight1/>
            </div>
            <div class="parameter-right2">
                <parameterRight2/>
            </div>
            <div class="parameter-right3">
                <parameterRight3/>
            </div>
        </div>
        
    </div>
</template>
<script>
import { Delete, Edit, Search, Share, Upload, Check} from '@element-plus/icons-vue'

import parameterLeft from "./parameterLeft.vue";
import parameterMiddle from "./parameterMiddle.vue";
import parameterRight1 from "./parameterRight1.vue";
import parameterRight2 from "./parameterRight2.vue";
import parameterRight3 from "./parameterRight3.vue";
export default {
    name: "projectFooter",
    components: {
            parameterLeft,
            parameterMiddle,
            parameterRight1,
            parameterRight2,
            parameterRight3,
            Check
    },
    methods:{
        submit() {
            this.$store.dispatch('getPredictDataAsync', { parames: this.$store.state.parames, modelData: 1 })
        }

    }
}
</script>
<style scoped>
@import './projectFooter.css';
</style>