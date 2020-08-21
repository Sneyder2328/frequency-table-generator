import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../mainReducer";
import {HashTable} from "../../utils/utils";
import {Graph} from "./Graph/Graph";


export const HISTOGRAM = 'Histograma'
export const SECTORS = 'Sectores'
export const LINES = 'Lineas'
export const MIXED = 'Columnas Con Lineas'

type GraphConfig = {
    type: string;
    indexDefaultFrequency: number;
    getSeries: (values: Array<number>) => any; //series: Array<{ type: string; values: Array<number }>
}
export const graphs: HashTable<GraphConfig> = {
    [HISTOGRAM]: {
        type: "bar",
        indexDefaultFrequency: 1,
        getSeries(values) {
            return [
                {
                    values,
                    "bar-width": "60%",
                }
            ]
        }
    },
    [SECTORS]: {
        type: "pie",
        indexDefaultFrequency: 3,
        getSeries(values) {
            return values.map((num, index) => ({values: [num], text: "ind" + index}))
        }
    },
    [LINES]: {
        type: "line",
        indexDefaultFrequency: 4,
        getSeries(values) {
            return [
                {
                    values: values.map((num, index) => [index, num])
                }
            ]
        }
    },
    [MIXED]: {
        type: "mixed",
        indexDefaultFrequency: 4,
        getSeries(values) {
            return [
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
        }
    }
}


export const Graphs = () => {
    const {graphicsList} = useSelector((state: AppState) => state)

    return (
        <div id={'list-graphs'}>
            <Graph
                isHidden={!graphicsList[HISTOGRAM].active}
                title={HISTOGRAM}
                scaleXName={"nombre var"}
                scaleYName={"fi"}
                text={"subtitulo"}
                typeGraph={HISTOGRAM}/>
            <Graph
                isHidden={!graphicsList[SECTORS].active}
                title={SECTORS}
                scaleXName={"nombre var"}
                scaleYName={"fi"}
                text={"subtitulo"}
                typeGraph={SECTORS}/>
            <Graph
                isHidden={!graphicsList[LINES].active}
                title={LINES}
                scaleXName={"nombre var"}
                scaleYName={"fi"}
                text={"subtitulo"}
                typeGraph={LINES}/>
            <Graph
                isHidden={!graphicsList[MIXED].active}
                title={MIXED}
                scaleXName={"nombre var"}
                scaleYName={"fi"}
                text={"subtitulo"}
                typeGraph={MIXED}/>
        </div>
    )
}