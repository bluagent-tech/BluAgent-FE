import React, { Component, Fragment } from "react";
import { Col } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Drivers";
import ControlledTest from "./../Drivers/DriverModal/ControlledTest";
import ApplicationEmployment from "./../Drivers/DriverModal/ApplicationEmployment";
import InquiryTest from "./../Drivers/DriverModal/InquiryTest";
import BackgroundHistory from "./../Drivers/DriverModal/BackgroundHistory";
import Dmv from "./../Drivers/DriverModal/Dmv";
import ClearingHouse from "./../Drivers/DriverModal/ClearingHouse";
import RoadTest from "./../Drivers/DriverModal/RoadTest";
import MedicalCertf from "./../Drivers/DriverModal/MedicalCertf";
import AnnualDmv from "./../Drivers/DriverModal/AnnualDmv";
import AnnualViolations from "./../Drivers/DriverModal/AnnualViolations";
import MultiEmployment from "./../Drivers/DriverModal/MultiEmployment";
import Password from "./../Drivers/DriverModal/Password";

import UploadDriversFiles from "../../containers/Company/CompanyModal/FileUploadDrivers";
import DocumentAuthorizarion from "../Company/CompanyModal/DocumentAuthorizarion";

const userId = JSON.parse(localStorage.getItem("user")).Id;
const userInformation = JSON.parse(localStorage.getItem("user"));
const idCompany = JSON.parse(localStorage.getItem("idCompany"));

//DASHBOARD DRIVER

class Dashboard extends Component {
  toggleInfo = (tabPane, tabIndex) => {
    this.props.toggleTab(tabPane, tabIndex);
  };
  //Company Profile
  isHmPermit = (file) => {
    return file.DocType.trim() === "HazmatPermit";
  };

  isSecurityPlan = (file) => {
    return file.DocType.trim() === "SecurityPlan"; //Driver
  };

  isCommunicationsPlan = (file) => {
    return file.DocType.trim() === "CommunicationsPlan"; //Driver
  };

  isInspectorCertificate = (file) => {
    return file.DocType.trim() === "InspectorCertificate";
  };

  isHazmatShippingPapers = (file) => {
    return file.DocType.trim() === "HazmatShippingPapers";
  };

  //Maintenance
  isManufacturerCertificate = (file) => {
    return file.DocType.trim() === "ManufacturerCertificate";
  };

  isHazmatInspections = (file) => {
    return file.DocType.trim() === "HazmatInspections";
  };

  isRetest = (file) => {
    return file.DocType.trim() === "Retest";
  };

  //Hazmat Module Dashboard
  isTrainingCertificate = (file) => {
    return file.DocType.trim() === "TrainingCertificate";
  };

  isHazmatCDL = (file) => {
    return file.DocType.trim() === "HazmatCDL";
  };

  render() {
    return (
      <Fragment>
        <div className="row text-center" style={{ marginTop: "4%" }}>
          <Col>
            <input
              type="image"
              onClick={() => {
                this.toggleInfo(0, "2");
              }}
              className="img-responsive"
              src="assets/icons/icons8-folder.svg"
              alt="Submit"
              height="150"
              width="150"
            />
            <h6>DRIVER INFORMATION</h6>
          </Col>
          <ControlledTest
            id={this.props.id}
            statusR={this.props.statusR}
            fitness={this.props.fitness}
            user={userInformation}
            driver={this.props.driver}
            company={this.props.companyInfo}
            toggle={this.props.toggleA}
            modal={this.props.modalDA}
          />
          <ApplicationEmployment
            driver={this.props.driver}
            toggle={this.props.toggleEA}
            modal={this.props.modalEA}
            id={this.props.id}
            error={this.M}
            isLoading={this.props.isLoadingM}
            company={this.props.companyInfo}
            submit={this.props.saveEmploymentApp}
            list={this.props.eAList}
            page={this.props.countEA}
            count={this.props.countEA}
            get={this.props.getEmploymentApplications}
            statusR={this.props.statusR}
            driverExperience={this.props.drivingExList}
            trafficConvictions={this.props.trafficCList}
            accidentRecords={this.props.accidentRecList}
            employmentRecords={this.props.employmentRList}
          />

          {/* <InquiryTest
            tipoUsuario={JSON.parse(localStorage.getItem("user")).Role}
            driver={this.props.driver}
            toggle={this.props.toggleLI}
            modal={this.props.modalLI}
            id={this.props.id}
            company={this.props.companyInfo}
            employer={this.props.pEmployer}
            submit={this.props.sendLQ}
            error={this.props.errorM}
            isLoading={this.props.isLoadingM}
            list={this.props.LQList}
            page={this.props.pageLQ}
            count={this.props.countLQ}
            get={this.props.getLQList}
            statusR={this.props.statusR}
          />  */}

          <BackgroundHistory
            tipoUsuario={JSON.parse(localStorage.getItem("user")).Role}
            driver={this.props.driver}
            toggle={this.props.toggleLIandEH}
            modal={this.props.modalEH}
            id={this.props.id}
            company={this.props.companyInfo}
            employer={this.props.pEmployer}
            submit={this.props.sendEH}
            error={this.props.errorM}
            isLoading={this.props.isLoadingM}
            list={this.props.LQEHList}
            // list={this.props.EHList}
            page={this.props.pageEH}
            count={this.props.countEH}
            get={this.props.getEHList}
            statusR={this.props.statusR}
          />
          <Dmv
            toggle={this.props.toggleDMV}
            modal={this.props.modalDMV}
            error={this.props.errorM}
            isLoading={this.props.isLoadingM}
            id={this.props.id}
            statusR={this.props.statusR}
            submit={this.props.saveDMVRecord}
            download={this.props.downloadDoc}
            list={this.props.DMVList}
            page={this.props.pageDMV}
            count={this.props.countDMV}
            get={this.props.getDMVRList}
            submitPull={this.props.savePullNotice}
            listPull={this.props.employerPullNotice}
            pagePull={this.props.pagePullNotice}
            countPull={this.props.countPullNotice}
            getPull={this.props.getEPNList}
            deleteDMV={this.props.deleteDMVRecord}
            deleteEPN={this.props.deleteEpnRecord}
          />

          <ClearingHouse id={this.props.id} />

          <RoadTest
            toggleToast={this.props.toggleToastAlert}
            driver={this.props.driver}
            toggle={this.props.toggleROT}
            modal={this.props.modalROT}
            id={this.props.id}
            error={this.props.errorM}
            isLoading={this.props.isLoadingM}
            company={this.props.companyInfo}
            states={this.props.States}
            message={this.props.messageM}
            submit={this.props.saveRoadT}
            download={this.props.downloadDoc}
            get={this.props.getRoadTestList}
            list={this.props.roadTestL}
            page={this.props.countRoad}
            count={this.props.countRoad}
            statusR={this.props.statusR}
          />

          <MedicalCertf
            toggle={this.props.toggleMC}
            modal={this.props.modalMC}
            id={this.props.id}
            error={this.props.errorM}
            isLoading={this.props.isLoadingM}
            submit={this.props.saveMedicalCertificate}
            download={this.props.downloadDoc}
            list={this.props.MCList}
            page={this.props.pageMC}
            count={this.props.countMC}
            get={this.props.getMCList}
            statusR={this.props.statusR}
            deleteCertificate={this.props.deleteMedicalCertificate}
            idCompany={idCompany}
            modalD={this.props.modalD}
            toggleD={this.props.toggleD}
          />
          <AnnualDmv
            driver={this.props.driver}
            toggle={this.props.toggleRD}
            modal={this.props.modalRD}
            submit={this.props.saveARD}
            error={this.props.errorM}
            isLoading={this.props.isLoadingM}
            id={this.props.id}
            list={this.props.RDList}
            page={this.props.pageRD}
            count={this.props.countRD}
            get={this.props.getRDList}
            company={this.props.companyInfo}
            statusR={this.props.statusR}
            idLoggedUser={userId}
            idCompany={idCompany}
          />
          <AnnualViolations
            driver={this.props.driver}
            toggle={this.props.toggleCV}
            modal={this.props.modalCV}
            submit={this.props.saveV}
            submitC={this.props.certificateV}
            error={this.props.errorM}
            isLoading={this.props.isLoadingM}
            id={this.props.id}
            list={this.props.VList}
            listC={this.props.CVList}
            page={this.props.pageV}
            count={this.props.countV}
            get={this.props.getVList}
            getC={this.props.getCVList}
            pageC={this.props.pageCV}
            countC={this.props.countCV}
            company={this.props.companyInfo}
            statusR={this.props.statusR}
          />

          <MultiEmployment
            driver={this.props.driver}
            states={this.props.States}
            toggle={this.props.toggleME}
            modal={this.props.modalME}
            id={this.props.id}
            data={this.props.dataME}
          />
          {JSON.parse(localStorage.getItem("user")).Role === "DRIVER" ? (
            <Password
              toggle={this.props.toggleCP}
              modal={this.props.modalCP}
              id={this.props.id}
              submit={this.props.changePassword}
              error={this.props.error}
              message={this.props.message}
              isLoading={this.props.isLoading}
            />
          ) : (
            ""
          )}

          <Col md="3">
            <UploadDriversFiles
              driver={this.props.driver}
              filter={this.isSecurityPlan}
              docType="SecurityPlan"
              modalHeader="HAZMAT: SECURITY PLAN"
              imgSrc="/assets/icons/icons8-inspection.svg"
              imgsrcMouseOver="/assets/icons/icons8-inspection.svg"
              height="160"
              width="160"
            />
          </Col>
          <Col md="3">
            <UploadDriversFiles
              driver={this.props.driver}
              filter={this.isCommunicationsPlan}
              docType="CommunicationsPlan"
              modalHeader="HAZMAT: COMMUNICATIONS PLAN"
              imgSrc="/assets/icons/icons8-inspection.svg"
              imgsrcMouseOver="/assets/icons/icons8-inspection.svg"
              height="160"
              width="160"
            />
          </Col>
          <Col md="3">
            <DocumentAuthorizarion
              fitness={this.props.fitness}
              user={userInformation}
              driver={this.props.driver}
              company={this.props.companyInfo}
              toggle={this.props.toggleA}
              modal={this.props.modalDA}
            />
          </Col>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Dashboard);
