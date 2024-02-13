import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/AccountSettings";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Pagination from "../../../components/Pagination";
import FilesCard from "../../../components/FilesCard";
import { Col, Modal, ModalHeader, ModalBody, Row, Alert } from "reactstrap";
import ToastAlert from "./../../../components/ToastAlert";
import AlertDelete from "../../../components/AlertDelete";

registerPlugin(FilePondPluginFileValidateType);
const id = JSON.parse(localStorage.getItem("user")).Id;
const DriverId = JSON.parse(localStorage.getItem("driverId"));

let Files = {
  data: [],
};

class UploadDriversFiles extends React.Component {
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
      alert: false,
    };
  }

  fileCard = (file) => {
    return (
      <FilesCard
        docType={this.props.docType}
        download={this.props.downloadDoc}
        toggle={this.toggleDeleteModal}
        delete={this.deleteDoc}
        key={file.Id}
        file={file}
        class="FileCardsDropdown"
      />
    );
  };

  componentDidMount() {
    this.props.getAllDocumentsDrivers(id, 1, 100);
  }

  // AlertInuse = () => {
  //   if (this.props.docType === "CommunicationsPlan") {
  //     this.setState({ alert: this.props.toastAlertStatehazmat });
  //   } else if (this.props.docType === "SecurityPlan") {
  //     this.setState({ alert: this.props.toastAlertStatehazmats });
  //   }
  // };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.message === "File deleted successfully" ||
      this.props.message === "File succesfully uploaded"
    ) {
      // this.setState({ open: false });
      this.props.resetMessage();
    }

    if (prevProps.docsDrivers !== this.props.docsDrivers) {
      Files.data = this.props.docsDrivers.filter(this.props.filter);
      const { data: allFiles = [] } = Files;
      this.setState({ allFiles });
    }
  }

  // componentWillReceiveProps() {
  //   Files.data = this.nextProps.docsDrivers.filter(this.props.filter);
  //   const { data: allFiles = [] } = Files;
  //   this.setState({ allFiles });
  // }

  onPageChanged = (data) => {
    const { allFiles } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentFiles = allFiles.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentFiles, totalPages });
  };

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
      form.append("idDriver", this.props.driver.Id);
      if (this.props.docType === "CommunicationsPlan") {
        this.props.uploadFileDriversHazmat(form);
      } else if (this.props.docType === "SecurityPlan") {
        this.props.uploadFileDriversHazmats(form);
      }

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

  toggleDeleteModal = (id, docType, docName) => {
    if (id && docType && docName) {
      this.setState({
        openDeleteModal: !this.state.openDeleteModal,
        idDelete: id,
        docTypeToDelete: docType,
        fileNameToDelete: docName,
      });
    } else {
      this.setState({
        openDeleteModal: !this.state.openDeleteModal,
        idDelete: 0,
        docTypeToDelete: "",
        fileNameToDelete: "",
      });
    }
  };

  deleteDoc = () => {
    if (this.props.docType === "CommunicationsPlan") {
      this.props.deleteDocDriversHazmat(
        this.state.idDelete,
        DriverId,
        this.state.docTypeToDelete,
        this.state.fileNameToDelete
      );
    } else if (this.props.docType === "SecurityPlan") {
      this.props.deleteDocDriversHazmats(
        this.state.idDelete,
        DriverId,
        this.state.docTypeToDelete,
        this.state.fileNameToDelete
      );
    }

    this.setState({
      open: !this.state.open,
      openDeleteModal: !this.state.openDeleteModal,
      idDelete: 0,
      docTypeToDelete: "",
      fileNameToDelete: "",
    });
  };

  render() {
    const { allFiles, currentFiles, countFiles } = this.state;
    const totalFiles = allFiles.length;
    let filterDocs = this.props.docsDrivers.filter(this.props.filter);

    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={
            this.props.docType === "CommunicationsPlan"
              ? this.props.toastAlertStatehazmat
              : this.props.toastAlertStatehazmats
          }
          message={this.props.message}
          error={this.props.error}
        />
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
          className={"modal-lg "}
          backdrop={"static"}
          toggle={this.toggle}
        >
          <ModalHeader name="filePondModal" toggle={this.toggle}>
            {this.props.modalHeader}
          </ModalHeader>
          <ModalBody>
            <div className="container mb-5">
              <Row>
                <Col md="12">
                  <div className="row d-flex flex-row py-2">
                    {currentFiles.map(this.fileCard)}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
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
              <Row>
                <Col md="12">
                  <Pagination
                    totalRecords={allFiles.length}
                    pageLimit={5}
                    onPageChanged={this.onPageChanged}
                  />
                </Col>
              </Row>
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
                    style={{ display: "none" }}
                    src="../../assets/img/icons/loading2.gif"
                    alt="loading"
                  />
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
        <AlertDelete
          message="Are you sure you want to delete this file?"
          modal={this.state.openDeleteModal}
          toggle={() => {
            this.toggleDeleteModal();
          }}
          delete={() => {
            this.deleteDoc();
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(UploadDriversFiles);
