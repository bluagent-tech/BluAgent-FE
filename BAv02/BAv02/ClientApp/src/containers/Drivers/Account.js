import React, { Component } from "react";
import {
  Input,
  Col,
  Label,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  CustomInput,
  UncontrolledTooltip,
  Form,
  Alert,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Drivers";
import Address from "./../Drivers/DriverModal/Address";
import DrivingExperience from "./../Drivers/DriverModal/DrivingExperience";
import Accidents from "./../Drivers/DriverModal/Accidents";
import Traffics from "./../Drivers/DriverModal/Traffics";
import Records from "./../Drivers/DriverModal/Records";
import dateConvertTables from "./../../services/dateConvertTables";
import mayus from "../../services/mayus";
import Select from "../../components/Select";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";
import TableCom from "./../../components/Table";
import Signature from "./../signaturejs";
import NumberFormat from "react-number-format";
import DatePicker from "../../components/DatePicker";
import DriverAgreement from "./../Company/DriverAgreement/DriverAgreement";
import uploadCloud from '../../assets/icons/icons8-upload-cloud.png';
import '../../assets/css/DriversAccount.css';
const userId = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = JSON.parse(localStorage.getItem("idCompany"));

//ACCOUNT DETAILS

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeE: 0,
      modalDT1: false,
      modalDT2: false,
      countryPhone: undefined,
      Country: "",
      Gender: "",
      StateLicense: "",
      TypeLicense: "",
      DeniedLicense: null,
      LicenseSuspended: null,
      DeniedLicenseComments: null,
      LicenseSuspendedComments: null,
      expirationDate: null,
      FileLicense: [],
      signatureR: "",
      StatusR: "ACTIVE",
      check: false,
      driverAgreement: false,
      driver: [],
      companyInfo: [],
      date: "",
      hiringDate: "",
      loadingExpiredLicense: false,
      signatureDate: "",
      noEmployerRecords: false,
    };
    this.toggleDT1 = this.toggleDT1.bind(this);
    this.readFileF = this.readFileF.bind(this);
    this.toggleDT2 = this.toggleDT2.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeG = this.onChangeG.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleHiringDate = this.handleHiringDate.bind(this);
  }

  componentDidMount() {
    this.props.getDriverData(this.props.id, idCompany);
    this.props.getAddress(this.props.id, 1, 3);
    this.props.getDrivingExp(this.props.id, 1, 3);
    this.props.getAccidentRec(this.props.id, 1, 3);
    this.props.getTrafficConv(this.props.id, 1, 3);
    this.props.getEmploymentR(this.props.id, 1, 3);
    this.setState({ StatusR: this.props.driver.Status });

    setTimeout(() => {
      if (this.props.driver.DeniedLicense === "Y") {
        document.getElementById("DeniedLicenseN").checked = false;
      } else {
        document.getElementById("DeniedLicenseN").checked = true;
      }
      if (this.props.driver.LicenseSuspended === "Y") {
        document.getElementById("LicenseSuspendedN").checked = false;
      } else {
        document.getElementById("LicenseSuspendedN").checked = true;
      }
      const now = Date.now;
      if (
        this.props.driver.LicenseExpiration !== null &&
        this.props.driver.LicenseExpiration !== undefined
      ) {
        if (this.props.driver.LicenseExpiration.getTime < now.getTime) {
          this.setState({ loadingExpiredLicense: true });
        } else {
          if (this.props.driver.LicenseFile === null) {
            this.setState({ loadingExpiredLicense: true });
          }
        }
      } else {
        this.setState({ loadingExpiredLicense: true });
      }
    }, 2000);
    fetch("/api/Drivers/getDriverAuthorizationConsent?idU=" + this.props.id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        const result = JSON.parse(response);
        if (result.driverAuthorizationConsent.SignatureDate !== null) {
          this.setState({
            signatureDate: result.driverAuthorizationConsent.SignatureDate,
          });
        }
      })
      .catch((error) => {
        console.log("Error Getting Consent " + error);
      });
  }

  handleHiringDate(e) {
    this.setState({
      hiringDate: e.target.value,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalDE !== prevProps.modalDE) {
      var t = 0;
      if (this.props.modalDE === true) {
        if (
          this.state.typeE === 0 &&
          this.props.drivingEx.ClassEquipment !== undefined
        ) {
          if (this.props.drivingEx.ClassEquipment === "Trailer") {
            t = 1;
          } else {
            t = 2;
          }
        }
      }
      this.setState({ typeE: t });
    }

    if (this.state.StatusR === undefined) {
      if (this.props.driver.Status === "ACTIVE") {
        document.getElementById("userImage").style.display = "block";
      } else {
        document.getElementById("userImage").style.display = "none";
      }
    }

    if (this.props.driver.CountryLicense !== prevProps.driver.CountryLicense) {
      this.props.getStates(this.props.driver.CountryLicense);
    }
  }

  componentWillUnmount() {
    this.props.clean();
  }

  onChange(e) {
    this.setState({ Country: e.target.value });
    this.props.getStates(e.target.value);
  }

  onChangeG(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onChangeAgreement = (e) => {
    this.setState({ driverAgreement: e.target.checked });
  };

  onChangeCheck(e) {
    const { checked, name } = e.target;
    if (checked) {
      this.setState({ [name]: true });
    } else {
      this.setState({ [name]: false });
      if (name === "DeniedLicense") {
        this.setState({ DeniedLicenseComments: "" });
      } else {
        this.setState({ LicenseSuspendedComments: "" });
      }
    }

    if (name === "DeniedLicense") {
      if (checked === true) {
        document.getElementById("DeniedLicenseN").checked = false;
        document.getElementById("btnDeniedLicense").disabled = false;
      } else {
        document.getElementById("DeniedLicenseN").checked = true;
        document.getElementById("btnDeniedLicense").disabled = true;
      }
    } else if (name === "DeniedLicenseN") {
      if (checked === true) {
        document.getElementById("DeniedLicenseY").checked = false;
        document.getElementById("btnDeniedLicense").disabled = true;
      } else {
        document.getElementById("DeniedLicenseY").checked = true;
        document.getElementById("btnDeniedLicense").disabled = false;
      }
    } else if (name === "LicenseSuspended") {
      if (checked === true) {
        document.getElementById("LicenseSuspendedN").checked = false;
        document.getElementById("btnLicenseSuspended").disabled = false;
      } else {
        document.getElementById("LicenseSuspendedN").checked = true;
        document.getElementById("btnLicenseSuspended").disabled = true;
      }
    } else if (name === "LicenseSuspendedN") {
      if (checked === true) {
        document.getElementById("LicenseSuspendedY").checked = false;
        document.getElementById("btnLicenseSuspended").disabled = true;
      } else {
        document.getElementById("LicenseSuspendedY").checked = true;
        document.getElementById("btnLicenseSuspended").disabled = false;
      }
    }
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleChangeDate(date) {
    this.setState({ date: date });
  }

  handleSubmit(e) {
    e.preventDefault();
    document.getElementById("error").style.display = "none";

    var image = document.getElementById("image");
    var byteArray = base64ToByteArray2(image.src);
    var file = "";
    try {
      file = byteArray.toString();
    } catch (error) {
      file = "";
    }

    var driver = new FormData(e.target);
    driver.append(
      "PhoneNumber",
      e.target.countryPhone.value + " " + e.target.PhoneNumberx.value
    );

    driver.append("Image", file);
    driver.append("Id", this.props.driver.Id);
    driver.append("IdUser", this.props.id);
    driver.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    driver.append("file", this.state.FileLicense);
    driver.append("driverAgreement", this.state.driverAgreement);

    if (this.state.DeniedLicenseComments !== null) {
      driver.append("DeniedLicenseComments", this.state.DeniedLicenseComments);
    } else {
      driver.append(
        "DeniedLicenseComments",
        this.props.driver.DeniedLicenseComments
      );
    }
    if (this.state.LicenseSuspendedComments !== null) {
      driver.append(
        "LicenseSuspendedComments",
        this.state.LicenseSuspendedComments
      );
    } else {
      driver.append(
        "LicenseSuspendedComments",
        this.props.driver.LicenseSuspendedComments
      );
    }
    this.props.saveDriverData(driver);
  }

  handleCheck(e) {
    const { checked } = e.target;
    var x = document.getElementById("ssnumber");
    if (checked) {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  readFile(e) {
    var input = e.target;
    if (input) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var image = document.getElementById("image");
        image.src = e.target.result;
      };
      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) { }
    }
  }

  readFileF(e) {
    var input = e.target;
    var nameFile = input.files[0].name.substr(-4);
    if (input) {
      var reader = new FileReader();
      var file = "";
      reader.onload = (e) => {
        file = base64ToByteArray2(e.target.result);
        if (
          nameFile === ".png" ||
          nameFile === ".PNG" ||
          nameFile === ".jpeg" ||
          nameFile === ".JPEG" ||
          nameFile === ".JPG" ||
          nameFile === ".jpg"
        ) {
          document.getElementById("error").style.display = "none";
          this.setState({ FileLicense: file });
        } else {
          document.getElementById("error").style.display = "inline-block";
          this.setState({ FileLicense: "" });
        }
      };

      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) { }
    }
  }

  toggleDT1() {
    this.setState({ modalDT1: !this.state.modalDT1 });
  }

  toggleDT2() {
    this.setState({ modalDT2: !this.state.modalDT2 });
  }

  render() {
    this.props.employmentRList.map((row, index) => (
      row.EmployerName === "No Employer" && row.Email === null ? (
        this.state.noEmployerRecords = true) : (
        this.state.noEmployerRecords = false)
    ))
    let formattedDate = "";
    if (this.props.driver.HiringDate !== undefined) {
      formattedDate = this.props.driver.HiringDate.substr(0, 10);
    }
    if (this.state.signatureDate !== "") {
      formattedDate = this.state.signatureDate.substr(0, 10);
    }
    let year = new Date();
    let countries = [
      {
        Id: 1,
        Name: "UNITED STATES OF AMERICA",
      },
      {
        Id: 2,
        Name: "MEXICO",
      },
      {
        Id: 10002,
        Name: "CANADA",
      },
    ];

    let rep = ["ADDRESS", "HOW LONG?", "DATE", "VIEW"];
    let rep2 = [
      "CLASS OF EQUIPMENT",
      "TYPE OF EQUIPMENT",
      "DATE",
      "APPROX. TOTAL MILES",
      "VIEW",
    ];
    let rep3 = [
      "DATE OF ACCIDENT",
      "NATURAL ACCIDENT",
      "FATALITIES",
      "INJURIES",
      "VIEW",
    ];
    let rep4 = ["LOCATION", "DATE", "CHANGE", "PENALTY", "VIEW"];
    let rep5 = ["EMPLOYER", "EMAIL", "DATE", "POSITION HELD", "VIEW"];

    let rowItems = this.props.addresses.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.Street}</td>
        <td className="text-center">{row.HowLong}</td>
        <td className="text-center">
          {row.Present !== true
            ? dateConvertTables(row.DateOf) +
            "  to  " +
            dateConvertTables(row.DateTo)
            : dateConvertTables(row.DateOf) +
            "  to  " +
            dateConvertTables(row.CurrentDate)}
        </td>
        <td className="text-center">
          <button
            onClick={() => {
              this.props.toggleAd(row);
            }}
            className="fa fa-expand btn page-link"
            style={{
              cursor: "pointer",
              color: "royalblue",
              display: "inherit",
            }}
          />
        </td>
      </tr>
    ));

    let rowItems2 = this.props.drivingExList.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.ClassEquipment}</td>
        <td className="text-center">{row.TypeEquipment}</td>
        <td className="text-center">
          {dateConvertTables(row.DateFrom, true) +
            "  to  " +
            dateConvertTables(row.DateTo, true)}
        </td>
        <td className="text-center">{row.TotalMilesDriven}</td>
        <td className="text-center">
          <button
            onClick={() => {
              this.props.toggleDE(row);
            }}
            className="fa fa-expand btn page-link"
            style={{
              cursor: "pointer",
              color: "royalblue",
              display: "inherit",
            }}
          ></button>
        </td>
      </tr>
    ));

    let rowItems3 = this.props.accidentRecList.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{dateConvertTables(row.DateAccident)}</td>
        <td className="text-center">{row.NatureAccident}</td>
        <td className="text-center">{row.Fatalities}</td>
        <td className="text-center">{row.Injuries}</td>
        <td className="text-center">
          <button
            onClick={() => {
              this.props.toggleAR(row);
            }}
            className="fa fa-expand btn page-link"
            style={{
              cursor: "pointer",
              color: "royalblue",
              display: "inherit",
            }}
          ></button>
        </td>
      </tr>
    ));

    let rowItems4 = this.props.trafficCList.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.Locations}</td>
        <td className="text-center">{dateConvertTables(row.ConvictionDate)}</td>
        <td className="text-center">{row.Change}</td>
        <td className="text-center">{row.Penalty}</td>
        <td className="text-center">
          <button
            onClick={() => {
              this.props.toggleTC(row);
            }}
            className="fa fa-expand btn page-link"
            style={{
              cursor: "pointer",
              color: "royalblue",
              display: "inherit",
            }}
          ></button>
        </td>
      </tr>
    ));

    let rowItems5 = this.props.employmentRList.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.EmployerName}</td>
        <td className="text-center">{row.Email}</td>
        <td className="text-center">
          {`${row.DateFrom !== "0001-01-01T00:00:00"
            ? dateConvertTables(row.DateFrom)
            : "No Date Available"
            } to ${row.DateTo !== ""
              ? dateConvertTables(row.DateTo)
              : "No Date Available"
            }`}
        </td>
        <td className="text-center">{row.PositionHeld}</td>
        <td className="text-center">
          <button
            onClick={() => {
              this.props.toggleNR(row);
            }}
            className="fa fa-expand btn page-link"
            style={{
              cursor: "pointer",
              color: "royalblue",
              display: "inherit",
            }}
          ></button>
        </td>
      </tr>
    ));

    const signatureDiv = (
      <div>
        {this.props.flag ? (
          <Signature
            id={userId}
            isLoading={this.props.isLoading}
            saveSignatureFile={this.props.saveSignatureFile}
            signature={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${userId}/DriverSignature/signature.png`}
            p={
              JSON.parse(localStorage.getItem("user")).Role === "DRIVER"
                ? false
                : true
            }
          />
        ) : null}
      </div>
    );

    const signatureAgreement = (idCompany, idDriver) => (
      <div>
        <h4 className="mt-4">
          {"Driver name: "}
          {this.props.driver.Name} {this.props.driver.LastName}
        </h4>
        <h4 className="mt-4">
          {"Driver License #: "}
          {this.props.driver.License}
        </h4>
        {
          <img
            src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${idDriver}/DriverSignature/signature.png`}
            ref={(img) => (this.img = img)}
            onError={() => {
              this.img.src = "assets/img/Images/NoSignature2.png";
              this.img.style = "width:320px;height:180px;";
            }}
          />
        }
        <h4 className="mt-4">
          {"Date of signature: "}
          {formattedDate}
        </h4>
      </div>
    );

    return (
      <Col className="mb-4" style={{ marginTop: "4%" }}>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Col md="12">
              <h6>DRIVER INFORMATION</h6>
              <hr />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">First Name</Label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.driver.Name}
                id="fname"
                name="Name"
                maxLength="50"
                required
              />
            </Col>
            <Col md="4">
              <Label htmlFor="text-input">Last Name</Label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.driver.LastName}
                id="lname"
                name="LastName"
                maxLength="50"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <DatePicker
                className="form-control"
                id="Birthdate"
                name="Birthdate"
                labelText="Birthdate"
                selected={this.state.date}
                maxDate={year.setFullYear(year.getFullYear() - 15)}
                placeholderText="Click to select a date"
                showYearDropdown
                dateFormat={this.props.monthPicker ? "MM/yyyy" : undefined}
                showMonthYearPicker={this.props.monthPicker ? true : undefined}
                onChange={this.handleChangeDate.bind(this)}
                value={dateConvertTables(this.props.driver.Birthdate)}
              />
            </Col>
            <Col md="4">
              <Label htmlFor="gender">Gender</Label>
              <select
                name="Gender"
                id="gender"
                className="form-control"
                onChange={this.onChangeG}
                value={
                  (this.props.driver.Gender !== "") & (this.state.Gender === "")
                    ? this.props.driver.Gender
                    : this.state.Gender
                }
              >
                <option value="">SELECT</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">Phone Number</Label>
              <div className="form-inline">
                <select
                  style={{ width: "30%" }}
                  value={
                    this.state.countryPhone !== undefined
                      ? this.state.countryPhone
                      : this.props.driver.PhoneNumber !== undefined &&
                        this.props.driver.PhoneNumber !== null
                        ? this.props.driver.PhoneNumber.substr(0, 6)
                        : "US +1"
                  }
                  className="form-control"
                  name="countryPhone"
                  onChange={this.handleChange}
                >
                  <option value="US +1">US +1</option>
                  <option value="MX +52">MX +52</option>
                  <option value="CAN +1">CAN +1</option>
                </select>{" "}
                <NumberFormat
                  style={{ width: "68%" }}
                  format="(###) ###-####"
                  placeholder="(---) --- ----"
                  mask="_"
                  className="form-control"
                  name="PhoneNumberx"
                  value={
                    this.props.driver.PhoneNumber !== undefined &&
                      this.props.driver.PhoneNumber !== null
                      ? this.props.driver.PhoneNumber.substr(6)
                      : ""
                  }
                  required
                />
              </div>
            </Col>
            <Col md="4">
              <Label htmlFor="text-input">Social Security Number</Label>
              <label className="pull-right" style={{ cursor: "pointer" }}>
                {" "}
                <input
                  id="CheckS"
                  type="checkbox"
                  defaultChecked={false}
                  name="CheckS"
                  onClick={this.handleCheck}
                  value="Y"
                />{" "}
                Show SSN
              </label>
              <input
                type="password"
                className="form-control"
                defaultValue={this.props.driver.Ssn}
                name="Ssn"
                id="ssnumber"
                maxLength="9"
                pattern="^[0-9]*$"
                title="Only numbers are allowed"
              />
            </Col>
            {/* <Col>
              <br />
              <br />
              <label>
                {" "}
                <input
                  id="CheckS"
                  type="checkbox"
                  defaultChecked={false}
                  name="CheckS"
                  onClick={this.handleCheck}
                  value="Y"
                />{" "}
                Show SSN
              </label>
            </Col> */}
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">Country</Label>
              <Select
                name="CountryLicense"
                id="Country"
                options={this.props.Countries}
                onChange={this.onChange}
                value={
                  (this.props.driver.CountryLicense !== null) &
                    (this.state.Country === "")
                    ? this.props.driver.CountryLicense
                    : this.state.Country
                }
              />
            </Col>
            <Col md="4">
              <Label htmlFor="Email">Email</Label>
              <Input
                type="email"
                name="Email"
                id="Email"
                maxLength="100"
                defaultValue={this.props.driver.Email}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">Employee ID</Label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.driver.EmployeeId}
                name="EmployeeId"
                id="employeeid"
                maxLength="35"
              />
            </Col>
            <Col md="4" id="userImage">
              <Label>Upload Image</Label>
              <br />
              <Label
                style={{
                  cursor: "pointer",
                  borderStyle: "solid",
                  borderWidth: "thin",
                  borderRadius: "5px",
                  width: "36px",
                  height: "36px",
                }}
                htmlFor="text-input-File"
              >
                <img
                  src={uploadCloud}
                  width="35px"
                  height="35px"
                />
              </Label>
              <Input
                className="upload"
                accept="image/png, .jpeg, .jpg"
                type="file"
                id="text-input-File"
                name="FileI"
                onChange={this.readFile}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="12">
              <br />
              <br />
              <h6>DRIVER LICENSE</h6>
              <hr />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">License No.</Label>
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.driver.License}
                id="Lincese"
                name="License"
                onKeyUp={mayus}
                maxLength="16"
                required
              />
            </Col>
            <Col md="4" className="mob-col">
              <Label htmlFor="text-input">License Class</Label>
              <select
                className="form-control"
                id="TypeLicense"
                onChange={this.onChangeG}
                value={
                  (this.props.driver.TypeLicense !== null) &
                    (this.state.TypeLicense === "")
                    ? this.props.driver.TypeLicense
                    : this.state.TypeLicense
                }
                name="TypeLicense"
                required
              >
                <option value="">SELECT</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">State</Label>
              <Select
                id="StateLicense"
                name="StateLicense"
                options={this.props.StatesM}
                onChange={this.onChangeG}
                value={
                  (this.props.driver.StateLicense !== null) &
                    (this.state.StateLicense === "")
                    ? this.props.driver.StateLicense
                    : this.state.StateLicense
                }
              />
            </Col>
            <Col md="4" className="mob-col">
              <DatePicker
                className="form-control"
                id="LicenseExpiration"
                name="LicenseExpiration"
                labelText="Expiration Date"
                onChange={this.handleChangeDate.bind(this)}
                value={dateConvertTables(this.props.driver.LicenseExpiration)}
                required={this.state.loadingExpiredLicense}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            {this.props.driver.LicenseFile !== null ? (
              <Col md="4">
                <Label htmlFor="text-input">Upload Driver License</Label>
                <Label
                  className="error"
                  id="error"
                  style={{ display: "none", marginLeft: "10px", fontSize: "8pt" }}
                >
                  File not supported
                </Label>
                <Row>
                  <Col md="8">
                    <CustomInput
                      type="file"
                      id="file"
                      accept="image/png, .jpeg, .jpg, .pdf"
                      name="FileL"
                      onChange={this.readFileF}
                      disabled={this.props.driver.Status === "ACTIVE" ? false : true}
                      required={this.state.loadingExpiredLicense}
                    />
                  </Col>
                  <Col md="4" className="uploadCloud">
                    <Label htmlFor="text-input"></Label>
                    {/* {this.props.driver.LicenseFile !== null ? ( */}
                    <Button
                      color="primary"
                      onClick={() => {
                        this.props.downloadDoc(
                          this.props.id,
                          "",
                          this.props.driver.LicenseFile
                        );
                      }}
                    >
                      Download License
                    </Button>
                  </Col>
                </Row>
              </Col>
            ) : (
              <Col md="4">
                <Label htmlFor="text-input">Upload Driver License</Label>
                <Label
                  className="error"
                  id="error"
                  style={{ display: "none", marginLeft: "10px", fontSize: "8pt" }}
                >
                  File not supported
                </Label>
                <CustomInput
                  type="file"
                  id="file"
                  accept="image/png, .jpeg, .jpg, .pdf"
                  name="FileL"
                  onChange={this.readFileF}
                  disabled={this.props.driver.Status === "ACTIVE" ? false : true}
                  required={this.state.loadingExpiredLicense}
                />
              </Col>
            )}
            {/* <Col md="2">
              <Label htmlFor="text-input"></Label>
              <br />
              {this.props.driver.LicenseFile !== null ? (
                <Button
                  color="primary"
                  onClick={() => {
                    this.props.downloadDoc(
                      this.props.id,
                      "", 
                      this.props.driver.LicenseFile
                    );
                  }}
                >
                  Download License
                </Button>
              ) : (
                ""
              )}
            </Col> */}
            <Col md="4">
              <DatePicker
                className="form-control"
                id="HiringDate"
                name="HiringDate"
                labelText="Hiring Date"
                onChange={this.handleChangeDate.bind(this)}
                value={dateConvertTables(this.props.driver.HiringDate)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="12">
              <br />
              <br />
              <h6>
                IF THE ANSWER TO EITHER A OR B IS YES, ATTACH STATEMENT GIVING
                DETAILS.
              </h6>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="6">
              <label htmlFor="projectinput1">
                A. Have you ever been denied a license,
              </label>
              <label htmlFor="projectinput1">
                permit, or privilege to operate a motor vehicle?
              </label>
              <p>
                <label>
                  Yes &nbsp;
                  <input
                    id="DeniedLicenseY"
                    type="checkbox"
                    defaultChecked={this.props.driver.DeniedLicense}
                    name="DeniedLicense"
                    onClick={this.onChangeCheck}
                    value="Y"
                  />
                </label>
                <label style={{ paddingLeft: "5%" }}>
                  No &nbsp;
                  <input
                    id="DeniedLicenseN"
                    type="checkbox"
                    name="DeniedLicenseN"
                    onClick={this.onChangeCheck}
                  />
                </label>
              </p>
              <p>
                {this.props.driver.Status === "ACTIVE" ? (
                  <button
                    type="button"
                    id="btnDeniedLicense"
                    /*hidden={this.props.driver.DeniedLicense === "Y" ||
                                        this.state.DeniedLicense === true
                                        ? false
                                        : true
                                    }*/
                    disabled={
                      this.props.driver.DeniedLicense === "Y" ||
                        this.state.DeniedLicense === true
                        ? false
                        : true
                    }
                    className="btn btn-light btn-min-width mr-1 mb-1"
                    onClick={this.toggleDT1}
                  >
                    ADD COMMENT
                  </button>
                ) : (
                  ""
                )}
              </p>
            </Col>
            <Col md="6">
              <label htmlFor="projectinput1">
                B. Has any license, permit, or privilege
              </label>
              <label htmlFor="projectinput1">
                ever been suspended or revoked?
              </label>
              <p>
                <label>
                  Yes &nbsp;
                  <input
                    id="LicenseSuspendedY"
                    type="checkbox"
                    defaultChecked={this.props.driver.LicenseSuspended}
                    name="LicenseSuspended"
                    onClick={this.onChangeCheck}
                    value="Y"
                  />
                </label>
                <label style={{ paddingLeft: "5%" }}>
                  No &nbsp;
                  <input
                    id="LicenseSuspendedN"
                    type="checkbox"
                    name="LicenseSuspendedN"
                    onClick={this.onChangeCheck}
                  />
                </label>
              </p>
              <p>
                {this.props.driver.Status === "ACTIVE" ? (
                  <button
                    type="button"
                    id="btnLicenseSuspended"
                    /*hidden={
                                        this.props.driver.LicenseSuspended === "Y" ||
                                            this.state.LicenseSuspended === true
                                            ? false
                                            : true
                                    }*/
                    disabled={
                      this.props.driver.LicenseSuspended === "Y" ||
                        this.state.LicenseSuspended === true
                        ? false
                        : true
                    }
                    className="btn btn-light btn-min-width mr-1 mb-1"
                    onClick={this.toggleDT2}
                  >
                    ADD COMMENT
                  </button>
                ) : (
                  ""
                )}
              </p>
            </Col>
            <Modal isOpen={this.state.modalDT1} className={"modal-lg"}>
              <ModalHeader toggle={this.toggleDT1}> ADD COMMENT</ModalHeader>
              <ModalBody>
                <div className="form-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="DeniedLicenseComments"
                          style={{ resize: "none", height: "100px" }}
                          className="form-control"
                          placeholder=""
                          name="DeniedLicenseComments"
                          value={
                            this.state.DeniedLicenseComments !== null
                              ? this.state.DeniedLicenseComments
                              : this.props.driver.DeniedLicenseComments !==
                                null &&
                                this.props.driver.DeniedLicenseComments !==
                                "null"
                                ? this.props.driver.DeniedLicenseComments
                                : ""
                          }
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <button
                          className="btn buttons-royal text-white px-5"
                          color="primary"
                          onClick={this.toggleDT1}
                          style={{ marginLeft: "95%" }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modalDT2} className={"modal-lg"}>
              <ModalHeader toggle={this.toggleDT2}> DETAILS</ModalHeader>
              <ModalBody>
                <div className="form-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="LicenseSuspendedComments"
                          style={{ resize: "none", height: "100px" }}
                          className="form-control"
                          placeholder=""
                          name="LicenseSuspendedComments"
                          value={
                            this.state.LicenseSuspendedComments !== null
                              ? this.state.LicenseSuspendedComments
                              : this.props.driver.LicenseSuspendedComments !==
                                null &&
                                this.props.driver.LicenseSuspendedComments !==
                                "null"
                                ? this.props.driver.LicenseSuspendedComments
                                : ""
                          }
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <Button
                          className="buttons-royal text-white px-5"
                          onClick={this.toggleDT2}
                          style={{ marginLeft: "95%" }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
          </FormGroup>
          <Row>
            <Col ms="4">
              <Button
                type="submit"
                className="buttons-royal text-white px-5 py-2"
                disabled={this.props.isLoading ? true : false}
              >
                {this.props.driver === {}
                  ? "Save Information"
                  : "Update Information"}
              </Button>
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
              <div></div>
            )}
          </Row>
        </Form>

        <hr className="mt-5 mb-5" />
        {/*ADDRESS */}
        <FormGroup row>
          <Col>
            {this.props.driver.Status === "ACTIVE" ? (
              <Address
                toggle={this.props.toggleAd}
                modal={this.props.modalA}
                Countries={this.props.Countries}
                States={this.props.StatesM}
                Cities={this.props.Cities}
                getStates={this.props.getStates}
                getCities={this.props.getCities}
                id={this.props.id}
                submit={this.props.saveAddress}
                error={this.props.errorM}
                address={this.props.address}
                reload={() => {
                  this.props.getAddress(this.props.id, 1, 3);
                }}
                isLoading={this.props.isLoadingM}
              />
            ) : (
              ""
            )}
          </Col>
        </FormGroup>
        {this.props.addresses.length > 0 ? (
          <TableCom
            rowItems={rowItems}
            header={rep}
            count={this.props.countA}
            page={this.props.pageA}
            getItems={(index) => {
              this.props.getAddress(this.props.id, index, 3);
            }}
          />
        ) : (
          <Alert color='warning'>
            <Row className='pdfAlert'>
              <Col md='10' className='pdfAlertTextColumn align-self-center'>
                <Row>
                  <Col>
                    <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                      <strong>
                        Please add Address for the past three years.
                      </strong></p>
                  </Col>
                </Row>
              </Col>
              <Col md='2' className='pdfAlertIconColumn pull-right'>
                <div className='iconImgContainer pull-right'>
                  <img
                    className='imgFile pull-right'
                    src='assets/icons/icons8-box-important.svg'
                    crossOrigin='anonymous'
                    alt='ok'
                  ></img>
                </div>
              </Col>
            </Row>
          </Alert>
        )}
        {/*DRIVING */}
        <FormGroup row>
          <Col>
            {this.props.driver.Status === "ACTIVE" ? (
              <DrivingExperience
                modal={this.props.modalDE}
                toggle={() => {
                  this.props.toggleDE(null);
                }}
                id={this.props.id}
                submit={this.props.saveDrivingExp}
                drivingEx={this.props.drivingEx}
                typeE={this.state.typeE}
                reload={() => {
                  this.props.getDrivingExp(this.props.id, 1, 3);
                }}
                error={this.props.error}
                isLoading={this.props.isLoadingM}
              />
            ) : (
              ""
            )}
          </Col>
        </FormGroup>
        {this.props.drivingExList.length > 0 ? (
          <TableCom
            rowItems={rowItems2}
            header={rep2}
            count={this.props.countDE}
            page={this.props.pageDE}
            getItems={(index) => {
              this.props.getDrivingExp(this.props.id, index, 3);
            }}
          />
        ) : (
          <Alert color='warning'>
            <Row className='pdfAlert'>
              <Col md='10' className='pdfAlertTextColumn align-self-center'>
                <Row>
                  <Col>
                    <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                      <strong>
                        Please add Driving Experience if applies.
                      </strong></p>
                  </Col>
                </Row>
              </Col>
              <Col md='2' className='pdfAlertIconColumn pull-right'>
                <div className='iconImgContainer pull-right'>
                  <img
                    className='imgFile pull-right'
                    src='assets/icons/icons8-box-important.svg'
                    crossOrigin='anonymous'
                    alt='ok'
                  ></img>
                </div>
              </Col>
            </Row>
          </Alert>
        )}
        {/*ACCIDENT RECORD*/}
        <FormGroup row>
          <Col>
            {this.props.driver.Status === "ACTIVE" ? (
              <Accidents
                modal={this.props.modalAR}
                toggle={() => {
                  this.props.toggleAR(null);
                }}
                id={this.props.id}
                accidentR={this.props.accidentR}
                submit={this.props.saveAccidentRec}
                error={this.props.errorM}
                isLoading={this.props.isLoadingM}
                reload={() => {
                  this.props.getAccidentRec(this.props.id, 1, 3);
                }}
              />
            ) : (
              ""
            )}
          </Col>
        </FormGroup>
        {this.props.accidentRecList.length > 0 ? (
          <TableCom
            rowItems={rowItems3}
            header={rep3}
            count={this.props.countAR}
            page={this.props.pageAR}
            getItems={(index) => {
              this.props.getAccidentRec(this.props.id, index, 3);
            }}
          />
        ) : (
          <Alert color='success'>
            <Row className='pdfAlert'>
              <Col md='10' className='pdfAlertTextColumn align-self-center'>
                <Row>
                  <Col>
                    <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}><strong>There has not been any "Traffic" Accident in the
                      pass three years.</strong></p>
                  </Col>
                </Row>
              </Col>
              <Col md='2' className='pdfAlertIconColumn pull-right'>
                <div className='iconImgContainer pull-right'>
                  <img
                    className='imgFile pull-right'
                    src='assets/icons/icons8-ok.svg'
                    crossOrigin='anonymous'
                    alt='ok'
                  ></img>
                </div>
              </Col>
            </Row>
          </Alert>
        )}

        {/*TRAFFIC */}
        <FormGroup row>
          <Col>
            {this.props.driver.Status === "ACTIVE" ? (
              <Traffics
                modal={this.props.modalTC}
                toggle={() => {
                  this.props.toggleTC(null);
                }}
                id={this.props.id}
                submit={this.props.saveTrafficConv}
                error={this.props.errorM}
                isLoading={this.props.isLoadingM}
                trafficC={this.props.trafficC}
                reload={() => {
                  this.props.getTrafficConv(this.props.id, 1, 3);
                }}
              />
            ) : (
              ""
            )}
          </Col>
        </FormGroup>
        {this.props.trafficCList.length > 0 ? (
          <TableCom
            rowItems={rowItems4}
            header={rep4}
            count={this.props.countTC}
            page={this.props.pageTC}
            getItems={(index) => {
              this.props.getTrafficConv(this.props.id, index, 3);
            }}
          />
        ) : (
          <Alert color='success'>
            <Row className='pdfAlert'>
              <Col md='10' className='pdfAlertTextColumn align-self-center'>
                <Row>
                  <Col>
                    <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                      <strong>
                        There has not been any Traffic Convictions or Forfeitures for the past three years.
                      </strong></p>
                  </Col>
                </Row>
              </Col>
              <Col md='2' className='pdfAlertIconColumn pull-right'>
                <div className='iconImgContainer pull-right'>
                  <img
                    className='imgFile pull-right'
                    src='assets/icons/icons8-ok.svg'
                    crossOrigin='anonymous'
                    alt='ok'
                  ></img>
                </div>
              </Col>
            </Row>
          </Alert>
        )}

        {/*RECORDS*/}
        <FormGroup row>
          <Col>
            {this.props.driver.Status === "ACTIVE" ? (
              <Records
                noEmployerRecords={this.state.noEmployerRecords}
                modal={this.props.modalNR}
                toggle={() => {
                  this.props.toggleNR(null);
                }}
                id={this.props.id}
                Countries={countries}
                States={this.props.StatesM}
                Cities={this.props.Cities}
                getStates={this.props.getStates}
                getCities={this.props.getCities}
                record={this.props.record}
                submit={this.props.saveEmploymentR}
                error={this.props.errorM}
                isLoading={this.props.isLoadingM}
                reload={() => {
                  this.props.getEmploymentR(this.props.id, 1, 3);
                }}
              />
            ) : (
              ""
            )}
          </Col>
        </FormGroup>
        {this.props.employmentRList.length > 0 ? (
          <>
            {
              this.state.noEmployerRecords === true ? (
                <Alert color='success'>
                  <Row className='pdfAlert'>
                    <Col md='10' className='pdfAlertTextColumn align-self-center'>
                      <Row>
                        <Col>
                          <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                            <strong>
                              There is no Employment Records - First Employment
                            </strong></p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md='2' className='pdfAlertIconColumn pull-right'>
                      <div className='iconImgContainer pull-right'>
                        <img
                          className='imgFile pull-right'
                          src='assets/icons/icons8-ok.svg'
                          crossOrigin='anonymous'
                          alt='ok'
                        ></img>
                      </div>
                    </Col>
                  </Row>
                </Alert>) : (
                <TableCom
                  rowItems={rowItems5}
                  header={rep5}
                  count={this.props.countER}
                  page={this.props.pageER}
                  getItems={(index) => {
                    this.props.getEmploymentR(this.props.id, index, 3);
                  }}
                />)
            }
          </>
        ) : (
          <Alert color='warning'>
            <Row className='pdfAlert'>
              <Col md='10' className='pdfAlertTextColumn align-self-center'>
                <Row>
                  <Col>
                    <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                      <strong>
                        Please add Employment Records if applies.
                      </strong></p>
                  </Col>
                </Row>
              </Col>
              <Col md='2' className='pdfAlertIconColumn pull-right'>
                <div className='iconImgContainer pull-right'>
                  <img
                    className='imgFile pull-right'
                    src='assets/icons/icons8-box-important.svg'
                    crossOrigin='anonymous'
                    alt='ok'
                  ></img>
                </div>
              </Col>
            </Row>
          </Alert>
        )}

        <hr></hr>
        <br></br>

        <Col>
          {JSON.parse(localStorage.getItem("user")).Role === "DRIVER" ? (
            <div>
              <div className="row">
                {/* <div className="col"> */}
                {/* <FormGroup check>
                    <Label check>
                      {/* <Input
                        type="checkbox"
                        name="driverAgreement"
                        id="driverAgreement"
                        onChange={this.onChangeAgreement}
                        checked={
                          this.props.driver.DriverAgreement === undefined ||
                          this.props.driver.DriverAgreement === true
                            ? this.props.driver.DriverAgreement
                            : this.state.driverAgreement
                        }
                      />{" "} */}
                {/* <strong style={{textAlign:"center"}}>
                        By signing I fully Accept that read and agree the:
                      </strong> */}
                {/* </Label>
                  </FormGroup> */}
                <strong style={{ padding: 0, fontSize: "18px", marginTop: 0 }}>
                  By signing I fully Accept that read and agree the: &nbsp;
                </strong>

                {/* </div> */}
                {/* <div className="col"> */}
                <DriverAgreement
                  //align="left"
                  props={this.props.driver}
                  company={this.props.companyInfo}
                  signatureDiv={signatureAgreement}
                />
                {/* </div> */}
              </div>
              <br></br>
            </div>
          ) : (
            <div>
              <div className="row">

                <strong style={{ padding: 0, fontSize: "18px", marginTop: 0 }}>
                  By signing I fully Accept that read and agree the: &nbsp;
                </strong>

                <DriverAgreement
                  props={this.props.driver}
                  company={this.props.companyInfo}
                  signatureDiv={signatureAgreement}
                />

              </div>
              <div className="row">
                <div className="col-6">
                  <br></br>
                  <h3>
                    Signature{" "}
                    <i
                      id="InfoSignature"
                      className="icon-question"
                      style={{
                        marginLeft: "5px",
                        color: "#3b86ff",
                        fontSize: "17px",
                      }}
                    ></i>
                    <UncontrolledTooltip
                      placement="right"
                      target="InfoSignature"
                    >
                      Only the Driver can sign this form with his email and
                      password.
                    </UncontrolledTooltip>
                  </h3>
                </div>
                <div className="col-6"></div>
              </div>
            </div>
          )}
        </Col>

        {JSON.parse(localStorage.getItem("user")).Role === "DRIVER" ? (
          signatureDiv
        ) : (
          //   <Signature
          //   id={userId}
          //   isLoading={this.props.isLoading}
          //   saveSignatureFile={this.props.saveSignatureFile}
          //   readonly={true}
          //   signature={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${userId}/DriverSignature/signature.png`}
          //   p={
          //     JSON.parse(localStorage.getItem("user")).Role === "DRIVER"
          //       ? false
          //       : true
          //   }
          // />
          <img
            className="mob-img"
            alt="Only the Driver can sign this form with his email and password"
            style={{ padding: 10, border: "1px solid #ccc" }}
            src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${JSON.parse(localStorage.getItem("idCompany"))}/Drivers/${this.props.driver.Id}/DriverSignature/signature.png`}
            ref={(img) => (this.img = img)}
            onError={() => {
              this.img.src = "assets/img/Images/NoSignature2.png";
              this.img.style = "width:320px;height:180px;";
            }}
          />
        )}
      </Col>
    );
  }
}

export default connect(
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Account);
