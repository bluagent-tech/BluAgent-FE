import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/DrugAndAlcoholTesting";
import { Row, Col, Label, Input, Button } from "reactstrap";
import Signature from "../../Signature";
var currentDate = new Date();

class SignatureSection extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onchangeDate = this.onchangeDate.bind(this);

    this.state = {
      collectorConfirmation: false,
      driverConfirmation: false,
    };
  }

  onchangeDate(e) {
    console.log('onChange Name >>>', e.target.name);
  }

  onChangeHandler(e) {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  }

  render() {
    return (
      <React.Fragment>
        <Row className="d-flex justify-content-between container">
          <Signature
            signature={`https://bluagent-files.s3-us-west-2.amazonaws.com/Collectors/AlcoholTestSignatures/${this.props.testNumber}/CollectorSignature.png`}
            signatureStatus={this.props.collectorSignature}
            scheduledID={this.props.alcoholScheduleData.Id}
            specimenNumber={this.props.testNumber}
            LabelText="Technician Signature*"
          />

          <Signature
            signature={`https://bluagent-files.s3-us-west-2.amazonaws.com/Collectors/AlcoholTestSignatures/${this.props.testNumber}/DonorSignature.png`}
            signatureStatus={this.props.donorSignature}
            scheduledID={this.props.scheduleData.Id}
            specimenNumber={this.props.testNumber}
            LabelText="Donor's Signature*"
          />
        </Row>
        <br />
        <Row>
          <Col sm="6">
            {this.props.collectorSignature !== "" ? (
              <React.Fragment>
                <Row style={{ marginLeft: "5px" }}>
                  <Label htmlFor="text-input">
                    Date and Time of Collection
                  </Label>
                </Row>
                <Input
                  style={{ width: "30%" }}
                  className="form-control"
                  type="datetime"
                  name="DateTimeCollectionCollector"
                  disabled
                  onChange={this.onchangeDate}
                  value={
                    currentDate.getMonth() +
                    1 +
                    "/" +
                    currentDate.getDate() +
                    "/" +
                    currentDate.getFullYear() +
                    " " +
                    currentDate.getHours() +
                    ":" +
                    currentDate.getMinutes()
                  }
                />
              </React.Fragment>
            ) : (
              ""
            )}
          </Col>
          <Col sm="6">
            {this.props.donorSignature !== "" ? (
              <React.Fragment>
                <Row style={{ marginLeft: "5px" }}>
                  <Label htmlFor="text-input">Date and Time of Donor</Label>
                </Row>
                <Input
                  style={{ width: "30%" }}
                  className="form-control"
                  type="datetime"
                  name="DateTimeCollectionDriver"
                  disabled
                  onChange={this.onchangeDate}
                  value={
                    currentDate.getMonth() +
                    1 +
                    "/" +
                    currentDate.getDate() +
                    "/" +
                    currentDate.getFullYear() +
                    " " +
                    currentDate.getHours() +
                    ":" +
                    currentDate.getMinutes()
                  }
                />
              </React.Fragment>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col sm="6">
            <Label>
              {this.props.collectorSignature !== "" ? (
                <Input
                  style={{ marginLeft: "5px" }}
                  type="checkbox"
                  name="collectorConfirmation"
                  onChange={this.onChangeHandler}
                />
              ) : (
                ""
              )}
              {this.props.collectorSignature !== "" ? (
                <span style={{ marginLeft: "20px" }}>
                  I hereby certify that all the information here is true to the
                  best of my knowledge
                </span>
              ) : (
                ""
              )}
            </Label>
          </Col>
          <Col sm="6">
            <Label check>
              {this.props.donorSignature !== "" ? (
                <Input
                  style={{ marginLeft: "5px" }}
                  type="checkbox"
                  name="driverConfirmation"
                  onChange={this.onChangeHandler}
                />
              ) : (
                ""
              )}
              {this.props.donorSignature !== "" ? (
                <span style={{ marginLeft: "20px" }}>
                  I hereby certify that I have explained the reasons for the
                  Drug Test
                </span>
              ) : (
                ""
              )}
            </Label>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col sm="6">
            {this.state.collectorConfirmation &&
              this.state.driverConfirmation ? (
              <Button type="submit" name="saveTest" color="success">
                Complete Collection
              </Button>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(SignatureSection);
