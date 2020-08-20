import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { AppHeader } from "./AppHeader/appHeader";
import { DataEntry, processDataSet } from "./DataEntry/dataEntry";
import { ColumnsSelector } from "./ColumnsSelector/columnsSelector";
import { store } from "../store";
import { Legend } from "./Legend/legend";
import { DataSet } from "./DataSet/dataSet";
import { GraphicsSelector } from "./GraphicsSelector/graphicsSelector";
import { FrequencyTable } from "./FrequencyTable/frequencyTable";
import { DataSummary } from "./DataSummary/dataSummary";
import { Graphs } from "./Graphs/graphs";
import Actions from "./Actions/Actions";
import { BrowserRouter as Router } from "react-router-dom";
import { useQuery } from "../utils/utils";

function InnerApp() {
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const dataset = query.get("dataset");
    if (dataset) {
      console.log("url changed", dataset);
      const arrayNums = dataset.split("-").map((str) => parseFloat(str));
      console.log(arrayNums);
      dispatch(processDataSet(arrayNums));
    }
  }, [query]);

  return (
    <div className="App">
      <AppHeader />
      <DataEntry />
      <ColumnsSelector />
      <FrequencyTable />
      <DataSummary />
      <Legend />
      <DataSet />
      <Actions />
      <GraphicsSelector />
      <Graphs />
    </div>
  );
}

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <InnerApp />
      </Router>
    </Provider>
  );
};
