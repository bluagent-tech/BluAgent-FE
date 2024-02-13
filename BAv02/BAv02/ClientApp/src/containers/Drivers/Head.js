import React, {Component, lazy} from "react";
import {Col, Row, Button, Card, CardBody} from "reactstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../store/Drivers";
import Alerts from "../Drivers/DashboardModal/Alerts";
import DriverFitness from "../../containers/Drivers/DashboardModal/DriverFitness";
const Widget05 = lazy(() => import("../../views/Widgets/Widget05"));
const Widget04 = lazy(() => import("../../views/Widgets/Widget04"));
const idCompany = localStorage["idCompany"];
import ImageUploader from "react-images-upload";
import "./../../components/TutorialTab/style.css";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";
//HEAD DASHBOARD DRIVERS

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {Text: ""};
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

    var driver = new FormData();
    driver.append("idCompany", idCompany);
    driver.append("idU", this.props.id);
    driver.append("file", file);
    this.props.saveDriverLogo(driver);
    document.getElementById("saveLogo").style.display = "none";
  }


  UNSAFE_componentWillMount() {
    this.props.getAlerts(this.props.id);
    this.props.getDocuments(this.props.id, 1, 100);
    this.props.getDriverFitness(this.props.id);
  }

  render() {
    var count = 0;
    this.props.fitness.map((f) => (f === 0 ? count++ : null));
    var fit = Math.ceil((100 / this.props.fitness.length) * count);
    return (
      <Row>
        <Col xs="12" sm="6" lg="4">
          <Card>
            <CardBody>
              <Widget05
                color="secondary"
                header="0%"
                value="25"
                className="apple-image"
                default = {
                  this.props.driver.Image === null ||
                  this.props.driver.Image === undefined ? true : false}
                src={
                  this.props.driver.Image === null ||
                  this.props.driver.Image === undefined
                    ? "assets/img/Images/profile/profile.png"
                    : `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${this.props.id}/driverAvatar.png`
                }
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
                <div className="text-center">
                  {this.props.driver.Name !== undefined
                    ? this.props.driver.Name + " " + this.props.driver.LastName
                    : ""}
                </div>
                <div className="text-center">
                  <span>
                    SSN |{" "}
                    {this.props.driver.Ssn !== undefined &&
                    this.props.driver.Ssn !== null
                      ? "XXXXX" + this.props.driver.Ssn.substring(5, 9)
                      : ""}
                  </span>
                  <br />
                  <span>License | {this.props.driver.License}</span>
                </div>
              </Widget05>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card style={{ height: '90%' }}>
            <CardBody>
              <Widget04
                icon="fa fa-bell"
                bColor={this.props.alertsCount > 0 ? "danger" : "success"}
                header={this.props.alertsCount.toString()}
                value="100"
                title="Notifications"
              >
                <Button
                  type="submit"
                  onClick={this.props.toggleA}
                  size="sm"
                  color={this.props.alertsCount > 0 ? "danger" : "success"}
                  disabled={
                    this.props.driver.Status === "ACTIVE" &&
                    this.props.alertsCount > 0
                      ? false
                      : true
                  }
                >
                  {" "}
                  Needs Work
                </Button>
                <Alerts
                  toggleA={this.props.toggleA}
                  modalDA={this.props.modalDA}
                  states={this.props.states}
                  isLoading={this.props.isLoading}
                  error={this.props.error}
                  id={this.props.id}
                />
              </Widget04>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Card style={{ height: '90%' }}>
            <CardBody>
              <Widget04
                icon="fa fa-user"
                color="secondary"
                bColor={
                  count <= 4
                    ? "danger"
                    : count > 4 && count <= 8
                    ? "warning"
                    : count > 9
                    ? "success"
                    : "primary"
                }
                header={fit + "%"}
                value={fit.toString()}
                title="Driver Fitness"
              >
                <DriverFitness
                  bColor={
                    count <= 4
                      ? "danger"
                      : count > 4 && count <= 8
                      ? "warning"
                      : (count = 9 ? "success" : "primary")
                  }
                  fitness={this.props.fitness}
                  statusR={this.props.driver.Status}
                />
              </Widget04>
            </CardBody>
          </Card>
        </Col>
        {/*
        <Col xs="12" sm="6" lg="3">
          <Widget04
            icon="fa fa-bar-chart"
            bColor="warning"
            header="92%"
            title="Driver Rating"
            value="92"
          >
            <DriverRating statusR={this.props.driver.Status} />
          </Widget04>
        </Col>
                <Col sm="4">
                    <Card>
                        <CardHeader>
                            ALERTS
                             <div className="card-header-actions">
                                <button><i className="fa fa-bell-o float-right" onClick={this.props.toggleA}></i></button>
                                <Alerts toggleA={this.props.toggleA} modalDA={this.props.modalDA} states={this.props.states} isLoading={this.props.isLoading} error={this.props.error} id={this.props.id} />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <ListAlerts options={this.props.alert} name="Alert" />
                        </CardBody>

                    </Card>
                </Col>
                <Col sm="3">
                    <Card>
                        <CardHeader>
                            UPLOAD FILES
                            <div className="card-header-actions">
                                <button><i className="fa fa-download float-right" onClick={this.props.toggleDocs}></i></button>
                                <Upload toggleDocs={this.props.toggleDocs} modal1={this.props.modal1} states={this.props.states} OnSubmit={this.props.saveDoc} isLoading={this.props.isLoading} error={this.props.error} id={this.props.id} />
                            </div>
                        </CardHeader>

                        <CardBody>
                            <Documents options={this.props.doc} name="Text" />
                        </CardBody>

                    </Card>
                </Col>*/}
      </Row>
    );
  }
}
export default connect(
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Head);
