<template>
  <div class="statusBlue">
<!--    <h1>{{ msg }}</h1>-->
<!--    <p>{{ pieChartData && pieChartData[0] }}</p>-->
    <div class="statusCanvas-header">
      <div id="statusCanvas-title">Model</div>
        <div id="generate-default-icon" @click="DefaultGenerate"></div>
        <div id="preview-icon" @click="preview" v-if="previewIcon"></div>
        <div id="preview-close-icon" @click="previewClose" v-if="!previewIcon"></div>
        <div id="generate-Martix-icon" @click="MatrixGenerate"></div>
        <div id="minuc-icon"></div>
      <div id="plus-icon" @click="statusCanvasClick"></div>
    </div>
    <div class="blue-container">
        <svg id="blue-editor" style="width: 100%;height: 100%" ></svg>
    </div>
      <div id="statusForm" v-if="formBool" @dblclick="closeStatusForm">
          <el-form :inline="true" :model="formData" class="demo-form-inline">
              <el-form-item label="name:">
                  <el-input v-model="formData.name" placeholder="name" size="small" clearable />
              </el-form-item>
              <el-form-item label="statusType:">
                  <el-select v-model="formData.statusType" class="m-2" placeholder="Select" size="small">
                      <el-option
                              v-for="item in statusTypes"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                      />
                  </el-select>
<!--                  <el-input v-model="formData.statusType" placeholder="statusType" size="small" clearable />-->
              </el-form-item>
              <el-form-item label="color:">
                  <el-input v-model="formData.color" placeholder="123" size="small" style="width: 70%" clearable />
                  <el-color-picker v-model="formData.color" show-alpha />
              </el-form-item>
              <el-form-item label="description:">
                  <el-input v-model="formData.description" placeholder="description" size="small" clearable />
              </el-form-item>
              <el-form-item label="initialValue:">
                  <el-input v-model="formData.initialValue" placeholder="initialValue" size="small" clearable />
              </el-form-item>
          </el-form>
      </div>
      <div id="lineForm" v-if="lineDataBool" @dblclick="closeLineForm">
          <el-form :inline="true" :model="lineConnectData" class="demo-form-inline">
              <el-form-item label="ID:">
                  <el-input v-model="lineConnectData.id" placeholder="id" size="small" disabled clearable />
              </el-form-item>
              <el-form-item label="lineType:">
                  <el-select v-model="lineConnectData.lineStatus" class="m-2" placeholder="Select" size="small">
                      <el-option
                              v-for="item in lineTypes"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                      />
                  </el-select>
                  <!--                  <el-input v-model="formData.statusType" placeholder="statusType" size="small" clearable />-->
              </el-form-item>
              <el-form-item label="color:">
                  <el-input v-model="lineConnectData.strokeColor" placeholder="123" size="small" style="width: 70%" clearable />
                  <el-color-picker v-model="lineConnectData.strokeColor" show-alpha />
              </el-form-item>
              <el-form-item label="transition:">
                  <el-input v-model="lineConnectData.transition" placeholder="description" size="small" clearable />
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
import * as d3  from 'd3'
import { ref,reactive } from 'vue'
import statusLine from './statusLine';
import statusComponent from "./statusComponent";
import statusLine2 from './statusLine2';
export default {
  name: 'PieChart',
  // setup(){
  //   const formData = reactive({
  //     id:'',
  //     name:'',
  //     color:'',
  //     description:'',
  //     initialValue:'',
  //   })
  //   return {formData}
  // },
  props: {
    msg: String,
    pieChartData: Array,
  },
  data() {
    return{
      previewIcon:false,
      ModelData:{
        'Number_initial':{},
        'transition':[],
        'N':null,
      },
      drawingLine:"",
      statusMonitor:{
        count:0,
        id:""
      },
      exstingPorts:[],
      statusComponentList:[],
      lineList:[],
      formData:{
            id:'',
            name:'',
            color:'',
            description:'',
            initialValue:'',
            statusType:""
      },
      formBool:false,
      line:null,
      lineConnectData:{},
      lineDataBool:false,
      statusTypes:[
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
        },
      ],
      lineTypes:[
        {
          value: 'beta',
          label: 'beta',
        },
        {
          value: 'alpha',
          label: 'alpha',
        },
        {
          value: 'gamma',
          label: 'gamma',
        },
      ],
    }
  },
  watch:{
    formData:{
      handler(newVal){
        console.log(this.formData.id);
        console.log(this.formData.id.split('-')[1]);
        let tempID = parseInt(this.formData.id.split('-')[1]);
        this.statusComponentList[tempID].setData(this.formData);
        this.statusComponentList[tempID].reDrawComponent();
      },
      deep:true
    },
    lineConnectData:{
      handler(newVal){
        let that = this
        console.log(newVal);
        that.lineList.forEach(function(line,i) {
          let item = line.getConnectInfo()
          if(newVal.id == item.lineId){
            line.setAttrData(newVal);
          }
        })
      },
      deep:true
    },
    statusComponentList:{
      handler(curVal,oldVal){
        console.log(this.statusComponentList);
        console.log("statusComponent改变")
      },
      deep:true
    },
    statusMonitor:{
      handler(newValue,oldValue){
        let id = this.statusMonitor.id
        let i = id[id.length-1]
        let curEle = this.statusComponentList[i]
        let curPos = curEle.getPos()
        if(this.lineList.length>0){
          this.lineList.forEach(function(line,i) {
            let connectInfo = line.getConnectInfo()
            line.parentPosUpdated(
              curPos.dx,
              curPos.dy,
              curEle.inPorts,
              curEle.outPorts,
              curEle.id,
              connectInfo.status
            )
          })
        }
      },
      deep:true
    }
  },
  methods:{
    preview(){
      this.previewIcon = !this.previewIcon
      d3.selectAll('.statusDimension').style('display','none')
      d3.selectAll('.line-text').style('display','none')
    },
    previewClose(){
      this.previewIcon = !this.previewIcon
      d3.selectAll('.statusDimension').style('display','block')
      d3.selectAll('.line-text').style('display','block')
      // console.log(d3.selectAll('.line'));
      // // 添加线的文本
      // let item = d3.selectAll('.line')['_groups'][0]
      // let len = d3.selectAll('.line')['_groups'][0].length
      // console.log(item);

      // for(let i=0;i<len;i++){
      //   d3.select("#blue-editor").append('text')
      //     .attr('class','line-text')
      //     .attr('x',function() {
      //       // console.log(d3.select(this));
      //       // console.log(d3.select(this)['_groups'][0][0]['__data__']['x']);
      //       return item[i]['__data__']['x']
      //     })
      //     .attr('y',function() {
      //       return item[i]['__data__']['y']/2
      //     })
      //     .attr("text-anchor", "middle")
      //     .attr("dominant-baseline", "middle")
      //     .attr('font-size',"15x")
      //     .attr('fill','#000000')
      //     .text('asdasd')
      // }
    },
    DefaultGenerate(){
      let that = this;
      for(let i=0;i<4;i++){
        that.statusCanvasClick()
      }
    },
    MatrixGenerate(){
      let that = this
      console.log(this.statusComponentList);
      console.log(this.lineList);
      that.setStatusNumber();
      that.ModelData['N'] = that.statusComponentList.length
      that.setTransitionMatrix();
      console.log(that.ModelData);
      that.$store.commit('setModelData',that.ModelData)
      console.log(that.$store.state.ModelData);
    },
    setStatusNumber(){
      let that = this;
      that.statusComponentList.forEach((item)=>{
        that.ModelData['Number_initial'][item.statusType] = item.initialValue
      })
    },
    setTransitionMatrix(){
      let that = this;
      let arr = that.createArray(that.ModelData['N'])
      console.log(arr);
      that.lineList.forEach((line)=>{
        let item = line.getConnectInfo()
        let i = that.getStatusPosition(item.sourceId)
        let j = that.getStatusPosition(item.targetId)
        arr[i][j] = `${item.status}*${that.statusComponentList[i]['initialValue']}*${that.statusComponentList[j]['initialValue']}`
        console.log(item);
      })
      that.ModelData['transition'] = arr;
    },
    createArray(n){
      let arr = []
      for(let i=0;i<n;i++){
        arr[i] = []
        for(let j=0;j<n;j++){
          arr[i][j] = 0
        }
      }
      return arr;
    },
    getStatusPosition(id){
      let that = this;
      let d = null
      that.statusComponentList.forEach((item,index)=>{
        if(item.id==id){
          d = index
        }
      })
      return d
    },
    lineEvent(){
      let event = d3.dispatch('click','dvlclick')
      console.log(event);
    },
    statusMonitorAdd(id){
      this.statusMonitor.count += 1;
      this.statusMonitor.id = id;
    },
    getLineIsDrawing(){
      return this.$store.state.lineIsdDrawing;
    },
    setLineIsDrawing(){
      this.$store.state.lineIsdDrawing = !this.$store.state.lineIsdDrawing;
    },
    closeStatusForm(){
      this.formBool = false
    },
    closeLineForm(){
      this.lineDataBool = false
    },
    setStatusForm(data){
      // 设置数据
      let that = this;
      that.formData = data
      that.lineDataBool = false
      that.formBool = true;
    },
    setLineData(id){
      let that = this;
      that.lineList.forEach(function(line,i) {
        let item = line.getConnectInfo()
        if(id == item.lineId){
          that.lineConnectData = {
            id:item.lineId,
            transition:item.transition,
            strokeColor:item.strokeColor,
            lineStatus:item.status
          }
        }
      })
      that.formBool = false
      that.lineDataBool = true
      console.log(that.lineConnectData);
    },
    componentConnect(e){
      let that = this
      console.log("绘制连接线")
      let container = d3.select("#blue-editor")
      // that.line = new statusLine2(container)
      // console.log(e);
      // that.line.setStartCoords(e)
      // container.on('mousemove',function() {
      //   that.line.previewCurve(this)
      // })
      let lineId = `line-${that.lineList.length}`
      let line = (that.drawingLine = new statusLine(
        container,
        "line",
        [e.x,e.y],
        e.component,
        e.parent,
        '#ffe700',
        lineId,
      ))
      console.log(container);
      that.lineList.push(line);
      let allPorts = []
      that.statusComponentList.forEach(function(component,i) {
        if(component.id!=e.parent){
          console.log(component.getPorts());
          let item = component.getPorts()
          for(let value of Object.values(item)){
            allPorts.push(value)
          }
          // allPorts.push(component.getPorts())
        }
      });
      that.exstingPorts = allPorts
      console.log(that.exstingPorts);

      container.on("mousemove",function () {
        if(that.drawingLine.getConnectInfo()['target']==""){
          let coordinates = d3.mouse(this)
          line.dynamicGenerateCurveLine(coordinates)
          line.findNearestPoint(coordinates,that.exstingPorts)
        }
      })
    },
    componentConnectEnd(){
      let that =this;
      that.line.endDrawing();
    },
    statusCanvasClick(e){
      let that = this;
      // 线条绘制
      // console.log("statusCanvasClick点击")
      // console.log(e)
      // console.log(e.parentX)
      // console.log(e.x)
      // let container = d3.select("#blue-editor")
      // let line = new statusLine(
      //   container,
      //   "line",
      //    [e.x,e.y],
      //   "asd",
      //   "ad",
      //   '#ffe700'
      // )
      // container.on("mousemove",function () {
      //   let coordinates = d3.mouse(this)
      //   console.log(coordinates);
      //   line.dynamicGenerateCurveLine(coordinates)
      //
      // })

      // 绘制状态组件
      let container = d3.select("#blue-editor")
      let tempId = that.statusComponentList.length
      let options = {
        id:`status-${tempId}`,
        name:"名字"
      }
      let temp = new statusComponent(container,options)
      that.statusComponentList.push(temp)
    }
  },
  mounted() {
    let that = this;
    window.setStatusForm = that.setStatusForm
    window.componentConnect = that.componentConnect
    window.getLineIsDrawing = that.getLineIsDrawing
    window.setLineIsDrawing = that.setLineIsDrawing
    window.componentConnectEnd = that.componentConnectEnd
    window.statusMonitorAdd = that.statusMonitorAdd
    window.setLineData = that.setLineData
    // 线条的动画
    setInterval(function() {
      that.lineList.forEach(function(line) {
        line.animate();
      })
    })

    this.lineEvent()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statusBlue{
    position:relative;
    width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.statusBlue>.statusCanvas-header{
  flex: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
    margin: 5px;
}
.statusBlue>.blue-container{
  flex: 4;
}
#statusCanvas-title{
    height: 100%;
    flex: 1;
    text-align: left;
    font-size: 1.5em;
}
#preview-close-icon{
    height: 100%;
    flex: 0.07;
    background: url("../../assets/关闭预览.png") no-repeat center;
    background-size: 100% 100%;
}
#preview-icon{
    height: 100%;
    flex: 0.07;
    background: url("../../assets/预览 .png") no-repeat center;
    background-size: 100% 100%;
}
#generate-default-icon{
    height: 100%;
    flex: 0.07;
    background: url("../../assets/生成配置.png") no-repeat center;
    background-size: 100% 100%;
}
#generate-Martix-icon{
    height: 100%;
    flex: 0.07;
    background: url("../../assets/代码生成.png") no-repeat center;
    background-size: 100% 100%;
}
#plus-icon{
    height: 100%;
    flex: 0.07;
    background: url("../../assets/加.png") no-repeat center;
    background-size: 100% 100%;
    /*border: 2px solid black;*/
}
#minuc-icon{
    height: 100%;
    flex: 0.07;
    background: url("../../assets/减.png") no-repeat center;
    background-size: 100% 100%;
}
#statusForm{
    position: absolute;
    top:30px;
    width:200px;
    height:250px;
    background: azure;
}
#lineForm{
    position: absolute;
    top:30px;
    width:200px;
    height:250px;
    background: azure;
}
.g-line{
    z-index: 100;
}
</style>