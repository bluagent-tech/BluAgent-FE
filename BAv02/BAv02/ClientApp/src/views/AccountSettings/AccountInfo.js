import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  FormGroup,
  Button,
  UncontrolledTooltip,
  Form,
  Alert,
} from "reactstrap";
import { Collapse } from "react-collapse";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";
import Select from "./../../components/Select";
import convertDate from "./../../services/convertDate";
import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";
import Signature from "./../../containers/signaturejs";
import OperationClassifications from "./../../containers/Company/CompanyModal/OperationClasification";
import Clasifications from "./../../containers/Company/CompanyModal/Clasifications";
import HazardousMaterials from "./../../containers/Company/CompanyModal/HazardousMaterials";
import PdfMCS150 from "./../../containers/Company/Pdf/PdfMCS150";
import MCS150PDFprueba1 from "../../containers/Company/Pdf/MCS150PDF";
import DataState from "../../states.json";
import DataCity from "../../city.json";
import collapseOpen from "../../../src/assets/icons/expand.png";
import collapseClose from "../../../src/assets/icons/next.png";
import AccountAgreement from "../../components/pdf/AccountAgreementInfo";

const stateName = DataState;
const cityName = DataCity;
const idCompany = localStorage["idCompany"];
const id = JSON.parse(localStorage.getItem("user")).Id;
var addressDifferent = false;

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeR = this.onChangeR.bind(this);
    this.onChangeC = this.onChangeC.bind(this);
    this.onChangeAuthority = this.onChangeAuthority.bind(this);
    this.onChangeReadOnly = this.onChangeReadOnly.bind(this);
    // this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      vState: "",
      vCity: "",
      vCountry: "",
      vState2: "",
      vCity2: "",
      vCountry2: "",
      addressDifferent: false,
      Image: "",
      Region: "",
      CarrierOperation: "",
      Hazmat: "false",
      PcFlag: undefined,
      //countryPhone: "US +1",
      //countryMovil: "US +1",
      Title: undefined,
      CompanyInfToggle: false,
      ContactInfToggle: false,
      CargoToggle: false,
      VyDInforToggle: false,
      MCS150Toggle: false,
    };
  }
  UNSAFE_componentWillMount() {
    this.props.getDataCompany(id, false);
    this.setState({
      vState: this.props.company.PhysicalState,
      vCity: this.props.company.PhysicalCity,
      vCountry: this.props.company.PhysicalCountry,
      vState2: this.props.company.MailState,
      vCity2: this.props.company.MailCity,
      vCountry2: this.props.company.MailCountry,
      Region: this.props.company.Region,
      Hazmat: this.props.company.Hazmat,
      CarrierOperation: this.props.company.CarrierOperation,
      countryPhone: this.props.company.PhoneNumber,
      countryMovil: this.props.company.MovilPhone,
    });
    this.props.getMCS150FormData(id);
    this.props.getOperationClassification(id);
    this.props.getCargoClassification(id);
    this.props.getHazardMaterials(id);
    this.props.getCompanyNotifications(idCompany);
  }

  componentDidMount() {
    this.props.getAllDocuments(id, 1, 100);
    // this.props.MISReport(idCompany, YearMISReport);
    // this.props.MIS;
    this.props.getVehiclesActive(idCompany);
    this.props.getDriverList(id);
    this.props.getTrailers(id, 1, 1000, false);
  }

  componentDidUpdate(prevProps, prevState) {
    // Files.data = this.props.docs.filter(this.props.filter);
    // const { data: allFiles = [] } = Files;
    // this.setState({ allFiles });

    if (this.state.Region === undefined) {
      if (this.props.company.Region === "Not Applicable") {
        document.getElementById("McMx").setAttribute("disabled", "disabled");
      } else {
        document.getElementById("McMx").removeAttribute("disabled");
      }
    }
    if (this.state.Hazmat === undefined) {
      if (this.props.company.Hazmat === true) {
        document.getElementById("hazardous").removeAttribute("disabled");
      } else {
        document
          .getElementById("hazardous")
          .setAttribute("disabled", "disabled");
      }

      if (
        document.getElementById("SAddress").value !== "" &&
        document.getElementById("SAddress2").value !== "" &&
        addressDifferent === false
      ) {
        if (
          (this.props.company.PhysicalAddress ===
            this.props.company.MailAddress ||
            this.props.company.MailAddress === null) &&
          this.props.MailAddress === prevProps.MailAddress
        ) {
          addressDifferent = false;
          document.getElementById("mailingAddress").style.display = "none";
        } else {
          addressDifferent = true;
          document.getElementById("mailingAddress").style.display = "block";
        }

        document.getElementById("checkAddress").checked = addressDifferent;
        // document.getElementById("YesAddress").checked = !addressDifferent;
        // document.getElementById("NoAddress").checked = addressDifferent;
      }
    }

    // if (prevProps !== this.props.company.CarrierOperation) {
    //   if (this.props.company.CarrierOperation === "A") {
    //     document.getElementById("A").checked = true;
    //     document.getElementById("B").checked = false;
    //     document.getElementById("C").checked = false;
    //     document.getElementById("D").checked = false;
    //     document.getElementById("E").checked = false;
    //   } else if (this.props.company.CarrierOperation === "B") {
    //     document.getElementById("B").checked = true;
    //     document.getElementById("A").checked = false;
    //     document.getElementById("C").checked = false;
    //     document.getElementById("D").checked = false;
    //     document.getElementById("E").checked = false;
    //   } else if (this.props.company.CarrierOperation === "C") {
    //     document.getElementById("C").checked = true;
    //     document.getElementById("B").checked = false;
    //     document.getElementById("A").checked = false;
    //     document.getElementById("D").checked = false;
    //     document.getElementById("E").checked = false;
    //   } else if (this.props.company.CarrierOperation === "D") {
    //     document.getElementById("D").checked = true;
    //     document.getElementById("B").checked = false;
    //     document.getElementById("C").checked = false;
    //     document.getElementById("A").checked = false;
    //     document.getElementById("E").checked = false;
    //   } else if (this.props.company.CarrierOperation === "E") {
    //     document.getElementById("E").checked = true;
    //     document.getElementById("B").checked = false;
    //     document.getElementById("C").checked = false;
    //     document.getElementById("D").checked = false;
    //     document.getElementById("A").checked = false;
    //   }
    // }
  }
  // updateCompanyNotifications(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.props.updateCompanyNotifications(112);
  //   // var company = new FormData(e.target);
  //   // company.append("idu", id);
  //   // company.append("mailing", addressDifferent);
  //   // this.props.saveDataCompany(company);
  //   // this.props.getMCS150FormData(id);
  // }

  onChange(event) {
    if (event.target.name === "PhysicalState") {
      this.setState({ vState: event.target.value });
      if (event.target.value !== "") {
        this.setState({ vCity: "" });
        this.props.getCities(event.target.value);
      } else {
        this.setState({ vCity: "" });
        this.props.getCities(0);
      }
    } else if (event.target.name === "PhysicalCity") {
      this.setState({ vCity: event.target.value });
    } else if (event.target.name === "MailState") {
      this.setState({ vState2: event.target.value });
      if (event.target.value !== "") {
        this.setState({ vCity2: "" });
        this.props.getMailingCities(event.target.value);
      } else {
        this.setState({ vCity2: "" });
        this.props.getMailingCities(0);
      }
    } else {
      this.setState({ vCity2: event.target.value });
    }
  }

  onChangeC(e) {
    const { value } = e.target;
    if (e.target.name === "PhysicalCountry") {
      this.setState({ vCountry: value });
      this.props.getStates(value);
    } else {
      this.setState({ vCountry2: value });
      this.props.getMailingStates(value);
    }
  }

  onChangeR(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === "Hazmat") {
      if (value === "true") {
        document.getElementById("hazardous").removeAttribute("disabled");
      } else {
        document
          .getElementById("hazardous")
          .setAttribute("disabled", "disabled");
      }
    }
  }

  onChangeAuthority(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (value === "Not Applicable") {
      document.getElementById("McMx").setAttribute("disabled", true);
      document.getElementById("McMx").value = "";
    } else {
      document.getElementById("McMx").removeAttribute("disabled");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.props.modalOperation === false &&
      this.props.modalClasifications === false &&
      this.props.modalHazardous === false
    ) {
      var company = new FormData(e.target);
      company.append(
        "PhoneNumber",
        e.target.countryPhone.value + " " + e.target.PhoneNumberx.value
      );
      company.append(
        "MovilPhone",
        e.target.countryMovil.value + " " + e.target.MovilPhonex.value
      );
      company.append("idu", id);
      company.append("mailing", addressDifferent);
      company.append(
        "Hazmat",
        this.state.Hazmat !== undefined
          ? this.state.Hazmat
          : this.props.company.Hazmat !== null
            ? this.props.company.Hazmat
            : "false"
      );
      this.props.saveDataCompany(company);
      this.props.getMCS150FormData(id);
    }
    e.stopPropagation();
  }

  onChangeReadOnly(e) {
    const { checked } = e.target;
    if (checked === true) {
      document.getElementById("mailingAddress").style.display = "block";
    } else {
      document.getElementById("mailingAddress").style.display = "none";
    }
    addressDifferent = checked;
    this.setState({ addressDifferent: checked });
  }

  render() {
    let hazmatDisable = this.props.company.CarrierOperation;

    return (
      <Fragment>
        <Form id="formCompany" onSubmit={this.handleSubmit}>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12} className="mx-auto">
              <Alert
                style={{
                  backgroundColor: "#dff0fe",
                  borderLeft: "4px solid #dff0fe",
                  borderColor: "#4788c7",
                  color: "#4788c7",
                  padding: "15px 20px",
                }}
              >
                Notice: <i className="fas fa-exclamation-circle"></i> Any time a
                carrier or other regulated entity changes its name or address,
                or other details in their record carriers must update <br />
                <strong>MCS-150 Filling Information</strong> and{" "}
                <strong>New Signature is Required</strong>
              </Alert>
            </Col>
          </Row>
          <br />
          <Row>
            <Col mb="4">
              <FormGroup>
                <div
                  className="cursor-menu"
                  onClick={() =>
                    this.setState({
                      CompanyInfToggle: !this.state.CompanyInfToggle,
                    })
                  }
                >
                  <h5>
                    {this.state.CompanyInfToggle ? (
                      <img
                        src={collapseOpen}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    ) : (
                      <img
                        src={collapseClose}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    )}
                    Company Information
                  </h5>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Collapse isOpened={this.state.CompanyInfToggle}>
            <div className="p-3 mb-2 bg-light" style={{ borderRadius: "10px" }}>
              <Row>
                <Col sm="12" xs="12" md="4" lg="4">
                  <FormGroup>
                    <label htmlFor="LegalName">
                      Legal Company Name
                      <i
                        id="LegalNameQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="LegalNameQuestion"
                      >
                        This is the legal name of the business entity that
                        owns/controls the Motor Carrier operation.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="text"
                      id="LegalName"
                      defaultValue={this.props.company.LegalName}
                      className="form-control"
                      maxLength="199"
                      name="LegalName"
                      ref={(LegalName) => (this.LegalName = LegalName)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="usDot">
                      US DOT
                      <i
                        id="usDotQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="usDotQuestion"
                      >
                        Enter the company’s assigned USDOT Number in the space
                        provided.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="text"
                      id="usDot"
                      defaultValue={this.props.company.Dot}
                      className="form-control bg-white"
                      maxLength="12"
                      pattern="[0-9]+"
                      title="Only numbers are allowed"
                      name="Dot"
                      ref={(usDot) => (this.usDot = usDot)}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="TypeofCarrier">
                      Authority
                      <i
                        id="authority"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="authority">
                        Status of Common Authority, Contract Authority, and/or
                        Broker Authority for the company.
                      </UncontrolledTooltip>
                    </label>
                    <select
                      id="TypeofCarrier"
                      value={
                        this.state.Region !== undefined ||
                          this.state.Region === null
                          ? this.state.Region
                          : this.props.company.Region
                      }
                      className="form-control"
                      name="Region"
                      onChange={this.onChangeAuthority}
                      ref={(TypeofCarrier) =>
                        (this.TypeofCarrier = TypeofCarrier)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Not Applicable">Not Applicable</option>
                      <option value="MC">MC</option>
                      <option value="MX">MX</option>
                      <option value="FF">FF</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="IdTax">
                      Tax ID Number
                      <i
                        id="IdTaxQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="IdTaxQuestion"
                      >
                        Enter the Employer Identification Number (EIN) assigned
                        to the Motor Carrier company by the Internal Revenue
                        Service.
                      </UncontrolledTooltip>
                    </label>
                    <InputMask
                      mask="99-9999999"
                      id="IdTax"
                      value={this.props.company.Tax}
                      className="form-control"
                      maxLength=""
                      title="Only numbers are allowed"
                      name="Tax"
                      ref={this.IdTax}
                    ></InputMask>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="clasification">
                      Operation Classification
                      <i
                        id="clasificationQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="clasificationQuestion"
                      >
                        Operation classification is based on the type of
                        business the company is engaged in and will help
                        determine the FMCSA regulations the company is subject
                        to.
                      </UncontrolledTooltip>
                    </label>
                    <OperationClassifications
                      toggle={this.props.toggleOperationClassification}
                      modalO={this.props.modalOperation}
                      id={id}
                      submit={this.props.saveOperationClassification}
                      getData={this.props.getOperationClassification}
                      operationC={this.props.OperationC}
                    />
                  </FormGroup>
                </Col>

                <Col sm="12" xs="12" md="4" lg="4">
                  <FormGroup>
                    <label htmlFor="DBA">
                      DBA Name
                      <i
                        id="DBAQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="DBAQuestion"
                      >
                        Enter the company’s trade name if it is different from
                        the company’s official business name (the name entered
                        in item 1).
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="text"
                      id="DBA"
                      defaultValue={this.props.company.DbaName}
                      className="form-control"
                      maxLength="199"
                      name="DbaName"
                      ref={(DBA) => (this.DBA = DBA)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="IdCode">
                      US DOT PIN
                      <i
                        id="idCode"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="idCode">
                        Motorcarriers need an FMCSA-issued U.S. DOT Number and a
                        U.S. DOT Number Personal Identification Number (PIN)
                        (NOT a Docket Number PIN) to access the Safety
                        Measurement System (SMS) Website.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="text"
                      id="IdCode"
                      defaultValue={this.props.company.Pinnumber}
                      className="form-control"
                      maxLength="20"
                      name="Pinnumber"
                      ref={(IdCode) => (this.IdCode = IdCode)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="StateNumber">
                      CA
                      <i
                        id="CA"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="CA">
                        The CA# is issued exclusively by the CHP to identify
                        motor carriers and is used as the MCP number. CA#
                        applicants must complete a Motor Carrier Profile (CHP
                        362) and mail, fax, or hand-carry it to their closest
                        CHP Motor Carrier Safety Unit.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="number"
                      id="StateNumber"
                      defaultValue={this.props.company.StateNumber}
                      className="form-control"
                      maxLength="12"
                      name="StateNumber"
                      ref={(StateNumber) => (this.StateNumber = StateNumber)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="McMx">
                      MC/MX
                      <i
                        id="McMxQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="McMxQuestion"
                      >
                        If the company has already been assigned an “MC” or “MX”
                        identification number for Interstate FMCSA Operating
                        Authority, enter the number.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="number"
                      id="McMx"
                      defaultValue={this.props.company.McMx}
                      className="form-control"
                      maxLength="10"
                      name="McMx"
                      ref={(McMx) => (this.McMx = McMx)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="CarrierOperation">
                      Company Operations
                      <i
                        id="carrierQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="carrierQuestion"
                      >
                        The company operation type will tell FMCSA what type(s)
                        of Motor Carrier or Hazardous Materials Shipper
                        operations the company plans to provide.
                      </UncontrolledTooltip>
                    </label>
                    <select
                      id="TypeofCarrier"
                      value={
                        this.state.CarrierOperation !== undefined
                          ? this.state.CarrierOperation
                          : this.props.company.CarrierOperation
                      }
                      className="form-control"
                      name="CarrierOperation"
                      onChange={this.onChangeR}
                      ref={(CarrierOperation) =>
                        (this.CarrierOperation = CarrierOperation)
                      }
                    >
                      <option value="">Select</option>
                      <option value="A">Interstate Carrier</option>
                      <option value="B">Intrastate Hazmat Carrier</option>
                      <option value="C">Intrastate Non-Hazmat Carrier</option>
                      <option value="D">Interstate Hazmat Shipper</option>
                      <option value="E">Intrastate Hazmat Shipper</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col sm="12" xs="12" md="4" lg="4">
                  <Row>
                    <Col>
                      <FormGroup style={{ marginTop: 32 }}>
                        <Button
                          type="submit"
                          color="primary"
                          className="px-2 buttons-royal"
                          htmlFor="formCompany"
                          block
                        >
                          Save
                        </Button>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup style={{ marginTop: 32 }}>
                        <Button
                          type="button"
                          color="primary"
                          className="px-2 buttons-royal"
                          htmlFor="formCompany"
                          block
                        >
                          Cancel
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            {/* </Col> */}
          </Collapse>
          <br />

          {/*--------------------------------------------------------------------------------*/}
          <Row>
            <Col mb="4">
              <FormGroup>
                <div
                  className="cursor-menu"
                  onClick={() =>
                    this.setState({
                      ContactInfToggle: !this.state.ContactInfToggle,
                    })
                  }
                >
                  <h5>
                    {this.state.ContactInfToggle ? (
                      <img
                        src={collapseOpen}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    ) : (
                      <img
                        src={collapseClose}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    )}
                    Contact Information
                  </h5>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Collapse isOpened={this.state.ContactInfToggle}>
            <div className="p-3 mb-2 bg-light" style={{ borderRadius: "10px" }}>
              <Row>
                <Col mb="4" lg="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="SAddress">
                      Address
                      <i
                        id="SAddressQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "grey" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="SAddressQuestion"
                      >
                        Physical location and telephone number of the company's
                        safety office.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="text"
                      id="SAddress"
                      defaultValue={this.props.company.PhysicalAddress}
                      className="form-control"
                      maxLength="299"
                      name="PhysicalAddress"
                      ref={(SAddress) => (this.SAddress = SAddress)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="State">State</label>
                    <Select
                      id="State"
                      name="PhysicalState"
                      options={this.props.states}
                      onChange={this.onChange}
                      value={
                        this.state.vState !== undefined
                          ? this.state.vState
                          : this.props.company.PhysicalState
                      }
                      ref={(State) => (this.State = State)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="ZipCode">Zip Code</label>
                    <NumberFormat
                      format="#####"
                      id="zip"
                      value={this.props.company.PhysicalZip}
                      className="form-control"
                      name="PhysicalZip"
                      ref={(ZipCode) => (this.ZipCode = ZipCode)}
                    />
                  </FormGroup>
                </Col>
                <Col mb="4" lg="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="Country">Country</label>
                    <Select
                      id="Country"
                      name="PhysicalCountry"
                      options={this.props.countries}
                      onChange={this.onChangeC}
                      value={
                        this.state.vCountry !== undefined
                          ? this.state.vCountry
                          : this.props.company.PhysicalCountry
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="City">City</label>
                    <Select
                      id="City"
                      name="PhysicalCity"
                      options={this.props.cities}
                      onChange={this.onChange}
                      value={
                        this.state.vCity !== undefined
                          ? this.state.vCity
                          : this.props.company.PhysicalCity
                      }
                      ref={(City) => (this.City = City)}
                    />
                  </FormGroup>
                </Col>
                <Col mb="4" lg="4" sm="12" xs="12">
                  <Row>
                    <Col>
                      <FormGroup style={{ marginTop: 32 }}>
                        <Button
                          type="submit"
                          color="primary"
                          className="px-2 buttons-royal"
                          htmlFor="formCompany"
                          block
                        >
                          Save
                        </Button>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup style={{ marginTop: 32 }}>
                        <Button
                          type="button"
                          color="primary"
                          className="px-2 buttons-royal"
                          htmlFor="formCompany"
                          block
                        >
                          Cancel
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col mb="4">
                  <FormGroup>
                    <input
                      id="checkAddress"
                      type="checkbox"
                      checked={addressDifferent}
                      onChange={this.onChangeReadOnly}
                      style={{ marginLeft: "5px" }}
                      className="mr-2"
                    />
                    <label>
                      Mailing address different than principal place of
                      business?
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <div id="mailingAddress" style={{ display: "none" }}>
                <Row>
                  <Col mb="4">
                    <FormGroup>
                      <label htmlFor="Address2">
                        Address
                        <i
                          id="SAddressQuestion2"
                          className="icon-question"
                          style={{ marginLeft: "5px", color: "#3b86ff" }}
                        ></i>
                        <UncontrolledTooltip
                          placement="right"
                          target="SAddressQuestion2"
                        >
                          Mailing address for the company.
                        </UncontrolledTooltip>
                      </label>
                      <input
                        type="text"
                        id="SAddress2"
                        defaultValue={this.props.company.MailAddress}
                        className="form-control"
                        maxLength="299"
                        name="MailAddress"
                        ref={(Address2) => (this.Address2 = Address2)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="Country2">Country</label>
                      <Select
                        id="Country2"
                        name="MailCountry"
                        options={this.props.countries}
                        onChange={this.onChangeC}
                        value={
                          this.state.vCountry2 !== undefined
                            ? this.state.vCountry2
                            : this.props.company.MailCountry
                        }
                        required={this.state.addressDifferent}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="State2">State</label>
                      <Select
                        id="State2"
                        name="MailState"
                        options={this.props.mailingStates}
                        onChange={this.onChange}
                        value={
                          this.state.vState2 !== undefined
                            ? this.state.vState2
                            : this.props.company.MailState
                        }
                        ref={(State2) => (this.State2 = State2)}
                        required={this.state.addressDifferent}
                      />
                    </FormGroup>
                  </Col>
                  <Col mb="4">
                    <FormGroup>
                      <label htmlFor="City2">City</label>
                      <Select
                        id="City2"
                        name="MailCity"
                        options={this.props.mailingCities}
                        onChange={this.onChange}
                        value={
                          this.state.vCity2 !== undefined
                            ? this.state.vCity2
                            : this.props.company.MailCity
                        }
                        ref={(City2) => (this.City2 = City2)}
                        required={this.state.addressDifferent}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label htmlFor="ZipCode2">Zip Code</label>
                      <NumberFormat
                        format="#####"
                        value={this.props.company.MailZip}
                        className="form-control"
                        name="MailZip"
                        ref={(ZipCode2) => (this.ZipCode2 = ZipCode2)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="Title">
                      Title
                      <i
                        id="titleTooltips"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="titleTooltips"
                      >
                        Please enter the position that you perform in the
                        company.
                      </UncontrolledTooltip>
                    </label>
                    <select
                      id="TypeofCarrier"
                      value={
                        this.state.Title !== undefined
                          ? this.state.Title
                          : this.props.company.Title
                      }
                      className="form-control"
                      name="Title"
                      onChange={this.onChangeR}
                    >
                      <option value="">Select</option>
                      <option value="DER">DER</option>
                      <option value="OWNER">OWNER</option>
                      <option value="DIRECTOR">DIRECTOR</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="OWNER-OPERATOR">OWNER-OPERATOR</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="DER">DER Name</label>
                    <input
                      type="text"
                      id="DER"
                      defaultValue={
                        this.props.company.Der === undefined ||
                          this.props.company.Der === null
                          ? JSON.parse(localStorage.getItem("user")).Name +
                          " " +
                          JSON.parse(localStorage.getItem("user")).LastName
                          : this.props.company.Der
                      }
                      className="form-control"
                      maxLength="99"
                      name="Der"
                      ref={(DER) => (this.DER = DER)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4" mb="4" sm="12" xs="12"></Col>
              </Row>
              <Row>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="Phone">Business Phone</label>
                    <div className="form-inline">
                      <select
                        style={{ width: "20%" }}
                        value={
                          this.state.countryPhone !== undefined
                            ? this.state.countryPhone
                            : this.props.company.PhoneNumber !== undefined &&
                              this.props.company.PhoneNumber !== null
                              ? this.props.company.PhoneNumber.substr(0, 6)
                              : "US +1"
                        }
                        className="form-control"
                        name="countryPhone"
                        onChange={this.onChangeR}
                      >
                        <option value="US +1">US +1</option>
                        <option value="MX +52">MX +52</option>
                        <option value="CAN +1">CAN +1</option>
                      </select>
                      <NumberFormat
                        style={{ width: "80%" }}
                        format="(###) ###-####"
                        placeholder="(---) --- ----"
                        mask="_"
                        value={
                          this.props.company.PhoneNumber !== undefined &&
                            this.props.company.PhoneNumber !== null
                            ? this.props.company.PhoneNumber.substr(6)
                            : ""
                        }
                        className="form-control"
                        name="PhoneNumberx"
                        ref={(Phone) => (this.Phone = Phone)}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="Email">Email</label>
                    <input
                      type="email"
                      defaultValue={this.props.company.Email}
                      className="form-control"
                      placeholder="example@example.com"
                      maxLength="100"
                      name="Email"
                    />
                  </FormGroup>
                </Col>
                <Col lg="4" md="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="MovilPhone">Phone Number</label>
                    <div className="form-inline">
                      <select
                        style={{ width: "20%" }}
                        value={
                          this.state.countryMovil !== undefined
                            ? this.state.countryMovil
                            : this.props.company.MovilPhone !== undefined &&
                              this.props.company.MovilPhone !== null
                              ? this.props.company.MovilPhone.substr(0, 6)
                              : "US +1"
                        }
                        className="form-control"
                        name="countryMovil"
                        onChange={this.onChangeR}
                      >
                        <option value="US +1">US +1</option>
                        <option value="MX +52">MX +52</option>
                        <option value="CAN +1">CAN +1</option>
                      </select>
                      <NumberFormat
                        style={{ width: "80%" }}
                        format="(###) ###-####"
                        placeholder="(---) --- ----"
                        mask="_"
                        value={
                          this.props.company.MovilPhone !== undefined &&
                            this.props.company.MovilPhone !== null
                            ? this.props.company.MovilPhone.substr(6)
                            : ""
                        }
                        className="form-control"
                        name="MovilPhonex"
                        ref={(MovilPhone) => (this.MovilPhone = MovilPhone)}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Collapse>
          <br />
          {/*-----------------------------------------------------------------------------------*/}
          <Row>
            <Col mb="4" sm="12" xs="12">
              <FormGroup>
                <div
                  className="cursor-menu"
                  onClick={() =>
                    this.setState({ CargoToggle: !this.state.CargoToggle })
                  }
                >
                  <h5>
                    {this.state.CargoToggle ? (
                      <img
                        src={collapseOpen}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    ) : (
                      <img
                        src={collapseClose}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    )}
                    Cargo
                  </h5>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Collapse isOpened={this.state.CargoToggle}>
            <div className="p-3 mb-2 bg-light" style={{ borderRadius: "10px" }}>
              <Row>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label>
                      Clasifications
                      <i
                        id="ClasificationsQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "grey" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="ClasificationsQuestion"
                      >
                        Refers to the types of materials the company transports
                        or ships (offers for transport).
                      </UncontrolledTooltip>
                    </label>
                    <Clasifications
                      toggle={this.props.toggleClassification}
                      modalC={this.props.modalClasifications}
                      id={id}
                      submit={this.props.saveCargoClassification}
                      getData={this.props.getCargoClassification}
                      cargoC={this.props.cargoC}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>
                      Hazardous Materials
                      <i
                        id="HazardousQuestion"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip
                        placement="right"
                        target="HazardousQuestion"
                      >
                        Complete this item only if the company transports or
                        ships (offers for transport) Hazardous Materials.
                        Otherwise, proceed to item 26.
                      </UncontrolledTooltip>
                    </label>
                    <HazardousMaterials
                      toggle={this.props.toggleHazardousMaterials}
                      modalH={this.props.modalHazardous}
                      id={id}
                      submit={this.props.saveHazardMaterials}
                      HmCompanies={this.props.HmCompany}
                      HmOptions={this.props.HmOptions}
                      HmStates={this.props.HmStates}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="Hazmat">
                      Hazmat
                      <i
                        id="hm"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="hm">
                        Type of Hazardous Material carried by interstate and
                        intrastate motor carriers. Up to 3 hazardous materials
                        may be printed. "B" indicates that the cargo is carried
                        in Bulk quantities. "N" indicates that the cargo is
                        carried in Non-Bulk quantities. "A" indicates cargo is
                        carried both in Bulk and Non-Bulk quantities.
                      </UncontrolledTooltip>
                    </label>
                    <select
                      id="Hazmat"
                      value={
                        this.state.Hazmat !== undefined
                          ? this.state.Hazmat
                          : this.props.company.Hazmat
                      }
                      className="form-control"
                      placeholder="Hazmat"
                      name="Hazmat"
                      onChange={this.onChangeR}
                      ref={(Hazmat) => (this.Hazmat = Hazmat)}
                      disabled={
                        hazmatDisable === undefined ||
                          hazmatDisable === "B" ||
                          hazmatDisable === "D" ||
                          hazmatDisable === "E"
                          ? false
                          : true
                      }
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <Row>
                    <Col>
                      <FormGroup style={{ marginTop: 32 }}>
                        <Button
                          type="submit"
                          color="primary"
                          className="px-2 buttons-royal"
                          htmlFor="formCompany"
                          block
                        >
                          Save
                        </Button>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup style={{ marginTop: 32 }}>
                        <Button
                          type="button"
                          color="primary"
                          className="px-2 buttons-royal"
                          htmlFor="formCompany"
                          block
                        >
                          Cancel
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Collapse>
          <br />
          {/*----------------------------------------------------------------*/}
          <Row>
            <Col mb="4" sm="12" xs="12">
              <FormGroup>
                <div
                  className="cursor-menu"
                  onClick={() =>
                    this.setState({
                      VyDInforToggle: !this.state.VyDInforToggle,
                    })
                  }
                >
                  <h5>
                    {this.state.VyDInforToggle ? (
                      <img
                        src={collapseOpen}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    ) : (
                      <img
                        src={collapseClose}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    )}
                    Vehicle & Driver Information
                  </h5>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Collapse isOpened={this.state.VyDInforToggle}>
            <div className="p-3 mb-2 bg-light" style={{ borderRadius: "10px" }}>
              <Row>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label
                      htmlFor="Powerunit"
                      style={{ alignItems: "center", fontSize: "large" }}
                    >
                      Total Power Units:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.props.Vehicles == undefined
                        ? ""
                        : this.props.Vehicles.length}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i
                        id="totalPU"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="totalPU">
                        Total number of power units owned, trip-leased, and
                        term-leased by the company.
                      </UncontrolledTooltip>
                    </label>
                    {/* <input
                    type="text"
                    defaultValue={this.props.Vehicles == undefined ? "" : this.props.Vehicles.length}
                    className="form-control"
                    maxLength="20"
                    pattern="[0-9]+"
                    title="Only numbers are allowed"
                    name="Powerunit"
                  /> */}
                  </FormGroup>
                </Col>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label
                      htmlFor="DriverTotal"
                      style={{ alignItems: "center", fontSize: "large" }}
                    >
                      Total Drivers:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.props.driverList == undefined
                        ? ""
                        : this.props.driverList.length}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i
                        id="totalD"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="totalD">
                        Total number of drivers employed by the company.
                      </UncontrolledTooltip>
                    </label>
                    {/* <input
                    type="text"
                    defaultValue={this.props.driverList.length}
                    className="form-control"
                    maxLength="20"
                    pattern="[0-9]+"
                    title="Only numbers are allowed"
                    name="DriverTotal"
                  /> */}
                  </FormGroup>
                </Col>
                {/* <Col lg="4" mb="4" sm="12" xs="12">
                <Row>
                  <Col>
                    <FormGroup style={{ marginTop: 32 }}>
                      <Button
                        type="submit"
                        color="primary"
                        className="px-2 buttons-royal"
                        htmlFor="formCompany"
                        block
                      >
                        Save
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup style={{ marginTop: 32 }}>
                      <Button
                        type="button"
                        color="primary"
                        className="px-2 buttons-royal"
                        htmlFor="formCompany"
                        block
                      >
                        Cancel
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Col> */}
              </Row>
            </div>
          </Collapse>
          <br />
          {/*-----------------------------------------------------------*/}
          <Row>
            <Col mb="4" sm="12" xs="12">
              <FormGroup>
                <div
                  className="cursor-menu"
                  onClick={() =>
                    this.setState({ MCS150Toggle: !this.state.MCS150Toggle })
                  }
                >
                  <h5>
                    {this.state.MCS150Toggle ? (
                      <img
                        src={collapseOpen}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    ) : (
                      <img
                        src={collapseClose}
                        className="img-fluid"
                        width={21}
                        height={21}
                      />
                    )}
                    MCS-150/B
                  </h5>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Collapse isOpened={this.state.MCS150Toggle}>
            <div className="p-3 mb-2 bg-light" style={{ borderRadius: "10px" }}>
              <Row>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="Mcs150Date">
                      Last Filing Date
                      <i
                        id="lastDate"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="lastDate">
                        Indicates the date of the most recent MCS-150 on record
                        for the company.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="date"
                      id="Mcs150Date"
                      defaultValue={convertDate(this.props.company.Mcs150Date)}
                      className="form-control"
                      name="Mcs150Date"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="AddDate">
                      VMT Update Date
                      <i
                        id="vmt"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="vmt">
                        Miles for the last calendar year, as reported by the
                        carrier on the MCS-150 form.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="date"
                      id="AddDate"
                      defaultValue={convertDate(this.props.company.AddDate)}
                      className="form-control"
                      name="AddDate"
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <label htmlFor="IdCode">
                      USDOT PIN
                      <i
                        id="idCode"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="idCode">
                        Motorcarriers need an FMCSA-issued U.S. DOT Number and a
                        U.S. DOT Number Personal Identification Number (PIN)
                        (NOT a Docket Number PIN) to access the Safety
                        Measurement System (SMS) Website.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="text"
                      id="IdCode"
                      defaultValue={this.props.company.Pinnumber}
                      className="form-control"
                      maxLength="20"
                      name="Pinnumber"
                      ref={(IdCode) => (this.IdCode = IdCode)}
                    />
                  </FormGroup> */}
                </Col>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <FormGroup>
                    <label htmlFor="Mcs150Mileage">
                      Vehicle Mileage Traveled
                      <i
                        id="mileage"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="mileage">
                        Calendar year representing the carrier-reported mileage
                        from the MCS-150. This section will not print if no data
                        is available.
                      </UncontrolledTooltip>
                    </label>
                    <input
                      type="text"
                      defaultValue={this.props.company.Mcs150Mileage}
                      className="form-control"
                      maxLength="20"
                      pattern="[0-9]+"
                      title="Only numbers are allowed"
                      name="Mcs150Mileage"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="PcFlag">
                      Passenger Carrier
                      <i
                        id="passenger"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "#3b86ff" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="passenger">
                        Please select if you are a passenger carrier.
                      </UncontrolledTooltip>
                    </label>
                    <select
                      id="PcFlag"
                      value={
                        this.state.PcFlag !== undefined
                          ? this.state.PcFlag
                          : this.props.company.PcFlag !== null
                            ? this.props.company.PcFlag
                            : "N"
                      }
                      className="form-control"
                      name="PcFlag"
                      onChange={this.onChangeR}
                      ref={(PcFlag) => (this.PcFlag = PcFlag)}
                    >
                      <option value="N">No</option>
                      <option value="Y">Yes</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col lg="4" mb="4" sm="12" xs="12">
                  <Row>
                    <Col>
                      <FormGroup style={{ marginTop: 32 }}>
                        <Button
                          type="submit"
                          color="primary"
                          className="px-2 buttons-royal"
                          htmlFor="formCompany"
                          block
                        >
                          Save
                        </Button>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup style={{ marginTop: 32 }}>
                        <Button
                          type="button"
                          color="primary"
                          className="px-2 buttons-royal"
                          htmlFor="formCompany"
                          block
                        >
                          Cancel
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Collapse>
          <br />
          <Row>
            {/* <Col lg='4' md='4' xs='12' sm='12'>
              <FormGroup>
                <Button
                  type='submit'
                  className='px-2 buttons-royal text-white'
                  htmlFor='formCompany'
                  block
                >
                  Save
                </Button>
              </FormGroup>
            </Col> */}
            {/* {this.props.isLoading ? (
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
              <div></div>
            )} */}
            {/* <Col mb="4"></Col>
            <Col mb="4"></Col> */}
          </Row>
          {/* <Row>
            <Col sm="12">
              <FormGroup>

              </FormGroup>
            </Col>
          </Row> */}
        </Form>
        <Col mb="12">
          {this.props.resize ? (
            <>
              <div className="row">
                <strong style={{ padding: 0, fontSize: "18px", marginTop: 0 }}>
                  By signing I fully Accept that read and agree the: &nbsp;
                </strong>
                <AccountAgreement
                  company={this.props.company}
                  signaureDate={this.props.signatureDate} />
              </div>
              <div>
                <Signature
                  id={id}
                  saveSignatureFile={this.props.saveSignatureFile}
                  signature={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/signature.png`}
                  p={
                    JSON.parse(localStorage.getItem("user")).Role === "ADMIN"
                      ? false
                      : true
                  }
                />
              </div>
            </>
          ) : null}
        </Col>

        <FormGroup>
          <Row>
            <Col lg="4">
              <MCS150PDFprueba1
                loading={this.props.isCompany}
                loadingTrailers={this.props.isLoadingMCS}
                loadingVehicles={this.props.isVehiclesLoading}
                loadingDrivers={this.props.isLoadingDriver}
                loadingHm={this.props.isLoadingHm}
                loadingOC={this.props.isLoadingOC}
                IdUser={id}
                upload={this.props.uploadFile}
                getData={this.props.getDataCompany}
                companyData={this.props.formData}
                Company={this.props.company}
                // operationC={this.props.OperationC}
                cargoC={this.props.cargoC}
                // hazardMaterials={this.props.HmCompany}
                stateName={stateName.filter(
                  (state) => state.Id == this.props.company.PhysicalState
                )}
                cityName={cityName.filter(
                  (state) => state.Id == this.props.company.PhysicalCity
                )}
                mailingStateName={stateName.filter(
                  (state) => state.Id == this.props.company.MailState
                )}
                mailingCityname={cityName.filter(
                  (state) => state.Id == this.props.company.MailCity
                )}
                operationClass={this.props.OperationC}
                // cargoClass={this.props.cargoC}
                hmClass={this.props.HmCompany}
                driverList={this.props.driverList}
                vehicles={this.props.Vehicles}
                trailers={this.props.trailers}
                update={this.props.updateCompanyNotifications}
              // Statenotification={this.props.Statenotification}
              />
              {/* <EmailNotification /> */}
              {/* <PdfMCS150
                getData={this.props.getDataCompany}
                companyData={this.props.formData}
                operationC={this.props.OperationC}
                cargoC={this.props.cargoC}
                hazardMaterials={this.props.HmCompany}
              /> */}
            </Col>
          </Row>
        </FormGroup>
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(AccountInfo);
