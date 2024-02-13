import React from 'react';
import { Form, FormGroup, Label, Col, Input, Button, Alert } from 'reactstrap';


class PinNumberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true
        };
    }
    render() {
       // console.log("dentro del componente", this.props.pinNumber);
        return (
            <div className="pin-number">
                <div className="pin-number-header">
                    <div className="pin-number-title">
                        <h4>Pin Number: </h4>
                        <FormGroup>
                            <Form>
                                <Col md="12">
                                    <div>
                                        {
                                            this.props.pinNumber === null ? (<Alert
                                                style={{
                                                    backgroundColor: "#dff0fe",
                                                    borderLeft: "4px solid #dff0fe",
                                                    borderColor: "#4788c7",
                                                    color: "#4788c7",
                                                    padding: "15px 20px",
                                                }}
                                            >
                                                Notice: <i className="fas fa-exclamation-circle"></i>{" "}
                                                <strong>Pin Number </strong>
                                                has not been registered in the company profile.{" "}
                                            </Alert>) : null
                                        }
                                        <Input disabled={this.state.disabled} type="text" id="pinNumber" name="pinNumber" placeholder="Pin Number" defaultValue={this.props.pinNumber} />
                                        {/* <div class='input-group-append'>
                                            <Button color="primary" style={{ backgroundColor: "#3b86ff" }} onClick={() => this.setState({ disabled: !this.state.disabled })}>Edit</Button>
                                        </div> */}
                                    </div>
                                </Col>
                            </Form>
                        </FormGroup>
                    </div>
                </div>
            </div>
        )
    }
}

export default PinNumberForm;
