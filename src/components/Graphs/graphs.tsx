import React from "react";
import Line from "./Lines/Line"
import {useSelector} from "react-redux";
import {AppState} from "../../mainReducer";
import {HashTable} from "../../utils/utils";
import {Graph} from "./Graph/Graph";


export const HISTOGRAM = 'Histograma'
export const SECTORS = 'Sectores'
export const LINES = 'Lineas'
export const MIXED = 'Columnas con lineas'

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
        <>
            <Graph
                title={'Histograma'}
                scaleXName={"nombre var"}
                scaleYName={"fi"}
                text={"subtitulo"}
                typeGraph={HISTOGRAM}
            />
            <Graph
                title={'Lineas'}
                scaleXName={"nombre var"}
                scaleYName={"fi"}
                text={"subtitulo"}
                typeGraph={LINES}/>
            <Graph
                title={'Columnas con lineas'}
                scaleXName={"nombre var"}
                scaleYName={"fi"}
                text={"subtitulo"}
                typeGraph={MIXED}/>
            {/*<Line title="title" text="text" scaleXName="scale x" scaleYName="scale y" textOnMouseX="scaleX"*/}
            {/*      textOnMouseY="scaleY" series={[[1, 2], [1.5, 4], [2, 7], [2.5, 8], [3, 9], [3.5, 10], [4, 15]]}/>*/}
            {/*<Pie title="title" text="text" labels={[1, 2, 3, 4]}*/}
            {/*     series={[{values: [10], text: "Alpha"}, {values: [20], text: "Beta"}, {*/}
            {/*         values: [40],*/}
            {/*         text: "Theta"*/}
            {/*     },]}/>*/}
        </>
    )
}