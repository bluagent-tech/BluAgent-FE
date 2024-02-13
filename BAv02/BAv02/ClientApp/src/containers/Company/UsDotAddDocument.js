import React, { Fragment } from "react";
import "material-components-web";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";
import "../../assets/css/DashboardCompany.css";
import DataTable from 'react-data-table-component';
import MCS150Record from "../../components/MCS150Record";
import {
  Col,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  Row,
  UncontrolledTooltip,
  Alert
} from "reactstrap";
// import { Col, Row, Alert } from "reactstrap";
import FileUpload from "./../../components/FileUpload";
import UCRFileUpload from "./../../components/UCRFileUpload";
import OnlyUpload from "../../components/OnlyUpload";
import CompanyNotifications from "../../components/CompanyNotifications.Js";
import define from "core-js/fn/object/define";
import Loading from "../../components/Loading";
import PinNumberForm from "./PinNomberForm";
import FMCSAuser from "./FMCSAuser";
const idCompany = localStorage["idCompany"];
const idUser = JSON.parse(localStorage.getItem("user")).Id;

let Files = {
  data: [],
  dataDriver: [],
};

class UsDotAddDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: new Array(7).fill("1"),
      open: false,
      pestana: "",
      notification: false,
      allFilesDriver: [],
    };
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.docs !== this.props.docs) {
      Files.dataDriver = this.props.docs.filter(this.isUCRReport);
      const { dataDriver: allFilesDriver = [] } = Files;
      this.setState({ allFilesDriver });
    }
  }

  componentWillReceiveProps() {
    Files.dataDriver = this.props.docs.filter(this.isUCRReport);
    const { dataDriver: allFilesDriver = [] } = Files;
    this.setState({ allFilesDriver });
  }

  // openInNewTab(url) {
  //   window.open(url, '_blank', 'noopener,noreferrer')
  // }

  isUCRReport = (file) => {
    return file.DocType.trim() === "UCR";
  }
  isFMCSAReport = (file) => {
    return file.DocType.trim() === "FMCSA";
  }
  isPspReport = (file) => {
    return file.DocType.trim() === "PSP REPORT";
  };
  isMCS150 = (file) => {
    return file.DocType.trim() === "MCS-150";
  };
  isCsaOverview = (file) => {
    return file.DocType.trim() === "CSA OVERVIEW";
  };
  isPinNumber = (file) => {
    return file.DocType.trim() === "Pin Number";
  };
  isCertificate = (file) => {
    return file.DocType.trim() === "CERTIFICATE";
  };
  isSafetyReview = (file) => {
    return file.DocType.trim() === "Safety Reviews";
  };
  isLetters = (file) => {
    return file.DocType.trim() === "Letters";
  };


  toggleTab(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    var UCRData = this.state.allFilesDriver.map((row, index) => ({
      id: index,
      date: row.Date,
      fileName: row.DescriptionDoc,
    }));
    const columns = [
      {
        name: "FILE NAME",
        selector: (row) => row.fileName,
        center: true,
      },
      {
        name: "DATE",
        selector: (row) => row.date,
        sortable: true,
        center: true,
      },
    ];
    // if (this.props.usDotAddDocumentsModal == false) {
    //   this.state.name = null
    //   this.state.nextStep = false
    //   this.state.FMCSA = false
    // }
    if (this.props.CompanyCredentials !== undefined) {
      if (this.props.CompanyCredentials[0] !== undefined) {
        var pin = this.props.CompanyCredentials[0].Pinnumber
        //console.log("props", this.props.CompanyCredentials[0].Pinnumber);
      }
    }

    return (
      <Fragment>
        <div className="d-flex justify-content-center">
          <div className="box-size-image">
            <input
              type="image"
              onClick={() => {
                this.props.toggleUsDotAddDocument(this.props.id);
              }}
              className="img-responsive material-icons"
              src="/assets/icons/icons8-police-badge.svg"
              onMouseOver={(e) =>
                (e.currentTarget.src = "/assets/icons/icons8-police-badge.svg")
              }
              onMouseOut={(e) =>
                (e.currentTarget.src = "/assets/icons/icons8-police-badge.svg")
              }
              alt="Submit"
              height={142}
              width={142}
            />
            {this.props.isLoadingUsDot
              // || this.props.isLoading == undefined 
              ? null : // this.props.CompanyNotifications.MCS
              this.props.CompanyNotifications.MCS ||
                this.props.CompanyNotifications.PinNumber ||
                this.props.CompanyNotifications.UCR ||
                this.props.CompanyNotifications.CSA ||
                this.props.CompanyNotifications.PSP ||
                this.props.CompanyNotifications.Certificate ||
                this.props.CompanyNotifications.Letters ||
                this.props.CompanyNotifications.SafetyReviews ? (
                <div>
                  <span
                    type="button"
                    className="icon-button__badge us-dot-icon"
                    onClick={() => {
                      this.props.toggleUsDotAddDocument(this.props.id);
                    }}
                  >
                    <strong>!</strong>
                  </span>
                </div>
              ) : null}
          </div>
        </div>
        <div>
          <h6>US DOT</h6>
        </div>

        <Modal
          isOpen={this.props.usDotAddDocumentsModal}
          className="modal-lg"
          backdrop={"static"}
          toggle={this.props.toggleUsDotAddDocument}
        >
          <ModalHeader toggle={this.props.toggleUsDotAddDocument}>
            US DOT - Add Documents
          </ModalHeader>
          <ModalBody style={{ overflow: "hidden" }}>
            <FormGroup>
              <Nav style={{ fontSize: "12px" }} tabs>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "1"}
                      onClick={() => {
                        this.toggleTab(0, "1"),
                          this.state.pestana = "MCS",
                          this.props.CompanyNotifications.MCS = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      MCS-150
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.MCS ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            this.toggleTab(0, "1"),
                              this.state.pestana = "MCS",
                              this.props.CompanyNotifications.MCS = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) : null}
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "2"}
                      onClick={() => {
                        this.toggleTab(0, "2"),
                          this.state.pestana = "PinNumber",
                          this.props.CompanyNotifications.PinNumber = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      PIN NUMBER
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.PinNumber ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            this.toggleTab(0, "2"),
                              this.state.pestana = "PinNumber",
                              this.props.CompanyNotifications.PinNumber = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) : null}
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "3"}
                      onClick={() => {
                        this.toggleTab(0, "3"),
                          this.state.pestana = "CSA",
                          this.props.CompanyNotifications.CSA = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      CSA OVERVIEW
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.CSA ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            this.toggleTab(0, "3"),
                              this.state.pestana = "MCS",
                              this.props.CompanyNotifications.MCS = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) : // <CompanyNotifications/>
                        null}
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "4"}
                      onClick={() => {
                        this.toggleTab(0, "4"),
                          this.state.pestana = "PSP",
                          this.props.CompanyNotifications.PSP = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      PSP REPORT
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.PSP ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            this.toggleTab(0, "4"),
                              this.state.pestana = "PSP",
                              this.props.CompanyNotifications.PSP = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) :
                        null}
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "5"}
                      onClick={() => {
                        this.toggleTab(0, "5"),
                          this.state.pestana = "UCR",
                          //this.props.CompanyNotifications.UCR = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      UCR
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.UCR ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            this.toggleTab(0, "5"),
                              this.state.pestana = "UCR",
                              this.props.CompanyNotifications.UCR = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) :
                        null}
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "6"}
                      onClick={() => {
                        this.toggleTab(0, "6"),
                          this.state.pestana = "Certificate",
                          this.props.CompanyNotifications.Certificate = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      CERTIFICATE
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.Certificate ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            this.toggleTab(0, "6"),
                              this.state.pestana = "Certificate",
                              this.props.CompanyNotifications.Certificate = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) :
                        null}
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "7"}
                      onClick={() => {
                        this.toggleTab(0, "7"),
                          this.state.pestana = "Letters",
                          this.props.CompanyNotifications.Letters = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      LETTERS
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.Letters ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            this.toggleTab(0, "7"),
                              this.state.pestana = "Letters",
                              this.props.CompanyNotifications.Letters = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) :
                        null}
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "8"}
                      onClick={() => {
                        this.toggleTab(0, "8"),
                          this.state.pestana = "SafetyReviews",
                          this.props.CompanyNotifications.SafetyReviews = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      SAFETY REVIEWS
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.SafetyReviews ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            this.toggleTab(0, "8"),
                              this.state.pestana = "SafetyReviews",
                              this.props.CompanyNotifications.SafetyReviews = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) :
                        null}
                    </NavLink>
                  </div>
                </NavItem>
                <NavItem>
                  <div className="mcs-150-box">
                    <NavLink
                      active={this.state.activeTab[0] === "9"}
                      onClick={() => {

                        // this.setState({ name: "" }),
                        this.toggleTab(0, "9"),
                          this.state.pestana = "FMCSA",
                          this.state.name = null,
                          this.props.CompanyNotifications.FMCSA = false,
                          this.props.updateCompanyNotifications(
                            idCompany,
                            this.state.pestana,
                            this.state.notification
                          );
                      }}
                    >
                      FMCSA Portal
                      {this.props.isLoadingUsDot ? null : this.props.CompanyNotifications.FMCSA ? (
                        <span
                          type="button"
                          className="icon-button__badge mcs-150"
                          onClick={() => {
                            //this.state.name = "",

                            this.toggleTab(0, "9"),
                              this.state.name = null,
                              this.state.pestana = "FMCSA",
                              this.props.CompanyNotifications.FMCSA = false,
                              this.props.updateCompanyNotifications(
                                idCompany,
                                this.state.pestana,
                                this.state.notification
                              );
                          }}
                        >
                          <strong>!</strong>
                        </span>
                      ) :
                        null}
                    </NavLink>
                  </div>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[0]}>
                <TabPane tabId="2">
                  <PinNumberForm
                    pinNumber={pin} />
                  <h4>Pin letter</h4>
                  <FileUpload
                    id="PinNumber"
                    docType="Pin Number"
                    filter={this.isPinNumber}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleUsDotAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="3">
                  <FileUpload
                    id="CSAOVERVIEW"
                    docType="CSA OVERVIEW"
                    filter={this.isCsaOverview}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleUsDotAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="1">
                  <MCS150Record
                    download={this.props.downloadDoc}
                    idUser={idUser}
                    id="MCS150"
                    docType="MCS-150"
                    filter={this.isMCS150}
                    getAllDocuments={this.props.getAllDocuments}
                    // downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggleUsDotAddDocument={this.props.toggleUsDotAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="4">
                  <FileUpload
                    id="PSPREPORT"
                    docType="PSP REPORT"
                    filter={this.isPspReport}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleUsDotAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="5">
                  <Row>
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
                        To make UCR payment visit{" "}
                        <strong><a href="https://www.ucr.gov/" target="_blank">UCR.GOV</a></strong>
                        {/* is generated once a year and is only available for the year prior to
                        the current year.{" "} */}
                      </Alert>
                    </Col>
                  </Row>
                  <Row>
                    <DataTable
                      pagination
                      columns={columns}
                      data={UCRData}
                    />
                  </Row>
                  <Row>
                    <Col md="12">
                      <UCRFileUpload
                        id="UCR"
                        docType="UCR"
                        onlyUpload={true}
                        filter={this.isUCRReport}
                        getAllDocuments={this.props.getAllDocuments}
                        downloadDoc={this.props.downloadDoc}
                        toggleDeleteFilesCompanyModal={
                          this.props.toggleDeleteFilesCompanyModal
                        }
                        deleteDoc={this.props.deleteDoc}
                        docs={this.props.docs}
                        uploadFile={this.props.uploadFileUCR}
                        toggle={this.props.toggleUsDotAddDocument}
                        message=""
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="6">
                  <FileUpload
                    id="CERTIFICATE"
                    docType="CERTIFICATE"
                    filter={this.isCertificate}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleUsDotAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="7">
                  <FileUpload
                    id="Letters"
                    docType="Letters"
                    filter={this.isLetters}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleUsDotAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="8">
                  <FileUpload
                    id="SafetyReviews"
                    docType="Safety Reviews"
                    filter={this.isSafetyReview}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleUsDotAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="9">
                  <FMCSAuser
                    user={this.props.fmcsaInfo[1]}
                    password={this.props.fmcsaInfo[0]}
                    toggle={this.props.toggleUsDotAddDocument}
                    upload={this.props.UpdateFMCSAUser}
                    getFMCSA={this.props.getFMCSA} />
                </TabPane>
              </TabContent>
            </FormGroup>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(UsDotAddDocument);
