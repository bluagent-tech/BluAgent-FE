import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';

class DriverTestProcess extends React.Component {

  render() {
    return (
      <Fragment>
        <div className="text-right">
          <img
            height="30"
            src="assets/icons/icons8-test-tube.svg"
            alt="notification-icon"
          />
        </div>
        <div className="text-center text-header-widget panels-text">
          {this.props.processTest > 0 ? this.props.processTest : "0"}
        </div>
        <div>
          <Row>
            <Col>
              <div
                style={{position: "relative"}}
                className="text-muted text-uppercase font-weight-bold"
              >
                Test in Process
              </div>
            </Col>
            {/* <Col>
              <div className="text-right">
                <button className="btn btn-warning text-white hide">
                  Needs Work
                </button>
              </div>
            </Col> */}
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default DriverTestProcess;
