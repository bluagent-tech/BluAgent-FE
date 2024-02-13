import React from 'react';
import { Col, FormGroup, Badge, Label } from 'reactstrap';


export default class Example extends React.Component {
 
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">WINDSHIELD WIPERS <Badge color="primary">16</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Any power unit that has an inoperative wiper,or missing or
                                                                    damaged parts that render it ineffective</Label>
                        <select id="bwa" name="WindShieldWipersStatus" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">List any other condition which may prevent safe operation if this vehicle</Label>
                        <select id="bwb" name="WindShieldWipersOtherStatus" className="form-control">
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