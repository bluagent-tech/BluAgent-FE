import React from 'react';
import { Col, FormGroup, Input, Label, Badge } from 'reactstrap';
import DatePicker from "../../../components/DatePicker";

const nextDate = new Date();
let ninety_day_inspection = '90-day Inspection'
if (ninety_day_inspection) { nextDate.setDate(nextDate.getDate() + 85); }
else { nextDate.setDate(nextDate.getDate() + 360); }

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }


    onChange(e) {
        const { value } = e.target;
        if (value === 'Other') { document.getElementById("mileageOther").style.display = "block"; }
        else { document.getElementById("mileageOther").style.display = "none"; }
    }

    render() {
        return (
            <div>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input" className="text-primary">FINISH INSPECTION   <Badge color="primary">18</Badge></Label>
                    </Col>
                    <Col md="6">

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <DatePicker
                        name="DateDue"
                        labelText="Date Due"
                        value={(nextDate.getMonth() + 1) + '/' + nextDate.getDate() + '/' + nextDate.getFullYear()}
                    />
                    <Col md="4">
                        <Label htmlFor="text-input">Mileage Due</Label>
                        <select
                            className="form-control"
                            onChange={this.onChange}
                        >
                            <option value="">Select</option>
                            <option value="5000">Every 5,000 Miles</option>
                            <option value="10000">Every 10,000 Miles</option>
                            <option value="15000">Every 15,000 Miles</option>
                            <option value="25000">Every 25,000 Miles</option>
                            <option value="30000">Every 30,000 Miles</option>
                            <option value="40000">Every 40,000 Miles</option>
                            <option value="Other">Other</option>
                        </select>
                    </Col>
                    <Col md="4" id="mileageOther" style={{ display: 'none' }}>
                        <Label htmlFor="text-input">Mileage Due</Label>
                        <Input type="number"  name="tire" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Inspector Name</Label>
                        <Input type="text" id="iname" name="iname" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <button type="button" className={'btn btn-secondary'} onClick={() => { this.props.previousStep() }}>Previous</button>
                    </Col>
                    <Col md="6">
                        <button type="submit" style={{ float: 'right' }} className={'btn btn-primary'} onClick={() => { this.props.nextStep() }}>Finish</button>
                    </Col>
                </FormGroup>
            </div>
        );
    }
}