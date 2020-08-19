import React from "react";
import {useSelector} from "react-redux";
import "./dataSet.scss"
import {AppState} from "../../mainReducer";

export const DataSet = () => {
    const dataSet: Array<number> = useSelector((state: AppState) => state.dataSet)
    if (dataSet.length === 0) return null
    return (
        <div className={'dataset'}>
            <div className={'title'}>
                <i className="fas fa-angle-down"/>
                <span>Set de datos</span>
            </div>
            <div className={'content'}>{dataSet.join(", ")}</div>
        </div>
    )
};