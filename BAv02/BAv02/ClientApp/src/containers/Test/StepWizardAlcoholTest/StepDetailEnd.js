import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';


export default class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h6>Step 4 Alcohol Test Details</h6>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Reason For Scheduling</Label>
                        <Input type="select" id="reason" name="reason" />

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Donor For This Test</Label>
                        <Input type="text" id="donor" name="donor" />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Test Date</Label>
                        <Input type="select" id="tdate" name="tdate" />

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Test Expiry Date</Label>
                        <Input type="select" id="edate" name="edate" />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">DER First Name</Label>
                        <Input type="select" id="dern" name="dern" />

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">DER Cellphone Number</Label>
                        <Input type="select" id="derc" name="derc" />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">DER Last Name</Label>
                        <Input type="select" id="derl" name="derl" />

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Collection Site</Label>
                        <Input type="select" id="csite" name="csite" />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Collection Type</Label>
                        <Input type="select" id="ctype" name="ctype" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <button className={'btn btn-secondary'} onClick={() => { this.props.previousStep() }}>Previos</button>
                    </Col>
                    <Col md="6">
                        <button style={{ float: 'right' }} className={'btn btn-primary'} onClick={() => { this.props.nextStep() }}>Next</button>
                    </Col>
                </FormGroup>
            </div>
        );
    }
}