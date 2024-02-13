import React, { Component } from 'react';
import { Row, Col, Input, Form, FormGroup, Label, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/DrugAndAlcoholTesting';
import dateConvert from '../../../services/dateConvertTables';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

let status = 'Draft';
let id = JSON.parse(localStorage.getItem('user')).Id;

class SelectLab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DateTest: '',
      DateExpiry: '',
      IdDriver: 355,
      Lab: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleChangeTest = this.handleChangeTest.bind(this);
    this.handleChangeExpiry = this.handleChangeExpiry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleStep = this.toggleStep.bind(this);
  }

  toggleStep(step, e) {}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeTest(date) {
    var shortDate =
      date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    this.props.scheduleForDay(shortDate);
    this.setState({ DateTest: date });
  }
  handleChangeExpiry(date) {
    this.setState({ DateExpiry: date });
  }

  handleSubmit(e) {
    e.preventDefault();

    let DriverId = this.state.IdDriver;

    if (this.props.addCardModal === false) {
      var form = new FormData(e.target);
      form.append('Status', status);
      form.append('idU', id);
      form.append('IdDriver', DriverId);
    }

    if (status !== 'Detail') {
      this.props.scheduleDrugTest(form);
      var step = parseInt(e.target.parentElement.id.substring(5)) + 1;
      this.toggleStep(step);
    } else {
      form.append('amount', 5000);
      form.append('paymentMethod', this.props.defaultPaymentMethod);
      this.props.finishScheduleDrugTest(form);
      setTimeout(this.showSchedule, 1000);
    }

    this.setState({
      Lab: '',
      DateTest: '',
      DateExpiry: '',
      IdDriver: '',
    });
  }

  render() {
    const { DateTest, DateExpiry, IdDriver } = this.state;

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
      this.props.appointmentSchedule !== 'null'
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
      <>
        <section section>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Select a Date and Time for Test</Label>
                  <DatePicker
                    autoComplete='off'
                    name='DateTimeTest'
                    className='form-control'
                    selected={DateTest}
                    placeholderTest='CLick to select a date'
                    required
                    dateFormat='MM/dd/yyyy h:m aa'
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    timeCaption='time'
                    minDate={new Date()}
                    includeTimes={times}
                    excludeDates={excludeDays}
                    filterDate={isWeekday}
                    onChange={this.handleChangeTest}
                    value={
                      DateTest === '' &&
                      this.props.scheduleDyA.DateTimeTest !== undefined
                        ? dateConvert(this.props.scheduleDyA.DateTimeTest)
                        : DateTest
                    }
                  ></DatePicker>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Select a Test Expiry Date</Label>
                  <DatePicker
                    autoComplete='off'
                    name='DateTimeTest'
                    className='form-control'
                    selected={DateExpiry}
                    placeholderTest='CLick to select a date'
                    required
                    dateFormat='MM/dd/yyyy h:m aa'
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    timeCaption='time'
                    minDate={DateTest}
                    filerDate={isWeekday}
                    onChange={this.handleChangeExpiry}
                    value={
                      this.state.DateTest === '' &&
                      this.props.scheduleDyA.DateTimeTest !== undefined
                        ? dateConvert(this.props.scheduleDyA.DateTimeTest)
                        : this.state.DateTest
                    }
                  ></DatePicker>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Select a LAB</Label>
                  <select
                    className='form-control'
                    name='Lab'
                    onChange={this.onChange}
                    value={
                      this.state.Lab !== ''
                        ? this.state.Lab
                        : this.props.scheduleDyA.Lab
                    }
                    required
                  >
                    <option value=''>SELECT</option>
                    <option value='BluAgent'>BluAgent</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Button
                    type='submit'
                    className='buttons-royal text-white px-5 float-right'
                  >
                    Next
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </section>
      </>
    );
  }
}
export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(SelectLab);
