import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Chip} from "../UI/Chip/chip";
import {createAction} from "@reduxjs/toolkit";
import "./graphicsSelector.scss"
import {AppState} from "../../mainReducer";

export const toggleGraphicsActive = createAction<number>('TOGGLE_GRAPHICS_ACTIVE')

export const GraphicsSelector = () => {
    const {graphicsList, dataSet} = useSelector((state: AppState) => state)
    const dispatch = useDispatch()

    const toggleChip = (index: number) => {
        dispatch(toggleGraphicsActive(index))
    }

    if (dataSet.length === 0) return null
    return (
        <div className={'graphics-selector'}>
            {graphicsList.map((column: { label: string; active: boolean }, index: number) => (
                <Chip isEditable={true} isActive={column.active} label={column.label} key={index}
                      onClick={() => toggleChip(index)}/>))}
        </div>
    );
}