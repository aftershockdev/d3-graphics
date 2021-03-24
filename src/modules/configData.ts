import { errorHandler } from "./api/error";
import { CreateProperties } from "./newChartCreator";
interface ConfigInterface {
  [key: string]: number;
}
// interface PropertiesInterface {
//   data: object[];
//   x: string;
//   y: string;
//   xType: string;
//   yType: string;
// }

export const configurateData = (data: object[], type: string, axis: any) => {
  let dataType = [];
  let columns = [];

  let linear = data.map((el: ConfigInterface) => {
    console.log(el[type.x]);
    console.log(el);
    const obj = {
      date: el[type.x],
      value: el[type.y],
    };
    return obj;
  });

  let timeseries = data.map((el: ConfigInterface) => {
    const obj = {
      date: new Date(el[type.x]),
      value: el[type.y],
    };
    return obj;
  });

  for (let a in axis) {
    if (a === type.x || a === type.y) {
      columns.push(a);
    }
    if (axis[a].type === "date" && !dataType.length) {
      dataType.push("timeseries");
    }
  }

  if (columns.length > 1) {
  }
};

// if (columns.length > 1) {
// } else {
//   errorHandler("i");
// }

// for (let a in axis) {
//   if (axis[a].includes(type.x && type.y)) {
//     console.log(type.x, type.y);
//   }
// }

// if (types.includes(xType) && x && y) {
//   switch (xType) {
//     case "time":
//       const time = data.map((el: ConfigInterface) => {
//         if (el[y] && el[x]) {
//           const obj = {
//             date: new Date(el[x]),
//             value: el[y],
//           };
//           return obj;
//         }
//       });
//       return time;

//     case "linear":
//       const linear = data.map((el: ConfigInterface) => {
//         if (!el[x]) {
//           errorHandler(
//             `Property "${x}" is not defined in data. "${y}" must be key in data objects`
//           );
//         }
//         if (!el[y]) {
//           errorHandler(
//             `Property "${y}" is not defined in data. "${y}" must be key in data objects`
//           );
//         }
//         if (el[y] && el[x]) {
//           const obj = {
//             date: el[x],
//             value: el[y],
//           };
//           return obj;
//         }
//       });
//       return linear;
//   }
// } else {
//   errorHandler(`${xType} is not defined.Available types "${types}"`);
// }
