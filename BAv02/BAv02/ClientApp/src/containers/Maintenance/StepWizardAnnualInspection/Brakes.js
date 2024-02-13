import React from "react";
import { Col, FormGroup, Label, Badge } from "reactstrap";

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="text-input" className="text-primary">
              BRAKES SYSTEM <Badge color="primary">2</Badge>
            </Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            BrakeHose
            <Label htmlFor="text-input">Service Brakes</Label>
            <select id="bsa" name="ServiceBrakes" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
            <Label htmlFor="text-input">Parking Brake System</Label>
            <select id="bsb" name="ParkingBrakeSystem" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
          <Col md="6">
            <Label htmlFor="text-input">Brake Drums or Rotors</Label>
            <select id="bsc" name="BrakeDrums" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>

            <Label htmlFor="text-input">Brake Hose</Label>
            <select id="bsc" name="BrakeHose" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="text-input">Brake Tubing</Label>
            <select id="bse" name="BrakeTubing" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>

            <Label htmlFor="text-input">Low Pressure Warning Device</Label>
            <select id="bsf" name="LowPressure" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
          <Col md="6">
            <Label htmlFor="text-input">Tractor Protection Valve</Label>
            <select id="bsg" name="TractorProtection" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>

            <Label htmlFor="text-input">Air Compressor</Label>
            <select id="bsh" name="AirCompressor" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <Label htmlFor="text-input">Electric Brakes</Label>
            <select id="bsi" name="bsi" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>

            <Label htmlFor="text-input">Hydraulic Brakes</Label>
            <select id="bsj" name="HydraulicBrakes" className="form-control">
              <option value="Ok">Ok</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Repair">Repair</option>
            </select>
          </Col>
          <Col md="6">
            <Label htmlFor="text-input">Vacuum System</Label>
            <select id="bsk" name="VaccumSystem" className="form-control">
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
