import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Input,
  Form
} from "reactstrap";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/Maintenance";
import DatePicker from "../../../components/DatePicker";

//ADD NEW WORK ORDER

class AddWorkOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { CreatedDate: "", Type: undefined };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    var date = new Date();
    var d = date.getDate();
    var month = date.getMonth() + 1;
    if (d < 10) {
      d = "0" + d;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var f = date.getFullYear() + "-" + month + "-" + d;
    this.setState({ CreatedDate: f });
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onClose() {
    this.setState({ Type: undefined });
    this.props.toggle();
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form.append("idVehicle", this.props.idVehicle);
    form.append("typeT", this.props.typeT);
    form.append("idu", JSON.parse(localStorage.getItem("user")).Id);
    this.props.OnSubmit(form);
  }

  render() {
    return (
      <div className="col-md-6">
        <Modal isOpen={this.props.modal} className={"modal-lg "}>
          <ModalHeader name="modalWO" toggle={this.onClose}>
            WORK ORDER{" "}
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup row>
                <DatePicker
                  id="CreatedDate"
                  name="CreatedDate"
                  labelText="Date"
                />
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Work Order Type</Label>
                  <select
                    name="Type"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.Type}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Service">Service</option>
                    <option value="Repair">Repair</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Assigned to</Label>
                  <Input
                    type="text"
                    id="AssignedTo"
                    name="AssignedTo"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Mileage at Time</Label>
                  <Input type="text" id="MileageTime" name="MileageTime" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="12">
                  <Label htmlFor="text-input">Work Request</Label>
                  <Input type="textarea" id="WorkRequest" name="WorkRequest" />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>{" "}
              {this.props.isLoading ? (
                <img
                  style={{
                    width: "140px",
                    position: "absolute",
                    marginTop: "0px",
                    right: "40%"
                  }}
                  src="../../assets/img/icons/loading2.gif"
                  alt="loading"
                />
              ) : (
                <div />
              )}
              <Button color="danger" onClick={this.onClose}>
                CLOSE
              </Button>{" "}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
AddWorkOrder.propTypes = {
  OnSubmit: PropTypes.func,
  toggle: PropTypes.func
};

export default connect(
  state => state.maintenance,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(AddWorkOrder);
