import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Alert,
  CardHeader,
  Table,
  Media,
  Button,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../store/DrugAndAlcoholTesting";
import dateConvert from "../../services/dateConvertTables";
import ToastAlert from "../../components/ToastAlert";
import AlcoholTestSite from "../../containers/AlcoholTestCollector/AlcoholTestSite";

const AlcoholTestDetail = () => {
  const dispatch = useDispatch();
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const scheduledData = useSelector(
    (state) => state.drugAndAlcoholTesting.scheduledAlcoholTestData
  );

  const updateSuccessful = useSelector(
    (state) => state.drugAndAlcoholTesting.updateSuccessful
  );

  const errorMessage = useSelector(
    (state) => state.drugAndAlcoholTesting.error
  );

  const message = useSelector(
    (state) => state.drugAndAlcoholTesting.message
  );

  const toastState = useSelector(
    (state) => state.drugAndAlcoholTesting.toastAlertState
  );

  useEffect(() => {
    dispatch(actionCreators.getProviderScheduledAlcoholTestData(id));
  }, [updateSuccessful]);

  const handleStartCollection = (e) => {
    e.preventDefault();

    dispatch(
      actionCreators.UpdateStatusScheduleAlcoholTest(
        scheduledData.Id,
        "Collection Initiated"
      )
    );
  };
  return (
    <React.Fragment>
      <ToastAlert
        toggleToast={actionCreators.toggleToastAlert}
        isOpen={toastState}
        message={message}
        error={errorMessage}
      />
      <div className="container-fluid" style={{ marginTop: "3%" }}>
        <div className="animated fadeIn">
          <h2>Alcohol Test Details</h2>
        </div>

        <Row>
          <Col sm="12">
            <Card className="text-center">
              <CardHeader
                className="card-blue-gray-header"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                }}
              >
                Applicant Information
              </CardHeader>
              <CardBody style={{ textAlign: "left" }}>
                <h4>{scheduledData.LegalName}</h4>
                <h5>DOT NUMBER: {scheduledData.Dot}</h5>
                <h5>{scheduledData.Der}</h5>
                <div>{scheduledData.CompanyAddress}</div>
                <div>
                  {scheduledData.CompanyCity}, {scheduledData.PhysicalZip}
                </div>
                <div>{scheduledData.Email}</div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card className="text-center">
              <CardHeader
                className="card-blue-gray-header"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                }}
              >
                Test Information
              </CardHeader>
              <CardBody style={{ textAlign: "left" }}>
                <div style={{ backgroundColor: "#e4e7ea", margin: "5px" }}>
                  <Row style={{ padding: "10px" }}>
                    <Col md="6">Type of Test</Col>
                    <Col md="6">
                      {scheduledData.FederalTest ? "Federal" : "Non Federal"}
                    </Col>
                  </Row>
                  <Row style={{ padding: "10px" }}>
                    <Col md="6">
                      <b>Authority Control</b>
                    </Col>
                    <Col md="6">{scheduledData.TestingAuthority}</Col>
                  </Row>
                  <Row style={{ padding: "10px" }}>
                    <Col md="6">Alcohol Test</Col>
                    <Col md="6">{scheduledData.Performed}</Col>
                  </Row>
                  <Row style={{ padding: "10px" }}>
                    <Col md="6">Collection Observed</Col>
                    <Col md="6">Yes</Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card className="text-center">
              <CardHeader
                className="card-blue-gray-header"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                }}
              >
                Donor Information
              </CardHeader>
              <CardBody>
                <Media>
                  <Media left style={{ width: "30%" }}>
                    <img
                      style={{ width: "65%" }}
                      className="img-avatar"
                      alt="avatar"
                      src={
                        scheduledData.FileImage === null ||
                        scheduledData.FileImage === undefined
                          ? "assets/icons/icons8-customer.svg"
                          : `https://bluagent-files.s3-us-west-2.amazonaws.com/${scheduledData.IdCompany}/Drivers/${scheduledData.IdDriver}/driverAvatar.png`
                      }
                    ></img>
                  </Media>

                  <Media style={{ textAlign: "left", width: "50%" }} body>
                    <Media heading>{scheduledData.Driver}</Media>
                    <Media style={{ color: "#969696", fontSize: "12pt" }} body>
                      <p>
                        Birthday :
                        <span style={{ marginLeft: "20px" }}>
                          {dateConvert(scheduledData.Birthdate)}
                        </span>
                      </p>
                      <p>
                        Phone number morning :
                        <span style={{ marginLeft: "20px" }}>
                          {scheduledData.DriverPhoneNumber}
                        </span>
                      </p>
                      <p>
                        Phone number afternoon :
                        <span style={{ marginLeft: "20px" }}>
                          {scheduledData.DriverPhoneNumber}
                        </span>
                      </p>
                      <p>
                        Employee ID :
                        <span style={{ marginLeft: "20px" }}>
                          {scheduledData.EmployeeId}
                        </span>
                      </p>
                      <p>
                        Number License :
                        <span style={{ marginLeft: "20px" }}>
                          {scheduledData.License}
                        </span>
                      </p>
                    </Media>
                  </Media>
                  {/* {this.props.DrugTestData === undefined ||
                      this.props.DrugTestData === null ? (
                        ''
                      ) : this.props.DrugTestData.DonorSignature !== null ||
                        this.props.DrugTestData.DonorSignature !== undefined ? (
                        <Media right>
                          <img
                            alt='avatar'
                            style={{ width: '65%' }}
                            className='img-avatar'
                            src={`https://bluagent-files.s3-us-west-2.amazonaws.com/Collectors/DrugTestSignatures/${this.props.DrugTestData.SpecimenNumber}/DonorSignature.png`}
                          />
                        </Media>
                      ) : (
                        ''
                      )} */}
                </Media>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card className="text-center">
              <CardHeader
                className="card-blue-gray-header"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                }}
              >
                Collection Site information
              </CardHeader>
              <CardBody style={{ textAlign: "left" }}>
                <h4>BLUAGENTS'S COLLECTION SITE</h4>
                <div>9765 Marconi Driver</div>
                <div>San Diego, CA, 92154</div>
                <div>Phone: (619) 878-5852</div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {scheduledData.Status !== "Collection Completed" &&
          scheduledData.Status !== "Collection Initiated" ? (
            <Col style={{ marginBottom: "20px" }} sm="12">
              <Button
                color='success'
                className="royals-button text-white"
                onClick={handleStartCollection}
              >
                Start Collection
              </Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
        {scheduledData.Status === "Collection Initiated" ? (
          <div>
            <AlcoholTestSite scheduleData={scheduledData} />
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default AlcoholTestDetail;
