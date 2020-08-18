import React from "react";
import "./legend.scss"

export const Legend = () => {

    return (
        <div className={'legend container'}>
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
                    <strong>   mi:</strong> mi: marca
                    <strong>   n:</strong> cantidad de datos
                    <strong>   k:</strong> k: Nro de categorias
                    <strong>   c:</strong> c: tamaño de categoria
                </p>
            </div>
        </div>
    )
};