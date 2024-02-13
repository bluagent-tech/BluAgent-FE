import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import PropType from "prop-types";

class AlertDelete extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checkInactivate: false,
    };
  }

  handleChange() {
    this.setState({checkInactivate: !this.state.checkInactivate})
  }

  render() {
    var Color = "danger ";
    var modalHeader = "Delete";
    if (this.props.modalType === "restore") {
      Color = "primary ";
      modalHeader = "Restore";
    } else if (this.props.modalType === "Deactivate") {
      if (this.props.modalHeader === undefined) {
        modalHeader = this.props.modalType;
      } else {
        modalHeader = "Yes";
      }
    } else if (this.props.modalType === "Remove") {
      modalHeader = "Remove";
      Color = "danger ";
    }
    return (
      <Modal isOpen={this.props.modal} className={"modal-" + Color}>
        <ModalHeader toggle={this.props.toggle}>
          {this.props.modalHeader === undefined
            ? modalHeader
            : this.props.modalHeader}
        </ModalHeader>
        <ModalBody>
          <div>{this.props.message}</div>
          {this.props.modalType == "Remove" ?
            <div>
              <label className="" style={{ cursor: "pointer", marginTop: "5px" }}>
              <input
                type="checkbox"
                id="checkInactive"
                name="checkInactive"
                value={this.state.checkInactivate}
                onClick={this.handleChange}
              />{" "}
                Also deactivate
              </label>
            </div> : ""}
        </ModalBody>
        <ModalFooter>
          <Button 
            color={Color} 
            onClick={modalHeader === "Restore" ? this.props.restore : this.state.checkInactivate ? this.props.deleteInactivate : this.props.delete}
          >{" "}
            {this.props.modalHeader === undefined
              ? modalHeader + " It"
              : modalHeader}
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

AlertDelete.propsType = {
  delete: PropType.func,
  toggle: PropType.func,
  message: PropType.string,
  restore: PropType.func,
  deleteInactivate: PropType.func,
};

export default AlertDelete;
