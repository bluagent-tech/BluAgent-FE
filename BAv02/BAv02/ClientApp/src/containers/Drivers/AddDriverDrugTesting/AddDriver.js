import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Form,
  UncontrolledTooltip,
} from "reactstrap";
import mayus from "./../../../services/mayus";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/css/DatePicker.css";

const id = JSON.parse(localStorage.getItem("user")).Id;
const minimumDate = new Date();
const dateClause = minimumDate.setFullYear(minimumDate.getFullYear() - 21);

class AddDriverDrugTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Country: "",
      Password: "",
      countryPhone: "US +1",
      date: "",
      CDL: "",
      CMV: "",
      Passenger: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this);
    this.toggle = this.toggle.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.getAllCountries = this.getAllCountries.bind(this);
    this.getDriverList = this.getDriverList.bind(this);
    this.checkDrugValidator = this.checkDrugValidator.bind(this);
  }

  onChangeCheck(e) {
    const { checked, name } = e.target;
    if (name === "QuestionInterstate") {
      if (checked === true) {
        document.getElementById("QIntrastate").checked = false;
      } else {
        document.getElementById("QIntrastate").checked = true;
      }
    }
    if (name === "QuestionIntrastate") {
      if (checked === true) {
        document.getElementById("QInterstate").checked = false;
      } else {
        document.getElementById("QInterstate").checked = true;
      }
    }

    if (name === "QuestionWithin") {
      if (checked === true) {
        document.getElementById("QBeyond").checked = false;
      } else {
        document.getElementById("QBeyond").checked = true;
      }
    }
    if (name === "QuestionBeyond") {
      if (checked === true) {
        document.getElementById("QWithin").checked = false;
      } else {
        document.getElementById("QWithin").checked = true;
      }
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onChangeOption(event) {
    const { name, value } = event.target;
    const booleanValue = value === "true";

    this.setState(prevState => {
      let newState = { ...prevState, [name]: booleanValue };

      if (name === "CDL") {
        newState.QuestionHm = "";
        newState.CMV = "";
        newState.Passenger = "";
      }
      if (name === "CMV") {
        newState.QuestionHm = "";
        newState.Passenger = "";
      }
      if (name === "QuestionHm") {
        newState.Passenger = "";
      }

      return newState;
    }, () => {
      // Una vez que el estado ha sido actualizado, puedes llamar a checkDrugValidator
      this.checkDrugValidator();
    });
  }

  toggle() {
    this.props.toggle(this.props.modal);
    this.setState({
      open: this.props.modal,
      drivers: this.props.driversList,
      Country: "",
      Password: "",
      countryPhone: "US +1",
      hiringDate: "",
      CDL: "",
      CMV: "",
      Passenger: "",
      QuestionDa: "",
      QuestionHm: "",
    });
  }

  componentDidMount() {
    this.getAllCountries();
    this.getDriverList();
  }

  getAllCountries() {
    this.props.getCountries();
  }

  getDriverList() {
    let driverListDashboard = this.props.driversList;
    if (driverListDashboard) {
      return driverListDashboard;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form.append(
      "PhoneNumber",
      e.target.countryPhone.value + " " + e.target.PhoneNumberx.value
    );

    form.append("LicenseExpiration", "1900-01-01");
    form.append("idu", id);
    form.append("hiringDate", "1900-01-01");
    if (
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
        e.target.Password.value
      )
    ) {
      form.append("val", true);
    } else {
      form.append("val", false);
    }
    this.props.handleSubmit(form);
    document.getElementById("drivers").click();
    setTimeout(() => {
      this.props.getDriversNonE(
        JSON.parse(localStorage.getItem("user")).Id,
        1,
        100,
        false,
        false
      );
      this.setState({
        open: this.props.modal,
        drivers: this.props.driversList,
      });
    }, 1300);

    e.stopPropagation();
  }

  generatePassword() {
    var caracteres = "A!B0C@D1E#F2G$H%3I&J4K*L5M!n@o6p#q7r$t8u%v9w&x*y!z";
    var pass = "";
    var i = 0;
    for (i = 0; i < 11; i++) {
      pass += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    var x = document.getElementById("Password");
    x.value = pass;
    this.setState({ Password: pass });
  }

  handleChange(date) {
    this.setState({ date: date });
  }

  checkDrugValidator() {
    if (
      this.state.CDL === false &&
      this.state.CMV === "" &&
      this.state.QuestionHm === "" &&
      this.state.Passenger === ""
    ) {
      this.setState({ ["QuestionDa"]: false });
    } else if (
      this.state.CDL === false &&
      this.state.CMV === false &&
      this.state.QuestionHm === "" &&
      this.state.Passenger === ""
    ) {
      this.setState({ ["QuestionDa"]: false });
    } else if (
      this.state.CDL === true &&
      this.state.CMV === false &&
      this.state.QuestionHm === false &&
      this.state.Passenger === false
    ) {
      this.setState({ ["QuestionDa"]: false });
    } else {
      this.setState({ ["QuestionDa"]: true });
    }
  }
  render() {
    let year = new Date();
    return (
      <React.Fragment>
        <Button
          id="addDriver"
          type="submit"
          color="primary"
          className="btn btn-primary text-white fa fa-user-plus options-drugs"
          style={{ lineHeight: 1 }}
          onClick={this.toggle}
        ></Button>
        <UncontrolledTooltip placement="bottom" target="addDriver">
          Add New Driver
        </UncontrolledTooltip>
        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="modal1" toggle={this.toggle}>
            Create Driver Account
          </ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Country</Label>

                  <select
                    id="CountryLicense"
                    name="CountryLicense"
                    className="form-control"
                    required
                  >
                    <option value="" disabled="">
                      Select
                    </option>
                    <option value="1">US</option>
                    <option value="2">MX</option>
                    <option value="10002">CA</option>
                  </select>
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">License Number</Label>
                  <input
                    type="text"
                    onKeyUp={mayus}
                    maxLength="12"
                    className="form-control"
                    name="License"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={this.state.CDL !== true ? "6" : "4"}>
                  <Label htmlFor="text-input">License Expiration Date</Label>
                  <input
                    type="date"
                    className="form-control"
                    name="LicenseExpiration"
                    required
                  />
                </Col>
                <Col md={this.state.CDL !== true ? "6" : "4"}>
                  <label style={{ marginLeft: "5px" }}>
                    CDL
                    <i
                      id="CDL"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="CDL">
                      commercial driver's license
                    </UncontrolledTooltip>
                  </label>
                  <select
                    id="CDL"
                    name="CDL"
                    className="form-control"
                    required
                    value={this.state.CDL}
                    onChange={this.onChangeOption}
                  >
                    <option value="" disabled="">
                      Select
                    </option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </Col>
                {this.state.CDL !== true ? null : (
                  <Col md="4">
                    <label style={{ marginLeft: "5px" }}>
                      Do you move more than 26,000 lbs?
                      <i
                        id="CMV"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "grey" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="CMV">
                        Reater than 26,000 GVWR
                      </UncontrolledTooltip>
                    </label>
                    <Col className="d-flex justify-content-around">
                      <label>
                        <input
                          name="CMV"
                          type="radio"
                          className="form-control"
                          required
                          value="true"
                          checked={this.state.CMV === true}
                          onChange={this.onChangeOption}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          name="CMV"
                          type="radio"
                          className="form-control"
                          required
                          value="false"
                          checked={this.state.CMV === false}
                          onChange={this.onChangeOption}
                        />
                        No
                      </label>
                    </Col>
                  </Col>
                )}
              </FormGroup>
              <FormGroup row>
                {this.state.CMV !== false ? null : (
                  <Col md="6">
                    <label style={{ marginLeft: "5px" }}>
                      Hazardous Material
                      <i
                        id="hazardousMaterial"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "grey" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="hazardousMaterial"
                      >
                        Driver possesses a valid CDL with Hazardous Material
                        Endorsement – 49 CFR 383.93(b)(4).
                      </UncontrolledTooltip>
                    </label>
                    <Col className="d-flex justify-content-around">
                      <label>
                        <input
                          name="QuestionHm"
                          type="radio"
                          className="form-control"
                          required
                          value={true}
                          checked={this.state.QuestionHm === true}
                          onChange={this.onChangeOption}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          name="QuestionHm"
                          type="radio"
                          className="form-control"
                          required
                          value={false}
                          checked={this.state.QuestionHm === false}
                          onChange={this.onChangeOption}
                        />
                        No
                      </label>
                    </Col>
                  </Col>
                )}
                {this.state.QuestionHm !== false ? null : (
                  <Col md="6">
                    <label style={{ marginLeft: "5px" }}>
                      Do you move passengers??
                      <i
                        id="Passenger"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "grey" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="Passenger">
                        Transporting more than 16 passengers
                      </UncontrolledTooltip>
                    </label>
                    <Col className="d-flex justify-content-around">
                      <label>
                        <input
                          name="Passenger"
                          type="radio"
                          className="form-control"
                          required
                          value={true}
                          checked={this.state.Passenger === true}
                          onChange={this.onChangeOption}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          name="Passenger"
                          type="radio"
                          className="form-control"
                          required
                          value={false}
                          checked={this.state.Passenger === false}
                          onChange={this.onChangeOption}
                        />
                        No
                      </label>
                    </Col>
                  </Col>
                )}
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">First Name</Label>
                  <input
                    type="text"
                    maxLength="49"
                    className="form-control"
                    name="Name"
                    required
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Last Name</Label>
                  <input
                    type="text"
                    maxLength="49"
                    className="form-control"
                    name="LastName"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4" style={{ zIndex: "2" }}>
                  <Label htmlFor="text-input">Birthday</Label>
                  <br />
                  <DatePicker
                    className="form-control"
                    id="newDate"
                    name="Birthdate"
                    labelText="Birthday"
                    selected={this.state.date}
                    maxDate={year.setFullYear(year.getFullYear() - 15)}
                    placeholderText="Click to select a date"
                    showYearDropdown
                    dateFormat={this.props.monthPicker ? "MM/yyyy" : undefined}
                    showMonthYearPicker={
                      this.props.monthPicker ? true : undefined
                    }
                    onChange={this.handleChange.bind(this)}
                    value={
                      this.state.date === "" && this.state.date !== undefined
                        ? this.state.date
                        : this.state.date
                    }
                  />
                </Col>

                <Col>
                  <Label htmlFor="text-input">Gender</Label>
                  <select
                    id="nugender"
                    name="Gender"
                    className="form-control"
                    required
                  >
                    <option value="" disabled="">
                      Select
                    </option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Email</Label>
                  <input
                    type="email"
                    id="newEmail"
                    maxLength="100"
                    className="form-control"
                    name="Email"
                    required
                  />
                </Col>
                <Col md="6">
                  <label>Hiring Date</label>
                  <input
                    type="date"
                    name="HiringDate"
                    id="HiringDate"
                    className="form-control"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Employee ID</Label>
                  <input
                    type="text"
                    maxLength="35"
                    className="form-control"
                    name="EmployeeID"
                    required
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Phone Number</Label>
                  <div className="form-inline">
                    <select
                      style={{ width: "30%" }}
                      value={this.state.countryPhone}
                      className="form-control"
                      name="countryPhone"
                      onChange={this.onChange}
                    >
                      <option value="US +1">US +1</option>
                      <option value="MX +52">MX +52</option>
                      <option value="CAN +1">CAN +1</option>
                    </select>
                    <NumberFormat
                      style={{ width: "70%" }}
                      format="(###) ###-####"
                      placeholder="(---) --- ----"
                      mask="_"
                      className="form-control"
                      name="PhoneNumberx"
                      required
                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label>Password</Label>
                  <input
                    type="text"
                    minLength="8"
                    className="form-control"
                    name="Password"
                    id="Password"
                    value={this.state.Password}
                    onChange={this.onChange}
                  />
                  <UncontrolledTooltip placement="bottom" target="Password">
                    Numbers and letters, signs, capital letters: minimum 8
                    characters (Example123!).
                  </UncontrolledTooltip>
                </Col>
                <Col md="6" style={{ paddingTop: "25px" }}>
                  <Button
                    color="light"
                    className="px-2"
                    onClick={this.generatePassword}
                    block
                  >
                    Generate Password
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup row style={{ borderTop: "1px solid #EAECEE" }}>
                <Col md="12" style={{ fontWeight: "bold" }}>
                  Check all that apply:
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <input
                    type="checkbox"
                    name="QuestionDa"
                    value="true"
                    checked={this.state.QuestionDa}
                    disabled
                  />
                  <label style={{ marginLeft: "5px" }}>
                    Drug & Alcohol Testing Program
                    <i
                      id="drugAlcohol"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="drugAlcohol">
                      Every new Commercial Driver must be enrolled into a random
                      Drug and Alcohol Testing Program - 49 CFR 382.305(J)(1).
                    </UncontrolledTooltip>
                  </label>
                </Col>
                <Col md="6">
                  <input
                    type="checkbox"
                    id="QInterstate"
                    name="QuestionInterstate"
                    value="true"
                    onClick={this.onChangeCheck}
                  />
                  <label style={{ marginLeft: "5px" }}>
                    Interstate
                    <i
                      id="interstate"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="interstate">
                      If a driver transports property or passengers outside,
                      through states or countries, this is considered interstate
                      commerce.
                    </UncontrolledTooltip>
                  </label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <input type="checkbox" name="QuestionDMV" value="true" />
                  <label style={{ marginLeft: "5px" }}>
                    DMV Pull Notice
                    <i
                      id="DMV"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="DMV">
                      The EPN program automatically allows your organization to
                      generate and monitor Driver License Records - CVC 1808.1.
                    </UncontrolledTooltip>
                  </label>
                </Col>
                <Col md="6">
                  <input
                    type="checkbox"
                    id="QIntrastate"
                    name="QuestionIntrastate"
                    value="true"
                    onClick={this.onChangeCheck}
                  />
                  <label style={{ marginLeft: "5px" }}>
                    Intrastate
                    <i
                      id="intrastate"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="intrastate">
                      If the driver performs transportation exclusively in your
                      business’s domicile state, this is considered intrastate.
                    </UncontrolledTooltip>
                  </label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <input type="checkbox" name="QuestionDR" value="true" />
                  <label style={{ marginLeft: "5px" }}>
                    Request Driving Record
                    <i
                      id="DR"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="DR">
                      Obtain a DMV public driving record for each Driver. - 49
                      CFR 391.23(a)(1) & (B).
                    </UncontrolledTooltip>
                  </label>
                </Col>
                <Col md="6">
                  <input
                    type="checkbox"
                    id="QWithin"
                    name="QuestionWithin"
                    value="true"
                    onClick={this.onChangeCheck}
                  />
                  <label style={{ marginLeft: "5px" }}>
                    Within 100-mile Radius
                    <i
                      id="within"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="within">
                      Driver operates exclusively Within a 100 air-mile radius
                      of the normal work-reporting location.
                    </UncontrolledTooltip>
                  </label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <input type="checkbox" name="QuestionHS" value="true" />
                  <label style={{ marginLeft: "5px" }}>
                    Hours of Service
                    <i
                      id="HS"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="HS">
                      Driver is required to make a record of duty status - 49
                      CFR 395.8(a)(1).
                    </UncontrolledTooltip>
                  </label>
                </Col>
                <Col md="6">
                  <input
                    type="checkbox"
                    id="QBeyond"
                    name="QuestionBeyond"
                    value="true"
                    onClick={this.onChangeCheck}
                  />
                  <label style={{ marginLeft: "5px" }}>
                    Beyond 100-mile Radius
                    <i
                      id="beyond"
                      className="icon-question"
                      style={{ marginLeft: "5px", color: "grey" }}
                    ></i>
                    <UncontrolledTooltip placement="right" target="beyond">
                      Driver operates exclusively Within a 100 air-mile radius
                      of the normal work-reporting location..
                    </UncontrolledTooltip>
                  </label>
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <FormGroup row>
                <Col
                  mb="4"
                  colSpan="3"
                  style={{ textAlign: "center", marginTop: "4%" }}
                ></Col>
              </FormGroup>
              <Button
                type="submit"
                className="px-5 buttons-royal text-white"
                disabled={this.props.isLoading ? true : false}
              >
                Create
              </Button>{" "}
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
              <Button
                className="px-5 buttons-royal text-white"
                onClick={this.toggle}
              >
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddDriverDrugTest;
