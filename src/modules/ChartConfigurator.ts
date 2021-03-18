import configurateData from "./configData";
import ChartRegister from "./charts/RegisterPlugin";

interface ConfiguratorInterface {
  type: string;
  data: object[];
}
interface RenderInterface {
  name: string;
  component: any;
}

export default class ChartConfigurator implements ConfiguratorInterface {
  type: string;
  data: object[];
  constructor(type: string, data: object[], context: any) {
    this.type = type;
    this.data = data;
    Object.assign(this, context);
  }

  render(): void {
    let registeredCharts = new ChartRegister();

    registeredCharts.charts.forEach((el: RenderInterface) => {
      if (el.name === this.type) {
        let configData = configurateData(this.data, this.type);
        return el.component.render(configData, this);
      }
    });
  }
}
