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
  Form,
} from 'reactstrap';
import dateConvertTables from './../../../services/dateConvertTables';
import DatePicker from '../../../components/DatePicker';
import Select from '../../../components/Select';
import SelectDriverProfile from '../../../components/selectDriverProfile';

//DRIVING EXPERIENCE

class DrivingExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeE: 0, DateFrom: '', DateTo: '', typeEquipment: 0,
      TotalMilesDriven: "",
      optionsTotalMiles: [
        { Id: "0-50", Name: "0-50" },
        { Id: "50-500", Name: "50-500" },
        { Id: "500-5,000", Name: "500-5,000" },
        { Id: "5,000-15,000", Name: "5,000-15,000" },
        { Id: "15,000-50,000", Name: "15,000-50,000" },
        { Id: "50,000-100,000", Name: "50,000-100,000" },
        { Id: "100,000-500,000", Name: "100,000-500,000" },
        { Id: "500,000-1,000,000", Name: "500,000-1,000,000" },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeTypeC = this.onChangeTypeC.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var dex = new FormData(e.target);
    dex.append('IdDriver', this.props.id);
    dex.append('IdDexperience', this.props.drivingEx.IdDexperience);
    this.props.submit(dex);
  }

  onChangeTypeC(e) {
    e.preventDefault();
    var v = e.target.selectedIndex;
    this.setState({ typeE: v });
    var t = (document.getElementById('TypeEquipment').selectedIndex = 0);
    this.setState({ typeEquipment: t });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    var v = [
      'Truck ',
      'Tow Truck',
      'Semi-Trailer Truck',
      'Box Truck',
      'Flatbed Truck',
      'Car',
      'Van',
      'Bus',
      'Pick-Up',
      'Dump Truck',
    ];
    var t = [
      'Flat Bed 53',
      'Flat Bed 48',
      'Expandable Flat Bed',
      'Drop Deck',
      'Expandable Drop Deck',
      'Auto Hauler',
      'Dry Freight 53',
      'Dry Freight 48',
      'Low Boy',
      'Tank Trailer',
      'Tank Trailer MC - 306',
      'Tank Trailer MC - 307',
      'Tank Trailer MC - 312',
      'Tank Trailer MC - 331',
      'Tank Trailer MC - 338',
      'Refrigerated Dry Trailer',
      'Pole Trailer',
      'Step Deck Trailer',
      'Conestoga Trailer',
      'Container 53',
      'Container 48',
    ];

    let tl = t.map((option, index) => {
      return (
        <option value={option} key={index}>
          {option}
        </option>
      );
    });
    let vl = v.map((option, index) => {
      return (
        <option value={option} key={index}>
          {option}
        </option>
      );
    });

    return (
      <div>
        <div>
          <div className='pull-left' style={{ marginTop: '8px' }}>
            <h6 className='mob-tit mob-letter-spacing-3'><strong>DRIVING EXPERIENCE</strong></h6>
          </div>
          <div className='pull-right'>
            <button
              style={{ width: "350px" }}
              type='button'
              onClick={this.props.toggle}
              className='btn btn-light btn-min-width mr-1 mb-1 mob-but'
            >
              ADD DRIVING EXPERIENCE
            </button>
          </div>
        </div>
        <Modal isOpen={this.props.modal} className={'modal-lg '}>
          <ModalHeader toggle={this.props.toggle}>
            DRIVING EXPERIENCE
          </ModalHeader>
          <Form onSubmit={this.handleSubmit} name='formDE'>
            <ModalBody>
              <FormGroup row>
                <Col>
                  <Label htmlFor='text-input'>Class of Equipment</Label>
                  <select
                    id='classE'
                    name='ClassEquipment'
                    className='form-control'
                    defaultValue={this.props.drivingEx.ClassEquipment}
                    onChange={(e) => {
                      this.onChangeTypeC(e);
                    }}
                    required
                  >
                    <option value=''>select</option>
                    <option value='Trailer'>Trailer</option>
                    <option value='Vehicle'>Vehicle</option>
                  </select>
                </Col>
                <Col>
                  <Label htmlFor='text-input'>Type of Equipment</Label>
                  <select
                    id='TypeEquipment'
                    name='TypeEquipment'
                    className='form-control'
                    defaultValue={
                      this.props.typeE !== 0
                        ? this.props.drivingEx.TypeEquipment
                        : ''
                    }
                    required
                  >
                    <option value=''>select</option>
                    {this.state.typeE === 1 || this.props.typeE === 1
                      ? tl
                      : this.state.typeE === 2 || this.props.typeE === 2
                        ? vl
                        : ''}
                  </select>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <DatePicker
                    labelText='From'
                    monthPicker
                    id='DateFrom'
                    name='DateFrom'
                    value={dateConvertTables(
                      this.props.drivingEx.DateFrom,
                      true
                    )}
                  />
                </Col>
                <Col>
                  <DatePicker
                    labelText='To'
                    monthPicker
                    id='DateTo'
                    name='DateTo'
                    value={dateConvertTables(this.props.drivingEx.DateTo, true)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md='4'>
                  <Label htmlFor='text-input'>Approx. Total Miles Driven</Label>
                  <SelectDriverProfile
                    name="TotalMilesDriven"
                    id="Miles"
                    options={this.state.optionsTotalMiles}
                    value={this.state.TotalMilesDriven}
                    onChange={this.onChange}
                    defaultValue={this.props.drivingEx.TotalMilesDriven}
                    previousDate={this.props.drivingEx.TotalMilesDriven}
                  />
                  {/* <input
                    type='text'
                    defaultValue={this.props.drivingEx.TotalMilesDriven}
                    className='form-control'
                    id='Miles'
                    name='TotalMilesDriven'
                    pattern='^[0-9]*$'
                    title='Only numbers are allowed'
                    maxLength='200'
                  /> */}
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type='submit'
                color='primary'
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>
              <Button color='danger' onClick={this.props.toggle}>
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
                <div />
              )}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default DrivingExperience;
