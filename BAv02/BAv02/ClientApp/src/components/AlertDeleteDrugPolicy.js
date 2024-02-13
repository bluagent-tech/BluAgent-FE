import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropType from "prop-types";

class AlertDeleteDrugPolicy extends Component {
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

    return (
      <Modal isOpen={this.props.modal} className={"modal-" + Color}>
            <ModalHeader toggle={this.props.toggle}>{this.props.modalHeader === undefined ? modalHeader : this.props.modalHeader}</ModalHeader>
        <ModalBody>{this.props.message}</ModalBody>
        <ModalFooter>
          <Button color={Color} onClick={this.props.delete}>
                    {this.props.modalHeader === undefined ? modalHeader + " It" : modalHeader }
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

AlertDeleteDrugPolicy.propsType = {
  delete: PropType.func,
  toggle: PropType.func,
  message: PropType.string
};

export default AlertDeleteDrugPolicy;
