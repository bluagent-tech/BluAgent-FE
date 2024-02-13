import React, { Component } from "react";

//Images
import support from "../../assets/icons/icons8-customer-support-80.png";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  Col,
  Fade,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

// Redux Imports
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/Maintenance";

// General Components
import ToastAlert from "./../../components/ToastAlert";

// Inspections Components
import Inspections from "../../containers/Maintenance/Inspections";

// Wizard Inspections Component
import StepWizard from "./../../components/StepWizard";

// Steps Wizard Inspections Order 1 to Last Step ....
import Start from "./../../containers/Maintenance/StepWizardAnnualInspection/Start";
import Brakes from "./../../containers/Maintenance/StepWizardAnnualInspection/Brakes";
import Parts from "./../../containers/Maintenance/StepWizardAnnualInspection/Parts";
import CoupliDevice from "./../../containers/Maintenance/StepWizardAnnualInspection/CoupliDevice";
import ExahustSystem from "./../../containers/Maintenance/StepWizardAnnualInspection/ExahustSystem";
import FuelSystem from "./../../containers/Maintenance/StepWizardAnnualInspection/FuelSystem";
import LightingDevices from "./../../containers/Maintenance/StepWizardAnnualInspection/LightingDevices";
import SafetyEquipment from "./../../containers/Maintenance/StepWizardAnnualInspection/SafetyEquipment";
import SafetyLoading from "./../../containers/Maintenance/StepWizardAnnualInspection/SafetyLoading";
import SteeringMechanism from "./../../containers/Maintenance/StepWizardAnnualInspection/SteeringMechanism";
import Suspension from "./../../containers/Maintenance/StepWizardAnnualInspection/Suspension";
import Frame from "./../../containers/Maintenance/StepWizardAnnualInspection/Frame";
import Tires from "./../../containers/Maintenance/StepWizardAnnualInspection/Tires";
import WheelsAndRims from "./../../containers/Maintenance/StepWizardAnnualInspection/WheelsAndRims";
import WindshieldGlazing from "./../../containers/Maintenance/StepWizardAnnualInspection/WindshieldGlazing";
import WindshieldWipers from "./../../containers/Maintenance/StepWizardAnnualInspection/WindshieldWipers";
import Heating from "./../../containers/Maintenance/StepWizardAnnualInspection/Heating";
import Finish from "./../../containers/Maintenance/StepWizardAnnualInspection/Finish";

// Components General
import Trailers from "./../../containers/Maintenance/Trailers";
import Trucks from "./../../containers/Maintenance/Trucks";
import WorkOrder from "./../../containers/Maintenance/WorkOrder";
import BrakeInspectorCertificate from "./../../containers/Maintenance/BrakeInspectorCertificate";
import AIMedia from "../AICamera/AIMedia";
import Camera from "../AICamera/Camera";
import CameraStatus from "../Widgets/CameraStatus";
import CameraAlerts from "../Widgets/CameraAlerts";
import CameraVehicles from "../Widgets/CameraVehicles";
import ActiveVehicles from "../Widgets/ActiveVehicles";
import VehicleNotifications from "../Widgets/VehicleNotifications";
import ActiveTrailers from "../Widgets/ActiveTrailers";
import TrailerNotification from "../Widgets/TrailerNotification";

const pageSectionsArray = [
  <Start key={1} />,
  <Brakes key={2} />,
  <Parts key={3} />,
  <CoupliDevice key={4} />,
  <ExahustSystem key={5} />,
  <FuelSystem key={6} />,
  <LightingDevices key={7} />,
  <SafetyEquipment key={8} />,
  <SafetyLoading key={9} />,
  <SteeringMechanism key={10} />,
  <Suspension key={11} />,
  <Frame key={12} />,
  <Tires key={13} />,
  <WheelsAndRims key={14} />,
  <WindshieldGlazing key={15} />,
  <WindshieldWipers key={16} />,
  <Heating key={17} />,
  <Finish key={18} />,
];

const pageSectionsBusArray = [
  <Start key={1} />,
  <Brakes key={2} />,
  <Parts key={3} />,
  <CoupliDevice key={4} />,
  <ExahustSystem key={5} />,
  <FuelSystem key={6} />,
  <LightingDevices key={7} />,
  <SafetyEquipment key={8} />,
  <SafetyLoading key={9} />,
  <SteeringMechanism key={10} />,
  <Suspension key={11} />,
  <Frame key={12} />,
  <Tires key={13} />,
  <WheelsAndRims key={14} />,
  <WindshieldGlazing key={15} />,
  <WindshieldWipers key={16} />,
  <Heating key={17} />,
  <Finish key={18} />,
];

const idUser = JSON.parse(localStorage.getItem("user")).Id;
const haceCameraService = JSON.parse(localStorage.getItem("cameraService"));

class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggleInspectionModal = this.toggleInspectionModal.bind(this);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      activeTab: new Array(5).fill("1"),
      activeTab1: new Array(2).fill("1"),
      activeTab2: new Array(2).fill("1"),
      inspectionModalOpen: false,
      isBus: false,
      idVehicle: 0,
      vehicleType: "",
      prevUrl: "",
      flagUrl: false,
      cardPackage: 1,
      hasCameraService: false,
    };
  }

  isBrakeInspectorCertificate = (file) => {
    return file.DocType.trim() === "BrakeInspectorCertificate";
  };

  // componentDidMount() {
  //   this.props.getTrucks(idUser, 1, 1000, true)
  //   this.props.getTrailers(idUser, 1, 1000, true)

  // }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  toggle1(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    // console.log(newArray, tab, tabPane);
    this.setState({
      activeTab: newArray,
      cardPackage: tab,
    });
  }

  toggle2(tabPane, tab) {
    const newArray = this.state.activeTab1.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab1: newArray,
    });
  }
  toggle3(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab2: newArray,
    });
  }
  toggleInspectionModal(bus, vehicleType, idVehicle) {
    this.setState({
      inspectionModalOpen: !this.state.inspectionModalOpen,
      isBus: bus,
      idVehicle: idVehicle,
      vehicleType: vehicleType,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (haceCameraService !== prevState.hasCameraService) {
      this.setState({ hasCameraService: haceCameraService });
    }
  }

  render() {
    if (this.props.location.state !== undefined) {
      this.state.prevUrl = this.props.location.state.prevUrl;
      if (this.state.prevUrl === true && this.state.flagUrl === false) {
        this.state.flagUrl = true;
        this.toggle1(0, "2");
      }
    }

    var vehicleCardPackage = () => {
      return (
        <>
          <Col xs="12" sm="6" lg="16">
            <ActiveVehicles />
          </Col>

          <Col xs="12" sm="6" lg="16">
            <VehicleNotifications />
          </Col>
        </>
      );
    };

    var trailerCardPackage = () => {
      return (
        <>
          <Col xs="12" sm="6" lg="6">
            <ActiveTrailers />
          </Col>
          <Col xs="12" sm="6" lg="6">
            <TrailerNotification />
          </Col>
        </>
      );
    };

    var aiMediaCardPackage = () => {
      return (
        <>
          <Col xs="12" sm="4" lg="4">
            <CameraVehicles />
          </Col>
          <Col xs="12" sm="4" lg="4">
            <CameraAlerts />
          </Col>
          <Col xs="12" sm="4" lg="4">
            <CameraStatus />
          </Col>
        </>
      );
    };

    var packageCards = () => {
      var tab = this.state.cardPackage;
      if (tab == 1) {
        return vehicleCardPackage();
      }
      if (tab == 2) {
        return trailerCardPackage();
      }
      if (this.state.hasCameraService) {
        if (tab == 6 || tab == 7) {
          return aiMediaCardPackage();
        }
      } else {
        return vehicleCardPackage();
      }
      // return vehicleCardPackage();
    };

    const SupportComponent = () => {
      return <div className="d-flex flex-column justify-content-center align-items-center mt-4 mb-4">
      <img
        className="mb-2"
        src={support}
        width={"100px"}
        alt="Support"
      />
      <p
        className="font-weight-bold"
        style={{ color: "#4788C7" }}
      >
        Upgrade Your Plan And You'll Be Able To Enjoy
        this New Functionality
      </p>
      <p
        className="font-weight-bold"
        style={{ color: "#4788C7" }}
      >
        Contact{" "}
        <a href="mailto:Support@Bluagent.com">
          Support@Bluagent.com
        </a>{" "}
        To Get It
      </p>
    </div>
    }
    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <div className="animated fadeIn">
          {/*CARD*/}
          <Row>
            {packageCards()}
          </Row>
          {/*TABS*/}
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
                              this.toggle1(0, "1");
                            }}
                          >
                            VEHICLES
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "2"}
                            onClick={() => {
                              this.toggle1(0, "2");
                            }}
                          >
                            TRAILERS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "3"}
                            onClick={() => {
                              this.toggle1(0, "3");
                            }}
                          >
                            INSPECTION
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "4"}
                            onClick={() => {
                              this.toggle1(0, "4");
                            }}
                          >
                            WORK ORDERS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "5"}
                            onClick={() => {
                              this.toggle1(0, "5");
                            }}
                          >
                            CERTIFICATE
                          </NavLink>
                        </NavItem>
                        <>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "6"}
                              onClick={() => {
                                this.toggle1(0, "6");
                              }}
                            >
                              AI MEDIA
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "7"}
                              onClick={() => {
                                this.toggle1(0, "7");
                              }}
                            >
                              CAMERA
                            </NavLink>
                          </NavItem>
                        </>
                      </Nav>

                      <TabContent activeTab={this.state.activeTab[0]}>
                        {/*TRUCKS*/}
                        <TabPane tabId="1">
                          <Row>
                            <Col xs="12">
                              <Trucks
                                toggleInspectionModalProp={
                                  this.toggleInspectionModal
                                }
                                inactiveMode={false}
                                hasCameraService={this.state.hasCameraService}
                              />
                            </Col>
                          </Row>
                        </TabPane>
                        {/*TRAILERS*/}
                        <TabPane tabId="2">
                          <Row>
                            <Col xs="12">
                              <Trailers
                                toggleInspectionModalProp={
                                  this.toggleInspectionModal
                                }
                                inactiveMode={false}
                              />
                            </Col>
                          </Row>
                        </TabPane>
                        {/*INSPECTIONS*/}
                        <TabPane tabId="3">
                          <Inspections />
                        </TabPane>
                        {/*WORKS*/}
                        <TabPane tabId="4">
                          <WorkOrder />
                        </TabPane>
                        <TabPane tabId="5">
                          <BrakeInspectorCertificate
                            filter={this.isBrakeInspectorCertificate}
                            docType={"BrakeInspectorCertificate"}
                          />
                        </TabPane>
                        {/*  AI MEDIA TAB */}
                        <TabPane tabId="6">
                          {this.state.hasCameraService ? (
                            <AIMedia />
                          ) : (
                            <SupportComponent/>
                          )}
                        </TabPane>
                        {/*  CAMERA TAB */}
                        <TabPane tabId="7">
                          {this.state.hasCameraService ? (
                            <Camera />
                          ) : <SupportComponent/>}
                        </TabPane>
                      </TabContent>
                    </Col>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          </Row>
          <StepWizard
            vehicleType={this.state.vehicleType}
            idVehicle={this.state.idVehicle}
            submit={this.props.createInspection}
            openState={this.state.inspectionModalOpen}
            modalTitle={"VEHICLE INSPECTION"}
            modalClass={"modal-lg"}
            modalToggle={this.toggleInspectionModal}
            pagesSections={
              this.state.isBus === false
                ? pageSectionsArray
                : pageSectionsBusArray
            }
          />
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  (state) => state.maintenance,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Maintenance);
