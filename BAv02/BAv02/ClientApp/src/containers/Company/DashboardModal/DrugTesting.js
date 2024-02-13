import React, { Fragment } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  Col,
  Label,
  Alert,
  Button,
  Row,
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/AccountSettings";
import AlertDelete from "../../../components/AlertDelete";
import FileUploadTable from "./../../../components/FileUploadTable";
import FileUpload from "../../../components/FileUpload";
import DriverAgreementInfo from "../../../components/pdf/DriverAgreementInfoCompany";
import EnrrollmentCertificate from "../Pdf/EnrrollmentCertificatePDF";
import FileUploadCertificateEnrollment from "../CompanyModal/FileUploadCertificateEnrollment";
import ClearingHouseData from "./DrugTestingSections/ClearingHouseSection/ClearingHouseForm";

const User = JSON.parse(localStorage["user"]);

class UsDotAddDocument extends React.Component {
  isCertificate = (file) => {
    return file.DocType.trim() === "Certificate of Enrollment";
  };
  isPolicy = (file) => {
    return (
      file.DocType.trim() === "Company Policy" ||
      file.DocType.trim() === "Supervisor Policy"
    );
  };
  isTraining = (file) => {
    return file.DocType.trim() === "Supervisor Training";
  };
  isCertificateEnrollment = (file) => {
    return file.DocType.trim() === "Certificate of Enrollment";
  };

  constructor(props) {
    super(props);
    this.openAlert = this.openAlert.bind(this);
    this.state = {
      actuales: [],
      activeTab: new Array(4).fill("1"),
      checked: true, // ? verificar si se usa en esta pagina
      showPass: false, // ? verificar si se usa
      flagDrugTesting: false, // ? verificar si se usa
    };
  }


  openAlert() {
    var alertCredentials = document.getElementById("AlertCredentials");
    if (document.getElementById("AlertCredentials")) {
      alertCredentials.style.display = "block";
      setTimeout(function () {
        alertCredentials.style.display = "none";
      }, 1500);
    }
  }

  toggleTab(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    return (
      <Fragment>
        <input
          type="image"
          onClick={() => {
            this.props.toggleDrugTestingAddDocument(this.props.id);
          }}
          className="img-responsive"
          src="/assets/icons/icons8-doctors-bag.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "/assets/icons/icons8-doctors-bag.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "/assets/icons/icons8-doctors-bag.svg")
          }
          alt="Submit"
          height="160"
          width="160"
        />
        <h6>DRUG TESTING</h6>
        <Modal
          isOpen={this.props.drugTestingModal}
          className="modal-lg"
          backdrop={"static"}
          toggle={this.props.toggleDrugTestingAddDocument}
        >
          <ModalHeader toggle={this.props.toggleDrugTestingAddDocument}>
            Drug Testing - Add Documents
          </ModalHeader>
          <ModalBody style={{ overflow: "hidden" }}>
            <FormGroup>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === "1"}
                    onClick={() => {
                      this.toggleTab(0, "1");
                    }}
                  >
                    Certificate of Enrollment
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === "2"}
                    onClick={() => {
                      this.toggleTab(0, "2");
                    }}
                  >
                    Company Policy
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === "3"}
                    onClick={() => {
                      this.toggleTab(0, "3");
                    }}
                  >
                    Supervisor Training
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === "4"}
                    onClick={() => {
                      this.toggleTab(0, "4");
                    }}
                  >
                    Clearing House
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[0]}>
                <TabPane tabId="1">
                  <FileUploadCertificateEnrollment
                    docPdf={this.props.docs}
                    companyPdf={this.props.company}
                    genPdf={true}
                    uploadFilePdf={this.props.uploadFile}
                    IduPdf={User.Id}
                    ////////////////////////////////
                    id="CertificateofEnrollment"
                    docType="Certificate of Enrollment"
                    filter={this.isCertificate}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleDrugTestingAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="2">
                  <DriverAgreementInfo companyInfo={this.props.company} />
                  <FileUploadTable
                    id="CompanyPolicy"
                    docType="Company Policy"
                    filter={this.isPolicy}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleDrugTestingAddDocument}
                    message=""
                  />
                  {/* <DriverAgreementInfo companyInfo={this.props.company} /> */}
                </TabPane>
                <TabPane tabId="3">
                  <FileUpload
                    id="SupervisorTraining"
                    docType="Supervisor Training"
                    filter={this.isTraining}
                    getAllDocuments={this.props.getAllDocuments}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={
                      this.props.toggleDeleteFilesCompanyModal
                    }
                    deleteDoc={this.props.deleteDoc}
                    docs={this.props.docs}
                    uploadFile={this.props.uploadFile}
                    toggle={this.props.toggleDrugTestingAddDocument}
                    message=""
                  />
                </TabPane>
                <TabPane tabId="4">
                  <ClearingHouseData
                    toggle={this.props.toggleDrugTestingAddDocument}
                    isOpen={this.props.drugTestingModal}
                    isLoading={this.props.isLoading}
                    saveData={this.props.saveCompanyClearingCredentials}
                    clearingHouseCredentials={this.props.GetCompanyClearingCredentials}
                    CompanyCredentials={this.props.CompanyCredentials} />
                </TabPane>
              </TabContent>
            </FormGroup>
          </ModalBody>
        </Modal>
        <AlertDelete
          modalType={"Delete"}
          message={"Are you sure you want to delete this file?"}
          modal={this.props.modalD}
          toggle={() => {
            this.props.toggleD(0);
          }}
          delete={() => {
            this.props.deleteDoc(this.props.idDelete);
          }}
        />
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(UsDotAddDocument);
