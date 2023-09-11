import * as echarts from 'echarts'
let drawStackChart = (container, names,time,sereiesData) => {
  var Chart = echarts.init(document.getElementById(container))
  var option = {
    // title: {
    //   text: '疫情传播趋势预测图',
    //   top: '1.5%',
    //   textStyle: {
    //     color: '#80ffff',
    //     fontweight: 'lighter',
    //     fontfamily: "Times New Roman",
    //   },
    // },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(5, 58, 87, 0.7)',
      borderColor: 'rgba(216, 216, 216, 0.43)',
      textStyle: {
        color: 'rgba(255,255,255,0.8)',
      },
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      // formatter: (params) => {
      //   this.leida = params[1].name
      //   let str = "日期：" + params[1].name + "<br/>"
      //   for (var i = 0; i < params.length; i++) {
      //     str += params[i].seriesName + ":" + (params[i].value / 10000) + "万人<br/>"
      //   }
      //   return str
      // }

    },
    legend: {
      // data: ['易感者', '潜伏者', '感染者', '住院者(两类)', '治愈者', '死亡者'],
      data: names,
      type: 'scroll',

      show: true,
      left: 100,
      top: 1,
      width: 700,
      // right: 100,
      // left:"90%",
      height: 600,
      // top:70,
      // bottom: 20,
      textStyle: {
        fontSize: 7,
        color: "#8392A5",
      },
    },
    dataZoom: {
      // zoomLock: true,
      type: "inside",
      textStyle: {
        color: "#8392A5",
      },
      dataBackground: {
        areaStyle: {
          color: "#8392A5",
        },
        lineStyle: {
          opacity: 0.8,
          color: "#8392A5",
        },
      },
      brushSelect: true,
    },
    toolbox: {
      show: true,
      feature: {
        magicType: {
          type: ['line', 'bar'] //图表类型切换
        },
        saveAsImage: {},
        dataZoom: {}
      }
    },
    grid: {
      left: '1%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: time
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: sereiesData
  }
  Chart.setOption(option)
}
export default drawStackChart;