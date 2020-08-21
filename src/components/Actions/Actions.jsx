import React from "react";
import "./Actions.scss";
import {connect} from "react-redux";
import {processDataSet} from "../DataEntry/dataEntry";
import {Button} from "../UI/Button/button";

// //DOWNLOAD PDF
// const savePDF = async (event) => {
//     let element = document.getElementsByClassName("app-header")[0];
//     let options = {scale: 2};
//     let canvas = await html2canvas(element, options);
//     //let imgData = canvas.toDataURL('image/jpeg', 1.0); //JPEG
//     let imgData = canvas.toDataURL("image/png");
//     console.log("wit=", element.offsetWidth, canvas);
//     const pdf = new jsPDF({
//         unit: "px",
//         format: [element.offsetWidth / 2, 800],
//         orientation: "portrait",
//     });
//     pdf.addImage(
//         imgData,
//         "PNG",
//         0,
//         0,
//         element.offsetWidth / 2,
//         element.offsetHeight / 2
//     );
//
//     let element2 = document.getElementsByClassName("frequency-table")[0];
//     let canvas2 = await html2canvas(element2, options);
//     let imgData2 = canvas2.toDataURL("image/png", 1.0);
//     pdf.addImage(
//         imgData2,
//         "PNG",
//         0,
//         element.offsetHeight / 2,
//         element2.offsetWidth / 2,
//         element2.offsetHeight / 2
//     );
//
//     let element3 = document.getElementsByClassName("data-summary")[0];
//     let canvas3 = await html2canvas(element3, options);
//     let imgData3 = canvas3.toDataURL("image/png", 1.0);
//     pdf.addImage(
//         imgData3,
//         "PNG",
//         0,
//         element.offsetHeight / 2 + element2.offsetHeight / 2,
//         element3.offsetWidth / 2,
//         element3.offsetHeight / 2
//     );
//
//     let element4 = document.getElementsByClassName("dataset")[0];
//     let canvas4 = await html2canvas(element4, options);
//     let imgData4 = canvas4.toDataURL("image/png", 1.0);
//     pdf.addImage(
//         imgData4,
//         "PNG",
//         0,
//         element.offsetHeight / 2 +
//         element2.offsetHeight / 2 +
//         element3.offsetHeight / 2,
//         element4.offsetWidth / 2,
//         element4.offsetHeight / 2
//     );
//
//     let element5 = document.getElementById("list-graphs");
//     let canvas5 = await html2canvas(element5, options);
//     let imgData5 = canvas5.toDataURL("image/png", 1.0);
//     pdf.addImage(
//         imgData5,
//         "PNG",
//         0,
//         element.offsetHeight / 2 +
//         element2.offsetHeight / 2 +
//         element3.offsetHeight / 2 +
//         element4.offsetHeight / 2,
//         element5.offsetWidth / 2,
//         element5.offsetHeight / 2
//     );
//
//     pdf.save(`siuuuu.pdf`);
//     // html2canvas(element).then((canvas) => {
//     //     const imgData = canvas.toDataURL('image/png');
//     //
//     //     let pdf
//     //     pdf = new jsPDF(
//     //         {unit: "in", format: "letter", orientation: "landscape"}
//     //     );
//     //     // Document of a4WidthMm wide and inputHeightMm high
//     //     // if (inputHeightMm > a4HeightMm) {
//     //     //     // elongated a4 (system print dialog will handle page breaks)
//     //     //     pdf = new jsPDF('p', 'mm', [inputHeightMm + 16, a4WidthMm]);
//     //     //     console.log('no std');
//     //     // } else {
//     //     //     // standard a4
//     //     //     pdf = new jsPDF();
//     //     // }
//     //
//     //     pdf.addImage(imgData, 'PNG', 0, 0);
//     //     pdf.save(`siuuuu.pdf`);
//     //
//     //     /*
//     //     //PENDIENTE ELIMINAR POR SI NO TIENE UTILIDAD
//     //     let body = element.cloneNode(true);
//     //     let opt = {
//     //         margin: 0,
//     //         filename: "myfile.pdf",
//     //         html2canvas: {scale: 2},
//     //         jsPDF: {unit: "in", format: "letter", orientation: "landscape"},
//     //     };
//     //     hasError += this.removeChildElement(body, "App", "data-entry");
//     //     hasError += this.removeChildElement(body, "App", "columns-selector");
//     //     hasError > 0
//     //         ? alert("ingrese el set de datos por favor")
//     //         : html2pdf(element, opt);
//     //      */
//     // });
// };

const ACCEPTED_FILES = [".csv"];
const FILE_NAME = "Dataset.csv"

class Actions extends React.Component {
    constructor(props) {
        super(props);
        this.uploadCSV = this.uploadCSV.bind(this);
        this.onChangeCSV = this.onChangeCSV.bind(this);
        this.download = this.download.bind(this);
        this.removeChildElement = this.removeChildElement.bind(this);
        let acceptedFilesString = ACCEPTED_FILES.join(",");
        let acceptedFilesRegex = ACCEPTED_FILES.join("|");
        const regexFiles = new RegExp(acceptedFilesRegex);
        this.state = {
            regexFiles: regexFiles,
            acceptedFilesString: acceptedFilesString,
        };
    }

    //IMPORT CSV
    onChangeCSV(event) {
        if (event.target) {
            let fileName = event.target.files[0].name;
            if (
                this.state.regexFiles.test(
                    fileName.substring(fileName.length - 4, fileName.length)
                )
            ) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onload = function (event) {
                    // dataString tiene la informacion del csv raw, en un String
                    let dataString = event.target.result;
                    //parsedData tiene la informacion del csv parsed a un JSON
                    let parsedData = dataString.split(/[\n,]/);
                    //csvData tiene toda la informacion del csv organizado en un objeto
                    let csvData = {
                        dataset: parsedData.slice(1, parsedData.indexOf("media")),// TODO use something else to avoid errors when schema changes like instead of fi its useIntervalos
                        // usandoIntervalos:
                        //     parsedData[parsedData.indexOf("usandoIntervalos") + 1]
                    };
                    console.log(csvData);
                    this.props.processDataSet(
                        csvData.dataset.map((str) => parseFloat(str))
                    );
                }.bind(this);
                reader.readAsText(file);
            } else {
                event.target.value = "";
                alert(
                    "Este no es un archivo soportado, por favor use los validos: " +
                    this.state.acceptedFilesString
                );
            }
        }
    }

    uploadCSV(event) {
        if (event) {
            const fileInput = event.target.parentElement.firstChild;
            if (fileInput.type === "file") {
                fileInput.click && fileInput.click();
            } else console.log("there is a problem with the upload button");
        }
    }

    //EXPORT CSV
    download() {
        //GET DATASET HERE TO EXPORT/ DUMMY DATA
        const csvData = {
            dataset: this.props.dataSet,
            // usandoIntervalos: 1,
            media: this.props.dataSummary.mean,
            moda: this.props.dataSummary.mode,
            mediana: this.props.dataSummary.median,
            varianza: this.props.dataSummary.variance,
            desviacion: this.props.dataSummary.stdDeviation,
            asp: this.props.dataSummary.asp,
            cv: this.props.dataSummary.cv,
            n: this.props.dataSummary.n,
            nroCategorias: this.props.dataSummary.numCategories,
            amplitud: this.props.dataSummary.amplitude,
        };
        if (csvData.dataset.length > 0) {
            // Content of the csv to export
            const dataString = Object.keys(csvData)
                .map((key) => {
                    return (
                        key +
                        "," +
                        (typeof csvData[key] == "object"
                            ? csvData[key].join(",")
                            : csvData[key])
                    );
                })
                .reduce(
                    (previousValue, currentValue) => previousValue + "\n" + currentValue
                );
            console.log("dataString=", dataString);

            let element = document.createElement("a");
            element.setAttribute(
                "href",
                "data:text/plain;charset=utf-8," + encodeURIComponent(dataString)
            );
            element.setAttribute("download", FILE_NAME);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        } else {
            alert("No existen datos en el set de Datos");
        }
    }

    removeChildElement(body, parentElementClass, childElementClass) {
        if (
            body.getElementsByClassName(parentElementClass)[0] &&
            body.getElementsByClassName(childElementClass)[0]
        ) {
            body
                .getElementsByClassName(parentElementClass)[0]
                .removeChild(body.getElementsByClassName(childElementClass)[0]);
            return 0;
        }
        return 1;
    }

    render() {
        return (
            <div className="buttons ActionButtons" style={{display: "flex"}}>
                <input
                    type="file"
                    className="btn ActionBtn"
                    name="filename"
                    hidden
                    accept={this.state.acceptedFilesString}
                    onChange={this.onChangeCSV}
                />

                <Button
                    isActive={this.props.dataSet.length !== 0}
                    onClick={this.download}>
                    Exportar CSV
                </Button>
                <Button onClick={this.uploadCSV}>Importar CSV</Button>
                {/*<Button isActive={this.props.dataSet.length !== 0} onClick={savePDF}>*/}
                {/*    Descargar PDF*/}
                {/*</Button>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataSet: state.dataSet,
        dataSummary: state.dataSummary,
    };
};
export default connect(mapStateToProps, {processDataSet})(Actions);
