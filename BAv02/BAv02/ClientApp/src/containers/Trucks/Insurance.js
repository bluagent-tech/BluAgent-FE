import React, { Component } from "react";
import { Col, Row, Button, Label, FormGroup, Input, Form } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Trucks";
import dateConvertTables from "../../services/dateConvertTables";
import DatePicker from "../../components/DatePicker";

class Insurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PolicyTerm: "",
      OperationRadius: "",
      PortEntry: "",
      InsuranceName: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSumit = this.handleSumit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSumit(e) {
    e.preventDefault();
    var insurance = new FormData(e.target);
    insurance.append("id", this.props.id);
    insurance.append("iduser", JSON.parse(localStorage.getItem("user")).Id);
    this.props.saveDataInsurance(insurance);
  }

  render() {
    return (
      <Col className="mb-4" style={{ marginTop: "4%" }}>
        <Form onSubmit={this.handleSumit}>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">Insurance Provider</Label>
              <select
                name="InsuranceName"
                className="form-control"
                onChange={this.onChange}
                value={
                  (this.props.truck.InsuranceName !== null) &
                  (this.state.InsuranceName === "")
                    ? this.props.truck.InsuranceName
                    : this.state.InsuranceName
                }
                required
              >
                <option value="">SELECT</option>
                <option value="New Business">New Business / Nuevo Negocio</option>
                <option value="New Horizon">New Horizon</option>
                <option value="National Unity">National Unity</option>
                <option value="CAIC">CAIC</option>
                <option value="Qualitas">Qualitas</option>
                <option value="Other">Other / Otros</option>
              </select>
            </Col>
            {
                this.state.InsuranceName === "Other" || (this.props.truck.OtherInsurance !== null && this.state.InsuranceName === "") ?
                <Col id="other"  md="4">
                    <Label htmlFor="text-input">Insurance Provider</Label>
                    <Input type="text" defaultValue={this.props.truck.InsuranceName === "Other" && this.state.InsuranceName === "" ? this.props.truck.OtherInsurance : ''} name="OtherInsurance" />
                </Col>
                : ''
            }
            <Col md="4">
            <DatePicker
              id="expdatei"
                name="InsuranceExpiration"
                labelText="Policy Effective Date"
                value={dateConvertTables(this.props.truck.InsuranceExpiration)} 
            />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">Port of Entry</Label>
              <select
                name="PortEntry"
                className="form-control"
                onChange={this.onChange}
                value={
                  (this.props.truck.PortEntry !== null) &
                  (this.state.PortEntry === "")
                    ? this.props.truck.PortEntry
                    : this.state.PortEntry
                }
                required
              >
                    <option value="">SELECT</option>
                    <option style={{ fontWeight: 'bold' }} disabled>Baja California</option>
                    <option value="All ports in AZ,CA,NM,& TX(PST)">All ports in AZ,CA,NM,& TX(PST)</option>
                    <option value="Andrade, CA(PST)">Andrade, CA(PST)</option>
                    <option value="Calexico, CA(PST)">Calexico, CA(PST)</option>
                    <option value="California & Arizona. All Ports(PST)">California & Arizona. All Ports(PST)</option>
                    <option value="San Ysidro / Otay, CA(PST)">San Ysidro / Otay, CA(PST)</option>
                    <option value="Tecate, CA(PST)">Tecate, CA(PST)</option>
                    <option style={{ fontWeight: 'bold' }} disabled>Chihuahua</option>
                    <option value="Columbus / Sta. Teresa, NM(MST)">Columbus / Sta. Teresa, NM(MST)</option>
                    <option value="El Paso, TX(MST)">El Paso, TX(MST)</option>
                    <option value="Presidio, TX(MST)">Presidio, TX(MST)</option>
                    <option value="Texas & New Mexico, All Ports(MST)">Texas & New Mexico, All Ports(MST)</option>
                    <option style={{ fontWeight: 'bold' }} disabled>Sonora</option>
                    <option value="Douglas,AZ(MST)">Douglas,AZ(MST)</option>
                    <option value="El Sasabe, AZ(MST)">El Sasabe, AZ(MST)</option>
                    <option value="Lukevile,AZ(MST)">Lukevile,AZ(MST)</option>
                    <option value="Naco,AZ(MST)">Naco,AZ(MST)</option>
                    <option value="Nogales,AZ(MST)">Nogales,AZ(MST)</option>
                    <option value="San Luis Rio Colorado,AZ(MST)">San Luis Rio Colorado,AZ(MST)</option>
                    <option style={{ fontWeight: 'bold' }} disabled>Tam,Coah, NL</option>
                    <option value="AZ y TX. Todos los puertos(MST)">AZ y TX. Todos los puertos(MST)</option>
                    <option value="Boquillas, TX(CST)">Boquillas, TX(CST)</option>
                    <option value="Brownsville, TX(CST)">Brownsville, TX(CST)</option>
                    <option value="Del Rio, TX(CST)">Del Rio, TX(CST)</option>
                    <option value="Eagle Pass, TX(CST)">Eagle Pass, TX(CST)</option>
                    <option value="Hidalgo, TX(CST)">Hidalgo, TX(CST)</option>
                    <option value="Laredo, TX(CST)">Laredo, TX(CST)</option>
                    <option value="Mission, TX(CST)">Mission, TX(CST)</option>
                    <option value="Pharr, TX(CST)">Pharr, TX(CST)</option>
                    <option value="Progreso, TX(CST)">Progreso, TX(CST)</option>
                    <option value="Rio Grande City, TX(CST)">Rio Grande City, TX(CST)</option>
                    <option value="Roma, TX(CST)">Roma, TX(CST)</option>
                    <option value="Texas, All Ports(CST)">Texas, All Ports(CST)</option>
              </select>
            </Col>
            <Col md="4">
                <Label htmlFor="text-input">Policy Term</Label>
                <select
                    name="PolicyTerm"
                    className="form-control"
                    onChange={this.onChange}
                    value={
                        (this.props.truck.PolicyTerm !== null) &
                    (this.state.PolicyTerm === "")
                    ? this.props.truck.PolicyTerm
                    : this.state.PolicyTerm
                    }
                    required>
                    <option value="">SELECT</option>
                    <option value="1 Month">1 Month</option>
                    <option value="6 Months">6 Months</option>
                    <option value="12 Months">12 Months</option>
                </select>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <Label htmlFor="text-input">Operation Radius</Label>
              <select
                name="OperationRadius"
                className="form-control"
                onChange={this.onChange}
                value={
                  (this.props.truck.OperationRadius !== null) &
                  (this.state.OperationRadius === "")
                    ? this.props.truck.OperationRadius
                    : this.state.OperationRadius
                }
                required
                >
                    <option value="">SELECT</option>
                <option value="50">0 - 50</option>
                <option value="250">0 - 250</option>
                <option value="500">0 - 500</option>
                <option value="750">0 - 750</option>
                <option value="1,000">0 - 1,000</option>
                <option value="1,500">0 - 1,500</option>
              </select>
            </Col>
          </FormGroup>
          <Row>
            <Col md="4">
              <Button
                size="md"
                type="submit"
                outline
                color="primary"
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>
            </Col>
            {this.props.isLoading ? (
              <img
                style={{
                  width: "140px",
                  position: "absolute",
                  marginTop: "0px",
                  right: "40%"
                }}
                src="../../assets/img/icons/loading2.gif"
                alt="loading"
              />
            ) : (
              <div />
            )}
          </Row>
        </Form>
      </Col>
    );
  }
}

export default connect(
  state => state.trucks,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Insurance);
