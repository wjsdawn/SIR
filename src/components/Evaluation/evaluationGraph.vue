<template>
    <div class="evaluation-results">
        <div class="evaluation-title">
            <div>Evaluation_{{ count + 1 }}</div>
            <div>
                <p>MAPE:31.1%</p>
                <p>RMSE:58.4%</p>
            </div>
        </div>
        <div class="evaluation-button">
            <div>
            </div>
            <div>
                <el-button type="primary" size="small">Setting <el-icon style="margin-left: 3px;"><Setting />
                    </el-icon>
                </el-button>
                <el-button @click="deleteItem" type="danger" size="small">Delete <el-icon style="margin-left: 3px;">
                        <Delete />
                    </el-icon>
                </el-button>
            </div>
        </div>
        <div class="evaluation-graph"></div>
    </div>
</template>
<script>
export default {
    props: ['count', 'user'],
    data() {
        return {
        }
    },
    methods: {
        deleteItem() {
            this.$store.commit('deleteEvaluationItem', this.count)
            // this.$store.state.evaluationList.splice(this.count, 1)
        }
    }
}
</script>
<style>
@import './evaluationGraph.css';
</style>