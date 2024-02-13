import React from 'react';
import ReactDOM from 'react-dom';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import {
  Button,
  Row,
  Form,
  Col,
  UncontrolledCollapse,
  Label,
  Alert,
} from 'reactstrap';
import dateConvertTables from './../../../services/dateConvertTables';

const DriverMeetsMinReq = (driver, meetsMinReq, isDisqualified) => {
  let content;
  if (meetsMinReq && !isDisqualified) {
    content = (
      <Alert color='success'>
        <Row className='pdfAlert'>
          <Col md='10' className='pdfAlertTextColumn'>
            <Row>
              <Col>
                <b>
                  {driver + ' meets minimum requirements for safe driving'}{' '}
                </b>
              </Col>
            </Row>
            <Row>
              <Col>Passed</Col>
            </Row>
          </Col>
          <Col md='2' className='pdfAlertIconColumn'>
            <div className='iconImgContainer'>
              <img
                className='imgFile'
                src='assets/icons/icons8-ok.svg'
                crossOrigin='anonymous'
              ></img>
            </div>
          </Col>
        </Row>
      </Alert>
    );
  } else {
    content = (
      <Alert color='danger'>
        <Row className='pdfAlert'>
          <Col md='10' className='pdfAlertTextColumn'>
            <Row>
              <Col>
                <b>
                  {driver +
                    ' Is disqualified to drive a motor vehicle pursuant to Section 391.15'}
                </b>
              </Col>
            </Row>
            <Row>
              <Col>Not Passed</Col>
            </Row>
          </Col>
          <Col md='2' className='pdfAlertIconColumn'>
            <div className='iconImgContainer'>
              <img
                className='imgFile'
                src='assets/icons/icons8-info.svg'
                crossOrigin='anonymous'
              ></img>
            </div>
          </Col>
        </Row>
      </Alert>
    );
  }
  return content;
};

class PdfRD extends React.Component {
  pdfExportComponent;

  constructor(props) {
    super(props);
    this.exportPDFWithMethod = this.exportPDFWithMethod.bind(this);
  }

  render() {
    return (
      <div>
        <div className='example-config'>
          <Row>
            <Col md='12'>
              <Button
                color='success'
                id={'toggler' + this.props.info.Id}
                className='btn btn-block'
              >
                Preview
              </Button>
            </Col>
          </Row>
        </div>
        <UncontrolledCollapse toggler={'toggler' + this.props.info.Id}>
          <Row style={{ marginTop: '10px' }}>
            <Col md='12'>
              <Button
                color='success'
                className='btn btn-block'
                onClick={this.exportPDFWithMethod}
              >
                Download
              </Button>
            </Col>
          </Row>

          <PDFExport
            ref={(component) => (this.pdfExportComponent = component)}
            paperSize='A4'
          >
            <Form
              className='contact100-form validate-form reportForm'
              id={this.props.index}
              style={{ display: 'block' }}
            >
              <Row>
                <Col md='6'>
                  <div className='imgContainer'>
                    <img
                      className='imgFile'
                      src={'/assets/img/Images/BluAgent-Logo.png'}
                      ref={(img) => (this.img = img)}
                      crossOrigin='anonymous'
                      alt='logo'
                    />
                  </div>
                </Col>
              </Row>
              <Row className='header'>
                <Col md='12'>ANNUAL REVIEW OF DRIVING RECORD 49 CFR 391.25</Col>
              </Row>
              <Row className='infoHeader'>
                <Col md='6'>{this.props.info.MotorCarrier}</Col>
                <Col md='6'>{this.props.info.CompanyAddress}</Col>
              </Row>
              <Row className='infoHeader'>
                <Col md='6'>{this.props.info.CompanyPhone}</Col>
                <Col md='6'>{this.props.info.CompanyEmail}</Col>
              </Row>
              <Row className='header2'>
                <Col md='12'>Driver Information</Col>
              </Row>
              <Row>
                <Col md='6'>
                  <Row>
                    <Col md='6' className='reportLabel'>
                      <Label>Name</Label>
                    </Col>
                    <Col md='6' className='reportLabel'>
                      {this.props.driver.Name +
                        ' ' +
                        this.props.driver.LastName}
                    </Col>
                  </Row>
                  <Row>
                    <Col md='6' className='reportLabel'>
                      <Label>Date of Birth</Label>
                    </Col>
                    <Col md='6' className='reportLabel'>
                      {dateConvertTables(this.props.driver.Birthdate)}
                    </Col>
                  </Row>
                  <Row>
                    <Col md='6' className='reportLabel'>
                      <Label>Driver License</Label>
                    </Col>
                    <Col md='6' className='reportLabel'>
                      {this.props.driver.License}
                    </Col>
                  </Row>
                  <Row>
                    <Col md='6' className='reportLabel'>
                      <Label className='reportLabel'>Phone Number</Label>
                    </Col>
                    <Col md='6' className='reportLabel'>
                      {this.props.driver.PhoneNumber}
                    </Col>
                  </Row>
                  <Row>
                    <Col md='6' className='reportLabel'>
                      <Label className='reportLabel'>Date of Hire</Label>
                    </Col>
                    <Col md='6' className='reportLabel'>
                      {dateConvertTables(this.props.driver.HiringDate)}
                    </Col>
                  </Row>
                </Col>
                <Col md='6'>
                  <img
                    className='imgFile'
                    src={`${this.props.driver.DriverLicenseFile}`}
                    ref={(img) => (this.imgLicense = img)}
                    onError={() => {
                      this.imgLicense.src = 'assets/img/Images/no-image.png';
                      this.imgLicense.className = 'imgFile';
                    }}
                    crossOrigin='anonymous'
                  />
                </Col>
              </Row>
              <Row className='header2'>
                <Col md='12'>Authorization</Col>
              </Row>
              <Row>
                <Col md='12' className='reportLabel'>
                  <Label className='reportLabel'>
                    I have reviewed the driving of the above named driver with
                    49 CFR 391.25 and find that
                  </Label>
                </Col>
              </Row>
              {DriverMeetsMinReq(
                this.props.driver.Name + ' ' + this.props.driver.LastName,
                this.props.info.QuestionA,
                this.props.info.QuestionB
              )}
              <Row className='header2'>
                <Col md='12'>Comments</Col>
              </Row>
              <Row>
                <Col md='12' className='reportLabel'>
                  No Comments
                </Col>
              </Row>
              <Row className='header2'>
                <Col md='12'>Completed by</Col>
              </Row>
              <Row>
                <Col md='6' className='reportLabel'>
                  <Label>Name</Label>
                </Col>
                <Col md='6' className='reportLabel'>
                  {this.props.info.ReviewedBy}
                </Col>
              </Row>
              <Row>
                <Col md='6' className='reportLabel'>
                  <Label>Date of Review</Label>
                </Col>
                <Col md='6' className='reportLabel'>
                  {this.props.info.DateSignature}
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  <div>
                    <img
                      className='imgFile'
                      src={`${this.props.info.ReviewedBySignature}`}
                      ref={(img) => (this.imgReviewedBySignature = img)}
                      onError={() => {
                        this.imgReviewedBySignature.src =
                          'assets/img/Images/NoSignature2.png';
                        this.imgReviewedBySignature.className = 'imgFile';
                      }}
                      crossOrigin='anonymous'
                      alt='signature'
                    />
                  </div>
                </Col>
              </Row>
            </Form>
          </PDFExport>
        </UncontrolledCollapse>
      </div>
    );
  }

  exportPDFWithMethod = () => {
    savePDF(ReactDOM.findDOMNode(this.pdfExportComponent), { paperSize: 'A4' });
  };
  exportPDFWithComponent = () => {
    // var p = document.getElementById(this.props.index);
    // p.style = "display:block";
    // this.pdfExportComponent.save();
    // p.style = "display:none";
  };
}

export default PdfRD;
