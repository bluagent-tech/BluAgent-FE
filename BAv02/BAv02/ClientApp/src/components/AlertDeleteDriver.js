import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Form, FormGroup, Label, Input, Row } from "reactstrap";
import PropType from "prop-types";
import QuestionTooltip from "./QuestionTooltip";
import CustomDatePicker from "./DatePicker";

class AlertDeleteDriver extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' , date: null};
  }

  handleSelect = (e) => {
    this.setState({ value: e.target.value });
  }

  handleDatePicker = (e) => {
    this.setState({ date: e })
  }

  render() {
    var Color = "danger ";
    var modalHeader = "Delete";
    if (this.props.modalType === "restore") {
      Color = "primary ";
      modalHeader = "Restore";
    }
    else if (this.props.modalType === "Deactivate") {
      if (this.props.modalHeader === undefined) { modalHeader = this.props.modalType; }
      else { modalHeader = "Yes"; }
    }

    const body =
      <div>
        {this.props.message[0]}<br />
        {this.props.message[1]}
      </div>;

    return (
      <Modal isOpen={this.props.modal} className={"modal-" + Color}>
        <ModalHeader toggle={this.props.toggle}>{this.props.modalHeader === undefined ? modalHeader : this.props.modalHeader}</ModalHeader>
        <ModalBody>
          {body}
          <Form>
            <br />
            <Row form>
              <FormGroup>
                <Label for="deacReason">Reasons for Deactivation</Label>
                <Input type="select" name="select" id="deacReason" onChange={this.handleSelect}>
                  <option>Lack of Work</option>
                  <option>Ressigned</option>
                  <option>Fired</option>
                  <option>Employee’s personal reason</option>
                  <option>Leave of Abscence</option>
                </Input>
              </FormGroup>
              <QuestionTooltip message="Reasons to deactivate a driver" />
            </Row>
            <Row form>
              <CustomDatePicker
                required={true}
                labelText={true}
                handleDatePicker={this.handleDatePicker}
              />
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={Color} onClick={() => this.props.delete(this.state)}>
            {this.props.modalHeader === undefined ? modalHeader + " It" : modalHeader}
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

AlertDeleteDriver.propsType = {
  delete: PropType.func,
  toggle: PropType.func,
  message: PropType.string
};

export default AlertDeleteDriver;
