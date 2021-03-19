interface Chart {
  [index: string]: any;
  render: (data: object[] | any, context: any) => void;
}
interface Registry {
  [key: string]: Chart;
}

let registry: Registry = {};

export const registerChart = (type: string, chart: Chart) => {
  return (registry[type] = chart);
};

export const getChart = (type: string) => registry[type];
