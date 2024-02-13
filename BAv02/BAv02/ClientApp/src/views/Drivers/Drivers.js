import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Fade,
  Row,
  Nav,
  Button,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Drivers";
import Account from "./../../containers/Drivers/Account";
import Dashboard from "./../../containers/Drivers/Dashboard";
import Head from "./../../containers/Drivers/Head";
import ToastAlert from "./../../components/ToastAlert";
import { Link } from "react-router-dom";
const role = JSON.parse(localStorage.getItem("user")).Role;

class Drivers extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.activeSignature = this.activeSignature.bind(this)
    this.state = {
      activeTab: new Array(4).fill("1"),
      activeSignature : false,
    };
  }

  componentDidMount() {}

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.activeSignature(tab)
    this.setState({
      activeTab: newArray,
    });
  }

  activeSignature(tab) {
    if(tab === '2'){
      this.state.activeSignature = true;
    }else {
      this.state.activeSignature = false;
    }
    
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
                            DASHBOARD
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            id="2"
                            active={this.state.activeTab[0] === "2"}
                            onClick={() => {
                              this.toggle(0, "2");
                            }}
                          >
                            ACCOUNT
                          </NavLink>
                        </NavItem>
                        {role === "DRIVER" ? null : (
                          <NavItem>
                            <Link to="../../QualificationFile">
                              <Button className="btn buttons-royal text-white btn-min-width mr-1 mb-1">
                                Back
                              </Button>
                            </Link>
                          </NavItem>
                        )}
                      </Nav>
                      <TabContent activeTab={this.state.activeTab[0]}>
                        {/*DASHBOARD*/}
                        <TabPane tabId="1">
                          <Dashboard
                            id={this.props.match.params.id}
                            statusR={this.props.driver.Status}
                            toggleTab={this.toggle}
                          />
                        </TabPane>
                        {/*ACCOUNT*/}
                        <TabPane tabId="2">
                          <Account id={this.props.match.params.id} flag={this.state.activeSignature}/>
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
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Drivers);
