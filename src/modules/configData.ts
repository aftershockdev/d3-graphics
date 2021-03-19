export const configurateData = (type: string, data: object[]) => {
  const result = data.map((el: any) => {
    const obj = {
      date: el.Date,
      value: el.Cases,
    };
    return obj;
  });
  return result;
};
