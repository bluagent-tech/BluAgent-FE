import React from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Button, Col, Row, Label, Form } from "reactstrap";
import "./../../../scss/pdf.scss";
import dateConvertTables from "./../../../services/dateConvertTables";
import Loading from "./../../../components/Loading";

const RandomsList = (list, type) =>

  list.map((driver) => {
    return (
      <div key={driver.IdDriver}>
        <Row>
          <Col md="5" className="reportLabel">
            <Label>
              {(driver.Name !== null ? driver.Name.toUpperCase() : "Manual Test") + " " + (driver.LastName !== null ? driver.LastName.toUpperCase() : "") }
            </Label>
          </Col>
          <Col md="2" className="reportLabel">
            <Label>{dateConvertTables(driver.DateNotified)}</Label>
          </Col>
          {/* <Col md="2" className="reportLabel">
            <Label>{driver.DateNotified ? "Yes" : "No"}</Label>
          </Col> */}
          {type === "drug" ? (
            <Col md="2" className="reportLabel">
              <Label>{driver.Type == "DrugTest" ? "Yes" : ""}</Label>
            </Col>
          ) : (
            <Col md="2" className="reportLabel">
              <Label>{driver.Type == "AlcoholTest" ? "Yes" : ""}</Label>
            </Col>
          )}
        </Row>
      </div>
    );
  });
class PdfRS extends React.Component {
  pdfExportComponent;

  constructor(props) {
    super(props);
    this.exportPDFWithComponent = this.exportPDFWithComponent.bind(this);
  }

  exportPDFWithComponent = () => {
    var p = document.getElementById(this.props.index);
    p.style = "display:block";
    this.pdfExportComponent.save();
    p.style = "display:none";
  };

  quarterValidation(q) {
    var date = new Date();
    var month = date.getMonth() + 1;
    if (q === "1" && month >= 1 && month <= 3) {
      return false;
    } else if (q === "2" && month >= 4 && month <= 6) {
      return false;
    } else if (q === "3" && month >= 7 && month <= 9) {
      return false;
    } else if (q === "4" && month >= 10 && month <= 12) {
      return false;
    } else {
      return true;
    }
  }

  getDateNotified = () => {
    if (this.props.randomDrivers.length > 0) {
      return dateConvertTables(this.props.randomDrivers[0].DateNotified);
    }
  };

  getDateYear = () => {
    if (this.props.randomDrivers.length > 0) {
      return this.props.randomDrivers[0].DateYear;
    }
  };

  getCompanyName = () => {
    if (this.props.randomDrivers.length > 0) {
      return this.props.randomDrivers[0].CompanyName;
    }
  };

  render() {
    return (
      <div>
        <div className="example-config">
          {this.props.randomDrivers !== undefined &&
          this.props.type !== undefined &&
          this.props.index !== undefined &&
          this.props.quarter !== undefined &&
          this.props.className !== undefined &&
          this.props.countListDriverCompany !== undefined &&
          this.props.percent !== undefined ? (
            <Button
              style={{ width: "-webkit-fill-available" }}
              color="secondary"
              onClick={this.exportPDFWithComponent}
            >
              Download PDF
            </Button>
          ) : (
            <Loading />
          )}
        </div>

        <PDFExport
          ref={(component) => (this.pdfExportComponent = component)}
          paperSize="A4"
        >
          <Form
            className="contact100-form validate-form reportForm"
            id={this.props.index}
            style={{ display: "none" }}
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
              <Col md="12">Company Random Selection Report</Col>
            </Row>
            <Row>
              <Col
                md="6"
                className="reportLabel"
                style={{ textAlign: "right" }}
              >
                <Label>
                  <b>Random Selection Run On:</b>{" "}
                </Label>
              </Col>
              <Col md="6" className="reportLabel" style={{ textAlign: "left" }}>
                <Label id="dateRun">{this.getDateNotified()}</Label>
              </Col>
            </Row>
            <Row>
              <Col md="8" className="reportLabel">
                <Row>
                  <Col md="6">
                    <Label>Random Pool Selection Period:</Label>
                  </Col>
                  <Col md="6">
                    <Label id="quarter">{this.props.quarter}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label>Pool Name:</Label>
                  </Col>
                  <Col md="6">
                    <Label>{"FMCSA " + this.getCompanyName()}</Label>
                  </Col>
                </Row>
              </Col>
              <Col md="4" className="reportLabel">
                <Row>
                  <Col md="12">
                    <Label>Random Selection Rates:</Label>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label>Drug:</Label>
                  </Col>
                  <Col md="6">
                    <Label>50%</Label>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Label>Alcohol:</Label>
                  </Col>
                  <Col md="6">
                    <Label>10%</Label>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="header2">
              <Col md="12">Important (For DOT regulated pools):</Col>
            </Row>
            <Row>
              <Col md="12" className="reportLabel">
                <Label>
                  A copy of this selection and a list of covered positions used
                  for this selection must be retained in your records and made
                  available in the event o f a DOT audit
                </Label>
              </Col>
            </Row>
            <Row className="header2">
              <Col md="12">Explanation</Col>
            </Row>
            <Row>
              <Col md="12" className="reportLabel">
                <Label>
                  {"We have received your list of " +
                    this.props.countListDriverCompany}
                  &nbsp; "covered employees" for possible random selection in
                  the above stated pool and period. Any individuals listed below
                  should submit to a drug and/or alcohol test. The type of test
                  required is displayed alongside each individual name listed.
                  Any individuals listed below were selected from an employee
                  roster provided to Motor Carrier Safety Solutions by the above
                  company. For this random selection period there were{" "}
                  <b>{this.props.countListDriverCompany}</b> employees in the
                  pool. Of those, {this.props.percent}% in that quarter have
                  been chosen by scientifically valid computer based random
                  selection.
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md="12" className="reportLabel">
                <Label>
                  Any selected individuals should be tested during the current
                  period. Once the selected individual(s) have been notified,
                  they should immediately submit to a urine specimen collection
                  and/or alcohol test.
                </Label>
              </Col>
            </Row>
            <Row className="header2">
              <Col md="12">Those selected from your company are: </Col>
            </Row>
            <Row>
              <Col md="5" className="reportLabel">
                <Label>
                  <b>Name:</b>
                </Label>
              </Col>
              <Col md="2" className="reportLabel">
                <Label>
                  <b>Date:</b>
                </Label>
              </Col>
              {/* <Col md="2" className="reportLabel">
                <Label>
                  <b>Notified</b>
                </Label>
              </Col> */}
              {this.props.type === "drug" ? (
                <Col md="2" className="reportLabel">
                  <Label>
                    <b>Drug</b>
                  </Label>
                </Col>
              ) : (
                <Col md="2" className="reportLabel">
                  <Label>
                    <b>Alcohol</b>
                  </Label>
                </Col>
              )}
            </Row>
            {RandomsList(this.props.randomDrivers, this.props.type)}
            <Row>
              <Col md="12" className="reportLabel">
                <Label>
                  <b>
                    PLEASE MARK YOUR CALENDAR FOR THE NEXT SELECTION PERIODS:
                  </b>
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md="12" className="reportLabel">
                <Label>
                  {this.props.quarter == 1
                    ? "April 1 - June 30 " + this.getDateYear()
                    : this.props.quarter == 2
                    ? "July 1 - Sept 30 " + this.getDateYear()
                    : this.props.quarter == 3
                    ? "Oct 1 - Dec 31 " + this.getDateYear()
                    : this.props.quarter == 4
                    ? "Jan 1 - March 31 " + (parseInt(this.getDateYear()) + 1)
                    : ""}
                </Label>
              </Col>
            </Row>
            <Row>
              <Col md="12" className="reportLabel">
                <Label>
                  <b>
                    PLEASE MAKE SURE CURRENT DRIVERS ARE LISTED ON RANDOM
                    SELECTION DRIVER'S LIST
                  </b>
                </Label>
              </Col>
            </Row>
          </Form>
        </PDFExport>
      </div>
    );
  }
}

export default PdfRS;
