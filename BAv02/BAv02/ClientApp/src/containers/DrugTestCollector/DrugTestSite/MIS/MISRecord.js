import React from "react";
import { Link } from "react-router-dom";
// import TableCom from './../../../components/Table';
import Table from "../../../../components/Table";
import { Button, Col, Alert, Row } from "reactstrap";
import MISTable from "./MISTable";
import { parseInt } from "core-js/core/number";
import DataTable from "react-data-table-component";
import PDFmis from "../../../Drivers/Pdf/PDFmis";

var data = [];
const columns = [
  {
    name: "DATE",
    selector: (row) => row.date,
    sortable: true,
    center: true,
  },
  {
    name: "FILE NAME",
    selector: (row) => row.fileName,
    center: true,
  },
  {
    name: "PREVIEW",
    selector: (row) => row.preview,
    center: true,
  },
  {
    name: "DOWNLOAD",
    selector: (row) => row.download,
    center: true,
  },
];

class MISRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      firstTimeGenerated: true,
      MISReports: [],
      idCompany: 0,
      index: 0,
      rep: ["DATE", "FILE NAME", "PREVIEW", "DOWNLOAD"],
      ourcompany: "",
      actualDate: new Date().getFullYear() - 1,
      YearPDF: [],
    };

    var Dir = [];
    var dateslice = [];
  }

  render() {
    for (let x = 0; x < this.props.MISReports.length; x++) {
      this.state.YearPDF[x] = this.props.MISReports[x].DescriptionDoc.slice(
        11,
        15
      );
      if (this.state.YearPDF[x] == this.state.actualDate) {
        this.state.firstTimeGenerated = false;
      }
    }

    var rowItemss = this.props.MISReports.map((row, index) => ({
      id: index,
      date: row.DescriptionDoc.slice(11, 15),
      fileName: row.DescriptionDoc,
      preview: (
        <Button
          key={index}
          style={{
            color: "white",
            backgroundColor: "#008ecc",
          }}
          onClick={() =>
            window.open(
              "https://bluagent-files.s3-us-west-2.amazonaws.com/" +
                this.props.idCompany +
                "/" +
                row.DocType +
                "/" +
                row.DocName
            )
          }
        >
          Preview
        </Button>
      ),
      download: (
        <Button
          color="success"
          onClick={() =>
            this.props.download(
              this.props.idUser,
              row.DocType,
              row.DocName,
              row.DescriptionDoc
            )
          }
        >
          Download
        </Button>
      ),
    }));

    return (
      <div>
        <Col md="12">
          <Alert
            style={{
              backgroundColor: "#dff0fe",
              borderLeft: "4px solid #dff0fe",
              borderColor: "#4788c7",
              color: "#4788c7",
              padding: "15px 20px",
            }}
          >
            Notice: <i className="fas fa-exclamation-circle"></i>{" "}
            <strong>MIS Report </strong>
            is generated once a year and is only available for the year prior to
            the current year.{" "}
          </Alert>
          {this.state.firstTimeGenerated ? (
            <Alert
              style={{
                backgroundColor: "#fceeb4",
                borderLeft: "4px solid #fceeb4",
                borderColor: "#fceeb4",
                color: "#816400",
                padding: "15px 20px",
              }}
            >
              The MIS Report of the year {this.state.actualDate}{" "}
              <strong>HAS NOT BEEN GENERATED YET.</strong>{" "}
            </Alert>
          ) : (
            ""
          )}
          <DataTable columns={columns} data={rowItemss} pagination></DataTable>
          <PDFmis
            isLoading={this.props.isLoading}
            props={this.props}
            uploadDoc={this.props.uploadDoc}
            idUser={this.props.idUser}
            ourcompany={this.state.ourcompany}
            FirstTime={this.state.firstTimeGenerated}
            CloseMIS={this.props.closemodalMIS}
          ></PDFmis>
        </Col>
      </div>
    );
  }
}

export default MISRecord;
