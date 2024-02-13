import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Fade,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
} from "reactstrap";
import AccountInfo from "./AccountInfo";
import Users from "./Users";
import Payments from "./Payments";
import HeaderWidgetsPanel from "./../../containers/Company/headerWidgetsPanel";
import Dashboard from "./Dashboard";
import Hazmat from "./Hazmat";
import ToastAlert from "./../../components/ToastAlert";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";
import Loading from "../../components/Loading";
const id = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = localStorage["idCompany"];
class AccountSettings extends Component {
  constructor() {
    super();
    this.state = { 
    activeTab: "1", 
    collapse: true, 
    fadeIn: true, 
    timeout: 300,
  };

    this.toggle = this.toggle.bind(this);

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      if(tab === '3'){
        this.props.resizeSignature(true)
      }else {
        this.props.resizeSignature(false)
      }
      
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  // updateCompanyNotifications(e) {
  //   console.log("EVENTO>>>>>>>>>>>>>");
  //   e.preventDefault();
  //   e.stopPropagation();
  //   this.props.updateCompanyNotifications(112);
  //   // var company = new FormData(e.target);
  //   // company.append("idu", id);
  //   // company.append("mailing", addressDifferent);
  //   // this.props.saveDataCompany(company);
  //   // this.props.getMCS150FormData(id);
  // }

  UNSAFE_componentWillMount() {
    this.props.getCompanyNotifications(idCompany);
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
          <HeaderWidgetsPanel />
          {/* Account Settings */}
          {/*LEVEL 1*/}
          <Row>
            <Col xs="12">
              <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                <Card>
                  <CardBody>
                    <Col>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab === "1"}
                            onClick={() => {
                              this.toggle("1"),
                              this.UNSAFE_componentWillMount();
                            }}
                          >
                            DASHBOARD
                          </NavLink>
                        </NavItem>

                        {
                        // this.props.company.CarrierOperation === undefined ||
                        this.props.company.CarrierOperation === "B" ||
                        this.props.company.CarrierOperation === "D" ||
                        this.props.company.CarrierOperation === "E" ? (
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab === "2"}
                              onClick={() => {
                                this.toggle("2");
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
                            active={this.state.activeTab === "3"}
                            onClick={() => {
                              this.toggle("3");                     
                            }}
                          >
                            ACCOUNT
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab === "4"}
                            onClick={() => {
                              this.toggle("4");
                            }}
                          >
                            USERS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab === "5"}
                            onClick={() => {
                              this.state.resize = true;
                              this.toggle("5");
                            }}
                          >
                            PAYMENTS
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <Dashboard
                            ReduxProps={this.props}
                            toggleTab={this.toggle}
                          />
                        </TabPane>
                        <TabPane tabId="2">
                          <Hazmat />
                        </TabPane>
                        <TabPane tabId="3">
                          <AccountInfo />
                        </TabPane>
                        <TabPane tabId="4">
                          <Users />
                        </TabPane>
                        <TabPane tabId="5">
                          <Payments
                            customerId={this.props.company.CustomerId}
                          />
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
)(AccountSettings);
