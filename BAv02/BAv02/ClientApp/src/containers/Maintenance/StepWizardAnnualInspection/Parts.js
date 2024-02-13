import React from "react";
import { Col, FormGroup, Label, Badge } from "reactstrap";

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="text-input" className="text-primary">
              PARTS <Badge color="primary">3</Badge>
            </Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="text-input">Tachograph</Label>
            <select id="epa" name="Tacnograph" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
          <Col md="6">
            <Label htmlFor="text-input">Starter</Label>
            <select id="epb" name="Starter" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <button
              type="button"
              className={"btn btn-secondary"}
              onClick={() => {
                this.props.previousStep();
              }}
            >
              previous
            </button>
          </Col>
          <Col md="6">
            <button
              type="button"
              style={{ float: "right" }}
              className={"btn btn-primary"}
              onClick={() => {
                this.props.nextStep();
              }}
            >
              Next
            </button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}
