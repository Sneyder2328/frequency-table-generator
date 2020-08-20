import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Chip} from "../UI/Chip/chip";
import {createAction} from "@reduxjs/toolkit";
import "./graphicsSelector.scss"
import {AppState} from "../../mainReducer";

export const toggleGraphicsActive = createAction<string>('TOGGLE_GRAPHICS_ACTIVE')

export const GraphicsSelector = () => {
    const {graphicsList, dataSet} = useSelector((state: AppState) => state)
    const dispatch = useDispatch()

    const toggleChip = (label: string) => {
        dispatch(toggleGraphicsActive(label))
    }

    if (dataSet.length === 0) return null
    return (
        <div className={'graphics-selector'}>
            {
                Object.keys(graphicsList).map((key) => graphicsList[key]).map(({label, active}) => (
                    <Chip isEditable={true} isActive={active} label={label} key={label}
                          onClick={() => toggleChip(label)}/>))}
        </div>
    );
}