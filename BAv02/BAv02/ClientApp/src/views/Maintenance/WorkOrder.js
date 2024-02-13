import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CustomInput,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
  Alert
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/WorkOrder";
import { Link } from "react-router-dom";
import dateConvertTables from "./../../services/dateConvertTables";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";
import TableCom from "./../../components/Table";
import AlertDelete from "./../../components/AlertDelete";
import NumberFormat from "react-number-format";
import DatePicker from "./../../components/DatePicker";
import ToastAlert from "./../../components/ToastAlert";
import SimpleImageSlider from "react-simple-image-slider";
import Swal from "sweetalert2";
import axios from "axios";
import "./WorkOrder.css";

const idCompany = localStorage["idCompany"];
const idU = JSON.parse(localStorage.getItem("user")).Id;
const imgVehicleType = (VehicleType) => {
  let img = '';

  if (VehicleType) {
    switch (VehicleType.trim().toLowerCase()) {
      case 'truck':
        img = 'assets/icons/icons8-truck.svg';
        break;
      case 'car':
        img = 'assets/icons/icons8-car.svg';
        break;
      case 'tow truck':
        img = 'assets/icons/icons8-tow-truck.svg';
        break;
      case 'bus':
        img = 'assets/icons/icons8-bus.svg';
        break;
      case 'flatbed truck':
        img = 'assets/icons/icons8-in-flat-bed.svg';
        break;
      case 'pick-up':
        img = 'assets/icons/icons8-pickup.svg';
        break;
      case 'semi-trailer truck':
        img = 'assets/icons/icons8-semi-truck.svg';
        break;
      case 'van':
        img = 'assets/icons/icons8-vanpool.svg';
        break;
      default:
        img = 'assets/icons/icons8-truck.svg';
        break;
    }
  }

  return img;
};

class WorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { Status: "", rO: "", File: [], checkNoNextInspectionService: false, NextServiceType: "", Type: "SELECT", isEditMode: false, check123: 1, DateWorkOrderClosed: "", typeWO: ""};
    this.temp = [];
    this.onChange = this.onChange.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeR = this.onChangeR.bind(this);
    this.externalServices = this.externalServices.bind(this);
    this.onChangeNoNextInspection = this.onChangeNoNextInspection.bind(this);
    this.saveWorkOrder = this.saveWorkOrder.bind(this);
    this.saveService = this.saveService.bind(this);
    this.readFile = this.readFile.bind(this);
    this.saveMaterial = this.saveMaterial.bind(this);
    this.onClickReSendEmail = this.onClickReSendEmail.bind(this);
    this.disabledInputsWorkOrder = this.disabledInputsWorkOrder.bind(this);
    this.saveNextInspection = this.saveNextInspection.bind(this);
  }

  componentDidMount() {
    // Id WorkOrder = this.props.match.params.id
    this.props.getWorkOrder(
      this.props.match.params.id,
      idU
    );
    this.props.getServices(this.props.match.params.id, 1, 10);
    this.props.getMateriales(this.props.match.params.id, 1, 10);
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.workOrder !== prevProps.workOrder) {
      this.props.getWorkOrderImages(this.props.workOrder.Id);
      if (this.props.workOrderImages.length > 0) {
        for (var i = 0; i < this.props.workOrderImages.length; i++) {
          this.temp[i] = `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/WorkOrders/WorkOrdersImages/${this.props.workOrder.IdVehicle}/${this.props.workOrderImages[i].DocName}`
        }
      }
      this.setState();
    }
  }

  componentWillUnmount() {
    this.props.clean();
  }

  saveNextInspection(e) {
    e.preventDefault();
    var NI = new FormData(e.target);
    NI.append("id", this.props.match.params.id);
    NI.append("idCompany", idCompany);
    NI.append("idU", idU);
    NI.append("external", this.props.workOrder.ExternalServices);
    NI.append("checkNoNextInspectionServiceA", document.getElementById("checkNoNextInspectionService").checked);
    this.props.saveWorkOrderNextInspection(NI);
  }

  disabledInputsWorkOrder() {
    this.setState({ isEditMode: !this.state.isEditMode });
    if (this.state.isEditMode == false) {
      document.getElementById('mileageTime').disabled = false;
      document.getElementById('mileageTime').readOnly = false;
      document.getElementById('AssignedTo').disabled = false;
      document.getElementById('AssignedTo').readOnly = false;
      document.getElementById('Type').disabled = false;
      document.getElementById('ServiceType').disabled = false;
      document.getElementById('ServiceType').readOnly = false;
      document.getElementById('WorkRequest').disabled = false;
      document.getElementById('WorkRequest').readOnly = false;
    } else {
      var odometer = document.getElementById('mileageTime').value.toString();
      var assigned = document.getElementById('AssignedTo').value;
      var typeWO = document.getElementById('Type').value;
      var servicetype = document.getElementById('ServiceType').value;
      var workrequest = document.getElementById('WorkRequest').value;
      if (odometer == "") {
        odometer = null;
      }
      if (servicetype == "") {
        servicetype = null;
      }
      if (workrequest == "") {
        workrequest = null;
      }
      if (
        (odometer != this.props.workOrder.MileageTime) ||
        (assigned != this.props.workOrder.AssignedTo) ||
        (typeWO != this.props.workOrder.Type) ||
        (servicetype != this.props.workOrder.ServiceType) ||
        (workrequest != this.props.workOrder.WorkRequest)
      ) {
        var WO = new FormData(document.getElementById('saveWorkOrder'));
        WO.append("id", this.props.match.params.id);
        WO.append("external", this.props.workOrder.ExternalServices);
        this.props.saveWorkOrder(WO);
      }
      document.getElementById('mileageTime').disabled = true;
      document.getElementById('mileageTime').readOnly = true;
      document.getElementById('AssignedTo').disabled = true;
      document.getElementById('AssignedTo').readOnly = true;
      document.getElementById('Type').disabled = true;
      document.getElementById('Type').readOnly = true;
      document.getElementById('ServiceType').disabled = true;
      document.getElementById('ServiceType').readOnly = true;
      document.getElementById('WorkRequest').disabled = true;
      document.getElementById('WorkRequest').readOnly = true;
    }
  }

  onClickReSendEmail() {
    Swal.fire({
      text: 'Please enter your email address',
      input: 'email',
      inputPlaceholder: 'Email',
      color: '#000000',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Send Email',
      confirmButtonColor: '#5594d7',
      cancelButtonColor: '#f86c6b',
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {
        try {
          if (email.includes('@')) {
            const response = await axios.post("/api/Maintenance/ReSendEmailWorkOrder?email=" + email + "&idU=" + idU);
            const responseData = JSON.parse(response.data);
            if (responseData.status != 0) {
              throw new Error(response.statusText);
            }
          } else {
            throw new Error("ingrese email");
          }
        } catch (error) {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Message sent`,
          confirmButtonColor: '#5594d7',
        })
      }
    })
  }

  onChange(event, rO) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (name === "Status" && value === "Contractor") {
      this.props.workOrder.ExternalServices = true;
      rO = true;
    } else {
      this.props.workOrder.ExternalServices = false;
    }
  }

  onChangeType(event) {
    const { name, value } = event.target;
    this.setState({ typeWO: value });
  }

  externalServices(event, rO, Status) {
    if (
      this.props.workOrder.ExternalServices === 1 ||
      this.props.workOrder.ExternalServices === true
    ) {
      this.props.workOrder.ExternalServices = false;
      Status = "Open";
      rO = "";
    } else {
      this.props.workOrder.ExternalServices = true;
      Status = "Contractor";
      rO = true;
    }
    this.setState({ value: event.target.value });
  }

  onChangeNoNextInspection() {
    this.setState({ checkNoNextInspectionService: !this.state.checkNoNextInspectionService });
    this.setState({ check123: 2});
  }

  saveWorkOrder(e) {
    e.preventDefault();
    var WO = new FormData(e.target);
    WO.append("id", this.props.match.params.id);
    WO.append("external", this.props.workOrder.ExternalServices);
    this.props.saveWorkOrder(WO);
  }

  saveService(e) {
    e.preventDefault();
    var S = new FormData(e.target);
    S.append("idWO", this.props.match.params.id);
    this.props.addService(S);

    document.getElementById("service").value = "";
    document.getElementById("des").value = "";
    this.setState({ DateWorkOrderClosed: "", });
  }

  readFile(e) {
    var input = e.target;
    var nameFile = input.files[0].name.substr(-4);
    if (input) {
      var reader = new FileReader();
      var pdf = "";
      reader.onload = (e) => {
        pdf = base64ToByteArray2(e.target.result);
        if (nameFile === ".pdf") {
          document.getElementById("error").style.display = "none";
          this.setState({ File: pdf });
        } else {
          document.getElementById("error").style.display = "inline-block";
          this.setState({ File: "" });
        }
      };

      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) { }
    }
  }

  saveMaterial(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form.append("idCompany", localStorage["idCompany"]);
    form.append("idwo", this.props.match.params.id);
    form.append("file", this.state.File);
    this.props.addMaterial(form);

    document.getElementById("Quantity").value = "";
    document.getElementById("desm").value = "";
    document.getElementById("Cost").value = "";
    document.getElementById("filect").value = "";
    document.getElementById("TypeA").value = "SELECT";
  }

  onChangeR(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    let rep = ["SERVICE PERFORMED", "DESCRIPTION", "TASK PERFORMED DAY/CLOSED", "DELETE"];

    let rowItems = this.props.service.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.ServiceDue}</td>
        <td className="text-center">{row.Description}</td>
        <td className="text-center">{dateConvertTables(row.DateWorkOrderClosed)}</td>
        <td className="text-center">
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              this.props.toggleDS(row.Id);
            }}
          ></i>
        </td>
      </tr>
    ));

    let repM = ["QUANTITY", "TYPE", "DESCRIPTION", "COST", "DOWNLOAD", "DELETE"];

    let rowItemsM = this.props.material.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.Quantity}</td>
        <td className="text-center">{row.Type}</td>
        <td className="text-center">{row.Description}</td>
        <td className="text-center">{row.Cost}</td>
        <td className="text-center">
          <Button
            outline
            color="primary"
            onClick={() => {
              this.props.downloadWorkOrderFile(
                idCompany,
                this.props.match.params.id,
                row.InvoiceFile
              );
            }}
          >
            Download
          </Button>
        </td>
        <td className="text-center">
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              this.props.toggleDM(row.Id, row.invoice);
            }}
          ></i>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <div className="animated fadeIn">
          {/* DRIVER */}
          {/*LEVEL 1*/}
          <Row>
            <Col
              // sm="3"
              md="6"
            >
              <Card className="text-center">
                <CardBody className="text-white" style={{ backgroundColor: "#5593d7" }}>
                  <div className="text-center">
                    {this.props.unity ? (
                      <img
                        alt="vehicle"
                        src={
                          this.props.workOrder.VehicleType == 'VEHICLE' ?
                            this.props.unity.FileImage === null ?
                              imgVehicleType(this.props.unity.VehicleType) :
                              `https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.unity.IdCompany}/TrucksFile/${this.props.unity.Id}/truckAvatar.png`
                            : this.props.unity.FileImage === null ?
                              'assets/maintenancePdf/Images/defaultTrailer.png' :
                              `https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.unity.IdCompany}/TrailersFile/${this.props.unity.IdTrailer}/trailerAvatar.png`
                        }
                        id="image"
                        className="img-avatar"
                        width="150px"
                        height="150px"
                      />
                    ) : (
                      ""
                    )}
                    <span className="avatar-status badge-danger"></span>
                  </div>
                  {this.props.unity ? (
                    <div className="text-center">
                      {this.props.unity.VehicleNumber}
                      {this.props.unity.TrailerNumber}
                    </div>
                  ) : (
                    ""
                  )}
                </CardBody>
                <CardFooter>
                  <div>
                    VIN | {this.props.unity ? this.props.unity.Vin : ""}{" "}
                  </div>
                  <div className="small text-muted">
                    <span>Information</span>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardBody className="text-center">
                  <Row>
                    <Col md="5" style={{ textAlign: "end" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.Make : ""}
                      </Label>
                    </Col>
                    <Col md="0">
                      |
                    </Col>
                    <Col md="5" style={{ textAlign: "start" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.Year : ""}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" style={{ textAlign: "end" }}>
                      <Label htmlFor="text-input">
                        PLATE
                      </Label>
                    </Col>
                    <Col md="0">
                      |
                    </Col>
                    <Col md="5" style={{ textAlign: "start" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.Plate : ""}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" style={{ textAlign: "end" }}>
                      <Label htmlFor="text-input">
                        MODEL
                      </Label>
                    </Col>
                    <Col md="0">
                      |
                    </Col>
                    <Col md="5" style={{ textAlign: "start" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.Model : ""}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" style={{ textAlign: "end" }}>
                      <Label htmlFor="text-input">
                        WEIGHT
                      </Label>
                    </Col>
                    <Col md="0">
                      |
                    </Col>
                    <Col md="5" style={{ textAlign: "start" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.Weight : ""}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" style={{ textAlign: "end" }}>
                      <Label htmlFor="text-input">
                        ENGINE
                      </Label>
                    </Col>
                    <Col md="0">
                      |
                    </Col>
                    <Col md="5" style={{ textAlign: "start" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.Engine : ""}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" style={{ textAlign: "end" }}>
                      <Label htmlFor="text-input">
                        TIRE
                      </Label>
                    </Col>
                    <Col md="0">
                      |
                    </Col>
                    <Col md="5" style={{ textAlign: "start" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.TireSize : ""}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" style={{ textAlign: "end" }}>
                      <Label htmlFor="text-input">
                        FUEL
                      </Label>
                    </Col>
                    <Col md="0">
                      |
                    </Col>
                    <Col md="5" style={{ textAlign: "start" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.FuelType : ""}
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" style={{ textAlign: "end" }}>
                      <Label htmlFor="text-input">
                        MILEAGE
                      </Label>
                    </Col>
                    <Col md="0">
                      |
                    </Col>
                    <Col md="5" style={{ textAlign: "start" }}>
                      <Label htmlFor="text-input">
                        {this.props.unity ? this.props.unity.Miles : ""}
                      </Label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/*LEVEL 2*/}
          <Row style={{ justifyContent: "center" }}>
            <Col
              // sm="9"
              md="12"
            >
              <Card>
                <CardHeader className="text-center">
                  <h5>WORK ORDER </h5>
                  <div className="card-header-actions">
                    {this.state.isEditMode ?
                      <Button
                        size="md"
                        outline
                        color="primary"
                        onClick={this.disabledInputsWorkOrder}
                      >
                        Save
                      </Button> :
                      <Button
                        size="md"
                        outline
                        color="primary"
                        onClick={this.disabledInputsWorkOrder}
                      >
                        Edit
                      </Button>}
                    <Link to={"/Maintenance"} style={{ marginLeft: "10px" }}>
                      <Button size="md" color="primary">
                        Back
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form id="saveWorkOrder">
                    <FormGroup row>
                      <Col md="6">
                        <Label htmlFor="text-input">Vehicle Type</Label>
                        <Input
                          className="form-control"
                          type="text"
                          id="VehicleType"
                          name="VehicleType"
                          defaultValue={this.props.workOrder.VehicleType}
                          readOnly
                          disabled={true}
                        />
                      </Col>
                      <Col md="6">
                        <Label htmlFor="text-input">Vehicle Number</Label>
                        <Input
                          className="form-control"
                          type="text"
                          id="UnitNumber"
                          name="UnitNumber"
                          defaultValue={this.props.workOrder.VehicleType == "VEHICLE" ? this.props.unity.VehicleNumber : this.props.unity.TrailerNumber}
                          readOnly
                          disabled={true}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="6">
                        <DatePicker
                          className="form-control"
                          id="date"
                          name="CreatedDate"
                          labelText="Issue Date"
                          readOnly
                          disabled={true}
                          value={dateConvertTables(
                            this.props.workOrder.CreatedDate
                          )}
                        />
                      </Col>
                      <Col>
                        <Label htmlFor="text-input">Reported By</Label>
                        <Input
                          className="form-control"
                          type="text"
                          id="ReportedBy"
                          name="ReportedBy"
                          defaultValue={this.props.reportedBy}
                          readOnly
                          disabled={true}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="6">
                        <Label htmlFor="text-input">Odometer</Label>
                        <Input
                          className="form-control"
                          type="text"
                          id="mileageTime"
                          name="mileageTime"
                          defaultValue={this.props.workOrder.MileageTime}
                          readOnly
                          disabled={true}
                        />
                      </Col>
                      <Col>
                        <Label htmlFor="text-input">Assigned To</Label>
                        <Input
                          className="form-control"
                          type="text"
                          id="AssignedTo"
                          name="AssignedTo"
                          defaultValue={this.props.workOrder.AssignedTo}
                          readOnly
                          disabled={true}
                          required
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="12">
                        <Button size="md" outline color="primary" onClick={this.onClickReSendEmail}>
                          Re-send Email
                        </Button>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="6">
                        <Label htmlFor="text-input">Work Order Type</Label>
                        <select
                          id="Type"
                          name="Type"
                          className="form-control"
                          onChange={this.onChangeType}
                          value={
                            (this.props.workOrder.Type !== "") &&
                            (this.state.typeWO === "") ? 
                            this.props.workOrder.Type : 
                            this.state.typeWO
                          }
                          disabled={true}
                          required
                        >
                          <option disabled value="SELECT">SELECT</option>
                          <option value="Inspection">Inspection</option>
                          <option value="Service">Service</option>
                          <option value="Repair">Repair</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </Col>
                      <Col md="6">
                        <Label htmlFor="text-input">Work Order Service</Label>
                        <Input
                          className="form-control"
                          type="text"
                          id="ServiceType"
                          name="ServiceType"
                          defaultValue={this.props.workOrder.ServiceType}
                          readOnly
                          disabled={true}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="12">
                        <Label htmlFor="text-input">Work Order Description</Label>
                        <Input
                          className="form-control"
                          type="text"
                          id="WorkRequest"
                          name="WorkRequest"
                          defaultValue={this.props.workOrder.WorkRequest}
                          readOnly
                          disabled={true}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row style={{ justifyContent: "center" }}>
                      {this.temp.length > 0 ? (
                        <Col md="6">
                          <div style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: '30px' }}>
                            <Card>
                              <SimpleImageSlider
                                style={{ backgroundPositionX: "center", backgroundPositionY: "center" }}
                                width="100%"
                                height={375}
                                images={this.temp}
                                showNavs={true}
                                navStyle={1}
                                showBullets={true}
                              />
                            </Card>
                          </div>
                        </Col>
                      ) : null}
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <FormGroup className="text-center">
                    <h6>PARTS/MATERIALS</h6>
                  </FormGroup>
                  <Form onSubmit={this.saveMaterial}>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">Quantity</Label>
                        <Input
                          type="text"
                          id="Quantity"
                          name="Quantity"
                          maxLength="5"
                          pattern="[0-9]+"
                          required
                        />
                      </Col>
                      <Col md="2">
                        <Label htmlFor="text-input">Type</Label>
                        <select
                          id="TypeA"
                          name="Type"
                          className="form-control"
                          onChange={this.onChangeR}
                          required
                          defaultValue={this.state.Type}
                        >
                          <option value="SELECT" disabled >SELECT</option>
                          <option value="Materials">Materials</option>
                          <option value="Parts">Parts</option>
                        </select>
                      </Col>
                      <Col md="6">
                        <Label htmlFor="text-input">Description</Label>
                        <Input
                          type="text"
                          id="desm"
                          name="Description"
                          required
                        />
                      </Col>
                      <Col md="2">
                        <Label htmlFor="text-input">Cost</Label>
                        <NumberFormat
                          thousandSeparator={true}
                          prefix={"$"}
                          id="Cost"
                          name="Cost"
                          className="form-control"
                          required
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <Label
                          className="error"
                          id="error"
                          style={{
                            display: "none",
                            marginLeft: "10px",
                            fontSize: "8pt",
                          }}
                        >
                          File not supported
                        </Label>
                        <CustomInput
                          type="file"
                          accept=".pdf"
                          id="filect"
                          name="invoice"
                          onChange={this.readFile}
                          required
                        />
                        <div className="small text-muted">
                          <span> (Upload your invoice or receipt)</span>
                        </div>
                      </Col>
                      <Col md="6">
                        <Button size="md" outline color="primary">
                          Add
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                  <FormGroup>
                    {
                      rowItemsM.length > 0 ? (
                        <TableCom
                          rowItems={rowItemsM}
                          header={repM}
                          count={this.props.countM}
                          page={this.props.pageM}
                          getItems={(index) => {
                            this.props.getMateriales(
                              this.props.match.params.id,
                              index,
                              10
                            );
                          }}
                        />
                      ) : null
                    }

                    <AlertDelete
                      message="You are sure that delete that material"
                      modal={this.props.modalDM}
                      toggle={() => {
                        this.props.toggleDM(
                          this.props.idDeleteM,
                          this.props.fileToDelete
                        );
                      }}
                      delete={() => {
                        this.props.deleteMaterial(
                          this.props.idDeleteM,
                          this.props.match.params.id,
                          idCompany,
                          this.props.fileToDelete
                        );
                      }}
                    />
                  </FormGroup>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <FormGroup className="text-center">
                    <h6>TASK PERFORMED</h6>
                  </FormGroup>
                  <Form onSubmit={this.saveService}>
                    <FormGroup row>
                      <Col md="4">
                        <Label htmlFor="text-input">Service Performed </Label>
                        <Input
                          type="text"
                          id="service"
                          name="ServiceDue"
                          required
                        />
                      </Col>
                      <Col md="6">
                        <Label htmlFor="text-input">Description</Label>
                        <Input
                          type="text"
                          id="des"
                          name="Description"
                          required
                        />
                      </Col>
                      <Col md="2">
                        <DatePicker
                          className="form-control"
                          id="DateWorkOrderClosed"
                          name="DateWorkOrderClosed"
                          labelText="Date Work Order Closed"
                          value={this.state.DateWorkOrderClosed}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col md="12">
                        <Button size="md" outline color="primary">
                          Add
                        </Button>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="12">
                        {
                          rowItems.length > 0 ?
                            (
                              <TableCom
                                rowItems={rowItems}
                                header={rep}
                                count={this.props.countS}
                                page={this.props.pageS}
                                getItems={(index) => {
                                  this.props.getServices(
                                    this.props.match.params.id,
                                    index,
                                    10
                                  );
                                }}
                              />
                            ) : null
                        }
                      </Col>
                      <AlertDelete
                        message="You are sure that delete that service"
                        modal={this.props.modalDS}
                        toggle={() => {
                          this.props.toggleDS(this.props.idDeleteS);
                        }}
                        delete={() => {
                          this.props.deleteService(
                            this.props.idDeleteS,
                            this.props.match.params.id
                          );
                        }}
                      />
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <FormGroup className="text-center">
                    <h6>NEXT INSPECTION</h6>
                  </FormGroup>
                  <Form onSubmit={this.saveNextInspection}>
                    <FormGroup row>
                      <Col style={{ marginLeft: "10px" }} md="12">
                        <input
                          id="checkNoNextInspectionService"
                          name="checkNoNextInspectionService"
                          type="checkbox"
                          onChange={this.onChangeNoNextInspection}
                          defaultChecked={this.props.workOrder.checkNoNextInspectionService}
                          className="mr-2"
                        />
                        <label htmlFor="checkNoNextInspectionService" style={{ fontSize: "1rem" }}>
                          &nbsp;No next inspection/service schedule
                        </label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4">
                        <DatePicker
                          id="DateNextInspectionService"
                          name="DateNextInspectionService"
                          className="form-control"
                          labelText="Date of Next Inspection/Service"
                          disabled={
                            this.state.check123 != 1 ?
                              this.state.checkNoNextInspectionService :
                              this.props.workOrder.checkNoNextInspectionService == null ?
                                false :
                                this.props.workOrder.checkNoNextInspectionService
                          }
                          value={dateConvertTables(
                            this.props.workOrder.DateNextInspectionService
                          )}
                        />
                      </Col>
                      <Col md="4">
                        <Label htmlFor="text-input">Next Service Type</Label>
                        <select
                          id="NextServiceType"
                          name="NextServiceType"
                          className="form-control"
                          onChange={this.onChange}
                          value={
                            (this.props.workOrder.NextServiceType !== "") &&
                              (this.state.NextServiceType === "")
                              ? this.props.workOrder.NextServiceType
                              : this.state.NextServiceType
                          }
                          required
                          disabled={
                            this.state.check123 != 1 ?
                              this.state.checkNoNextInspectionService :
                              this.props.workOrder.checkNoNextInspectionService == null ?
                                false :
                                this.props.workOrder.checkNoNextInspectionService
                          }
                        >
                          <option value="SELECT">SELECT</option>
                          <option value="Inspection">Inspection</option>
                          <option value="Service">Service</option>
                          <option value="Repair">Repair</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </Col>
                      <Col md="4">
                        <Label htmlFor="text-input">Next Odometer Reminder</Label>
                        <Input
                          id="NextOdometerReminder"
                          name="NextOdometerReminder"
                          className="form-control"
                          type="text"
                          defaultValue={this.props.workOrder.NextOdometerReminder}
                          disabled={
                            this.state.check123 != 1 ?
                              this.state.checkNoNextInspectionService :
                              this.props.workOrder.checkNoNextInspectionService == null ?
                                false :
                                this.props.workOrder.checkNoNextInspectionService
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      {
                        this.state.Status !== "" ?
                          (
                            this.state.Status === "Open" ?
                              (
                                // this.state.Status !== "Open" ? Verdadero
                                <Alert color='warning'>
                                  <Row className='Alert'>
                                    <Col md='10' className='AlertTextColumn align-self-center'>
                                      <Row>
                                        <Col md="8">
                                          <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                                            <Label htmlFor="text-input"><strong>Status</strong></Label>
                                          </p>
                                          <select

                                            name="Status"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={
                                              (this.props.workOrder.Status !== "") &
                                                (this.state.Status === "")
                                                ? this.props.workOrder.Status
                                                : this.state.Status
                                            }

                                            required
                                          >
                                            <option value="Open">Open</option>
                                            <option value="In Process">In Process</option>
                                            <option value="Contractor">Contractor</option>
                                            <option value="Stand by">Stand by</option>
                                            <option value="Closed">Closed</option>
                                          </select>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md='2' className='AlertIconColumn pull-right' style={{ alignSelf: "center" }}>
                                      <div className='iconImgContainer pull-right'>
                                        <img
                                          className='imgFile pull-right'
                                          src='assets/icons/icons8-box-important.svg'
                                          crossOrigin='anonymous'
                                          alt='ok'
                                        ></img>
                                      </div>
                                    </Col>
                                  </Row>
                                </Alert>
                              ) : (
                                // this.state.Status !== "Open" ? Falso
                                this.state.Status === "Closed" ?
                                  (
                                    //this.state.Status === "Closed" ? Verdadero
                                    <Alert color='success'>
                                      <Row className='Alert'>
                                        <Col md='10' className='AlertTextColumn align-self-center'>
                                          <Row>
                                            <Col md="8">
                                              <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                                                <Label htmlFor="text-input"><strong>Status</strong></Label>
                                              </p>
                                              <select

                                                name="Status"
                                                className="form-control"
                                                onChange={this.onChange}
                                                value={
                                                  (this.props.workOrder.Status !== "") &
                                                    (this.state.Status === "")
                                                    ? this.props.workOrder.Status
                                                    : this.state.Status
                                                }

                                                required
                                              >
                                                <option value="Open">Open</option>
                                                <option value="In Process">In Process</option>
                                                <option value="Contractor">Contractor</option>
                                                <option value="Stand by">Stand by</option>
                                                <option value="Closed">Closed</option>
                                              </select>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col md='2' className='AlertIconColumn pull-right' style={{ alignSelf: "center" }}>
                                          <div className='iconImgContainer pull-right'>
                                            <img
                                              className='imgFile pull-right'
                                              src='assets/icons/icons8-ok.svg'
                                              crossOrigin='anonymous'
                                              alt='ok'
                                            ></img>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Alert>
                                  ) : (
                                    // this.state.Status === "Closed" ? Falso 
                                    <Alert color='primary'>
                                      <Row className='Alert'>
                                        <Col md='10' className='AlertTextColumn align-self-center'>
                                          <Row>
                                            <Col md="8">
                                              <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                                                <Label htmlFor="text-input"><strong>Status</strong></Label>
                                              </p>
                                              <select

                                                name="Status"
                                                className="form-control"
                                                onChange={this.onChange}
                                                value={
                                                  (this.props.workOrder.Status !== "") &
                                                    (this.state.Status === "")
                                                    ? this.props.workOrder.Status
                                                    : this.state.Status
                                                }

                                                required
                                              >
                                                <option value="Open">Open</option>
                                                <option value="In Process">In Process</option>
                                                <option value="Contractor">Contractor</option>
                                                <option value="Stand by">Stand by</option>
                                                <option value="Closed">Closed</option>
                                              </select>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col md='2' className='AlertIconColumn pull-right' style={{ alignSelf: "center" }}>
                                          <div className='iconImgContainer pull-right'>
                                            <img
                                              className='imgFile pull-right'
                                              src='assets/icons/icons8-box-important.svg'
                                              crossOrigin='anonymous'
                                              alt='ok'
                                            ></img>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Alert>
                                  )
                              )
                          ) : (
                            // this.state.Status !== "Open" ? Falso
                            this.props.workOrder.Status === "Open" || this.state.Status === "Open" ?
                              (
                                // this.props.workOrder.Status === "Open" ? Verdadero
                                <Alert color='warning'>
                                  <Row className='Alert'>
                                    <Col md='10' className='AlertTextColumn align-self-center'>
                                      <Row>
                                        <Col md="8">
                                          <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                                            <Label htmlFor="text-input"><strong>Status</strong></Label>
                                          </p>
                                          <select

                                            name="Status"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={
                                              (this.props.workOrder.Status !== "") &
                                                (this.state.Status === "")
                                                ? this.props.workOrder.Status
                                                : this.state.Status
                                            }

                                            required
                                          >
                                            <option value="Open">Open</option>
                                            <option value="In Process">In Process</option>
                                            <option value="Contractor">Contractor</option>
                                            <option value="Stand by">Stand by</option>
                                            <option value="Closed">Closed</option>
                                          </select>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col md='2' className='AlertIconColumn pull-right' style={{ alignSelf: "center" }}>
                                      <div className='iconImgContainer pull-right'>
                                        <img
                                          className='imgFile pull-right'
                                          src='assets/icons/icons8-box-important.svg'
                                          crossOrigin='anonymous'
                                          alt='ok'
                                        ></img>
                                      </div>
                                    </Col>
                                  </Row>
                                </Alert>
                              ) : (
                                // this.props.workOrder.Status === "Open" ? Falso
                                this.props.workOrder.Status === "Closed" ?
                                  (
                                    // this.props.workOrder.Status === "Closed" ? Verdadero
                                    <Alert color='success'>
                                      <Row className='Alert'>
                                        <Col md='10' className='AlertTextColumn align-self-center'>
                                          <Row>
                                            <Col md="8">
                                              <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                                                <Label htmlFor="text-input"><strong>Status</strong></Label>
                                              </p>
                                              <select

                                                name="Status"
                                                className="form-control"
                                                onChange={this.onChange}
                                                value={
                                                  (this.props.workOrder.Status !== "") &
                                                    (this.state.Status === "")
                                                    ? this.props.workOrder.Status
                                                    : this.state.Status
                                                }

                                                required
                                              >
                                                <option value="Open">Open</option>
                                                <option value="In Process">In Process</option>
                                                <option value="Contractor">Contractor</option>
                                                <option value="Stand by">Stand by</option>
                                                <option value="Closed">Closed</option>
                                              </select>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col md='2' className='AlertIconColumn pull-right' style={{ alignSelf: "center" }}>
                                          <div className='iconImgContainer pull-right'>
                                            <img
                                              className='imgFile pull-right'
                                              src='assets/icons/icons8-ok.svg'
                                              crossOrigin='anonymous'
                                              alt='ok'
                                            ></img>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Alert>
                                  ) : (
                                    // this.props.workOrder.Status === "Closed" ? Falso
                                    <Alert color='primary'>
                                      <Row className='Alert'>
                                        <Col md='10' className='AlertTextColumn align-self-center'>
                                          <Row>
                                            <Col md="8">
                                              <p style={{ fontSize: "16px", marginTop: 0, marginBottom: 0 }}>
                                                <Label htmlFor="text-input"><strong>Status</strong></Label>
                                              </p>
                                              <select

                                                name="Status"
                                                className="form-control"
                                                onChange={this.onChange}
                                                value={
                                                  (this.props.workOrder.Status !== "") &
                                                    (this.state.Status === "")
                                                    ? this.props.workOrder.Status
                                                    : this.state.Status
                                                }

                                                required
                                              >
                                                <option value="Open">Open</option>
                                                <option value="In Process">In Process</option>
                                                <option value="Contractor">Contractor</option>
                                                <option value="Stand by">Stand by</option>
                                                <option value="Closed">Closed</option>
                                              </select>
                                            </Col>
                                          </Row>
                                        </Col>
                                        <Col md='2' className='AlertIconColumn pull-right' style={{ alignSelf: "center" }}>
                                          <div className='iconImgContainer pull-right'>
                                            <img
                                              className='imgFile pull-right'
                                              src='assets/icons/icons8-box-important.svg'
                                              crossOrigin='anonymous'
                                              alt='ok'
                                            ></img>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Alert>
                                  )
                              )
                          )
                      }
                    </FormGroup>
                    <FormGroup row>
                      <Col md="6">
                        <Button size="md" outline color="primary">
                          Save
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.workOrders,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(WorkOrder);