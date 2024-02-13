import React, { Component, lazy } from "react";
import { Row, Col, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";
import ImageUploader from "react-images-upload";
import "./../../components/TutorialTab/style.css";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";
import Company from "../../containers/Company/CompanyModal/Company";
import Notifications from "../../containers/Company/CompanyModal/Notifications";
const Widget05 = lazy(() => import("../../views/Widgets/Widget05"));
const Widget04 = lazy(() => import("../../views/Widgets/Widget04"));

//HEAD DASHBOARD COMPANY

class Header extends Component {
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
    company.append("file", file);
    this.props.saveCompanyLogo(company);
    document.getElementById("saveLogo").style.display = "none";
  }

  render() {
    var count = 0;
    if (this.props.complet !== undefined) {
      this.props.complet.map(f => {
        if (f === 1) {
          count += 20;
        }
      });
    }

    //var complet = Math.ceil((100 / 5) * count);

    return (
      <Row>
        <Col xs="12" sm="6" lg="4">
          <Widget05
            id="avatarImg"
            color="secondary"
            header="0%"
            value="20"
            default = {this.props.company.Image === null ? false : true}
            src={
              this.props.company.Image === null
                ? `https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.company.Id}/companyLogo.png`
                : "assets/img/Images/logoCompany/profile.png"
            }
          >
            <ImageUploader
              withIcon={false}
              buttonText="+"
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
              <Button id="saveLogo" color="primary" style={{ display: "none" }}>
                {" "}
                Save
              </Button>{" "}
            </center>
            <div>
              <div className="text-center">{this.props.company.LegalName}</div>
              <div style={{ marginBottom: "10px" }}>
                USDOT | {this.props.company.Dot}
              </div>
            </div>
          </Widget05>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Widget04
            icon="fa fa-bell"
            bColor={this.props.alertsCount > 0 ? "danger" : "success"}
            header={
              this.props.alertsCount ? this.props.alertsCount.toString() : "0"
            }
            value="100"
            title="Notifications"
          >
            <Notifications
              alerts={this.props.alerts}
              count={this.props.alertsCount}
            />
          </Widget04>
        </Col>
        <Col xs="12" sm="6" lg="4">
          <Widget04
            icon="fa fa-user"
            bColor={
              count <= 50
                ? "danger"
                : count > 50 && count <= 99
                ? "warning"
                : "success"
            }
            header={"" + count + "%"}
            value={count.toString()}
            title="Company"
          >
            <Company count={count} incomplete={this.props.complet} />
          </Widget04>
        </Col>
      </Row>
    );
  }
}

export default connect(
  state => state.notification,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Header);
