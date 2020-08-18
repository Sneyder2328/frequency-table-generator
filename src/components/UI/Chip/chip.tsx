import React from 'react';
import classnames from 'classnames';
import "./chip.scss";
import {createAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

type Props = {
    index: number;
    label: string;
    isActive: boolean;
    isEditable: boolean;
    onClick: (index: number) => any;
}
export const Chip: React.FC<Props> = ({isActive, isEditable, label, index, onClick}) => {
    return (
        <div className={classnames('chip', {'active': isActive, 'editable': isEditable})}
             onClick={() => isEditable && onClick(index)}>
            <span>{label}</span>
        </div>
    )
}