import * as d3 from 'd3'

export default class statusComponent {
  constructor(canvas,options) {
    // 状态属性
    let that = this;
    this.id = options.id;
    this.name = options.name;
    this.color = options.color == undefined?'#409EFF':options.color;
    this.statusType = options.statusType == undefined?"Susceptible":options.statusType;
    this.description = "状态description";
    this.initialValue = "";
    this.inPort = [];
    this.outPort = [];

    // 图形属性
    this.canvas = canvas;
    this.dx = 0;
    this.dy = 0;
    // this.x = 100*Math.random() + 150;
    // this.y = 100*Math.random() + 150;
    this.x = options.x == undefined?100*Math.random() + 150:options.x
    this.y = options.y == undefined?100*Math.random() + 150:options.y
    // this.parentX = this.x
    // this.parentY = this.y
    this.componentOptions = [{
      rectHeight: 75,
      rectWidth: 90,
      rectFill:that.color,
      circleRadius: 5,
      circleFill: that.color
    }];
    //
    this.rect = null
    this.text = null
    this.dimension = null
    // 创建ports数据
    this.setPorts()
    // 创建图形组
    this.container = canvas.datum({'x':this.x,y:this.y})
      .append("g")
      .attr('transform',function(d){
        console.log(`translate(${d.x},${d.y})`);
        return `translate(${d.x},${d.y})`
      })
      .attr('id',that.id)
      .on('dblclick',function() {
        that.container.remove()
        deleteStatus(that.id)
      })
    //事件添加
    this.container.call(d3.drag()
      .on("drag",function (d) {
        that.dragged(this,d)
      })
    )
    // 绘制组件
    this.drawComponent();
  }
  getPos(){
    return {'x':this.x,'y':this.y,'dx':this.dx,'dy':this.dy}
  }
  setPorts(){
    let that = this
    let i = 0
    // 左右上下
    that.inPort.push({
      id:that.id,
      name:i++,
      x:10,
      y:that.componentOptions[0].rectHeight/2,
      parentX:that.x,
      parentY:that.y,
    })
    that.inPort.push({
      id:that.id,
      name:i++,
      x:that.componentOptions[0].rectWidth-10,
      y:that.componentOptions[0].rectHeight/2,
      parentX:that.x,
      parentY:that.y,
    })
    that.inPort.push({
      id:that.id,
      name:i++,
      x:that.componentOptions[0].rectWidth/2,
      y:10,
      parentX:that.x,
      parentY:that.y,
    })
    that.inPort.push({
      id:that.id,
      name:i++,
      x:that.componentOptions[0].rectWidth/2,
      y:that.componentOptions[0].rectHeight-10,
      parentX:that.x,
      parentY:that.y,
    })
  }
  getPorts(){
    let that = this
    return {...that.inPort}
  }
  setData(data){
    this.name = data.name
    this.color = data.color
    this.description = data.description
    this.initialValue = data.initialValue
    this.statusType = data.statusType
    this.componentOptions[0].rectFill = data.color
  }
  getData(){
    let that = this;
    return {
      id:that.id,
      name:that.name,
      color:that.color,
      description:that.description,
      initialValue:that.initialValue,
      statusType:this.statusType
    }
  }
  reDrawComponent(){
    this.rect.attr('fill',this.color)
    this.text.text(this.statusType[0])
    this.dimension.text(this.statusType)

  }
  drawComponent(){
    let that = this

    console.log(that.canvas);
    // 绘制矩形
    // let g = that.canvas.append("g")
    //   .attr('id',that.id)

    that.rect = that.container.selectAll('.rect')
      .data(that.componentOptions)
      .enter()
      .append("rect")
      // .attr('x',that.x)
      .attr('id',`${that.id}-rect`)
      // .attr('y',that.y)
      .attr('class','status')
      .attr('width',d=>d.rectWidth)
      .attr('height',d=>d.rectHeight)
      .attr('fill',d=>d.rectFill)
      .on('contextmenu',function(d) {
        // 禁止右键默认行为
        d3.event.preventDefault();
        setStatusForm(that.getData());
        console.log(that.id)
      })
      .on('mouseover',function(d) {
        that.container.append('text')
          .attr('id','component-text')
          .attr('y','-10')
          .attr('fill','#909399')
          .text(that.description)
        d3.select(this).style('cursor','pointer')
      })
      .on('mouseout',function(d) {
        d3.select("#component-text").remove()
      })
    let circle = that.container.selectAll('port')
      .data(that.inPort)
      .enter()
      .append('circle')
      .attr('class','port')
      .attr('cx',function(d,i) {
        // d.x = 10 + i*(that.componentOptions[0].rectWidth-20)
        return d.x
      })
      .attr('cy',function(d) {
        // d.y = that.componentOptions[0].rectHeight/2
        return d.y;
      })
      .attr('r',that.componentOptions[0].circleRadius)
      .attr('stroke','#000000')
      .attr('stroke-width',1)
      .attr('fill',"#FFFFFF")
    // 绘制圆形 禁用
    // let leftCircle = that.container.selectAll('port')
    //   .data(that.inPort)
    //   .enter()
    //   .append('circle')
    //   .attr('class','port')
    //   .attr('cx',function (d) {
    //     console.log(that.inPort);
    //     d.x = 10
    //     return 10;
    //   })
    //   .attr('cy',function (d) {
    //     d.y = that.componentOptions[0].rectHeight/2
    //     return d.y;
    //   })
    //   .attr('r',that.componentOptions[0].circleRadius)
    //   .attr('stroke','#000000')
    //   .attr('stroke-width',1)
    //   .attr('fill',"#FFFFFF")
    //   // .on('click',function(event) {
    //   //
    //   //   console.log("leftCircle-click")
    //   //   let coordinates = d3.mouse(this)
    //   //   console.log(d3.event)
    //   //   let x = d3.event.offsetX
    //   //   let y = d3.event.offsetY
    //   //   componentConnect({x:x,y:y})
    //   // })
    // let rightCircle = that.container.selectAll('port')
    //   .data(that.inPort)
    //   .enter()
    //   .append('circle')
    //   .attr('class','port')
    //   .attr('cx',function (d) {
    //     d.x = that.componentOptions[0].rectWidth - 10
    //     return d.x;
    //   })
    //   .attr('cy',function (d) {
    //     d.y = that.componentOptions[0].rectHeight/2
    //     return d.y;
    //   })
    //   .attr('r',that.componentOptions[0].circleRadius)
    //   .attr('stroke','#000000')
    //   .attr('stroke-width',1)
    //   .attr('fill',"#FFFFFF")
    //   // .on('click',function(e) {
    //   //   console.log("rightCircle-click")
    //   //   let x = d3.event.offsetX
    //   //   let y = d3.event.offsetY
    //   //   componentConnect({x:x,y:y})
    //   // })
    // 绘制文字 qux
    this.text = that.container.append('text')
      .attr('x',that.componentOptions[0].rectWidth/2)
      .attr('y',that.componentOptions[0].rectHeight/2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr('font-size',"30px")
      .attr('fill','#FFFFFF')
      .text(that.statusType[0])
      .on('contextmenu',function(d) {
        // 禁止右键默认行为
        d3.event.preventDefault();
        setStatusForm(that.getData());
        console.log(that.id)
      })
    this.dimension = that.container.append('text')
      .attr('class','statusDimension')
      .attr('x',that.componentOptions[0].rectWidth+60)
      .attr('y',that.componentOptions[0].rectHeight/2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr('font-size',"15x")
      .attr('fill','#909399')
      // .style('display','none')
      .text(that.statusType)

    // 事件添加
    d3.selectAll('.port')
      .on('click',function(d) {
        console.log(d);
        // let x = d3.event.offsetX
        // let y = d3.event.offsetY
        let x = d.parentX + d.x
        let y = d.parentY + d.y
        setLineIsDrawing()
        componentConnect({x:x,y:y,parent:d.id,component:this})
        // if(!getLineIsDrawing()){
        //   let x = d3.event.offsetX
        //   let y = d3.event.offsetY
        //   setLineIsDrawing()
        //   componentConnect({x:x,y:y})
        // }
        // else {
        //   console.log("componentConnectEnd")
        //   componentConnectEnd()
        // }
      })
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
    // console.log(that.inPort);
    d3.select(node).attr("transform", function (q) {
      // console.log("d3.event.x y, that.x,y", d3.event.x, d3.event.y, that.x, that.y)
      that.dx = d3.event.x - that.x
      that.dy = d3.event.y - that.y
      that.x = d3.event.x
      that.y = d3.event.y
      d.x = d3.event.x
      d.y = d3.event.y
      statusMonitorAdd(that.id)
      return 'translate(' + d.x + ',' + d.y + ')'
    });

    this.container.selectAll('.port')
      .attr('none', function (d) {
        d.parentX = that.x
        d.parentY = that.y
      })

  }
}