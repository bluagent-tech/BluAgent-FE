import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Label,
  Input,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import mayus from "./../../../services/mayus";
import DatePicker from "./../../../components/DatePicker";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Select from "./../../../components/Select";

const idCompany = localStorage["idCompany"];
const userId = JSON.parse(localStorage.getItem("user")).Id;

registerPlugin(FilePondPluginFileValidateType);

class AddVehicleInspection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.modal,
      idVehicle: 0,
      vehicleNumber: "",
      odometer: 0,
      inspectionType: "",
      inspectionDate: "",
      tireSize: "",
      inspectionName: "",
      fileName: "",
      vehicleType: "",
      trucksTrailers: [],
    };
  }

  toggle = () => {
    this.props.toggle(this.props.modal);

    this.setState({
      open: this.props.modal,
      vehicleType: "VEHICLE",
      trucksTrailers: this.props.trucks,
    });
  };

  onClose = () => {
    this.props.toggle();
  };

  onChangeVehicleType = (event) => {
    this.setState({ vehicleType: event.target.value });

    if (event.target.value === "VEHICLE") {
      this.setState({ trucksTrailers: this.props.trucks });
    } else {
      this.setState({ trucksTrailers: this.props.trailers });
    }
  };

  onChangeVehicle = (event) => {
    const idVehicle = parseInt(event.target.value);
    const vehicle = this.state.trucksTrailers.find((v) => v.Id === idVehicle);

    this.setState({
      idVehicle: vehicle.Id,
      vehicleNumber: vehicle.Name,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("loading").style = "display:block";
    var odometer = document.getElementById("odometer").value;
    var form = new FormData(e.target);
    let files = this.pond.getFiles();

    if (odometer === "" || odometer === undefined || odometer === null) {
      form.append("Odometer", odometer);
    }

    if (files !== null) {
      form.append("idUser", userId);
      form.append("idCompany", idCompany);
      files.forEach((file) => {
        form.append("files", file.file);
      });
      form.append("vehicleNumber", this.state.vehicleNumber);

      this.props.onSubmit(form);
      this.onClose();
    }
  };

  componentDidMount() {
    this.props.cargoClass(userId);
    this.props.operationClass(userId);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.idVehicle !== this.props.idVehicle &&
      prevProps.vehicleType !== this.props.vehicleType
    ) {
      const tt =
        this.props.vehicleType === "VEHICLE"
          ? this.props.trucks
          : this.props.trailers;

      this.setState({
        idVehicle: this.props.idVehicle,
        vehicleType: this.props.vehicleType,
        trucksTrailers: tt,
      });
    }
  }

  render() {
    // console.log("props: ", {
    //   cargoM: this.props.cargo.M,
    //   operationD: this.props.operation.D,
    //   operationE: this.props.operation.E,
    // });
    var passenger = false;

    if (
      this.props.operation.D !== undefined &&
      this.props.operation.E !== undefined &&
      this.props.cargo.M !== undefined
    ) {
      // if (this.props.operation.E == true && this.props.cargoM == true) {
      //   passenger = true;
      // }
      // if (condition) {

      // }
      if (this.props.operation.E == true || this.props.operation.D == true) {
        if (this.props.cargo.M == true) {
          passenger = true;
        }
      }
    }
    return (
      <React.Fragment>
        <Button
          //Estilo del boton cambiado
          style={{
            borderRadius: "30px",
            width: "30px",
            height: "30px",
            paddingLeft: "0px",
            paddingTop: "0px",
            fontSize: "20px",
            paddingRight: "0px",
            paddingBottom: "0px",
            lineHeight: 1,
            marginRight: "20px",
          }}
          color="#1b8eb7"
          className="btn btn-primary"
          id="addInspection"
          onClick={this.toggle}
        >
          +
        </Button>
        <UncontrolledTooltip placement="bottom" target="addInspection">
          Add New Inspection
        </UncontrolledTooltip>

        <Modal isOpen={this.props.modal} className={"modal-lg "}>
          <ModalHeader name="modal2" toggle={this.onClose}>
            ADD VEHICLE INSPECTION
          </ModalHeader>
          <form onSubmit={this.handleSubmit}>
            <ModalBody>
              <Row style={{ marginBottom: "10px" }}>
                <Col md="6">
                  <Label htmlFor="text-input">Vehicle Type</Label>
                  <select
                    name="vehicleType"
                    id="vehicleType"
                    className="form-control"
                    onChange={this.onChangeVehicleType}
                    value={this.state.vehicleType}
                    required
                  >
                    <option value="VEHICLE">VEHICLE</option>
                    <option value="TRAILER">TRAILER</option>
                  </select>
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Vehicle Number</Label>
                  <Select
                    id="idVehicle"
                    name="idVehicle"
                    options={this.state.trucksTrailers}
                    value={this.state.idVehicle}
                    onChange={this.onChangeVehicle}
                    required
                  />
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col md="6">
                  <Label htmlFor="text-input">Inspection Type</Label>
                  <select
                    id="inspectionType"
                    name="inspectionType"
                    className="form-control"
                    required
                  >
                    <option value="AnnualInspection">ANNUAL INSPECTION</option>
                    <option value="90-dayInspection">90 DAYS INSPECTION</option>
                    <option value="45-dayInspection">45 DAYS INSPECTION</option>
                  </select>
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Odometer</Label>
                  <Input
                    type="number"
                    className="form-control"
                    id="odometer"
                    name="odometer"
                    onKeyUp={mayus}
                    maxLength="20"
                    autoComplete="off"
                  ></Input>
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col md="6">
                  <Label htmlFor="text-input">Tire Size</Label>
                  {/* <Input
                    type='text'
                    className='form-control'
                    id='tireSize'
                    name='tireSize'
                    onKeyUp={mayus}
                    maxLength='20'
                    autoComplete='off'
                    required
                  ></Input> */}
                  <select
                    name="tireSize"
                    id="tireSize"
                    className="form-control"
                    onChange={this.onChange}
                    // value={
                    //   (this.props.truck.TireSize !== null) &
                    //   (this.state.TireSize === "")
                    //     ? this.props.truck.TireSize
                    //     : this.state.TireSize === ""
                    //     ? JSON.parse(localStorage.getItem("user")).TireSize
                    //     : this.state.TireSize
                    // }
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="11">11</option>
                    <option value="11.5">11.5</option>
                    <option value="12">12</option>
                    <option value="12.5">12.5</option>
                    <option value="13">13</option>
                    <option value="13.5">13.5</option>
                    <option value="14">14</option>
                    <option value="11R22.5">11R22.5</option>
                    <option value="11R24.5">11R24.5</option>
                    <option value="205/65R17.5">205/65R17.5</option>
                    <option value="205/75R17.5">205/75R17.5</option>
                    <option value="215/75R17.5">215/75R17.5</option>
                    <option value="225/70R19.5">225/70R19.5</option>
                    <option value="225/75R17.5">225/75R17.5</option>
                    <option value="235/75R17.5">235/75R17.5</option>
                    <option value="235/80R22.5">235/80R22.5</option>
                    <option value="245/70R17.5">245/70R17.5</option>
                    <option value="245/70R19.5">245/70R19.5</option>
                    <option value="245/75R16">245/75R16</option>
                    <option value="255/70R22.5">255/70R22.5</option>
                    <option value="265/70R17.5">265/70R17.5</option>
                    <option value="265/70R19.5">265/70R19.5</option>
                    <option value="275/70R22.5">275/70R22.5</option>
                    <option value="285/70R19.5">285/70R19.5</option>
                    <option value="285/75R24.5">285/75R24.5</option>
                    <option value="295/55R22.5">295/55R22.5</option>
                    <option value="295/60R22.5">295/60R22.5</option>
                    <option value="295/75R22.5">295/75R22.5</option>
                    <option value="295/80R22.5">295/80R22.5</option>
                    <option value="305/70R19.5">305/70R19.5</option>
                    <option value="315/45R22.5">315/45R22.5</option>
                    <option value="315/60R22.5">315/60R22.5</option>
                    <option value="315/70R22.5">315/70R22.5</option>
                    <option value="315/80R22.5">315/80R22.5</option>
                    <option value="355/50R22.5">355/50R22.5</option>
                    <option value="365/70R22.5">365/70R22.5</option>
                    <option value="385/55R19.5">385/55R19.5</option>
                    <option value="385/55R22.5">385/55R22.5</option>
                    <option value="385/65R22.5">385/65R22.5</option>
                    <option value="425/65R22.5">425/65R22.5</option>
                    <option value="435/50R19.5">435/50R19.5</option>
                    <option value="445/45R19.5">445/45R19.5</option>
                    <option value="445/65R22.5">445/65R22.5</option>
                  </select>
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Inspector Name</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="inspectionName"
                    name="inspectionName"
                    onKeyUp={mayus}
                    maxLength="20"
                    autoComplete="off"
                    required
                  ></Input>
                </Col>
              </Row>

              <Row style={{ marginBottom: "10px" }}>
                <Col md="6">
                  <DatePicker
                    id="inspectionDate"
                    name="inspectionDate"
                    labelText="Inspection Date"
                  />
                </Col>
                <Col md="6">
                  {passenger ? (
                    <>
                      <a
                        style={{ width: "100%", marginTop: "2.3em" }}
                        id="btnDownload"
                        className="btn buttons-royal text-white px-4 "
                        href="/assets/maintenancePdf/ANNUAL_INSPECTION_PASSENGER.pdf"
                        download
                      >
                        Download Vehicle Inspection Template
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        style={{ width: "100%", marginTop: "2.3em" }}
                        id="btnDownload"
                        className="btn buttons-royal text-white px-4 "
                        href="/assets/maintenancePdf/ANNUAL_INSPECTION.pdf"
                        download
                      >
                        Download Vehicle Inspection Template
                      </a>
                    </>
                  )}
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <h3>
                    <Label htmlFor="text-input">Document and Photos</Label>
                  </h3>
                </Col>
              </Row>
              <hr />
              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  <FilePond
                    ref={(ref) => (this.pond = ref)}
                    allowFileTypeValidation={false}
                    allowRevert={false}
                    instantUpload={false}
                    allowMultiple={false}
                    maxFiles={100}
                    maxParallelUploads={100}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <h3>
                    <Label htmlFor="text-input">Inspector Qualifications</Label>
                  </h3>
                </Col>
              </Row>
              <hr />
              <Row style={{ marginBottom: "10px" }}>
                <Col md="12">
                  <label>
                    This inspector meets the qualifications in section 396.19{" "}
                  </label>
                  <input
                    type="radio"
                    value="false"
                    name="inspectorQualifications"
                    style={{ marginLeft: "10px" }}
                    required
                  />

                  <img
                    id="loading"
                    className="imgLoading"
                    style={{
                      display: "none",
                    }}
                    src="../../assets/img/icons/loading2.gif"
                    alt="loading"
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {/* <button
                id='btnStart'
                type='button'
                className='btn buttons-royal text-white px-4'
              >
                Start Inspection
              </button> */}

              <button
                id="btnSave"
                type="submit"
                className="btn buttons-royal text-white px-4"
              >
                Save & Close
              </button>

              <button
                id="btnCancel"
                type="button"
                className="btn buttons-royal text-white px-4"
                onClick={this.onClose}
              >
                Cancel
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddVehicleInspection;
