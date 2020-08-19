import React, {useEffect, useRef, useState} from "react";
import "zingchart/es6";
import "zingchart-react/dist/modules/zingchart-depth.min.js";
import {configTemp} from "./configTemplate.js";
// @ts-ignore
import ZingChart from "zingchart-react";
import {useSelector} from "react-redux";
import {AppState, Selection} from "../../../mainReducer";
import {HashTable} from "../../../utils/utils";
import "./histogram.scss"

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
    hasLines: boolean;
}
export const Histogram: React.FC<Props> = ({title, text, scaleXName, scaleYName, hasLines}) => {
    const [config, setConfig] = useState<typeof configTemp>(
        {
            ...configTemp,
            // @ts-ignore
            type: hasLines ? "mixed" : "bar",
            // @ts-ignore
            //series: hasLines ? seriesWithLines() : seriesDefault,
            title: {text: title},
            subtitle: {text},
            scaleX: {
                ...configTemp.scaleX,
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

        const series = hasLines ? seriesWithLines(frequencies) : seriesDefault(frequencies)
        setConfig({
            ...config,
            // @ts-ignore
            series,
            scaleX: {
                ...configTemp.scaleX,
                labels
            },
        })

    }, [frequencyTable])

    if (dataSet.length === 0) return null
    return (
        <div className="histogram">
            <ZingChart ref={chart} data={config}/>
        </div>
    )
}
