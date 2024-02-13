import React from "react";
import ReactDOM from "react-dom";
import {PDFExport, savePDF} from "@progress/kendo-react-pdf";
import dateConvertTables from "./../../../services/dateConvertTables";
import {Button, Row, Form, Col, Label, UncontrolledCollapse} from "reactstrap";

import "./../../../scss/pdf.scss";

//CERTIFICATION OF VIOLATIONS PDF FORM
const Violations = (violationsList) =>
  violationsList.map((violation) => {
    return (
      <div>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>Date</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {dateConvertTables(violation.ViolationDate)}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>Location</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {violation.Location}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>Offense</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {violation.Offense}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="reportLabel">
            <Label>Type of Vehicle Operated</Label>
          </Col>
          <Col md="6" className="reportLabel">
            {violation.TypeVehicleOperated}
          </Col>
        </Row>
        <hr />
      </div>
    );
  });
class PdfCV extends React.Component {
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
              id={this.props.index}
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
                <Col md="12">Drivers Certification of Violations 391.27</Col>
              </Row>
              <Row className="infoHeader">
                <Col md="12">{this.props.company.LegalName}</Col>
              </Row>
              <Row className="infoHeader">
                <Col md="12">{this.props.company.PhysicalAddress}</Col>
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
                      {this.props.driver.Name} {this.props.driver.LastName}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Date of Birth</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {dateConvertTables(this.props.driver.Birthdate)}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Driver License</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {this.props.driver.License}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label className="reportLabel">Phone Number</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {this.props.driver.PhoneNumber}
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <img
                    className="imgFile"
                    src={`${this.props.info[0].DriverLicenseFile}`}
                    ref={(img) => (this.imgLicense = img)}
                    onError={() => {
                      this.imgLicense.src = "assets/img/Images/no-image.png";
                      this.imgLicense.className = "imgFile";
                    }}
                    crossOrigin="anonymous"
                    alt="signature"
                  />
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Certification</Col>
              </Row>
              <Row>
                <Col md="12" className="reportLabel">
                  <Label>
                    I certify that the following is a true and complete list of
                    traffic violations (other than parking violations) for which
                    I have been convicted or forfeited bond or collateral during
                    the past 12 months.
                  </Label>
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Violations</Col>
              </Row>
              <div>{Violations(this.props.info)}</div>
              <Row>
                <Col md="6" className="reportLabel">
                  <img
                    className="imgFile"
                    src={`${this.props.info[0].DriverSignature}`}
                    ref={(img) => (this.imgSignature = img)}
                    onError={() => {
                      this.imgSignature.src =
                        "assets/img/Images/NoSignature2.png";
                      this.imgSignature.className = "imgFile";
                    }}
                    crossOrigin="anonymous"
                    alt="signature"
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Driver Signature</Label>
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

export default PdfCV;
