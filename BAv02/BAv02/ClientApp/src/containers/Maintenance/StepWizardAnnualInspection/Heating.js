import React from 'react';
import { Col, FormGroup, Badge, Label } from 'reactstrap';


export default class Example extends React.Component {
    
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">A/C HEATING <Badge color="primary">17</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Leaks</Label>
                        <select id="ha" name="Leaks" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Faulty gasket</Label>
                        <select id="hb" name="FaultyGasket" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>

                    <Col md="6">
                        <Label htmlFor="text-input">Worn hose</Label>
                        <select id="hc" name="WornHose" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Compressor</Label>
                        <select id="hd" name="Compressor" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Magnetic Clutch</Label>
                        <select id="he" name="MagneticClutch" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Refrigerant</Label>
                        <select id="hf" name="Refrigerant" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>

                    <Col md="6">
                        <Label htmlFor="text-input">Flushing contaminated</Label>
                        <select id="hg" name="FlushingContaminated" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">System recharging</Label>
                        <select id="hh" name="SystemRecharging" className="form-control">
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