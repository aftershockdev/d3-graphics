import * as d3 from "d3";
import { configurateData } from "./configData";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import { registerChart, getChart } from "./charts/ChartsRegistration";
interface ChartsInterface {
  element: string;
  data: object[];
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  width: number;
  height: number;
  margin: {
    [key: string]: number;
  };
  type: string;
}

export interface ChartParams {
  type: string;
  data: object[];
  x: string;
  y: string;
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
  type: string;
  x: string;
  y: string;

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

  constructor(element: string, { type, data, x, y }: ChartParams) {
    this.element = element;
    this.type = type;
    this.data = data;
    this.x = x;
    this.y = y;
    this.svg = null;
    this.init();
  }

  private init(): void {
    const svg = (this.svg = d3
      .select(this.element)
      .append("svg")
      .attr("width", this.defaults.width)
      .attr("height", this.defaults.height)
      .attr("overflow", "visible"));

    let lineChart = new LineChart();
    let barChart = new BarChart();

    switch (this.type) {
      case "bar":
        registerChart(this.type, barChart);
        break;
      case "line":
        registerChart(this.type, lineChart);
        break;
    }
  }

  public render() {
    let chartData = configurateData(this.data, this.x, this.y);
    let chartSettings = Object.assign(this.defaults, { svg: this.svg });

    getChart(this.type).render(chartData, chartSettings);
  }
}
