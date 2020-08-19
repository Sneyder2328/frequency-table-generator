import React from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../mainReducer";
import "./dataSummary.scss"
import {formatNumber} from "../../utils/utils";

const columnsTitles = ["n", "nro categorias","amplitud", "media", "mediana", "moda", "rango", "varianza", "desviacion std", "CV", "ASP"]

export const DataSummary = () => {
    const dataSummary = useSelector((state: AppState) => state.dataSummary)

    if (!dataSummary) return null
    return (
        <div className={'data-summary'}>
            <table className={'table'}>
                <thead>
                <tr>
                    {
                        columnsTitles.map((str, index) =>
                            (<td colSpan={1} key={index}>
                                <span>{str}</span>
                            </td>)
                        )
                    }
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={1}>
                        <span>{dataSummary.n}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{dataSummary.numCategories}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{dataSummary.amplitude}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{formatNumber(dataSummary.mean)}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{formatNumber(dataSummary.median)}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{dataSummary.mode}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{formatNumber(dataSummary.range)}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{formatNumber(dataSummary.variance)}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{formatNumber(dataSummary.stdDeviation)}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{formatNumber(dataSummary.cv, 3)+"%"}</span>
                    </td>
                    <td colSpan={1}>
                        <span>{formatNumber(dataSummary.asp)}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
};