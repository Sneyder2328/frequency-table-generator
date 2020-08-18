import {createReducer} from "@reduxjs/toolkit";
import {toggleColumnActive} from "./components/ColumnsSelector/Chip/chip";

const defaultColumns = [
    {
        label: "Categoria",
        activeByDefault: true
    },
    {
        label: "fi",
        activeByDefault: true
    },
    {
        label: "fri",
        activeByDefault: true
    },
    {
        label: "Fi",
        activeByDefault: true
    },
    {
        label: "Fri",
        activeByDefault: true
    },
    {
        label: "mi",
        activeByDefault: true
    },
    {
        label: "mi*fi",
        activeByDefault: true
    },
    {
        label: "mi-x̄",
        activeByDefault: true
    },
    {
        label: "(mi-x̄)^2",
        activeByDefault: false
    },
    {
        label: "(mi-x̄)^2*fi",
        activeByDefault: true
    }
];

export type AppState = {
    dataSet: Array<number>;
    columnsTable: Array<{ label: string; active: boolean }>;
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
    columnsTable: defaultColumns.map(({label, activeByDefault}) => ({label, active: activeByDefault})),
    frequencyTable: [],
    dataSummary: {}
}

export const mainReducer = createReducer(
    initialState, {
        [toggleColumnActive.type]: (state, action) => {
            //state.columnsTable[action.payload].active = !state.columnsTable[action.payload].active
            return {
                ...state,
                columnsTable: state.columnsTable.map((column, index)=>{
                    if(index===action.payload){
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