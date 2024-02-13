import React, { Component } from "react";
import {
  Alert,
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
import Swal from "sweetalert2";
import PropType from "prop-types";
import QuestionTooltip from "./QuestionTooltip";
import CustomDatePicker from "./DatePicker";

class SendInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = { manual: "", driverEmail: "", edit: true, available: 0 };
  }

  componentDidUpdate() {
    if (this.props.message == "Email sent") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Email sent",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (this.props.message == "Error send Instructions") {
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

  handleSelect = (e) => {
    const ActualDate = new Date();
    const year = ActualDate.getFullYear().toString();
    var form = new FormData(document.getElementById("sendInst"));
    form.append("idDriver", this.props.idDriver);
    form.append("idCompany", this.props.idCompany);
    form.append("name", this.props.name);
    form.append("year", year);
    this.props.send(form);
    this.props.toggle();
  };

  edit = () => {
    this.setState({ edit: !this.state.edit });
  };

  handleAvailable = () => {
    // console.log("event:", document.getElementById("manInst").value);
    if (document.getElementById("manInst").value == "Driver Safety Manual") {
      this.setState({ available: this.props.gen });
    } else {
      this.setState({ available: 0 });
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader
          className={"text-white"}
          toggle={this.props.toggle}
          style={{ backgroundColor: "#3b86ff" }}
        >
          SEND INSTRUCTIONS
        </ModalHeader>
        <ModalBody>
          {/* {body} */}
          <FormGroup>
            <Form onSubmit={this.handleSelect} id="sendInst">
              <Col md="12">
                <br />
                <Label for="emailDriver">Confirm Driver Email</Label>
                <div class="input-group mb-3">
                  <Input
                    readOnly={this.state.edit}
                    type="email"
                    name="email"
                    id="emailDriver"
                    // onChange={this.handleSelect}
                    defaultValue={this.props.email}
                  ></Input>
                  <div class="input-group-append">
                    <Button
                      color={"primary"}
                      style={{ backgroundColor: "#3b86ff" }}
                      onClick={this.edit}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <br />
              </Col>
              <Col md="12">
                <Label for="manInst">Manual / Instructions</Label>
                <Input
                  type="select"
                  name="pdf"
                  id="manInst"
                  onChange={this.handleAvailable}
                  defaultValue="ELD Quick Reference"
                >
                  <option>ELD Quick Reference</option>
                  <option>Driver Safety Manual</option>
                </Input>
              </Col>
            </Form>
          </FormGroup>
          {/* <QuestionTooltip message="Reasons to deactivate a driver" /> */}
        </ModalBody>
        {this.state.available != 2 ? (
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
        ) : (
          <ModalFooter>
            <Alert
              style={{
                backgroundColor: "#dff0fe",
                borderLeft: "4px solid #dff0fe",
                borderColor: "#4788c7",
                color: "#4788c7",
                padding: "15px 20px",
              }}
            >
              Notice: <i className="fas fa-exclamation-circle"></i> The
              document; <strong>Driver Safety Manual</strong> has not been
              generated yet, please go to <strong>Company Profile</strong> and
              generate the document{" "}
            </Alert>
            <Button color="danger" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </Modal>
    );
  }
}

export default SendInstructions;
