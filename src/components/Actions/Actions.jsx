import React from "react";
import "./Actions.scss";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import variables from "./Variables.js";

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.uploadCSV = this.uploadCSV.bind(this);
    this.onChangeCSV = this.onChangeCSV.bind(this);
    this.download = this.download.bind(this);
    this.savePDF = this.savePDF.bind(this);
    this.removeChildElement = this.removeChildElement.bind(this);
    let acceptedFiles = variables.acceptedFiles;
    let acceptedFilesString = acceptedFiles.join(",");
    let acceptedFilesRegex = acceptedFiles.join("|");
    const regexFiles = new RegExp(acceptedFilesRegex);
    this.state = {
      regexFiles: regexFiles,
      acceptedFilesString: acceptedFilesString,
    };
  }
  //IMPORT CSV
  onChangeCSV(event) {
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
        let parsedData = dataString.split(/\n|,/);
        //csvData tiene toda la informacion del csv organizado en un objeto
        let csvData = {
          dataset: parsedData.slice(1, parsedData.indexOf("usandoIntervalos")),
          usandoIntervalos:
            parsedData[parsedData.indexOf("usandoIntervalos") + 1],
          fi: parsedData.slice(
            parsedData.indexOf("fi") + 1,
            parsedData.indexOf("fri")
          ),
          fri: parsedData.slice(
            parsedData.indexOf("fri") + 1,
            parsedData.indexOf("Fi")
          ),
          Fi: parsedData.slice(
            parsedData.indexOf("Fi") + 1,
            parsedData.indexOf("Fri")
          ),
          Fri: parsedData.slice(
            parsedData.indexOf("Fri") + 1,
            parsedData.indexOf("media")
          ),
          media: parsedData[parsedData.indexOf("media") + 1],
          moda: parsedData[parsedData.indexOf("moda") + 1],
          mediana: parsedData[parsedData.indexOf("mediana") + 1],
          varianza: parsedData[parsedData.indexOf("varianza") + 1],
          desviacion: parsedData[parsedData.indexOf("varianza") + 1],
          asp: parsedData[parsedData.indexOf("asp") + 1],
          cv: parsedData[parsedData.indexOf("cv") + 1],
          n: parsedData[parsedData.indexOf("n") + 1],
          nroCategorias: parsedData[parsedData.indexOf("nroCategorias") + 1],
          amplitud: parsedData[parsedData.indexOf("amplitud") + 1],
        };
        console.log(csvData);
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

  uploadCSV(event) {
    let fileInput = event.target.parentElement.firstChild;
    if (fileInput.type == "file") {
      fileInput.click();
    } else console.log("there is a problem with the upload button");
  }
  //EXPORT CSV
  download(event) {
    let filename = variables.filename;
    //GET DATASET HERE TO EXPORT/ DUMMY DATA
    let csvData = {
      dataset: [1, 2, 3, 4, 5],
      usandoIntervalos: 1,
      fi: [1, 2, 3, 4],
      fri: [1, 2, 34, 5, 6],
      Fi: [1, 2, 3, 4],
      Fri: [1, 2, 3, 4],
      media: 1,
      moda: 1,
      mediana: 1,
      varianza: 1,
      desviacion: 1,
      asp: 1,
      cv: 1,
      n: 36,
      nroCategorias: 6,
      amplitud: 4,
    };
    //GET DATASET HERE TO EXPORT/ DUMMY DATA
    let datasetArray = variables.datasetArray;
    if (csvData.dataset.length > 0) {
      let dataString = ""; //Content of the csv to export
      for (let i = 0; i < datasetArray.length; i++) {
        let tempName = datasetArray[i];
        tempName = tempName.replace(/\n/, "").replace(/,/, "");
        let item =
          typeof csvData[tempName] == "object"
            ? csvData[tempName].join(",")
            : csvData[tempName];
        dataString += datasetArray[i] + item;
      }
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(dataString)
      );
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      alert("No existen datos en el set de Datos");
    }
  }

  //DOWNLOAD PDF
  savePDF(event) {
    let element = event.target;
    let hasError = 0;
    while (element.parentElement) element = element.parentElement;
    html2canvas(element).then((canvas) => {
      //PENDIENTE ELIMINAR POR SI NO TIENE UTILIDAD
      let body = element.cloneNode(true);
      var opt = {
        margin: 0,
        filename: "myfile.pdf",
        html2canvas: { scale: 3 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      hasError += this.removeChildElement(body, "App", "data-entry");
      hasError += this.removeChildElement(body, "App", "columns-selector");
      hasError > 0
        ? alert("ingrese el set de datos por favor")
        : html2pdf(element, opt);
    });
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
      <div className="buttons ActionButtons" style={{ display: "flex" }}>
        <input
          type="file"
          className="btn ActionBtn"
          name="filename"
          hidden
          accept={this.state.acceptedFilesString}
          onChange={this.onChangeCSV}
        ></input>
        <button className="btn ActionBtn" onClick={this.download}>
          Exportar CSV
        </button>
        <button
          className="btn ActionBtn"
          onClick={this.uploadCSV}
          onChange={() => {
            console.log("loaded");
          }}
        >
          Importar CSV
        </button>
        <button className="btn ActionBtn" onClick={this.savePDF}>
          Descargar PDF
        </button>
      </div>
    );
  }
}

export default Actions;
