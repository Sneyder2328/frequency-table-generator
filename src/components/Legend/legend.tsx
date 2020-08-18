import React from "react";
import "./legend.scss"

export const Legend = () => {

    return (
        <div className={'legend'}>
            <div className={'title'}>
                <i className="fas fa-angle-down"/>
                <span>Leyenda</span>
            </div>
            <div className={'content'}>
                <p>
                    <strong>fi:</strong> Frecuencia Frecuencia absoluta
                    <strong>   fri:</strong> Frecuencia Frecuencia relativa
                    <strong>   Fi:</strong> Frecuencia acumulada
                    <strong>   Fri:</strong> Frecuencia relativa acumulada
                    <strong>   mi:</strong> marca
                    <strong>   n:</strong> cantidad de datos
                    <strong>   k:</strong> Nro de categorias
                    <strong>   c:</strong> tamaño de categoria
                </p>
            </div>
        </div>
    )
};