import React, { Component } from "react";
import Details from "../../containers/Trucks/Details";
import Insurance from "../../containers/Trucks/Insurance";
import Notifications from "../../containers/Trucks/Notifications";
import Head from "../../containers/Trucks/Head";
import Inspections from "../../containers/Trucks/Inspections";
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
import { actionCreators } from "../../store/Trucks";
import FileUpload from "./../../containers/Maintenance/Modal/FileUpload";
import AnnualInspection from "./../../containers/Maintenance/Modal/AnnualInspection";
import ToastAlert from "./../../components/ToastAlert";
import AlertDelete from "./../../components/AlertDelete";
import { Link } from "react-router-dom";
const id = JSON.parse(localStorage.getItem("user")).Id;

//DASHBOARD TRUCK

class Trucks extends Component {
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

  isRoadsideInspections = (file) => {
    return file.DocType.trim() === "Roadside Inspection";
  };

  UNSAFE_componentWillMount() {
    this.props.getInspectionsByTruck(this.props.match.params.id, "VEHICLE");
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
          {/* TRUCK */}
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
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "2"}
                            onClick={() => {
                              this.toggle(0, "2");
                            }}
                          >
                            DETAILS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "5"}
                            onClick={() => {
                              this.toggle(0, "5");
                            }}
                          >
                            ROADSIDE INSPECTIONS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink>
                            <Link to="../../Maintenance">
                              <Button color="primary">Back</Button>
                            </Link>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab[0]}>
                        {/*DETAILS*/}
                        <TabPane tabId="1">
                          <div
                            className="row text-center"
                            style={{ marginTop: "4%" }}
                          >
                            <Col md="3">
                              <input
                                type="image"
                                onClick={() => {
                                  this.toggle(0, "2");
                                }}
                                className="img-responsive"
                                src="assets/icons/icons8-folder.svg"
                                alt="Submit"
                                height="150"
                                width="150"
                              />
                              <h6>VEHICLE INFORMATION</h6>
                            </Col>
                            <AnnualInspection
                              inspections={this.props.maintenanceInspections}
                              PMinspections={this.props.maintenanceInspections}
                              getInspections={this.props.getInspectionsByTruck}
                              idVehicle={this.props.match.params.id}
                              filter={this.isAnnualInspection}
                              docType={"AnnualInspection"}
                              vehicleType="VEHICLE"
                              id={this.props.match.params.id}
                            />

                            <FileUpload
                              id={this.props.match.params.id}
                              filter={this.isInsuraceIDCard}
                              docType={"InsuranceIDCard"}
                              modalHeader="MCS-90"
                              imgSrc="assets/icons/icons8-protect.svg"
                              imgsrcMouseOver="/assets/icons/icons8-protect.svg"
                            />

                            <FileUpload
                              id={this.props.match.params.id}
                              filter={this.isStateInspection}
                              docType={"StateInspection"}
                              modalHeader="DRIVER VEHICLE INSPECTION"
                              imgSrc="assets/icons/icons8-test-passed.svg"
                              imgsrcMouseOver="assets/icons/icons8-test-passed.svg"
                            />

                            <FileUpload
                              id={this.props.match.params.id}
                              filter={this.isDVIR}
                              docType={"DVIR"}
                              modalHeader="REGISTRATION"
                              imgSrc="assets/icons/icons8-boarding-pass.svg"
                              imgsrcMouseOver="assets/icons/icons8-boarding-pass.svg"
                            />

                            <FileUpload
                              id={this.props.match.params.id}
                              filter={this.isRepair}
                              docType={"Repair"}
                              modalHeader="REPAIR RECORD"
                              imgSrc="assets/icons/icons8-maintenance.svg"
                              imgsrcMouseOver="assets/icons/icons8-maintenance.svg"
                            />

                            {this.props.truck.Condition === "Leased" ? (
                              <FileUpload
                                id={this.props.match.params.id}
                                filter={this.isLeaseAgreement}
                                docType={"LeaseAgreement"}
                                modalHeader="LEASE AGREEMENT"
                                imgSrc="assets/icons/icons8-agreement.svg"
                                imgsrcMouseOver="assets/icons/icons8-agreement.svg"
                              />
                            ) : (
                              <div></div>
                            )}
                            <FileUpload
                              id={this.props.match.params.id}
                              filter={this.isRoadsideInspections}
                              docType={"Roadside Inspection"}
                              modalHeader="ROADSIDE INSPECTIONS"
                              imgSrc="assets/icons/icons8-test-passed.svg"
                              imgsrcMouseOver="assets/icons/icons8-test-passed.svg"
                            />
                          </div>
                        </TabPane>
                        {/*DASHBOARD*/}
                        <TabPane tabId="2">
                          <Details id={this.props.match.params.id} />
                        </TabPane>
                        {/*INSPECTIONS*/}
                        <TabPane tabId="5">
                          <Inspections id={this.props.match.params.id} />
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
              this.props.truck.Id
            );
          }}
        />
      </React.Fragment>
    );
  }
}
export default connect(
  (state) => state.trucks,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Trucks);
