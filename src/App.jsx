import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { AppContext } from "./contexts/AppContext";
import { Deque } from "./utils/deque";
import InsertDivs from "./components/InsertDivs";
import { Box } from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [servers, setServers] = useState([]);
  const [shards, setShards] = useState(15);
  const [vacancy, setVacancy] = useState(new Deque());
  useEffect(() => {
    setServers([0]);
    const vac = new Deque();
    vac.addFront({ start: 1, end: shards - 1 });
    setVacancy(vac);
  }, [shards]);

  return (
    <AppContext.Provider
      value={{
        servers,
        setServers,
        shards,
        setShards,
        vacancy,
        setVacancy,
        data,
        setData,
      }}>
      <div className="home">
        <Menu />
        <Box
          component="section"
          className="main"
          sx={{
            p: 10,
          }}>
          <div className="circle">
            <div className="innerCircle"></div>
            <InsertDivs n={shards} />
          </div>
        </Box>
      </div>
    </AppContext.Provider>
  );
}

export default App;
