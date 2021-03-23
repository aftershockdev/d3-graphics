import * as d3 from "d3";
interface BarFunc {
  date: number;
  value: number;
}
interface BarD {
  date: string;
  value: number;
}

interface BarInterface {
  width: number;
  height: number;
  margin: {
    [key: string]: number;
  };
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
}

export default class BarChart implements BarInterface {
  width: number;
  height: number;
  margin: {
    [key: string]: number;
  };
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  render(data: object[] | any, context: any): void {
    Object.assign(this, context);
    let width = this.width;
    let height = this.height;
    let maxLength: any = d3.max(data.map((d: any) => d.date.length));
    let marginOverview = { top: 30, right: 10, bottom: 20, left: 40 };
    let barWidth: number = maxLength * 8;
    let numBars: number = Math.round(width / barWidth);
    let isScrollDisplayed: boolean = barWidth * data.length > width;
    let heightOverview: number =
      80 - marginOverview.top - marginOverview.bottom;
    let selectorHeight: number = 40;

    let xscale = d3
      .scaleBand()
      .domain(data.slice(0, numBars).map((d: BarFunc) => d.date))
      .range([0, this.width]);

    let yscale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: BarFunc) => d.value)])
      .range([this.height, 0]);

    let xAxis = d3.axisBottom(xscale);
    let yAxis = d3.axisLeft(yscale);

    let diagram = this.svg.append("g");

    diagram
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis);

    diagram.append("g").attr("class", "y axis").call(yAxis);

    let bars = diagram.append("g").attr("transform", "translate(10,-5)");

    bars
      .selectAll("rect")
      .data(data.slice(0, numBars), (d: BarFunc) => d.date)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", (d: BarFunc) => height)
      .attr("height", 0)
      .attr("fill", "lightgrey")
      .transition()
      .duration(750)
      .delay(function (d, i) {
        return i * 150;
      })
      .attr("x", function (d: any) {
        return xscale(d.date);
      })
      .attr("y", (d: BarFunc) => yscale(d.value))
      .attr("height", (d: BarFunc) => height - yscale(d.value))
      .attr("width", xscale.bandwidth() - 10);

    let labels = diagram.append("g").attr("transform", "translate(10,-5)");

    labels
      .selectAll(".label")
      .data(data.slice(0, numBars), (d: BarFunc) => d.date)
      .enter()
      .append("text")
      .attr("class", "label")
      .style("display", (d: BarFunc) => (d.value === null ? "none" : null))
      .attr("x", (d: BarD) => xscale(d.date))
      .style("fill", "red")
      .attr("y", (d) => {
        return height;
      })
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay((d, i) => i * 150)
      .text((d: BarFunc) => d.value)
      .attr("x", (d: any) => xscale(d.date))
      .attr("y", (d: BarFunc) => yscale(d.value) - 5);

    if (isScrollDisplayed) {
      let xOverview = d3
        .scaleBand()
        .domain(data.map((d: BarFunc) => d.date))
        .paddingOuter(0.2)
        .range([0, this.width]);

      let yOverview = d3.scaleLinear().range([heightOverview, 0]);

      yOverview.domain(yscale.domain());
      let subBars = diagram.selectAll(".subBar").data(data);

      subBars
        .enter()
        .append("rect")
        .classed("subBar", true)
        .attr("fill", "gray")
        .attr("opacity", "0.5")
        .attr("height", (d: BarFunc) => heightOverview - yOverview(d.value))
        .attr("width", (d: BarFunc) => xOverview.bandwidth())
        .attr("x", (d: any) => xOverview(d.date))
        .attr(
          "y",
          (d: BarFunc) => this.height + heightOverview + yOverview(d.value)
        );

      var displayed = d3
        .scaleQuantize()
        .domain([0, this.width])
        .range(d3.range(data.length));

      diagram
        .append("rect")
        .attr(
          "transform",
          "translate(0, " + (this.height + this.margin.bottom) + ")"
        )
        .attr("class", "mover")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", selectorHeight)
        .attr("stroke", "red")
        .attr("stroke-opacity", "0.1")
        .attr("fill", "lightSteelBlue")
        .attr("fill-opacity", "0.5")
        .attr("width", Math.round((width * numBars) / data.length))
        .attr("pointer-events", "all")
        .attr("cursor", "ew-resize")
        .call(d3.drag().on("drag", display));

      this.svg.on("scroll", display);
    }

    function display({ dx }: any) {
      let x = parseInt(d3.select(this).attr("x")),
        nx = x + dx,
        w = parseInt(d3.select(this).attr("width")),
        f,
        nf,
        new_data,
        rect;

      if (nx < 0 || nx + w > width) return;
      d3.select(this).attr("x", nx);

      f = displayed(x);
      nf = displayed(nx);

      if (f === nf) return;

      new_data = data.slice(nf, nf + numBars);

      xscale.domain(new_data.map((d: BarFunc) => d.date));

      diagram.select(".x.axis").call(xAxis);

      rect = bars.selectAll("rect").data(new_data, (d: BarFunc) => d.date);

      let label = labels
        .selectAll(".label")
        .data(new_data, (d: BarFunc) => d.date);

      rect.attr("x", (d: BarD) => xscale(d.date));
      label.attr("x", (d: BarD) => xscale(d.date));

      rect
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "lightgrey")
        .attr("x", (d: BarD) => xscale(d.date))
        .attr("y", (d: BarFunc) => yscale(d.value))
        .attr("width", xscale.bandwidth() - 10)
        .attr("height", (d: BarFunc) => height - yscale(d.value));

      label
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d: BarD) => xscale(d.date))
        .style("fill", "red")
        .attr("y", (d: BarFunc) => yscale(d.value) - 5)
        .text((d: BarFunc) => d.value)
        .attr("width", xscale.bandwidth())
        .attr("height", (d: BarFunc) => this.height - yscale(d.value));

      label.exit().remove();
      rect.exit().remove();
    }
  }
}
