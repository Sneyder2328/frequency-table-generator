import React from "react";
import { AppHeader } from "./AppHeader/appHeader";
import { DataEntry } from "./DataEntry/dataEntry";
import Histogram from "./Graphs/Histogram/Histogram.jsx";
import Pie from "./Graphs/Sectors/Pie.jsx";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <DataEntry />
    </div>
  );
}

export default App;
