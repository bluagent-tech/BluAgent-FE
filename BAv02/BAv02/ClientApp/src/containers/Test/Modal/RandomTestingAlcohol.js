import React from "react";
import {FormGroup, Col} from "reactstrap";

import WidgetAlcohol from "../../../views/Widgets/WidgetAlcohol";

class RandomTestingAlcohol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      q1Completed: false,
      q2Completed: false,
      q3Completed: false,
      q4Completed: false,
    };
  }

  quarterValidation = () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 3) {
      this.state = {
        q1Completed: false,
        q2Completed: false,
        q3Completed: false,
        q4Completed: false,
      };
    } else if (month >= 4 && month <= 6) {
      this.state = {
        q1Completed: true,
        q2Completed: false,
        q3Completed: false,
        q4Completed: false,
      };
    } else if (month >= 7 && month <= 9) {
      this.state = {
        q1Completed: true,
        q2Completed: true,
        q3Completed: false,
        q4Completed: false,
      };
    } else if (month >= 10 && month <= 12) {
      this.state = {
        q1Completed: true,
        q2Completed: true,
        q3Completed: true,
        q4Completed: false,
      };
    } else {
      this.state = {
        q1Completed: false,
        q2Completed: false,
        q3Completed: false,
        q4Completed: false,
      };
    }
  };

  render() {
    this.quarterValidation();

    return (
      <div className="container">
        <div>
          <label
            style={{
              color: "#007bff",
              textAlign: "left",
              fontWeight: "500",
              fontSize: "larger",
            }}
          >
            Alcohol Testing Quarters:
          </label>
        </div>
        <FormGroup row>
          <Col md="3">
            <WidgetAlcohol
              quarter="1"
              children="Progress 0/0"
              color="success"
              title="Quarter 1: Jan 1 - March 31"
              quarterCompleted={this.state.q1Completed}
            ></WidgetAlcohol>
          </Col>
          <Col md="3">
            <WidgetAlcohol
              quarter="2"
              children="Progress 0/0"
              color="success"
              title="Quarter 2: April 1 - June 30"
              quarterCompleted={this.state.q2Completed}
            ></WidgetAlcohol>
          </Col>
          <Col md="3">
            <WidgetAlcohol
              quarter="3"
              children="Progress 0/1"
              color="success"
              title="Quarter 3: July 1 - Sept 30"
              quarterCompleted={this.state.q3Completed}
            ></WidgetAlcohol>
          </Col>
          <Col md="3">
            <WidgetAlcohol
              quarter="4"
              children="Progress 0/0"
              color="success"
              title="Quarter 4: Oct 1 - Dec 31"
              quarterCompleted={this.state.q4Completed}
            ></WidgetAlcohol>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

export default RandomTestingAlcohol;
