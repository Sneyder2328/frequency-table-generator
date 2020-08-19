import React, {ChangeEvent} from 'react';
import {Chip} from "../UI/Chip/chip";
import {useDispatch, useSelector} from 'react-redux'
import "./columnsSelector.scss"
import {createAction} from "@reduxjs/toolkit";
import {AppState, Selection} from "../../mainReducer";
import {HashTable} from "../../utils/utils";


export const toggleColumnActive = createAction<string>('TOGGLE_COLUMN_ACTIVE')
export const setUseIntervals = createAction<boolean>('USE_INTERVALS')

export const ColumnsSelector = () => {
    const {columnsTableByIntervals, columnsTableByClasses, useIntervals, dataSet} = useSelector((state: AppState) => state)
    const dispatch = useDispatch()

    const toggleChip = (id: string) => {
        dispatch(toggleColumnActive(id))
    }

    const handleRadioChanged = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUseIntervals(e.target.value === "intervals"))
    }

    let columnsTable: HashTable<Selection>
    if (useIntervals) {
        columnsTable = columnsTableByIntervals
    } else {
        columnsTable = columnsTableByClasses
    }
    if (dataSet.length === 0) return null
    return (
        <div className={'columns-selector'}>
            <div className={'selectors'}>
                {
                    Object.keys(columnsTable).map((id)=>({column: columnsTable[id], id})).map(
                        ({column, id}, index) =>
                            (<Chip key={id} isEditable={index !== 0} isActive={column.active} label={column.label}
                                   onClick={() => toggleChip(id)}/>))
                }
            </div>
            <div className={'radio'}>
                <input type="radio" id="intervals" name="typeCalc" value={'intervals'} onChange={handleRadioChanged}
                       checked={useIntervals === true}/>
                <label htmlFor="intervals">Intervalos</label>
                <input type="radio" id="classes" name="typeCalc" value={'classes'} onChange={handleRadioChanged}
                       checked={useIntervals === false}/>
                <label htmlFor="classes">Clases</label>
            </div>
        </div>
    )
};