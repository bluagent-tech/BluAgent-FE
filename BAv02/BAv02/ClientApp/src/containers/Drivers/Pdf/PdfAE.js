import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import {
  Button,
  Col,
  Row,
  Form,
  Label,
  UncontrolledCollapse,
  Alert,
} from "reactstrap";
import dateConvertTables from "./../../../services/dateConvertTables";
import moment from "moment";

const DriverAddresses = (list) => {
  let content;
  if (list.length > 0) {
    content = list.map((address) => {
      return (
        <div key={address.Id}>
          <Row>
            <Col md="6" className="reportLabel">
              <Label>Address</Label>
            </Col>
            <Col md="6" className="reportLabel">
              <Label>
                {address.Street +
                  ", " +
                  address.City +
                  ", " +
                  address.State +
                  " " +
                  address.ZipCode}
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md="6" className="reportLabel">
              <Label>Numbers of years at Address</Label>
            </Col>
            <Col md="6" className="reportLabel">
              <Label>{address.HowLong}</Label>
            </Col>
          </Row>
        </div>
      );
    });
  } else {
    content = (
      <Alert color="warning">
        <Row className="pdfAlert">
          <Col md="10" className="pdfAlertTextColumn">
            Driver Addresses not added yet
          </Col>
          <Col md="2" className="pdfAlertIconColumn">
            <div className="iconImgContainer">
              <img
                className="imgFile"
                src="assets/icons/icons8-info.svg"
                crossOrigin="anonymous"
              ></img>
            </div>
          </Col>
        </Row>
      </Alert>
    );
  }
  return content;
};

const DriverExperience = (list) => {
  let content;

  if (list.length > 0) {
    content = list.map((exp) => {
      return (
        <div key={exp.Id}>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Class of Equipment</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{exp.ClassEquipment}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Type of Equipment</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{exp.TypeEquipment}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Years of Experience</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>
                {moment().diff(exp.DateFrom, "years", false) + " years"}
              </Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Approx. Miles Driven</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{exp.TotalMilesDriven}</Label>
            </Col>
          </Row>
          <hr />
        </div>
      );
    });
  } else {
    content = (
      <Alert color="warning">
        <Row className="pdfAlert">
          <Col md="10" className="pdfAlertTextColumn">
            Driver Experience not added yet
          </Col>
          <Col md="2" className="pdfAlertIconColumn">
            <div className="iconImgContainer">
              <img
                className="imgFile"
                src="assets/icons/icons8-info.svg"
                crossOrigin="anonymous"
              ></img>
            </div>
          </Col>
        </Row>
      </Alert>
    );
  }
  return content;
};

const AccidentRecord = (list) => {
  let content;

  if (list.length > 0) {
    content = list.map((record) => {
      return (
        <div key={record.Id}>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Date</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{dateConvertTables(record.DateAccident)}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Nature of Accident</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.NatureAccident}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Fatalities</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.Fatalities}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Injuries</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.Injuries}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Chemical Spills</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>N/A</Label>
            </Col>
          </Row>
          <hr />
        </div>
      );
    });
  } else {
    content = (
      <Alert color="success">
        <Row className="pdfAlert">
          <Col md="10" className="pdfAlertTextColumn">
            Driver had no accidents for the past 3 years
          </Col>
          <Col md="2" className="pdfAlertIconColumn">
            <div className="iconImgContainer">
              <img
                alt='Check'
                src='/assets/icons/icons8-checkmark.svg'
                style={{ width: '20px' }}
              />
            </div>
          </Col>
        </Row>
      </Alert>
    );
  }

  return content;
};

const TrafficConvictions = (list) => {
  let content;
  if (list.length > 0) {
    content = list.map((conviction) => {
      return (
        <div key={conviction.Id}>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Date Convicted</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{dateConvertTables(conviction.ConvictionDate)}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Violation</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{conviction.Change}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>State of Violation</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{conviction.Locations}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Penalty</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{conviction.Penalty}</Label>
            </Col>
          </Row>
          <hr />
        </div>
      );
    });
  } else {
    content = (
      <Alert color="success">
        <Row className="pdfAlert">
          <Col md="10" className="pdfAlertTextColumn">
          Driver had no traffic convictions for the past 3 years
          </Col>
          <Col md="2" className="pdfAlertIconColumn">
            <div className="iconImgContainer">
              <img
                alt='Check'
                src='/assets/icons/icons8-checkmark.svg'
                style={{ width: '20px' }}
              />
            </div>
          </Col>
        </Row>
      </Alert>
    );
  }

  return content;
};

const EmploymentRecord = (list) => {
  let content;
  if (list.length > 0) {
    content = list.map((record) => {
      return (
        <div key={record.Id}>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Employer Name</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.EmployerName}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Address</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.Address}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Phone Number</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.Telephone}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Email</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.Email}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Salary</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.Salary}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Position Held</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.PositionHeld}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Reason for Leaving</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{record.Leaving}</Label>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="reportLabel">
              <Label>Time of Employment</Label>
            </Col>
            <Col md="8" className="reportLabel">
              <Label>{moment(record.DateFrom).fromNow()}</Label>
            </Col>
          </Row>

          <hr />
        </div>
      );
    });
  }else {
    content = (
      <Alert color="warning">
        <Row className="pdfAlert">
          <Col md="10" className="pdfAlertTextColumn">
          Employment Record not added yet
          </Col>
          <Col md="2" className="pdfAlertIconColumn">
            <div className="iconImgContainer">
              <img
              className="imgFile"
                alt='Check'
                src='/assets/icons/icons8-info.svg'
                crossOrigin="anonymous"
                // style={{ width: '20px' }}
              />
            </div>
          </Col>
        </Row>
      </Alert>
    );
  }
  return content;
};

class PdfAE extends React.Component {
  pdfExportComponent;

  constructor(props) {
    super(props);
    this.state = { orin: undefined };
    this.exportPDFWithMethod = this.exportPDFWithMethod.bind(this);
  }

  componentDidMount() {
    this.getStateById(this.props.driver.StateLicense);
  }

  getStateById = (stateId) => {
    let stateName = "";
    fetch("https://dictionaries-list.s3-us-west-2.amazonaws.com/states.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ states: data });
        if (data !== undefined && data !== null) {
          data.map((x) => {
            if (x.Id == stateId) {
              stateName = x.Name;
              document.getElementById("StateLicense").innerText = stateName;
            }
          });
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div style={{ zIndex: "1" }}>
        <div className="example-config">
          <Row>
            <Col md="12">
              <Button
                color="success"
                id={"toggler" + this.props.id}
                className="btn btn-block"
              >
                Preview
              </Button>
            </Col>
          </Row>
        </div>
        <UncontrolledCollapse toggler={"toggler" + this.props.id}>
          <Row style={{ marginTop: "10px" }}>
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
              id="form"
              style={{ display: "block" }}
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
                <Col md="12">Application of Employment</Col>
              </Row>
              <Row className="infoHeader">
                <Col md="12">{this.props.row.CompanyName}</Col>
              </Row>
              <Row className="infoHeader">
                <Col md="12">{this.props.row.Address}</Col>
              </Row>
              {/* Driver Information */}
              <Row className="header2">
                <Col md="12">Driver Information</Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Name</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>
                    {`${this.props.row.DriverName}`+`${" "}`+`${this.props.row.DriverLastName}`}
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Date of Birth</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>
                    {this.props.row.DriverDob !== null &&
                    this.props.row.DriverDob !== undefined
                      ? dateConvertTables(this.props.row.DriverDob)
                      : ""}
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Gender</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>{this.props.driver.Gender}</Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Phone Number</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>{this.props.driver.PhoneNumber}</Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Social Security</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>{this.props.driver.Ssn}</Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Country</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>{this.props.driver.Country}</Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Email</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>{this.props.driver.Email}</Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Address</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>
                    {this.props.driver.Street +
                      this.props.driver.City +
                      this.props.driver.State +
                      this.props.driver.ZipCode}
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col md="6" className="reportLabel">
                  <Label>Application/Hire Date</Label>
                </Col>
                <Col md="6" className="reportLabel">
                  <Label>
                    {this.props.driver.HiringDate === null || undefined
                      ? "N/A"
                      : dateConvertTables(this.props.driver.HiringDate)}
                  </Label>
                </Col>
              </Row>
              {/* Previous 3 Years Residency */}
              <Row className="header2">
                <Col md="12">Previous 3 Years Residency</Col>
              </Row>
              {DriverAddresses(this.props.Ad)}
              {/* Driver License Information */}
              <Row className="header2">
                <Col md="12">Driver License Information</Col>
              </Row>
              <Row>
                <Col md="6">
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>License Number</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      <Label>{this.props.driver.License}</Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>License Class</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      <Label>{this.props.driver.TypeLicense}</Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>License State</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      <Label id="StateLicense"></Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Expiration Date</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      <Label>
                        {dateConvertTables(this.props.driver.LicenseExpiration)}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>
                        1- Have you ever been denies a license, permit or
                        privilege to operate a motor vehicle
                      </Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      <Label>
                        {this.props.driver.LicenseSuspendedComments === null ||
                        this.props.driver.LicenseSuspendedComments === "null"
                          ? "NO"
                          : this.props.driver.LicenseSuspendedComments}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>
                        2- Has any License, permit or privilege ever been
                        suspended or revoked?
                      </Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      <Label>
                        {this.props.driver.DeniedLicenseComments === null ||
                        this.props.driver.LicenseSuspendedComments === "null"
                          ? "NO"
                          : this.props.driver.DeniedLicenseComments}
                      </Label>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <div>
                    <img
                      className="imgFile"
                      src={`${this.props.driver.DriverLicenseFile}`}
                      ref={(img) => (this.imgLicense = img)}
                      onError={() => {
                        this.imgLicense.src = "assets/img/Images/no-image.png";
                        this.imgLicense.className = "imgFile";
                      }}
                      alt="driver license"
                      crossOrigin="anonymous"
                    />
                  </div>
                </Col>
              </Row>
              {/* Driver Experience */}
              <Row className="header2">
                <Col md="12">Driver Experience</Col>
              </Row>
              {DriverExperience(this.props.driverExperience)}
              {/* Accident Record for Past 3 Years or More */}
              <Row className="header2">
                <Col md="12">Accident Record for the Past 3 Years or More</Col>
              </Row>
              {AccidentRecord(this.props.accidentRecords)}
              {/* Traffic Convictions and Features for the Past 3 Years */}
              <Row className="header2">
                <Col md="12">
                  Traffic Convictions and Features for the Past 3 Years
                </Col>
              </Row>
              {TrafficConvictions(this.props.trafficConvictions)}
              {/* Employment Record */}
              <Row className="header2">
                <Col md="12">Employment Records</Col>
              </Row>
              {EmploymentRecord(this.props.employmentRecords)}
              <Row>
                <Col md="6" className="reportLabel">
                  <img
                    className="imgFile"
                    src={`${this.props.driver.DriverSignature}`}
                    ref={(img) => (this.img = img)}
                    onError={() => {
                      this.img.src = "assets/img/Images/NoSignature2.png";
                      this.img.style = "width:300px;";
                    }}
                    crossOrigin="anonymous"
                    alt="signature"
                  />
                </Col>
              </Row>
            </Form>
          </PDFExport>
        </UncontrolledCollapse>
      </div>
    );
  }

  exportPDFWithMethod = () => {
    savePDF(ReactDOM.findDOMNode(this.pdfExportComponent), {
      paperSize: "A4",
    });
  };
  exportPDFWithComponent = () => {
    if (
      Object.keys(this.props.company).length > 0 &&
      this.props.driver.Street !== null &&
      this.props.driver.Ssn !== null
    ) {
      var p = document.getElementById("1");
      p.style = "display:block";
      this.pdfExportComponent.save();
      p.style = "display:none";
    } else {
      this.props.catchError();
    }
  };
}

export default PdfAE;
