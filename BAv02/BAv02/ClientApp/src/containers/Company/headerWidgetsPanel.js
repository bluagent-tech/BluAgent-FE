import React, { Component, lazy } from "react";
import { Row, Col, Button, CardBody, Card, Alert } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";

import ImageUploader from "react-images-upload";
import "./../../components/TutorialTab/style.css";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";

import Company from "../../containers/Company/CompanyModal/Company";
import Notifications from "../../containers/Company/CompanyModal/Notifications";
const Widget05 = lazy(() => import("../../views/Widgets/Widget05"));
const WidgetNotifications = lazy(() =>
  import("../../views/Widgets/WidgetNotifications")
);
const WidgetCompanyFitness = lazy(() =>
  import("../../views/Widgets/WidgetCompanyFitness")
);

//HEAD DASHBOARD COMPANY

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = { imgSource: "" };
    this.onDrop = this.onDrop.bind(this);
    this.saveLogo = this.saveLogo.bind(this);
  }

  onDrop(picture, e) {
    var src = e[0];
    const x = document.getElementById("image");
    x.setAttribute("src", src);
    document.getElementById("saveLogo").style.display = "block";
    const buttonSaveImg = document.getElementById("saveLogo");
    buttonSaveImg.addEventListener("click", this.saveLogo);
  }

  componentDidMount() {
    this.props.getAllDocuments(
      JSON.parse(localStorage.getItem("user")).Id,
      1,
      100
    );
  }

  saveLogo(e) {
    e.preventDefault();
    e.stopPropagation();
    var byteArray = base64ToByteArray2(document.getElementById("image").src);
    var file = "";
    try {
      file = byteArray.toString();
    } catch (error) {
      file = "";
    }

    var company = new FormData();
    company.append("idCompany", this.props.company.Id);
    company.append("idU", JSON.parse(localStorage.getItem("user")).Id);
    company.append("alert", "false");
    company.append("file", file);
    this.props.saveCompanyLogo(company);
    document.getElementById("saveLogo").style.display = "none";
  }

  render() {
    var count = 0;
    if (this.props.complet !== undefined) {
      this.props.complet.map((f) => (f === 1 ? (count += 20) : null));
    }

    //var complet = Math.ceil((100 / 5) * count);
    // console.log("Alertas de la empresa: ", {
    //   alertas: this.props.alerts,
    //   conteoAlertas: this.props.alertsCount,
    // });

    return (
      <Row>
        <Col xs="12" sm="12" lg="4">
          <Card>
            <CardBody>
              <Row>
                <Col lg={4} sm={12}>
                  <Widget05
                    id="avatarImg"
                    color="secondary"
                    header="0%"
                    value="20"
                    default = {this.props.company.Image ? false : true}
                    src={
                      this.props.company.Image
                        ? `https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.company.Id}/companyLogo.png`
                        : "assets/icons/icons8-male-user.svg"
                    }
                    ref={(img) => (this.img = img)}
                    onError={() => {
                      this.img.src = "assets/icons/icons8-male-user.svg";
                      this.img.style = "width:74px;";
                    }}
                    className="apple-image"
                  >
                    <ImageUploader
                      withIcon={false}
                      buttonText=""
                      className="fileContainer2"
                      name="InputName"
                      buttonClassName="buttonLogo"
                      buttonStyles={{ backgroundColor: "#faebd700" }}
                      labelStyles={{ display: "none" }}
                      onChange={this.onDrop}
                      imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
                    />
                    <center>
                      {" "}
                      <Button
                        id="saveLogo"
                        color="primary"
                        style={{ display: "none" }}
                      >
                        {" "}
                        Save
                      </Button>{" "}
                    </center>
                  </Widget05>
                </Col>
                <Col lg={8} sm={12}>
                  <div className="text-center">
                    <div className="text-header-widget">
                      {this.props.company.LegalName}
                    </div>
                    <div
                      className="text-header-info"
                      style={{ marginBottom: "10px" }}
                    >
                      USDOT | {this.props.company.Dot}
                      <br />
                      Mobile: {this.props.company.PhoneNumber}
                      {count < 100 ? (
                        <Alert
                          className="mt-5 incomplete-record-warning"
                          color="danger"
                        >
                          <div className="text-uppercase text-white">
                            Record Incomplete
                          </div>
                        </Alert>
                      ) : (
                        <Alert
                          className="mt-5 complete-record-success"
                          color="success"
                        >
                          <div className="text-uppercase text-white">
                            Record Complete
                          </div>
                        </Alert>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card style={{ height: "90%" }}>
            <CardBody>
              <Col>
                <WidgetNotifications
                  icon="fa fa-bell"
                  bColor={
                    this.props.alertsCount > 0 || this.props.alerts > 0
                      ? "danger"
                      : "success"
                  }
                  header={
                    this.props.alertsCount || this.props.alerts
                      ? this.props.alertsCount.toString()
                      : this.props.alerts
                  }
                  value={this.props.toString()}
                  title="Notifications"
                ></WidgetNotifications>

                <Notifications
                  alerts={this.props.alerts}
                  count={this.props.alertsCount}
                />
              </Col>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card style={{ height: "90%" }}>
            <CardBody>
              <Row>
                <Col>
                  <WidgetCompanyFitness
                    icon="fa fa-user"
                    bColor={
                      count <= 50
                        ? "danger"
                        : count > 50 && count <= 99
                        ? "warning"
                        : "success"
                    }
                    header={count ? `${count}%` : `20%`}
                    value={count.toString()}
                    title="Company"
                  >
                    COMPANY FITNESS
                  </WidgetCompanyFitness>

                  <Company count={count} incomplete={this.props.complet} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Head);
