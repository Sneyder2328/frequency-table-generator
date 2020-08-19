import React, {useState} from "react";
import "./legend.scss"
import {useSelector} from "react-redux";
import {AppState} from "../../mainReducer";
import classNames from "classnames";

export const Legend = () => {
    const dataSet = useSelector((state: AppState) => state.dataSet)
    const [visible, setVisible] = useState(true)
    if (dataSet.length === 0) return null
    return (
        <div className={'legend'}>
            <div className={'title'} onClick={() => setVisible(!visible)}>
                <i className={classNames("fas fa-angle-down", {"fa-angle-up": visible})}/>
                <span>Leyenda</span>
            </div>
            <div className={classNames('content', {"hide": !visible})}>
                <p>
                    <strong>fi:</strong> Frecuencia Frecuencia absoluta
                    <strong> fri:</strong> Frecuencia Frecuencia relativa
                    <strong> Fi:</strong> Frecuencia acumulada
                    <strong> Fri:</strong> Frecuencia relativa acumulada
                    <strong> mi:</strong> marca
                    <strong> n:</strong> cantidad de datos
                    <strong> k:</strong> Nro de categorias
                    <strong> c:</strong> tamaño de categoria
                </p>
            </div>
        </div>
    )
};