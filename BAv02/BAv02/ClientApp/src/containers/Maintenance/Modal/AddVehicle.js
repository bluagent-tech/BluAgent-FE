import React from "react";
import axios from "axios";
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
  Row,
  Form,
} from "reactstrap";
import PropTypes from "prop-types";
import base64ToByteArray from "./../../../services/base64ToByteArray";
import Select from "./../../../components/Select";
import mayus from "./../../../services/mayus";

var id = JSON.parse(localStorage.getItem("user")).Id;

//ADD NEW VEHICLE

class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PlateState: undefined,
      VehicleType: undefined,
      Make: undefined,
      Condition: undefined,
      vin: "",
      vinSearch: "",
      vinMessage: "",
      Year: "",
      date: "",
      checkToggle: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleSearchVIN = this.handleSearchVIN.bind(this);
    this.getSearchVIN = this.getSearchVIN.bind(this);
  }

  checkChange(e) {
    this.setState({ checkToggle: e.target.value });
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // var typeC = document.getElementById("VehicleType");
    // var a = typeC.options[typeC.selectedIndex].value;
    // var selected = typeC.options[typeC.selectedIndex].text;

    this.setState({});
  }

  onClose() {
    this.setState({
      PlateState: 0,
      VehicleType: 0,
      vinSearch: "",
      vinMessage: "",
    });

    this.state.vin = "";

    this.props.dataByVin.Make = "";
    this.props.dataByVin.Model = "";
    this.props.dataByVin.Year = "";

    this.props.toggle();
  }

  handleSearchVIN = (event) => {
    this.setState({
      vin: event.target.value,
    });
    this.getSearchVIN(event.target.value);
  };

  getSearchVIN(vin) {
    let url = "api/Trucks/getSearchVIN";
    axios
      .get(url, {
        params: { vin: vin, idCompany: localStorage.getItem("idCompany") },
      })
      .then((response) => response.data)
      .then((response) => {
        if (response.length > 0) {
          this.setState({
            vinMessage: "VIN Number already registered within this company",
          });
        } else {
          this.setState({ vinMessage: null });
        }
        this.setState({
          vinSearch: response.length,
        });
      })
      .catch((error) => console.log(error));
  }

  handleSubmit(e) {
    e.preventDefault();
    var id = JSON.parse(localStorage.getItem("user")).Id;
    var form = new FormData(e.target);
    form.append("idUser", id);
    this.props.OnSubmit(form);
    this.setState({
      PlateState: 0,
      VehicleType: 0,
      vinSearch: "",
      vinMessage: "",
      date: "",
    });

    this.state.vin = "";

    this.props.dataByVin.Make = "";
    this.props.dataByVin.Model = "";
    this.props.dataByVin.Year = "";
  }

  handleBlur() {
    if (this.props.modal === false) {
      this.setState({
        PlateState: undefined,
        VehicleType: undefined,
        Make: undefined,
      });
    }
  }

  render() {
    const { date } = this.state;
    return (
      <Modal isOpen={this.props.modal} className={"modal-lg "}>
        <ModalHeader name="modal1" toggle={this.onClose}>
          ADD VEHICLE
        </ModalHeader>
        <Form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
          <ModalBody>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">VIN Number</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="vin"
                  name="vin"
                  value={this.state.vin}
                  onChange={this.handleSearchVIN}
                  onKeyUp={mayus}
                  onInput={(e) => {
                    this.props.onBlur(e.target.value, "Vehicle", id);
                    this.props.getVin(e.target.value);
                  }}
                  autoComplete="off"
                  maxLength="20"
                  required

                  //style border-color: red;
                ></Input>
                <Label style={{ color: "red" }}>{this.state.vinMessage}</Label>
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">Vehicle Number</Label>
                <input
                  type="text"
                  className="form-control"
                  id="vnumber"
                  name="VehicleNumber"
                  maxLength="20"
                  autoComplete="off"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Make</Label>
                <Input
                  type="text"
                  id="Make"
                  name="Make"
                  defaultValue={this.props.dataByVin.Make}
                  maxLength="20"
                  required
                />
              </Col>
              <Col md="4">
                <Label htmlFor="text-input">Model</Label>
                <Input
                  type="text"
                  id="model"
                  name="Model"
                  defaultValue={this.props.dataByVin.Model}
                  maxLength="20"
                  required
                />
              </Col>
              <Col md="4">
                <Label htmlFor="text-input">Year</Label>
                <Input
                  type="text"
                  id="year"
                  name="Year"
                  defaultValue={this.props.dataByVin.Year}
                  maxLength="4"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Fuel Type</Label>
                <select
                  name="FuelType"
                  className="form-control"
                  onChange={this.onChange}
                  required
                >
                  <option value="">SELECT</option>
                  <option value="GASOLINE">GASOLINE</option>
                  <option value="DIESEL">DIESEL</option>
                  <option value="BATTERY ELECTRIC">BATTERY ELECTRIC</option>
                  <option value="ETHANOL">ETHANOL</option>
                  <option value="FUEL CELL">FUEL CELL</option>
                  <option value="HYBRID GAS">HYBRID GAS</option>
                  <option value="PLUG-IN HYBRID">PLUG-IN HYBRID</option>
                  <option value="NATURAL GAS">NATURAL GAS</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </Col>
              <Col md="4">
                <Label htmlFor="text-input">Vehicle Type</Label>
                <select
                  id="VehicleType"
                  name="VehicleType"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    this.state.VehicleType !== undefined
                      ? this.state.VehicleType
                      : this.props.dataByVin.VehicleType
                  }
                  required
                >
                  <option value="">SELECT</option>
                  <option value="TRUCK ">TRUCK</option>
                  <option value="TOW TRUCK">TOW TRUCK</option>
                  <option value="SEMI-TRAILER TRUCK">SEMI-TRAILER TRUCK</option>
                  <option value="BOX TRUCK">BOX TRUCK</option>
                  <option value="FLATBED TRUCK">FLATBED TRUCK</option>
                  <option value="CAR">CAR</option>
                  {/* Nuevos campos agregados */}
                  <option value="SCHOOL BUS">SCHOOL BUS</option>
                  <option value="PASSENGER VAN">PASSENGER VAN</option>
                  <option value="LIMOUSINE">LIMOUSINE</option>
                  {/* /////////////////////////////////////////////////////////////////// */}
                  <option value="VAN">VAN</option>
                  <option value="BUS">BUS</option>
                  <option value="PICK-UP">PICK-UP</option>
                </select>
              </Col>
              <Col md="4">
                <Label htmlFor="text-input">Ownership Status</Label>
                <select
                  name="Condition"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.Condition}
                  required
                >
                  <option value="">SELECT</option>
                  <option value="Leased">Leased</option>
                  <option value="Owned">Owned</option>
                  <option value="Interchange">Interchange</option>
                  <option value="Intermodal">Intermodal</option>
                  <option value="Term Leased">Term Leased </option>
                  <option value="Trip Leased">Trip Leased</option>
                </select>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Plate</Label>
                <input
                  type="text"
                  className="form-control"
                  id="plate"
                  name="Plate"
                  onKeyUp={mayus}
                  maxLength="20"
                  required
                />
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">Plate State</Label>
                <Select
                  name="PlateState"
                  options={this.props.states}
                  onChange={this.onChange}
                  value={this.state.PlateState}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <label>Plate Expiration Date</label>
                <input
                  type="date"
                  id="PlateExp"
                  name="PlateExpiration"
                  className="form-control"
                />
              </Col>
              {this.state.VehicleType == "SEMI-TRAILER TRUCK" ? (
                <Col md="5">
                  <Input
                    type="checkbox"
                    name="Hazmat"
                    value="true"
                    style={{ marginTop: "13%", marginLeft: "0%" }}
                  />
                  <Label
                    htmlFor="text-input"
                    style={{ fontSize: "16px", marginTop: "13%" }}
                  >
                    Hazmat
                  </Label>

                  <Input
                    type="checkbox"
                    name="CargoTank"
                    value="true"
                    style={{ marginTop: "13%", marginLeft: "10%" }}
                  />
                  <Label
                    htmlFor="text-input"
                    style={{ fontSize: "16px", marginTop: "13%" }}
                  >
                    Cargo Tank
                  </Label>
                </Col>
              ) : (
                ""
              )}
              {this.state.VehicleType == "BUS" ? (
                <Col md="6">
                  <Label htmlFor="text-input">Passenger</Label>
                  <select
                    name="Passengers"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="16+">16+</option>
                  </select>
                </Col>
              ) : (
                ""
              )}
              {this.state.VehicleType == "SCHOOL BUS" ? (
                <Col md="6">
                  <Label htmlFor="text-input">Passenger</Label>
                  <select
                    name="Passengers"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="1-8">1-8</option>
                    <option value="9-15">9-15</option>
                    <option value="16+">16+</option>
                  </select>
                </Col>
              ) : (
                ""
              )}
              {this.state.VehicleType == "PASSENGER VAN" ? (
                <Col md="6">
                  <Label htmlFor="text-input">Passenger</Label>
                  <select
                    name="Passengers"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="1-8">1-8</option>
                    <option value="9-15">9-15</option>
                  </select>
                </Col>
              ) : (
                ""
              )}
              {this.state.VehicleType == "LIMOUSINE" ? (
                <Col md="6">
                  <Label htmlFor="text-input">Passenger</Label>
                  <select
                    name="Passengers"
                    className="form-control"
                    onChange={this.onChange}
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="1-8">1-8</option>
                    <option value="9-15">9-15</option>
                    <option value="16+">16+</option>
                  </select>
                </Col>
              ) : (
                ""
              )}
            </FormGroup>
            {/* <FormGroup>
              <Col md="6"></Col>
            </FormGroup> */}
          </ModalBody>
          <ModalFooter>
            <Row className="justify-content-center">
              <Col mb="4" colSpan="3" className="text-center"></Col>
            </Row>
            <Button
              id="btnSave"
              type="submit"
              className="btn buttons-royal text-white px-5"
              disabled={this.state.vinMessage}
              /*disabled={this.props.isLoading ? true : false}*/
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
              type="button"
              className="btn buttons-royal text-white px-5"
              onClick={this.onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

AddVehicle.propTypes = {
  onBlur: PropTypes.func,
  toggle: PropTypes.func,
};

export default AddVehicle;
