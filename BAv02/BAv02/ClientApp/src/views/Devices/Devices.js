import React, { Fragment, useState } from "react";
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

import TabbAdd from "./TabAdd";
import TabDevice from "./TabDevice";

// Main component that displays tabs for adding devices and showing a device list
const Devices = () => {
  const [activeTab, setActiveTab] = useState("1"); // State to control the active tab

  // Function to toggle the active tab
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div className="animated fadeIn">
            <Card>
              <CardBody>
                <Col>
                  <Nav tabs>
                    {/* "ADD" tab */}
                    <NavItem>
                      <NavLink
                        active={activeTab === "1"} // Determines if the tab is active or not
                        onClick={() => toggleTab("1")} // Changes the active tab on click
                      >
                        ADD
                      </NavLink>
                    </NavItem>
                    {/* "DEVICES" tab */}
                    <NavItem>
                      <NavLink
                        active={activeTab === "2"} // Determines if the tab is active or not
                        onClick={() => toggleTab("2")} // Changes the active tab on click
                      >
                        DEVICES
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    {/* Content of the "ADD" tab */}
                    <TabPane tabId="1">
                      <Row>
                        <Col xs="12">
                          <TabbAdd />
                        </Col>
                      </Row>
                    </TabPane>
                    {/* Content of the "DEVICES" tab */}
                    <TabPane tabId="2">
                      <Row>
                        <Col xs="12">
                          <TabDevice />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Devices;
