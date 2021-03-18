// import configurateData from "./configData";

export default class FetchData {
  public async fetch() {
    try {
      const response = await fetch(
        "https://api.covid19api.com/total/country/south-africa/status/confirmed?from=2020-03-21T00:00:00Z&to=2021-03-01T00:00:00Z"
      );
      const result: [] = await response.json();
      // configurateData(result);
    } catch (error) {
      console.log(error);
    }
  }
}
