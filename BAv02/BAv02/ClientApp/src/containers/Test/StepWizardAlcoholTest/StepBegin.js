import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';


export default class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h6>Step 1 Alcohol Test Type</h6>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Select the Reason for Scheduling This Test</Label>
                        <Input type="select" id="reason" name="reason" />

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Select a Donor for This Test</Label>
                        <Input type="text" id="donor" name="donor" />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Select a Test Date</Label>
                        <Input type="select" id="dtest" name="dtest" />

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Select a Expiry Date</Label>
                        <Input type="select" id="dexpiry" name="dexpiry" />

                    </Col>
                </FormGroup>
                <FormGroup row>

                    <Col md="12">
                        <button style={{ float: 'right' }} className={'btn btn-primary'} onClick={() => { this.props.nextStep() }}>Next</button>
                    </Col>
                </FormGroup>
            </div>
        );
    }
}