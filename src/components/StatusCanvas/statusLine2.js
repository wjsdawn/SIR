import * as d3 from 'd3'
export default class statusLine2{
  constructor(canvas){
    let that = this
    this.isDrawing = false
    this.startCoords = [150,150]
    this.controlCoords = [0,0]
    this.curveGroup = canvas.append('g').attr("class","g-line")

  }
  setIsDrawing(){
    this.isDrawing = !this.isDrawing;
  }
  setStartCoords(coords){
    this.startCoords[0] = coords.x
    this.startCoords[1] = coords.y
    console.log(this.startCoords);
  }
  previewCurve(event){
    const [x, y] = d3.mouse(event);
    this.controlCoords = [x + 50, y + 50]; // 调整控制点位置

    this.curveGroup.selectAll(".preview").remove();

    this.curveGroup.append("path")
      .attr("d", `M${this.startCoords[0]},${this.startCoords[1]} Q${this.controlCoords[0]},${this.controlCoords[1]} ${x},${y}`)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "preview");
  }
  endDrawing(){
    // svg.on("mousemove", null);
    // svg.on("mouseup", null);
    d3.select('#blue-editor').on("mousemove",null)
    // d3.selectAll('.line').on("mouseup",null)

    this.curveGroup.selectAll(".preview").remove();

    this.curveGroup.append("path")
      .attr("d", `M${this.startCoords[0]},${this.startCoords[1]} Q${this.controlCoords[0]},${this.controlCoords[1]} ${d3.event.x},${d3.event.y}`)
      .attr("fill", "none")
      .attr("stroke", "red");

    this.isDrawing = false;
  }
}