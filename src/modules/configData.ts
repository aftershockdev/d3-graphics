interface ConfigInterface {
  [key: string]: number;
}

export const configurateData = (
  data: object[],
  xAccessor: string,
  yAccessor: string
) => {
  if (xAccessor && yAccessor) {
    const result = data.map((el: ConfigInterface) => {
      if (!el[xAccessor]) {
        throw new Error(
          `Property "${xAccessor}" is not defined in data. "${xAccessor}" must be key in data objects`
        );
      }
      if (!el[yAccessor]) {
        throw new Error(
          `Property "${yAccessor}" is not defined in data. "${yAccessor}" must be key in data objects`
        );
      }

      const obj = {
        date: el[xAccessor],
        value: el[yAccessor],
      };
      return obj;
    });

    return result;
  } else {
  }
};
