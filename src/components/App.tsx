import React from 'react';
import {Provider} from 'react-redux';
import {AppHeader} from "./AppHeader/appHeader";
import {DataEntry} from "./DataEntry/dataEntry";
import {ColumnsSelector} from "./ColumnsSelector/columnsSelector";
import {store} from "../store";
import {Legend} from "./Legend/legend";
import {DataSet} from "./DataSet/dataSet";
import {GraphicsSelector} from "./GraphicsSelector/graphicsSelector";
import {FrequencyTable} from "./FrequencyTable/frequencyTable";
import {DataSummary} from "./DataSummary/dataSummary";
import {Histogram} from "./Graphs/Histogram/Histogram"

export const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <AppHeader/>
                <DataEntry/>
                <ColumnsSelector/>
                <FrequencyTable/>
                <DataSummary/>
                <Legend/>
                <DataSet/>
                <GraphicsSelector/>
                <Histogram
                    title={'Histograma'}
                    scaleXName={"nombre var"}
                    scaleYName={"fi"}
                    text={"subtitulo"}
                    hasLines={false}
                />
                <Histogram
                    title={'Columnas con lineas'}
                    scaleXName={"nombre var"}
                    scaleYName={"fi"}
                    text={"subtitulo"}
                    hasLines={true}
                />


            </div>
        </Provider>
    );
}