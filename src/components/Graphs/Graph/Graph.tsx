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

type Props = {
    title: string;
    text: string;
    scaleXName: string;
    scaleYName: string;
    typeGraph: string;
    isHidden: boolean;
}
export const Graph: React.FC<Props> = ({title, text, scaleXName, scaleYName, typeGraph, isHidden}) => {
    const [config, setConfig] = useState(
        {
            // @ts-ignore
            ...configGraphs[typeGraph],
            type: graphs[typeGraph].type,
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

    if (dataSet.length === 0 || isHidden) return null
    return (
        <div className={"graph-container"}>
            <div className={'title'}>
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
