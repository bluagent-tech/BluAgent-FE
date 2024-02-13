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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/DrugAndAlcoholTesting";
import DriverTest from "./../../containers/Test/Modal/DriverTest";
import DrugScheduleTest from "./../../containers/Test/Modal/DrugScheduleTest";
import RandomTesting from "./../../containers/Test/Modal/RandomTesting";
import Dashboard from "./Dashboard";
import HeaderDriverTest from "./../Widgets/HeaderDriversTest";
import AddDriverDrugTest from "./../../containers/Drivers/AddDriverDrugTesting/AddDriver";
import ToastAlert from "./../../components/ToastAlert";
import "../../assets/css/DrugAndAlcoholTesting.css";
import NonDriverTest from "../../containers/Test/Modal/NonDriverTest";

//DASHBOARD DRUG AND ALCOHOL TEST

class DashboardTest extends Component {
  constructor(props) {
    super(props);

    const split = props.location.search.split("?id=");
    const id = split[1] ? split[1] : "1";

    this.toggle1 = this.toggle1.bind(this);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      activeTab: new Array(4).fill(id),
      checked: true,
      isLoading: false,
      submitActiveTab: "1",
    };
  }

  setSubmitActiveTab(tab) {
    this.setState({
      submitActiveTab: tab,
    });
  }

  toggle1(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  componentDidUpdate(prevProps) {
    //this.toggle1(0, id);
  }

  render() {
    const { submitActiveTab } = this.state;
    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <HeaderDriverTest />
        <div className="animated fadeIn">
          {/*TABLE DRIVERS*/}
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
                            DASHBOARD
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "2"}
                            onClick={() => {
                              this.toggle1(0, "2");
                            }}
                            id="drivers"
                          >
                            DOT DRIVERS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "3"}
                            onClick={() => {
                              this.toggle1(0, "3");
                            }}
                          >
                            NON DOT DRIVERS
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "4"}
                            onClick={() => {
                              this.toggle1(0, "4");
                            }}
                          >
                            SCHEDULE TEST
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            active={this.state.activeTab[0] === "5"}
                            onClick={() => {
                              this.toggle1(0, "5");
                            }}
                          >
                            RANDOM TESTING
                          </NavLink>
                        </NavItem>
                      </Nav>

                      <TabContent activeTab={this.state.activeTab[0]}>
                        {/*DASHBOARD*/}
                        <TabPane tabId="1">
                          <Dashboard ReduxProps={this.props} />
                        </TabPane>
                        {/*DOT DRIVER*/}
                        <TabPane tabId="2">
                          <DriverTest />
                        </TabPane>
                        {/*NON DOT DRIVER*/}
                        <TabPane tabId="3">
                          <NonDriverTest />
                        </TabPane>
                        {/*DASHBOARD*/}
                        {/* <TabPane tabId="3">
                          <NonDriverTest />
                        </TabPane> */}
                        {/*Drug Schedule Test*/}
                        <TabPane tabId="4">
                          <DrugScheduleTest />
                        </TabPane>
                        {/* Random Testing */}
                        <TabPane tabId="5">
                          <RandomTesting />
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
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(DashboardTest);
