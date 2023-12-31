export const option = {
    tooltip:{
        trigger: 'axis',
    },
    grid: {
        // width:'85%',
        left: '1%',
        right: '4%',
        top: '15%',
        bottom: '2%',
        height:'83%',
        containLabel: true
    },
    legend: {
        data: ['I(预测)', 'I(真实)'],
        type: 'scroll',
        // orient: 'vertical',
        show: true,
        left:50,
        // top: 1,
        // width:200,
        // right: 0,
        // left:"90%",
        // height:600,
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
        data: null,
        axisLabel: {
            textStyle: {
                fontWeight: 'bold' // 设置 x 轴标签字体加粗
            }
        },
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            textStyle: {
                fontWeight: 'bold' // 设置 x 轴标签字体加粗
            }
        },
    },
    series: [
        {
            name: 'I(预测)',
            data: null,
            type: 'line',
            smooth: true
        },
        {
            name: 'I(真实)',
            data: null,
            type: 'line',
            smooth: true
        }
    ]
};