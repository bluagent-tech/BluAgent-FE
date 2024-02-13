import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Pagination from "../../../components/Pagination";
import FilesCard from "../../../components/FilesCard";
import { Col, Row, Alert, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import DropdownMenu from "../../../components/DropdownMenu";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store/AccountSettings";
import EnrrollmentCertificate from "../Pdf/EnrrollmentCertificatePDF";
registerPlugin(FilePondPluginFileValidateType);

const ActualDate = new Date();
const actualyear = ActualDate.getFullYear();

let Files = {
  data: [],
};

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
    compact: true,
  },
  {
    name: "PREVIEW",
    selector: (row) => row.preview,
    center: true,
    right: true,
  },
  {
    name: "OPTIONS",
    selector: (row) => row.options,
    center: true,
  },
];

class FileUploadCertificateEnrollment extends React.Component {
  isCertificateEnrollment = (file) => {
    return file.DocType.trim() === "Certificate of Enrollment";
  };

  constructor(props) {
    super(props);

    this.state = {
      allFiles: [],
      currentFiles: [],
      currentPage: null,
      totalPages: null,
      countFiles: 0,
      open: false,
      openDeleteModal: false,
      activeTab: new Array(4).fill("1"),
      idDelete: 0,
      docTypeToDelete: "",
      fileNameToDelete: "",
      genFile: true,
    };
  }

  fileCard = (file) => {
    return (
      <FilesCard
        docType={this.props.docType}
        download={this.props.downloadDoc}
        toggle={this.props.toggleDeleteFilesCompanyModal}
        delete={this.props.deleteDoc}
        key={file.Id}
        file={file}
        class="FileCardsDropdown"
      />
    );
  };

  componentDidMount() {
    this.props.getAllDocuments(JSON.parse(localStorage.user).Id, 1, 100);
    // console.log("All documents: ", this.props.docs);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.message === "File deleted successfully") {
      this.props.toggle();
    }

    if (prevProps.docs !== this.props.docs) {
      Files.data = this.props.docs.filter(this.isCertificateEnrollment);
      const { data: allFiles = [] } = Files;
      this.setState({ allFiles });
    }
  }

  componentWillReceiveProps() {
    Files.data = this.props.docs.filter(this.isCertificateEnrollment);
    const { data: allFiles = [] } = Files;
    this.setState({ allFiles });
  }

  uploadFile = () => {
    var form = new FormData();
    let files = this.pond.getFiles();
    let timeout = 5000;
    if (files.length !== 0) {
      document.getElementById(this.props.id).style = "display:block";
      document.getElementById("warningAlert").style = "display:none";
      files.forEach((file) => {
        form.append("files", file.file);
      });
      form.append("id", JSON.parse(localStorage.user).Id);
      form.append("docType", "Certificate of Enrollment");
      this.props.uploadFile(form);
      setTimeout(() => {
        this.props.toggle();
      }, timeout);
    } else {
      document.getElementById("warningAlert").style = "display:block";
    }
  };

  render() {
    // console.log("id del usuario: ", this.props.IduPdf);
    var gen = true;
    const { allFiles, currentFiles, countFiles } = this.state;
    var rowsdate = this.state.allFiles.map((row, index) => ({
      fecha: row.Date,
    }));

    for (let x = 0; x < rowsdate.length; x++) {
      // console.log("Rows date: ", rowsdate[0].fecha);
      if (rowsdate[x].fecha == actualyear.toString()) {
        gen = false;
        // console.log("Gen: ", gen);
      }
    }

    var rows = this.state.allFiles.map((row, index) => ({
      id: index,
      date: row.Date,
      fileName: row.DescriptionDoc.slice(0, 25),
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
              this.props.company.Id +
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
      options: (
        <DropdownMenu
          right
          class={
            this.props.class === null ? "" : this.props.class + "fix-dropdowns"
          }
          direction="right"
          toggleDeleteModal={() => {
            this.props.idVehicle
              ? this.props.download(
                this.props.idVehicle,
                this.props.IduPdf,
                row.DocType,
                row.DocName,
                row.DescriptionDoc
              )
              : this.props.downloadDoc(
                this.props.IduPdf,
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
      ),
    }));

    return (
      <React.Fragment>
        <div className="container mb-5">
          {/* <Col md="12">
              <div className="row d-flex flex-row py-2">
                {currentFiles.map(this.fileCard)}
              </div>
            </Col> */}
          <EnrrollmentCertificate
            doc={this.props.docPdf}
            company={this.props.companyPdf}
            gen={gen}
            uploadFile={this.props.uploadFilePdf}
            Idu={this.props.IduPdf}
          />

          <Row>
            <Col md="12">
              <DataTable pagination columns={columns} data={rows} />
              {gen ? (
              <><FilePond
                  ref={(ref) => (this.pond = ref)}
                  allowFileTypeValidation={false}
                  onupdatefiles={(countFiles) => {
                    this.setState({
                      countFiles: countFiles.length,
                    });
                  } }
                  allowRevert={false}
                  instantUpload={false}
                  allowMultiple={false}
                  maxFiles={100}
                  maxParallelUploads={100} /><Row>
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
                  </Row></>
              ): null}
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
                id={this.props.id}
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
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(FileUploadCertificateEnrollment);
