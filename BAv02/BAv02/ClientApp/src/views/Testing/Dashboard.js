import React, { Component, Fragment } from "react";

import {
  Col, Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";
import AlertDelete from "../../components/AlertDelete";
import FileUploadDrugTest from "../../containers/Test/DashboardModal/FileUploadDrugTest";
import MISComponent from "../../containers/DrugTestCollector/DrugTestSite/MIS/MISComponent";
import FileUploadDrugTestCertificateEnrollment from "../../containers/Test/DashboardModal/FileUploadDrugTestCertificateEnrollment";
import FileUploadDrugTestingPolicy from "../../containers/Test/DashboardModal/FileUploadDrugTestingPolicy";
import ClearingHouseData from "../../containers/Company/DashboardModal/DrugTestingSections/ClearingHouseSection/ClearingHouseForm";
import ToastAlert from "../../components/ToastAlert";
const User = JSON.parse(localStorage["user"]);

const id = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = localStorage.getItem("idCompany");

class Dashboard extends Component {
  isCollectorReport = (file) => {
    return file.DocType.trim() === "CollectorReport";
  };

  isLaboratorySummary = (file) => {
    return file.DocType.trim() === "LaboratorySummary";
  };

  isCertificateEnrollment = (file) => {
    return file.DocType.trim() === "Certificate of Enrollment";
  };

  isSupervisorPolicy = (file) => {
    return (
      file.DocType.trim() === "Supervisor Policy" ||
      file.DocType.trim() === "Company Policy"
    );
  };

  isCleringHouse = (file) => {
    return file.DocType.trim() === "Clearing House";
  };

  isSupervisorTraining = (file) => {
    return file.DocType.trim() === "Supervisor Training";
  };

  isMISReport = (file) => {
    return file.DocType.trim() === "MISReport";
  };

  componentDidMount() {
    this.props.getCompanyNotifications(idCompany);
  }

  render() {
    const { ReduxProps = {} } = this.props || {};
    return (
      <div className="animated fadeIn">
        <Col>
          <div className="row text-center" style={{ marginTop: "4%" }}>
            <MISComponent
              docType="CollectorReport"
              docTypeMIS="MISReport"
              filter={this.isCollectorReport}
              MISfilter={this.isMISReport}
              CompanyNotifications={this.props.CompanyNotifications}
              isLoadingUsDot={this.props.isLoadingUsDot}
              updateCompanyNotifications={this.props.updateCompanyNotifications}
            />
            {/* ---------=FIN MIS REPORT=------- */}
            <FileUploadDrugTest
              filter={this.isLaboratorySummary}
              docType="LaboratorySummary"
              modalHeader="LABORATORY SUMMARY"
              imgSrc="assets/icons/icons8-test-tube.svg"
              imgsrcMouseOver="assets/icons/icons8-test-tube.svg"
            />

            {/* Certificate of enrollment */}
            <FileUploadDrugTestCertificateEnrollment
              filter={this.isCertificateEnrollment}
              docType="Certificate of Enrollment"
              modalHeader="CERTIFICATE ENROLLMENT"
              imgSrc="assets/icons/icons8-contract.svg"
              imgsrcMouseOver="assets/icons/icons8-contract.svg"
            />
            {/* <FileUploadDrugTest
              filter={this.isCertificateEnrollment}
              docType="Certificate Enrollment"
              modalHeader="CERTIFICATE ENROLLMENT"
              imgSrc="assets/icons/icons8-contract.svg"
              imgsrcMouseOver="assets/icons/icons8-contract.svg"
            /> */}

            <FileUploadDrugTestingPolicy
              filter={this.isSupervisorPolicy}
              // filter2={this.isSupervisorTraining}
              docType="Supervisor Policy"
              modalHeader="DRUG TESTING POLICY"
              imgSrc="assets/icons/icons8-contract.svg"
              imgsrcMouseOver="assets/icons/icons8-contract.svg"
            />

            <FileUploadDrugTest
              filter={this.isSupervisorTraining}
              docType="Supervisor Training"
              modalHeader="SUPERVISOR TRAINING"
              imgSrc="assets/icons/icons8-contract.svg"
              imgsrcMouseOver="assets/icons/icons8-contract.svg"
            />

            <Col md="3">
              <input
                type="image"
                onClick={() => {
                  this.props.toggleDrugTestingAddDocument(this.props.id);
                }}
                className="img-responsive"
                src="assets/icons/icons8-open-box.svg"
                onMouseOver={(e) =>
                  (e.currentTarget.src = "assets/icons/icons8-open-box.svg")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.src = "assets/icons/icons8-open-box.svg")
                }
                alt="Submit"
                height="160"
                width="160"
              />
              <h6>CLEARING HOUSE</h6>
              <Modal
                isOpen={this.props.drugTestingModal}
                className="modal-lg"
                backdrop={"static"}
                toggle={this.props.toggleDrugTestingAddDocument}
              >
                <ModalHeader toggle={this.props.toggleDrugTestingAddDocument}>
                  CLEARING HOUSE
                </ModalHeader>
                <ModalBody style={{ overflow: "hidden" }}>
                  <ClearingHouseData
                    toggle={this.props.toggleDrugTestingAddDocument}
                    isOpen={this.props.drugTestingModal}
                    isLoading={this.props.isLoading}
                    saveData={this.props.saveCompanyClearingCredentials}
                    clearingHouseCredentials={this.props.GetCompanyClearingCredentials}
                    CompanyCredentials={this.props.CompanyCredentials} />
                </ModalBody>
              </Modal>
            </Col>
          </div>
          <br />
        </Col>
        <AlertDelete
          message="Are you sure you want to delete this file?"
          modal={ReduxProps.modalDeleteFilesDrugTest}
          toggle={() => {
            ReduxProps.toggleDeleteFilesDrugTestModal(
              ReduxProps.idDelete,
              ReduxProps.docTypeToDelete,
              ReduxProps.fileNameToDelete
            );
          }}
          delete={() => {
            ReduxProps.deleteDoc(
              ReduxProps.idDelete,
              id,
              ReduxProps.docTypeToDelete,
              ReduxProps.fileNameToDelete
            );
          }}
        />
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
      </div>
    );
  }
}
export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Dashboard);
