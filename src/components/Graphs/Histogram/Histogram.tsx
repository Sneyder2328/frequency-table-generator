import React, {useEffect, useRef, useState} from "react";
import "zingchart/es6";
import "zingchart-react/dist/modules/zingchart-depth.min.js";
import {configTemp} from "./configTemplate.js";
// @ts-ignore
import ZingChart from "zingchart-react";
import {useSelector} from "react-redux";
import {AppState, Selection} from "../../../mainReducer";
import {HashTable} from "../../../utils/utils";

type Props = {
    series: Array<number>;
    labels: Array<string>;
    title: string;
    text: string;
    scaleXName: string;
    scaleYName: string;
}
export const Histogram: React.FC<Props> = ({title, labels, series, text, scaleXName, scaleYName}) => {
    const [config, setConfig] = useState<typeof configTemp>(
        {
            ...configTemp,
            // @ts-ignore
            series: [{values: series}],
            title: {text: title},
            subtitle: {text},
            scaleX: {
                ...configTemp.scaleX,
                labels,
                label: {text: scaleXName}
            },
            scaleY: {label: {text: scaleYName}}
        }
    )
    const chart = useRef(null)
    const {frequencyTable, dataSet, columnsTableByIntervals, columnsTableByClasses, useIntervals} = useSelector((state: AppState) => state)

    let columnsTable: HashTable<Selection>
    if (useIntervals) {
        columnsTable = columnsTableByIntervals
    } else {
        columnsTable = columnsTableByClasses
    }

    useEffect(() => {
        const labels = frequencyTable.map((freq) => freq[Object.keys(columnsTable)[0]]);
        const frequencies = frequencyTable.map((freq) => freq[Object.keys(columnsTable)[1]]).map(str => parseFloat(str));
        console.log(labels, frequencies);
        setConfig({
            ...config,
            series: [{values: frequencies}],
            scaleX: {
                ...configTemp.scaleX,
                labels
            },
        })

    }, [frequencyTable])

    if (dataSet.length === 0) return null
    return (
        <div className="chartContainer">
            <ZingChart ref={chart} data={config}/>
        </div>
    )
}
