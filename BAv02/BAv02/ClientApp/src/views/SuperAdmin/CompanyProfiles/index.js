import React, { Fragment, lazy } from "react";
import { Button, Dropdown, Row } from "reactstrap";
import { connect } from "react-redux";
import { Card, CardBody, Col, FormGroup } from "reactstrap";
import DataTable from "react-data-table-component";
// import { companiesActions } from "./../../../store/companyStore";
import { bindActionCreators } from "redux";
import { companiesActions } from "../../../store/companyStore";
import axios from "axios";
import styled from "styled-components";
import DropDownSuperAdminMenu from "./../../../components/DropDownSuperAdminMenu";
import AlertDelete from "../../../components/AlertDelete";
import ResetPasswordSuperAdminMenu from "../../../components/ResetPasswordSuperAdminMenu";
import moment from "moment";
import ToastAlert from "../../../components/ToastAlert";
import ResetAllPassword from "../../../components/ResetAllPassword";

const WidgetSimple = lazy(() =>
  import("./../../../views/Widgets/WidgetSimple")
);

const columns = [
  {
    name: "#",
    selector: "id",
    sortable: true,
    //maxWidth: '20px'
  },
  {
    name: "Dot",
    selector: "dot",
    //maxWidth: '50px'
  },
  {
    name: "Legal Name",
    selector: "legalName",
    sortable: true,
    //maxWidth: '450px'
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
    //maxWidth: '220px'
  },
  {
    name: "Total Driver",
    selector: "driverTotal",
    sortable: true,
    //maxWidth: '20px'
  },
  {
    name: "Add Date",
    selector: "addDate",
    sortable: true,
    //maxWidth: '50px'
  },
  {
    name: "Customer Id",
    selector: "customerId",
    sortable: true,
    //maxWidth: '220px'
  },
  {
    name: "Options",
    selector: "options",
    //maxWidth: '50px'
  },
];

const TextField = styled.input`
  height: 32px;
  width: 300px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const Filter = ({ onFilter }) => {
  return (
    <Fragment>
      <FormGroup style={{ marginBottom: "0px" }} row>
        <Col md="3">
          <TextField
            id="search"
            type="search"
            role="search"
            placeholder="Search Company"
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
      </FormGroup>
    </Fragment>
  );
};

class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeactivated: "",
      companies: [],
      driversActive: [],
      driverInactive: [],
      vehicleActive: [],
      vehicleInactive: [],
      stateAlertDelete: false,
      stateNewPassword: false,
      stateResetAllPassword: false,
      stateResetConfirmation: false,
      stateActivate: false,
      filterTextUsers: "",
      filterTextCompanies: "",
    };
    this.getAllCompanies = this.getAllCompanies.bind(this);
    this.getAllDriversACTIVE = this.getAllDriversACTIVE.bind(this);
    this.getAllDriversINACTIVE = this.getAllDriversINACTIVE.bind(this);
    this.getCompanyToEdit = this.getCompanyToEdit.bind(this);
    this.getAllVehiclesActive = this.getAllVehiclesActive.bind(this);
    this.getAllVehiclesInactive = this.getAllVehiclesInactive.bind(this);
    this.toggleDeactivate = this.toggleDeactivate.bind(this);
    this.toggleResetPassword = this.toggleResetPassword.bind(this);
    this.deactivateCompany = this.deactivateCompany.bind(this);
    this.toggleActivate = this.toggleActivate.bind(this);
    this.toggleResetAllPasswords = this.toggleResetAllPasswords.bind(this);
    // this.resetPasswordCompany = this.resetPasswordCompany.bind(this);
  }

  componentDidMount() {
    this.getAllCompanies();
    this.getAllDriversACTIVE();
    this.getAllDriversINACTIVE();
    this.getAllVehiclesActive();
    this.getAllVehiclesInactive();
  }

  // Drivers displayed now as expandableRowsComponentProps
  handleRowClicked = (row) => {
    window.location.replace("/#/company-profile/" + row.id);
  };

  // data & count getAllCompanies
  getAllCompanies() {
    let url = "/api/CompanySuperAdmin/GetAllCompanies";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        let array = response.map((item) => {
          var object = {};
          object.id = item.id;
          object.dot = item.dot;
          object.legalName = item.legalName;
          object.email = item.email;
          object.driverTotal = item.driverTotal;
          object.addDate = moment(item.addDate).format("YYYY-MM-DD");
          object.customerId = item.customerId;
          this.setState({ isDeactivated: item.isDeactivated });
          object.options = (
            <DropDownSuperAdminMenu
              onModal={() => this.toggleDeactivate(item.id)}
              onModal2={() => this.toggleResetPassword(item.id)}
              onModal3={() => this.toggleActivate(item.id)}
              itemID={item.id}
              direction={"up"}
              menuOptions={[
                ["Reset Password", "Reset Password"],
                [
                  this.state.isDeactivated ? "Activate" : "Deactivate",
                  this.state.isDeactivated ? "Activate" : "deactivate",
                ],
              ]}
            />
          );

          return object;
        });
        this.setState({
          companies: array,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllDriversACTIVE() {
    let url = "/api/Drivers/GetAllDriversACTIVE";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          driversActive: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllDriversINACTIVE() {
    let url = "/api/Drivers/GetAllDriversINACTIVE";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          driversInactive: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getCompanyToEdit(id) {
    let url = "/api/CompanySuperAdmin/GetAllCompanies";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          companies: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllVehiclesActive() {
    let url = "/api/vehicle/GetAllActiveVehicle";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          vehicleActive: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllVehiclesInactive() {
    let url = "/api/vehicle/GetAllInactiveVehicle";
    axios.get(url).then((response) => {
      this.setState({
        vehicleInactive: response.data,
      });
    });
  }

  toggleDeactivate(itemID) {
    this.props.setIDCompany(itemID);
    this.setState({ stateAlertDelete: !this.state.stateAlertDelete });
  }

  toggleResetPassword(itemID) {
    this.setState({ stateNewPassword: !this.state.stateNewPassword });
    this.props.setIDCompany(itemID);
  }

  toggleActivate(itemID) {
    this.setState({ stateActivate: !this.state.Activate });
    this.setState({ isDeactivated: !this.state.isDeactivated });
    this.props.setIDCompany(itemID);
    //conexion
    let url = "/api/UserLog/ActivateCompany?idCompany=";
    axios
      .post(url + itemID)
      .then((response) => {
        const r = response.data.status;
        if (r === 0) {
          this.props.toggleToastAlert(true, "Company activated successfully");
          this.getAllCompanies();
        } else {
          this.props.toggleToastAlert(true, "");
        }
      })
      .catch((error) => {
        console.log(error);
        props.toast(true, "");
      });
  }

  deactivateCompany(itemID) {
    this.setState({ isDeactivated: !this.state.isDeactivated });
    // conexion
    let url = "/api/UserLog/DeactivateCompany?idCompany=";
    axios
      .post(url + itemID)
      .then((response) => {
        const r = response.data.status;
        if (r === 0) {
          this.props.toggleToastAlert(true, "Company deactivated successfully");
          this.getAllCompanies();
        } else {
          this.props.toggleToastAlert(true, "");
        }
      })
      .catch((error) => {
        console.log(error);
        props.toast(true, "");
      });
    this.setState({ stateAlertDelete: !this.state.stateAlertDelete });
  }

  toggleResetAllPasswords() {
    this.setState({ stateResetAllPassword: !this.state.stateResetAllPassword });
  }

  render() {
    const { companies } = this.state;

    const filterCompanies = companies.filter((item) =>
      item.legalName
        .toLowerCase()
        .includes(this.state.filterTextCompanies.toLowerCase())
    );

    return (
      <Fragment>
        <Row xs="2" sm="5" lg="5">
          <WidgetSimple
            icon="fa fa-bank"
            children=""
            header={this.state.companies.length.toString() + " Companies"}
          ></WidgetSimple>
          <WidgetSimple
            icon="fa fa-user"
            children=""
            header={this.state.driversActive + " Total Active Drivers"}
          ></WidgetSimple>
          <WidgetSimple
            icon="fa fa-user-times"
            children=""
            header={this.state.driversInactive + " Total Inactive Drivers"}
          ></WidgetSimple>
          <WidgetSimple
            icon="fas fa-truck"
            children=""
            header={this.state.vehicleActive + " Total Active Vehicles"}
          ></WidgetSimple>
          <WidgetSimple
            icon="fas fa-toolbox"
            children=""
            header={this.state.vehicleInactive + " Total Inactive Vehicles"}
          ></WidgetSimple>
        </Row>
        <Card>
          <CardBody>
            <div className="row d-flex justify-content-between">
              <Filter
                state={this.state}
                data={companies}
                onFilter={(value) => {
                  this.setState({ filterTextCompanies: value });
                }}
              />
              <button type="button" className="btn btn-primary" onClick={this.toggleResetAllPasswords}>
                Reset All Passwords
              </button>
            </div>
            <DataTable
              onRowClicked={this.handleRowClicked}
              onClickedid={this.onCompanyID}
              columns={columns}
              data={filterCompanies}
              pagination
              highlightOnHover
              pointerOnHover
              // expandableRows
              dense
              responsive={true}
            />
          </CardBody>
        </Card>
        <AlertDelete
          modalType="Deactivate"
          message="Are you sure you want to DEACTIVATE this company?"
          modal={this.state.stateAlertDelete}
          toggle={() => this.toggleDeactivate()}
          delete={() => {
            this.deactivateCompany(this.props.idCompany);
          }}
        />
        <ResetPasswordSuperAdminMenu
          idCompany={this.props.idCompany}
          modalType="Reset Pasword"
          modal={this.state.stateNewPassword}
          toggle={() => {
            this.toggleResetPassword();
          }}
          message={""}
          toast={this.props.toggleToastAlert}
        />
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <ResetAllPassword
          modal={this.state.stateResetAllPassword}
          message={""}
          toast={this.props.toggleToastAlert}
          toggle={() => {
            this.toggleResetAllPasswords();
          }}
        />
      </Fragment>
    );
  }
}
export default connect(
  (state) => state.companies,
  (dispatch) => bindActionCreators(companiesActions, dispatch)
)(CompanyProfile);
