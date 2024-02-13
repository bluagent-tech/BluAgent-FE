import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import AlertDelete from "../../components/AlertDelete";
import UsDotAddDocument from "../../containers/Company/UsDotAddDocument";
import DrugTesting from "../../containers/Company/DashboardModal/DrugTesting";
import AccidentRegister from "../../containers/Company/DashboardModal/AccidentRegister";
import FileUploadCompany from "../../containers/Company/CompanyModal/FileUploadCompany";
import FileUploadCompanyManual from "../../containers/Company/CompanyModal/FileUploadCompnanyManual";

const id = JSON.parse(localStorage.getItem("user")).Id;

export default class Hazmat extends Component {
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

  isCommunicationsPlan = (file) => {
    return file.DocType.trim() === "CommunicationPlan";
  };

  isSecurityPlan = (file) => {
    return file.DocType.trim() === "SecurityPlan";
  };

  toggleInfo = (tabIndex) => {
    //this.props.toggleTab(tabIndex);
  };

  render() {
    const { ReduxProps = {} } = this.props || {};
    return (
      <div className="animated fadeIn">
        <Row className="text-center">
          <Col md="3">
            <FileUploadCompany
              filter={this.isHmPermits}
              docType="HazmatPermit"
              modalHeader="HAZMAT PERMIT"
              imgSrc="/assets/icons/icons8-inspection.svg"
              imgsrcMouseOver="/assets/icons/icons8-inspection.svg"
            />
          </Col>
          <Col md="3">
            <FileUploadCompany
              filter={this.isSecurityPlan}
              docType="SecurityPlan"
              modalHeader="SECURITY PLAN"
              imgSrc="/assets/icons/icons8-inspection.svg"
              imgsrcMouseOver="/assets/icons/icons8-inspection.svg"
            />
          </Col>
          <Col md="3">
            <FileUploadCompany
              filter={this.isCommunicationsPlan}
              docType="CommunicationPlan"
              modalHeader="COMMUNICATIONS PLAN"
              imgSrc="/assets/icons/icons8-inspection.svg"
              imgsrcMouseOver="/assets/icons/icons8-inspection.svg"
            />
          </Col>
          
          <Col md="3">
            <FileUploadCompany
              //id={ReduxProps.company.IdCompany}
              filter={this.isInsurance}
              docType="Insurance"
              modalHeader="INSPECTOR CERTIFICATE"
              imgSrc="/assets/icons/icons8-checked-user-male.svg"
              imgsrcMouseOver="/assets/icons/icons8-checked-user-male.svg"
            />
          </Col>
        </Row>
        <Row className="text-center">
          <Col md="3">
            <FileUploadCompanyManual
              idUser={id}
              filter={this.isOverFlowDoc}
              iconText={"HAZMAT SHIPPING PAPERS"}
              imgSrc="/assets/icons/icons8-documents.svg"
              imgsrcMouseOver="/assets/icons/icons8-documents.svg"
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
