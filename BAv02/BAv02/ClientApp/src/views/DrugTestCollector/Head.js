import React, { Component, lazy } from "react";
import { Col, Row, CardBody, Card } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/DrugAndAlcoholTesting";
const CollectorCompleted = lazy(() =>
  import("../../views/Widgets/CollectorCompleted")
);
const CollectorInitiated = lazy(() =>
  import("../../views/Widgets/CollectorInitiated")
);
const CollectorScheduled = lazy(() =>
  import("../../views/Widgets/CollectorScheduled")
);

//HEAD DASHBOARD collector

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = { Text: "" };
  }
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
                    (tests) =>
                      tests.Status === "Collection Completed" &&
                      tests.TypeTest === "Drug"
                  ).length
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
                  tests.filter(
                    (tests) =>
                      tests.Status === "Scheduled" && tests.TypeTest === "Drug"
                  ).length
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
                    (tests) =>
                      tests.Status === "Collection Initiated" &&
                      tests.TypeTest === "Drug"
                  ).length
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
export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Head);
