import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import Account from "./../../containers/User/Account";
import Head from "./../../containers/User/Head";
import Dashboard from "../../containers/User/Dashboard";

class Users extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill("1")
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="animated fadeIn">
          {/* DRIVER */}
          {/*LEVEL 1*/}
          <Row>
            <Head />
            {/*LEVEL 2*/}
            <Col sm="9">
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
                          ACCOUNT
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          active={this.state.activeTab[0] === "2"}
                          onClick={() => {
                            this.toggle(0, "2");
                          }}
                        >
                          DASHBOARD
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab[0]}>
                      {/*ACCOUNT*/}
                      <TabPane tabId="1">
                        <Account id={this.props.match.params.id} />
                      </TabPane>
                      {/*DASHBOARD*/}
                      <TabPane tabId="2">
                        <Dashboard id={this.props.match.params.id} />
                      </TabPane>
                    </TabContent>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;
