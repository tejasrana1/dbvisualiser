/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
import { getRandomColor } from "../utils/randomColor";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { currLoadManager } from "../utils/loadManager";

const Arc = ({ index, variable, initAngle }) => {
  const { shards, servers, data, setData } = useContext(AppContext);
  const [color, setColor] = useState(
    data[index].type === "server"
      ? "black"
      : data[index].type === "request"
      ? "blue"
      : getRandomColor()
  );
  useEffect(() => {
    setColor(
      data[index].type === "server"
        ? "black"
        : data[index].type === "request"
        ? "blue"
        : getRandomColor()
    );
  }, [servers]);
  const clickHandler = () => {
    if (data[index].type === "server") {
      console.log(data[index]);

      const maxLoad = (data[index].maxLoad / (shards - servers.length)) * 100;
      const currentLoad = (data[index].currentLoad / data[index].maxLoad) * 100;
      alert(
        `Server: ${index}\nCurrent Load: ${currentLoad.toFixed(
          1
        )}%\nMax Load: ${maxLoad.toFixed(1)}%`
      );
    } else if (data[index].type === "vacant") {
      let dt = data;
      dt[index] = {
        type: "request",
        servedBy: "",
      };
      dt = currLoadManager(dt, index, servers);
      setData(dt);
    } else {
      alert(`Served By Server: ${data[index].servedBy}`);
    }
    setColor(
      data[index].type === "server"
        ? "black"
        : data[index].type === "request"
        ? "blue"
        : getRandomColor()
    );
  };

  return (
    <div
      className={`partition part${index}`}
      onClick={clickHandler}
      style={{
        clipPath: `polygon(50% 50%,0 100%,${variable}% 100%)`,
        background:
          color === "black" ? "#0f2027" : color === "blue" ? "#00f260" : color,
        background:
          color === "black"
            ? "-webkit-linear-gradient(to right, #0f2027, #203a43, #2c5364)"
            : color === "blue"
            ? "-webkit-linear-gradient(to right, #00f260, #0575e6)"
            : color,
        background:
          color === "black"
            ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
            : color === "blue"
            ? "linear-gradient(to right, #00f260, #0575e6)"
            : color,
        transform: `rotate(${initAngle}deg)`,
      }}></div>
  );
};

export default Arc;
