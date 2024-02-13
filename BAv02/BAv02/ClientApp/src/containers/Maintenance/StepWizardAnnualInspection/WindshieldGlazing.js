import React from 'react';
import { Col, FormGroup, Badge, Label } from 'reactstrap';


export default class Example extends React.Component {
    
    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">WINDSHIELD GLAZING <Badge color="primary">15</Badge></Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="12">
                        <Label htmlFor="text-input">Requirements and exceptions as stated pertaining to any crack,discoloration
                                                                    or vision reducing matter(reference 393.60 for exceptions)</Label>
                        <select id="bga" name="WindShieldGlazing" className="form-control">
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