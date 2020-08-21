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
            <div className={'section-title'} onClick={() => setVisible(!visible)}>
                <i className={classNames("fas fa-angle-down", {"fa-angle-up": visible})}/>
                <span>Leyenda</span>
            </div>
            <div className={classNames('content', {"hide": !visible})}>
                <p>
                    <span>
                    <strong>fi:</strong> Frecuencia Frecuencia absoluta
                    </span>
                    <span>
                    <strong>fri:</strong> Frecuencia Frecuencia relativa
                    </span>
                    <span>
                    <strong>Fi:</strong> Frecuencia acumulada
                    </span>
                    <span>
                    <strong>Fri:</strong> Frecuencia relativa acumulada
                    </span>
                    <span>
                    <strong>mi:</strong> marca
                    </span>
                    <span>
                    <strong>n:</strong> cantidad de datos
                    </span>
                    <span>
                    <strong>k:</strong> Nro de categorias
                    </span>
                    <span>
                    <strong>c:</strong> tamaño de categoria
                    </span>
                </p>
            </div>
        </div>
    )
};