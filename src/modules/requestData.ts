export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.covid19api.com/total/country/south-africa/status/confirmed?from=2020-03-21T00:00:00Z&to=2021-03-01T00:00:00Z"
    );
    const result: [] = await response.json();
  } catch (error) {
    console.log(error);
  }
};
