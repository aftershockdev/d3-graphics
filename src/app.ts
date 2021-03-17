import FetchData from "./modules/requestData";

class App {
  async render(element: string) {
    const test = new FetchData();
    test.fetch();
  }
}

new App().render("123");
