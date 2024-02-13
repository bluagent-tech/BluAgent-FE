import React from 'react';
import { Col, FormGroup, Badge, Label } from 'reactstrap';



export default class Example extends React.Component {
    
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">STEERING MECHANISM <Badge color="primary">10</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Steering wheel free play</Label>
                        <select id="msa" name="WheelFreePlay" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Steering column</Label>
                        <select id="msb" name="SteeringColumn" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Steering system</Label>
                        <select id="msc" name="SteeringSystem" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Steering gear box</Label>
                        <select id="msd" name="SteeringGearBox" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Pitman Arm</Label>
                        <select id="mse" name="PitmanSteering" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Power Steering</Label>
                        <select id="msf" name="msf" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Ball and drag links</Label>
                        <select id="msg" name="BallDragLinks" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>

                        <Label htmlFor="text-input">Tie rods drag links</Label>
                        <select id="msh" name="TieRodsDragLinks" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Nuts</Label>
                        <select id="msi" name="Nuts" className="form-control">
                            <option value="Ok">Ok</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Repair">Repair</option>
                        </select>
                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Front axle beam and ALL steering components other than steering column</Label>
                        <select id="msj" name="FrontAxleBean" className="form-control">
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