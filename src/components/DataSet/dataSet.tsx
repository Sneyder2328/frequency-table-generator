import React from "react";
import {useSelector} from "react-redux";
import "./dataSet.scss"

export const DataSet = () => {
    // @ts-ignore
    const dataSet: Array<number> = useSelector(state => state.dataSet)

    return (
        <div className={'dataset'}>
            <div className={'title'}>
                <i className="fas fa-angle-down"/>
                <span>Set de datos</span>
            </div>
            <div className={'content'}>{dataSet.join(",")}</div>
        </div>
    )
};