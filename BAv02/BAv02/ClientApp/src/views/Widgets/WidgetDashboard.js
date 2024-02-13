import React, { Fragment } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
class WidgetDashboard {
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div class='mx-auto'></div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <div class='mx-auto'>
                  <h3>3</h3>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <div class='mx-auto'></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default WidgetDashboard;
