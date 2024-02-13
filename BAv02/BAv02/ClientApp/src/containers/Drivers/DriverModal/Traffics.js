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

class Traffics extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var t = new FormData(e.target);
    t.append('IdDriver', this.props.id);
    t.append('Id', this.props.trafficC.Id);
    this.props.submit(t);
  }

  render() {
    return (
      <div>
        <div>
          <div className='pull-left' style={{ marginTop: '8px' }}>
            <h6 className='mob-tit'>
              <strong>TRAFFIC CONVICTIONS AND FORFEITURES FOR THE PAST 3 YEARS</strong>
            </h6>
          </div>
          <div className='pull-right'>
            <button
            style={{width:"350px"}}
              type='button'
              onClick={this.props.toggle}
              className='btn btn-light btn-min-width mr-1 mb-1 mob-but'
            >
              ADD TRAFFIC CONVICTION
            </button>
          </div>
        </div>
        <Modal isOpen={this.props.modal} className={'modal-lg'}>
          <ModalHeader toggle={this.props.toggle}>
            TRAFFIC CONVICTIONS AND FORFEITURES
          </ModalHeader>
          <Form onSubmit={this.handleSubmit} name='formTC'>
            <ModalBody>
              <FormGroup row>
                <Col>
                  <Label htmlFor='text-input'>Locations</Label>
                  <input
                    type='text'
                    defaultValue={this.props.trafficC.Locations}
                    className='form-control'
                    id='Locations'
                    name='Locations'
                    maxLength='200'
                    required
                  />
                </Col>
                <Col>
                  <DatePicker
                    id='DateC'
                    name='ConvictionDate'
                    labelText='Date'
                    value={dateConvertTables(
                      this.props.trafficC.ConvictionDate
                    )}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label htmlFor='text-input'>Charge</Label>
                  <input
                    type='text'
                    defaultValue={this.props.trafficC.Change}
                    className='form-control'
                    id='Change'
                    name='Change'
                    maxLength='200'
                    required
                  />
                </Col>
                <Col>
                  <Label htmlFor='text-input'>Penalty</Label>
                  <input
                    type='text'
                    defaultValue={this.props.trafficC.Penalty}
                    className='form-control'
                    id='Penalty'
                    name='Penalty'
                    maxLength='200'
                    required
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button className='buttons-royal text-white px-5' type='submit'>
                Save
              </Button>
              <Button
                className='buttons-royal text-white px-5'
                onClick={this.props.toggle}
              >
                Close
              </Button>
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

export default Traffics;
