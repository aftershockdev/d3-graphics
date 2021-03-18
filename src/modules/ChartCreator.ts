import * as d3 from "d3";
import ChartConfigurator from "./ChartConfigurator";

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
    this.element = element;
    Object.assign(this, this.defaults, options);
  }

  public init(): void {
    const svg = (this.svg = d3
      .select(this.element)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("overflow", "visible"));

    new ChartConfigurator(this.type, this.data, this).render();
  }
}
