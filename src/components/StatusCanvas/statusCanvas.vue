<template>
  <div class="statusBlue">
    <!--    <h1>{{ msg }}</h1>-->
    <!--    <p>{{ pieChartData && pieChartData[0] }}</p>-->
    <div class="statusCanvas-header">
      <div id="statusCanvas-title">Model</div>
      <el-tooltip content="<span>添加SEIR模型</span>" raw-content>
        <div id="generate-default-icon" @click="DefaultGenerate"></div>
      </el-tooltip>
      <el-tooltip content="<span>关闭文字提示</span>" raw-content>
        <div id="preview-icon" @click="preview" v-if="previewIcon"></div>
      </el-tooltip>
      <el-tooltip content="<span>打开文字提示</span>" raw-content>
        <div id="preview-close-icon" @click="previewClose" v-if="!previewIcon"></div>
      </el-tooltip>
      <el-tooltip content="<span>发送矩阵数据</span>" raw-content>
        <div id="generate-Martix-icon" @click="MatrixGenerate"></div>
      </el-tooltip>
      <el-tooltip content="<span>删减状态</span>" raw-content>
        <div id="minuc-icon"></div>
      </el-tooltip>
      <el-tooltip content="<span>添加状态</span>" raw-content>
        <div id="plus-icon" @click="statusCanvasClick"></div>
      </el-tooltip>
    </div>
    <div class="blue-container">
      <svg id="blue-editor" style="width: 100%;height: 100%"></svg>
    </div>
    <div id="statusForm" v-if="formBool" @dblclick="closeStatusForm">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="Name:">
          <el-input v-model="formData.name" placeholder="name" size="small" clearable />
        </el-form-item>
        <el-form-item label="StatusType:">
          <el-select v-model="formData.statusType" class="m-2" placeholder="Select" size="small" filterable allow-create>
            <el-option v-for="item in statusTypes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <!--                  <el-input v-model="formData.statusType" placeholder="statusType" size="small" clearable />-->
        </el-form-item>
        <el-form-item label="Color:">
          <el-input v-model="formData.color" placeholder="123" size="small" style="width: 70%" clearable />
          <el-color-picker v-model="formData.color" show-alpha />
        </el-form-item>
        <el-form-item label="Description:">
          <el-input v-model="formData.description" placeholder="description" size="small" clearable />
        </el-form-item>
        <el-form-item label="InitialValue:">
          <el-input v-model="formData.initialValue" placeholder="initialValue" size="small" clearable />
        </el-form-item>
      </el-form>
    </div>
    <div id="lineForm" v-if="lineDataBool" @dblclick="closeLineForm">
      <el-form :inline="true" :model="lineConnectData" class="demo-form-inline">
        <el-form-item label="ID:">
          <el-input v-model="lineConnectData.id" placeholder="id" size="small" disabled clearable />
        </el-form-item>
        <el-form-item label="Name:">
          <el-input v-model="lineConnectData.name" placeholder="name" size="small" clearable />
        </el-form-item>
        <el-form-item label="Transition:">
          <el-select v-model="lineConnectData.lineStatus" class="m-2" placeholder="Select" size="small" filterable
            allow-create>
            <el-option v-for="item in lineTypes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <!--                  <el-input v-model="formData.statusType" placeholder="statusType" size="small" clearable />-->
        </el-form-item>
        <el-form-item label="Color:">
          <el-input v-model="lineConnectData.strokeColor" placeholder="123" size="small" style="width: 70%" clearable />
          <el-color-picker v-model="lineConnectData.strokeColor" show-alpha />
        </el-form-item>
        <el-form-item label="Description:">
          <el-input v-model="lineConnectData.transition" placeholder="description" size="small" clearable />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { ref, reactive } from 'vue'
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
    return {
      previewIcon: true,
      ModelData: {
        'Number_initial': {},
        'transition': [],
        'N': null,
      },
      drawingLine: "",
      statusMonitor: {
        count: 0,
        id: ""
      },
      exstingPorts: [],
      statusComponentList: [],
      lineList: [],
      formData: {
        id: '',
        name: '',
        color: '',
        description: '',
        initialValue: '',
        statusType: ""
      },
      formBool: false,
      line: null,
      lineConnectData: {},
      lineDataBool: false,
      statusTypes: [
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
      lineTypes: [
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
  watch: {
    formData: {
      handler(newVal) {
        console.log(this.formData.id);
        console.log(this.formData.id.split('-')[1]);
        let tempID = parseInt(this.formData.id.split('-')[1]);
        this.statusComponentList[tempID].setData(this.formData);
        this.statusComponentList[tempID].reDrawComponent();
      },
      deep: true
    },
    lineConnectData: {
      handler(newVal) {
        let that = this
        console.log(newVal);
        that.lineList.forEach(function (line, i) {
          let item = line.getConnectInfo()
          if (newVal.id == item.lineId) {
            line.setAttrData(newVal);
          }
        })
      },
      deep: true
    },
    statusComponentList: {
      handler(curVal, oldVal) {
        console.log("statusComponent改变", this.statusComponentList);
      },
      deep: true
    },
    statusMonitor: {
      handler(newValue, oldValue) {
        let id = this.statusMonitor.id
        let i = id[id.length - 1]
        let curEle = this.statusComponentList[i]
        let curPos = curEle.getPos()
        if (this.lineList.length > 0) {
          this.lineList.forEach(function (line, i) {
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
      deep: true
    }
  },
  methods: {
    preview() {
      this.previewIcon = !this.previewIcon
      d3.selectAll('.statusDimension').style('display', 'none')
      d3.selectAll('.line-text').style('display', 'none')
    },
    previewClose() {
      this.previewIcon = !this.previewIcon
      d3.selectAll('.statusDimension').style('display', 'block')
      d3.selectAll('.line-text').style('display', 'block')
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
    DefaultGenerate() {
      let that = this;
      // 绘制状态组件
      let container = d3.select("#blue-editor")
      let color = ["#5c82b6", "#fbca9c", "#f23498", "#6fbd6d"]
      let statusType = ["Susceptible", "Exposed", "Infected", "Recovered"]
      let svgWidth = container.node().getBoundingClientRect().width
      let svgHeight = container.node().getBoundingClientRect().height
      for (let i = 0; i < 4; i++) {
        let tempId = that.statusComponentList.length
        let options = {
          id: `status-${tempId}`,
          name: "名字",
          x: svgWidth / 2 - 45,
          y: 20 + (svgHeight / 4) * i,
          color: color[i],
          statusType: statusType[i]
        }
        let temp = new statusComponent(container, options)
        that.statusComponentList.push(temp)
      }
      // 绘制线条,连接点的顺序为左右上下
      let allPorts = []
      that.statusComponentList.forEach(function (component, i) {
        let item = component.getPorts()
        for (let value of Object.values(item)) {
          allPorts.push(value)
        }
      });
      for (let i = 0; i < 3; i++) {
        let x = allPorts[3 + i * 4].parentX + allPorts[3 + i * 4].x
        let y = allPorts[3 + i * 4].parentY + allPorts[3 + i * 4].y
        let x2 = allPorts[6 + i * 4].parentX + allPorts[6 + i * 4].x
        let y2 = allPorts[6 + i * 4].parentY + allPorts[6 + i * 4].y
        let lineId = `line-${that.lineList.length}`
        let line = (that.drawingLine = new statusLine(
          container,
          "line",
          [x, y],
          that.statusComponentList[i],
          allPorts[i * 4].id,
          '#ffe700',
          lineId,
        ))
        // debugger;
        that.lineList.push(line);
        line.dynamicGenerateCurveLine([x, y])
        line.setLine(that.statusComponentList[i + 1], [x2, y2])
      }
      console.log(that.lineList);
    },
    MatrixGenerate() {
      let that = this
      console.log(this.statusComponentList);
      console.log(this.lineList);
      that.setStatusNumber();
      that.ModelData['N'] = that.statusComponentList.length
      that.setTransitionMatrix();
      console.log(that.ModelData);
      that.$store.commit('setModelData', that.ModelData)
      console.log("发送的模型数据", that.$store.state.ModelData);
    },
    setStatusNumber() {
      let that = this;
      that.statusComponentList.forEach((item) => {
        that.ModelData['Number_initial'][item.statusType] = item.initialValue
      })
    },
    setTransitionMatrix() {
      let that = this;
      let arr = that.createArray(that.ModelData['N'])
      console.log(arr);
      that.lineList.forEach((line) => {
        let item = line.getConnectInfo()
        let i = that.getStatusPosition(item.sourceId)
        let j = that.getStatusPosition(item.targetId)
        // arr[i][j] = `${item.status}*${that.statusComponentList[i]['statusType']}*${that.statusComponentList[j]['initialValue']}`
        arr[i][j] = `${item.status}`
        console.log(item);
      })
      that.ModelData['transition'] = arr;
    },
    createArray(n) {
      let arr = []
      for (let i = 0; i < n; i++) {
        arr[i] = []
        for (let j = 0; j < n; j++) {
          arr[i][j] = 0
        }
      }
      return arr;
    },
    getStatusPosition(id) {
      let that = this;
      let d = null
      that.statusComponentList.forEach((item, index) => {
        if (item.id == id) {
          d = index
        }
      })
      return d
    },
    lineEvent() {
      let event = d3.dispatch('click', 'dvlclick')
      console.log(event);
    },
    statusMonitorAdd(id) {
      this.statusMonitor.count += 1;
      this.statusMonitor.id = id;
    },
    deleteStatus(id) {
      let that = this;
      that.statusComponentList.forEach((component, i) => {
        if (component.id == id) {
          that.statusComponentList.splice(i, 1)
        }
      })
    },
    getLineIsDrawing() {
      return this.$store.state.lineIsdDrawing;
    },
    setLineIsDrawing() {
      this.$store.state.lineIsdDrawing = !this.$store.state.lineIsdDrawing;
    },
    closeStatusForm() {
      this.formBool = false
    },
    closeLineForm() {
      this.lineDataBool = false
    },
    setStatusForm(data) {
      // 设置数据
      let that = this;
      that.formData = data
      that.lineDataBool = false
      that.formBool = true;
    },
    setLineData(id) {
      let that = this;
      that.lineList.forEach(function (line, i) {
        let item = line.getConnectInfo()
        if (id == item.lineId) {
          that.lineConnectData = {
            id: item.lineId,
            name: item.name,
            transition: item.transition,
            strokeColor: item.strokeColor,
            lineStatus: item.status
          }
        }
      })
      that.formBool = false
      that.lineDataBool = true
      console.log(that.lineConnectData);
    },
    componentConnect(e) {
      let that = this
      //绘制连线
      let container = d3.select("#blue-editor")
      // that.line = new statusLine2(container)
      // console.log(e);
      // that.line.setStartCoords(e)
      // container.on('mousemove',function() {
      //   that.line.previewCurve(this)
      // })
      let lineId = `line-${that.lineList.length}`
      console.log([e.x, e.y])
      // debugger;
      let line = (that.drawingLine = new statusLine(
        container,
        "line",
        [e.x, e.y],
        e.component,
        e.parent,
        '#ffe700',
        lineId,
      ))
      console.log(container);
      that.lineList.push(line);
      let allPorts = []
      that.statusComponentList.forEach(function (component, i) {
        if (component.id != e.parent) {
          console.log(component.getPorts());
          let item = component.getPorts()
          for (let value of Object.values(item)) {
            allPorts.push(value)
          }
          // allPorts.push(component.getPorts())
        }
      });
      that.exstingPorts = allPorts
      console.log(that.exstingPorts);
      container.on("mousemove", function () {
        if (that.drawingLine.getConnectInfo()['target'] == "") {
          let coordinates = d3.mouse(this)
          line.dynamicGenerateCurveLine(coordinates)
          line.findNearestPoint(coordinates, that.exstingPorts)
        }
      })
    },
    componentConnectEnd() {
      let that = this;
      that.line.endDrawing();
    },
    statusCanvasClick(e) {
      let that = this;
      // 绘制状态组件
      let container = d3.select("#blue-editor")
      let tempId = that.statusComponentList.length
      let options = {
        id: `status-${tempId}`,
        name: "名字"
      }
      let temp = new statusComponent(container, options)
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
    window.deleteStatus = that.deleteStatus
    // 线条的动画
    setInterval(function () {
      that.lineList.forEach(function (line) {
        line.animate();
      })
    })

    this.lineEvent()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statusBlue {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.statusBlue>.statusCanvas-header {
  flex: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.statusBlue>.blue-container {
  flex: 4;
}

#statusCanvas-title {
  height: 100%;
  flex: 1;
  text-align: left;
  font-size: 1.5em;
}

#preview-close-icon {
  height: 100%;
  flex: 0.07;
  background: url("../../assets/关闭预览.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}

#preview-icon {
  height: 100%;
  flex: 0.07;
  background: url("../../assets/预览 .png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}

#generate-default-icon {
  height: 100%;
  flex: 0.07;
  background: url("../../assets/生成配置.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}

#generate-Martix-icon {
  height: 100%;
  flex: 0.07;
  background: url("../../assets/代码生成.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}

#plus-icon {
  height: 100%;
  flex: 0.07;
  background: url("../../assets/加.png") no-repeat center;
  background-size: 100% 100%;
  /*border: 2px solid black;*/
  cursor: pointer;
}

#minuc-icon {
  height: 100%;
  flex: 0.07;
  background: url("../../assets/减.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}

#statusForm {
  position: absolute;
  top: 30px;
  width: 200px;
  height: 250px;
  background: azure;
}

#lineForm {
  position: absolute;
  top: 30px;
  width: 200px;
  height: 250px;
  background: azure;
}

.g-line {
  z-index: 100;
}
</style>