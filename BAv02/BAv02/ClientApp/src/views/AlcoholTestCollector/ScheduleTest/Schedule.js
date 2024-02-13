import React, { Component } from 'react';
import { Row, Col, Input, Form, FormGroup, Label, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/DrugAndAlcoholTesting';
import Select from '../../../components/Select';


let id = JSON.parse(localStorage.getItem('user')).Id;
let key = '';
let status = 'Donor Data';
class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FederalTest: true,
      TestingAuthority: '',
      IdDriver: '',
      Status: 'Donor Information',
      Performed: '',
      Reason: '',
    };
    this.onChange = this.onChange.bind(this);
    this.toggleStep = this.toggleStep.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleStep(step, e) {}

  componentDidMount() {
    this.props.getDriverList(id);
    this.props.getPaymentsMethods(id);
    this.props.getDefaultPayment(id);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.addCardModal === false) {
      var form = new FormData(e.target);

      if (key !== undefined || key === null) {
        form.append('StepProcessCode', key);
      }
      form.append('Status', status);
      form.append('idU', id);
    }

    if (status !== 'Detail') {
      this.props.scheduleAlcoholTest(form);
      let step = parseInt(e.target.parentElement.id.substring(5)) + 1;
      this.toggleStep(step);
    } else {
      form.append('amount', 2500);
      form.append('paymentMethods', this.props.defaultPayment);
      this.props.finishScheduleDrugTest(form);
      setTimeout(this.showSchedule, 1000);
    }
    this.setState({
      FederalTest: false,
      TestingAuthority: '',
      IdDriver: '',
      Status: '',
      Performed: '',
      Reason: '',
    });
  }

  showSchedule(e) {}

  render() {
    const {
      FederalTest,
      TestingAuthority,
      IdDriver,
      Performed,
      Reason,
    } = this.state;
    key = this.props.scheduleDyA.StepProcessCode;
    return (
      <>
        <section>
          <Form onSubmit={this.onSubmit}>
            <Row>
              <Col className='mt-5'>
                <FormGroup check>
                  <Label check>
                    <Input
                      type='radio'
                      name='FederalTest'
                      value={FederalTest}
                      onChange={this.onChange}
                    />{' '}
                    Federal Test
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label>Select the Testing Authority</label>
                  <Input
                    name='TestingAuthority'
                    type='select'
                    value={TestingAuthority}
                    onChange={this.onChange}
                  >
                    <option>Select</option>
                    <option name='DOT_FMSCA'>DOT FMSCA</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <label>Type of Test to be Performed</label>
                  <Input
                    type='select'
                    name='Performed'
                    value={Performed}
                    onChange={this.onChange}
                  >
                    <option>SELECT</option>
                    <option name='Alcohol Test'>ALCOHOL</option>
                    <option value='Other(Specify)'>Other(Specify)</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label>Select a Donor for This Test</label>
                  <Select
                    name='IdDriver'
                    options={this.props.driversList}
                    onChange={this.onChange}
                    value={
                      IdDriver !== ''
                        ? IdDriver
                        : this.props.scheduleDyA.IdDriver
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <label>Select the Reason of Scheduling this Test</label>
                  <Input
                    type='select'
                    name='Reason'
                    value={Reason}
                    onChange={this.onChange}
                  >
                    <option value=''>Select</option>
                    <option value='Pre-employment'>Pre-employment</option>
                    <option value='Random'>Random</option>
                    <option value='Reasonable Suspicion/Cause'>
                      Reasonable Suspicion
                    </option>
                    <option value='Post Accident'>Post Accident</option>
                    <option value='Return to Duty'>Return to Duty</option>
                    <option value='Follow-up'>Follow-up</option>
                    <option value='Other(Specify)'>Other(Specify)</option>
                  </Input>
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
)(Schedule);
