import React, {Component, lazy} from "react";
import {Col, Row, CardBody, Card} from "reactstrap";
const CollectorCompleted = lazy(() => import("../Widgets/CollectorCompleted"));
const CollectorInitiated = lazy(() => import("../Widgets/CollectorInitiated"));
const CollectorScheduled = lazy(() => import("../Widgets/CollectorScheduled"));

class AlcoholHead extends Component {
  render() {
    var tests = this.props.providerDrugTest;

    return (
      <Row>
        <Col xs="12" sm="6" lg="4">
          <Card>
            <CardBody>
              <CollectorCompleted
                icon="fa fa-bar-chart"
                bColor="primary"
                value="100"
                header={
                  tests.filter(
                    (tests) => tests.Status === "Collection Completed"
                  ).length.toString()
                }
                title="Completed Collections"
              />
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card>
            <CardBody>
              <CollectorInitiated
                icon="fa fa-clock-o"
                bColor="cyan"
                value="100"
                header={
                  tests.filter((tests) => tests.Status === "Scheduled").length.toString()
                }
                title="Scheduled Collections"
              />
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card>
            <CardBody>
              <CollectorScheduled
                icon="fa fa-eye"
                bColor="info"
                header={
                  tests.filter(
                    (tests) => tests.Status === "Collection Initiated"
                  ).length.toString()
                }
                value="100"
                title="Collection Initiated"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AlcoholHead;
