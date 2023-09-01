<template>
    <div class = "parameterMiddle">
        <div class="parameterMiddle-header">
            <div id="parameterMiddle-title">Epidemic</div>
            <div class="parameterMiddle-button">
              <el-button
                type="primary"
                @click="add"
              >添加</el-button>
            </div>
        </div>

        <el-scrollbar style="height: 100%;">
        <div class="parameterMiddle-container" style="max-height: 100px;" >
            <div class = "container-top">
                <!-- <span class="basicNum">BasicNumber(R0)</span> -->
                <span class="beta">Beta</span>
                <el-slider class="sli-beta"  input-size="mini" v-model="Beta" label="11" show-input
                :show-input-controls="false" :max="50000000" :format-tooltip="formatTooltip" ></el-slider>
            </div>
            <div class = "container-middle">
                <!-- <span class="infectiousTime">InfectiousTime(Tf)</span> -->
                <span class="alpha">Alpha</span>
                <el-slider class="sli-alpha"  input-size="mini" v-model="Alpha" label="11" show-input
                :show-input-controls="false" :max=1 :step="0.001" :format-tooltip="formatTooltip" ></el-slider>
            </div>
            <div class = "container-bottom">
                <span class="gamma">Gamma</span>
                <el-slider class="sli-gamma"  input-size="mini" v-model="Gamma" label="11" show-input
                :show-input-controls="false" :max=1 :step="0.001" :format-tooltip="formatTooltip" ></el-slider>
            </div>
            <div class="add" v-for="(item, index) in array" :key="index">
           <el-input class="title" style="width:20%;margin-right:10px" v-model="names2[index]" placeholder="参数名" clearable></el-input>
          <el-slider
            class="sli"
            input-size="mini"
            v-model="values2[index]"
            label="11"
            show-input
            :show-input-controls="false"
            :max="50000000"
            :format-tooltip="formatTooltip"
          ></el-slider>
          <el-button
            class="delete"
            type="danger"
            size="small"
            icon="el-icon-delete"
            circle
            @click="del(index)"
            >删除</el-button
          >
            </div>
        </div>  
        </el-scrollbar>
    </div>
</template>

<script>
export default {
 data() {
   return {
     Beta: 0,
     Alpha: 0,
     Gamma: 0,
     array: [],
     names2: [],
     values2: []
   }
  },
 watch: {
     Beta: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changeBetaAsync', newVal)
        }
      },
      Alpha: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changeAlphaAsync', newVal)
        }
      },
      Gamma: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changeGammaAsync', newVal)
          // console.log('测试names1',newVal)
        },
        immediate: true,
        deep: true //对于数组来说要加上深度监听才行
      },
      names2: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changeNames2Async', newVal)
        },
        immediate: true,
        deep: true
      },
      values2: {
        handler(newVal, oldVal) {
          this.$store.dispatch('changeValues2Async', newVal)
        },
        immediate: true,
        deep: true
      },
    },
 methods: {
   formatTooltip(val) {
     return val / 100;
   },
   add() {
        this.array.push(1); //通过添加array的值，增加input的个数
      },
   del(index) {
       
        this.names2.splice(index, 1);
        this.values2.splice(index, 1); //先删除form中value对应索引的值
        this.array.splice(index, 1); //然后删除array对应索引的值，实现点击删除按钮，减少input框效果
      },
 }
}
</script>

<style scoped>
@import './parameterMiddle.css';
</style>