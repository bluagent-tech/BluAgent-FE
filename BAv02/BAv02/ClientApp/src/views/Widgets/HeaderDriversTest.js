import React, { Fragment } from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/DrugAndAlcoholTesting';
import DriverTestCompleted from './DriverTestCompleted';
import DriverTetsProcess from './DriverTestProcess';
import DriverTestReview from './DriverTestReview';

const idCompany = JSON.parse(localStorage.getItem("idCompany"));

class HeaderDriverTest extends React.Component {
  constructor(props) {
    super(props);
    this.RandomStats = this.RandomStats.bind(this);
  }
  componentDidMount() {
    this.RandomStats();
  }

  RandomStats() {
    var form = new FormData();
    form.append("idCompany", idCompany);
    this.props.getRandomStats(form);
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Col lg="4" sm="12" md="12">
            <Card style={{ height: '90%' }}>
              <CardBody>
                <DriverTestCompleted
                  processCompleted={this.props.scheduleTestComplete}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" sm="12" md="12">
            <Card style={{ height: '90%' }}>
              <CardBody>
                <DriverTetsProcess processTest={this.props.scheduleTestInProcess} />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" sm="12" md="12">
            <Card style={{ height: '90%' }}>
              <CardBody>
                <DriverTestReview porcent={this.props.Q1PercentageOfDrugtestDrivers+this.props.Q2PercentageOfDrugtestDrivers+this.props.Q3PercentageOfDrugtestDrivers+this.props.Q4PercentageOfDrugtestDrivers} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(HeaderDriverTest);
