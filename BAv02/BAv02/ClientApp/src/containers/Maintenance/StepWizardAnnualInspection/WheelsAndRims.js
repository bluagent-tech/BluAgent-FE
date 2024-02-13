import React from 'react';
import { Col, FormGroup, Badge, Label } from 'reactstrap';



export default class Example extends React.Component {
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">WHEELS AND RIMS <Badge color="primary">14</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Locks or side ring</Label>
                        <select id="twa" name="twa" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Wheels and rims</Label>
                        <select id="twb" name="WheelsAndRims" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Fasteners</Label>
                        <select id="twc" name="Fasteners" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Welds</Label>
                        <select id="twd" name="Welds" className="form-control">
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