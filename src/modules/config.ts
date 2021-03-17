import * as d3 from "d3";
import ChartCreator from "./ChartCreator";

export default function configurateData(array: object[]) {
  const format = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");
  const result = array.map((el: any) => {
    const obj = {
      date: format(el.Date),
      value: el.Cases,
    };
    return obj;
  });
  let chart = new ChartCreator(".main", {
    data: result,
    type: "BAR",
  });
  chart.init();
}
