import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/DrugAndAlcoholTesting";
import swal from "sweetalert";
import DrugTestSite from "../../containers/DrugTestCollector/DrugTestSite/DrugTestSite";
import {
  Card,
  CardBody,
  Col,
  Row,
  Alert,
  CardHeader,
  Table,
  Media,
  Button,
  Input,
  Label,
  Form,
} from "reactstrap";

import DatePicker from "../../components/DatePicker";
import dateConvertTables from "../../services/dateConvertTables";
import NumberFormat from "react-number-format";
import ToastAlert from "./../../components/ToastAlert";
import dateConvert from "./../../services/dateConvertTables";
import FormGroup from "reactstrap/lib/FormGroup";
//const id = JSON.parse(localStorage.getItem('user')).Id;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleStartCollection = this.handleStartCollection.bind(this);
    this.editDonorData = this.editDonorData.bind(this);
    this.formDonor = this.formDonor.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeLicense = this.handleChangeLicense.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.state = {
      open: false,
      date: "",
      license: "",
      phone: "",
      license: "",
    };
  }

  componentDidMount() {
    this.props.getProviderScheduledDrugTestData(this.props.match.params.id);
    let ele1 = (document.getElementById("contenedorDonorTrue").style.display =
      "none");
    let ele2 = (document.getElementById("contenedorDonorFalse").style.display =
      "block");
    this.props.getDriverData(
      this.props.scheduleData.IdDriver,
      this.props.scheduleData.IdCompany
    );
  }

  handleStartCollection(e) {
    e.preventDefault();
    this.props.updatStatusScheduleDrug(
      this.props.match.params.id,
      "Collection Initiated"
    );
    e.target.style.display = "none";
    document.getElementById("StartCollectionContainer").style.display = "block";
  }
  handleChangeDate(e) {
    this.setState({ date: e.target.value });
  }

  handlePhoneNumber(e) {
    this.setState({ phone: e.target.value });
  }
  handleChangeLicense(e) {
    this.setState({ license: e.target.value });
  }

  formDonor() {
    let { open } = this.state;
    this.setState({ open: !open });

    if (open === true) {
      document.getElementById("contenedorDonorTrue").style.display = "block";
      document.getElementById("contenedorDonorFalse").style.display = "none";
    } else {
      document.getElementById("contenedorDonorTrue").style.display = "none";
      document.getElementById("contenedorDonorFalse").style.display = "block";
    }
  }

  editDonorData(e) {
    e.preventDefault();

    var driver = new FormData(e.target);
    driver.append("Id", this.props.scheduleData.IdDriver);
    driver.append("idCompany", this.props.scheduleData.IdCompany);
    driver.append("Image", this.props.scheduleData.FileImage);
    driver.append("Email", this.props.scheduleData.UserEmail);
    driver.append("Name", this.props.scheduleData.FirstName);
    driver.append("LastName", this.props.scheduleData.LastName);
    driver.append("Birthdate", this.props.scheduleData.Birthdate);
    driver.append("EmployeeId", this.props.scheduleData.EmployeeId);
    driver.append(
      "PhoneNumber",
      this.props.scheduleData.DriverPhoneNumber + "" + this.state.phone
    );
    driver.append("License", this.state.license);
    this.props.saveDriverData(driver);
    swal({
      title: "Success",
      text: "Donnor information updated!",
      icon: "success",
    });
    this.setState({ open: false });
  }

  render() {
    let { license, phone } = this.state;
    let year = new Date();
    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <div className="container-fluid" style={{ marginTop: "3%" }}>
          <div className="animated fadeIn">
            <h2>Drug Test Details</h2>
            <Row>
              <Col sm="12">
                <Card className="text-center">
                  <CardHeader
                    className="card-blue-gray-header"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                    }}
                  >
                    Applicant Information
                  </CardHeader>
                  <CardBody style={{ textAlign: "left" }}>
                    <h4>{this.props.scheduleData.LegalName}</h4>
                    <h5>DOT NUMBER: {this.props.scheduleData.Dot}</h5>
                    <h5>{this.props.scheduleData.Der}</h5>
                    <div>{this.props.scheduleData.CompanyAddress}</div>
                    <div>
                      {this.props.scheduleData.CompanyCity +
                        ",  " +
                        this.props.scheduleData.CompanyState +
                        ", " +
                        this.props.scheduleData.PhysicalZip}
                    </div>
                    <div>
                      Email: {this.props.scheduleData.Email} | Phone:{" "}
                      {this.props.scheduleData.CompanyPhoneNumber !== undefined
                        ? this.props.scheduleData.CompanyPhoneNumber.substr(3)
                        : ""}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card className="text-center">
                  <CardHeader
                    className="card-blue-gray-header"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                    }}
                  >
                    Drug Test Information
                  </CardHeader>
                  <CardBody>
                    <Table
                      style={{
                        textAlign: "left",
                        fontSize: "12pt",
                        border: "1px solid white",
                      }}
                    >
                      <tbody>
                        <tr className="border-table">
                          <td className="border-table">Type of Test</td>
                          <td className="border-table">Federal</td>
                        </tr>
                        <tr className="border-table">
                          <th className="border-table">Authority Control</th>
                          <td className="border-table">
                            {this.props.scheduleData.TestingAuthority}
                          </td>
                        </tr>
                        <tr className="border-table">
                          <td className="border-table">Drug Test</td>
                          <td className="border-table">
                            {this.props.scheduleData.Performed}
                          </td>
                        </tr>
                        <tr className="border-table">
                          <td className="border-table">Collection Observed</td>
                          <td className="border-table">
                            {this.props.DrugTestData === undefined ||
                              this.props.DrugTestData === null
                              ? ""
                              : this.props.DrugTestData.RemarksId === null &&
                                this.props.DrugTestData.TemperatureRemarks ===
                                null &&
                                this.props.DrugTestData.CollectionRemarks ===
                                null &&
                                this.props.DrugTestData
                                  .IssuesCollectionRemarks === null
                                ? "No"
                                : "Yes"}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card className="text-center">
                  <CardHeader
                    className="card-blue-gray-header"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                    }}
                  >
                    Donor Information
                  </CardHeader>
                  <CardBody>
                    <Media>
                      <Media left style={{ width: "30%" }}>
                        <img
                          style={{ width: "65%" }}
                          className="img-avatar"
                          alt="avatar"
                          src={
                            this.props.scheduleData.FileImage === null ||
                              this.props.scheduleData.FileImage === undefined
                              ? "assets/icons/icons8-customer.svg"
                              : `https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.scheduleData.IdCompany}/Drivers/${this.props.scheduleData.IdDriver}/driverAvatar.png`
                          }
                        />
                      </Media>
                      <Media style={{ textAlign: "left", width: "50%" }} body>
                        <Media heading>{this.props.scheduleData.Driver}</Media>
                        <Media
                          style={{ color: "#969696", fontSize: "12pt" }}
                          body
                        >
                          <Row>
                            <Col id="contenedorDonorTrue">
                              <Form onSubmit={this.editDonorData}>
                                <FormGroup>
                                  <DatePicker
                                    className="form-control"
                                    id="Birthdate"
                                    name="Birthdate"
                                    labelText="Birthdate"
                                    selected={this.props.scheduleData.Birthdate}
                                    maxDate={year.setFullYear(
                                      year.getFullYear() - 15
                                    )}
                                    placeholderText="Click to select a date"
                                    showYearDropdown
                                    dateFormat={
                                      this.props.monthPicker
                                        ? "MM/yyyy"
                                        : undefined
                                    }
                                    showMonthYearPicker="true"
                                    onChange={this.handleChangeDate}
                                    value={dateConvertTables(
                                      this.props.scheduleData.Birthdate
                                    )}
                                    required
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label>Phone number:</Label>
                                  <Row>
                                    <Col md="4">
                                      <select
                                        style={{ width: "100%" }}
                                        value={
                                          this.props.scheduleData
                                            .DriverPhoneNumber
                                            ? this.props.scheduleData.DriverPhoneNumber.substr(
                                              0,
                                              6
                                            )
                                            : ""
                                        }
                                        className="form-control"
                                        onChange={this.handleChange}
                                      >
                                        <option value="US +1">US +1</option>
                                        <option value="MX +52">MX +52</option>
                                        <option value="CAN +1">CAN +1</option>
                                      </select>
                                    </Col>
                                    <Col md="8">
                                      <NumberFormat
                                        style={{ width: "100%" }}
                                        format="(###) ###-####"
                                        placeholder="(---) --- ----"
                                        mask="_"
                                        className="form-control"
                                        value={phone}
                                        onChange={this.handlePhoneNumber}
                                      />
                                    </Col>
                                  </Row>
                                </FormGroup>

                                <FormGroup>
                                  <label>License</label>
                                  <Input
                                    placeholder="License Number"
                                    type="text"
                                    value={license}
                                    onChange={this.handleChangeLicense}
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Button
                                    type="button"
                                    onClick={this.formDonor}
                                    color="secondary"
                                    className="mr-2 px-5"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    color="primary"
                                    className="px-5"
                                  >
                                    Save
                                  </Button>
                                </FormGroup>
                              </Form>
                            </Col>

                            <Col id="contenedorDonorFalse" md="6" sm="12">
                              <p>
                                Birthday :
                                <span style={{ marginLeft: "20px" }}>
                                  {dateConvert(
                                    this.props.scheduleData.Birthdate
                                  )}
                                </span>
                              </p>
                              <p>
                                Phone number morning :
                                <span style={{ marginLeft: "20px" }}>
                                  {this.props.scheduleData.DriverPhoneNumber !== undefined &&
                                    this.props.scheduleData.DriverPhoneNumber !== null
                                    ? this.props.scheduleData.DriverPhoneNumber.substr(3)
                                    : ""}
                                </span>
                              </p>
                              <p>
                                Phone number afternoon :
                                <span style={{ marginLeft: "20px" }}>
                                  {this.props.scheduleData.DriverPhoneNumber !== undefined &&
                                    this.props.scheduleData.DriverPhoneNumber !== null
                                    ? this.props.scheduleData.DriverPhoneNumber.substr(3)
                                    : ""}
                                </span>
                              </p>
                              <p>
                                Employee ID :
                                <span style={{ marginLeft: "20px" }}>
                                  {this.props.scheduleData.EmployeeId}
                                </span>
                              </p>
                              <p>
                                Number License :
                                <span style={{ marginLeft: "20px" }}>
                                  {this.props.scheduleData.License}
                                </span>
                              </p>

                              <Button
                                onClick={this.formDonor}
                                className="btn btn-block col-6"
                                color="primary"
                              >
                                Edit
                              </Button>
                            </Col>
                          </Row>
                        </Media>
                      </Media>
                      {this.props.DrugTestData === undefined ||
                        this.props.DrugTestData === null ? (
                        ""
                      ) : this.props.DrugTestData.DonorSignature !== null ||
                        this.props.DrugTestData.DonorSignature !== undefined ? (
                        <Media right>
                          <img
                            alt="avatar"
                            style={{ width: "65%" }}
                            className="img-avatar"
                            src={`https://bluagent-files.s3-us-west-2.amazonaws.com/Collectors/DrugTestSignatures/${this.props.DrugTestData.SpecimenNumber}/DonorSignature.png`}
                          />
                        </Media>
                      ) : (
                        ""
                      )}
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <Card className="text-center">
                  <CardHeader
                    className="card-blue-gray-header"
                    style={{
                      textAlign: "left",
                      fontSize: "12pt",
                    }}
                  >
                    Collection Site information
                  </CardHeader>
                  <CardBody style={{ textAlign: "left" }}>
                    <h4>BLUAGENTS'S COLLECTION SITE</h4>
                    <div>9765 Marconi Driver</div>
                    <div>San Diego, CA, 92154</div>
                    <div>Phone: (619) 878-5852</div>
                  </CardBody>
                </Card>
              </Col>
              {this.props.scheduleData.Status !== "Collection Completed" &&
                this.props.scheduleData.Status !== "Collection Initiated" ? (
                <Col style={{ marginBottom: "20px" }} sm="12">
                  <Button
                    color='success'
                    className="royals-button text-white"
                    onClick={this.handleStartCollection}
                  >
                    Start Collection
                  </Button>
                </Col>
              ) : (
                ""
              )}
              <DrugTestSite
                status={this.props.scheduleData.Status}
                idScheduled={this.props.match.params.id}
              />
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Dashboard);
