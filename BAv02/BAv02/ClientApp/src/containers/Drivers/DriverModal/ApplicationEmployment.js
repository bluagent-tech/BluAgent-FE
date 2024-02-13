import React from "react";
import {
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Input,
  Form,
} from "reactstrap";
import TableCom from "./../../../components/Table";
import PdfAE from "./../../Drivers/Pdf/PdfAE";
import dateConvertTables from "./../../../services/dateConvertTables";
import "./cssDM/TablesPDF.css";

//APLICATION EMPLOYMENT MODAL

class ApplicationEmployment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image: "", error: "", errorM: ""};
    this.open = this.open.bind(this);
    this.catchError = this.catchError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  open() {
    this.setState({error: "", errorM: ""});

    this.props.toggle(this.props.id, this.props.company.Id);
  }

  catchError() {
    this.setState({error: "*"});
  }

  handleSubmit(e) {
    e.preventDefault();
    var rd = new FormData(e.target);
    this.setState({errorM: ""});
    if (
      Object.keys(this.props.company).length > 0 &&
      this.props.driver.Street !== null &&
      this.props.list.length === 0
    ) {
      rd.append("IdDriver", this.props.id);
      rd.append("IdCompany", this.props.company.Id);
      rd.append("StateLicense", this.props.driver.StateLicense);
      rd.append("License", this.props.driver.License);
      rd.append("TypeLicense", this.props.driver.TypeLicense);
      rd.append("DateExpiration", this.props.driver.LicenseExpiration);
      rd.append("FileSignatureD", this.state.image);
      if (this.props.driver.DeniedLicense === "Y") {
        rd.append("QuestionA", this.props.driver.DeniedLicense);
      } else {
        rd.append("QuestionA", "N");
      }
      if (this.props.driver.LicenseSuspended === "Y") {
        rd.append("QuestionB", this.props.driver.LicenseSuspended);
      } else {
        rd.append("QuestionB", "N");
      }
      this.props.submit(rd, this.props.driver.FileSignature);
    } else {
      this.catchError();
      if (this.props.list.length > 0) {
        this.setState({errorM: "Employment Application done"});
      }
    }
  }

  render() {
    let completeAddress = "";
    if (
      this.props.driver.Street !== "" ||
      this.props.driver.City !== "" ||
      this.props.driver.State !== "" ||
      this.props.driver.ZipCode !== null ||
      this.props.driver.ZipCode !== ""
    ) {
      completeAddress =
        this.props.driver.Street +
        this.props.driver.City +
        this.props.driver.State +
        this.props.driver.ZipCode;
    }

    let rep = ["EMPLOYER", "ADDRESS"];
    let rowItems = this.props.list.map((row, index) => (
      <React.Fragment>
      <tr key={index}>
        <td className="text-center">{row.CompanyName}</td>
        <td className="text-center">{row.Address}</td>
      </tr>
      <tr>
        <td className="text-center" colSpan={"2"}>
          <PdfAE
            key={row.Id}
            id={row.Id}
            row={row}
            company={this.props.company}
            driver={this.props.driver}
            companyId={this.props.company.Id}
            driverId={this.props.driver.Id}
            driverExperience={this.props.driverExperience}
            trafficConvictions={this.props.trafficConvictions}
            accidentRecords={this.props.accidentRecords}
            employmentRecords={this.props.employmentRecords}
            Ad={row.ad}
            Ac={row.ac}
            Ex={row.ex}
            Tc={row.tc}
            Er={row.dr}
            img={this.state.image}
            catchError={() => {
              this.catchError();
            }}
          />
        </td>
      </tr>
      </React.Fragment>
    ));

    return (
      <div className="col-md-3">
        <input
          type="image"
          onClick={this.open}
          className="img-responsive"
          src="assets/icons/icons8-cv.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-cv.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-cv.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>EMPLOYMENT APPLICATION</h6>
        <Modal
          isOpen={this.props.modal}
          className={"modal-lg "}
          backdrop={"static"}
          toggle={this.props.toggle}
        >
          <ModalHeader name="modal1" toggle={this.props.toggle}>
            EMPLOYMENT APPLICATION
            <span
              href="#"
              title="49 CFR 391.21(a)"
              data-toggle="popover"
              data-placement="bottom"
              data-trigger="hover"
              data-content="A person will not be allowed to drive a comercial motor vehicle unless he/she has completed and signed an application for employment."
            >
              <i className="icon-help-circled"></i>
            </span>
          </ModalHeader>
          <Col md="12">
            <Alert
              style={{
                backgroundColor: "#dff0fe",
                borderLeft: "4px solid #dff0fe",
                borderColor: "#4788c7",
                color: "#4788c7",
                padding: "15px 20px",
              }}
            >
              Notice: <i className="fas fa-exclamation-circle"></i> Driver
              information needs to be completed on the{" "}
              <strong>Driver's Account Section</strong>
            </Alert>
          </Col>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Company Name</Label>
                  <Input
                    type="text"
                    id="cname"
                    name="CompanyName"
                    defaultValue={
                      this.props.company !== undefined
                        ? this.props.company.LegalName
                        : ""
                    }
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Street Address</Label>
                  <Input
                    type="text"
                    id="street"
                    name="CompanyAddress"
                    defaultValue={
                      this.props.company !== undefined
                        ? this.props.company.PhysicalAddress
                        : ""
                    }
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    defaultValue={
                      this.props.company !== undefined
                        ? this.props.company.City
                        : ""
                    }
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">State</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    defaultValue={
                      this.props.company !== undefined
                        ? this.props.company.State
                        : ""
                    }
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Zip Code</Label>
                  <Input
                    type="text"
                    id="zip"
                    name="ZipCode"
                    defaultValue={
                      this.props.company !== undefined
                        ? this.props.company.PhysicalZip
                        : ""
                    }
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">First Name</Label>
                  <Input
                    type="text"
                    id="fname"
                    name="DriverName"
                    defaultValue={this.props.driver.Name}
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Last Name</Label>
                  <Input
                    type="text"
                    id="lname"
                    name="DriverLastName"
                    defaultValue={this.props.driver.LastName}
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">
                    Address
                    <span className="error">
                      {this.props.driver.Street === null
                        ? this.state.error
                        : ""}
                    </span>
                  </Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={completeAddress}
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">
                    How Long?
                    <span className="error">
                      {this.props.driver.Street === null
                        ? this.state.error
                        : ""}
                    </span>
                  </Label>
                  <Input
                    type="text"
                    id="how"
                    name="how"
                    defaultValue={
                      this.props.driver !== undefined
                        ? this.props.driver.HowLong
                        : ""
                    }
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Birthday</Label>
                  <Input
                    type="text"
                    id="day"
                    name="DriverDob"
                    defaultValue={dateConvertTables(
                      this.props.driver.Birthdate
                    )}
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">
                    Social Security Number
                    <span className="error">
                      {
                        //this.props.driver.Ssn === null ? this.state.error : ''
                      }
                    </span>
                  </Label>
                  <Input
                    type="text"
                    id="ssnumber"
                    name="Ssn"
                    defaultValue={this.props.driver.Ssn}
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  {this.props.statusR === "ACTIVE" ? (
                    <Button
                      color="primary"
                      type="submit"
                      disabled={
                        this.props.isLoading ||
                        JSON.parse(localStorage.getItem("user")).Role ===
                          "DRIVER"
                          ? true
                          : false
                      }
                    >
                      Save
                    </Button>
                  ) : (
                    ""
                  )}{" "}
                  {this.props.isLoading ? (
                    <img
                      style={{
                        width: "140px",
                        position: "absolute",
                        marginTop: "0px",
                        right: "40%",
                      }}
                      src="../../assets/img/icons/loading2.gif"
                      alt="loading"
                    />
                  ) : (
                    <div />
                  )}
                </Col>
                <Col md="9"></Col>
              </FormGroup>
            </Form>
            <TableCom
              rowItems={rowItems}
              header={rep}
              count={this.props.count}
              page={this.props.page}
              getItems={(index) => {
                this.props.get(this.props.id, this.props.company.Id, index, 3);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.toggle}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ApplicationEmployment;
