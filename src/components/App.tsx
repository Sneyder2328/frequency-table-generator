import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {AppHeader} from "./AppHeader/appHeader";
import {DataEntry, processDataSet} from "./DataEntry/dataEntry";
import {ColumnsSelector} from "./ColumnsSelector/columnsSelector";
import {store} from "../store";
import {Legend} from "./Legend/legend";
import {DataSet} from "./DataSet/dataSet";
import {GraphicsSelector} from "./GraphicsSelector/graphicsSelector";
import {FrequencyTable} from "./FrequencyTable/frequencyTable";
import {DataSummary} from "./DataSummary/dataSummary";
import {Graphs} from "./Graphs/graphs";
import Actions from "./Actions/Actions"
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {useQuery} from "../utils/utils";
import {AppState} from "../mainReducer";

function InnerApp() {
    const query = useQuery();
    const dispatch = useDispatch()
    const history = useHistory();
    const dataSet = useSelector(((state: AppState) => state.dataSet))

    useEffect(() => {
        console.log('loading from url');
        const dataset = query.get("dataset")
        if (dataset) {
            console.log("url changed", dataset);
            const arrayNums = dataset.split("-").map((str) => parseFloat(str));
            console.log(arrayNums);
            dispatch(processDataSet(arrayNums))
        }
    }, [])

    useEffect(()=>{
        console.log('dataset changes');
        history.push("/?dataset=" + dataSet.join("-"))
    }, [dataSet])

    return <div className="App">
        <AppHeader/>
        <DataEntry/>
        <ColumnsSelector/>
        <FrequencyTable/>
        <DataSummary/>
        <Legend/>
        <DataSet/>
        <Actions/>
        <GraphicsSelector/>
        <Graphs/>
    </div>;
}

export const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <InnerApp/>
            </Router>
        </Provider>
    );
}
