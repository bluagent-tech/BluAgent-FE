import React from "react";
import { FormGroup, Col, Row, Label, Input, Button } from "reactstrap";
import "../../../assets/css/RandomTesting.css";
import Widget06 from "../../../views/Widgets/Widget06";
import axios from "axios";
import X2JS from 'x2js';
import { xmlToJSON } from 'xml2js';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/Widget06";
import Loading from "../../../components/Loading";
import ToastAlert from "../../../components/ToastAlert";

const idCompany = JSON.parse(localStorage.getItem("idCompany"));
var dateYear = new Date().getFullYear();

class RandomTesting extends React.Component {
  constructor(props) {
    super(props);
    this.RandomStats = this.RandomStats.bind(this);
    this.HandleQuarterz = this.HandleQuarterz.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getQuartersForYears = this.getQuartersForYears.bind(this);
    this.LoadingMethod = this.LoadingMethod.bind(this);
    this.labCorpOts = this.labCorpOts(this);

    this.state = {
      open: false,
      quarterzLoading: false,
      question: true,
      q1Completed: false,
      q2Completed: false,
      q3Completed: false,
      q4Completed: false,
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  RandomStats() {
    var form = new FormData();
    form.append("idCompany", idCompany);
    form.append("year", dateYear);
    this.props.getRandomStatsByYears(form);
    this.props.getAlcoholRandomStatsByYears(form);
  }

  LoadingMethod() {
    this.state.quarterzLoading = !this.state.quarterzLoading;
  }

  HandleQuarterz(e) {
    e.preventDefault();
    var form = new FormData();
    form.append("companyId", idCompany);
    form.append("drugTest", this.state.drugTest);
    form.append("alcoholTest", this.state.alcoholTest);
    this.props.SetPreviousRandoms(
      form,
      this.LoadingMethod,
      this.props.newCompany(idCompany)
    );
  }

  quarterValidation = () => {
    var date = new Date();
    var isYear = new Date().getFullYear();
    var month = date.getMonth() + 1;

    if (isYear !== parseInt(dateYear, 10)) {
      this.state.q1Completed = true;
      this.state.q2Completed = true;
      this.state.q3Completed = true;
      this.state.q4Completed = true;
    } else {
      if (month >= 1 && month <= 3) {
        this.state.q1Completed = false;
        this.state.q2Completed = false;
        this.state.q3Completed = false;
        this.state.q4Completed = false;
      } else if (month >= 4 && month <= 6) {
        this.state.q1Completed = true;
        this.state.q2Completed = false;
        this.state.q3Completed = false;
        this.state.q4Completed = false;
      } else if (month >= 7 && month <= 9) {
        this.state.q1Completed = true;
        this.state.q2Completed = true;
        this.state.q3Completed = false;
        this.state.q4Completed = false;
      } else if (month >= 10 && month <= 12) {
        this.state.q1Completed = true;
        this.state.q2Completed = true;
        this.state.q3Completed = true;
        this.state.q4Completed = false;
      } else {
        this.state.q1Completed = false;
        this.state.q2Completed = false;
        this.state.q3Completed = false;
        this.state.q4Completed = false;
      }
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData();
    form.append("idCompany", 126);
    fetch("/api/DrugAndAlcoholTesting/ResetTest", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error Resetting Random Tests " + error);
      });
  }

  getQuartersForYears(year) {
    let form = new FormData();
    form.append("idCompany", idCompany);
    form.append("year", year);
    this.props.getRandomStatsByYears(form);
    this.props.getAlcoholRandomStatsByYears(form);
    dateYear = year;
    this.quarterValidation();
  }

  labCorpOts() {
    fetch("https://b9oct2ga0b.execute-api.us-east-1.amazonaws.com/default/labCorpOts", {
      method: "POST", body: JSON.stringify({
        zip: 92037,
        distance: 20
      })
    })
      .then((response) => response.text())
      .then(text => {
        const x2js = new X2JS();
        const json = x2js.xml2js(text);
        // console.log('XMLS TO JSON >>>>>>>>>',json); // objeto JSON
      })
      .catch((ex) => console.log(ex))
  }

  componentDidMount() {
    this.props.newCompany(idCompany);
    this.quarterValidation();
    this.RandomStats();
  }

  render() {
    return (
      <div>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        {this.props.isNewCompany !== null ? (
          <div>
            <div className="container">
              <div className="">
                <Row form>
                  <FormGroup>
                    <Label for="dateYear">Quarters For Years</Label>
                    <Input
                      type="select"
                      name="year"
                      id="dateYear"
                      onChange={(e) => this.getQuartersForYears(e.target.value)}
                    >
                      <option value={2023}>2023</option>
                      <option value={2022}>2022</option>
                      <option value={2021}>2021</option>
                    </Input>
                  </FormGroup>
                  {/**<QuestionTooltip message="Reasons to deactivate a driver" /> */}
                </Row>
              </div>
              <div>
                <label
                  style={{
                    color: "#007bff",
                    textAlign: "left",
                    fontWeight: "500",
                    fontSize: "larger",
                  }}
                >
                  Drug Testing Quarters:
                </label>
              </div>
              <FormGroup row>
                <Col md="3">
                  <Widget06
                    quarter="1"
                    children="Progress 0/0"
                    color="success"
                    title="Quarter 1: Jan 1 - March 31"
                    type="drug"
                    quarterCompleted={this.state.q1Completed}
                    QPercentageOfDrugtestDrivers={
                      this.props.Q1PercentageOfDrugtestDrivers
                    }
                    QremainingDrivers={this.props.Q1remainingDrivers}
                    QCompletedDrivers={this.props.Q1CompletedDrivers}
                    isYear={dateYear}
                    getStatus={this.RandomStats}
                    countListDriverCompany={this.props.countListDriverCompany}
                  ></Widget06>
                </Col>
                <Col md="3">
                  <Widget06
                    quarter="2"
                    children="Progress 0/0"
                    color="success"
                    title="Quarter 2: April 1 - June 30"
                    type="drug"
                    quarterCompleted={this.state.q2Completed}
                    QPercentageOfDrugtestDrivers={
                      this.props.Q2PercentageOfDrugtestDrivers
                    }
                    QremainingDrivers={this.props.Q2remainingDrivers}
                    QCompletedDrivers={this.props.Q2CompletedDrivers}
                    getStatus={this.RandomStats}
                    isYear={dateYear}
                    countListDriverCompany={this.props.countListDriverCompany}
                  ></Widget06>
                </Col>
                <Col md="3">
                  <Widget06
                    quarter="3"
                    children="Progress 0/1"
                    color="success"
                    title="Quarter 3: July 1 - Sept 30"
                    type="drug"
                    quarterCompleted={this.state.q3Completed}
                    QPercentageOfDrugtestDrivers={
                      this.props.Q3PercentageOfDrugtestDrivers
                    }
                    QremainingDrivers={this.props.Q3remainingDrivers}
                    QCompletedDrivers={this.props.Q3CompletedDrivers}
                    getStatus={this.RandomStats}
                    isYear={dateYear}
                    countListDriverCompany={this.props.countListDriverCompany}
                  ></Widget06>
                </Col>
                <Col md="3">
                  <Widget06
                    quarter="4"
                    children="Progress 0/0"
                    color="success"
                    title="Quarter 4: Oct 1 - Dec 31"
                    type="drug"
                    quarterCompleted={this.state.q4Completed}
                    QPercentageOfDrugtestDrivers={
                      this.props.Q4PercentageOfDrugtestDrivers
                    }
                    QremainingDrivers={this.props.Q4remainingDrivers}
                    QCompletedDrivers={this.props.Q4CompletedDrivers}
                    getStatus={this.RandomStats}
                    isYear={dateYear}
                    countListDriverCompany={this.props.countListDriverCompany}
                  ></Widget06>
                </Col>
              </FormGroup>

              {/*
               */}
            </div>
            <div className="container">
              <div>
                <label
                  style={{
                    color: "#007bff",
                    textAlign: "left",
                    fontWeight: "500",
                    fontSize: "larger",
                  }}
                >
                  Alcohol Testing Quarters:
                </label>
              </div>
              <FormGroup row>
                <Col md="3">
                  <Widget06
                    quarter="1"
                    children="Progress 0/0"
                    color="success"
                    title="Quarter 1: Jan 1 - March 31"
                    type="alcohol"
                    quarterCompleted={this.state.q1Completed}
                    QPercentageOfDrugtestDrivers={
                      this.props.Q1PercentageOfAlcoholtestDrivers
                    }
                    QCompletedDrivers={this.props.Q1CompletedDriversAlcohol}
                    QremainingDrivers={this.props.Q1remainingDriversAlcohol}
                    getStatus={this.RandomStats}
                    isYear={dateYear}
                    countListDriverCompany={this.props.countListDriverCompany}
                  ></Widget06>
                </Col>
                <Col md="3">
                  <Widget06
                    quarter="2"
                    children="Progress 0/0"
                    color="success"
                    title="Quarter 2: April 1 - June 30"
                    type="alcohol"
                    quarterCompleted={this.state.q2Completed}
                    QPercentageOfDrugtestDrivers={
                      this.props.Q2PercentageOfAlcoholtestDrivers
                    }
                    QCompletedDrivers={this.props.Q2CompletedDriversAlcohol}
                    QremainingDrivers={this.props.Q2remainingDriversAlcohol}
                    getStatus={this.RandomStats}
                    isYear={dateYear}
                    countListDriverCompany={this.props.countListDriverCompany}
                  ></Widget06>
                </Col>
                <Col md="3">
                  <Widget06
                    quarter="3"
                    children="Progress 0/1"
                    color="success"
                    title="Quarter 3: July 1 - Sept 30"
                    type="alcohol"
                    quarterCompleted={this.state.q3Completed}
                    QPercentageOfDrugtestDrivers={
                      this.props.Q3PercentageOfAlcoholtestDrivers
                    }
                    QCompletedDrivers={this.props.Q3CompletedDriversAlcohol}
                    QremainingDrivers={this.props.Q3remainingDriversAlcohol}
                    getStatus={this.RandomStats}
                    isYear={dateYear}
                    countListDriverCompany={this.props.countListDriverCompany}
                  ></Widget06>
                </Col>
                <Col md="3">
                  <Widget06
                    quarter="4"
                    children="Progress 0/0"
                    color="success"
                    title="Quarter 4: Oct 1 - Dec 31"
                    type="alcohol"
                    quarterCompleted={this.state.q4Completed}
                    QPercentageOfDrugtestDrivers={
                      this.props.Q4PercentageOfAlcoholtestDrivers
                    }
                    QCompletedDrivers={this.props.Q4CompletedDriversAlcohol}
                    QremainingDrivers={this.props.Q4remainingDriversAlcohol}
                    getStatus={this.RandomStats}
                    isYear={dateYear}
                    countListDriverCompany={this.props.countListDriverCompany}
                  ></Widget06>
                </Col>
              </FormGroup>

              {/*
               */}
            </div>
          </div>
        ) : (
          <div className="container-fluid">
            {/*
          <form onSubmit={this.handleSubmit}>
            <button type="submit">Reset test</button>
          </form>
    */}
            <div className="row borderAlert p-2 mb-4">
              <div className="text-muted font-weight-bold">
                You have not yet authorized Random Testing for {dateYear}
              </div>
            </div>
            <form onSubmit={this.HandleQuarterz}>
              <div className="row mb-2">
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">
                    Please fill out the information below to ensure that our
                    system can begin random testing your employees.
                  </label>
                  <div className="form-check pl-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="false"
                      name="question1"
                      id="defaultCheck1"
                      required
                    />
                    <label className="form-check-label" htmlFor="defaultCheck1">
                      <div className="text-muted font-weight-bold">
                        I have added all Active DOT Drivers to the BlueAgent
                        System
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mb-2 mt-4">
                <label htmlFor="random">
                  Have you performed any random tests this year outside of our
                  BluAgent System? if yes, fill below
                </label>
                <div className="col-sm-12 d-flex pl-0 mt-3">
                  <div className="col-sm-6 pl-0">
                    <div className="form-group">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="text-label"
                      >
                        Random Drug Testing Performed Outside This System
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Drug Test Number"
                        name="drugTest"
                        min={0}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 pl-0">
                    <div className="form-group">
                      <label
                        htmlFor="formGroupExampleInput2"
                        className="text-label"
                      >
                        Random Alcohol Testing Performed Outside This System
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Alcohol Test Number"
                        name="alcoholTest"
                        onChange={this.handleChange}
                        min={0}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="form-group">
                  <div className="form-check pl-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="false"
                      name="question2"
                      id="defaultCheck2"
                      required
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      <div className="text-muted font-weight-bold">
                        I hereby authorize BluAgent to perform Random Testing
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                {this.state.quarterzLoading !== false ? (
                  <button className="btn btn-success">
                    <Loading />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success">
                    <i className="fa fa-check mr-1" aria-hidden="true"></i>
                    Authorize Random Testing
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => state.widget06,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(RandomTesting);
