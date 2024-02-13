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
  Alert,
  Label,
  Input,
  Form,
  Row,
} from "reactstrap";

import mayus from "./../../../services/mayus";
import PdfRT from "./../Pdf/PdfRT";
import TableCom from "./../../../components/Table";
import DatePicker from "./../../../components/DatePicker";
import dateConvertTables from "./../../../services/dateConvertTables";
import "./cssDM/TablesPDF.css";

import ToastAlert from "../../../components/ToastAlert";
const userId = JSON.parse(localStorage.getItem("user")).Id;
const IdComp = localStorage["idCompany"];

//ROADTEST CERTIFICATION

class RoadTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StateLicense: "",
      image: "",
      error: "",
      errorM: "",
      PretripInspection: false,
      CouplinAndUncoupling: false,
      PlacingComercial: false,
      CommercialMotorVehicle: false,
      TourungCommercialMotor: false,
      BreakingAndSlowCommercial: false,
      BackingAndParkingCommercial: false,
      OperatingCommercialMotor: false,
      RoadTestPerformedBy: "",
      dontExist: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.open = this.open.bind(this);
    this.onChange = this.onChange.bind(this);
    this.catchError = this.catchError.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://bluagent-files.s3-us-west-2.amazonaws.com/${IdComp}/Users/${userId}/signature.png`
      )
      .then((response) => {
        this.setState({ dontExist: false });
      })
      .catch((error) => {
        this.setState({ dontExist: true });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.props.list.length === 0 &&
      this.props.driver.License !== null &&
      this.props.company.FileSignature !== null
    ) {
      var rt = new FormData(e.target);
      let fecha = Date.now();
      rt.append("IdDriver", this.props.id);
      rt.append("DateC", Date.parse(fecha));
      rt.append("FileSignatureDer", this.props.company.FileSignature);
      rt.append("CompanyName", this.props.company.LegalName);
      rt.append(
        "CompanyAddress",
        this.props.company.PhysicalAddress +
          ", " +
          this.props.company.PhysicalCity +
          ", " +
          this.props.company.State +
          ", " +
          this.props.company.PhysicalZip
      );
      rt.append("IdCompany", this.props.company.Id);
      rt.append("Title", "DER");
      rt.append("idLoggedUser", userId);
      // rt.append("PretripInspection", this.state.PretripInspection);
      // rt.append("CouplinAndUncoupling", this.state.CouplinAndUncoupling);
      // rt.append("PlacingComercial", this.state.PlacingComercial);
      // rt.append("CommercialMotorVehicle", this.state.CommercialMotorVehicle);
      // rt.append(
      //   "OperatingCommercialMotor",
      //   this.state.OperatingCommercialMotor
      // );
      // rt.append("TourungCommercialMotor", this.state.TourungCommercialMotor);
      // rt.append(
      //   "BreakingAndSlowCommercial",
      //   this.state.BreakingAndSlowCommercial
      // );
      // rt.append(
      //   "BackingAndParkingCommercial",
      //   this.state.BackingAndParkingCommercial
      // );
      rt.append("RoadTestPerformedBy", this.state.RoadTestPerformedBy);

      this.props.submit(rt);
    } else {
      if (this.props.list.length !== 0) {
        this.setState({
          toastAlertState: true,
          error: "Road test is completed can't add more",
        });
        this.props.toggle();
      }
      if (this.props.company.FileSignature === null) {
        this.setState({
          toastAlertState: true,
          error: "DER's signature is Required",
        });
        this.props.toggle();
      }
    }
  }

  onChange(e) {
    this.setState({ StateLicense: e.target.value });
  }

  open() {
    var canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 180;
    var img = new Image();
    img.src =
      "assets/img/Images/signatures/" + this.props.company.FileSignature;
    img.onload = () => {
      canvas.getContext("2d").drawImage(img, 0, 0);
      this.setState({ image: canvas.toDataURL() });
    };
    this.setState({ error: "", errorM: "" });
    this.props.toggle(
      this.props.id,
      this.props.driver.Country,
      this.props.company.Id,
      userId
    );
  }

  catchError() {
    this.setState({ error: "*" });
  }

  getStateName(States, state) {
    var stateName = "";
    if (States !== undefined && state !== null) {
      States.map((row) => {
        if (row.Id === state) {
          stateName = row.Name;
        }
        return row;
      });
    }
    return stateName;
  }

  onVehicleTypeChange(e) {
    const vehicleType = e.target.value;

    document.getElementById("idTrailer").disabled =
      vehicleType.trim() === "Bus";
  }

  handleChecked = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  // handlePreTrip = (e) => {
  //   this.setState({ PretripInspection: e.target.checked });
  // };
  // handleCoupling = (e) => {
  //   this.setState({ CouplinAndUncoupling: e.target.checked });
  // };
  // handlePlacing = (e) => {
  //   this.setState({ PlacingComercial: e.target.checked });
  // };

  // handleCommercial = (e) => {
  //   this.setState({ CommercialMotorVehicle: e.target.checked });
  // };

  // handleOperating = (e) => {
  //   this.setState({ OperatingCommercialMotor: e.target.checked });
  // };

  // handleTouring = (e) => {
  //   this.setState({ TourungCommercialMotor: e.target.checked });
  // };

  // handlePlacingBrakingAndSolor = (e) => {
  //   this.setState({ BreakingAndSlowCommercial: e.target.checked });
  // };
  // handleAndParking = (e) => {
  //   this.setState({ BackingAndParkingCommercial: e.target.checked });
  // };

  handleRoadTestPerformedBy = (e) => {
    this.setState({ RoadTestPerformedBy: e.target.value });
  };

  getsignature = () => {};

  render() {
    let rep = ["DATE", "DRIVER NAME", "COMPANY"];
    let rowItems = this.props.list.map((row, index) => (
      <React.Fragment>
        <tr key={index}>
          <td className="text-center">{dateConvertTables(row.DateC)}</td>
          <td className="text-center">{row.DriverName}</td>
          <td className="text-center">{row.CompanyName}</td>
        </tr>
        <tr>
          <td className="text-center" colSpan={"3"}>
            <PdfRT
              driver={this.props.driver}
              info={row}
              index={index}
              catchError={() => {
                this.catchError();
              }}
            />
          </td>
        </tr>
      </React.Fragment>
    ));

    return (
      <div className="col-md-3">
        <input
          onClick={() => {
            this.open();
          }}
          className="img-responsive"
          type="image"
          src="assets/icons/icons8-new-resume-template.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src =
              "assets/icons/icons8-new-resume-template.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src =
              "assets/icons/icons8-new-resume-template.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>ROAD TEST</h6>
        <Modal
          isOpen={this.props.modal}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.props.toggle}
        >
          <ModalHeader name="modal1" toggle={this.props.toggle}>
            ROAD TEST CERTIFICATION
          </ModalHeader>
          <Col md="12">
            <Alert
              style={{
                backgroundColor: "#dff0fe",
                borderLeft: "4px solid #dff0fe",
                borderColor: "#4788c7",
                color: "#4788c7",
                padding: "15px 20px",
              }}
            >
              Notice: <i className="fas fa-exclamation-circle"></i> Driver
              information needs to be completed on the{" "}
              <strong>Driver's Account Section</strong>
            </Alert>
          </Col>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Driver Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="DriverName"
                    defaultValue={
                      this.props.driver.Name + " " + this.props.driver.LastName
                    }
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="ssn">
                    Social Security Number
                    <span className="error">
                      {this.props.driver.Ssn === null ? this.state.error : ""}
                    </span>
                  </Label>
                  <Input
                    type="text"
                    id="ssn"
                    name="Ssn"
                    defaultValue={this.props.driver.Ssn}
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="license">
                    Operator Lincense Number
                    <span className="error">
                      {this.props.driver.License === null
                        ? this.state.error
                        : ""}
                    </span>
                  </Label>
                  <Input
                    type="text"
                    id="License"
                    name="License"
                    maxLength="12"
                    onKeyUp={mayus}
                    defaultValue={this.props.driver.License}
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="state">
                    State
                    <span className="error">
                      {this.props.driver.StateLicense === null
                        ? this.state.error
                        : ""}
                    </span>
                  </Label>
                  <Input
                    name="StateLicense"
                    id="StateLicense"
                    value={this.getStateName(
                      this.props.states,
                      this.props.driver.StateLicense
                    )}
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  {this.props.driver.LicenseFile !== null ? (
                    <div>
                      <Label htmlFor="text-input">File License</Label>
                      <br />
                      <Button
                        color="primary"
                        onClick={() => {
                          this.props.download(
                            this.props.id,
                            "",
                            this.props.driver.LicenseFile
                          );
                        }}
                      >
                        Download License File
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </FormGroup>
              {rowItems.length > 0 ? (
                <div>
                  <Alert
                    style={{
                      backgroundColor: "#dff0fe",
                      borderLeft: "4px solid #dff0fe",
                      borderColor: "#4788c7",
                      color: "#4788c7",
                      padding: "15px 20px",
                    }}
                  >
                    Notice: <i className="fas fa-exclamation-circle"></i> Road
                    test is completed can't add more
                  </Alert>
                </div>
              ) : (
                <div>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="text-input">Type of Power Unit</Label>
                      <select
                        name="TypeEquipment"
                        className="form-control"
                        required
                        onChange={this.onVehicleTypeChange}
                      >
                        <option value="">select</option>
                        <option value="Truck ">Truck</option>
                        <option value="Tow Truck">Tow Truck</option>
                        <option value="Semi-Trailer Truck">
                          Semi-Trailer Truck
                        </option>
                        <option value="Box Truck">Box Truck</option>
                        <option value="Flatbed Truck">Flatbed Truck</option>
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="Bus">Bus</option>
                        <option value="Pick-Up">Pick-Up</option>
                      </select>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="text-input">Type of Trailer</Label>
                      <select
                        id="idTrailer"
                        name="ClassEquipment"
                        className="form-control"
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
                        <option value="Step Deck Trailer">
                          Step Deck Trailer
                        </option>
                        <option value="Conestaga Trailer">
                          Conestaga Trailer
                        </option>
                        <option value="Container 53">Container 53"</option>
                        <option value="Container 48">Container 48"</option>
                      </select>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="text-input">
                        If Passenger Carrier,Type of Bus
                      </Label>
                      <Input type="text" id="BusCarrier" name="TypeBus" />
                    </Col>
                    <Col md="6">
                      <DatePicker
                        id="RoadtestDate"
                        name="DateC"
                        labelText="Date of Certification"
                      />
                    </Col>
                  </FormGroup>

                  <div
                    style={{
                      borderBottom: "1px dashed #3b86ff",
                      padding: "5px 10px",
                      marginBottom: "15px",
                    }}
                  ></div>

                  <Row>
                    <Col md="12">
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            name="PretripInspection"
                            id="PretripInspection"
                            // checked={this.state.PretripInspection}
                            value="true"
                            onChange={this.handleChecked}
                          />{" "}
                          Pretrip Inspection required by §392.27
                        </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            name="CouplinAndUncoupling"
                            id="CouplinAndUncoupling"
                            // checked={this.state.CouplinAndUncoupling}
                            value="true"
                            onChange={this.handleChecked}
                          />{" "}
                          Coupling and uncoupling of combination units, if the
                          equipment he/she may drive includes combinations
                          units;
                        </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            name="PlacingComercial"
                            id="PlacingComercial"
                            // checked={this.state.PlacingComercial}
                            value="true"
                            onChange={this.handleChecked}
                          />{" "}
                          Placing the commercial motor vehicle in operation;
                        </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input
                            name="CommercialMotorVehicle"
                            id="CommercialMotorVehicle"
                            type="checkbox"
                            // checked={this.state.CommercialMotorVehicle}
                            value="true"
                            onChange={this.handleChecked}
                          />{" "}
                          Use of the commercial motor vehicle's controls and
                          emergency equipment;
                        </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            name="OperatingCommercialMotor"
                            id="OperatingCommercialMotor"
                            // checked={this.state.OperatingCommercialMotor}
                            value="true"
                            onChange={this.handleChecked}
                          />{" "}
                          Operating the commercial motor vehicle in traffic and
                          while passing other motor vehicles;
                        </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            name="TourungCommercialMotor"
                            id="TourungCommercialMotor"
                            // checked={this.state.TourungCommercialMotor}
                            value="true"
                            onChange={this.handleChecked}
                          />{" "}
                          Turning the commercial motor vehicle;
                        </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="BreakingAndSlowCommercial"
                            name="BreakingAndSlowCommercial"
                            // checked={this.state.BreakingAndSlowCommercial}
                            value="true"
                            onChange={this.handleChecked}
                          />{" "}
                          Braking, and slowing the commercial motor vechicle by
                          means other than braking; and
                        </Label>
                      </FormGroup>

                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="BackingAndParkingCommercial"
                            name="BackingAndParkingCommercial"
                            // checked={this.state.BackingAndParkingCommercial}
                            value="true"
                            onChange={this.handleChecked}
                          />{" "}
                          Braking and parking the commercial motor vehicle
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup row>
                    <Col md="6">
                      <Label>Performed By</Label>
                      <Input
                        id="RoadTestPerformedBy"
                        name="RoadTestPerformedBy"
                        placeholder="Performed by"
                        value={this.state.RoadTestPerformedBy}
                        onChange={this.handleRoadTestPerformedBy}
                      />
                    </Col>
                  </FormGroup>

                  <Row>
                    <Col md="12">
                      {this.state.dontExist ? (
                        <Alert
                          color="danger"
                          style={{
                            borderLeft: "4px solid #813838",
                            borderColor: "#813838",
                            padding: "15px 20px",
                          }}
                        >
                          Notice: <i className="fas fa-exclamation-circle"></i>
                          DER Signature is required to certify Road Test. Go to{" "}
                          <a href={"/#/Users/" + userId}>
                            <strong>Profile Section</strong>
                          </a>
                        </Alert>
                      ) : (
                        " "
                      )}
                    </Col>
                  </Row>
                  <FormGroup row className="mt-2">
                    <Col md="12">
                      {this.props.statusR === "ACTIVE" ? (
                        <>
                          <Button
                            className="buttons-royal text-white px-5 py-2 btn"
                            type="submit"
                            disabled={
                              this.props.isLoading ||
                              JSON.parse(localStorage.getItem("user")).Role ===
                                "DRIVER" ||
                              this.props.company.FileSignature === null
                                ? true
                                : false
                            }
                          >
                            Save
                          </Button>
                          <Button
                            className="buttons-royal text-white px-5 py-2 btn"
                            onClick={this.props.toggle}
                          >
                            Cancel
                          </Button>{" "}
                        </>
                      ) : (
                        ""
                      )}{" "}
                    </Col>
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
                      <div />
                    )}
                  </FormGroup>
                </div>
              )}
            </Form>
            <TableCom
              rowItems={rowItems}
              header={rep}
              count={this.props.count}
              page={this.props.page}
              getItems={(index) => {
                this.props.get(
                  this.props.id,
                  index,
                  3,
                  this.props.company.Id,
                  userId
                );
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.toggle}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <ToastAlert
          toggleToast={this.props.toggleToast}
          isOpen={this.state.toastAlertState}
          message={this.state.error}
        />
      </div>
    );
  }
}

export default RoadTest;
