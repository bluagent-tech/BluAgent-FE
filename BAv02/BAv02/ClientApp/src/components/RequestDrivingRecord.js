import React, { Component } from "react";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
} from "reactstrap";
import LoadingTag from "../views/Notifications/Loading";
import PropType from "prop-types";
import QuestionTooltip from "./QuestionTooltip";
import CustomDatePicker from "./DatePicker";

class RequestDrivingRecord extends Component {
  constructor(props) {
    super(props);
    this.state = { manual: "", driverEmail: "", edit: true };
  }

  handleSelect = (e) => {
    var form = new FormData(document.getElementById("sendInst"));
    form.append("idDriver", this.props.idDriver);
    form.append("idCompany", this.props.idCompany);
    this.props.send(form);
    this.props.toggle();
  };

  componentDidUpdate() {
    if (this.props.message == "Email sent") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Email sent",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (this.props.message == "ErrorRDR") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error sending the email",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    this.props.rm();
  }

  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader
          className={"text-white"}
          toggle={this.props.toggle}
          style={{ backgroundColor: "#3b86ff" }}
        >
          REQUEST DRIVING RECORD
        </ModalHeader>
        <ModalBody>
          {/* {body} */}
          <FormGroup>
            <Form onSubmit={this.handleSelect} id="sendInst">
              <Col md="12">
                <br />
                <Label for="emailDriver">Driver Name</Label>
                <Input
                  readOnly
                  type="text"
                  name="name"
                  id="name"
                  // onChange={this.handleSelect}
                  defaultValue={this.props.name}
                ></Input>
                <br />
                <Label for="emailDriver">Driver license</Label>
                <Input
                  readOnly
                  type="text"
                  name="license"
                  id="license"
                  // onChange={this.handleSelect}
                  defaultValue={this.props.license}
                ></Input>
                <br />
                <Label for="emailDriver">X-Number</Label>
                <Input
                  required
                  type="text"
                  name="xNumber"
                  id="xNumber"
                  // onChange={this.handleSelect}}
                ></Input>
                <br />
              </Col>
            </Form>
          </FormGroup>
          {/* <QuestionTooltip message="Reasons to deactivate a driver" /> */}
        </ModalBody>
        <ModalFooter>
          {this.props.loading ? (
            <LoadingTag />
          ) : (
            <Button
              color={"primary"}
              onClick={this.handleSelect}
              type="submit"
              style={{ backgroundColor: "#3b86ff" }}
              // onClick={() => this.props.delete(this.state)}
            >
              SEND
            </Button>
          )}
          <Button color="danger" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default RequestDrivingRecord;
