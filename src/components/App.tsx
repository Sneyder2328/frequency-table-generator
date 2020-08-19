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
import Line from "./Graphs/Lines/Line"

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
                    hasLines={true}/>
                <Line title="title" text="text" scaleXName="scale x" scaleYName="scale y" textOnMouseX="scaleX"
                      textOnMouseY="scaleY" series={[[1, 2], [1.5, 4], [2, 7], [2.5, 8], [3, 9], [3.5, 10],]}/>

            </div>
        </Provider>
    );
}