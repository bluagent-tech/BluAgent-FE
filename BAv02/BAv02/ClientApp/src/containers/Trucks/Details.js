import React, { Component } from "react";
import {
  Col,
  FormGroup,
  Input,
  Label,
  CustomInput,
  Button,
  Row,
  Form,
  Alert,
  Card
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Trucks";
import dateConvertTables from "./../../services/dateConvertTables";
import Select from "./../../components/Select";
import mayus from "../../services/mayus";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";
import DatePicker from "./../../components/DatePicker";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);
import SimpleImageSlider from "react-simple-image-slider";
const idCompany = JSON.parse(localStorage.getItem("idCompany"));

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PlateState: "",
      VehicleType: "",
      Make: undefined,
      Condition: "",
      FuelType: "",
      Hazmat: "",
      File: [],
      TireSize: "",
      files: [],
      // temp: [],
    };
    this.temp = [];
    this.onDrop = (files ) => {
      this.setState({ files  });
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.readFile = this.readFile.bind(this);
  }

   componentDidMount() {
    this.props.getVehiclePhotos(this.props.id, "VehiclePhotos");
    this.props.getStates();
    this.props.getTruck(
      this.props.id,
      JSON.parse(localStorage.getItem("user")).Id
    );
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (this.props.vehiclePhotos.length > 0) {
      for (var i = 0; i < this.props.vehiclePhotos.length; i++) {
        this.temp[i] = `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/TrucksFile/${this.props.vehiclePhotos[i].IdVehicle}/VehiclePhotos/${this.props.vehiclePhotos[i].DocName}`
      }
      this.setState();
    }
  }

  handleInit() {
    console.log('FilePond instance has been initialized', this.pond);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentWillUnmount() {
    this.props.clean();
  }

  readFile(input) {
    var nameFile = input.files[0].name.substr(-4);
    if (input) {
      var reader = new FileReader();
      //var image = "";
      reader.onload = (e) => {
        var image = document.getElementById("image");
        image.src = e.target.result;
        image = base64ToByteArray2(e.target.result);
        if (nameFile !== ".pdf") {
          document.getElementById("error").style.display = "none";
          this.setState({ File: image });
        } else {
          document.getElementById("error").style.display = "inline-block";
          this.setState({ File: "" });
        }
      };

      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) { }
    }
  }

  fileChangedHandler = (event) => {
    this.readFile(event.target);
  };

  handleSubmit(e) {
    e.preventDefault();
    var image = document.getElementById("image");
    var byteArray = base64ToByteArray2(image.src);
    var file = "";
    try {
      file = byteArray.toString();
    } catch (error) {
      file = "";
    }
    var vehicle = new FormData(e.target);
    let files = this.pond.getFiles();
    files.forEach((file) => {
      vehicle.append("files", file.file);
    });
    vehicle.append("IdCompany", localStorage["idCompany"]);
    vehicle.append("file", file);
    vehicle.append("id", this.props.id);
    this.props.saveDataTruck(vehicle);
  }

  render() {
    return (
      <Col className="mb-4" style={{ marginTop: "4%" }}>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label htmlFor="text-input">
                  Profile picture
                </Label>
                <Alert className="bg-light">
                  Please add profile picture for your vehicle
                </Alert>
              </FormGroup>
              <FormGroup>
                <Label
                  className="error"
                  id="error"
                  style={{
                    display: "none",
                    marginLeft: "10px",
                    fontSize: "8pt",
                  }}
                >
                  File not supported
                </Label>
                <CustomInput
                  type="file"
                  id="file"
                  accept="image/png, .jpeg, .jpg"
                  onChange={this.fileChangedHandler}
                  name="file"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="text-input">Vehicle Number</Label>
                <Input
                  type="text"
                  defaultValue={this.props.truck.VehicleNumber}
                  id="vnumber"
                  name="VehicleNumber"
                  maxLength="20"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">License Plate</Label>
                <Input
                  type="text"
                  defaultValue={this.props.truck.Plate}
                  id="plate"
                  name="Plate"
                  maxLength="20"
                  onKeyUp={mayus}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="text-input">VIN/SN</Label>
                <Input
                  type="text"
                  defaultValue={this.props.truck.Vin}
                  id="vin"
                  name="Vin"
                  maxLength="20"
                  onKeyUp={mayus}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Make</Label>
                <Input
                  type="text"
                  id="Make"
                  name="Make"
                  defaultValue={this.props.truck.Make}
                  maxLength="20"
                  required
                />
              </FormGroup>
              <FormGroup>
                <DatePicker
                  id="expdate"
                  name="PlateExpiration"
                  labelText="Registration Expiration"
                  value={dateConvertTables(this.props.truck.PlateExpiration)}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="text-input">Vehicle Type</Label>
                <select
                  name="VehicleType"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.truck.VehicleType !== "") &
                      (this.state.VehicleType === "")
                      ? this.props.truck.VehicleType
                      : this.state.VehicleType
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
              </FormGroup>

              <FormGroup>
                <Label htmlFor="text-input">Plate State</Label>
                <Select
                  options={this.props.states}
                  name="PlateState"
                  onChange={this.onChange}
                  value={
                    this.state.PlateState !== ""
                      ? this.state.PlateState
                      : this.props.truck.PlateState >= 0
                        ? this.props.truck.PlateState
                        : ""
                  }
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="text-input">Year</Label>
                <Input
                  defaultValue={this.props.truck.Year}
                  type="text"
                  id="year"
                  name="Year"
                  maxLength="4"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Model</Label>
                <Input
                  defaultValue={this.props.truck.Model}
                  type="text"
                  id="model"
                  name="Model"
                  maxLength="20"
                  required
                />
              </FormGroup>
            </Col>
            <Col md="4" className="text-right">
              <Button
                size="md"
                type="submit"
                outline
                className="buttons-royal text-white"
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>
            </Col>
          </Row>
          <Row>
          { this.temp.length ? (
          <Col md="6">
              <div style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: '30px' }}>
                <Card>
                  <SimpleImageSlider
                    width="100%"
                    height={375}
                    images={this.temp}
                    showNavs={true}
                    navStyle={1}
                    showBullets={true}

                  />
                </Card>
              </div>
            </Col>
            ) : null }
            <Col md="6">
              <FormGroup>
                <Label htmlFor="text-input">
                  Vehicle Photos
                </Label>
                <Alert className="bg-light">
                  Please add pictures of the vehicle: Front, Sides, Back and
                  details you want to keep record for the future
                </Alert>
                <FilePond
                  ref={ref => (this.pond = ref)}
                  // files={this.temp}
                  files={this.state.files}
                  allowMultiple={true}
                  allowReorder={true}
                  maxFiles={4}
                  instantUpload={false}
                  name="files"
                  imagePreviewMaxHeight={128}
                  oninit={() => this.handleInit()}
                  maxParallelUploads={4}
                  onupdatefiles={(countFiles) => {
                    this.setState({
                      countFiles: countFiles.length,
                      files: countFiles.map(fileItem => fileItem.file),
                    });
                    // if(countFiles.length > 0) {
                    //   this.temp = countFiles
                    // }
                  }}
                />
              </FormGroup>
            </Col>
          {/* </Row>
          <Row> */}
            
          </Row>

          <Row className="mt-5">
            <Col md="12">
              <h6>ADDITIONAL DETAILS</h6>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="text-input">Ownership Status</Label>
                <select
                  name="Condition"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.truck.Condition !== null) &
                      (this.state.Condition === "")
                      ? this.props.truck.Condition
                      : this.state.Condition
                  }
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
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Cost</Label>
                <Input
                  type="text"
                  defaultValue={this.props.truck.Cost}
                  id="cost"
                  name="Cost"
                  maxLength="15"
                  pattern="[0-9]+"
                  title="Only numbers are allowed"
                />
              </FormGroup>
              <FormGroup>
                <DatePicker
                  id="received"
                  name="InServiceDate"
                  labelText="Received Date"
                  value={dateConvertTables(this.props.truck.InServiceDate)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Fuel Type</Label>
                <select
                  name="FuelType"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.truck.FuelType !== null) &
                      (this.state.FuelType === "")
                      ? this.props.truck.FuelType
                      : this.state.FuelType
                  }
                  required
                >
                  <option value="">SELECT</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Gasoline">Gasoline</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Hazmat</Label>
                <select
                  name="Hazmat"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.truck.Hazmat !== null) &
                      (this.state.Hazmat === "")
                      ? this.props.truck.Hazmat
                      : this.state.Hazmat === ""
                        ? JSON.parse(localStorage.getItem("user")).Hazmat
                        : this.state.Hazmat
                  }
                  required
                >
                  <option value="">SELECT</option>
                  <option value="true">YES</option>
                  <option value="false">NO</option>
                </select>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="text-input">Weight</Label>
                <Input
                  type="text"
                  defaultValue={this.props.truck.Weight}
                  id="weight"
                  name="Weight"
                  pattern="[0-9]+"
                  title="Only numbers are allowed"
                  maxLength="20"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Odometer</Label>
                <Input
                  type="text"
                  defaultValue={this.props.truck.Odometer}
                  id="odometer"
                  name="Odometer"
                  pattern="[0-9]+"
                  title="Only numbers are allowed"
                  maxLength="20"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Engine</Label>
                <Input
                  type="text"
                  defaultValue={this.props.truck.Engine}
                  id="engine"
                  name="Engine"
                  maxLength="20"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Tire size</Label>
                <select
                  name="TireSize"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.truck.TireSize !== null) &
                      (this.state.TireSize === "")
                      ? this.props.truck.TireSize
                      : this.state.TireSize === ""
                        ? JSON.parse(localStorage.getItem("user")).TireSize
                        : this.state.TireSize
                  }
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
              </FormGroup>
            </Col>
            <Col ms="4" className="text-right">
              {/* <Button
                size="md"
                type="sumit"
                outline
                className="buttons-royal text-white"
                disabled={this.props.isLoading ? true : false}
              >
                Cancel
              </Button> */}
              <Button
                size="md"
                type="submit"
                outline
                className="buttons-royal text-white"
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>
            </Col>
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
              <div></div>
            )}
          </Row>
        </Form>
      </Col>
    );
  }
}

export default connect(
  (state) => state.trucks,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Details);
