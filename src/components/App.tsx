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
                    title={'Frecuencias'}
                    labels={["1", "5", "4", "7"]}
                    series={[2, 8, 6, 4]}
                    scaleXName={"nombre var"}
                    scaleYName={"fi"}
                    text={"subtitulo"}
                />
                {/*<Histogram title="title" */}
                {/*           text="text" */}
                {/*           labels={[1, 2, 3, 4]} */}
                {/*           scaleXName="scale x" */}
                {/*           scaleYName="scale y"*/}
                {/*           series={[{values: [1, 2, 3]}]}/>*/}


            </div>
        </Provider>
    );
}