import Arc from "./Arc";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

const InsertDivs = ({ n }) => {
  const { data, setData, shards } = useContext(AppContext);
  let angle = 360 / n;
  let initAngle = 0 - angle;
  let variable = 100 / (n / 5);
  const arr = Array.from({ length: n }, () => ({ type: "vacant" }));
  useEffect(() => {
    arr[0] = {
      type: "server",
      maxLoad: shards - 1,
      currentLoad: 0,
      requests: [],
    };
    setData(arr);
  }, [n]);

  return data.map((_, i) => {
    initAngle = initAngle + angle;
    return <Arc key={i} index={i} variable={variable} initAngle={initAngle} />;
  });
};

export default InsertDivs;
