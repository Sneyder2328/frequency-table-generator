import React from 'react';
import {Chip} from "./Chip/chip";
import { useSelector } from 'react-redux'
import "./columnsSelector.scss"

export const ColumnsSelector = () => {

    // @ts-ignore
    const columns = useSelector(state => state.columnsTable)
    console.log('columnsSelector=', columns);
    return (
        <div className={'columns-selector container'}>
            {columns.map((column: {label:string;active: boolean}, index: number) => (
                <Chip index={index} isEditable={index!==0} isActive={column.active} label={column.label} key={index}/>))}
        </div>
    )
};