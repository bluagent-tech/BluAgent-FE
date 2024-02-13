import React from 'react';
import { Col, FormGroup, Badge, Label } from 'reactstrap';


export default class Example extends React.Component {
  
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">SAFETY LOADING <Badge color="primary">9</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Protection against shifting cargo</Label>
                        <select id="sla" name="Protection" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Part(s) of vehicle or condition of loading such that the spare tire or
                                                                    any part of the load or dunnage can fall onto the roadway</Label>
                        <select id="slb" name="PatsVehicleConditions" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <button type="button" className={'btn btn-secondary'} onClick={() => { this.props.previousStep() }}>Previous</button>
                    </Col>
                    <Col md="6">
                        <button type="button" style={{ float: 'right' }} className={'btn btn-primary'} onClick={() => { this.props.nextStep() }}>Next</button>
                    </Col>
                </FormGroup>
            </div>
        );
    }
}