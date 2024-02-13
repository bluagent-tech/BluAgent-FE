import React from 'react';
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
} from 'reactstrap';
import PropTypes from 'prop-types';
import Select from '../../../components/Select';
import dateConvertTables from './../../../services/dateConvertTables';
import NumberFormat from 'react-number-format';
import DatePicker from '../../../components/DatePicker';
import moment from 'moment';

//ADDRESS FOR THE PAST 3 YEARS

class Address extends React.Component {
  constructor(props) {
    super(props);

    this.state = { Country: '', State: '', IdCity: '', CurrentAddress: false };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOpenClose = this.onOpenClose.bind(this);
  }

  timeCalculation() {
    const dateOf = moment(
      document.getElementById('DateOf').value,
      'MM/yyyy'
    ).format('MM/yyyy');
    let dateTo = moment(
      document.getElementById('DateTo').value,
      'MM/yyyy'
    ).format('MM/yyyy');
    const currentDate = moment().format('MM/yyyy');

    dateTo = this.state.CurrentAddress ? currentDate : dateTo;

    var HLong = '';

    if (dateOf !== undefined && dateTo !== undefined) {
      //date of
      var dateO = dateOf.split('/');
      var dateOMonth = dateO[0];
      var dateOYear = dateO[1];
      //date to
      var dateT = dateTo.split('/');
      var dateTMonth = dateT[0];
      var dateTYear = dateT[1];

      // year
      var years = dateTYear - dateOYear;
      if (dateOMonth > dateTMonth) {
        years--;
      }
      // month
      var months = 0;
      if (dateTMonth < dateOMonth) months = 12 - (dateOMonth - dateTMonth);
      if (dateTMonth > dateOMonth) months = dateTMonth - dateOMonth;

      if (years > 0 && months > 0)
        HLong = years + ' years ' + months + ' months';
      else if (years > 0) HLong = years + ' years';
      else if (months > 0) HLong = months + ' months';
    }

    return HLong;
    //this.setState({ Hlong: HLong });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === 'Country') {
      this.props.getStates(value);
      if (value === '') {
        this.setState({ State: '', IdCity: '' });
      }
    }
    if (name === 'State') {
      this.props.getCities(value);
      if (value === '') {
        this.setState({ IdCity: '' });
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var address = new FormData(e.target);
    address.append('IdDriver', this.props.id);
    address.append('Id', this.props.address.Id);
    address.append('HowLong', this.timeCalculation());

    this.props.submit(address);
  }

  onOpenClose() {
    this.props.toggle(null);
    this.setState({
      Country: '',
      State: '',
      IdCity: '',
      CurrentAddress: this.props.address.CurrentAddress,
      Hlong: '',
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.address.CurrentAddress !== this.props.address.CurrentAddress
    ) {
      this.setState({
        CurrentAddress: this.props.address.CurrentAddress,
      });
    }
  }

  onCheckChange = (e) => {
    const isCurrentAddress = !this.state.CurrentAddress;

    this.setState({ CurrentAddress: isCurrentAddress });

    document.getElementById('divDateTo').style = isCurrentAddress
      ? 'display:none'
      : 'display:block';
  };

  getValueDateFrom = () => {
    let date = '';

    if (this.props.address.DateOf) {
      date = moment(dateConvertTables(this.props.address.DateOf)).format(
        'MM/yyyy'
      );
    }

    return date;
  };

  getValueDateTo = () => {
    let date = '';

    if (this.props.address.DateTo) {
      date =
        this.props.address.CurrentAddress === false
          ? moment(dateConvertTables(this.props.address.DateTo)).format(
              'MM/yyyy'
            )
          : moment(dateConvertTables(this.props.address.CurrentDate)).format(
              'MM/yyyy'
            );
    }

    return date;
  };

  render() {
    return (
      <div>
        <div>
          <div className='pull-left' style={{ marginTop: '8px' }}>
            <h6 className='mob-tit'><strong>ADDRESS FOR THE PAST THREE YEARS</strong></h6>
          </div>
          <div className='pull-right'>
            <button
              style={{width:"350px"}}
              type='button'
              onClick={this.onOpenClose}
              className='btn btn-light btn-min-width mr-1 mb-1 mob-but'
            >
              ADD ADDRESS
            </button>
          </div>
        </div>
        <Modal isOpen={this.props.modal} className={'modal-lg '}>
          <ModalHeader name='modal1' toggle={this.onOpenClose}>
            ADDRESS FOR PAST THREE YEARS
          </ModalHeader>
          <Form onSubmit={this.handleSubmit} name='FormNewA'>
            <ModalBody>
              <FormGroup row>
                <Col md='6'>
                  <Label htmlFor='text-input'>Street Address</Label>
                  <Input
                    type='text'
                    id='Street'
                    defaultValue={this.props.address.Street}
                    name='Street'
                    maxLength='200'
                    required
                  />
                </Col>
                <Col md='6'>
                  <Label htmlFor='text-input'>Country</Label>
                  <Select
                    id='country'
                    name='Country'
                    options={this.props.Countries}
                    onChange={this.onChange}
                    value={
                      this.state.Country !== ''
                        ? this.state.Country
                        : this.props.address.IdCountry
                    }
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md='6'>
                  <Label htmlFor='text-input'>State</Label>
                  <Select
                    id='State'
                    name='State'
                    options={this.props.States}
                    onChange={this.onChange}
                    value={
                      this.state.State !== ''
                        ? this.state.State
                        : this.props.address.IdState
                    }
                    required
                  />
                </Col>
                <Col md='6'>
                  <Label htmlFor='text-input'>City</Label>
                  <Select
                    id='IdCity'
                    name='IdCity'
                    options={this.props.Cities}
                    onChange={this.onChange}
                    value={
                      this.state.IdCity !== ''
                        ? this.state.IdCity
                        : this.props.address.IdCity
                    }
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md='6'>
                  <Label htmlFor='text-input'>Zip Code</Label>
                  <NumberFormat
                    format='#####'
                    value={this.props.address.ZipCode}
                    className='form-control'
                    name='ZipCode'
                    required
                  />
                </Col>
                <Col md='6'>
                  <label style={{ marginTop: '10%' }}>
                    <input
                      id='Present'
                      type='checkbox'
                      defaultChecked={this.props.address.CurrentAddress}
                      name='CurrentAddress'
                      value={this.state.CurrentAddress}
                      onChange={this.onCheckChange}
                    />{' '}
                    Current Address
                  </label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md='6'>
                  <DatePicker
                    id='DateOf'
                    name='DateOf'
                    labelText='From'
                    value={this.getValueDateFrom()}
                    monthPicker
                  />
                </Col>
                <Col id='divDateTo' md='6'>
                  <DatePicker
                    id='DateTo'
                    name='DateTo'
                    labelText='To'
                    ref={(ref) => (this.dateTo = ref)}
                    value={this.getValueDateTo()}
                    required='false'
                    monthPicker
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' className='buttons-royal text-white px-5'>
                Save
              </Button>
              <Button
                type='button'
                className='buttons-royal text-white px-5'
                onClick={this.onOpenClose}
              >
                Close
              </Button>{' '}
              {this.props.isLoading ? (
                <img
                  style={{
                    width: '140px',
                    position: 'absolute',
                    marginTop: '0px',
                    right: '40%',
                  }}
                  src='../../assets/img/icons/loading2.gif'
                  alt='loading'
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

Address.propTypes = {
  getCities: PropTypes.func,
  getStates: PropTypes.func,
  reload: PropTypes.func,
  submit: PropTypes.func,
  toggle: PropTypes.func,
};

export default Address;
