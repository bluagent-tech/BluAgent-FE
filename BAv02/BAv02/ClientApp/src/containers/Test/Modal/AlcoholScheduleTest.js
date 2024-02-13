import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  Button,
  Badge,
  Form,
  UncontrolledTooltip,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/DrugAndAlcoholTesting";
import AddPayment from "./AddPayment";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import Select from "../../../components/Select";
import dateConvert from "../../../services/dateConvertTables";
import DropdownMenu2 from "../../../components/DropdownMenu";
import AlertDelete from "../../../components/AlertDelete";
import "react-datepicker/dist/react-datepicker.css";
import "./StepWizard.css";
import moment from "moment";

var cancelDetails = "";
const id = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = localStorage["idCompany"];
const RowStyle = styled.input`
  margin-left: 0px;
`;

const TextField = styled.input`
  height: 32px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 16px;

  &:hover {
    cursor: auto;
  }
`;

const CardImg = (brand) => {
  return (
    <div className="align-right">
      <div style={{ marginLeft: "15px", marginRight: "10px" }}>
        <img
          alt="profile"
          src={
            brand === null
              ? "assets/img/Images/profile/profile.png"
              : `assets/img/Images/profile/${brand}.png`
          }
          className="img-avatar"
          style={{ width: "60px" }}
        />
      </div>
    </div>
  );
};

const OptionMenu = ({ idPayment, reduxProps }) => {
  return (
    <div className="text-center">
      <DropdownMenu2
        direction="right"
        itemID={idPayment}
        itemsDisabled={
          reduxProps.defaultPaymentMethod === idPayment ? true : false
        }
        toggleDeleteModal={() => {
          reduxProps.detachPaymentMethod(idPayment, id);
        }}
        menuOptions={[
          [
            "Set Default",
            () => {
              reduxProps.setDefaultPayment(id, idPayment);
            },
          ],
        ]}
      />
    </div>
  );
};
const checkDefaultPaymentMethod = () => {
  return <div className="fa fa-check"></div>;
};

const Filter = ({ onFilter }) => {
  return (
    <React.Fragment>
      <FormGroup style={{ marginBottom: "0px" }} row>
        <Col md="3">
          <TextField
            id="search"
            type="search"
            role="search"
            placeholder="Search Donor"
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  );
};
const OptionMenuScheduled = ({
  reduxProps,
  idSchedule,
  showSchedule,
  rowData,
  idDriver,
  idCompany,
  fileName,
}) => {
  if (rowData.Status === "Draft") {
    return (
      <div className="text-center">
        <DropdownMenu2
          direction="right"
          itemID={idSchedule}
          toggleWorkOrderModal={() => {
            showSchedule();
            reduxProps.getScheduledTestDataAlcohol(idSchedule);
          }}
          menuOptions={[
            ["Change", "This is a function2"],
            [
              "Cancel",
              () => {
                reduxProps.toggleCancelAlcoholSchedule(idSchedule);
                cancelDetails = "";
              },
            ],
          ]}
        />
      </div>
    );
  } else if (rowData.Status === "Scheduled") {
    return (
      <div className="text-center">
        <DropdownMenu2
          direction="right"
          itemID={idSchedule}
          toggleWorkOrderModal={() => {
            showSchedule();
            reduxProps.getScheduledTestDataAlcohol(idSchedule);
          }}
          menuOptions={[
            ["Reschedule", "This is a function2"],
            [
              "Cancel",
              () => {
                reduxProps.toggleCancelAlcoholSchedule(idSchedule);
                cancelDetails = "changes text";
              },
            ],
          ]}
        />
      </div>
    );
  } else if (
    rowData.Status === "Canceled" &&
    (rowData.CancelDetails === null || rowData.CancelDetails === "changes text")
  ) {
    return (
      <div className="text-center">
        <DropdownMenu2
          direction="right"
          itemID={idSchedule}
          menuOptions={[
            [
              "Delete",
              () => {
                reduxProps.toggleDeleteScheduledAlcohol(idSchedule);
              },
            ],
          ]}
        />
      </div>
    );
  } else if (
    rowData.Status === "Collection Completed" &&
    rowData.IdDrugCompliance === null
  ) {
    return (
      <div className="text-center">
        <i id="alertCollection" class="fa fa-exclamation-circle fa-2x"></i>
        <UncontrolledTooltip placement="bottom" target="alertCollection">
          Waiting for Result
        </UncontrolledTooltip>
      </div>
    );
  } else if (
    rowData.Status === "Collection Completed" &&
    rowData.IdDrugCompliance !== null
  ) {
    return (
      <div className="text-center">
        <DropdownMenu2
          direction="right"
          itemID={idSchedule}
          idCompany={idCompany}
          idDriver={idDriver}
          fileName={fileName}
          menuOptions={[["Download Result", "downloadResult"]]}
        />
      </div>
    );
  } else {
    return <div className="text-center"></div>;
  }
};
const SpecimenNumber = (reason, specimen) => {
  return (
    <div className="align-center" style={{ textAlign: "center" }}>
      {specimen === null ? "N/A" : specimen}
      <br />
      <Badge
        pill
        style={{
          backgroundColor: "#ffffff",
          fontSize: "9pt",
          color: "#576271",
          width: "100%",
        }}
      >
        {reason}
      </Badge>
    </div>
  );
};

const Reason = (reason) => {
  return (
    <Badge
      pill
      style={{
        backgroundColor: "#3b86ff",
        fontSize: "9pt",
        color: "#ffffff",
        width: "100%",
      }}
    >
      {reason}
    </Badge>
  );
};

var key = "";
var status = "Donor Data";

const DriversImg = (img, Id) => {
  return (
    <div className="align-right">
      <div
        className="avatar"
        style={{ marginLeft: "15px", marginRight: "10px" }}
      >
        <img
          src={
            img === null
              ? "assets/img/Images/profile/profile.png"
              : `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${Id}/driverAvatar.png`
          }
          alt="driver profile avatar"
          className="img-avatar"
          style={{ width: "100%", height: "100%" }}
        />
        <span className="avatar-status badge-success"></span>
      </div>
    </div>
  );
};

//ENROLL DRIVER

class AlcoholScheduleTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: new Array(4).fill("1"),

      filterTextPaymentMethods: "",
      filterTextScheduleds: "",
      Lab: "",
      DateTest: "",
      DateExpiry: "",
      IdDriver: "",
      Reason: "",
      Performed: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSchedule = this.showSchedule.bind(this);
  }

  componentDidMount() {
    this.props.getScheduledTestsAlcohol(id);
    this.props.getDriverList(id);
    this.props.getPaymentsMethods(id);
    this.props.getDefaultPayment(id);

    document.getElementById("1").className = "btnStep focus";
    document.getElementById("2").className = "btnStep disabled";
    document.getElementById("3").className = "btnStep disabled";
    document.getElementById("4").className = "btnStep4 disabled";

    document.getElementById("txt1").className = "txtStep focus";
    document.getElementById("txt2").className = "txtStep disabled";
    document.getElementById("txt3").className = "txtStep disabled";
    document.getElementById("txt4").className = "txtStep disabled";

    document.getElementById("2").disabled = true;
    document.getElementById("3").disabled = true;
    document.getElementById("4").disabled = true;
  }

  toggleStep(step, e) {
    if (step === 2) {
      status = "Assigned";
      document.getElementById("2").disabled = false;
      document.getElementById("3").disabled = true;
      document.getElementById("4").disabled = true;
      document.getElementById("1").className = "btnStep";
      document.getElementById("2").className = "btnStep focus";
      document.getElementById("3").className = "btnStep disabled";
      document.getElementById("4").className = "btnStep4 disabled";
      document.getElementById("txt1").className = "txtStep";
      document.getElementById("txt2").className = "txtStep focus";
      document.getElementById("txt3").className = "txtStep disabled";
      document.getElementById("txt4").className = "txtStep disabled";
      document.getElementById("step-2").style.display = "block";
      document.getElementById("step-1").style.display = "none";
      document.getElementById("step-3").style.display = "none";
      document.getElementById("step-4").style.display = "none";
    } else if (step === 3) {
      status = "Collections Site";
      document.getElementById("2").disabled = false;
      document.getElementById("3").disabled = false;
      document.getElementById("4").disabled = true;
      document.getElementById("1").className = "btnStep";
      document.getElementById("2").className = "btnStep";
      document.getElementById("3").className = "btnStep focus";
      document.getElementById("4").className = "btnStep4 disabled";
      document.getElementById("txt1").className = "txtStep";
      document.getElementById("txt2").className = "txtStep";
      document.getElementById("txt3").className = "txtStep focus";
      document.getElementById("txt4").className = "txtStep disabled";
      document.getElementById("step-3").style.display = "block";
      document.getElementById("step-1").style.display = "none";
      document.getElementById("step-2").style.display = "none";
      document.getElementById("step-4").style.display = "none";
    } else if (step === 4) {
      status = "Detail";
      document.getElementById("4").disabled = false;
      document.getElementById("1").className = "btnStep";
      document.getElementById("2").className = "btnStep";
      document.getElementById("3").className = "btnStep";
      document.getElementById("4").className = "btnStep4 focus";
      document.getElementById("txt1").className = "txtStep";
      document.getElementById("txt2").className = "txtStep";
      document.getElementById("txt3").className = "txtStep";
      document.getElementById("txt4").className = "txtStep focus";
      document.getElementById("step-4").style.display = "block";
      document.getElementById("step-1").style.display = "none";
      document.getElementById("step-2").style.display = "none";
      document.getElementById("step-3").style.display = "none";
    } else {
      status = "Donor Data";
      document.getElementById("2").disabled = true;
      document.getElementById("3").disabled = true;
      document.getElementById("4").disabled = true;
      document.getElementById("1").className = "btnStep focus";
      document.getElementById("2").className = "btnStep disabled";
      document.getElementById("3").className = "btnStep disabled";
      document.getElementById("4").className = "btnStep4 disabled";
      document.getElementById("txt1").className = "txtStep focus";
      document.getElementById("txt2").className = "txtStep disabled";
      document.getElementById("txt3").className = "txtStep disabled";
      document.getElementById("txt4").className = "txtStep disabled";
      document.getElementById("step-1").style.display = "block";
      document.getElementById("step-2").style.display = "none";
      document.getElementById("step-3").style.display = "none";
      document.getElementById("step-4").style.display = "none";
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultPaymentMethod !== this.props.defaultPaymentMethod) {
      this.props.getPaymentsMethods(id);
      this.props.getDefaultPayment(id);
    }
    return false;
  }

  mapPaymentMethodsForDataTable(items) {
    let data;
    data = items.map((row) => {
      var object = {};
      object.brandImg = CardImg(row.card.brand);
      object.numbers = `....${row.card.last4}`;
      object.expDate = `${row.card.exp_month} / ${row.card.exp_year}`;
      object.defaultPayment =
        this.props.defaultPaymentMethod === row.id
          ? checkDefaultPaymentMethod()
          : "";
      object.options = (
        <OptionMenu reduxProps={this.props} idPayment={row.id} />
      );
      return object;
    });

    return data;
  }

  mapScheduledsForDataTable(items) {
    let data = items.map((row) => {
      var object = {};
      object.Id = row.Id;
      object.photo = DriversImg(row.Image, row.IdDriver);
      object.specimenNumber = SpecimenNumber(row.SpecimenNumber);
      object.donor = row.DonorName;
      object.status = row.Status;
      object.result = row.Result;
      object.reason = Reason(row.Reason);
      object.datetime = moment().format(row.DateTimeTest);
      object.typeTest = row.TypeTest;
      object.options = (
        <OptionMenuScheduled
          idSchedule={row.Id}
          reduxProps={this.props}
          showSchedule={this.showSchedule}
          idCompany={row.IdCompany}
          idDriver={row.IdDriver}
          fileName={row.FileName}
          rowData={row}
        />
      );
      return object;
    });

    return data;
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleChangeTest(date) {
    var shortDate =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    this.props.scheduleForDay(shortDate, "alcohol");
    this.setState({ DateTest: date });
  }
  handleChangeExpiry(date) {
    this.setState({ DateExpiry: date });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.addCardModal === false) {
      var form = new FormData(e.target);
      if (key !== undefined) {
        form.append("StepProcessCode", key);
      }
      form.append("Status", status);
      form.append("idU", id);

      if (status !== "Detail") {
        this.props.scheduleAlcoholTest(form);
        var step = parseInt(e.target.parentElement.id.substring(5)) + 1;
        this.toggleStep(step);
      } else {
        form.append("amount", 4000);
        form.append("paymentMethod", this.props.defaultPaymentMethod);
        this.props.finishScheduleAlcoholTest(form);
        setTimeout(this.showSchedule, 1000);
      }
    }
    this.setState({
      Lab: "",
      DateTest: "",
      DateExpiry: "",
      Donor: "",
      Reason: "",
      Performed: "",
      IdDriver: "",
    });
  }

  showSchedule(e) {
    this.props.getScheduledTestsAlcohol(id);
    this.setState({
      Lab: "",
      DateTest: "",
      DateExpiry: "",
      Donor: "",
      Reason: "",
      Performed: "",
      IdDriver: "",
    });
    this.formSchedule.reset();
    this.formLab.reset();
    this.toggleStep(1);
    var view;
    if (document.getElementById("divSchedule").style.display === "block") {
      view = "none";
      document.getElementById("tableSchedule").style.display = "block";
      document.getElementById("btnSchedule").style.backgroundColor = "#20a8d8";
      document.getElementById("btnSchedule").style.borderColor = "#20a8d8";
      document.getElementById("btnSchedule").innerHTML = "+";
      document.getElementById("btnSchedule").style.paddingLeft = "9px";
    } else {
      view = "block";
      document.getElementById("tableSchedule").style.display = "none";
      document.getElementById("btnSchedule").style.backgroundColor = "#f86c6b";
      document.getElementById("btnSchedule").style.borderColor = "#f86c6b";
      document.getElementById("btnSchedule").innerHTML = "x";
      document.getElementById("btnSchedule").style.paddingLeft = "11px";
      status = "Donor Data";
    }

    document.getElementById("divSchedule").style.display = view;
  }

  render() {
    const { hideStep } = this.state;
    key = this.props.scheduleDyA.StepProcessCode;
    const scheduleColumns = [
      { name: "ID", selector: "Id", center: true, sortable: true },
      { name: "", selector: "photo", grow: 0 },
      { name: "DONOR", selector: "donor", sortable: true, center: true },
      { name: "SPECIMEN NUMBER", selector: "specimenNumber", center: true },
      {
        name: "STATUS",
        selector: "status",
        sortable: true,
        center: true,
        cell: (row) => (
          <Badge
            pill
            style={
              row.status === "Draft"
                ? {
                    backgroundColor: "#f5e74e",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                : row.status === "Scheduled"
                ? {
                    backgroundColor: "#ffc107",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                : row.status === "Canceled"
                ? {
                    backgroundColor: "#e93535",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                : row.status === "Collection Initiated"
                ? {
                    backgroundColor: "#3b86ff",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                : {
                    backgroundColor: "#4ad991",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
            }
          >
            {row.status==="Draft"? "Ready to Schedule":row.satus}
          </Badge>
        ),
      },
      { name: "REASON", selector: "reason", center: true },
      {
        name: "RESULT",
        selector: "result",
        center: true,
        sortable: true,
        cell: (row) => (
          <Badge
            pill
            style={
              row.result === "Pending"
                ? {
                    backgroundColor: "#17a2b8",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                : row.result === "Negative"
                ? {
                    backgroundColor: "#28a745",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                : row.result === "Negative - Diluted"
                ? {
                    backgroundColor: "#f0650e",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                : {
                    backgroundColor: "#e93535",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
            }
          >
            {row.result}
          </Badge>
        ),
      },
      {
        name: "DATE",
        selector: "datetime",
        defaultSortAsc: true,
        sortable: true,
        center: true,
      },
      { name: "ACTIONS", selector: "options", grow: 0, center: true },
    ];
    const scheduleds = this.mapScheduledsForDataTable(
      this.props.scheduledAlcoholTests
    );

    const filteredScheduleds = scheduleds.filter((item) =>
      item.donor
        .toLowerCase()
        .includes(this.state.filterTextScheduleds.toLowerCase())
    );

    const columns = [
      { name: "", selector: "brandImg", grow: 0, center: true },
      { name: "CARD", selector: "numbers", sortable: true },
      { name: "EXPIRATION DATE", selector: "expDate", center: true },
      { name: "DEFAULT PAYMENT", selector: "defaultPayment", center: true },
      { name: "OPTIONS", selector: "options", center: true, style: RowStyle },
    ];
    const paymentMethods = this.mapPaymentMethodsForDataTable(
      this.props.paymentMethods
    );
    const filteredPaymentsMethods = paymentMethods.filter((item) =>
      item.numbers
        .toLowerCase()
        .includes(this.state.filterTextPaymentMethods.toLowerCase())
    );

    var date = new Date();
    const isWeekday = (date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    };

    var times = [
      date.setHours(9, 0),
      date.setHours(9, 15),
      date.setHours(9, 30),
      date.setHours(9, 45),
      date.setHours(10, 0),
      date.setHours(10, 15),
      date.setHours(10, 30),
      date.setHours(10, 45),
      date.setHours(11, 0),
      date.setHours(11, 15),
      date.setHours(11, 30),
      date.setHours(11, 45),
      date.setHours(12, 0),
      date.setHours(12, 15),
      date.setHours(12, 30),
      date.setHours(12, 45),
      date.setHours(13, 0),
      date.setHours(13, 15),
      date.setHours(13, 30),
      date.setHours(13, 45),
      date.setHours(14, 0),
      date.setHours(14, 15),
      date.setHours(14, 30),
      date.setHours(14, 45),
      date.setHours(15, 0),
      date.setHours(15, 15),
      date.setHours(15, 30),
      date.setHours(15, 45),
      date.setHours(16, 0),
    ];
    if (
      this.props.appointmentSchedule !== undefined &&
      this.props.appointmentSchedule !== "null"
    ) {
      if (this.props.appointmentSchedule.length > 0) {
        this.props.appointmentSchedule.forEach(function (item) {
          var i = times.indexOf(
            date.setHours(
              item.TimeOfDay.substring(0, 2),
              item.TimeOfDay.substring(5, 3)
            )
          );
          times.splice(i, 1);
        });
      }
    }
    var excludeDays = [];
    if (this.props.busyDays.length > 0) {
      this.props.busyDays.forEach(function (item) {
        excludeDays.push(new Date(item));
      });
    }

    return (
      <div>
        <FormGroup style={{ paddingBottom: "35px" }} row>
          <Button
            id="btnSchedule"
            onClick={this.showSchedule}
            style={{
              position: "absolute",
              right: "5%",
              borderRadius: "50px",
              width: "35px",
              height: "35px",
              paddingLeft: "9px",
              paddingTop: "0px",
              fontSize: "16pt",
            }}
            className="buttons-royal text-white"
          >
            +
          </Button>
        </FormGroup>

        <div className="container" id="divSchedule" style={{ display: "none" }}>
          <div className="text-center">
            <FormGroup row>
              <Col md="3">
                <Button
                  onClick={() => {
                    this.toggleStep(1);
                  }}
                  id="1"
                  className="buttons-royals text-white"
                >
                  1
                </Button>
                <p id="txt1">Schedule a Test</p>
              </Col>
              <Col md="3">
                <Button
                  onClick={() => {
                    this.toggleStep(2);
                  }}
                  id="2"
                >
                  2
                </Button>
                <p id="txt2">Select a Date and Lab</p>
              </Col>
              <Col md="3" id="collectionSite">
                <Button
                  onClick={() => {
                    this.toggleStep(3);
                  }}
                  id="3"
                >
                  3
                </Button>
                <p id="txt3">Test Collection Site</p>
              </Col>
              <Col md="3">
                <Button
                  onClick={() => {
                    this.toggleStep(4);
                  }}
                  id="4"
                >
                  4
                </Button>
                <p id="txt4">Review Donor Information</p>
              </Col>
            </FormGroup>
          </div>

          <div className="setup-content" id="step-1">
            <form
              onSubmit={this.handleSubmit}
              ref={(formSchedule) => (this.formSchedule = formSchedule)}
            >
              <FormGroup row>
                <Col md="4">
                  <input
                    type="radio"
                    defaultChecked={this.props.scheduleDyA.FederalTest}
                    value="true"
                    name="FederalTest"
                    required
                  />
                  <label style={{ marginLeft: "5px" }}>
                    Federal Alcohol Test
                  </label>
                </Col>
                <Col md="4">
                  <input
                    type="radio"
                    defaultChecked={this.props.scheduleDyA.FederalTest}
                    value="true"
                    name="FederalTest"
                    required
                  />
                  <label style={{ marginLeft: "5px" }}>
                    Non Federal Alcohol Test
                  </label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <label className="control-label">
                    Select the Testing Authority
                  </label>
                  <select
                    className="form-control"
                    name="TestingAuthority"
                    value={this.props.scheduleDyA.TestingAuthority}
                    required
                  >
                    <option value="DOT FMCSA">DOT FMCSA</option>
                  </select>
                </Col>
                <Col md="6">
                  <label className="control-label">
                    Select a Donor for This Test
                  </label>
                  <Select
                    name="IdDriver"
                    options={this.props.driversList}
                    onChange={this.onChange}
                    value={
                      this.state.IdDriver !== ""
                        ? this.state.IdDriver
                        : this.props.scheduleDyA.IdDriver
                    }
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <label className="control-label">
                    Type of Test to be Performed
                  </label>
                  <select
                    id="testType"
                    className="form-control"
                    name="Performed"
                    onChange={this.hideComponent}
                    value={
                      this.state.Performed !== ""
                        ? this.state.Performed
                        : this.props.scheduleDyA.Performed
                    }
                    required
                  >
                    <option value="">SELECT</option>

                    <option value="Alcohol">ALCOHOL</option>
                  </select>
                </Col>
                <Col md="6">
                  <label className="control-label">
                    Select the Reason for Scheduling this Test
                  </label>
                  <select
                    className="form-control"
                    name="Reason"
                    onChange={this.onChange}
                    value={
                      this.state.Reason !== ""
                        ? this.state.Reason
                        : this.props.scheduleDyA.Reason
                    }
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="Pre-employment">Pre-employment</option>
                    {/*<option value="Random">Random</option>*/}
                    <option value="Reasonable Suspicion/Cause">
                      Reasonable Suspicion
                    </option>
                    <option value="Post Accident">Post Accident</option>
                    <option value="Return to Duty">Return to Duty</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Other(Specify)">Other(Specify)</option>
                  </select>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="12">
                  <Button
                    type="submit"
                    className="buttons-royal text-white float-right"
                  >
                    Next
                  </Button>
                </Col>
              </FormGroup>
            </form>
          </div>
          <div
            className="setup-content"
            id="step-2"
            style={{ display: "none" }}
          >
            <form
              onSubmit={this.handleSubmit}
              ref={(formLab) => (this.formLab = formLab)}
            >
              <FormGroup row>
                <Col md="4">
                  <Row style={{ marginLeft: "5px" }}>
                    <label className="control-label">
                      Select a Date and Time for Test
                    </label>
                  </Row>
                  <Row style={{ marginLeft: "5px" }} />
                  <DatePicker
                    autoComplete="off"
                    name="DateTimeTest"
                    className="form-control"
                    selected={this.state.DateTest}
                    placeholderText="Click to select a date"
                    required
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    minDate={new Date()}
                    includeTimes={times}
                    excludeDates={excludeDays}
                    filterDate={isWeekday}
                    onChange={this.handleChangeTest.bind(this)}
                    value={
                      this.state.DateTest === "" &&
                      this.props.scheduleDyA.DateTimeTest !== undefined
                        ? dateConvert(this.props.scheduleDyA.DateTimeTest)
                        : this.state.DateTest
                    }
                  />
                </Col>
                <Col md="4">
                  <Row style={{ marginLeft: "5px" }}>
                    <label className="control-label">
                      Select a Test Expiry Date
                    </label>
                  </Row>
                  <Row style={{ marginLeft: "5px" }} />
                  <DatePicker
                    autoComplete="off"
                    name="DateTimeExpiration"
                    className="form-control"
                    selected={this.state.DateExpiry}
                    placeholderText="Click to select a date"
                    required
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    minDate={this.state.DateTest}
                    filterDate={isWeekday}
                    onChange={this.handleChangeExpiry.bind(this)}
                    value={
                      this.state.DateExpiry === "" &&
                      this.props.scheduleDyA.DateTimeExpiration !== undefined
                        ? dateConvert(this.props.scheduleDyA.DateTimeExpiration)
                        : this.state.DateExpiry
                    }
                  />
                </Col>
                <Col md="4">
                  <label className="control-label">Select a LAB</label>
                  <select
                    className="form-control"
                    name="Lab"
                    onChange={this.onChange}
                    value={
                      this.state.Lab !== ""
                        ? this.state.Lab
                        : this.props.scheduleDyA.Lab
                    }
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="BluAgent">BluAgent</option>
                  </select>
                </Col>
              </FormGroup>
              {this.state.Lab === "Labcorp" ||
              this.props.scheduleDyA.Lab === "Labcorp" ? (
                <FormGroup row>
                  <Col md="6">
                    <Card>
                      <CardHeader className="text-white bg-secondary">
                        TESTING LAB
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col lg="8">
                            <label style={{ fontWeight: "bold" }}>
                              LAB CORP (RTP)
                            </label>{" "}
                            <br />
                            1904 Alexander Drive <br />
                            Research Triangle Park, NC, 27709 <br />
                            Phone: (919) 572-6900
                          </Col>
                          <Col className="text-right" lg="2">
                            <img
                              alt="labcorp"
                              src="assets/icons/Notification.svg"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card>
                      <CardHeader className="text-white bg-secondary">
                        MRO OFFICE
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col lg="8">
                            <label style={{ fontWeight: "bold" }}>
                              UNIVERSITY SERVICES
                            </label>{" "}
                            <br />
                            2800 Black Lake Place, Ste A <br />
                            Philadelphia, PA, 19154 <br />
                            Phone: (215) 637-6800
                          </Col>
                          <Col className="text-right" lg="2">
                            <img
                              alt="shield"
                              src="assets/icons/Notification.svg"
                              style={{ width: "50px", height: "50px" }}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </FormGroup>
              ) : this.state.Lab === "BluAgent" ||
                this.props.scheduleDyA.Lab === "BluAgent" ? (
                <FormGroup row>
                  <Col md="6">
                    <Card>
                      <CardBody className="text-white bg-secondary">
                        BluAgent
                      </CardBody>
                      <CardBody>
                        <Row>
                          <Col lg="10">
                            <label style={{ fontWeight: "bold" }}>
                              BluAgent Technologies
                            </label>{" "}
                            <br />
                            9765 Marconi Drive 200M
                            <br />
                            San Diego, CA 92154
                            <br />
                            Phone: (619)-878-5852
                          </Col>
                          <Col lg="2">
                            <img
                              className="img-fluid"
                              alt="BluAgent"
                              src="assets/img/Images/logo-icon.png"
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6"></Col>
                </FormGroup>
              ) : (
                ""
              )}
              <FormGroup row>
                <Col md="6">
                  <Button
                    className="buttons-royal text-white"
                    outline
                    onClick={() => {
                      this.toggleStep(1);
                    }}
                  >
                    Previous
                  </Button>
                </Col>
                <Col md="6">
                  <Button
                    className="buttons-royal text-white"
                    type="submit"
                    style={{ marginLeft: "90%" }}
                  >
                    Next
                  </Button>
                </Col>
              </FormGroup>
            </form>
          </div>
          <div
            className="setup-content "
            id="step-3"
            style={{ display: "none" }}
          >
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md="6">
                  <label className="control-label">Select a Provider</label>
                  <select className="form-control" name="Provider" required>
                    <option value="BluAgent">BluAgent</option>
                    <option value="Phamatec" disabled>
                      PHAMATEC
                    </option>
                    <option value="Labcorp" disabled>
                      Labcorp
                    </option>
                  </select>
                </Col>
                <Col md="6">
                  <Card className="mt-4">
                    <CardHeader className="text-white card-blue-gray-header">
                      BLUAGENT LAB
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col lg="8">
                          <label style={{ fontWeight: "bold" }}>BLUAGENT</label>{" "}
                          <br />
                          9765 Marconi Dr #200m
                          <br />
                          San Diego, CA 92154
                          <br />
                          Phone: (619) 878-5852
                        </Col>
                        <Col lg="2">
                          <img
                            alt="labcorp"
                            src="/assets/img/Images/logo.png"
                            style={{ width: "149px", height: "32px" }}
                          />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Button
                    color="primary"
                    outline
                    onClick={() => {
                      this.toggleStep(2);
                    }}
                  >
                    Previous
                  </Button>
                </Col>
                <Col md="6">
                  <Button color="primary" style={{ marginLeft: "90%" }}>
                    Next
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
          <div
            className="setup-content"
            id="step-4"
            style={{ display: "none" }}
          >
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md="6">
                  <label className="control-label">Testing Authority</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.props.scheduleDyA.TestingAuthority}
                    disabled
                  />
                </Col>
                <Col md="6">
                  <label className="control-label">Donor for This Test</label>
                  <Select
                    value={this.props.scheduleDyA.IdDriver}
                    options={this.props.driversList}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <label className="control-label">Performed</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.props.scheduleDyA.Performed}
                    disabled
                  />
                </Col>
                <Col md="6">
                  <label className="control-label">
                    Reason for Scheduling this Test
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.props.scheduleDyA.Reason}
                    disabled
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <label className="control-label">
                    Date and Time for Alcohol Test
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={moment().format(
                      this.props.scheduleDyA.DateTimeTest
                    )}
                    disabled
                  />
                </Col>
                <Col md="6">
                  <label className="control-label">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={moment().format(
                      this.props.scheduleDyA.DateTimeExpiration
                    )}
                    disabled
                  />
                </Col>
              </FormGroup>
              {this.state.Lab === "Labcorp" ||
              this.props.scheduleDyA.Lab === "Labcorp" ? (
                <Row>
                  <Col lg="6">
                    <Card>
                      <CardHeader>TESTING LAB</CardHeader>
                      <CardBody>
                        <Row>
                          <Col lg="10">
                            <label style={{ fontWeight: "bold" }}>
                              LAB CORP (RTP)
                            </label>{" "}
                            <br />
                            1904 Alexander Drive <br />
                            Research Triangle Park, NC, 27709 <br />
                            Phone: (919) 572-6900
                          </Col>
                          <Col lg="2">
                            <img
                              alt="labcorp"
                              src="assets/img/Images/labcorp.png"
                              style={{ width: "170px" }}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6">
                    <Card>
                      <CardHeader> MRO OFFICE</CardHeader>
                      <CardBody>
                        <Row>
                          <Col lg="10">
                            <label style={{ fontWeight: "bold" }}>
                              UNIVERSITY SERVICES
                            </label>{" "}
                            <br />
                            2800 Black Lake Place, Ste A <br />
                            Philadelphia, PA, 19154 <br />
                            Phone: (215) 637-6800
                          </Col>
                          <Col lg="2">
                            <img
                              alt="shield"
                              src="assets/img/Images/shield.png"
                              style={{ height: "80px" }}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ) : this.state.Lab === "Phamatec" ||
                this.props.scheduleDyA.Lab === "Phamatec" ? (
                <FormGroup row>
                  <Col md="6">
                    <div style={{ borderRadius: "10px" }}>
                      <div
                        style={{
                          float: "top",
                          borderRadius: "10px 10px 0px 0px",
                          background: "#49637bb0",
                          color: "#f0f3f5",
                          padding: "5px 5px 5px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        TESTING LAB
                      </div>
                      <div
                        style={{
                          width: "50%",
                          float: "left",
                          background: "#e9ecef",
                          padding: "10px",
                        }}
                      >
                        <label style={{ fontWeight: "bold" }}>
                          PHAMATEC, INCORPORATED
                        </label>{" "}
                        <br />
                        10151 Barnes Canyon Road <br />
                        San Diego, CA 92121
                        <br />
                        Phone:
                      </div>
                      <div
                        className="text-center"
                        style={{
                          width: "50%",
                          float: "right",
                          background: "#e9ecef",
                          padding: "16px 0px 16px 0px",
                        }}
                      >
                        <img
                          alt="phamatech"
                          src="assets/img/Images/phamatech.png"
                          style={{ width: "200px", height: "80px" }}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div style={{ borderRadius: "10px" }}>
                      <div
                        style={{
                          float: "top",
                          borderRadius: "10px 10px 0px 0px",
                          background: "#49637bb0",
                          color: "#f0f3f5",
                          padding: "5px 5px 5px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        MRO OFFICE
                      </div>
                      <div
                        style={{
                          width: "50%",
                          float: "left",
                          background: "#e9ecef",
                          padding: "10px",
                        }}
                      >
                        <label style={{ fontWeight: "bold" }}>
                          PAUL TEYNOR M.D
                        </label>{" "}
                        <br />
                        1430 S Main Street
                        <br />
                        Salt Lake City, UT 84115
                        <br />
                        Phone: (801) 503-3400
                      </div>
                      <div
                        className="text-center"
                        style={{
                          width: "50%",
                          float: "right",
                          background: "#e9ecef",
                          padding: "16px 0px 16px 0px",
                        }}
                      >
                        <img
                          alt="shield"
                          src="assets/img/Images/shield.png"
                          style={{ width: "200px", height: "80px" }}
                        />
                      </div>
                    </div>
                  </Col>
                </FormGroup>
              ) : (
                ""
              )}
              <FormGroup row>
                <Col md="6">
                  <label className="control-label">Provider</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.props.scheduleDyA.Provider}
                    disabled
                  />
                </Col>
                <Col md="6">
                  <Card>
                    <CardHeader className="bg-secondary text-white">
                      TESTING LAB
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col lg="10">
                          <label style={{ fontWeight: "bold" }}>BLUAGENT</label>{" "}
                          <br />
                          9765 Marconi Dr #200m
                          <br />
                          San Diego, CA 92154
                          <br />
                          Phone: (619) 878-5852
                        </Col>
                        <Col lg="2">
                          <img
                            alt="logo"
                            src="assets/img/logo/logosimple.png"
                            style={{ width: "70px", height: "70px" }}
                          />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </FormGroup>
              <AddPayment />
              <DataTable
                responsive={true}
                pagination
                columns={columns}
                defaultSortAsc={true}
                data={filteredPaymentsMethods}
              />
              <FormGroup row>
                <Col md="6">
                  <Button
                    className="buttons-royal text-white"
                    outline
                    onClick={() => {
                      this.toggleStep(3);
                    }}
                  >
                    Previous
                  </Button>
                </Col>
                <Col md="6">
                  <Button
                    className="buttons-royal text-white"
                    style={{ marginLeft: "90%" }}
                    disabled={
                      this.props.defaultPaymentMethod === null ? true : false
                    }
                  >
                    Accept
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>

        <div id="tableSchedule">
          {!scheduleds ? (
            "No Data"
          ) : (
            <>
              <Filter
                data={scheduleds}
                onFilter={(value) => {
                  this.setState({ filterTextScheduleds: value });
                }}
              />
              <DataTable
                responsive={true}
                pagination
                columns={scheduleColumns}
                data={filteredScheduleds}
              />
            </>
          )}
        </div>
        <AlertDelete
          modalHeader="Are you sure you want to cancel this test?"
          message=" If you continue your cancellation you will not be able to edit the test information anymore.
                            If you want to proceed please press YES"
          modalType="Deactivate"
          modal={this.props.modalCancelAlcohol}
          toggle={() => {
            this.props.toggleCancelAlcoholSchedule(this.props.idScheduled);
          }}
          delete={() => {
            this.props.cancelScheduledAlcoholTest(
              this.props.idScheduled,
              cancelDetails,
              id
            );
          }}
        />
        <AlertDelete
          message="You are about to DELETE a Test from the list, do you want to continue?"
          modalType="Delete"
          modal={this.props.modalDeleteScheduleAlcohol}
          toggle={() => {
            this.props.toggleDeleteScheduledAlcohol(this.props.idScheduled);
          }}
          delete={() => {
            this.props.deleteScheduledAlcohol(this.props.idScheduled, id);
          }}
        />
      </div>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(AlcoholScheduleTest);
