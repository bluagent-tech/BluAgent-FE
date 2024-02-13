import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Col,
  Form,
  Nav,
  NavLink,
  NavItem,
  TabPane,
  ModalFooter,
  TabContent,
  Alert,
} from "reactstrap";
import MISRecord from "./MISRecord";
import "filepond/dist/filepond.min.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../../store/DrugAndAlcoholTesting";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Pagination from "../../../../components/Pagination";
import FilesCard from "../../../../components/FilesCard";
import { jsPDF } from "jspdf";
import PDFmis from "../.././../Drivers/Pdf/PDFmis";
import "../../../../assets/css/DashboardCompany.css";
// import DataTable from "react-data-table-component";

registerPlugin(FilePondPluginFileValidateType);

const id = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = JSON.parse(localStorage.getItem("idCompany"));

const YearMISReport = new Date().getFullYear() - 1 + "-01-01";
const topYearMISReport = new Date().getFullYear() - 1 + "-12-31";
// YearMISReport =  YearMISReport + "";

var Files = {
  data: [],
};

var MISFiles = {
  dataMIS: [],
};

class MSIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // doc: new jsPDF("portrait", "px", [1275, 1650], true),
      open: false,
      activeTab: new Array(1).fill("1"),
      FirstTimeGenerate: true,
      YearPDF: [],

      allFiles: [],
      allMISFiles: [],

      currentFiles: [],
      currentPage: null,
      totalPages: null,

      currentFilesMIS: [],
      currentPageMIS: null,
      totalPagesMIS: null,

      countFilesMIS: 0,
      countFiles: 0,

      pestana: "",
      notification: false,
    };
    this.toggle = this.toggle.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.tabs = this.tabs.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.openClose = this.openClose.bind(this);
  }

  openClose = (dato) => {
    this.setState({ open: dato });
  };

  showModal = () => {
    this.setState({ open: true });
  };

  hideModal = () => {
    this.setState({ open: false });
  };

  tabs(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({ activeTab: newArray });
  }

  fileCard = (file) => {
    return (
      <FilesCard
        docType={file.DocType}
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
    this.props.MISReport(idCompany, YearMISReport, topYearMISReport);
    this.props.MIS;
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

      MISFiles.dataMIS = this.props.docs.filter(this.props.MISfilter);
      const { dataMIS: allMISFiles = [] } = MISFiles;
      this.setState({ allMISFiles });
    }
  }

  componentWillReceiveProps() {
    Files.data = this.props.docs.filter(this.props.filter);
    const { data: allFiles = [] } = Files;
    this.setState({ allFiles });

    MISFiles.dataMIS = this.props.docs.filter(this.props.MISfilter);
    const { dataMIS: allMISFiles = [] } = MISFiles;
    this.setState({ allMISFiles });
  }

  onPageChanged = (data) => {
    const { allFiles } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentFiles = allFiles.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentFiles, totalPages });
  };

  onPageChangedMIS = (dataMIS) => {
    const { allMISFiles } = this.state;
    const currentPageMIS = dataMIS.currentPage;
    const totalPagesMIS = dataMIS.totalPages;
    const pageLimitMIS = dataMIS.pageLimit;
    const offsetMIS = (currentPageMIS - 1) * pageLimitMIS;
    const currentFilesMIS = allMISFiles.slice(
      offsetMIS,
      offsetMIS + pageLimitMIS
    );
    this.setState({ currentPageMIS, currentFilesMIS, totalPagesMIS });
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
    const {
      allFiles,
      currentFiles,
      countFiles,

      allMISFiles,
      currentFilesMIS,
      countFilesMIS,
    } = this.state;

    // d-flex justify-content-center
    return (
      <React.Fragment>
        <Col md="3">
        <div className="d-flex justify-content-center">
          <div className="box-mis">
            <input
              alt="hos"
              onClick={() => { this.showModal() }}
              type="image"
              className="img-responsive"
              src="assets/icons/icons8-cv.svg"
              onMouseOver={(e) =>
                (e.currentTarget.src = "assets/icons/icons8-cv.svg")
              }
              onMouseOut={(e) =>
                (e.currentTarget.src = "assets/icons/icons8-cv.svg")
              }
              height={160}
              width={160}
            />
            {this.props.isLoadingUsDot ? null :
              this.props.CompanyNotifications.MIS == false ? (
                <div>
                  <span
                    type="button"
                    className="icon-button__badge us-dot-iconMIS"
                    onClick={() => { this.showModal() }}
                  >
                    <strong>!</strong>
                  </span>
                </div>
              ) : null}
          </div>
        </div>
        <h6>MIS REPORT</h6>
        <Modal
          isOpen={this.state.open}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.hideModal}
        >
          <ModalHeader name="modal1" toggle={this.hideModal}>
            MIS Report
          </ModalHeader>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.tabs(0, "1");
                  }}
                >
                  GENERATE REPORT
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.tabs(0, "2");
                  }}
                >
                  UPLOAD REPORT
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="1">
                <Form>
                  <FormGroup row>
                    <Col md="12">
                      {/* {/////////////////////////////////////////////////////////////////} */}

                      <MISRecord
                        isLoading={this.props.isLoadingMIS}
                        download={this.props.downloadDoc}
                        uploadDoc={this.props.uploadFile}
                        idUser={id}
                        idCompany={idCompany}
                        MISReports={allMISFiles}
                        props={this.props}
                        Reportes={this.docs}
                        closemodalMis={this.hideModal}
                        FirstTimeGenerate={this.state.FirstTimeGenerate}
                      />
                      {/* <Pagination
                          totalRecords={allMISFiles.length}
                          pageLimit={5}
                          onPageChanged={this.onPageChangedMIS}
                        /> */}
                    </Col>
                  </FormGroup>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form>
                  <FormGroup row>
                    <Col md="12">
                      <Col md="12">
                        <div className="container mb-5">
                          <div className="row d-flex flex-row py-2">
                            {currentFiles.map(this.fileCard)}
                          </div>
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
                          <Pagination
                            totalRecords={allFiles.length}
                            pageLimit={5}
                            onPageChanged={this.onPageChanged}
                          />
                          <Col style={{ textAlign: "right" }}>
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={this.uploadFile}
                              disabled={countFiles === 0 ? true : false}
                            >
                              Upload Files
                            </button>
                          </Col>
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
                        </div>
                      </Col>
                    </Col>
                  </FormGroup>
                </Form>
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.hideModal} color="danger">
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
        </Col>
      </React.Fragment>
    );
  }
}
export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(MSIComponent);
