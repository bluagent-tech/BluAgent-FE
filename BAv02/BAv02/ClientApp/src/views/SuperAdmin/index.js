import React, { Fragment } from "react";
import { Container, Row, Card, CardBody, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeaderWidgetsPanel from "./../../containers/SuperAdmin/headerWidgetsPanel";
// Collector Components
const collectionSiteImg = "/assets/img/superadmin/collector-site.png";
const collectorImg = "/assets/img/superadmin/collector.png";
const provideSiteImg = "/assets/img/superadmin/provider.png";
const SuperAdminUsers = "/assets/img/superadmin/people.png";
const companyProfilesImg = "/assets/img/superadmin/company-profiles.png";
const businessReport = "/assets/img/superadmin/arrow-chart.png";
const complianceReport = "/assets/img/superadmin/clipboard.png";
const safetyCompliance = "/assets/img/superadmin/list.png";
const usb = "/assets/img/superadmin/usb.png";

const superAdminRole = JSON.parse(localStorage.getItem("user")).Role;

export default class SuperAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };

    /*      this.getAllCompanies = this.getAllCompanies.bind(this);
      this.getAllCompanies(); */
  }

  componentDidMount() {}

  render() {
    if (superAdminRole === "SUPERADMIN") {
      ///*YOU ARE SUPER ADMIN*/
      return (
        <Fragment>
          <HeaderWidgetsPanel />
          <Card>
            <CardBody>
              <Container className="" lg={1}>
                <Row className="text-center">
                  <Col lg={4}>
                    <div className="Collector">
                      <Link to="/company-profiles">
                        <LazyLoadImage
                          className="img-fluid"
                          src={companyProfilesImg}
                          alt="icon company profiles"
                        ></LazyLoadImage>
                      </Link>
                    </div>
                    <p className="text-uppercase font-weight-bold">
                      company profiles
                    </p>
                  </Col>
                  <Col lg={4}>
                    <div className="Collector">
                      <Link to="/providers">
                        <LazyLoadImage
                          className="img-fluid"
                          src={provideSiteImg}
                          alt="icon provider"
                        ></LazyLoadImage>
                      </Link>
                    </div>
                    <p className="text-uppercase font-weight-bold">providers</p>
                  </Col>
                  <Col lg={4}>
                    <div className="Collector">
                      <Link to="/collection-site">
                        <LazyLoadImage
                          className="img-fluid"
                          src={collectionSiteImg}
                          alt="icon collector site"
                        ></LazyLoadImage>
                      </Link>
                    </div>
                    <p className="text-uppercase font-weight-bold">
                      collection site
                    </p>
                  </Col>
                  <Col lg={4}>
                    <div className="Collector">
                      <Link to="/collectors">
                        <LazyLoadImage
                          className="img-fluid"
                          src={collectorImg}
                          alt="icon collector"
                        ></LazyLoadImage>
                      </Link>
                    </div>
                    <p className="text-uppercase font-weight-bold">collector</p>
                  </Col>
                  <Col lg={4}>
                    <div className="Collector">
                      <Link to="/super-admin-users">
                        <LazyLoadImage
                          className="img-fluid"
                          src={SuperAdminUsers}
                          alt="icon super admin users"
                        ></LazyLoadImage>
                      </Link>
                    </div>
                    <p className="text-uppercase font-weight-bold">
                      Super Admin Users
                    </p>
                  </Col>
                  <Col lg={4}>
                    <div className="Collector">
                      <Link to="/scr">
                        <LazyLoadImage
                          className="img-fluid"
                          src={safetyCompliance}
                          alt="icon reports profile"
                        ></LazyLoadImage>
                      </Link>
                    </div>
                    <p className="text-uppercase font-weight-bold">
                      Safety Compliance
                    </p>
                  </Col>
                  <Col lg={4}>
                    <div className="Collector">
                      <Link to="/reports">
                        <LazyLoadImage
                          className="img-fluid"
                          src={businessReport}
                          alt="icon reports profile"
                        ></LazyLoadImage>
                      </Link>
                    </div>
                    <p className="text-uppercase font-weight-bold">Reports</p>
                  </Col>
                  <Col lg={4}>
                    <div className="Collector">
                      <Link to="/Devices">
                        <LazyLoadImage
                          className="img-fluid"
                          src={usb}
                          alt="icon device SA"
                        ></LazyLoadImage>
                      </Link>
                    </div>
                    <p className="text-uppercase font-weight-bold">Devices</p>
                  </Col>
                </Row>
              </Container>
            </CardBody>
          </Card>
        </Fragment>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/reports",
            // state: { from: this.props.location }
          }}
        />
      );
    }
  }
}
