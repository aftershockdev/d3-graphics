import * as d3 from "d3";
import { ChartBarInterface } from "../newChartCreator";
export const ChartBar = ({
  data,
  svg,
  x,
  y,
  xAxis,
  yAxis,
  xType,
  width,
  diagram,
  height,
}: ChartBarInterface): void => {
  let bars = diagram.append("g").attr("transform", "translate(10,-5)");

  if (xType === "time") {
    bars
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", (d) => x(d.date))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", width / data.length);
  } else if (xType === "linear") {
    bars
      .append("g")
      .attr("fill", "#c3c3c3")
      .selectAll("rect")
      .data(data, (d: BarFunc) => d.date)
      .join("rect")
      .attr("x", (d) => x(d.date))
      .attr("y", (d: any) => y(d.value))
      .attr("height", (d: any) => y(0) - y(d.value))
      .attr("width", x.bandwidth());
  } else {
    bars
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(i))
      .attr("y", (d: any) => y(d.value))
      .attr("height", (d: any) => y(0) - y(d.value))
      .attr("width", x.bandwidth());
  }

  // if (isScrollDisplayed) {
  //   let xOverview = d3
  //     .scaleBand()
  //     .domain(data.map((d: BarFunc) => d.date))
  //     .paddingOuter(0.2)
  //     .range([0, width]);

  //   let yOverview = d3.scaleLinear().range([heightOverview, 0]);

  //   yOverview.domain(y.domain());
  //   let subBars = diagram.selectAll(".subBar").data(data);

  //   subBars
  //     .enter()
  //     .append("rect")
  //     .classed("subBar", true)
  //     .attr("fill", "gray")
  //     .attr("opacity", "0.5")
  //     .attr("height", (d: BarFunc) => heightOverview - yOverview(d.value))
  //     .attr("width", (d: BarFunc) => xOverview.bandwidth())
  //     .attr("x", (d: any) => xOverview(d.date))
  //     .attr("y", (d: BarFunc) => height + heightOverview + yOverview(d.value));

  //   var displayed = d3
  //     .scaleQuantize()
  //     .domain([0, width])
  //     .range(d3.range(data.length));

  //   diagram
  //     .append("rect")
  //     .attr("transform", "translate(0, " + (height + 30) + ")")
  //     .attr("class", "mover")
  //     .attr("x", 0)
  //     .attr("y", 0)
  //     .attr("height", selectorHeight)
  //     .attr("stroke", "red")
  //     .attr("stroke-opacity", "0.1")
  //     .attr("fill", "lightSteelBlue")
  //     .attr("fill-opacity", "0.5")
  //     .attr("width", Math.round((width * numBars) / data.length))
  //     .attr("pointer-events", "all")
  //     .attr("cursor", "ew-resize")
  //     .call(d3.drag().on("drag", display));

  //   svg.on("scroll", display);
  // }

  // function display({ dx }: any) {
  //   let v = parseInt(d3.select(this).attr("x")),
  //     nx = v + dx,
  //     w = parseInt(d3.select(this).attr("width")),
  //     f,
  //     nf,
  //     new_data,
  //     rect;
  //   console.log(v);

  //   if (nx < 0 || nx + w > width) return;
  //   d3.select(this).attr("x", nx);

  //   f = displayed(v);
  //   nf = displayed(nx);

  //   if (f === nf) return;

  //   new_data = data.slice(nf, nf + numBars);

  //   x.domain(new_data.map((d: BarFunc) => d.date));

  //   diagram.select(".x.axis").call(xAxis);

  //   rect = bar.selectAll("rect").data(new_data, (d: BarFunc) => d.date);

  //   let label = labels
  //     .selectAll(".label")
  //     .data(new_data, (d: BarFunc) => d.date);

  //   rect.attr("x", (d: BarD) => x(d.date));
  //   label.attr("x", (d: BarD) => x(d.date));

  //   rect
  //     .enter()
  //     .append("rect")
  //     .attr("class", "bar")
  //     .attr("fill", "lightgrey")
  //     .attr("x", (d: BarD) => x(d.date))
  //     .attr("y", (d: BarFunc) => y(d.value))
  //     .attr("width", xscale.bandwidth() - 10)
  //     .attr("height", (d: BarFunc) => height - y(d.value));

  //   label
  //     .enter()
  //     .append("text")
  //     .attr("class", "label")
  //     .attr("x", (d: BarD) => x(d.date))
  //     .style("fill", "red")
  //     .attr("y", (d: BarFunc) => y(d.value) - 5)
  //     .text((d: BarFunc) => d.value)
  //     .attr("width", x.bandwidth())
  //     .attr("height", (d: BarFunc) => height - y(d.value));

  //   label.exit().remove();
  //   rect.exit().remove();
  // }
};
