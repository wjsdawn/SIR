import * as d3 from 'd3'

export default class statusComponent {
  constructor(canvas,options) {
    // 状态属性
    let that = this;
    this.id = options.id;
    this.name = options.name;
    this.color = '#9a9999';
    this.description = "";
    this.initialValue = "";
    this.inPort = [];
    this.outPort = [];

    // 图形属性
    this.canvas = canvas;
    this.dx = 0;
    this.dy = 0;
    this.x = 150;
    this.y = 150;
    this.componentOptions = [{
      rectHeight: 75,
      rectWidth: 90,
      rectFill:that.color,
      circleRadius: 5,
      circleFill: "#FFFFFF"
    }];
    // 创建图形组
    this.container = canvas.datum({'x':this.x,y:this.y})
      .append("g")
      .attr('transform',function(d){
        return `translate(${d.x},${d.y})`
      })
      .attr('id',that.id)
    //事件添加
    this.container.call(d3.drag()
      .on("drag",function (d) {
        console.log("asdasd")
        that.dragged(this,d)
      })
    )
    // 绘制组件
    this.drawComponent();
  }
  drawComponent(){
    let that = this

    console.log(that.canvas);
    // 绘制矩形
    // let g = that.canvas.append("g")
    //   .attr('id',that.id)

    let rect = that.container.selectAll('.rect')
      .data(that.componentOptions)
      .enter()
      .append("rect")
      .attr('x',that.x)
      .attr('y',that.y)
      .attr('width',d=>d.rectWidth)
      .attr('height',d=>d.rectHeight)
      .attr('fill','#409EFF')
    // 绘制圆形
    let leftCircle = that.container.selectAll('.circle')
      .data(that.componentOptions)
      .enter()
      .append('circle')
      .attr('cx',function (d) {
        return that.x + 10;
      })
      .attr('cy',function (d) {
        return that.y + d.rectHeight/2;
      })
      .attr('r',d=>d.circleRadius)
      .attr('stroke','#000000')
      .attr('stroke-width',1)
      .attr('fill',"#FFFFFF")
    let rightCircle = that.container.selectAll('.circle')
      .data(that.componentOptions)
      .enter()
      .append('circle')
      .attr('cx',function (d) {
        return that.x + d.rectWidth - 10;
      })
      .attr('cy',function (d) {
        return that.y + d.rectHeight/2;
      })
      .attr('r',d=>d.circleRadius)
      .attr('stroke','#000000')
      .attr('stroke-width',1)
      .attr('fill',"#FFFFFF")
    // 添加拖动事件
    function onDrag(d) {
      d.x += d3.event.dx;
      d.y += d3.event.dy;

      d3.select(this)
        .attr("x", d.x)
        .attr("y", d.y);
    }
  };
  dragged(node,d){
    let that = this

    d3.select(node).attr("transform", function (q) {

      //console.log("d3.event.x y, that.x,y", d3.event.x, d3.event.y, that.x, that.y)
      that.dx = d3.event.x - that.x
      that.dy = d3.event.y - that.y
      that.x = d3.event.x
      that.y = d3.event.y
      d.x = d3.event.x
      d.y = d3.event.y
      return 'translate(' + d.x + ',' + d.y + ')'
    });


    this.container.selectAll('.port')
      .attr('none', function (d) {
        d.parentX = that.x
        d.parentY = that.y
      })

  }
}