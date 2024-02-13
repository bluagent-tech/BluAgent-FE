import React from "react";
import { Col, FormGroup, Label, Badge } from "reactstrap";

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="text-input" className="text-primary">
              COUPLING DEVICE <Badge color="primary">4</Badge>
            </Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="text-input">Fifth Wheels</Label>
            <select id="mca" name="FifthWheels" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>

            <Label htmlFor="text-input">Pintle Hooks</Label>
            <select id="mcb" name="PrintieHooks" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
          <Col md="6">
            <Label htmlFor="text-input">Drawbar/Towbar Eye</Label>
            <select id="mcd" name="mcd" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>

            <Label htmlFor="text-input">Drawbar/Towbar Tongue</Label>
            <select id="mce" name="mce" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="text-input">Safety Devices</Label>
            <select id="mcf" name="SafetyDevices" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
          <Col md="6">
            <Label htmlFor="text-input">Saddle-Mounts</Label>
            <select id="mcg" name="SaddleMounts" className="form-control">
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
              Previous
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
