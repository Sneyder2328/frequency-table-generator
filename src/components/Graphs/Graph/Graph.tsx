import React, {useEffect, useRef, useState} from "react";
import "zingchart/es6";
import "zingchart-react/dist/modules/zingchart-depth.min.js";
// @ts-ignore
import ZingChart from "zingchart-react";
import {useSelector} from "react-redux";
import {AppState, Selection} from "../../../mainReducer";
import {HashTable} from "../../../utils/utils";
import "./graph.scss"
import {configGraphs} from "../config";
import {graphs} from "../graphs";

export const seriesWithLines = (values: Array<number>) => [
    {
        type: "bar",
        values,
        "bar-width": "60%",
    },
    {
        type: "line",
        values,
        aspect: "spline",
        'line-color': "#66CCFF",
        marker: {
            size: 4,
            'background-color': "#66CCFF #3480fa",
            'border-color': "white"
        }
    }
]
export const seriesDefault = (values: Array<number>) => [
    {
        values,
        "bar-width": "60%",
    }
];

type Props = {
    title: string;
    text: string;
    scaleXName: string;
    scaleYName: string;
    typeGraph: string;
}
export const Graph: React.FC<Props> = ({title, text, scaleXName, scaleYName, typeGraph}) => {
    const [config, setConfig] = useState(
        {
            // @ts-ignore
            ...configGraphs[typeGraph],
            type: graphs[typeGraph].type,
            // title: {text: title},
            // subtitle: {text},
            scaleX: {
                // @ts-ignore
                ...configGraphs[typeGraph].scaleX,
                // label: {text: scaleXName}
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

        const getFrequencies = (index: number) => frequencyTable.map((freq) => freq[Object.keys(columnsTable)[index]]).map(str => parseFloat(str))
        const frequencies = getFrequencies(graphs[typeGraph].indexDefaultFrequency)
        console.log(labels, frequencies);

        const series = graphs[typeGraph].getSeries(frequencies)
        setConfig({
            ...config,
            // @ts-ignore
            series,
            scaleX: {
                ...config.scaleX,
                labels
            },
        })

    }, [frequencyTable])

    if (dataSet.length === 0) return null
    return (
        <div className={"histogram"}>
            <div className={'title custom-select'}>
                <span>{title}</span>
                <select className={'selector'}>
                    <option value="0">fi</option>
                    <option value="1">fri</option>
                    <option value="2">Fi</option>
                    <option value="3">Fri</option>
                </select>
            </div>
            <div className={'graph'}>
                <ZingChart ref={chart} data={config}/>
            </div>
        </div>
    )
}
