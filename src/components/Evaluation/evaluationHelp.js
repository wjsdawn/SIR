import * as echarts from 'echarts'
let drawLineChart = (container) => {
    var Chart = echarts.init(document.getElementById(container))
    var option = {
        grid: {
            left: '1%',
            right: '4%',
            top: '14%',
            bottom: '3%',
            // heigth:'100%',
            containLabel: true
        },
        legend: {
            data: ['I(预测)', 'I(真实)'],
            type: 'scroll',
            // orient: 'vertical',
            show: true,
            left:180,
            // top: 1,
            // width:200,
            right: 0,
          // left:"90%",
            height:600,
            // top:70,
            // bottom: 20,
            icon:'circle',
            itemWidth:5,
            itemHeight:5,
            textStyle: {
              fontSize: 8,
              color: "#8392A5",
            },
          },
        xAxis: {
            type: 'category',
            data: [1,2,3,4,5,6,7]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'I(预测)',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            },
            {
                name: 'I(真实)',
                data: [600, 800, 700, 750, 1100, 1230, 1220],
                type: 'line',
                smooth: true
            }
        ]
    };
    Chart.setOption(option)
}
export default drawLineChart;