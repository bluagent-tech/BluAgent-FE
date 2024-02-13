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
  Form,
} from "reactstrap";
import Select from "./../../../components/Select";
import dateConvertTables from "./../../../services/dateConvertTables";
import NumberFormat from "react-number-format";
import DatePicker from "./../../../components/DatePicker";
import SelectDriverProfile from "../../../components/selectDriverProfile";

//EMPLOYMENT RECORDS

class Records extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      Country: "",
      State: "",
      City: "",
      SubjectToRegulation: false,
      SubjectToTesting: false,
      countryPhone: "",
      telephone: undefined,
      Salary: "",
      PositionHeld: "",
      Leaving: "",
      optionsSalary: [
        { Id: "$0-50", Name: "$0-50" },
        { Id: "$50-300", Name: "$50-300" },
        { Id: "$300-800", Name: "$300-800" },
        { Id: "$800-1500", Name: "$800-1500" },
        { Id: "$1500-3000", Name: "$1500-3000" },
        { Id: "$3000+", Name: "$3000+" },
      ],
      optionsRFL: [
        { Id: "Better opportunity", Name: "Better opportunity" },
        { Id: "Company Closure", Name: "Company Closure" },
        { Id: "Issues with Company", Name: "Issues with Company" },
        { Id: "Resigned", Name: "Resigned" },
        { Id: "Laid off", Name: "Laid off" },
      ],
      optionsPHeld: [
        { Id: "Driver", Name: "Driver" },
        { Id: "Mechanic", Name: "Mechanic" },
        { Id: "Dispatch", Name: "Dispatch" },
        { Id: "Administration", Name: "Administration" },
      ],
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(event) {
    this.setState({
      isChecked: event.target.checked
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === "Country") {
      this.props.getStates(value);
      this.props.Cities.length = 0;
      if (value === "") {
        this.setState({ State: "", IdCity: "" });
      }
    }
    if (name === "State") {
      this.props.getCities(value);
      if (value === "") {
        this.setState({ IdCity: "" });
      }
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  onChangeCheck(e) {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.target.isChecked.checked) {
      var r = new FormData();
      r.append("IdDriver", this.props.id);
      r.append("Id", this.props.record.Id);
      this.props.submit(r);
    } else {
      var r = new FormData(e.target);
      r.append("IdDriver", this.props.id);
      r.append("Id", this.props.record.Id);
      r.append(
        "Telephone",
        e.target.countryPhone.value + " " + e.target.Telephonex.value
      );
      r.append("SubjectToRegulation", this.state.SubjectToRegulation);
      r.append("SubjectToTesting", this.state.SubjectToTesting);
      this.props.submit(r);
    }
  }

  onClose() {
    this.setState({
      Country: "",
      State: "",
      City: "",
      SubjectToRegulation: false,
      SubjectToTesting: false,
      countryPhone: "",
      telephone: undefined,
      isChecked: false,
    });
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <div>
          <div className="pull-left" style={{ marginTop: "8px" }}>
            <h6 className="mob-tit mob-letter-spacing-2"><strong>EMPLOYMENT RECORDS</strong></h6>
          </div>
          <div className="pull-right">
            <button
              style={{ width: "350px" }}
              type="button"
              onClick={this.props.toggle}
              className="btn btn-light btn-min-width mr-1 mb-1 mob-but"
              disabled={this.props.noEmployerRecords}
            >
              ADD EMPLOYMENT RECORD
            </button>
          </div>
        </div>
        <Modal isOpen={this.props.modal} className={"modal-lg"}>
          <ModalHeader toggle={this.onClose}>EMPLOYMENT RECORDS</ModalHeader>
          <Form onSubmit={this.handleSubmit} name="formRecord">
            <ModalBody>
              <FormGroup row>
                <Col md="4">
                  <Label check>
                    This is my first employment{'  '}
                    <Input type="checkBox" id="isChecked" onChange={this.handleCheck} name="isChecked" />
                  </Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="Employer">Employer Name</Label>
                  <Input
                    disabled={this.state.isChecked}
                    type="text"
                    id="Employer"
                    defaultValue={this.props.record.EmployerName}
                    name="EmployerName"
                    maxLength="200"
                    required
                  />
                </Col>
                <Col md="4">
                  <Label htmlFor="StreetAddress">Street Address</Label>
                  <Input
                    disabled={this.state.isChecked}
                    type="text"
                    id="StreetAddress"
                    defaultValue={this.props.record.Address}
                    name="Address"
                    maxLength="200"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="text-input">Country</Label>
                  <Select
                    disabled={this.state.isChecked}
                    name="Country"
                    id="Country"
                    options={this.props.Countries}
                    value={
                      this.state.Country !== ""
                        ? this.state.Country
                        : this.props.record.Country
                    }
                    onChange={this.onChange}
                  />
                </Col>
                <Col md="4">
                  <Label htmlFor="text-input">State</Label>
                  <Select
                    disabled={this.state.isChecked}
                    id="State"
                    name="State"
                    options={this.props.States}
                    onChange={this.onChange}
                    value={
                      this.state.State !== ""
                        ? this.state.State
                        : this.props.record.State
                    }
                    required
                  />
                </Col>
                <Col md="4">
                  <Label htmlFor="text-input">City</Label>
                  <Select
                    disabled={this.state.isChecked}
                    id="City"
                    name="City"
                    options={this.props.Cities}
                    onChange={this.onChange}
                    value={
                      this.state.City !== ""
                        ? this.state.City
                        : this.props.record.City
                    }
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="Zip">Zip Code</Label>
                  <NumberFormat
                    disabled={this.state.isChecked}
                    format="#####"
                    value={this.props.record.Zip}
                    className="form-control"
                    name="Zip"
                    required
                  />
                </Col>
                <Col md="8">
                  <Label htmlFor="Telephone">Telephone</Label>
                  <div className="form-inline">
                    <select
                      disabled={this.state.isChecked}
                      style={{ width: "20%" }}
                      value={
                        this.state.countryPhone !== ""
                          ? this.state.countryPhone
                          : this.props.record.Telephone !== undefined &&
                            this.props.record.Telephone !== null
                            ? this.props.record.Telephone.substr(0, 6)
                            : "US +1"
                      }
                      className="form-control"
                      name="countryPhone"
                      onChange={this.onChange}
                    >
                      <option value="US +1">US +1</option>
                      <option value="MX +52">MX +52</option>
                      <option value="CAN +1">CAN +1</option>
                    </select>
                    <NumberFormat
                      disabled={this.state.isChecked}
                      style={{ width: "50%" }}
                      format="(###) ###-####"
                      value={
                        this.state.telephone === undefined &&
                          this.props.record.Telephone !== undefined &&
                          this.props.record.Telephone !== null
                          ? this.props.record.Telephone.substr(6)
                          : this.state.telephone
                      }
                      placeholder="(---) --- ----"
                      mask="_"
                      className="form-control"
                      name="Telephonex"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="Email">Email</Label>
                  <Input
                    disabled={this.state.isChecked}
                    type="email"
                    id="Email"
                    defaultValue={this.props.record.Email}
                    name="Email"
                    maxLength="100"
                    required
                  />
                </Col>
                <Col md="4">
                  <Label htmlFor="Salary">Salary</Label>
                  <SelectDriverProfile
                    disabled={this.state.isChecked}
                    name="Salary"
                    id="Salary"
                    options={this.state.optionsSalary}
                    value={this.state.Salary}
                    onChange={this.onChange}
                    previousDate={this.props.record.Salary}
                    defaultValue={this.props.record.Salary}
                  />
                  {/* <NumberFormat
                    thousandSeparator={true}
                    value={this.props.record.Salary}
                    prefix={"$"}
                    name="Salary"
                    className="form-control"
                  /> */}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="PositionHeld">Position Held</Label>
                  <SelectDriverProfile
                    disabled={this.state.isChecked}
                    name="PositionHeld"
                    id="PositionHeld"
                    options={this.state.optionsPHeld}
                    value={this.state.PositionHeld}
                    onChange={this.onChange}
                    defaultValue={this.props.record.PositionHeld}
                    previousDate={this.props.record.PositionHeld} />

                  {/* <Input
                    type="text"
                    id="PositionHeld"
                    defaultValue={this.props.record.PositionHeld}
                    name="PositionHeld"
                    maxLength="30"
                    required
                  /> */}
                </Col>
                <Col md="4">
                  <Label htmlFor="Leaving">Reason For Leaving</Label>
                  <SelectDriverProfile
                    disabled={this.state.isChecked}
                    name="Leaving"
                    id="Leaving"
                    options={this.state.optionsRFL}
                    value={this.state.Leaving}
                    onChange={this.onChange}
                    defaultValue={this.props.record.Leaving}
                    previousDate={this.props.record.Leaving}
                  />
                  {/* <Input
                    type="text"
                    id="Leaving"
                    defaultValue={this.props.record.Leaving}
                    name="Leaving"
                    maxLength="200"
                    required
                  /> */}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <DatePicker
                    disabled={this.state.isChecked}
                    id="DateFrom"
                    name="DateFrom"
                    labelText="From"
                    value={dateConvertTables(this.props.record.DateFrom)}
                    required
                  />
                </Col>
                <Col>
                  <DatePicker
                    disabled={this.state.isChecked}
                    id="DateTo"
                    name="DateTo"
                    labelText="To"
                    value={dateConvertTables(this.props.record.DateTo)}
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="text-input">
                    Position Subject To DOT Regulations
                  </Label>
                  <p>
                    {" "}
                    <label>
                      Yes &nbsp;
                      <input
                        disabled={this.state.isChecked}
                        id="SubjectToRegulation"
                        name="SubjectToRegulation"
                        value="true"
                        type="checkbox"
                        onChange={this.onChangeCheck}
                        defaultChecked={
                          this.props.record.SubjectToRegulation !== undefined
                            ? this.props.record.SubjectToRegulation
                            : this.state.SubjectToRegulation
                        }
                      />
                    </label>{" "}
                  </p>
                </Col>
                <Col md="8">
                  <Label htmlFor="text-input">
                    Safety Sensitive Position Subject To Drug And Alcohol
                    Testing
                  </Label>
                  <p>
                    <label>
                      Yes &nbsp;
                      <input
                        disabled={this.state.isChecked}
                        id="SubjectToTesting"
                        name="SubjectToTesting"
                        value="true"
                        type="checkbox"
                        onChange={this.onChangeCheck}
                        defaultChecked={
                          this.props.record.SubjectToTesting !== undefined
                            ? this.props.record.SubjectToTesting
                            : this.state.SubjectToTesting
                        }
                      />
                    </label>{" "}
                  </p>
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button className="buttons-royal text-white px-5" type="submit">
                Save
              </Button>
              <Button
                className="buttons-royal text-white px-5"
                onClick={this.onClose}
              >
                Close
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
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Records;
