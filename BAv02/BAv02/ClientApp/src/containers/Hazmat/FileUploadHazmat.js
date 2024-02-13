import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import ReactPaginate from "react-paginate";
import { Col, Modal, ModalHeader, ModalBody, Row, Alert } from "reactstrap";
import DatePicker from "../../components/DatePicker";
import dateConvertTables from "./../../services/dateConvertTables";
import DropdownMenu from "../../components/DropdownMenu";
import axios from "axios";

registerPlugin(FilePondPluginFileValidateType);
const id = JSON.parse(localStorage.getItem("user")).Id;
const IdCompany = JSON.parse(localStorage.getItem("idCompany"));
const driverId = JSON.parse(localStorage.getItem("driverId"));

class FileUploadHazmat extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.hazmatUploadFile = this.hazmatUploadFile.bind(this);

    this.state = {
      open: false,
      allFiles: [],
      currentFiles: [],
      totalPages: null,
      countFiles: 0,
      DocumentExpireDate: null,
      offset: 0,
      docs: [],
      perPage: 5,
      currentPage: 0,
    };
    this.get2 = this.get2.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  get2(IdCompany) {
    axios
      .get(
        "api/AccountSet/getAllHDocs?IdCompany=" +
          IdCompany +
          "&page=" +
          1 +
          "&size=" +
          100
      )
      .then((response) => JSON.parse(response.data).docs)
      .then((result) => {
        const sliceData = result.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );

        const postData = sliceData.map((doc, i) => (
          <div className="col-sm-12 col-md-12 country-card" key={i}>
            <div className="country-card-container border-gray rounded border mx-2 my-1 d-flex flex-row align-items-center p-0 bg-white col-lg-12">
              <div className="h-100 position-relative px-2 bg-white rounded-left col-2">
                {
                  <img
                    style={{ width: "50px", padding: "5px" }}
                    src="/assets/icons/icons8-agreement.svg"
                    className="d-block h-100"
                    alt="pdf"
                  />
                }
              </div>

              <div className="col-10">
                <Row>
                  <Col md="10">
                    <small>
                      Name: {doc.DocumentNameOriginal} - Document Expire:{" "}
                      {dateConvertTables(doc.DocumentExpireDate)}
                    </small>
                  </Col>
                  <Col
                    md="2"
                    style={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DropdownMenu
                      right
                      direction="left"
                      menuOptions={[
                        [
                          "Download",
                          () => {
                            this.openDocUrl(
                              "https://bluagent-files.s3-us-west-2.amazonaws.com/" +
                                IdCompany +
                                "/" +
                                "HazmatDriverList/TrainingCertificate/" +
                                driverId +
                                "/" +
                                doc.DocumentNameGUID
                            );
                          },
                        ],
                      ]}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        ));
        this.setState({
          pageCount: Math.ceil(result.length / this.state.perPage),
          postData,
        });
      })
      .catch((error) => console.log(error));
  }

  handlePageClick(e) {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.get2();
      }
    );
  }

  componentDidMount() {
    this.get2(IdCompany);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.message === "File deleted successfully") {
      this.setState({ open: false });
      this.props.resetMessage();
    }
    /*if (prevProps.docs !== this.props.docs) {
            Files.data = this.props.docs.filter(this.props.filter);
            const { data: allFiles = [] } = Files;
            this.setState({ allFiles });
        }*/
  }

  componentWillReceiveProps() {
    /*Files.data = this.props.docs.filter(this.props.filter);
        const { data: allFiles = [] } = Files;
        this.setState({ allFiles });*/
  }

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
      form.append("isDateExpire", this.props.isDateExpire);
      form.append("idAccident", 0);
      this.props.uploadFile(form);
      setTimeout(() => {
        this.toggle();
      }, timeout);
    } else {
      document.getElementById("warningAlert").style = "display:block";
    }
  }

  hazmatUploadFile() {
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
      form.append("isDateExpire", this.props.isDateExpire);
      form.append("idAccident", 0);

      form.append("IdCompany", IdCompany);
      form.append("DocumentURL", this.props.DocumentURL);
      form.append("DocumentType", this.props.DocumentType);
      form.append("DriverId", this.props.IdNumber);
      form.append("DocumentNameOriginal", this.props.DocumentNameOriginal);

      if (this.props.isDateExpire === "TRUE") {
        form.append(
          "DocumentExpireDate",
          document.querySelector("#DocumentExpireDate").value
        );
      }

      this.props.hazmatUploadFile(form);
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

  openDocUrl(url) {
    const newWindow = window.open(url, "_blank", "noopener,norferrer");
    if (newWindow) {
      newWindow.open = null;
    }
  }

  render() {
    const { allFiles, countFiles, docs } = this.state;
    const totalFiles = allFiles.length;
    let rep = ["FILE", "EXPIRATION DATE"];
    return (
      <React.Fragment>
        <input
          type="image"
          onClick={this.toggle}
          className="img-responsive"
          src={this.props.src}
          alt="Submit"
          height="160"
          width="160"
        />
        <h6>{this.props.modalHeader}</h6>
        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="filePondModal" toggle={this.toggle}>
            {this.props.modalHeader}
          </ModalHeader>
          <ModalBody>
            <div className="container mb-5">
              <Row>
                <Col md="12">
                  <div className="row d-flex flex-row py-2"></div>
                </Col>
              </Row>
              <Row md="12">
                {this.state.postData}
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </Row>
              <Row>
                <Col md="12" className="mx-auto"></Col>
              </Row>
              <Row>
                <Col md="12">
                  {this.props.isDateExpire === "TRUE" ? (
                    <Col md="4">
                      <DatePicker
                        id="DocumentExpireDate"
                        name="DocumentExpireDate"
                        value={dateConvertTables(this.state.DocumentExpireDate)}
                        labelText="Expiration Date"
                      />
                    </Col>
                  ) : (
                    ""
                  )}

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
                <Col md={{ size: 6, offset: 6 }} style={{ textAlign: "right" }}>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.hazmatUploadFile}
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
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(FileUploadHazmat);
