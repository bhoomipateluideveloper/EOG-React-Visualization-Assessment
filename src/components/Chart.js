import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import _ from "lodash";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 800,
//     maxWidth: 800
//   },
//   chips: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   chip: {
//     margin: 2
//   },
//   noLabel: {
//     marginTop: theme.spacing(3)
//   }
// }));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// };

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium
//   };
// }
const randomColor = () =>
  `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`;

export default function Chart(props) {
  const mergedData = _.flatten(_.map(props.measurements, "measurements"));

  const finalData = mergedData
    .filter(m => m.value >= 0)
    .map(m => {
      return {
        ...m,
        [m.metric]: m.value
      };
    });

  return (
    <LineChart
      width={1024}
      height={300}
      data={finalData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="at" />
      {props.measurements.map((d, i) => (
        <YAxis yAxisId={i} key={i} />
      ))}
      {props.measurements.map((d, i) => (
        <Line
          yAxisId={i}
          key={i}
          type="monotone"
          dataKey={d.metric}
          dot={false}
          stroke={randomColor()}
        />
      ))}
      <Tooltip />
      <Legend />
    </LineChart>
  );
}
