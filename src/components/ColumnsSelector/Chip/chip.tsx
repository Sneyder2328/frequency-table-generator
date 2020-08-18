import React from 'react';
import classnames from 'classnames';
import "./chip.scss";
import {createAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

export const toggleColumnActive = createAction<number>('TOGGLE_COLUMN_ACTIVE')

type Props = {
    index: number;
    label: string;
    isActive: boolean;
    isEditable: boolean;
}
export const Chip: React.FC<Props> = ({isActive, isEditable, label, index}) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        isEditable && dispatch(toggleColumnActive(index))
    };

    return (
        <div className={classnames('chip', {'active': isActive, 'editable': isEditable})} onClick={handleClick}>
            <span>{label}</span>
        </div>
    )
}