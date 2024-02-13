import React from 'react';
import ReactDOM from 'react-dom';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import {
  Button,
  Col,
  Row,
  Form,
  UncontrolledCollapse,
  Label,
  Alert,
} from 'reactstrap';
import dateConvertTables from './../../../services/dateConvertTables';

//LETTER OF INQUIRY PDF FORM

const ResultAlert = (info) => {
  let content;

  if (
    !info.Question1 &&
    !info.Question2 &&
    !info.Question3 &&
    !info.Question4 &&
    !info.Question5 &&
    !info.Section382
  ) {
    content = (
      <Alert color='success'>
        <Row className='pdfAlert'>
          <Col md='10' className='pdfAlertTextColumn'>
            <Row>
              <Col>
                <b>Driver overall Drug & Alcohol History is Satisfactory</b>
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
                alt='ok'
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
                <b>Driver overall Drug & Alcohol History is Unsatisfactory</b>
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
                alt='info'
              ></img>
            </div>
          </Col>
        </Row>
      </Alert>
    );
  }

  return content;
};

class PdfLI extends React.Component {
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
            <Col md={12}>
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
                color={this.props.btnColor ? this.props.btnColor : 'success'}
                onClick={this.exportPDFWithMethod}
                className='btn btn-block'
              >
                {this.props.btnText ? this.props.btnText : 'Download'}
              </Button>
            </Col>
          </Row>

          <PDFExport
            ref={(component) => (this.pdfExportComponent = component)}
            paperSize='A4'
          >
            <Form
              className='contact100-form validate-form reportForm'
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
                <Col md='12'>Safety Performance History Request</Col>
              </Row>
              <Row className='infoHeader'>
                <Col md='6'>{this.props.info.NewEmployerName}</Col>
                <Col md='6'>{this.props.info.NewEmployerAddress}</Col>
              </Row>
              <Row className='infoHeader'>
                <Col md='6'>{this.props.info.NewEmployerPhone}</Col>
                <Col md='6'>{this.props.info.NewEmployerEmail}</Col>
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
                    alt='license'
                  />
                </Col>
              </Row>
              <Row className='header2'>
                <Col md='12'>Authorization</Col>
              </Row>
              <Row>
                <Col md='12' className='reportLabel'>
                  <Label>
                    I,{' '}
                    {this.props.driver.Name + '  ' + this.props.driver.LastName}
                    {'  '}
                    {this.props.driver.License}
                    {'  '}
                    {dateConvertTables(this.props.driver.Birthdate) +
                      ', hereby authorize, ' +
                      this.props.info.PreviousEmployerName}
                    {this.props.info.PreviousEmployerAddress +
                      ' ' +
                      this.props.info.PreviousEmployerEmail +
                      ', ' +
                      this.props.info.PreviousEmployerPhone +
                      ', to release and forward the information requested concerning my Alcohol and Controlled Substances Testing Records within the Previous 3 years from' +
                      dateConvertTables(this.props.info.DateMailed)}
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md='12' className='reportLabel'>
                  <Label>
                    In compliance with part 40.25(g) and 391.23(h), release of
                    this information must be made in written form that ensures,
                    such fax, email, telephone or letter.
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md='6' className='reportLabel'>
                  <Label>Driver Signature</Label>
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  <div>
                    <img
                      className='imgFile'
                      src={`${this.props.driver.DriverSignature}`}
                      ref={(img) => (this.imgSignature = img)}
                      onError={() => {
                        this.imgSignature.src =
                          'assets/img/Images/NoSignature2.png';
                        this.imgSignature.className = 'imgFile';
                      }}
                      crossOrigin='anonymous'
                      alt='signature'
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md='6' className='reportLabel'>
                  <Label>{this.props.info.DateSignature}</Label>
                </Col>
              </Row>
              <Row className='header2'>
                <Col md='12'>Previous Employer Information</Col>
              </Row>
              <Row>
                <Col md='4' className='reportLabel'>
                  <Label>Employer name</Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.PreviousEmployerName}
                </Col>
              </Row>
              <Row>
                <Col md='4' className='reportLabel'>
                  <Label>Address</Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.PreviousEmployerAddress}
                </Col>
              </Row>
              <Row>
                <Col md='4' className='reportLabel'>
                  <Label>Phone Number</Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.PreviousEmployerPhone}
                </Col>
              </Row>
              <Row>
                <Col md='4' className='reportLabel'>
                  <Label>Email</Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.PreviousEmployerEmail}
                </Col>
              </Row>
              <Row>
                <Col md='4' className='reportLabel'>
                  <Label>Position Held</Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.PositionHeld}
                </Col>
              </Row>
              <Row>
                <Col md='4' className='reportLabel'>
                  <Label>
                    Driver was subject to Department of Transportation Testing
                    requirements
                  </Label>
                </Col>
                <Col md='8' className='reportLabel'>
                  {this.props.info.YearsActive}
                </Col>
              </Row>
              <Row className='header2'>
                <Col md='12'>Employment History</Col>
              </Row>
              <Row>
                <Col md='6' className='reportLabel'>
                  <Label>
                    Driver was subject to Department of Transportation Testing
                    requirements
                  </Label>
                </Col>
                <Col md='6' className='reportLabel'>
                  {this.props.info.YearsActive}
                </Col>
              </Row>
              <Row>
                <Col md='8' className='reportLabel'>
                  <Label>
                    Has this person had an alcohol test with result of 0.04 or
                    higher alcohol concentration?
                  </Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.Question1 ? 'Yes' : 'No'}
                </Col>
              </Row>
              <Row>
                <Col md='8' className='reportLabel'>
                  <Label>
                    Has this person tested positive or adulterated or
                    substituted a test specimen for controlled substances?
                  </Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.Question2 ? 'Yes' : 'No'}
                </Col>
              </Row>
              <Row>
                <Col md='8' className='reportLabel'>
                  <Label>
                    Has this person refused to submit to a post-accident,
                    random, reasonable suspicion or follow-up alcohol or
                    controlled substance test?
                  </Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.Question3 ? 'Yes' : 'No'}
                </Col>
              </Row>
              <Row>
                <Col md='8' className='reportLabel'>
                  <Label>
                    Has this person commited other violations of Subpart B of
                    Part 382 or Part 40?
                  </Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.Section382 ? 'Yes' : 'No'}
                </Col>
              </Row>
              <Row>
                <Col md='8' className='reportLabel'>
                  <Label>
                    If this person has violated a DOT drug and alcohol
                    regulation, did this person complete a SAP-prescribed
                    rehabilitation, program in yor employ, including
                    return-to-duty and follow-up tests? If yes, please send
                    documentation back with this form
                  </Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.Question4 ? 'Yes' : 'No'}
                </Col>
              </Row>
              <Row>
                <Col md='8' className='reportLabel'>
                  <Label>
                    For a driver who successfully completed a SAP's
                    rehabilitation referral and remained in your employ, did
                    this driver subsequently have an alcohol test result of 0.04
                    or greater, a verified positive drug test, or refuse to be
                    tested?
                  </Label>
                </Col>
                <Col md='4' className='reportLabel'>
                  {this.props.info.Question5 ? 'Yes' : 'No'}
                </Col>
              </Row>
              <Row className='header2'>
                <Col md='12'>Comments</Col>
              </Row>
              <Row>
                <Col md='12' className='reportLabel'>
                  {this.props.info.Comment !== null
                    ? this.props.info.Comment
                    : 'No Comments'}
                </Col>
              </Row>
              {ResultAlert(this.props.info)}
              <Row className='header2'>
                <Col md='12'>Completed by</Col>
              </Row>
              <Row>
                <Col md='6' className='reportLabel'>
                  <Label>Name</Label>
                </Col>
                <Col md='6' className='reportLabel'>
                  {this.props.info.CompletedByName}
                </Col>
              </Row>
              <Row>
                <Col md='6' className='reportLabel'>
                  <Label>Title</Label>
                </Col>
                <Col md='6' className='reportLabel'>
                  {this.props.info.CompletedByTitle
                    ? 'Prospective Employee Supervisor'
                    : 'Previous Employer Supervisor'}
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
                      src={`${this.props.info.CompletedBySignatureFile}`}
                      ref={(img) => (this.imgCompletedBySignature = img)}
                      onError={() => {
                        this.imgCompletedBySignature.src =
                          'assets/img/Images/NoSignature2.png';
                        this.imgCompletedBySignature.className = 'imgFile';
                      }}
                      crossOrigin='anonymous'
                      alt='signature'
                    />
                  </div>
                </Col>
              </Row>
              {/* CompletedBySignatureFile */}
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
    this.pdfExportComponent.save();
  };
}

export default PdfLI;
