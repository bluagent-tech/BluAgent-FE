import React from "react";
import { Link } from "react-router-dom";
// import TableCom from './../../../components/Table';
// import Table from "../../../../components/Table";
import {
  Button,
  Col,
  Alert,
  Row,
  Table,
  Form,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";
// import MISTable from "./MISTable";
import { parseInt } from "core-js/core/number";
import { all } from "core-js/fn/promise";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../src/store/AccountSettings";
import OnlyUpload from "./OnlyUpload";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Pagination from "./Pagination";
import DropdownMenu from "./DropdownMenu";
import moment from "moment";

const idCompany = JSON.parse(localStorage.getItem("idCompany"));
const id = JSON.parse(localStorage.getItem("user")).Id;

let Files = {
  data: [],
};

class MCS150Record extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      idD: 0,
      doctypeD: "",
      docnameD: "",
      desdocD: "",
      MCS150Report: [],
      idCompany: 0,
      index: 0,
      rep: ["DATE", "FILE NAME", "PREVIEW", "OPTIONS"],
      ReportDate: [],
      modal: false,
      dis: false,
      open: true,
      activeTab: new Array(1).fill("1"),

      allFiles: [],

      currentFiles: [],
      currentPage: null,
      totalPages: null,
      countFiles: 0,
    };
  }

  componentWillReceiveProps() {
    Files.data = this.props.docs.filter(this.props.filter);
    const { data: allFiles = [] } = Files;
    this.setState({ allFiles });
  }

  // toggle = () => setModal(!this.state.modal);
  onChangeModal = () => this.setState({ modal: !this.state.modal });

  componentDidUpdate(prevProps, prevState) {
    if (this.props.message === "File deleted successfully") {
      this.setState({ open: false });
      this.props.resetMessage();
    }

    if (prevProps.docs !== this.props.docs) {
      Files.data = this.props.docs.filter(this.props.filter);
      const { data: allFiles = [] } = Files;
      this.setState({ allFiles });
    }
  }

  onPageChanged = (data) => {
    const { allFiles } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentFiles = allFiles.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentFiles, totalPages });
  };

  uploadFile() {
    var Dato = new FormData();
    let files = this.pond.getFiles();
    if (files.length !== 0) {
      document.getElementById("loading").style = "display:block";
      document.getElementById("warningAlert").style = "display:none";
      files.forEach((file) => {
        Dato.append("files", file.file);
      });
      Dato.append("id", id);
      Dato.append("docType", this.props.docType);
      this.props.uploadFile(Dato);
      setTimeout(() => {
        this.props.toggleUsDotAddDocument();
      }, 5000);
    } else {
      document.getElementById("warningAlert").style = "display:block";
    }
  }

  toggle = (id, doctype, docname, desdoc) => {
    this.setState({
      idD: id,
      doctypeD: doctype,
      docnameD: docname,
      desdocD: desdoc,
    });
    this.setState({ open: !this.state.open });
    if (!this.state.open) {
    }
  };

  render() {
    //console.log("feccha del documento", row.DescriptionDoc.slice(0, 7));
    const { allFiles, currentFiles, countFiles } = this.state;
    const rowItems = currentFiles.map((row, index) => (
      //console.log("feccha del documento", row.DescriptionDoc.slice(9, 18)),
      <React.Fragment>
        <tr key={index}>
          <td key className="text-center">
            {moment(row.DescriptionDoc.slice(9, 18)).format('MM-DD-YYYY')}
          </td>
          <td className="text-center">{row.DescriptionDoc.slice(0, 7)}</td>
          <td className="text-center">
            <Button
              style={{
                color: "white",
                backgroundColor: "#008ecc",
              }}
              onClick={() =>
                window.open(
                  "https://bluagent-files.s3-us-west-2.amazonaws.com/" +
                  idCompany +
                  "/" +
                  row.DocType +
                  "/" +
                  row.DocName
                )
              }
            >
              Preview
            </Button>
          </td>
          <td className="text-center">
            <DropdownMenu
              right
              class={
                this.props.class === null
                  ? ""
                  : this.props.class + "fix-dropdowns"
              }
              direction="right"
              toggleDeleteModal={() => {
                this.props.idVehicle
                  ? this.props.download(
                    this.props.idVehicle,
                    this.props.idUser,
                    row.DocType,
                    row.DocName,
                    row.DescriptionDoc
                  )
                  : this.props.download(
                    this.props.idUser,
                    row.DocType,
                    row.DocName,
                    row.DescriptionDoc
                  );
              }}
              menuOptions={[
                [
                  "Delete",
                  () => {
                    this.props.toggleDeleteFilesCompanyModal(
                      row.Id,
                      this.props.idUser,
                      row.DocType,
                      row.DocName
                    );
                  },
                ],
                ["Download", "This is a function"],
              ]}
            />
          </td>
        </tr>
      </React.Fragment>
    ));
    let header = this.state.rep.map((h, index) => (
      <th scope="col" key={index} className="text-center">
        {h}
      </th>
    ));

    return (
      <div>
        {currentFiles.length == 0 ? (
          ""
        ) : (
          <Table responsive>
            <thead>
              <tr>{header}</tr>
            </thead>
            <tbody>{rowItems}</tbody>
          </Table>
        )}
        <div className="container mb-5">
          <Row>
            <Col md="12">
              {/* <div className="row d-flex flex-row py-2">
              {currentFiles.map(this.fileCard)}
            </div> */}
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Pagination
                totalRecords={allFiles.length}
                pageLimit={5}
                onPageChanged={this.onPageChanged}
              />
              <FilePond
                ref={(ref) => (this.pond = ref)}
                allowFileTypeValidation={false}
                allowRevert={false}
                instantUpload={false}
                allowMultiple={true}
                maxFiles={100}
                maxParallelUploads={100}
                // allowFileTypeValidation={false}
                onupdatefiles={(countFiles) => {
                  this.setState({
                    countFiles: countFiles.length,
                  });
                }}
              />
            </Col>
          </Row>
          {/* <Row>
            <Col md="12">
              <Pagination
                totalRecords={allFiles.length}
                pageLimit={5}
                onPageChanged={this.onPageChanged}
              />
            </Col>
          </Row> */}
          <Row>
            <Col md={{ size: 6, offset: 6 }} style={{ textAlign: "right" }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.uploadFile}
                disabled={countFiles === 0 ? true : false}
              >
                Upload Files
              </button>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col md="12" style={{ textAlign: "center" }}>
              <Alert
                id="warningAlert"
                color="warning"
                style={{ display: "none" }}
              >
                No file has been added for upload
              </Alert>

              <img
                id="loading"
                className="imgLoading"
                style={{
                  display: "none",
                }}
                src="../../assets/img/icons/loading2.gif"
                alt="loading"
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default MCS150Record;