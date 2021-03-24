import * as d3 from "d3";
import { configurateData } from "./configData";
import { registerChart, getChart } from "./charts/ChartsRegistration";

import { ChartBar } from "./charts/testBarChart";

export interface CreateProperties {
  data: object[];
  type?: string;
  x: string;
  y: string;
  xType?: string;

}

export interface ChartBarInterface {
  data: object[];
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  diagram: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  x:
    | d3.ScaleLinear<number, number, never>
    | d3.ScaleTime<number, number, never>
    | any;
  y: d3.ScaleLinear<number, number, never>;
  xAxis: d3.Axis<any>;
  yAxis: d3.Axis<any>;
  xType: string;
  width: number;
  height: number;
}

export default class Creator {
  // chartSettings: CreateProperties;
  // constructor({ data, type ,xType, x, y }: CreateProperties) {
  //   this.chartSettings = Object.assign({}, { data, type,  xType, x, y });
  //   this.draw();
  // }

  private draw(): void {
    let data = configurateData(this.chartSettings);
    let defaults = {
      width: 1300,
      height: 600,
      margin: {
        top: 15,
        right: 0,
        bottom: 35,
        left: 60,
      },
    };

    const svg = d3
      .select(".main")
      .append("svg")
      .attr("width", defaults.width)
      .attr("height", defaults.height)
      .attr("overflow", "visible");

    if (this.chartSettings.xType === "time") {
      let x = d3
        .scaleTime()
        .domain(<any>d3.extent(data, (d) => d.date))
        .range([defaults.margin.left, defaults.width - defaults.margin.right]);
    } else if (this.chartSettings.xType === "linear") {
      let x = d3
        .scaleBand()
        .domain(<any>data.map((d) => d.date))
        .range([defaults.margin.left, defaults.width - defaults.margin.right]);
    } else {
      let x = d3
        .scaleBand()
        .domain(<any>d3.range(data.length))
        .range([defaults.margin.left, defaults.width - defaults.margin.right]);
      console.log(x);
    }

    let y = d3
      .scaleLinear()
      .domain(<any>[0, d3.max(data, (d) => d.value)])
      .nice()
      .range([defaults.height - defaults.margin.bottom, defaults.margin.top]);

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    let diagram = svg.append("g").attr("class", "axis");

    diagram
      .append("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(0,${defaults.height - defaults.margin.bottom})`
      )
      .call(xAxis);

    diagram
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${defaults.margin.left},0)`)
      .call(yAxis);

    let chart: ChartBarInterface = Object.assign(
      {},
      {
        data,
        svg,
        diagram,
        x,
        y,
        xAxis,
        yAxis,
        xType: this.chartSettings.xType,
        width: defaults.width;
        height: defaults.height;
      }
    );
  }
  public generate(data, type, axis): void {

    configurateData(data, type, axis)
    // console.log(data)

    // console.log(type)

    // console.log(axis)

  }
}
