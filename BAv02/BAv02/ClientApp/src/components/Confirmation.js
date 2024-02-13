import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropType from "prop-types";

class Confirmation extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} className={"modal-success "}>
        <ModalHeader toggle={this.props.toggle}>Confirmation</ModalHeader>
        <ModalBody>{this.props.message}</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.props.confirmed}>
            Ok
          </Button>{" "}
          <Button color="danger" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Confirmation.propsType = {
  confirmed: PropType.func,
  toggle: PropType.func,
  message: PropType.string,
};

export default Confirmation;
