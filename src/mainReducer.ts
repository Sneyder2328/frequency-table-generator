import {createReducer} from "@reduxjs/toolkit";
import {setUseIntervals, toggleColumnActive} from "./components/ColumnsSelector/columnsSelector";
import {toggleGraphicsActive} from "./components/GraphicsSelector/graphicsSelector";
import {cleanAll, processDataSet} from "./components/DataEntry/dataEntry";
import {formatNumber, HashTable, onlyUnique} from "./utils/utils";
import {nanoid} from '@reduxjs/toolkit'
import {HISTOGRAM, LINES, MIXED, SECTORS} from "./components/Graphs/graphs";

const defaultColumnsIntervals = {
    [nanoid()]: {
        label: "Categoría",
        active: true
    },
    [nanoid()]: {
        label: "fi",
        active: true
    },
    [nanoid()]: {
        label: "fri",
        active: true
    },
    [nanoid()]: {
        label: "Fi",
        active: true
    },
    [nanoid()]: {
        label: "Fri",
        active: true
    },
    [nanoid()]: {
        label: "mi",
        active: true
    },
    [nanoid()]: {
        label: "mi*fi",
        active: true
    },
    [nanoid()]: {
        label: "mi-x̄",
        active: true
    },
    [nanoid()]: {
        label: "(mi-x̄)^2",
        active: false
    },
    [nanoid()]: {
        label: "(mi-x̄)^2*fi",
        active: true
    }
}

const defaultColumnsClasses = {
    [nanoid()]: {
        label: "xi",
        active: true
    },
    [nanoid()]: {
        label: "fi",
        active: true
    },
    [nanoid()]: {
        label: "fri",
        active: true
    },
    [nanoid()]: {
        label: "Fi",
        active: true
    },
    [nanoid()]: {
        label: "Fri",
        active: true
    },
    [nanoid()]: {
        label: "xi*fi",
        active: true
    },
    [nanoid()]: {
        label: "xi-x̄",
        active: true
    },
    [nanoid()]: {
        label: "(xi-x̄)^2",
        active: true
    },
    [nanoid()]: {
        label: "(xi-x̄)^2*fi",
        active: true
    }
}
const defaultGraphics = {
    [HISTOGRAM]: {
        label: HISTOGRAM,
        active: true
    },
    [SECTORS]: {
        label: SECTORS,
        active: true
    },
    [LINES]: {
        label: LINES,
        active: true
    },
    [MIXED]: {
        label: MIXED,
        active: true
    }
}

export type Selection = { label: string; active: boolean };
export type DataSummary = {
    n: number;
    numCategories: number;
    range: number;
    amplitude: number;
    mean: number;
    median: number;
    mode: string;
    variance: number;
    stdDeviation: number;
    asp: number;
    cv: number;
};
type FrequencyTable = Array<HashTable<string>>;
export type AppState = {
    dataSet: Array<number>;
    useIntervals?: boolean;
    columnsTableByIntervals: HashTable<Selection>;
    columnsTableByClasses: HashTable<Selection>;
    graphicsList: HashTable<Selection>;
    frequencyTable: FrequencyTable;
    dataSummary?: DataSummary
}

const initialState: AppState = {
    dataSet: [],
    columnsTableByIntervals: defaultColumnsIntervals,
    columnsTableByClasses: defaultColumnsClasses,
    graphicsList: defaultGraphics,
    frequencyTable: []
}

export const mainReducer = createReducer(
    initialState, {
        [toggleColumnActive.type]: (state, action) => {
            if (state.useIntervals) return {
                ...state,
                columnsTableByIntervals: {
                    ...state.columnsTableByIntervals,
                    [action.payload]: {
                        ...state.columnsTableByIntervals[action.payload],
                        active: !state.columnsTableByIntervals[action.payload].active
                    }
                }
            }
            return {
                ...state,
                columnsTableByClasses: {
                    ...state.columnsTableByClasses,
                    [action.payload]: {
                        ...state.columnsTableByClasses[action.payload],
                        active: !state.columnsTableByClasses[action.payload].active
                    }
                }
            }
        },
        [toggleGraphicsActive.type]: (state, action) => {
            return {
                ...state,
                graphicsList: {
                    ...state.graphicsList,
                    [action.payload]: {
                        ...state.graphicsList[action.payload],
                        active: !state.graphicsList[action.payload].active
                    }
                }
            }
        },
        [cleanAll.type]: () => initialState,
        [processDataSet.type]: (state, action) => {
            const values = calculateValues(action.payload)
            return {
                ...state,
                dataSet: action.payload,
                ...values
            }
        },
        [setUseIntervals.type]: (state, action) => {
            if (action.payload === state.useIntervals) return state
            const values = calculateValues(state.dataSet, action.payload)
            return {
                ...state,
                ...values
            }
        }
    }
)


type BasicFrequenciesInterval = {
    lowerLimit: number;
    upperLimit: number;
    fi: number;
    fri: number;
    Fi: number;
    Fri: number;
    mi: number;
    mifi: number;
}
const getBasicFrequenciesForInterval = (lowerLimit: number, upperLimit: number, lastAbsoluteFrequency: number, dataset: Array<number>): BasicFrequenciesInterval => {
    const fi = dataset.filter((value) => value >= lowerLimit && value < upperLimit).length || 0;
    const fri = fi / dataset.length;
    const Fi = lastAbsoluteFrequency + fi;
    const Fri = Fi / dataset.length;
    const mi = (lowerLimit + upperLimit) / 2;
    const mifi = mi * fi;
    return {
        lowerLimit,
        upperLimit,
        fi,
        fri,
        Fi,
        Fri,
        mi,
        mifi
    };
}

type BasicFrequenciesClasses = {
    xi: number;
    fi: number;
    fri: number;
    Fi: number;
    Fri: number;
    xifi: number;
}
const getBasicFrequenciesForClasses = (xi: number, lastAbsoluteFrequency: number, dataset: Array<number>): BasicFrequenciesClasses => {
    const fi = dataset.filter((value) => value === xi).length || 0;
    const fri = fi / dataset.length;
    const Fi = lastAbsoluteFrequency + fi;
    const Fri = Fi / dataset.length;
    const xifi = xi * fi;
    return {
        xi,
        fi,
        fri,
        Fi,
        Fri,
        xifi
    };
}


type ExtendedFrequencies = {
    miMinusMean: number;
    miMinusMeanSquared: number;
    miMinusMeanSquaredfi: number;
}
const getExtendedFrequencies = (frequency: BasicFrequenciesInterval, mean: number): ExtendedFrequencies => {
    const miMinusMean = frequency.mi - mean;
    const miMinusMeanSquared = miMinusMean * miMinusMean
    const miMinusMeanSquaredfi = miMinusMeanSquared * frequency.fi
    return {
        miMinusMean,
        miMinusMeanSquared,
        miMinusMeanSquaredfi
    }
}

type ExtendedFrequenciesClass = {
    xiMinusMean: number;
    xiMinusMeanSquared: number;
    xiMinusMeanSquaredfi: number;
}
const getExtendedFrequenciesForClass = (frequency: BasicFrequenciesClasses, mean: number): ExtendedFrequenciesClass => {
    const xiMinusMean = frequency.xi - mean;
    const xiMinusMeanSquared = xiMinusMean * xiMinusMean
    const xiMinusMeanSquaredfi = xiMinusMeanSquared * frequency.fi
    return {
        xiMinusMean,
        xiMinusMeanSquared,
        xiMinusMeanSquaredfi
    }
}

function getExtremes(dataset: Array<number>) {
    let vMin = dataset[0];
    let vMax = dataset[0];
    dataset.forEach((num) => {
        if (num < vMin)
            vMin = num;
        if (num > vMax)
            vMax = num;
    });
    return {vMin, vMax};
}

const getMedianForInterval = (basicFrequencies: Array<BasicFrequenciesInterval>, amplitude: number, numItems: number) => {
    const indexCatMedianal = basicFrequencies.findIndex((value) => value.Fri >= 0.5);
    const categoriaMedianal = basicFrequencies[indexCatMedianal];
    const linf = categoriaMedianal.lowerLimit;
    const Faa = indexCatMedianal !== 0 ? basicFrequencies[indexCatMedianal - 1].Fi : 0;
    return linf + amplitude * (numItems / 2 - Faa) / categoriaMedianal.fi;
}

const getMedianForClass = (dataset: Array<number>): number => {
    const sortedDataSet = [...dataset].sort((a, b) => a - b)
    if (sortedDataSet.length % 2 === 0) {
        return (sortedDataSet[(sortedDataSet.length / 2) - 1] + sortedDataSet[sortedDataSet.length / 2]) / 2
    }
    return sortedDataSet[(sortedDataSet.length - 1) / 2]
}

const getModeForInterval = (basicFrequencies: Array<BasicFrequenciesInterval>) => {
    let categoriasMaxfri: any = [];
    basicFrequencies.forEach((rowFrequencies) => {
        if (categoriasMaxfri.length === 0 || categoriasMaxfri[0].fri < rowFrequencies.fri) {
            categoriasMaxfri = [];
            categoriasMaxfri.push({fri: rowFrequencies.fri, mi: rowFrequencies.mi});
        } else if (categoriasMaxfri[0].fri === rowFrequencies.fri) {
            categoriasMaxfri.push({fri: rowFrequencies.fri, mi: rowFrequencies.mi});
        }
    });
    if (categoriasMaxfri.length === 1) {
        return categoriasMaxfri[0].mi;
    }
    // @ts-ignore
    return categoriasMaxfri.map((catModal) => catModal.mi).join(", ");
}

const getModeForClass = (basicFrequencies: Array<BasicFrequenciesClasses>) => {
    let categoriasMaxfri: any = [];
    basicFrequencies.forEach((rowFrequencies) => {
        if (categoriasMaxfri.length === 0 || categoriasMaxfri[0].fri < rowFrequencies.fri) {
            categoriasMaxfri = [];
            categoriasMaxfri.push({fri: rowFrequencies.fri, xi: rowFrequencies.xi});
        } else if (categoriasMaxfri[0].fri === rowFrequencies.fri) {
            categoriasMaxfri.push({fri: rowFrequencies.fri, xi: rowFrequencies.xi});
        }
    });
    if (categoriasMaxfri.length === 1) {
        return categoriasMaxfri[0].xi;
    }
    // @ts-ignore
    return categoriasMaxfri.map((catModal) => catModal.xi).join(", ");
}

function getFromVariance(variance: number, mean: number, median: number) {
    const stdDeviation = Math.sqrt(variance)
    const cv = stdDeviation * 100 / mean
    const asp = 3 * (mean - median) / stdDeviation
    return {stdDeviation, cv, asp};
}

const calculateValues = (dataset: Array<number>, forceUseIntervals: boolean | null = null): { useIntervals: boolean; dataSummary: DataSummary, frequencyTable: FrequencyTable } => {
    const numItems = dataset.length;
    let {vMin, vMax} = getExtremes(dataset);
    const range = vMax - vMin;

    const frequencyTable: FrequencyTable = []
    let numCategories: number
    let amplitude: number
    let median: number
    let mean: number
    let variance: number
    let stdDeviation: number
    let cv: number
    let asp: number
    let mode: string
    let fromVariance

    const classes = dataset.filter(onlyUnique);

    let useIntervals: boolean
    if (forceUseIntervals != null) {
        useIntervals = forceUseIntervals
    } else {
        useIntervals = classes.length >= 15
    }

    if (useIntervals) {
        const basicFrequencies: Array<BasicFrequenciesInterval> = []
        const extendedFrequencies: Array<ExtendedFrequencies> = []
        numCategories = Math.round(1 + 3.33 * Math.log10(numItems));
        amplitude = Math.ceil(range / numCategories);
        let lastLowerLimit = vMin
        let lastAbsoluteFrequency = 0
        let sum_mifi = 0

        for (let j = 0; j < numCategories; j++) {
            const lowerLimit = lastLowerLimit
            const upperLimit = lowerLimit + amplitude
            const frequencies = getBasicFrequenciesForInterval(lowerLimit, upperLimit, lastAbsoluteFrequency, dataset)//frequencyTable.push([category, ...Object.values(frequencies).map(num => num.toString())])
            basicFrequencies.push(frequencies)
            lastLowerLimit = upperLimit
            lastAbsoluteFrequency = frequencies.Fi
            sum_mifi += frequencies.mifi
        }
        mean = sum_mifi / numItems
        median = getMedianForInterval(basicFrequencies, amplitude, numItems);
        mode = getModeForInterval(basicFrequencies);
        basicFrequencies.forEach(freq => extendedFrequencies.push(getExtendedFrequencies(freq, mean)))
        variance = extendedFrequencies.map((ext) => ext.miMinusMeanSquaredfi).reduce((previousValue, currentValue) => previousValue + currentValue) / (numItems - 1)
        fromVariance = getFromVariance(variance, mean, median);

        const keys: Array<string> = Object.keys(defaultColumnsIntervals)
        basicFrequencies.forEach((basic, index) => {
            const extended = extendedFrequencies[index]
            frequencyTable.push({
                [keys[0]]: "[" + basic.lowerLimit + ", " + basic.upperLimit + ")",
                [keys[1]]: formatNumber(basic.fi),
                [keys[2]]: formatNumber(basic.fri),
                [keys[3]]: formatNumber(basic.Fi),
                [keys[4]]: formatNumber(basic.Fri),
                [keys[5]]: formatNumber(basic.mi),
                [keys[6]]: formatNumber(basic.mifi),
                [keys[7]]: formatNumber(extended.miMinusMean),
                [keys[8]]: formatNumber(extended.miMinusMeanSquared),
                [keys[9]]: formatNumber(extended.miMinusMeanSquaredfi)
            })
        })
    } else {
        const basicFrequencies: Array<BasicFrequenciesClasses> = []
        const extendedFrequencies: Array<ExtendedFrequenciesClass> = []
        let lastAbsoluteFrequency = 0
        let sum_xifi = 0

        classes.sort((a, b) => a - b).forEach((xi) => {
            const frequencies = getBasicFrequenciesForClasses(xi, lastAbsoluteFrequency, dataset)//frequencyTable.push([category, ...Object.values(frequencies).map(num => num.toString())])
            basicFrequencies.push(frequencies)
            lastAbsoluteFrequency = frequencies.Fi
            sum_xifi += frequencies.xifi
        })
        numCategories = classes.length
        amplitude = 0
        mean = sum_xifi / numItems
        median = getMedianForClass(dataset);
        mode = getModeForClass(basicFrequencies);
        basicFrequencies.forEach(freq => extendedFrequencies.push(getExtendedFrequenciesForClass(freq, mean)))
        variance = extendedFrequencies.map((ext) => ext.xiMinusMeanSquaredfi).reduce((previousValue, currentValue) => previousValue + currentValue) / (numItems - 1)
        fromVariance = getFromVariance(variance, mean, median);

        const keys: Array<string> = Object.keys(defaultColumnsClasses)
        basicFrequencies.forEach((basic, index) => {
            const extended = extendedFrequencies[index]
            frequencyTable.push({
                [keys[0]]: formatNumber(basic.xi),
                [keys[1]]: formatNumber(basic.fi),
                [keys[2]]: formatNumber(basic.fri),
                [keys[3]]: formatNumber(basic.Fi),
                [keys[4]]: formatNumber(basic.Fri),
                [keys[5]]: formatNumber(basic.xifi),
                [keys[6]]: formatNumber(extended.xiMinusMean),
                [keys[7]]: formatNumber(extended.xiMinusMeanSquared),
                [keys[8]]: formatNumber(extended.xiMinusMeanSquaredfi)
            })
        })
    }

    asp = fromVariance.asp
    stdDeviation = fromVariance.stdDeviation
    cv = fromVariance.cv

    return {
        useIntervals,
        dataSummary: {
            n: numItems,
            numCategories,
            range,
            mode,
            median,
            mean,
            asp,
            cv,
            stdDeviation,
            variance,
            amplitude
        },
        frequencyTable
    }
}