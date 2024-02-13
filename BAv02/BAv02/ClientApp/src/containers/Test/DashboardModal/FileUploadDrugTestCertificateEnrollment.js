import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/DrugAndAlcoholTesting";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import DataTable from "react-data-table-component";
import Pagination from "../../../components/Pagination";
import FilesCard from "../../../components/FilesCard";
import {
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Alert,
  Button,
} from "reactstrap";
import DropdownMenu from "../../../components/DropdownMenu";
import AlertDelete from "../../../components/AlertDelete";
import EnrrollmentCertificate from "../../../containers/Company/Pdf/EnrrollmentCertificatePDF";

registerPlugin(FilePondPluginFileValidateType);
const id = JSON.parse(localStorage.getItem("user")).Id;
const IdCompany = localStorage["idCompany"];

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
  },
  {
    name: "PREVIEW",
    selector: (row) => row.preview,
    center: true,
  },
  {
    name: "OPTIONS",
    selector: (row) => row.options,
    center: true,
  },
];

class DrugTestCertificateEnrollment extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      open: false,
      allFiles: [],
      currentFiles: [],
      currentPage: null,
      totalPages: null,
      countFiles: 0,
      openDeleteModal: false,
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
        toggle={this.props.toggleDeleteFilesDrugTestModal}
        delete={this.props.deleteDoc}
        key={file.Id}
        file={file}
        class="FileCardsDropdown"
      />
    );
  };

  componentDidMount() {
    this.props.getAllDocuments(id, 1, 100);
  }

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

  componentWillReceiveProps() {
    Files.data = this.props.docs.filter(this.props.filter);
    const { data: allFiles = [] } = Files;
    this.setState({ allFiles });
  }

  //   onPageChanged = (data) => {
  //     const { allFiles } = this.state;
  //     const { currentPage, totalPages, pageLimit } = data;

  //     const offset = (currentPage - 1) * pageLimit;
  //     const currentFiles = allFiles.slice(offset, offset + pageLimit);

  //     this.setState({ currentPage, currentFiles, totalPages });
  //   };

  uploadFile() {
    var form = new FormData();
    let files = this.pond.getFiles();
    let timeout = 5000;
    if (files.length !== 0) {
      document.getElementById("loading").style = "display:block";
      document.getElementById("warningAlert").style = "display:none";
      files.forEach((file) => {
        form.append("files", file.file);
      });
      form.append("id", id);
      form.append("docType", this.props.docType);
      form.append("idAccident", 0);
      this.props.uploadFile(form);
      setTimeout(() => {
        this.toggle();
      }, timeout);
    } else {
      document.getElementById("warningAlert").style = "display:block";
    }
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    var gen = true;
    const { allFiles, currentFiles, countFiles } = this.state;
    var rowsdate = this.state.allFiles.map((row, index) => ({
      fecha: row.DescriptionDoc.slice(26, 30),
    }));

    for (let x = 0; x < rowsdate.length; x++) {
      // console.log("Rows date: ", rowsdate[0].fecha);
      if (rowsdate[x].fecha == actualyear.toString()) {
        gen = false;
        // console.log("Gen: ", gen);
      }
    }
    // console.log("Informacion dentro del render: ", {
    //   rowsdate: rowsdate,
    //   generacion: gen,
    //   props: this.props,
    //   company: this.props.CompanyData[0],
    //   iduser: id,
    //   local: parseInt(IdCompany),
    //   documents: this.state.allFiles,
    //   //   CompanyID: this.props.CompanyData[0].Id,
    // });

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
              this.props.CompanyData[0].Id +
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
                this.props.idUser,
                row.DocType,
                row.DocName,
                row.DescriptionDoc
              )
              : this.props.downloadDoc(
                id,
                row.DocType,
                row.DocName,
                row.DescriptionDoc
              );
          }}
          menuOptions={[
            [
              "Delete",
              () => {
                this.props.toggleD2(row.Id, row.DocType, row.DocName);
              },
              //   () => {
              //     this.props.toggleDeleteFilesCompanyModal(
              //       row.Id,
              //       this.props.idUser,
              //       row.DocType,
              //       row.DocName
              //     );
              //   },
            ],
            ["Download", "This is a function"],
          ]}
        />
      ),
    }));
    // console.log(this.props.CompanyData[0]);
    return (
      <React.Fragment>
        <Col md="3">
          <input
            type="image"
            onClick={this.toggle}
            className="img-responsive"
            src={this.props.imgSrc}
            onMouseOver={(e) =>
              (e.currentTarget.src = this.props.imgsrcMouseOver)
            }
            onMouseOut={(e) => (e.currentTarget.src = this.props.imgSrc)}
            alt="Submit"
            height="150"
            width="150"
          />
          <h6>
            {this.props.iconText ? this.props.iconText : this.props.modalHeader}
          </h6>
          <Modal
            isOpen={this.state.open}
            className={"modal-lg"}
            backdrop={"static"}
            toggle={this.toggle}
          >
            <ModalHeader name="filePondModal" toggle={this.toggle}>
              {this.props.modalHeader}
            </ModalHeader>
            <ModalBody>
              <div className="container mb-5">
                {/* <Row>
                  <Col md="12">
                    <div className="row d-flex flex-row py-2">
                      {currentFiles.map(this.fileCard)}
                    </div>
                  </Col>
                </Row> */}
                <Row>
                  <Col md="12">
                    <DataTable pagination columns={columns} data={rows} />
                    <FilePond
                      ref={(ref) => (this.pond = ref)}
                      allowFileTypeValidation={false}
                      onupdatefiles={(countFiles) => {
                        this.setState({
                          countFiles: countFiles.length,
                        });
                      }}
                      allowRevert={false}
                      instantUpload={false}
                      allowMultiple={true}
                      maxFiles={100}
                      maxParallelUploads={100}
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
                  <Col
                    md={{ size: 6, offset: 6 }}
                    style={{ textAlign: "right" }}
                  >
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
                <EnrrollmentCertificate
                  doc={this.state.allFiles}
                  company={this.props.CompanyData[0]}
                  gen={gen}
                  uploadFile={this.props.uploadFile}
                  Idu={id}
                />
              </div>
            </ModalBody>
          </Modal>
        </Col>
        <AlertDelete
          message="Are you sure to delete this file?"
          modalType="Delete"
          modal={this.props.modalDeleteDAEC}
          toggle={() => {
            this.props.toggleD2(this.props.idDelete2);
          }}
          delete={() => {
            this.props.deleteDoc(
              this.props.idDelete2,
              id,
              this.props.docTypeDelete2,
              this.props.docNameDelete2
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(DrugTestCertificateEnrollment);
