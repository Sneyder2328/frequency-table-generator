import React from 'react';
import {Chip} from "../UI/Chip/chip";
import {useDispatch, useSelector} from 'react-redux'
import "./columnsSelector.scss"
import {createAction} from "@reduxjs/toolkit";


export const toggleColumnActive = createAction<number>('TOGGLE_COLUMN_ACTIVE')

export const ColumnsSelector = () => {
    // @ts-ignore
    const columns = useSelector(state => state.columnsTable)
    const dispatch = useDispatch()

    const toggleChip = (index: number) => {
        dispatch(toggleColumnActive(index))
    }

    return (
        <div className={'columns-selector'}>
            {columns.map((column: { label: string; active: boolean }, index: number) => (
                <Chip index={index} isEditable={index !== 0} isActive={column.active} label={column.label} key={index}
                      onClick={toggleChip}/>))}
        </div>
    )
};