import {createReducer} from "@reduxjs/toolkit";
import {toggleColumnActive} from "./components/ColumnsSelector/columnsSelector";
import {toggleGraphicsActive} from "./components/GraphicsSelector/graphicsSelector";

const defaultColumns = [
    {
        label: "Categoria",
        active: true
    },
    {
        label: "fi",
        active: true
    },
    {
        label: "fri",
        active: true
    },
    {
        label: "Fi",
        active: true
    },
    {
        label: "Fri",
        active: true
    },
    {
        label: "mi",
        active: true
    },
    {
        label: "mi*fi",
        active: true
    },
    {
        label: "mi-x̄",
        active: true
    },
    {
        label: "(mi-x̄)^2",
        active: false
    },
    {
        label: "(mi-x̄)^2*fi",
        active: true
    }
];
const defaultGraphics = [
    {
        label: "Histograma",
        active: true
    },
    {
        label: "Sectores",
        active: false
    },
    {
        label: "Lineas",
        active: false
    },
    {
        label: "Columnas con lineas",
        active: false
    }
]


type Selection = { label: string; active: boolean };
export type AppState = {
    dataSet: Array<number>;
    columnsTable: Array<Selection>;
    graphicsList: Array<Selection>;
    frequencyTable: Array<Array<{ value: string }>>;
    dataSummary: {
        n?: number;
        k?: number;
        rango?: number;
        c?: number;
        media?: number;
        mediana?: number;
        moda?: number;
    }
}

const initialState: AppState = {
    dataSet: [],
    columnsTable: defaultColumns,
    graphicsList: defaultGraphics,
    frequencyTable: [],
    dataSummary: {}
}

export const mainReducer = createReducer(
    initialState, {
        [toggleColumnActive.type]: (state, action) => {
            return {
                ...state,
                columnsTable: state.columnsTable.map((column, index) => {
                    if (index === action.payload) {
                        return {
                            label: column.label,
                            active: !column.active
                        }
                    }
                    return column
                })
            }
        },
        [toggleGraphicsActive.type]: (state, action) => {
            return {
                ...state,
                graphicsList: state.graphicsList.map((column, index) => {
                    if (index === action.payload) {
                        return {
                            label: column.label,
                            active: !column.active
                        }
                    }
                    return column
                })
            }
        }
    }
)