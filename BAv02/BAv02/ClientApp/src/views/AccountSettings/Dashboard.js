import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import AlertDelete from "../../components/AlertDelete";
import UsDotAddDocument from "../../containers/Company/UsDotAddDocument";
import DrugTesting from "../../containers/Company/DashboardModal/DrugTesting";
import AccidentRegister from "../../containers/Company/DashboardModal/AccidentRegister";
import FileUploadCompany from "../../containers/Company/CompanyModal/FileUploadCompany";
import FileUploadCompanyManual from "../../containers/Company/CompanyModal/FileUploadCompnanyManual";
import CompanyInsuranceModal from "./../../containers/Company/CompanyModal/CompanyInsuranceModal";

const id = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = localStorage["idCompany"];

export default class Dashboard extends Component {
  isHmPermits = (file) => {
    return file.DocType.trim() === "HazmatPermit";
  };

  isStatePermits = (file) => {
    return file.DocType.trim() === "StatePermits";
  };

  isInsurance = (file) => {
    return file.DocType.trim() === "Insurance";
  };

  isOverFlowDoc = (file) => {
    return file.DocType.trim() === "OverFlow";
  };

  toggleInfo = (tabIndex) => {
    this.props.toggleTab(tabIndex);
  };

  render() {
    const { ReduxProps = {} } = this.props || {};
    return (
      <div className="animated fadeIn">
        <Row className="text-center">
          <Col md="3">
            <input
              type="image"
              onClick={() => {
                this.toggleInfo("3");
              }}
              className="img-responsive"
              src="assets/icons/icons8-folder.svg"
              alt="Submit"
              height="150"
              width="150"
            />
            <h6>ACCOUNT INFORMATION</h6>
          </Col>
          <Col md="3" className="d-flex flex-column justify-content-center align-items-center">
            <UsDotAddDocument 
            props={this.props}
            />
          </Col>
          <Col md="3">
            <FileUploadCompany
              //id={ReduxProps.company.IdCompany}
              filter={this.isStatePermits}
              docType="StatePermits"
              modalHeader="STATE PERMITS"
              imgSrc="/assets/icons/icons8-sheriff.svg"
              imgsrcMouseOver="/assets/icons/icons8-sheriff.svg"
              height="160"
              width="160"
            />
          </Col>
          <Col md="3">
            <DrugTesting />
          </Col>
          <Col md="3">
            <AccidentRegister />
            <h6>ACCIDENT REGISTER</h6>
          </Col>
          {JSON.parse(localStorage.getItem("user")).Hazmat === true ? (
            <Col md="3">
              <FileUploadCompany
                //id={ReduxProps.company.IdCompany}
                filter={this.isHmPermits}
                docType="HazmatPermit"
                modalHeader="Hm PERMITS"
                imgSrc="/assets/img/dashboard/back/home/haz1.png"
                imgsrcMouseOver="/assets/img/dashboard/front/home/haz.png"
              />
            </Col>
          ) : (
            ""
          )}
          <Col md="3">
            <CompanyInsuranceModal
              id={ReduxProps.company.IdCompany}
              filter={this.isInsurance}
              docType="Insurance"
              modalHeader="INSURANCE"
              imgSrc="/assets/icons/icons8-protect.svg"
              imgsrcMouseOver="/assets/icons/icons8-protect.svg"
              getAllDocuments={ReduxProps.getAllDocuments}
              downloadDoc={ReduxProps.downloadDoc}
              toggleDeleteFilesCompanyModal={
                ReduxProps.toggleDeleteFilesCompanyModal
              }
              deleteDoc={ReduxProps.deleteDoc}
              docs={ReduxProps.docs}
              uploadFile={ReduxProps.uploadFile}
              getCompanyInsuranceInformation={
                ReduxProps.getCompanyInsuranceInformation
              }
              saveCompanyInsuranceInformation={
                ReduxProps.saveCompanyInsuranceInformation
              }
              insuranceInfo={ReduxProps.insuranceInfo}
            />
          </Col>
          <Col md="3">
            <FileUploadCompanyManual
              idUser={id}
              filter={this.isOverFlowDoc}
              iconText={"SAFETY PROGRAM"}
              imgSrc="/assets/icons/icons8-security-configuration.svg"
              imgsrcMouseOver="/assets/icons/icons8-security-configuration.svg"
            />
          </Col>
        </Row>
        <AlertDelete
          message="Are you sure you want to delete this file?"
          modal={ReduxProps.modalDeleteFilesCompany}
          toggle={() => {
            ReduxProps.toggleDeleteFilesCompanyModal(
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
      </div>
    );
  }
}
