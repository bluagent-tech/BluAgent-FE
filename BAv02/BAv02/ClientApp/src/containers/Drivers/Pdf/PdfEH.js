import React from "react";
import ReactDOM from "react-dom";
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
import {Button, Col, Row, Label, Form, UncontrolledCollapse, Alert} from "reactstrap";
import dateConvertTables from "./../../../services/dateConvertTables";
import "./../../../scss/pdf.scss";
const idCompany = localStorage['idCompany'];
const AccidentList = (accidentList) =>
  accidentList.map((accident) => {
    return (
      <div key={accident.Id}>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>Date</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {dateConvertTables(accident.AccidentDate)}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>Location</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {accident.Address}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>Injuries</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {accident.Injuries}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>Fatalities</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {accident.Fatalities}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>HazMat Spills</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {accident.HM === 0 ? "Yes" : "No"}
          </Col>
        </Row>
        <hr />
      </div>
    );
  });

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

class PdfEH extends React.Component {
  pdfExportComponent;

  constructor(props) {
    super(props);
    this.exportPDFWithMethod = this.exportPDFWithMethod.bind(this);
  }

  render() {
    return (
      <div>
        <div className="example-config">
          <Row>
            <Col md="12">
              <Button
                id={"toggler" + this.props.index}
                color="success"
                className="btn btn-block"
              >
                Preview
              </Button>
            </Col>
          </Row>
        </div>

        <UncontrolledCollapse toggler={"toggler" + this.props.index}>
          <Row style={{marginTop: "10px"}}>
            <Col md="12">
              <Button
                color="success"
                className="btn btn-block"
                onClick={this.exportPDFWithMethod}
              >
                Download
              </Button>
            </Col>
          </Row>
          <PDFExport
            ref={(component) => (this.pdfExportComponent = component)}
            paperSize="A4"
          >
            <Form
              className="contact100-form validate-form reportForm"
              style={{display: "block"}}
            >
              <Row>
                <Col md="6">
                  <div className="imgContainer">
                    <img
                      className="imgFile"
                      src={"/assets/img/Images/BluAgent-Logo.png"}
                      ref={(img) => (this.img = img)}
                      crossOrigin="anonymous"
                      alt="logo"
                    />
                  </div>
                </Col>
              </Row>
              <Row className="header">
                <Col md="12">Safety Performance History Request</Col>
              </Row>
              <Row className="infoHeader">
                <Col md="6">{this.props.info.NewEmployerName}</Col>
                <Col md="6">{this.props.info.NewEmployerAddress}</Col>
              </Row>
              <Row className="infoHeader">
                <Col md="6">{this.props.info.NewEmployerPhone}</Col>
                <Col md="6">{this.props.info.NewEmployerEmail}</Col>
              </Row>
              <Row className="header2">
                <Col md="12">Driver Information</Col>
              </Row>
              <Row>
                <Col md="6">
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Name</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {this.props.info.DriverName}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Date of Birth</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {dateConvertTables(this.props.info.DriverBirthday)}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Driver License</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {this.props.info.DriverLicense}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label className="reportLabel">Phone Number</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {this.props.info.DriverPhone}
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <img
                    className="imgFile"
                    src={`${this.props.info.DriverLicenseFile}`}
                    ref={(img) => (this.imgLicense = img)}
                    onError={() => {
                      this.imgLicense.src = "assets/img/Images/no-image.png";
                      this.imgLicense.className = "imgFile";
                    }}
                    crossOrigin="anonymous"
                  />
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Authorization</Col>
              </Row>
              <Row>
                <Col md="12" className="reportLabel">
                  <Label>
                    I, {this.props.info.DriverName}{" "}
                    {this.props.info.DriverLicense}{" "}
                    {dateConvertTables(this.props.info.DriverBirthday)}, hereby
                    authorize {this.props.info.PreviousEmployerName},{" "}
                    {this.props.info.PreviousEmployerAddress},{" "}
                    {this.props.info.PreviousEmployerEmail},{" "}
                    {this.props.info.PreviousEmployerPhone}, to release and
                    forward the information requested concerning my Alcohol and
                    Controlled Substances Testing Records within the Previous 3
                    years from {dateConvertTables(this.props.info.DateMailed)}.
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md="12" className="reportLabel">
                  <Label>
                    In compliance with part 40.25(g) and 391.23(h), release of
                    this information must be made in written form that ensures,
                    such fax, email, telephone or letter.
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Driver Signature</Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <img
                    className="imgFile"
                    src={`${this.props.info.DriverSignature}`}
                    ref={(img) => (this.imgSignature = img)}
                    onError={() => {
                      this.imgSignature.src = "assets/img/Images/NoSignature2.png";
                      this.imgSignature.className = "imgFile";
                    }}
                    crossOrigin="anonymous"
                    alt="signature"
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>{this.props.info.DateSignature}</Label>
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Previous Employer Information</Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Employer name</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.PreviousEmployerName}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Address</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.PreviousEmployerAddress}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Phone Number</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.PreviousEmployerPhone}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Email</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.PreviousEmployerEmail}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Position Held</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.PositionHeld}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Years at Job</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.YearsActive}
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Letter of Inquiry</Col>
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
                  {this.props.info.LIQuestion1 ? 'Yes' : 'No'}
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
                  {this.props.info.LIQuestion2 ? 'Yes' : 'No'}
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
                  {this.props.info.LIQuestion3 ? 'Yes' : 'No'}
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
                  {this.props.info.LIQuestion4 ? 'Yes' : 'No'}
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
                  {this.props.info.LIQuestion5 ? 'Yes' : 'No'}
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Employment History</Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>The applicant name above was employed by us:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Question1 === 0 ? "Yes" : "No"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Position Employed as:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Question2 === 0 ? "Driver" : "Mechanic"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Did applicant drive motor vehicles for you:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Question3 === 0 ? "Yes" : "No"}
                </Col>
              </Row>
              {/* <Row>
              <Col md="8" className="reportLabel">
                <Label>Vehicle type:</Label>
              </Col>
              <Col md="4" className="reportLabel"></Col>
            </Row> */}
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Reason for leaving your employ:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Question6 === 0
                    ? "Discharged"
                    : this.props.info.Question6 === 1
                    ? "Laid off"
                    : "Resigned"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>
                    Was the applicant a safe and efficient employee?
                  </Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Question4 === 0 ? "Yes" : "No"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>was the applicant's conduct satisfactory?</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Question7 === 0 ? "Yes" : "No"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>
                    Is the applicant competent for the position sought?
                  </Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Question8 === 0 ? "Yes" : "No"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>
                    Did the applicant drink any alcohol beverage while on duty?
                  </Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Question8 === 0 ? "Yes" : "No"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Quality of Work:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.QualityWork === 1
                    ? "Excellent"
                    : this.props.info.QualityWork === 2
                    ? "Good"
                    : "Bad"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Cooperation with others:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Cooperation === 1
                    ? "Excellent"
                    : this.props.info.Cooperation === 2
                    ? "Good"
                    : "Bad"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Safety Habits:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.SafetyHabits === 1
                    ? "Excellent"
                    : this.props.info.SafetyHabits === 2
                    ? "Good"
                    : "Bad"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Personal Habits:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.PersonalHabits === 1
                    ? "Excellent"
                    : this.props.info.PersonalHabits === 2
                    ? "Good"
                    : "Bad"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Driving Skills:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.DrivingSkill === 1
                    ? "Excellent"
                    : this.props.info.DrivingSkill === 2
                    ? "Good"
                    : "Bad"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Attitude:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.Attitude === 1
                    ? "Excellent"
                    : this.props.info.Attitude === 2
                    ? "Good"
                    : "Bad"}
                </Col>
              </Row>
              <Row>
                <Col md="8" className="reportLabel">
                  <Label>Remarks:</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.RemarkQuestion6}
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Accident History</Col>
              </Row>
              <div>{AccidentList(this.props.info.AccidentRecord)}</div>

              <Row className="header2">
                <Col md="12">Comments</Col>
              </Row>
              <Row>
                <Col md="12" className="reportLabel">
                  {this.props.info.Remarks !== null ? this.props.info.Remarks : 'No Comments'}
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
                      src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/EmployerSignatureHistory/${this.props.info.Id}/signature.png`}
                      ref={(img) => (this.Signature = img)}
                      onError={() => {
                        this.Signature.src =
                          'assets/img/Images/NoSignature2.png';
                        this.Signature.className = 'imgFile';
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
    savePDF(ReactDOM.findDOMNode(this.pdfExportComponent), {paperSize: "A4"});
  };
}

export default PdfEH;
