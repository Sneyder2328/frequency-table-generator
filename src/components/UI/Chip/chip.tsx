import React from 'react';
import classnames from 'classnames';
import "./chip.scss";
import {createAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

type Props = {
    label: string;
    isActive: boolean;
    isEditable: boolean;
    onClick: () => any;
}
export const Chip: React.FC<Props> = ({isActive, isEditable, label, onClick}) => {
    return (
        <div className={classnames('chip', {'active': isActive, 'editable': isEditable})}
             onClick={() => isEditable && onClick()}>
            <span>{label}</span>
        </div>
    )
}