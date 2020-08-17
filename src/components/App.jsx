import React from 'react';
import {AppHeader} from "./AppHeader/appHeader";
import {DataEntry} from "./DataEntry/dataEntry";
import {ColumnsSelector} from "./ColumnsSelector/columnsSelector";


function App() {
  return (
    <div className="App">
        <AppHeader/>
        <DataEntry/>
        <ColumnsSelector/>
    </div>
  );
}

export default App;