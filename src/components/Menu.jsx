import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  newServerPlacement,
  vacancyDivide,
  vacancyDivideRemoval,
} from "../utils/serverUtils";
import { loadManager } from "../utils/loadManager";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { Box, Button, MenuItem, Select } from "@mui/material";

const Input = styled(MuiInput)`
  width: 42px;
`;

const Menu = () => {
  const {
    shards,
    setShards,
    vacancy,
    setVacancy,
    servers,
    setServers,
    setData,
    data,
  } = useContext(AppContext);
  const handleSliderChange = (event, newValue) => {
    setShards(newValue);
  };

  const handleInputChange = (event) => {
    setShards(event.target.value === "" ? 0 : Number(event.target.value));
  };
  const handleBlur = () => {
    if (shards < 4) {
      setShards(4);
    } else if (shards > 100) {
      setShards(100);
    }
  };

  const handleClick = () => {
    // console.log(data);
    const serverPosition = newServerPlacement(vacancy.getFront());
    let dt = data;
    setServers((prev) => [...prev, serverPosition]);
    if (dt[serverPosition].type === "request") {
      const nextServer = parseInt(dt[serverPosition].servedBy);
      console.log(nextServer);

      dt[nextServer].requests.splice(
        dt[nextServer].requests.indexOf(serverPosition),
        1
      );
      dt[nextServer].currentLoad = dt[nextServer].currentLoad - 1;
    }
    dt[serverPosition] = {
      type: "server",
      maxLoad: 0,
      currentLoad: 0,
      requests: [],
    };
    dt = loadManager(dt, vacancy.getFront(), serverPosition, shards);

    setData(dt);
    const vac = vacancyDivide(vacancy, serverPosition);
    setVacancy(vac);
  };
  const mapped = (server, id) => {
    return (
      <MenuItem key={id} value={server.toString()}>
        {server}
      </MenuItem>
    );
  };
  const [server, setServer] = useState(0);
  const handleSelectChange = (event) => {
    setServer(event.target.value);
  };
  const handleDelete = () => {
    if (parseInt(server) === 0) {
      alert("Cannot Delete this server");
      return;
    }
    if (data[parseInt(server)].type === "server") {
      let vac = vacancy;
      vac = vacancyDivideRemoval(vac, parseInt(server), shards);
      setVacancy(vac);
      const nextServer = (vac.getFront()["end"] + 1) % shards;
      console.log(nextServer);
      const dt = data;
      for (let i = 0; i < dt[parseInt(server)].requests.length; i++) {
        dt[dt[parseInt(server)].requests[i]].servedBy = nextServer;
      }
      dt[nextServer].requests = [
        ...dt[nextServer].requests,
        ...dt[parseInt(server)].requests,
      ];

      dt[nextServer].currentLoad = dt[nextServer].requests.length;
      dt[nextServer].maxLoad =
        dt[nextServer].maxLoad + dt[parseInt(server)].maxLoad + 1;
      dt[parseInt(server)] = { type: "vacant" };
      let srv = servers;
      srv = srv.filter((sr) => sr !== parseInt(server));
      console.log(srv);

      setServers(srv);
      setData(dt);
    }
  };
  return (
    <Box
      component="section"
      className="menu"
      sx={{
        p: 10,
      }}>
      <Slider
        style={{ width: "70%" }}
        min={4}
        max={100}
        value={shards}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
      />
      <Input
        value={shards}
        size="small"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: 10,
          min: 4,
          max: 100,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />{" "}
      <br />
      <Button onClick={handleClick} variant="contained" color="success">
        {" "}
        <br />
        Add Server
      </Button>{" "}
      <br />
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={server}
        label="Server"
        onChange={handleSelectChange}>
        {servers.map(mapped)}
      </Select>{" "}
      <br />
      {/* <select
        name="server"
        value={server}
        onChange={handleSelectChange}
        id="server">
        {servers.map(mapped)}
      </select> */}
      <Button onClick={handleDelete} variant="contained" color="error">
        Remove Server
      </Button>
    </Box>
  );
};

export default Menu;
