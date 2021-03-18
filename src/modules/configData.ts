import * as d3 from "d3";

export default function configurateData(array: object[], type: string) {
  const dateFormatter = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");

  const result = array.map((el: any) => {
    switch (type) {
      case "line":
        const line = {
          date: dateFormatter(el.Date),
          value: el.Cases,
        };
        return line;
      case "bar":
        const bar = {
          date: el.Date.slice(0, 10),
          value: el.Cases,
        };
        return bar;
    }
  });
  return result;
}
