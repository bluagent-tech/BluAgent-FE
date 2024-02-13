import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  UncontrolledTooltip,
  Input,
  Row,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/DQF";
import AddDriver from "./../../containers/UserModal/AddDriver";
import InviteDriver from "./../../containers/UserModal/InviteDriver";
import AlertDelete from "./../../components/AlertDelete";
import DropdownMenu2 from "./../../components/DropdownMenu";
import ReactExport from "react-data-export";
import DataTable from "react-data-table-component";
import ToastAlert from "./../../components/ToastAlert";
import Switch from "react-switch";
import Notifications from "../../containers/Company/CompanyModal/Notifications";
import "../../components/Styles/DataTable.css";
import axios from "axios";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const id = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = localStorage["idCompany"];
// const driverNotificationsCount = localStorage.getItem(
//   'driverNotificationsCount'
// );
const Filter = ({ onFilter, reduxProps, isInactive }) => {
  //const [notifications, setNotifications] = useState({ notifications: 0 });
  return (
    <React.Fragment>
      <Row>
        <Col xs="12" sm="6" lg="4">
          <Card style={{ height: "90%" }}>
            <CardBody>
              <div>
                <Row>
                  <Col>
                    <div className="h1 text-muted text-right mb-2">
                      <img
                        src="/assets/icons/icons8-male-user.svg"
                        alt="icon-bell"
                        height="30"
                        width="30"
                        className="float-right"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mx-auto">
                <h3 className="text-center">{reduxProps.drivers.length}</h3>
              </div>
              <div>
                <Row>
                  <Col className="text-muted text-uppercase font-weight-bold">
                    Active Drivers
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card style={{ height: "90%" }}>
            <CardBody>
              <div>
                <Row>
                  <Col>
                    <div className="h1 text-muted text-right mb-2">
                      <img
                        src="/assets/icons/icons8-notification.svg"
                        alt="icon-bell"
                        height="30"
                        width="30"
                        className="float-right"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mx-auto">
                <h3 className="text-center">
                  {reduxProps.alertsDriver.length}
                </h3>
              </div>
              <div>
                <Row>
                  <Col className="text-muted text-uppercase font-weight-bold">
                    Notifications
                  </Col>
                  <Col>
                    <Notifications
                      alerts={reduxProps.alertsDriver}
                      count={reduxProps.alertsDriver.length}
                    />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card style={{ height: "90%" }}>
            <CardBody>
              <div>
                <Row>
                  <Col>
                    <div className="h1 text-muted text-right mb-2">
                      <img
                        src="/assets/icons/icons8-user.svg"
                        alt="icon-bell"
                        height="30"
                        width="30"
                        className="float-right"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="mx-auto">
                <h3 className="text-center">
                  <label id="lblAllDriversFitness"></label>%
                </h3>
              </div>
              <div>
                <Row>
                  <Col className="text-muted text-uppercase font-weight-bold">
                    Driver Fitness
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <FormGroup style={{ marginBottom: "0px" }} row>
        <Col md="3" xs="6" sm="6">
          <Input
            className="mb-2"
            id="search"
            type="search"
            role="search"
            placeholder="Search Driver"
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
        <div style={{ marginLeft: "auto" }}>
          <Row style={{ marginRight: "18.5px" }}>
            <Col>
              <Row>
                <AddDriver
                  handleSubmit={reduxProps.addNewDriver}
                  isLoading={reduxProps.isLoading}
                  error={reduxProps.error}
                  getCountries={reduxProps.getCountries}
                  countries={reduxProps.countries}
                  modal={reduxProps.modal}
                  toggle={reduxProps.toggle}
                  style={{ paddingRight: "0px" }}
                />
                <InviteDriver
                  toggle={reduxProps.handleInviteDriverModalToggle}
                  modal={reduxProps.inviteDriverModal}
                  sendEmail={reduxProps.driverInvitationEmail}
                  sendSMS={reduxProps.driverInvitationSMS}
                  isLoading={reduxProps.isLoading}
                  error={reduxProps.error}
                  style={{ paddingRight: "0px" }}
                />
                <Col style={{ paddingRight: "0px" }}>
                  <ExcelFile
                    element={
                      <Button
                        id={isInactive ? "exportInactive" : "export"}
                        className="fa fa-file-text-o icons d-block"
                        style={{
                          borderRadius: "30px",
                          width: "30px",
                          height: "30px",
                          padding: "0px",
                        }}
                        color="primary"
                      />
                    }
                  >
                    <ExcelSheet
                      data={
                        isInactive
                          ? reduxProps.dataExportInactive.Items
                          : reduxProps.dataExportActive.Items
                      }
                      name={
                        isInactive ? "Driver's Inactives" : "Driver's Actives"
                      }
                    >
                      <ExcelColumn label="First Name" value="Firtname" />
                      <ExcelColumn label="Last Name" value="LastNameame" />
                      <ExcelColumn label="License" value="License" />
                      <ExcelColumn label="Date of hire" value="StartDate" />
                      <ExcelColumn
                        label={isInactive ? "Deactivated Date" : ""}
                        value={isInactive ? "FinishDate" : ""}
                      />
                    </ExcelSheet>
                  </ExcelFile>
                  <UncontrolledTooltip
                    placement="bottom"
                    target={isInactive ? "exportInactive" : "export"}
                  >
                    Export Driver's
                  </UncontrolledTooltip>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </FormGroup>
    </React.Fragment>
  );
};

const DriversImg = (img, DrugAlcoholTest, Id) => {
  return (
    <div className="align-right">
      <div
        className="avatar"
        style={{ marginLeft: "15px", marginRight: "10px" }}
      >
        <img
          alt="profile"
          src={
            img === null
              ? "assets/img/Images/profile/profile.png"
              : `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${Id}/driverAvatar.png`
          }
          className="img-avatar"
          style={{ width: "100%", height: "100%" }}
        />
        <span
          className={
            DrugAlcoholTest === "Negative"
              ? "avatar-status badge-success"
              : DrugAlcoholTest === "Positive"
              ? "avatar-status badge-danger"
              : "avatar-status badge-warning"
          }
        ></span>
      </div>
    </div>
  );
};

const OptionMenu = ({ isInactive, reduxProps, Id, drugTest }) => {
  if (isInactive) {
    return (
      <div className="text-center">
        <DropdownMenu2
          direction="right"
          itemID={Id}
          menuOptions={[
            [
              "Activate",
              () => {
                reduxProps.updateDriverStatus(Id, "ACTIVE");
              },
            ],
          ]}
        />
      </div>
    );
  } else {
    return (
      <div className="text-center">
        {drugTest === false ? (
          <DropdownMenu2
            direction="right"
            itemID={Id}
            toggleWorkOrderModal={() => {
              reduxProps.enrollDriver(
                Id,
                JSON.parse(localStorage.getItem("user")).Id,
                true
              );
            }}
            menuOptions={[
              ["Request Driving Record", undefined],
              ["Enroll to DMV EPN", undefined],
              [
                "Enroll to Drug Testing",
                drugTest === false ? "This is a function2" : undefined,
              ],
              [
                "Deactivate",
                () => {
                  reduxProps.toggleD1(Id);
                },
              ],
            ]}
          />
        ) : (
          <DropdownMenu2
            direction="right"
            itemID={Id}
            menuOptions={[
              ["Request Driving Record", undefined],
              ["Enroll to DMV EPN", () => {}],
              [
                "Deactivate",
                () => {
                  reduxProps.toggleD1(Id);
                },
              ],
            ]}
          />
        )}
      </div>
    );
  }
};

class Hazmat extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.export2 = this.export2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      alertsDriver: [],
      filterTextDrivers: "",
      filterTextInactiveDrivers: "",
      checked: true,
    };
  }

  getAllDriversFitness() {
    document.getElementById("lblAllDriversFitness").innerText = 0;
    axios
      .get("/api/Drivers/getAllDriversFitness?idCompany=" + idCompany)
      .then((response) => response.data)
      .then((response) => {
        var r = JSON.parse(response);
        document.getElementById("lblAllDriversFitness").innerText =
          r.allDriversFitness;
      })
      .catch((error) => console.log(error));
  }

  handleChange(checked) {
    this.setState({ checked });

    this.props.exportDrivers(id);

    if (checked === true) {
      document.getElementById("activeItemsContainer").style.display = "block";
      document.getElementById("inactiveItemsContainer").style.display = "none";
    } else {
      document.getElementById("activeItemsContainer").style.display = "none";
      document.getElementById("inactiveItemsContainer").style.display = "block";
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  componentDidMount() {
    this.props.getHazmatDrivers(id, 1, 1, 1000);
    this.props.exportDrivers(id);
    this.props.getNotificationsDriversDQF(idCompany);
    this.getAllDriversFitness(idCompany);
  }

  export2() {
    this.props.exportDrivers(id);
  }

  mapDriversForDataTable(items, isInactive) {
    let data = items.map((row) => {
      var object = {};
      object.photo = DriversImg(row.Image, row.DrugAlcoholTest, row.IdUser);
      object.name = row.Name;
      object.dmv = "Enrolled";
      object.DrugAlcoholTest = row.DrugAlcoholTest;
      object.country = row.Country;
      object.status = row.Status;
      object.license = row.License;
      object.options = (
        <OptionMenu
          isInactive={isInactive}
          reduxProps={this.props}
          Id={row.IdUser}
          drugTest={row.DrugsTest}
        />
      );
      return object;
    });

    return data;
  }

  handleRowClicked = (row) => {
    window.location.replace("/#/DriverHazmat/" + row.options.props.Id);
  };

  render() {
    const columns = [
      {
        name: "",
        selector: "photo",
        grow: 0,
      },
      {
        name: "Driver Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "DMV/EPN",
        selector: "dmv",
        center: true,
      },
      {
        name: "Pre-Employment",
        selector: "DrugAlcoholTest",
        center: true,
      },
      {
        name: "Country",
        selector: "country",
        sortable: true,
        center: true,
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        grow: 0,
      },
      {
        name: "Driver License",
        selector: "license",
        center: true,
      },
      {
        name: "Options",
        selector: "options",
        grow: 0,
        center: true,
      },
    ];
    const drivers = this.mapDriversForDataTable(this.props.drivers, false);
    const inactiveDrivers = this.mapDriversForDataTable(
      this.props.driversInactive,
      true
    );
// console.log("datos dentro del hazmat", this.props.drivers);
// console.log("datos de los inactivos", this.props.driversInactive);
    const filteredDrivers = drivers.filter((item) =>
      item.name
        .toLowerCase()
        .includes(this.state.filterTextDrivers.toLowerCase())
    );
    const filteredInactiveDrivers = inactiveDrivers.filter((item) =>
      item.name
        .toLowerCase()
        .includes(this.state.filterTextInactiveDrivers.toLowerCase())
    );

    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <Card
          style={{
            boxShadow: "none",
          }}
        >
          <div
            style={{
              float: "right",
              position: "absolute",
              right: "10px",
              padding: "15px",
              top: "-34px",
            }}
          >
            <Switch
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#FFF",
                    paddingRight: 10,
                  }}
                >
                  Inactive
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 12,
                    color: "#FFF",
                    paddingLeft: 10,
                  }}
                >
                  Active
                </div>
              }
              onChange={this.handleChange}
              checked={this.state.checked}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={20}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
              height={30}
              width={75}
              className="react-switch"
            />
          </div>
          <CardBody>
            <div id="activeItemsContainer">
              <Filter
                reduxProps={this.props}
                data={drivers}
                isInactive={false}
                onFilter={(value) => {
                  this.setState({ filterTextDrivers: value });
                }}
              />
              { filteredDrivers === null || filteredDrivers === undefined ? 'Loading ...' :
                  (<DataTable
                    responsive={true}
                    onRowClicked={this.handleRowClicked}
                    pagination
                    columns={columns}
                    data={filteredDrivers}
                  />)
              }
            </div>

            <div id="inactiveItemsContainer" style={{ display: "none" }}>
              <Filter
                reduxProps={this.props}
                isInactive={true}
                data={inactiveDrivers}
                onFilter={(value) => {
                  this.setState({ filterTextInactiveDrivers: value });
                }}
              />
              <DataTable
                responsive={true}
                onRowClicked={this.handleRowClicked}
                pagination
                columns={columns}
                data={filteredInactiveDrivers}
              />
            </div>
          </CardBody>
        </Card>
        <AlertDelete
          message="Are you sure you want to DEACTIVATE this driver?"
          modalType="Deactivate"
          modal={this.props.modalD1}
          toggle={() => {
            this.props.toggleD1(this.props.idDelete1);
          }}
          delete={() => {
            this.props.updateDriverStatus(this.props.idDelete1, "INACTIVE");
          }}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.dqf,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Hazmat);
