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
import Select from "../../../components/Select";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// registerPlugin(FilePondPluginFileValidateType);
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

//ADD NEW WORK ORDER
const idCompany = localStorage["idCompany"];
class AddWorkOrder extends React.Component {
  constructor(props) {
    super(props);
    this.OnChange = this.OnChange.bind(this);
    this.onChangeSendEmail = this.onChangeSendEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailOnChange = this.emailOnChange.bind(this);
    this.state = {
      VehicleType: undefined,
      Type: undefined,
      emailRequired: false,
      sendEmail: false,
      files: []
    };
    this.onDrop = (files) => {
      this.setState({ files })
    };
  }

  emailOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  onChangeSendEmail() {
    this.setState({ sendEmail: !this.state.sendEmail });
  }

  OnChange(event) {
    const { name, value, checked } = event.target;
    this.setState({ [name]: value });

    if (name === "VehicleType") {
      var id = JSON.parse(localStorage.getItem("user")).Id;
      if (value === "TRAILER") {
        this.props.getTrailers(id, 1, 1000, 0);
      } else {
        this.props.getTrucks(id, 1, 1000, 0);
      }
    }
    // if (name === "sendEmail") {
    //   if (checked === true) {
    //     document.getElementById("Email").style.visibility = "visible";
    //   } else {
    //     document.getElementById("Email").style.visibility = "hidden";
    //   }
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    let files = this.pond.getFiles();
    files.forEach((file) => {
      form.append("files", file.file);
    });
    form.append("idu", JSON.parse(localStorage.getItem("user")).Id);
    form.append("idCompany", idCompany);
    this.props.addWorkOrder(form);
    this.setState({ files: [] })
  }

  render() {
    return (
      <div className="col-md-6">
        <Modal
          isOpen={this.props.workOrderWithVehicles}
          className={"modal-lg "}
        >
          <ModalHeader
            name="AddWorkOrderWithVehicles"
            toggle={this.props.toggleWorkOrderWithVehicles}
          >
            Add Work Order{" "}
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Vehicle Type</Label>
                  <select
                    name="VehicleType"
                    className="form-control"
                    onChange={this.OnChange}
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="TRAILER">Trailer</option>
                    <option value="VEHICLE">Truck</option>
                  </select>
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Vehicle Number</Label>
                  <Select
                    placeholder="Select Vehicle #"
                    name="IdVehicle"
                    options={
                      this.state.VehicleType === undefined
                        ? []
                        : this.state.VehicleType === "TRAILER"
                          ? this.props.trailers
                          : this.props.trucks
                    }
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <DatePicker
                    id="CreatedDate"
                    name="CreatedDate"
                    labelText="Issue Date"
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="number-input">Odometer</Label>
                  <Input type="number" name="MileageTime" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Reported By</Label>
                  <Input
                    type="text"
                    value={
                      JSON.parse(localStorage.getItem("user")).Name +
                      " " +
                      JSON.parse(localStorage.getItem("user")).LastName
                    }
                    disabled
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Assigned To</Label>
                  <Input type="text" name="AssignedTo" required />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Send email Notification</Label>
                  <Input
                    style={{ marginLeft: "20px" }}
                    type="checkbox"
                    name="sendEmail"
                    onChange={this.onChangeSendEmail}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                {this.state.sendEmail === true ?
                  (<Col md="6" id="Email">
                    <Label htmlFor="text-input">Email</Label>
                    <Input
                      onChange={this.emailOnChange}
                      name="Email"
                      type="email"
                      id="Email"
                      placeholder="Enter e-mail ..."
                      required
                    />
                  </Col>) : ""
                }
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Work Order Type</Label>
                  <select
                    name="Type"
                    className="form-control"
                    onChange={this.OnChange}
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Service">Service</option>
                    <option value="Repair">Repair</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </Col>
                <Col md="6">
                  {
                    this.state.Type !== "Repair" && this.state.Type !== "" && this.state.Type !== undefined ? (
                      <Label htmlFor="text-input">Service Type</Label>
                    ) : (
                      ""
                    )
                  }
                  {this.state.Type === "Inspection" ? (
                    <select
                      name="ServiceType"
                      className="form-control"
                      required
                    >
                      <option value="">SELECT</option>
                      <option value="90 Day Inspection">
                        90 Day Inspection
                      </option>
                      <option value="Annual Inspection">
                        Annual Inspection
                      </option>
                      <option value="Brake Inspection">
                        Brake Inspection
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>
                  ) : this.state.Type === "Service" ? (
                    <select
                      name="ServiceType"
                      className="form-control"
                      required
                    >
                      <option value="">SELECT</option>
                      <option value="Oil Change">Oil Change</option>
                      <option value="Tires Change">Tires Change</option>
                      <option value="Brake Adjustment">Brake Adjustment</option>
                      <option value="Brake Replacement">Brake Replacement</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (this.state.Type === "Maintenance" ?
                    (<select
                      name="ServiceType"
                      className="form-control"
                      required
                    >
                      <option value="">SELECT</option>
                      <option value="Preventive Maintenance">Preventive Maintenance</option>
                      <option value="Other">Other</option>
                    </select>) : ""
                    // <Input type="text" name="ServiceType" required />
                  )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="12">
                  <Label htmlFor="text-input">Work Order Request (Description)</Label>
                  <Input type="textarea" name="WorkRequest" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="12">
                <FilePond
                    ref={ref => (this.pond = ref)}
                    files={this.state.files}
                    allowMultiple={true}
                    allowReorder={true}
                    maxFiles={4}
                    instantUpload={false}
                    name="files" 
                    oninit={() => this.handleInit()}
                    onupdatefiles={(countFiles) => {
                      this.setState({
                        countFiles: countFiles.length,
                        files: countFiles.map(fileItem => fileItem.file)
                      });
                    }}
                  />
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
                  alt="loading"
                  style={{
                    width: "140px",
                    position: "absolute",
                    marginTop: "0px",
                    right: "40%",
                  }}
                  src="../../assets/img/icons/loading2.gif"
                />
              ) : (
                <div />
              )}
              <Button
                color="danger"
                onClick={this.props.toggleWorkOrderWithVehicles}
              >
                Close
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
  toggle: PropTypes.func,
};

export default connect(
  (state) => state.maintenance,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(AddWorkOrder);
