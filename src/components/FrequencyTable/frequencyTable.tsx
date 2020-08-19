import React from "react";
import "./frequencyTable.scss"
import {useSelector} from "react-redux";
import {AppState, Selection} from "../../mainReducer";
import {HashTable} from "../../utils/utils";

export const FrequencyTable = () => {
    const {columnsTableByIntervals, columnsTableByClasses, useIntervals, dataSet, frequencyTable} = useSelector((state: AppState) => state)

    let columnsTable: HashTable<Selection>
    if (useIntervals) {
        columnsTable = columnsTableByIntervals
    } else {
        columnsTable = columnsTableByClasses
    }

    if (dataSet.length === 0) return null
    const activeColumns = Object.keys(columnsTable).map((id) => ({
        column: columnsTable[id], id
    })).filter(({column}) => column.active);

    return (
        <div className={'frequency-table'}>
            <table className={'table'}>
                <thead>
                <tr>
                    {
                        activeColumns.map(
                            ({column, id}) =>
                                (<td colSpan={1} key={id}>
                                    <span>{column.label}</span>
                                </td>))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    frequencyTable.map((row, index) => {
                        return (
                            <tr key={index}>
                                {activeColumns.map(({id}) => {
                                    return (
                                        <td colSpan={1} key={id}>
                                            <span>{row[id]}</span>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })
                }
                {/*<tr>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>45</span>*/}
                {/*    </td>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>45</span>*/}
                {/*    </td>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>45</span>*/}
                {/*    </td>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>45</span>*/}
                {/*    </td>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>23</span>*/}
                {/*    </td>*/}
                {/*</tr>*/}
                {/*<tr>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>45</span>*/}
                {/*    </td>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>45</span>*/}
                {/*    </td>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>45</span>*/}
                {/*    </td>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>45</span>*/}
                {/*    </td>*/}
                {/*    <td colSpan={1}>*/}
                {/*        <span>23</span>*/}
                {/*    </td>*/}
                {/*</tr>*/}
                </tbody>
            </table>
        </div>
    )
}