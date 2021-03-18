import BarChart from "./BarChart";
import LineChart from "./LineChart";

export default class ChartRegister {
  charts: object[];
  constructor() {
    this.charts = [
      {
        name: "bar",
        component: new BarChart(),
      },
      {
        name: "line",
        component: new LineChart(),
      },
    ];
  }
}
