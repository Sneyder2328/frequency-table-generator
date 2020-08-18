import React from 'react';
import {Provider} from 'react-redux';
import {AppHeader} from "./AppHeader/appHeader";
import {DataEntry} from "./DataEntry/dataEntry";
import {ColumnsSelector} from "./ColumnsSelector/columnsSelector";
import {store} from "../store";
import {Legend} from "./Legend/legend";
import {DataSet} from "./DataSet/dataSet";
import {GraphicsSelector} from "./GraphicsSelector/graphicsSelector";

export const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <AppHeader/>
                <DataEntry/>
                <ColumnsSelector/>
                <Legend/>
                <DataSet/>
                <GraphicsSelector/>
            </div>
        </Provider>
    );
}