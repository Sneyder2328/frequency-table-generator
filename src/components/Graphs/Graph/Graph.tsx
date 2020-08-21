import React, { useEffect, useRef, useState } from "react";
import "zingchart/es6";
import "zingchart-react/dist/modules/zingchart-depth.min.js";
// @ts-ignore
import ZingChart from "zingchart-react";
import { useSelector } from "react-redux";
import { AppState, Selection } from "../../../mainReducer";
import { HashTable } from "../../../utils/utils";
import "./graph.scss";
import { configGraphs } from "../config";
import { graphs } from "../graphs";

type Props = {
  title: string;
  typeGraph: string;
  isHidden: boolean;
};
export const Graph: React.FC<Props> = ({
  title,
  typeGraph,
  isHidden,
}) => {
  const [indexSelected, setIndexSelected] = useState<number>(
    graphs[typeGraph].frequencies[graphs[typeGraph].indexDefaultFrequency].index
  );
  const [config, setConfig] = useState({
    // @ts-ignore
    ...configGraphs[typeGraph],
    scaleY: {
      label: {
        text: graphs[typeGraph].frequencies.find(
          ({ index }) => index === indexSelected
        )?.label,
      },
    },
  });
  const chart = useRef(null);
  const {
    frequencyTable,
    dataSet,
    columnsTableByIntervals,
    columnsTableByClasses,
    useIntervals,
  } = useSelector((state: AppState) => state);

  let columnsTable: HashTable<Selection>;
  if (useIntervals) {
    columnsTable = columnsTableByIntervals;
  } else {
    columnsTable = columnsTableByClasses;
  }

  useEffect(() => {
    const labels = frequencyTable.map(
      (freq) => freq[Object.keys(columnsTable)[0]]
    );
    const getFrequencies = (index: number) =>
      frequencyTable
        .map((freq) => freq[Object.keys(columnsTable)[index]])
        .map((str) => parseFloat(str));
    const frequencies = getFrequencies(indexSelected);
    console.log(labels, frequencies);

    const series = graphs[typeGraph].getSeries(frequencies, labels);
    setConfig({
      ...config,
      // @ts-ignore
      series,
      scaleY: {
        label: {
          text: graphs[typeGraph].frequencies.find(
            ({ index }) => index === indexSelected
          )?.label,
        },
      },
      scaleX: {
        ...config.scaleX,
        labels,
      },
    });
  }, [frequencyTable, indexSelected]);

  if (dataSet.length === 0 || isHidden) return null;
  return (
    <div className={"graph-container"}>
      <div className={"section-title"}>
        <span>{title}</span>
        <select
          className={"selector"}
          value={indexSelected}
          onChange={(e) => setIndexSelected(parseInt(e.target.value))}
        >
          {graphs[typeGraph].frequencies.map(({ index, label }) => (
            <option value={index}>{label}</option>
          ))}
        </select>
      </div>
      <div className={"graph"}>
        <ZingChart ref={chart} data={config} />
      </div>
    </div>
  );
};
