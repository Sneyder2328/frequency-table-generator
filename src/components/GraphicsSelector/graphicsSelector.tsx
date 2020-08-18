import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Chip} from "../UI/Chip/chip";
import {createAction} from "@reduxjs/toolkit";
import "./graphicsSelector.scss"

export const toggleGraphicsActive = createAction<number>('TOGGLE_COLUMN_ACTIVE')

export const GraphicsSelector = () => {
    // @ts-ignore
    const graphicsList = useSelector(state => state.graphicsList)
    const dispatch = useDispatch()

    const toggleChip = (index: number) => {
        dispatch(toggleGraphicsActive(index))
    }

    return (
        <div className={'graphics-selector'}>
            {graphicsList.map((column: { label: string; active: boolean }, index: number) => (
                <Chip index={index} isEditable={true} isActive={column.active} label={column.label} key={index}
                      onClick={toggleChip}/>))}
        </div>
    );
}