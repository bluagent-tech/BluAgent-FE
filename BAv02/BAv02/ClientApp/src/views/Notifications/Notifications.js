import React, { Component } from "react";
import Alert from "react-bootstrap/lib/Alert";
import {
  Card,
  CardBody,
  Col,
  Fade,
  Row,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/DriverNotifications";
import { Link } from "react-router-dom";
import convertDate from "../../services/dateConvertTables";
import LoadingTag from "./Loading";
import MessageNotificationTag from "./MessageNotification";
import AlertsHeader from "./AlertsHeader";
import NavItemContainer from "./NavItemContainer";
const idCompany = JSON.parse(localStorage.getItem("idCompany"));

//Notification

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(2).fill("1"),
      notifications: [],
      cmaintenance: [],
      cvehicles: [],
      ctrailers: [],
      ccompany: [],
      alerts: [],
      calerts: [],
      loadingNotification: false,
      saveNot: false,
      saveNotM: false,
      saveNotC: false,
      logs: false,
      drivers: false,
      maintenance: false,
      vehicles: false,
      trailers: false,
      company: false,
    };
  }

  componentDidMount() {
    let saveNot = () => {
      this.setState({ saveNot: true });
      if (this.state.saveNotC && this.state.saveNotM) {
        this.getNotifications();
      }
    };
    let saveNotM = () => {
      this.setState({ saveNotM: true });
      if (this.state.saveNot && this.state.saveNotC) {
        this.getNotifications();
      }
    };
    let saveNotC = () => {
      this.setState({ saveNotC: true });
      if (this.state.saveNot && this.state.saveNotM) {
        this.getNotifications();
      }
    };
    this.props.getSaveNot(idCompany, saveNot);
    this.props.getSaveNotM(idCompany, saveNotM);
    this.props.getSaveNotC(idCompany, saveNotC);
  }

  getNotifications() {
    let logs = () => {
      this.setState({ logs: true });
      if (this.state.drivers && this.state.maintenance && this.state.company) {
        this.formatNotifications();
      }
    };

    let drivers = () => {
      this.setState({ drivers: true });
      if (this.state.logs && this.state.maintenance && this.state.company) {
        this.formatNotifications();
      }
    };
    let maintenance = () => {
      this.setState({ maintenance: true });
      if (this.state.drivers && this.state.logs && this.state.company) {
        this.formatNotifications();
      }
    };
    let company = () => {
      this.setState({ company: true });
      if (this.state.drivers && this.state.maintenance && this.state.logs) {
        this.formatNotifications();
      }
    };

    this.props.getNotificationsLogs(idCompany, logs);
    this.props.getNotificationsDrivers(idCompany, drivers);
    this.props.getNotificationsMaintenance(idCompany, maintenance);
    this.props.getNotificationsCompany(idCompany, company);
  }

  formatNotifications() {
    let dalerts = (dalerts) => {
      this.setState({
        calerts: dalerts,
      });
    };
    let dmaintenance = (dmaintenance) => {
      this.setState({
        cmaintenance: dmaintenance,
      });
    };
    let dmaintenanceV = (dmaintenanceV) => {
      this.setState({
        cvehicles: dmaintenanceV,
      });
    };
    let dmaintenanceT = (dmaintenanceT) => {
      this.setState({
        ctrailers: dmaintenanceT,
      });
    };
    let dcompany = (dcompany) => {
      this.setState({
        ccompany: dcompany,
      });
    };
    this.processAlerts(dalerts);
    this.processMaintenance(dmaintenance);
    this.processMaintenanceV(dmaintenanceV);
    this.processMaintenanceT(dmaintenanceT);
    this.processCompany(dcompany);
    this.state.loadingNotification = true;
  }

  processAlerts(callback) {
    let balerts = this.props.alerts;
    let dalerts = [];
    balerts.sort((a, b) => {
      return a.IdDriver - b.IdDriver;
    });
    for (let y = 0; y < balerts.length; y++) {
      let dueDate = this.props.alerts[y].Message.substr(-10);
      balerts[y].DueDate = dueDate;
      if (this.props.alerts[y].Message.substr(0, 3) === "Med") {
        balerts[y].Message = "Medical Certificate";
      }
      if (this.props.alerts[y].Message.substr(0, 3) === "DMV") {
        balerts[y].Message = "DMV Driving Record";
      }
      if (this.props.alerts[y].Message.substr(0, 3) === "The") {
        balerts[y].Message = "Driver License";
      }
      if (this.props.alerts[y].Message.substr(0, 3) === "Ann") {
        balerts[y].Message = "Annual Inquiry";
      }
      if (y > 0) {
        if (
          this.props.alerts[y].IdDriver === this.props.alerts[y - 1].IdDriver
        ) {
          let alerta = dalerts.pop();
          if (Array.isArray(alerta.Message)) {
            alerta.Message = [...alerta.Message, balerts[y].Message];
            alerta.Severy = [...alerta.Severy, balerts[y].Severy];
            alerta.DueDate = [...alerta.DueDate, balerts[y].DueDate];
          } else {
            alerta.Message = [alerta.Message, balerts[y].Message];
            alerta.Severy = [alerta.Severy, balerts[y].Severy];
            alerta.DueDate = [alerta.DueDate, balerts[y].DueDate];
          }
          dalerts.push(alerta);
        } else {
          dalerts.push(balerts[y]);
        }
      } else {
        dalerts.push(balerts[y]);
      }
    }
    callback(dalerts);
  }

  processMaintenance(callback) {
    let bmaintenance = this.props.alertsMaintenance;
    let dmaintenance = [];
    bmaintenance.sort((a, b) => {
      return a.Id - b.Id;
    });
    for (let y = 0; y < bmaintenance.length; y++) {
      let dueDate = this.props.alertsMaintenance[y].Message.substr(-10);
      bmaintenance[y].DueDate = dueDate;
      if (this.props.alertsMaintenance[y].Message.substr(0, 3) === "Reg") {
        bmaintenance[y].Message = "Registration";
      }
      if (this.props.alertsMaintenance[y].Message.substr(0, 3) === "Ann") {
        bmaintenance[y].Message = "Annual Inspection";
      }
      if (this.props.alertsMaintenance[y].Message.substr(0, 3) === "90-") {
        bmaintenance[y].Message = "90-Days Inspection";
      }
      if (this.props.alertsMaintenance[y].Message.substr(0, 3) === "45-") {
        bmaintenance[y].Message = "45-Days Inspection";
      }
      if (this.props.alertsMaintenance[y].Message.substr(0, 3) === "Ins") {
        bmaintenance[y].Message = "Insurance Policy";
      }
      if (y > 0) {
        if (this.props.alertsMaintenance[y].Id === this.props.alertsMaintenance[y - 1].Id) {
          let alerta = dmaintenance.pop();
          if (Array.isArray(alerta.Message)) {
            alerta.Message = [...alerta.Message, bmaintenance[y].Message];
            alerta.Severy = [...alerta.Severy, bmaintenance[y].Severy];
            alerta.DueDate = [...alerta.DueDate, bmaintenance[y].DueDate];
          } else {
            alerta.Message = [alerta.Message, bmaintenance[y].Message];
            alerta.Severy = [alerta.Severy, bmaintenance[y].Severy];
            alerta.DueDate = [alerta.DueDate, bmaintenance[y].DueDate];
          }
          dmaintenance.push(alerta);
        } else {
          dmaintenance.push(bmaintenance[y]);
        }
      } else {
        dmaintenance.push(bmaintenance[y]);
      }
    }
    callback(dmaintenance);
  }

  processMaintenanceV(callback) {
    let bmaintenance = this.props.alertsVehicles;
    let dmaintenance = [];
    bmaintenance.sort((a, b) => {
      return a.Id - b.Id;
    });
    for (let y = 0; y < bmaintenance.length; y++) {
      let dueDate = this.props.alertsVehicles[y].Message.substr(-10);
      bmaintenance[y].DueDate = dueDate;
      if (this.props.alertsVehicles[y].Message.substr(0, 3) === "Reg") {
        bmaintenance[y].Message = "Registration";
      }
      if (this.props.alertsVehicles[y].Message.substr(0, 3) === "Ann") {
        bmaintenance[y].Message = "Annual Inspection";
      }
      if (this.props.alertsVehicles[y].Message.substr(0, 3) === "90-") {
        bmaintenance[y].Message = "90-Days Inspection";
      }
      if (this.props.alertsVehicles[y].Message.substr(0, 3) === "45-") {
        bmaintenance[y].Message = "45-Days Inspection";
      }
      if (this.props.alertsVehicles[y].Message.substr(0, 3) === "Ins") {
        bmaintenance[y].Message = "Insurance Policy";
      }
      if (y > 0) {
        if (this.props.alertsVehicles[y].Id === this.props.alertsVehicles[y - 1].Id) {
          let alerta = dmaintenance.pop();
          if (Array.isArray(alerta.Message)) {
            alerta.Message = [...alerta.Message, bmaintenance[y].Message];
            alerta.Severy = [...alerta.Severy, bmaintenance[y].Severy];
            alerta.DueDate = [...alerta.DueDate, bmaintenance[y].DueDate];
          } else {
            alerta.Message = [alerta.Message, bmaintenance[y].Message];
            alerta.Severy = [alerta.Severy, bmaintenance[y].Severy];
            alerta.DueDate = [alerta.DueDate, bmaintenance[y].DueDate];
          }
          dmaintenance.push(alerta);
        } else {
          dmaintenance.push(bmaintenance[y]);
        }
      } else {
        dmaintenance.push(bmaintenance[y]);
      }
    }
    callback(dmaintenance);
  }

  processMaintenanceT(callback) {
    let bmaintenance = this.props.alertsTrailers;
    let dmaintenance = [];
    bmaintenance.sort((a, b) => {
      return a.Id - b.Id;
    });
    for (let y = 0; y < bmaintenance.length; y++) {
      let dueDate = this.props.alertsTrailers[y].Message.substr(-10);
      bmaintenance[y].DueDate = dueDate;
      if (this.props.alertsTrailers[y].Message.substr(0, 3) === "Reg") {
        bmaintenance[y].Message = "Registration";
      }
      if (this.props.alertsTrailers[y].Message.substr(0, 3) === "Ann") {
        bmaintenance[y].Message = "Annual Inspection";
      }
      if (this.props.alertsTrailers[y].Message.substr(0, 3) === "90-") {
        bmaintenance[y].Message = "90-Days Inspection";
      }
      if (this.props.alertsTrailers[y].Message.substr(0, 3) === "45-") {
        bmaintenance[y].Message = "45-Days Inspection";
      }
      if (this.props.alertsTrailers[y].Message.substr(0, 3) === "Ins") {
        bmaintenance[y].Message = "Insurance Policy";
      }
      if (y > 0) {
        if (this.props.alertsTrailers[y].Id === this.props.alertsTrailers[y - 1].Id) {
          let alerta = dmaintenance.pop();
          if (Array.isArray(alerta.Message)) {
            alerta.Message = [...alerta.Message, bmaintenance[y].Message];
            alerta.Severy = [...alerta.Severy, bmaintenance[y].Severy];
            alerta.DueDate = [...alerta.DueDate, bmaintenance[y].DueDate];
          } else {
            alerta.Message = [alerta.Message, bmaintenance[y].Message];
            alerta.Severy = [alerta.Severy, bmaintenance[y].Severy];
            alerta.DueDate = [alerta.DueDate, bmaintenance[y].DueDate];
          }
          dmaintenance.push(alerta);
        } else {
          dmaintenance.push(bmaintenance[y]);
        }
      } else {
        dmaintenance.push(bmaintenance[y]);
      }
    }
    callback(dmaintenance);
  }

  processCompany(callback) {
    let bcompany = this.props.company;
    let dcompany = [];
    bcompany.sort((a, b) => {
      return a.Id - b.Id;
    });
    for (let y = 0; y < bcompany.length; y++) {
      if (y > 0) {
        if (this.props.company[y].Id === this.props.company[y - 1].Id) {
          let alerta = dcompany.pop();
          if (Array.isArray(alerta.Message)) {
            alerta.Message = [...alerta.Message, bcompany[y].Message];
            alerta.Severy = [...alerta.Severy, bcompany[y].Severy];
          } else {
            alerta.Message = [alerta.Message, bcompany[y].Message];
            alerta.Severy = [alerta.Severy, bcompany[y].Severy];
          }
          dcompany.push(alerta);
        } else {
          dcompany.push(bcompany[y]);
        }
      } else {
        dcompany.push(bcompany[y]);
      }
    }
    callback(dcompany);
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  filterNotification(maintenance) {
    let list = maintenance.filter((list) => {
      return (
        list.Message.search("Annual") === -1 ||
        list.Message.search("90-Day") === -1 ||
        list.Message.search("45-Day")
      );
    });
    return list.length;
  }

  // filterNotificationVehicle(maintenance) {
  //   let list = maintenance.filter((list) => {
  //     return (
  //       list.Message.search("Annual") !== -1 ||
  //       list.Message.search("90-Day") !== -1 ||
  //       list.TypeId === "VEHICLE"
  //     );
  //   });
  //   return list.length;
  // }

  // filterNotificationTrailer(maintenance) {
  //   let list = maintenance.filter((list) => {
  //     return (
  //       list.Message.search("Annual") !== -1 ||
  //       list.Message.search("90-Day") !== -1 ||
  //       list.TypeId === "TRAILER"
  //     );
  //   });
  //   return list.length;
  // }

  render() {
    let navClick = (navId) => {
      this.toggle(0, navId);
    };

    const navTabs = [
      { id: "1", tabName: "Driver" },
      { id: "2", tabName: "Vehicle" },
      { id: "3", tabName: "Trailer" },
      { id: "4", tabName: "Company" },
      { id: "5", tabName: "Maintenance" },
      { id: "6", tabName: "Random Logs" },
    ];
    return (
      <React.Fragment>
        <div className="animated fadeIn">
          {/*LEVEL 2*/}
          <Row>
            <Col xs="12">
              <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                <Card>
                  <CardBody>
                    <Col>
                      <Nav tabs>
                        {navTabs.map((tab) => (
                          <NavItemContainer
                            key={tab.id}
                            active={this.state.activeTab[0] === tab.id}
                            item={tab.tabName}
                            id={tab.id}
                            getClick={navClick}
                          />
                        ))}
                      </Nav>
                      <TabContent activeTab={this.state.activeTab[0]}>
                        {/*Driver*/}
                        <TabPane tabId="1">
                          <div
                            className="row"
                            style={{
                              marginTop: "2%",
                              marginLeft: "2%",
                              marginRight: "2%",
                            }}
                          >
                            {this.props.isLoadingDrivers !== true ? (
                              <LoadingTag />
                            ) : (
                              <div className="w-100">
                                {this.props.alerts.length === 0 ? (
                                  <MessageNotificationTag />
                                ) : (
                                  <AlertsHeader
                                    alerts={this.state.calerts}
                                    type="driver"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </TabPane>
                        {/*Vehicle*/}
                        <TabPane tabId="2">
                          <div
                            className="row"
                            style={{
                              marginTop: "2%",
                              marginLeft: "2%",
                              marginRight: "2%",
                            }}
                          >
                            {this.props.isLoadingMaintenance !== true ? (
                              <LoadingTag />
                            ) : (
                              <div className="w-100">
                                {this.props.alertsVehicles.length === 0 ? (
                                  <MessageNotificationTag />
                                ) : (
                                      <AlertsHeader
                                        alerts={this.state.cvehicles}
                                        type="vehicle"
                                      />
                                )}
                              </div>
                            )}
                          </div>
                        </TabPane>
                        {/*Trailer*/}
                        <TabPane tabId="3">
                          <div
                            className="row"
                            style={{
                              marginTop: "2%",
                              marginLeft: "2%",
                              marginRight: "2%",
                            }}
                          >
                            {this.props.isLoadingMaintenance !== true ? (
                              <LoadingTag />
                            ) : (
                              <div className="w-100">
                                {this.props.alertsTrailers.length === 0 ? (
                                  <MessageNotificationTag />
                                ) : (
                                      <AlertsHeader
                                        alerts={this.state.ctrailers}
                                        type="trailer"
                                      />
                                )}
                              </div>
                            )}
                          </div>
                        </TabPane>
                        {/*Company*/}
                        <TabPane tabId="4">
                          <div
                            className="row"
                            style={{
                              marginTop: "2%",
                              marginLeft: "2%",
                              marginRight: "2%",
                            }}
                          >
                            {this.props.isLoadingCompany !== true ? (
                              <LoadingTag />
                            ) : (
                              <div className="w-100">
                                {this.props.company.length === 0 ? (
                                  <MessageNotificationTag />
                                ) : (
                                      <AlertsHeader
                                        alerts={this.state.ccompany}
                                        type="company"
                                      />
                                )}
                              </div>
                            )}
                          </div>
                        </TabPane>
                        {/*Maintenance*/}
                        <TabPane tabId="5">
                          <div
                            className="row"
                            style={{
                              marginTop: "2%",
                              marginLeft: "2%",
                              marginRight: "2%",
                            }}
                          >
                            {this.props.isLoadingMaintenance !== true ? (
                              <LoadingTag />
                            ) : (
                              <div className="w-100">
                                {this.state.cmaintenance.length === 0 ? (
                                  <MessageNotificationTag />
                                ) : (
                                  
                                  <AlertsHeader
                                    alerts = {this.state.cmaintenance}
                                    type = "maintenance"
                                  />
                                )}
                              </div>
                            )}
                          </div>

                        </TabPane>
                        {/*Logs Random*/}
                        <TabPane tabId="6">
                          <div
                            className="row"
                            style={{
                              marginTop: "2%",
                              marginLeft: "2%",
                              marginRight: "2%",
                            }}
                          >
                            {this.props.isLoadingLogs !== true ? (
                              <LoadingTag />
                            ) : (
                              <div className="w-100">
                                {this.props.logs.length === 0 ? (
                                  <MessageNotificationTag />
                                ) : (
                                  this.props.logs.map((logs) => {
                                    return (
                                      <Col
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                        md="12"
                                        id="AlertMaintenance"
                                        key={logs.Id}
                                      >
                                        <div
                                          style={{ width: "100%" }}
                                          data-tut="AlertMaintenance"
                                        >
                                          <Link
                                            style={{ textDecoration: "none" }}
                                            to={"DashboardTest"}
                                            className="img-responsive"
                                          >
                                            <Alert
                                              className={`alert alert-warning col-md-12`}
                                              key={logs.Id}
                                            >
                                              <div className="row">
                                                <div className="col-md-12 text-center">
                                                  <b>
                                                    {logs.Name} {logs.LastName}
                                                  </b>{" "}
                                                  {logs.Reason}
                                                  {" since "}
                                                  {convertDate(logs.Date)}
                                                </div>{" "}
                                              </div>
                                            </Alert>
                                          </Link>
                                        </div>
                                      </Col>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(
  (state) => state.notifications,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Notifications);