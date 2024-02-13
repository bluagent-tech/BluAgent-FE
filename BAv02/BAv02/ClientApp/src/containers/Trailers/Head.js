import React, { Component, lazy } from 'react';
import { Col, Row, Button, CardBody, Card, Alert } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Trailers';
import Alerts from './DashboardModal/Alerts';
import ImageUploader from "react-images-upload";
import "./../../components/TutorialTab/style.css";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";
const idCompany = localStorage["idCompany"];
import TrailersNotifications from './../../views/Widgets/TrailerNotifications';
const Widget05 = lazy(() => import('../../views/Widgets/Widget05'));

//DASHBOARD HEAD WIDGET TRAILER

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = { Text: '' };
    this.onDrop = this.onDrop.bind(this);
    this.saveLogo = this.saveLogo.bind(this);
  }

  componentDidMount() {
    this.props.getAlerts(
      this.props.id,
      JSON.parse(localStorage.getItem('user')).Id
    );
    this.props.getAllDocuments(this.props.id, 'TRAILER', 1, 7);
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

    var trailer = new FormData();
    trailer.append("idCompany", idCompany);
    trailer.append("idTrailer", this.props.id);
    trailer.append("file", file);
    this.props.saveTrailerLogo(trailer);
    document.getElementById("saveLogo").style.display = "none";
  }

  render() {
    return (
      <Row>
        <Col xs='12' sm='12' lg='6'>
          <Card>
            <CardBody>
              <Row>
                <Col lg='4'>
                  <Widget05
                    color='secondary'
                    header='0%'
                    value='25'
                    default={this.props.trailer.FileImage === null ? true : false}
                    src={
                      this.props.trailer.FileImage === null
                        ? 'assets/maintenancePdf/Images/defaultTrailer.png'
                        : `https://bluagent-files.s3-us-west-2.amazonaws.com/${localStorage['idCompany']}/TrailersFile/${this.props.trailer.IdTrailer}/trailerAvatar.png`
                    }
                  ><ImageUploader
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
                <Col lg='8'>
                  <div className='text-muted text-center'>
                    <span>{this.props.trailer.TrailerNumber}</span>
                    <br />
                    <span>VIN | {this.props.trailer.Vin}</span>
                    <br />
                    <span>Plate | {this.props.trailer.Plate}</span>
                    <Alert
                      style={{ visibility: 'hidden' }}
                      className='mt-3 complete-record-success'
                      color='success'
                    >
                      <div className='text-uppercase text-white'>
                        Record Complete
                      </div>
                    </Alert>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs='12' sm='6' lg='6'>
          <Card style={{height: "90%"}}>
            <CardBody>
              <TrailersNotifications
                icon='fa fa-bell'
                bColor={this.props.alertsCount > 0 ? 'danger' : 'success'}
                header={this.props.alertsCount.toString()}
                value='100'
                title='Notifications'
              >
                <Button
                  type='submit'
                  onClick={this.props.toggleA}
                  size='sm'
                  color={this.props.alertsCount > 0 ? 'danger' : 'success'}
                  disabled={this.props.alertsCount > 0 ? false : true}
                >
                  {' '}
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
              </TrailersNotifications>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default connect(
  (state) => state.trailers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Head);
