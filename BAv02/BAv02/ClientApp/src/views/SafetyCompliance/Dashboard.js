import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

//LETTER INQUIRY  DRIVER LINK

class Dashboard extends Component {
 
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid" style={{ marginTop: "3%" }}>
          <div className="animated fadeIn">
            {/* DRIVER */}
            {/*LEVEL 1*/}
            <Row>
              <Col sm="3">
                <Card style={{ height: "655px" }} className="text-center">
                  <CardBody>
                    <div className="text-center">
                      <img
                        src={"assets/img/Images/logoCompany/IMG_3369.jpg"}
                        width="200px"
                        height="200px"
                        className="img-avatar"
                        alt={`avatar_`}
                      />
                      <span className="avatar-status badge-danger"></span>
                    </div>
                    <div className="text-center">
                      <br />
                      <h3>JIB UNITED TRANSPORT INC</h3>
                    </div>
                    <br />
                    <p>U.S. DOT#: 2361757</p>
                    <p>Address: 7277 OTAY MESA RD SUITE C</p>
                    <p>SAN DIEGO, CA 92154</p>
                  </CardBody>
                </Card>
              </Col>
              {/*LEVEL 2*/}
              <Col sm="9">
                <Col className="float-left" sm="4">
                  <Card>
                    <CardBody style={{ padding: 0 }}>
                      <i class="fa fa-truck bg-primary p-4 px-5 font-2xl mr-3 float-left"></i>
                      <div class="h5 mb-0 text-primary pt-3">20</div>
                      <div
                        style={{ fontSize: "8pt" }}
                        class="text-muted text-uppercase font-weight-bold"
                      >
                        Number of Vehicles
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="float-left" sm="4">
                  <Card>
                    <CardBody style={{ padding: 0 }}>
                      <i class="fa fa-group bg-primary p-4 px-5 font-2xl mr-3 float-left"></i>
                      <div class="h5 mb-0 text-primary pt-3">16</div>
                      <div
                        style={{ fontSize: "8pt" }}
                        class="text-muted text-uppercase font-weight-bold"
                      >
                        Number of Drivers
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="float-left" sm="4">
                  <Card>
                    <CardBody style={{ padding: 0 }}>
                      <i class="fa fa-pencil-square-o bg-primary p-4 px-5 font-2xl mr-3 float-left"></i>
                      <div class="h5 mb-0 text-primary pt-3">62</div>
                      <div
                        style={{ fontSize: "8pt" }}
                        class="text-muted text-uppercase font-weight-bold"
                      >
                        Number of Inspections
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Card style={{ marginLeft: "15px", marginRight: "15px" }}>
                  <CardBody>
                    <Col className="float-left" sm="6">
                      <h3>Out of Service Rates</h3>
                      <br />
                      <h5>Safety Rating & OOS Rates</h5>
                      <p>(As of 12/04/2019 updated daily from SAFER )</p>
                      <p style={{ marginBottom: "0", fontWeight: "500" }}>
                        CONDITIONAL
                      </p>
                      <p>(Rating Date: 09/25/2019)</p>
                    </Col>
                    <Col className="float-left" sm="6">
                      <div
                        class="table-responsive"
                        style={{ textAlign: "center" }}
                      >
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>OOS%</th>
                              <th>National Avg%</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Vehicle</td>
                              <td
                                style={{ color: "#23d820", fontWeight: "500" }}
                              >
                                256.08
                              </td>
                              <td style={{ fontWeight: "500" }}>20.7</td>
                            </tr>
                            <tr>
                              <td>Driver</td>
                              <td
                                style={{ color: "#23d820", fontWeight: "500" }}
                              >
                                9.4
                              </td>
                              <td style={{ fontWeight: "500" }}>5.5</td>
                            </tr>
                            <tr>
                              <td>Hazmat</td>
                              <td></td>
                              <td style={{ fontWeight: "500" }}>4.5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </CardBody>
                </Card>
                <Card style={{ marginLeft: "15px", marginRight: "15px" }}>
                  <CardBody>
                    <Col className="float-left" sm="6">
                      <h3>Active For-Hire Authority</h3>
                      <br />
                      <h5>Licensing and Insurance</h5>
                      <p>(As of 12/04/2019 updated hourly from L&I )</p>
                    </Col>
                    <Col className="float-left" sm="6">
                      <div
                        class="table-responsive"
                        style={{ textAlign: "center" }}
                      >
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Yes/No</th>
                              <th>MC#/MX#</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Property</td>
                              <td style={{ fontWeight: "500" }}>Yes</td>
                              <td style={{ fontWeight: "500" }}> MC-809457</td>
                            </tr>
                            <tr>
                              <td>Passenger</td>
                              <td style={{ fontWeight: "500" }}>No</td>
                              <td style={{ fontWeight: "500" }}></td>
                            </tr>
                            <tr>
                              <td>Household Goods</td>
                              <td style={{ fontWeight: "500" }}>No</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Broker</td>
                              <td style={{ fontWeight: "500" }}>No</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
