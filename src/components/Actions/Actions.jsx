import React from "react";
import "./Actions.scss";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.uploadCSV = this.uploadCSV.bind(this);
    this.onChangeCSV = this.onChangeCSV.bind(this);
    this.download = this.download.bind(this);
    this.savePDF = this.savePDF.bind(this);
    this.removeChildElement = this.removeChildElement.bind(this);
    //if you want to add file extensions, change acceptedFiles
    let acceptedFiles = [".csv"];
    let acceptedFilesString = acceptedFiles.join(",");
    let acceptedFilesRegex = acceptedFiles.join("|");
    const regexFiles = new RegExp(acceptedFilesRegex);
    this.state = {
      regexFiles: regexFiles,
      acceptedFilesString: acceptedFilesString,
      loadingState: "none",
    };
  }
  //IMPORT CSV
  onChangeCSV(event) {
    this.setState({ loadingState: "show" });
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
        let parsedData = dataString.split(",");
        this.setState({ loadingState: "none" });
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
    let filename = "Dataset.csv";
    //GET DATASET HERE TO EXPORT
    let datasetArray = [1, 2, 3, 4]; //PLACEHOLDER FOR REDUX LATER
    //GET DATASET HERE TO EXPORT
    if (datasetArray.length > 0) {
      let content = datasetArray.join(",");
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(content)
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
    while (element.parentElement) element = element.parentElement;
    html2canvas(element).then((canvas) => {
      //PENDIENTE ELIMINAR POR SI NO TIENE UTILIDAD
      let body = element.cloneNode(true);
      this.removeChildElement(body, "App", "data-entry");
      this.removeChildElement(body, "App", "columns-selector");
      html2pdf(body);
    });
  }

  removeChildElement(body, parentElementClass, childElementClass) {
    body
      .getElementsByClassName(parentElementClass)[0]
      .removeChild(body.getElementsByClassName(childElementClass)[0]);
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
        <p
          className={this.state.loadingState}
          style={{ margin: "0.5rem 2rem" }}
        >
          Loading...
        </p>
      </div>
    );
  }
}

export default Actions;
