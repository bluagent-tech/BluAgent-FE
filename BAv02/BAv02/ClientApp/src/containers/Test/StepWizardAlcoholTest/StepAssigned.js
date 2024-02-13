import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';


export default class Example extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h6>Step 2 DER Information</h6>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">DER First Name</Label>
                        <Input type="text" id="name" name="name" />

                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">DER Last Name</Label>
                        <Input type="text" id="last" name="last" />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">DER Cellphone Number</Label>
                        <Input type="select" id="number" name="number" />

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