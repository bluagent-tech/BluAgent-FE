import React from 'react';
import { Col, FormGroup, Badge, Label } from 'reactstrap';


export default class Example extends React.Component {
  
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">SAFETY EQUIPMENT <Badge color="primary">8</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Fire Extinguisher</Label>
                        <select id="sea" name="FireExtingrisher" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Flags-Flares-Fuses</Label>
                        <select id="seb" name="FlagsFlares" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>

                    <Col md="6">
                        <Label htmlFor="text-input">Spare bulbs & fuses</Label>
                        <select id="sec" name="SpareBulbs" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Spare seal beam</Label>
                        <select id="seb" name="SpareSealBeam" className="form-control">
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