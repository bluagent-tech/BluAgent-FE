import React, { Fragment } from 'react';
import { Row, Col, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from '../../../components/DatePicker';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

export default class Example extends React.Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <FormGroup>
              <Label>Vehicle Type</Label>
              <Input type='select' />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Vehicle Number</Label>
              <Input type='select' />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Inspection Type</Label>
              <Input type='select' />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Odometer</Label>
              <Input />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Tire Size</Label>
              <Input type='select' />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Inspector Name</Label>
              <Input />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label>Inspection Date</Label>
            <DatePicker />
          </Col>
          <Col>
            <a
              style={{ width: '100%', marginTop: '2.3em' }}
              id='btnDownload'
              className='btn buttons-royal text-white px-4 '
              href='/assets/maintenancePdf/ANNUAL_INSPECTION.pdf'
              download
            >
              Download Vehicle Inspection Template
            </a>
          </Col>
        </Row>
        <hr />
        <h3>Document and Photos</h3>
        <Row>
          <Col>
            <FilePond />
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <h3>
              <Label htmlFor='text-input'>Inspector Qualifications</Label>
            </h3>
          </Col>
        </Row>
        <hr />
        <Row style={{ marginBottom: '10px' }}>
          <Col md='12'>
            <label>
              This inspector meets the qualifications in section 396.19{' '}
            </label>
            <input
              type='radio'
              value='false'
              name='inspectorQualifications'
              style={{ marginLeft: '10px' }}
              required
            />
          </Col>
        </Row>
        <button
          id='btnCancel'
          type='button'
          className='btn buttons-royal text-white px-4 float-right'
          onClick={this.onClose}
        >
          Cancel
        </button>
        <button
          id='btnSave'
          type='submit'
          className='btn buttons-royal text-white px-4 float-right mr-2'
        >
          Save & Close
        </button>
      </Fragment>
    );
  }
}
