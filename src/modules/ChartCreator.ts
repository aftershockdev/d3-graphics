import * as d3 from "d3";

import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";

interface ChartsInterface {
  element: string;
  data: object[];
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  width: number;
  height: number;
  margin: {
    [key: string]: number;
  };
}
export default class ChartsCreator implements ChartsInterface {
  element: string;
  data: object[];
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  width: number;
  height: number;
  margin: {
    [key: string]: number;
  };

  defaults = {
    width: 1300,
    height: 400,
    margin: {
      top: 15,
      right: 0,
      bottom: 35,
      left: 60,
    },
  };

  constructor(element: string, options: object) {
    let types: string[] = ["Line", "Bar", "Universal"];

    this.element = element;
    Object.assign(this, this.defaults, options, types);
  }

  public init(): void {
    const svg = (this.svg = d3
      .select(this.element)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("overflow", "visible"));
    // this.createBarChart(this.data);
    this.createLineChart(this.data);
  }

  private createLineChart(data: object[] | any): void {
    const chart = new LineChart(this).render(data);
  }

  private async createBarChart(data: object[]) {
    const chart = new BarChart(this).render(data);
  }
}
