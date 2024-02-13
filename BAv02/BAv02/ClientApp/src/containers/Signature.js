import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/DrugAndAlcoholTesting";
import { Col, Row, Button } from "reactstrap";
import SignaturePad from "react-signature-pad";
import "./signatureCSS.css";

class Signature extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    let signature = this.refs.mySignature;
    if (signature && this.props.LabelText === "Technician Signature*") {
      this.props.confirmCollectorSign(signature.toDataURL());
    } else {
      this.props.confirmDonorSign(signature.toDataURL());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.signatureStatus !== prevProps.signatureStatus) {
      if (this.props.signature !== "") {
        let signature = this.refs.mySignature;
        signature.refs.cv.style.pointerEvents = "none";
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ width: "300px"}}>
          <Row>
            <Col md="6">
              {this.props.LabelText ? (
                <label style={{ width: "300px"}}>{this.props.LabelText} </label>
              ) : (
                <label style={{ width: "300px"}}>Signature </label>
              )}
            </Col>
          </Row>
          <SignaturePad
            style={{ width: "150px", height: "300px" }}
            ref="mySignature"
            clearButton={this.props.signatureStatus === "" ? true : false}
          />
          <br />
          <Row>
            <Col sm="6">
              {this.props.signatureStatus === "" ? (
                <Button
                  onClick={this.onClick}
                  className="buttons-royal text-white"
                >
                  Confirm
                </Button>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Signature);
