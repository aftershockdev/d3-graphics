import * as d3 from "d3";

interface BarFunc {
  date: number;
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

  constructor(context: any) {
    Object.assign(this, context);
  }
  render(data: object[] | any): void {
    let maxLength: any = d3.max(data.map((d: any) => d.date.length));
    let marginOverview = { top: 30, right: 10, bottom: 20, left: 40 };
    let barWidth: number = maxLength * 5;
    let numBars: number = Math.round(this.width / barWidth);
    let isScrollDisplayed: boolean = barWidth * data.length > this.width;
    let heightOverview: number =
      80 - marginOverview.top - marginOverview.bottom;
    let selectorHeight: number = 40;

    const dateFormatter = d3.timeFormat("%Y/%m/%d");

    let xscale = d3
      .scaleBand()
      .domain(
        data.slice(0, numBars).map(function (d: BarFunc) {
          return d.date;
        })
      )
      .range([0, this.width]);

    let yscale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data.slice(0, numBars), function (d: BarFunc) {
          return +d.value;
        }),
      ])
      .range([this.height, 0]);

    let diagram = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    diagram
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + this.height + ")")
      .call(d3.axisBottom(xscale));

    diagram.append("g").attr("class", "y axis").call(d3.axisLeft(yscale));

    let bars = diagram.append("g");

    bars
      .selectAll("rect")
      .data(data.slice(0, numBars), function (d: BarFunc) {
        return d.date;
      })
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", this.height)
      .attr("height", 0)
      .transition()
      .duration(750)
      .delay(function (d, i) {
        return i * 150;
      })
      .attr("x", function (d: any) {
        return xscale(d.date);
      })
      .attr("y", (d: BarFunc) => yscale(d.value))
      .attr("height", (d: BarFunc) => this.height - yscale(d.value))
      .attr("width", xscale.bandwidth() - 3);

    // if (isScrollDisplayed) {
    //   let xOverview = d3
    //     .scaleBand()
    //     .domain(
    //       data.map(function (d) {
    //         return d.label;
    //       })
    //     )
    //     .range([0, this.width]);

    //   let yOverview = d3.scaleLinear().range([heightOverview, 0]);
    //   yOverview.domain(yscale.domain());

    //   let subBars = diagram.selectAll(".subBar").data(data);

    //   subBars
    //     .enter()
    //     .append("rect")
    //     .classed("subBar", true)
    //     .attr(<any>{
    //       height: (d: BarFunc) => heightOverview - yOverview,
    //       width: (d: BarFunc) => xOverview.bandwidth(),
    //       x: (d: any) => xOverview(d.date),
    //       y: (d: BarFunc) => this.height + heightOverview + yOverview(d.value),
    //     });

    //   var displayed = d3
    //     .scaleQuantize()
    //     .domain([0, this.width])
    //     .range(d3.range(data.length));

    //   diagram
    //     .append("rect")
    //     .attr(
    //       "transform",
    //       "translate(0, " + (this.height + this.margin.bottom) + ")"
    //     )
    //     .attr("class", "mover")
    //     .attr("x", 0)
    //     .attr("y", 0)
    //     .attr("height", selectorHeight)
    //     .attr(
    //       "width",
    //       Math.round(parseFloat(numBars * this.width) / data.length)
    //     )
    //     .attr("pointer-events", "all")
    //     .attr("cursor", "ew-resize")
    //     .call(d3.drag().on("drag", display));

    //   this.svg.on("scroll", display);
    // }
    // function display() {
    //   let x = parseInt(d3.select(this).attr("x")),
    //     nx = x + d3.event.dx,
    //     w = parseInt(d3.select(this).attr("width")),
    //     f,
    //     nf,
    //     new_data,
    //     rects;

    //   if (nx < 0 || nx + w > this.width) return;

    //   d3.select(this).attr("x", nx);

    //   f = displayed(x);
    //   nf = displayed(nx);

    //   if (f === nf) return;

    //   new_data = data.slice(nf, nf + numBars);

    //   xscale.domain(
    //     new_data.map(function (d) {
    //       return d.label;
    //     })
    //   );
    //   diagram.select(".x.axis").call(d3.axisBottom(xscale));

    //   rects = bars.selectAll("rect").data(new_data, function (d) {
    //     return d.label;
    //   });

    //   label = labels.selectAll(".label").data(new_data, function (d) {
    //     return d.label;
    //   });

    //   rects.attr("x", function (d) {
    //     return xscale(d.label);
    //   });
    //   label.attr("x", function (d) {
    //     return xscale(d.label);
    //   });

    //   rects
    //     .enter()
    //     .append("rect")
    //     .attr("class", "bar")
    //     .attr("x", function (d) {
    //       return xscale(d.label);
    //     })
    //     .attr("y", function (d) {
    //       return yscale(d.value);
    //     })
    //     .attr("width", xscale.bandwidth())
    //     .attr("height", function (d) {
    //       return this.height - yscale(d.value);
    //     });

    //   label
    //     .enter()
    //     .append("text")
    //     .attr("class", "label")
    //     .attr("x", function (d) {
    //       return xscale(d.label);
    //     })
    //     .style("fill", (d) => {
    //       return d.value ===
    //         d3.max(data, (d) => {
    //           return d.value;
    //         })
    //         ? "red"
    //         : "red";
    //     })
    //     .attr("y", function (d) {
    //       return yscale(d.value) - 5;
    //     })
    //     .text((d) => {
    //       return d.value;
    //     })
    //     .attr("width", xscale.bandwidth())
    //     .attr("height", function (d) {
    //       return this.height - yscale(d.value);
    //     });

    //   label.exit().remove();
    //   rects.exit().remove();
    // }
  }
}
