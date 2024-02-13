import axios from "axios";
import React, { useState, useEffect } from "react";
import XLSX from "xlsx";

const DownloadDotReport = (props) => {
  const [file, setFile] = useState();
  const getDotPlane = () => {
    let url = `https://bluagent-files.s3.us-west-2.amazonaws.com/resources/DOT_PLATE.xlsx`;
    axios
      .get(url, { responseType: "blob" })
      .then((res) => res)
      .then((myBlob) => {
        ExportDotReport(myBlob.data);
      })
      .catch((error) => console.log(error));
  };

  const ExportDotReport = (file) => {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      let data = event.target.result;

      let workbook = XLSX.read(data, { type: "binary", cellDates: true });

      workbook.SheetNames.forEach((sheet, index) => {
        let range = XLSX.utils.decode_range(workbook.Sheets[sheet]["!ref"]);
          let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
            range: range,
          });
      });
    };
  };

  const handleOnExport = () => {

    let categories = props.violations.categories.map((x)=>{
      return {
        TAGS: x.tag,
        STATUS: x.status,
        ALERT: x.color
      }
    })

    let summary = props.summary.map((x)=>{
      return {
        TYPE: x.type.props.children,
        TOTAL: x.total,
        OSS: x.OSS
      }
    })

    var wb = XLSX.utils.book_new();

    var wInspection = XLSX.utils.json_to_sheet(props.inspection);
    var wViolation = XLSX.utils.json_to_sheet(props.violation);
    var wCategories = XLSX.utils.json_to_sheet(categories);
    var wVehicle = XLSX.utils.json_to_sheet(props.vehicles.listVehicles);
    var wTrailer = XLSX.utils.json_to_sheet(props.vehicles.listTrailers);
    var wSummary = XLSX.utils.json_to_sheet(summary);

    XLSX.utils.book_append_sheet(wb, wInspection, "Inspections");
    XLSX.utils.book_append_sheet(wb, wViolation, "Violations");
    XLSX.utils.book_append_sheet(wb, wCategories, "Categories");
    XLSX.utils.book_append_sheet(wb, wVehicle, "Vehicles");
    XLSX.utils.book_append_sheet(wb, wTrailer, "Trailers");
    XLSX.utils.book_append_sheet(wb, wSummary, "Summary");

    XLSX.writeFile(wb, "MyReport.xlsx");
  }

  return (
    <div className="col-sm-5 mt-3">
      <button className="btn btn-success" onClick={handleOnExport}>
        Download Report
      </button>
    </div>
  );
};

export default DownloadDotReport;
