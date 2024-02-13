import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import HeadAlcohol from './head/head';
import classnames from 'classnames';

// Components
import RandomTestingAlcohol from './../../containers/Test/Modal/RandomTestingAlcohol';
import ScheduleTestData from './ScheduleTest/ScheduleTestData.js';
import AlcoholScheduleTest from './../../containers/Test/Modal/AlcoholScheduleTest';

export default function DashboardAlcohol() {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <HeadAlcohol />
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1');
                    }}
                  >
                    SCHEDULE TEST
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2');
                    }}
                  >
                    RANDOM TESTING
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <AlcoholScheduleTest />
                </TabPane>
                <TabPane tabId='2'>
                  <RandomTestingAlcohol />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
