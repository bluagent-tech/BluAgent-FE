import React, { Component, Fragment } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  Row,
  Col,
  Form,
  UncontrolledTooltip,
  Label,
} from 'reactstrap';
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/AccountSettings';
import NumberFormat from 'react-number-format';
import DatePicker from '../components/DatePicker';
import ToastAlert from "../components/ToastAlert";

let user = JSON.parse(localStorage.getItem('user')).Role;

//ADD USER

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.state = {
      countryPhone: '+1',
      Role: '',
      permits: "",
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onChangeR = this.onChangeR.bind(this);
    this.close = this.close.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChangeR(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  onChange(e) {
    const { checked, name } = e.target;
    var p = this.state.permits;
    if (checked === true) {
      p.push(name);
      this.setState({ permits: p });
    } else {
      var i = p.indexOf(name);
      p.splice(i, 1);
      this.setState({ permits: p });
    }
  }
  close() {
    this.setState({ countryPhone: '+1', Role: '', password: '', permits: "" });
    this.props.toggleNU();
  }
  generatePassword() {
    var caracteres = 'A!B0C@D1E#F2G$H%3I&J4K*L5M!n@o6p#q7r$t8u%v9w&x*y!z';
    var contraseña = '';
    var i = 0;
    for (i = 0; i < 11; i++) {
      contraseña += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    var x = document.getElementById('nupaswword');
    x.value = contraseña;
    this.setState({ password: contraseña });
  }

  handlesubmit(e) {
    e.preventDefault();
    //console.log("e", e.target.password.value);
    if (
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
        e.target.password.value
      )
    ) {
      document.getElementById('error').style.display = 'none';
      var id = JSON.parse(localStorage.getItem('user')).Id;
      var form = new FormData(e.target);
      form.append(
        'PhoneNumber',
        e.target.countryPhone.value + ' ' + e.target.PhoneNumberx.value
      );
      form.append('idu', id);
      form.append('permits', this.state.permits.toString());
      this.props.addNewUser(form);
      this.setState({
        countryPhone: '+1',
        Role: '',
        password: '',
        permits: "",
      });
    } else {
      document.getElementById('error').style.display = 'block';
    }
  }
  handleSelectChange(selectedOptions) {
    this.state.permits = selectedOptions.selectedValue
  }
  render() {
    var options = [
      {
        labelKey: "HR",
        value: "HR"
      },
      {
        labelKey: "DER",
        value: "DER",
      },
      {
        labelKey: "Mechanical",
        value: "Mechanical"
      },
      // {
      //   labelKey: "Admi",
      //   value: "Reports"
      // },
    ]
    return (
      <div className='mb-4'>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <Row>
          <Col>
            <div className='text-left'>
              <Button
                className='buttons-royal text-white button-rounded'
                onClick={this.close}
              >
                <i className='fas fa-user-plus'></i>
              </Button>
            </div>
          </Col>
        </Row>
        <Modal isOpen={this.props.modalNU} className={'modal-lg'}>
          <ModalHeader toggle={this.close}>Add New User</ModalHeader>
          <Form onSubmit={this.handlesubmit}>
            <ModalBody>
              <hr className='hr-modal' />
              <div className='form-body'>
                <Row>
                  <Col md='6'>
                    <div className='form-group'>
                      <label htmlFor='nufname'>First Name</label>
                      <input
                        type='text'
                        id='nufname'
                        placeholder='First Name'
                        maxLength='49'
                        className='form-control'
                        name='Name'
                        ref={(nufname) => (this.nufname = nufname)}
                        required
                      />
                    </div>
                  </Col>
                  <Col md='6'>
                    <div className='form-group'>
                      <label htmlFor='nulname'>Last Name</label>
                      <input
                        placeholder='Last Name'
                        type='text'
                        id='nulname'
                        maxLength='49'
                        className='form-control'
                        name='LastName'
                        ref={(nulname) => (this.nulname = nulname)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md='6'>
                    <DatePicker
                      id='nudate'
                      name='Birthdate'
                      labelText='Date of Birth'
                    />
                  </Col>
                  <Col md='6'>
                    <label htmlFor='nuphone'>Phone Number</label>
                    <div className='form-inline'>
                      <select
                        style={{ width: '30%' }}
                        value={this.state.countryPhone}
                        className='form-control'
                        name='countryPhone'
                        onChange={this.onChangeR}
                      >
                        <option value='US +1'>US +1</option>
                        <option value='MX +52'>MX +52</option>
                        <option value='CAN +1'>CAN +1</option>
                      </select>
                      <NumberFormat
                        style={{ width: '70%' }}
                        format='(###) ###-####'
                        placeholder='(---) --- ----'
                        mask='_'
                        className='form-control'
                        name='PhoneNumberx'
                        ref={(nuphone) => (this.nuphone = nuphone)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md='6'>
                    <div className='form-group'>
                      <label htmlFor='typeUser'>Type of User</label>
                      <select
                        id='typeUser'
                        name='Role'
                        className='form-control'
                        onChange={this.onChangeR}
                        ref={(typeUser) => (this.typeUser = typeUser)}
                        required
                      >
                        <option value=''>Select</option>

                        {user === 'ADMIN' ? (
                          <Fragment>
                            <option value='ADMIN'>ADMIN</option>
                            <option value='USER'>USER</option>
                          </Fragment>
                        ) : null}

                        {user === 'SUPERADMIN' ? (
                          <Fragment>
                            <option value='SUPERADMIN'>SUPER ADMIN</option>
                            <option value='COLLECTOR'>COLLECTOR</option>
                            <option value='INSURANCE'>INSURANCE</option>
                          </Fragment>
                        ) : null}
                      </select>
                    </div>
                  </Col>
                  {this.state.Role === 'INSURANCE' ? (
                    <React.Fragment>
                      <Col md='3'>
                        <div className='form-group'>
                          <label htmlFor='InsuranceProvider'>Provider</label>
                          <select
                            id='InsuranceProvider'
                            name='InsuranceProvider'
                            className='form-control'
                            ref={(InsuranceProvider) => (this.InsuranceProvider = InsuranceProvider)}
                            required
                          >
                            <option value='' disabled=''>
                              Select
                            </option>
                            <option value='CAIC'>CAIC</option>
                            <option value='New Horizon'>New Horizon</option>
                            <option value='National Unity'>National Unity</option>
                            <option value='Qualitas'>Qualitas</option>
                          </select>
                        </div>
                      </Col>
                      <Col md='3'>
                        <div className='form-group'>
                          <label htmlFor='nugender'>Gender</label>
                          <select
                            id='nugender'
                            name='Gender'
                            className='form-control'
                            ref={(nugender) => (this.nugender = nugender)}
                            required
                          >
                            <option value='' disabled=''>
                              Select
                            </option>
                            <option value='MALE'>MALE</option>
                            <option value='FEMALE'>FEMALE</option>
                          </select>
                        </div>
                      </Col>
                    </React.Fragment>
                  ) : (<Col md='6'>
                    <div className='form-group'>
                      <label htmlFor='nugender'>Gender</label>
                      <select
                        id='nugender'
                        name='Gender'
                        className='form-control'
                        ref={(nugender) => (this.nugender = nugender)}
                        required
                      >
                        <option value='' disabled=''>
                          Select
                        </option>
                        <option value='MALE'>MALE</option>
                        <option value='FEMALE'>FEMALE</option>
                      </select>
                    </div>
                  </Col>)
                  }
                </Row>
                {this.state.Role === 'USER' ? (
                  <Row>
                    <Col mb='4'>
                      <Label htmlFor="select-input" style={{ marginRight: '52px' }}>
                        User Permits:
                      </Label>
                      <BootstrapSelect
                        options={options}
                        isMultiSelect={true}
                        onChange={this.handleSelectChange}
                        required
                      />
                      {/* <label style={{ marginRight: '20px' }}>
                        <input
                          type='checkbox'
                          value='true'
                          style={{ marginRight: '5px' }}
                          name='HR'
                          onChange={this.onChange}
                        />
                        Driver Files
                      </label>
                      <label style={{ marginRight: '20px' }}>
                        <input
                          type='checkbox'
                          value='true'
                          style={{ marginRight: '5px' }}
                          name='DER'
                          onChange={this.onChange}
                        />
                        Drug Testing
                      </label>
                      <label style={{ marginRight: '20px' }}>
                        <input
                          type='checkbox'
                          value='true'
                          style={{ marginRight: '5px' }}
                          name='Mechanical'
                          onChange={this.onChange}
                        />
                        Maintenance
                      </label> */}
                    </Col>
                  </Row>
                ) : (
                  ''
                )}
                <Row>
                  <Col md='6'>
                    <div className='form-group'>
                      <label htmlFor='nuemail'>E-mail</label>
                      <input
                        type='email'
                        placeholder='Email'
                        id='nuemail'
                        className='form-control'
                        name='Email'
                        ref={(nuemail) => (this.nuemail = nuemail)}
                        required
                      />
                    </div>
                  </Col>
                  <Col md='3' style={{ paddingRight: 0 }}>
                    <div className='form-group'>
                      <label>Password</label>
                      <i
                        id="PassWordI"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <input
                        placeholder='Example123!'
                        type='text'
                        minLength='8'
                        className='form-control'
                        name='password'
                        id='nupaswword'
                        value={this.state.password}
                        onChange={this.onChangeR}
                        required
                      />
                      <UncontrolledTooltip
                        placement='right'
                        target='PassWordI'
                      >
                        Numbers and letters, signs, capital letters: minimum 8
                        characters (Example123!).
                      </UncontrolledTooltip>
                    </div>
                  </Col>
                  <Col md='3' style={{ alignSelf: "self-end" }}>
                    <div className='form-group' style={{ paddingTop: '8px' }}>
                      <Button
                        color='light'
                        className='px-2'
                        onClick={this.generatePassword}
                      >
                        Generate Password
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <Row className='justify-content-center'>
                <Col mb='4' colSpan='3' className='text-center'>
                  <label
                    className='error'
                    id='error'
                    style={{ display: 'none' }}
                  >
                    Wrong password format
                  </label>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                type='submit'
                className='px-4 buttons-royal text-white'
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>
              {this.props.isLoading ? (
                <img
                  alt='loading'
                  style={{
                    width: '140px',
                    position: 'absolute',
                    marginTop: '0px',
                    right: '40%',
                  }}
                  src='../../assets/img/icons/loading2.gif'
                />
              ) : (
                <div></div>
              )}
              <Button
                type='button'
                onClick={this.close}
                className='px-4 buttons-royal text-white'
              >
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(NewUser);
