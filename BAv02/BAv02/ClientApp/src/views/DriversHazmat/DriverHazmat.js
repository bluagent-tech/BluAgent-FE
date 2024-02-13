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
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Drivers";
import Head from "./../../containers/Drivers/Head";
import ToastAlert from "./../../components/ToastAlert";
import UploadDriversFilesHazmat from "./../../containers/Company/CompanyModal/FileUploadDriversHazmat";
import UploadDriversFilesHazmatCertificate from "./../../containers/Company/CompanyModal/FileUploadDriversTrainingCertificate";

const id = JSON.parse(localStorage.getItem("user")).Id;
var IdNumber = window.location.href.substr(
  window.location.href.lastIndexOf("/") + 1
);
const setDriverId = localStorage.setItem("driverId", IdNumber);

class DriverHazmat extends Component {
  /*    toggleInfo = (tabPane, tabIndex) => {
        this.props.toggleTab(tabPane, tabIndex);
    }*/
  //Hazmat Module Dashboard
  isTrainingCertificate = (file) => {
    return file.DocType.trim() === "TrainingCertificate";
  };

  isHazmatCDL = (file) => {
    return file.DocType.trim() === "HazmatCDL";
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill("1"),
    };
  }

  componentDidMount() {}

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
          {/* DRIVER */}
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
                            id="1"
                            active={this.state.activeTab[0] === "1"}
                            onClick={() => {
                              this.toggle(0, "1");
                            }}
                          >
                            HAZMAT DASHBOARD
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab[0]}>
                        {/*DASHBOARD*/}
                        <TabPane tabId="1">
                          <div className="mx-auto text-center">
                            <Row>
                              <Col md="3">
                                {/*<UploadDriversFilesHazmat 
                                  filter={this.isTrainingCertificate}
                                  docType="TrainingCertificate"
                                  IdNumber={IdNumber}
                                  modalHeader="TRAINING CERTIFICATE"
                                  imgSrc="/assets/icons/icons8-new-resume-template.svg"
                                  imgsrcMouseOver="/assets/icons/icons8-new-resume-template.svg"
                                  height="160"
                                  width="160"
                                  isDateExpire="TRUE"
                                />*/}
                                <UploadDriversFilesHazmatCertificate
                                  filter={this.isTrainingCertificate}
                                  docType="TrainingCertificate"
                                  IdNumber={IdNumber}
                                  modalHeader="TRAINING CERTIFICATE"
                                  imgSrc="/assets/icons/icons8-new-resume-template.svg"
                                  imgsrcMouseOver="/assets/icons/icons8-new-resume-template.svg"
                                  height="160"
                                  width="160"
                                  isDateExpire="TRUE"
                                  toggleDeleteModal={this.toggleDeleteModal}
                                />
                              </Col>
                              <Col md="3">
                                <UploadDriversFilesHazmat
                                  filter={this.isHazmatCDL}
                                  docType="HazmatCDL"
                                  IdNumber={IdNumber}
                                  modalHeader="CDL HAZMAT"
                                  imgSrc="/assets/icons/icons8-new-resume-template.svg"
                                  imgsrcMouseOver="/assets/icons/icons8-new-resume-template.svg"
                                  height="160"
                                  width="160"
                                  isDateExpire="TRUE"
                                  toggleDeleteModal={this.toggleDeleteModal}
                                />
                              </Col>
                            </Row>
                          </div>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(DriverHazmat);
