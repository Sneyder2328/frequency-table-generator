import React from 'react';
import {Chip} from "./Chip/chip";
import "./columnsSelector.scss"

const tableColumns = [
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

export const ColumnsSelector  = () => (
    <div className={'columns-selector container'}>
        <Chip isEditable={false} label={'Categoria'} isActive={true}/>
        {tableColumns.map((column, index) => (<Chip isEditable={true} isActive={column.activeByDefault} label={column.label} key={index}/>))}
    </div>
);