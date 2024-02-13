import React from 'react';
import { Col, FormGroup, Badge, Label } from 'reactstrap';



export default class Example extends React.Component {
   
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">SUSPENSION <Badge color="primary">11</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Torque, radius, or tracking components</Label>
                        <select id="msua" name="TurqueRadius" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Spring assembly</Label>
                        <select id="msub" name="SpringAssembly" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Any U-bolt(s),spring hanger(s),or other axle positioning part(s) cracked, briken, loose or
                                                                    missing resulting in shifting of an axle from its normal position</Label>
                        <select id="msuc" name="AxlePositioning" className="form-control">
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