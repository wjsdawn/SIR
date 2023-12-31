import * as echarts from 'echarts'
let drawStackChart = (container, names,time,sereiesData) => {
  var Chart = echarts.init(document.getElementById(container))
  var option = {
    // textStyle: {
    //   fontWeight: 'bold',// 设置名称的字体加粗
    //   fontSize: 16 // 设置名称的字体大小
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
    },
    legend: {
      data: names,
      type: 'scroll',
      show: true,
      left: 100,
      top: 1,
      width: 700,
      height: 600,
      textStyle: {
        fontSize: 7,
        color: "#8392A5",
      },
    },
    dataZoom: {
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
      left: '2%',
      right: '2%',
      width:'96%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: time,
        axisLabel: {
          textStyle: {
            fontWeight: 'bold' // 设置 x 轴标签字体加粗
          }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontWeight: 'bold' // 设置 x 轴标签字体加粗
          }
        },
      }
    ],
    series: sereiesData
  }
  Chart.setOption(option)
}
export default drawStackChart;