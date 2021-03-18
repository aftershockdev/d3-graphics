import * as d3 from "d3";

interface LineInterface {
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  scaleY:
    | d3.ScaleLinear<number, number, never>
    | d3.ScaleTime<number, number, never>;
  scaleX: d3.ScaleTime<number, number, never>;
  width: number;
  height: number;
  line: d3.Line<any>;
  lineCurve: d3.CurveFactoryLineOnly;
}
interface LineFunc {
  date: number;
  value: number;
}

export default class LineChart implements LineInterface {
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  scaleY:
    | d3.ScaleLinear<number, number, never>
    | d3.ScaleTime<number, number, never>;
  scaleX: d3.ScaleTime<number, number, never>;
  width: number;
  height: number;
  line: d3.Line<any>;
  lineCurve: d3.CurveFactoryLineOnly;

  render(data: object[] | any, context: any): void {
    Object.assign(this, context);
    let x = d3
      .scaleTime()
      .domain(<[number, number]>d3.extent(data, (d: LineFunc) => d.date))
      .range([0, this.width]);

    let xAxis = this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    let y = d3
      .scaleLinear()
      .domain(<[number, number]>[0, d3.max(data, (d: LineFunc) => +d.value)])
      .range([this.height, 0]);

    let yAxis = this.svg.append("g").call(d3.axisLeft(y));

    const scaleX = (this.scaleY = d3.scaleTime().range([0, innerWidth]));

    const scaleY = (this.scaleY = d3.scaleLinear().range([innerHeight, 0]));

    const dateFormatter = d3.timeFormat("%Y/%m/%d");

    this.line = d3
      .line<LineFunc>()
      .curve(this.lineCurve)
      .x((data: LineFunc) => scaleX(data.date))
      .y((data: LineFunc) => scaleY(data.value));

    let clip = this.svg
      .append("defs")
      .append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("x", 0)
      .attr("y", 0);

    let bisectDate = d3.bisector((d: LineFunc) => d.date).left;

    let brush = d3
      .brushX()
      .extent([
        [0, 0],
        [this.width, this.height],
      ])
      .on("end", updateChart);

    let area = this.svg.append("g").attr("clip-path", "url(#clip)");

    let areaGenerator = d3
      .area()
      .x((d: any) => x(d.date))
      .y0(y(0))
      .y1((d: any) => y(d.value));

    let focus = this.svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    let idleTimeout: any;

    area
      .append("path")
      .datum(data)
      .attr("class", "myArea")
      .attr("fill", "lightgrey")
      .attr("fill-opacity", 0.3)
      .attr("stroke", "grey")
      .attr("stroke-width", 1)
      .attr("d", areaGenerator);

    area.append("g").attr("class", "brush").call(brush);

    focus.append("circle").attr("r", 4).attr("fill", "grey");

    focus
      .append("rect")
      .attr("class", "tooltip")
      .attr("width", 100)
      .attr("height", 50)
      .attr("fill", "grey")
      .attr("x", 10)
      .attr("y", -22)
      .attr("rx", 4)
      .attr("ry", 4);

    focus
      .append("text")
      .attr("class", "tooltip-date")
      .attr("x", 30)
      .attr("y", 20);

    focus
      .append("text")
      .attr("class", "tooltip-likes")
      .attr("x", 30)
      .attr("y", 0);

    function mousemove(): void {
      let x0: any = x.invert(d3.pointer(event, this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      focus.attr(
        "transform",
        "translate(" + x(d.date) + "," + y(d.value) + ")"
      );
      focus.select(".tooltip-date").text(dateFormatter(d.date));
      focus.select(".tooltip-likes").text(d.value);
    }

    function idled() {
      idleTimeout = null;
    }

    function updateChart({ selection }: any) {
      let extent = selection;
      if (!extent) {
        if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
        x.domain([4, 8]);
      } else {
        x.domain(<[Date, Date]>[x.invert(extent[0]), x.invert(extent[1])]);
        area.select(".brush").call(brush.move, null);
      }
      xAxis.transition().duration(1000).call(d3.axisBottom(x));
      area
        .select(".myArea")
        .transition()
        .duration(1000)
        .attr("d", areaGenerator);
    }

    this.svg
      .on("dblclick", function (): void {
        x.domain(<[any, any]>d3.extent(data, (d: LineFunc) => d.date));
        xAxis.transition().call(d3.axisBottom(x));
        area.select(".myArea").transition().attr("d", areaGenerator);
      })
      .on("mouseover", function (): void {
        focus.style("display", null);
      })
      .on("mouseout", function (): void {
        focus.style("display", "none");
      })
      .on("mousemove", mousemove);
  }
}
