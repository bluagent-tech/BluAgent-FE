import React, { Component } from 'react';
import {
  CustomInput,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Form,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actionCreators } from '../../store/UserLog';
import Signature from './../signaturejs';
import dateConvertTables from './../../services/dateConvertTables';

import base64ToByteArray2 from './../../services/base64ToByteArray2';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ToastAlert from '../../components/ToastAlert';
const idCompany = localStorage['idCompany'];
const userId = JSON.parse(localStorage.getItem('user')).Id;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Gender: undefined,
      countryPhone: undefined,
      Position: undefined,
      file: undefined,
      date: "",
      withLabel: false,
    };
    this.readFile = this.readFile.bind(this);
    this.onChangeG = this.onChangeG.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.getRoleData(
      this.props.id,
      JSON.parse(localStorage.getItem("user")).Id
    );
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({ date: date });
  }

  componentWillUnmount() {
    this.props.clean();
  }

  componentDidMount() {
    this.props.getRoleData(
      this.props.id,
      JSON.parse(localStorage.getItem("user")).Id
    );
    if (this.props.labelText !== undefined) {
      this.setState({ withLabel: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.props.getRoleData(
        this.props.id,
        JSON.parse(localStorage.getItem("user")).Id
      );
    }
    return false;
  }

  onChangeG(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var image = document.getElementById("image");
    var byteArray = base64ToByteArray2(image.src);
    var file = "";
    try {
      file = image.src;
    } catch (error) {
      file = "";
    }

    var user = new FormData(e.target);
    user.append(
      "PhoneNumber",
      e.target.countryPhone.value + " " + e.target.PhoneNumberx.value
    );
    user.append("file", file);
    user.append("Id", this.props.id);
    user.append("isCollector", this.props.user.Role === "COLLECTOR");
    this.props.updateUser(user);
    this.setState({ file: undefined });
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
        this.setState({ file: input.files[0].name });
        reader.readAsDataURL(input.files[0]);
      } catch (error) { }
    }
  }

  render() {
    let year = new Date();

    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <Col className="mb-4" style={{ marginTop: "4%" }}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  type="text"
                  id="fname"
                  name="Name"
                  defaultValue={this.props.user.Name}
                  maxLength="50"
                  required
                />
              </Col>
              <Col md="4">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  type="text"
                  id="lname"
                  name="LastName"
                  defaultValue={this.props.user.LastName}
                  maxLength="50"
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
                  id="Birthdate"
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
                      ? dateConvertTables(this.props.user.Birthdate)
                      : this.state.date
                  }
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
                    this.state.Gender === undefined
                      ? this.props.user.Gender
                      : this.state.Gender
                  }
                  required
                >
                  <option value="">SELECT</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="cnumber">Phone Number</Label>
                <div className="form-inline">
                  <select
                    style={{ width: "30%" }}
                    value={
                      this.state.countryPhone !== undefined
                        ? this.state.countryPhone
                        : this.props.user.PhoneNumber !== undefined &&
                          this.props.user.PhoneNumber !== null
                          ? this.props.user.PhoneNumber.substr(0, 6)
                          : "US +1"
                    }
                    className="form-control"
                    name="countryPhone"
                    onChange={this.onChangeG}
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
                    value={
                      this.props.user.PhoneNumber !== undefined &&
                        this.props.user.PhoneNumber !== null
                        ? this.props.user.PhoneNumber.substr(6)
                        : ""
                    }
                    required
                  />
                </div>
              </Col>
              <Col md="4">
                <Label htmlFor="Email">Email</Label>
                <Input
                  type="email"
                  name="Email"
                  id="Email"
                  maxLength="100"
                  defaultValue={this.props.user.Email}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Image</Label>
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
                  label={this.state.file}
                  type="file"
                  id="file"
                  name="File"
                  accept="image/png, .jpeg, .jpg"
                  onChange={this.readFile}
                />
              </Col>
              <Col md="4">
                <Label htmlFor="Position">Position</Label>
                <select
                  value={
                    this.state.Position !== undefined
                      ? this.state.Position
                      : this.props.user.Position
                  }
                  className="form-control"
                  name="Position"
                  onChange={this.onChangeG}
                  required
                >
                  <option value="Company Admin">Company Admin</option>
                  <option value="Safety Officer">Safety Officer</option>
                  <option value="Designated Employer Representative">
                    Designated Employer Representative
                  </option>
                  <option value="Mechanic">Mechanic</option>
                  <option value="Safety Investigator">
                    Safety Investigator
                  </option>
                </select>
              </Col>
            </FormGroup>
            <br />
            <Row>
              <Col ms="4">
                <Button className="buttons-royal text-white" type="submit">
                  Save
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
                <div />
              )}
            </Row>
          </Form>
          <br />
          <div className="width-signature" style={{ marginLeft: "2%" }}>
            {this.props.user.Role === "ADMIN" ? (
              <Signature
                errorS={this.props.errorS}
                messageS={this.props.messageS}
                isLoading={this.props.isLoadingS}
                id={this.props.id}
                saveSignatureFile={this.props.saveSignatureFile}
                signature={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Users/${userId}/signature.png`}
                p={false}
              />
            ) : (
              <div />
            )}
          </div>
        </Col>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.userLog,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Account);
