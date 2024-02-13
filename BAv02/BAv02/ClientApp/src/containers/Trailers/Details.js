import React, { Component } from "react";
import {
  Col,
  Label,
  FormGroup,
  Input,
  CustomInput,
  Button,
  Row,
  Form,
  Alert,
  Card
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Trailers";
import dateConvertTables from "./../../services/dateConvertTables";
import mayus from "./../../services/mayus";
import Select from "./../../components/Select";
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
      TrailerType: "",
      Ownership: "",
      Hazmat: "",
      File: [],
      TireSize: "",
      files: [],
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
    //Cambiar por otra peticion para trailers
    this.props.getTrailerPhotos(this.props.id, "TrailerPhotos");
    this.props.getStates();
    this.props.getTrailer(
      this.props.id,
      JSON.parse(localStorage.getItem("user")).Id
    );
    this.forceUpdate();
  }

  componentDidUpdate() {
    // Cambiar codigo para trailers
    if (this.props.trailerPhotos.length > 0) {
      for (var i = 0; i < this.props.trailerPhotos.length; i++) {
        this.temp[i] = `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/TrailersFile/${this.props.trailerPhotos[i].IdVehicle}/TrailerPhotos/${this.props.trailerPhotos[i].DocName}`
      }
      this.setState();
    }
  }

  handleInit() {
    console.log('FilePond instance has been initialized', this.pond);
  }

  onChange(event) {
    const { name, value } = event.target;
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
      } catch (error) {}
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
    var trailer = new FormData(e.target);
    let files = this.pond.getFiles();
    files.forEach((file) => {
      trailer.append("files", file.file);
    });
    trailer.append("IdCompany", localStorage["idCompany"]);
    trailer.append("file", file);
    trailer.append("id", this.props.id);
    this.props.saveTrailer(trailer);
  }

  render() {
    return (
      <Col className="mb-4" style={{ marginTop: "4%" }}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col md="12">
              <FormGroup>
                <Label htmlFor="text-input">
                  Profile picture
                </Label>
                <Alert className="bg-light">
                Please add profile picture for your trailer
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
            <Col>
              <FormGroup>
                <Label htmlFor="text-input">Vin Number</Label>
                <Input
                  type="text"
                  defaultValue={this.props.trailer.Vin}
                  id="vin"
                  name="Vin"
                  onKeyUp={mayus}
                  maxLength="20"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Trailer Number</Label>
                <Input
                  type="text"
                  defaultValue={this.props.trailer.TrailerNumber}
                  id="tnumber"
                  name="TrailerNumber"
                  onKeyUp={mayus}
                  maxLength="20"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Trailer Type</Label>
                <select
                  name="TrailerType"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.trailer.TrailerType !== "") &
                    (this.state.TrailerType === "")
                      ? this.props.trailer.TrailerType
                      : this.state.TrailerType
                  }
                  required
                >
                  <option value="">SELECT</option>
                  <option value="Flat Bed 53">Flat Bed 53"</option>
                  <option value="Flat Bed 48">Flat Bed 48"</option>
                  <option value="Expandable Flat Bed">
                    Expandable Flat Bed
                  </option>
                  <option value="Drop Deck">Drop Deck</option>
                  <option value="Expandable Drop Deck">
                    Expandable Drop Deck
                  </option>
                  <option value="Auto Hauler">Auto Hauler</option>
                  <option value="Dry Freight 53">Dry Freight 53"</option>
                  <option value="Dry Freight 48">Dry Freight 48"</option>
                  <option value="Low Boy">Low Boy</option>
                  <option value="Tank Trailer">Tank Trailer</option>
                  <option value="Tank Trailer MC - 306">
                    Tank Trailer MC - 306
                  </option>
                  <option value="Tank Trailer MC - 307">
                    Tank Trailer MC - 307
                  </option>
                  <option value="Tank Trailer MC - 312">
                    Tank Trailer MC - 312
                  </option>
                  <option value="Tank Trailer MC - 331">
                    Tank Trailer MC - 331
                  </option>
                  <option value="Tank Trailer MC - 338">
                    Tank Trailer MC - 338
                  </option>
                  <option value="Refrigerated Dry Trailer">
                    Refrigerated Dry Trailer
                  </option>
                  <option value="Pole Trailer">Pole Trailer</option>
                  <option value="Step Deck Trailer">Step Deck Trailer</option>
                  <option value="Conestaga Trailer">Conestaga Trailer</option>
                  <option value="Container 53">Container 53"</option>
                  <option value="Container 48">Container 48"</option>
                </select>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label htmlFor="text-input">Plate</Label>
                <Input
                  type="text"
                  defaultValue={this.props.trailer.Plate}
                  id="plate"
                  name="Plate"
                  onKeyUp={mayus}
                  maxLength="15"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Plate State</Label>
                <Select
                  name="PlateState"
                  options={this.props.states}
                  onChange={this.onChange}
                  value={
                    this.state.PlateState !== ""
                      ? this.state.PlateState
                      : this.props.trailer.PlateState >= 0
                      ? this.props.trailer.PlateState
                      : ""
                  }
                  required
                />
              </FormGroup>
              <FormGroup>
                <DatePicker
                  id="expdate"
                  name="PlateExpiration"
                  labelText="Expiration Date"
                  value={dateConvertTables(this.props.trailer.PlateExpiration)}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <Button
                size="md"
                type="submit"
                className="buttons-royal text-white mt-4"
              >
                Save
              </Button>
              {this.props.isLoading ? (
                <img
                  style={{
                    width: "140px",
                    position: "absolute",
                    marginTop: "0px",
                    right: "40%",
                  }}
                  src="../../assets/img/icons/loading2.gif"
                  alt="loading"
                />
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
          <Row>
          { this.temp.length > 0 ? (
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
            <FormGroup>
              <Label htmlFor="text-input">
                Trailer Photos
              </Label>
              <Alert className="bg-light">
                Please add pictures of the trailer: Front, Sides, Back and
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





          </Row>
          <Row>
            <Col>
              <h5 className="mb-4 mt-4">ADDITIONAL DETAILS</h5>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="Make">Make</Label>
                <Input
                  type="text"
                  defaultValue={this.props.trailer.Make}
                  id="Make"
                  name="Make"
                  onKeyUp={mayus}
                  maxLength="20"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Model</Label>
                <Input
                  type="text"
                  defaultValue={this.props.trailer.Model}
                  id="model"
                  name="Model"
                  onKeyUp={mayus}
                  maxLength="20"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Year</Label>
                <Input
                  type="text"
                  defaultValue={this.props.trailer.Year}
                  id="year"
                  name="Year"
                  maxLength="4"
                  minLength="4"
                  pattern="[0-9]+"
                />
              </FormGroup>
              <FormGroup>
                <DatePicker
                  id="received"
                  name="InServiceDate"
                  labelText="Received Date"
                  value={dateConvertTables(this.props.trailer.InServiceDate)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Hazmat</Label>
                <select
                  name="Hazmat"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.trailer.Hazmat !== null) &
                    (this.state.Hazmat === "")
                      ? this.props.trailer.Hazmat
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
                <Label htmlFor="text-input">Ownership Status</Label>
                <select
                  name="Ownership"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.trailer.Ownership !== null) &
                    (this.state.Ownership === "")
                      ? this.props.trailer.Ownership
                      : this.state.Ownership
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
                  defaultValue={this.props.trailer.Cost}
                  id="cost"
                  name="Cost"
                  maxLength="15"
                  pattern="[0-9]+"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Weight</Label>
                <Input
                  type="text"
                  defaultValue={this.props.trailer.Weight}
                  id="weight"
                  name="Weight"
                  pattern="[0-9]+"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Miles</Label>
                <Input
                  type="text"
                  defaultValue={this.props.trailer.Weight}
                  id="miles"
                  name="Miles"
                  pattern="[0-9]+"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="text-input">Tire size</Label>
                <select
                  name="TireSize"
                  className="form-control"
                  onChange={this.onChange}
                  value={
                    (this.props.trailer.TireSize !== null) &
                    (this.state.TireSize === "")
                      ? this.props.trailer.TireSize
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
            <Col md="4">
              <Button
                size="md"
                type="sumit"
                className="buttons-royal text-white mt-4"
              >
                Save
              </Button>
              {this.props.isLoading ? (
                <img
                  style={{
                    width: "140px",
                    position: "absolute",
                    marginTop: "0px",
                    right: "40%",
                  }}
                  src="../../assets/img/icons/loading2.gif"
                  alt="loading"
                />
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }
}
export default connect(
  (state) => state.trailers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Details);
