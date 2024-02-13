import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';


export default class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h6>Step 3 Alcohol Test Collection Site</h6>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Select Collection Type</Label>
                        <Input type="select" id="ctype" name="ctype" />

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Select a Provider</Label>
                        <Input type="select" id="provider" name="provider" />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Search a Collection Site</Label>
                        <Input type="select" id="site" name="site" />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Select the Reason for Scheduling this Test</Label>
                        <Input type="select" id="reason" name="reason" />

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