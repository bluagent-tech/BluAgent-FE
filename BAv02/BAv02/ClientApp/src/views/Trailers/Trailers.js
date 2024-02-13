import React, { Component } from "react";

import {
  Card,
  CardBody,
  Col,
  Fade,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Trailers";
import Hazmat from "./../../containers/Trailers/Hazmat";
import Details from "./../../containers/Trailers/Details";
import Head from "../../containers/Trailers/Head";
import Inspections from "../../containers/Trailers/Inspections";
import Insurance from "../../containers/Trailers/Insurance";
import ToastAlert from "./../../components/ToastAlert";
import FileUploadTrailer from "./../../containers/Maintenance/Modal/FileUploadTrailer";
import AlertDelete from "./../../components/AlertDelete";
import { Link } from "react-router-dom";
const id = JSON.parse(localStorage.getItem("user")).Id;

class Trailers extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill("1"),
    };
  }

  isAnnualInspection = (file) => {
    return file.DocType.trim() === "AnnualInspection";
  };

  isInsuraceIDCard = (file) => {
    return file.DocType.trim() === "InsuranceIDCard";
  };

  isLeaseAgreement = (file) => {
    return file.DocType.trim() === "LeaseAgreement";
  };

  isStateInspection = (file) => {
    return file.DocType.trim() === "StateInspection";
  };

  isDVIR = (file) => {
    return file.DocType.trim() === "DVIR";
  };

  isRepair = (file) => {
    return file.DocType.trim() === "Repair";
  };

  componentWillMount() {
    this.props.getAllDocuments(this.props.match.params.id, 1, 100);
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />

        <div className="animated fadeIn">
          {/* TRAILERS */}
          {/*LEVEL 1*/}
          <Head id={this.props.match.params.id} />
          {/*LEVEL 2*/}
          <Row>
            <Col xs="12">
              <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                <Card>
                  <CardBody>
                    <Col>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "1"}
                            onClick={() => {
                              this.toggle(0, "1");
                            }}
                          >
                            DASHBOARD
                          </NavLink>
                        </NavItem>
                        {this.props.trailer.Hazmat == true ? (
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "2"}
                              onClick={() => {
                                this.toggle(0, "2");
                              }}
                            >
                              HAZMAT
                            </NavLink>
                          </NavItem>
                        ) : (
                          ""
                        )}

                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "3"}
                            onClick={() => {
                              this.toggle(0, "3");
                            }}
                          >
                            DETAILS
                          </NavLink>
                        </NavItem>
                        {/* <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "4"}
                            onClick={() => {
                              this.toggle(0, "4");
                            }}
                          >
                            INSURANCE
                          </NavLink>
                        </NavItem> */}
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "5"}
                            onClick={() => {
                              this.toggle(0, "5");
                            }}
                          >
                            INSPECTIONS
                          </NavLink>
                        </NavItem>
                        {/* <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "6"}
                            onClick={() => {
                              this.toggle(0, "4");
                            }}
                          >
                            HAZMAT
                          </NavLink>
                        </NavItem> */}
                        <NavItem>
                          <NavLink>
                            <Link
                              to={{
                                pathname: "../../Maintenance",
                                state: { prevUrl: true },
                              }}
                            >
                              <Button color="primary">Back</Button>
                            </Link>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab[0]}>
                        {/*DASHBOARD*/}
                        <TabPane tabId="1">
                          <div
                            className="row text-center"
                            style={{ marginTop: "4%" }}
                          >
                            <Col md="3">
                              <input
                                type="image"
                                onClick={() => {
                                  this.toggle(0, "3");
                                }}
                                className="img-responsive"
                                src="assets/icons/icons8-folder.svg"
                                alt="Submit"
                                height="150"
                                width="150"
                              />
                              <h6>TRAILER INFORMATION</h6>
                            </Col>
                            <FileUploadTrailer
                              id={this.props.match.params.id}
                              filter={this.isAnnualInspection}
                              docType={"AnnualInspection"}
                              modalHeader="ANNUAL INSPECTION"
                              imgSrc="assets/icons/icons8-inspection.svg"
                              imgsrcMouseOver="assets/icons/icons8-inspection.svg"
                              controller="Trailers"
                            />

                            <FileUploadTrailer
                              id={this.props.match.params.id}
                              filter={this.isInsuraceIDCard}
                              docType={"InsuranceIDCard"}
                              modalHeader="MCS-90"
                              imgSrc="assets/icons/icons8-protect.svg"
                              imgsrcMouseOver="assets/icons/icons8-protect.svg"
                              controller="Trailers"
                            />

                            <FileUploadTrailer
                              id={this.props.match.params.id}
                              filter={this.isLeaseAgreement}
                              docType={"LeaseAgreement"}
                              modalHeader="LEASE AGREEMENT"
                              imgSrc="assets/icons/icons8-agreement.svg"
                              imgsrcMouseOver="assets/icons/icons8-agreement.svg"
                              controller="Trailers"
                            />

                            <FileUploadTrailer
                              id={this.props.match.params.id}
                              filter={this.isStateInspection}
                              docType={"StateInspection"}
                              modalHeader="DRIVER VEHICLE INSPECTION"
                              imgSrc="assets/icons/icons8-delivered.svg"
                              imgsrcMouseOver="assets/icons/icons8-delivered.svg"
                              controller="Trailers"
                            />

                            <FileUploadTrailer
                              id={this.props.match.params.id}
                              filter={this.isDVIR}
                              docType={"DVIR"}
                              modalHeader="REGISTRATION"
                              imgSrc="assets/icons/icons8-test-passed.svg"
                              imgsrcMouseOver="assets/icons/icons8-test-passed.svg"
                              controller="Trailers"
                            />

                            <FileUploadTrailer
                              id={this.props.match.params.id}
                              filter={this.isRepair}
                              docType={"Repair"}
                              modalHeader="REPAIR RECORD"
                              imgSrc="assets/icons/icons8-maintenance.svg"
                              imgsrcMouseOver="assets/icons/icons8-maintenance.svg"
                              controller="Trailers"
                            />
                          </div>
                        </TabPane>

                        {/*HAZMAT*/}
                        <TabPane tabId="2">
                          <Hazmat id={this.props.match.params.id} />
                        </TabPane>
                        {/*DETAILS*/}
                        <TabPane tabId="3">
                          <Details id={this.props.match.params.id} />
                        </TabPane>
                        {/*INSURANCE*/}
                        {/* <TabPane tabId="4">
                          <Insurance id={this.props.match.params.id} />
                        </TabPane> */}
                        {/*INSPECTIONS*/}
                        <TabPane tabId="5">
                          <Inspections id={this.props.match.params.id} />
                        </TabPane>
                        <TabPane tabId="6">
                          <h1>Hazmat View</h1>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          </Row>
        </div>
        <AlertDelete
          modalType={"Delete"}
          message={"Are you sure you want to delete this file?"}
          modal={this.props.modalD}
          toggle={() => {
            this.props.toggleD(
              this.props.idDelete,
              this.props.docTypeToDelete,
              this.props.fileNameToDelete
            );
          }}
          delete={() => {
            this.props.deleteDoc(
              this.props.idDelete,
              id,
              this.props.docTypeToDelete,
              this.props.fileNameToDelete,
              this.props.trailer.IdTrailer
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.trailers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Trailers);
