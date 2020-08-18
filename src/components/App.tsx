import React from 'react';
import {Provider} from 'react-redux';
import {AppHeader} from "./AppHeader/appHeader";
import {DataEntry} from "./DataEntry/dataEntry";
import {ColumnsSelector} from "./ColumnsSelector/columnsSelector";
import {store} from "../store";

export const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <AppHeader/>
                <DataEntry/>
                <ColumnsSelector/>
            </div>
        </Provider>
    );
}