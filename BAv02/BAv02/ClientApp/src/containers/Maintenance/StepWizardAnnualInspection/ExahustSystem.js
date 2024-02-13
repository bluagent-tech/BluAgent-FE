import React from 'react';
import { Col, FormGroup, Label, Badge } from 'reactstrap';



export default class Example extends React.Component {
    
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">EXHAUST SYSTEM <Badge color="primary">5</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>

                    <Col md="6">
                        <Label htmlFor="text-input">Any exhaust system determined to be leaking ot a point forward of or directly below the driver/sleeper compartment</Label>
                        <select id="mea" name="mea" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">A bus exhaust system leaking or discharging to the atmosphere in violation of standards</Label>
                        <select id="meb" name="meb" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                    </Col>
                    <Col md="12">
                        <Label htmlFor="text-input">No part of the exhaust system of any motor vehicle shall be so located as would be likely to result in burning,charring,
                                                                    or damaging the electrical wiring,the fuel supply,or any combustible part of the motor vehicle</Label>
                        <select id="mec" name="mec" className="form-control">
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