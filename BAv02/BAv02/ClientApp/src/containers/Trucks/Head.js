import React, { Component, lazy } from "react";
import { Row, Col, Button, CardBody, Card, Alert } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Trucks";
import Alerts from "./DashboardModal/Alerts";
import TrucksNotifications from "./../../views/Widgets/TrucksNotificatons";
import ImageUploader from "react-images-upload";
import "./../../components/TutorialTab/style.css";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";
const idCompany = localStorage["idCompany"];
const Widget05 = lazy(() => import("../../views/Widgets/Widget05"));

//DASHBOARD HEAD WIDGET TRUCK

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = { Text: "" };
    this.onDrop = this.onDrop.bind(this);
    this.saveLogo = this.saveLogo.bind(this);
  }

  componentDidMount() {
    this.props.getAlerts(
      this.props.id,
      JSON.parse(localStorage.getItem("user")).Id
    );
    this.props.getAllDocuments(this.props.id, "VEHICLE", 1, 100);
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

    var truck = new FormData();
    truck.append("idCompany", idCompany);
    truck.append("idTruck", this.props.id);
    truck.append("file", file);
    this.props.saveTruckLogo(truck);
    document.getElementById("saveLogo").style.display = "none";
  }

  vehicleImg = (FileImage, VehicleType) => {
    let img;

    if (FileImage !== null && FileImage !== undefined) {
      img = `https://bluagent-files.s3-us-west-2.amazonaws.com/${localStorage["idCompany"]}/TrucksFile/${this.props.id}/truckAvatar.png`;
    } else {
      if (VehicleType) {
        switch (VehicleType.trim().toLowerCase()) {
          case "truck":
            img = "assets/icons/icons8-truck.svg";
            break;
          case "car":
            img = "assets/icons/icons8-car.svg";
            break;
          case "tow truck":
            img = "assets/icons/icons8-tow-truck.svg";
            break;
          case "bus":
            img = "assets/icons/icons8-bus.svg";
            break;
          case "flatbed truck":
            img = "assets/icons/icons8-in-flat-bed.svg";
            break;
          case "pick-up":
            img = "assets/icons/icons8-pickup.svg";
            break;
          case "semi-trailer truck":
            img = "assets/icons/icons8-semi-truck.svg";
            break;
          case "van":
            img = "assets/icons/icons8-vanpool.svg";
            break;
          default:
            img = "assets/icons/icons8-truck.svg";
            break;
        }
      }
    }

    return img;
  };

  render() {
    return (
      <Row>
        <Col xs="12" sm="12" lg="6" md="6">
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <Widget05
                    color="secondary"
                    header="0%"
                    value="25"
                    className="apple-image"
                    default={
                      this.props.truck.FileImage !== null &&
                        this.props.truck.FileImage !== undefined ? false : true}
                    src={this.vehicleImg(
                      this.props.truck.FileImage,
                      this.props.truck.VehicleType
                    )}
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
                <Col lg="8">
                  <div>
                    <span>VIN | {this.props.truck.Vin}</span> <br />
                    <span>Plate | {this.props.truck.Plate}</span>
                  </div>
                  <Alert
                    style={{ visibility: "hidden" }}
                    className="mt-5 complete-record-success"
                    color="success"
                  >
                    <div className="text-uppercase text-white">
                      Record Complete
                    </div>
                  </Alert>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="12" lg="6" md="6">
          <Card style={{ height: "90%" }}>
            <CardBody>
              <TrucksNotifications
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
                  disabled={this.props.alertsCount > 0 ? false : true}
                >
                  {" "}
                  Needs Work
                </Button>
                <Alerts
                  toggleA={this.props.toggleA}
                  modalA={this.props.modalA}
                  states={this.props.states}
                  isLoading={this.props.isLoading}
                  error={this.props.error}
                  id={this.props.id}
                />
              </TrucksNotifications>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(
  (state) => state.trucks,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Head);
