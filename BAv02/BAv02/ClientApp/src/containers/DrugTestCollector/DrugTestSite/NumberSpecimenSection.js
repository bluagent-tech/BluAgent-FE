import React, { Component } from "react";
import { Label, Input, FormFeedback, Col, Row, FormGroup } from "reactstrap";
import IdentificationSection from "./IdentificationSection";

class NumberSpecimenSection extends Component {
  constructor(props) {
    super(props);
    this.validateNumberSpecimen = this.validateNumberSpecimen.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.state = {
      specimen: "",
      confirmSpecimen: "",
      invalid: false,
      valid: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.number !== prevProps.number) {
      if (this.props.number) {
        document.getElementById("specimen").value = this.props.number;
        document.getElementById("confirmSpecimen").value = this.props.number;
        this.setState({ specimen: this.props.number });
        this.setState({ confirmSpecimen: this.props.number });
      }
    }
  }

  validateNumberSpecimen(e) {
    e.preventDefault();
    if (this.state.specimen !== "" || this.state.confirmSpecimen !== "") {
      if (this.state.specimen !== this.state.confirmSpecimen) {
        this.setState({ invalid: true });
        this.setState({ valid: false });
      } else {
        this.setState({ valid: true });
        this.setState({ invalid: false });
      }
    }
  }

  onChangeHandler(e) {
    e.preventDefault();
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="6">
            <Label for="SpecimenNumber">Enter Number Specimen *</Label>
            <Input
              id="specimen"
              onChange={this.onChangeHandler}
              onBlur={this.validateNumberSpecimen}
              disabled={this.props.number ? true : false}
              required
            />
          </Col>
          <Col sm="6">
            <Label for="confirmSpecimen">Confirm Number Specimen *</Label>
            <Input
              id="confirmSpecimen"
              name="SpecimenNumber"
              onBlur={this.validateNumberSpecimen}
              onChange={this.onChangeHandler}
              invalid={this.state.invalid}
              valid={this.state.valid}
              disabled={this.props.number ? true : false}
              required
            />
            <FormFeedback>The Specimen Numbers Doesn't match</FormFeedback>
          </Col>
        </Row>
        <FormGroup>
          <IdentificationSection specimenNumber={this.state.confirmSpecimen} />
        </FormGroup>
      </React.Fragment>
    );
  }
}

export default NumberSpecimenSection;
