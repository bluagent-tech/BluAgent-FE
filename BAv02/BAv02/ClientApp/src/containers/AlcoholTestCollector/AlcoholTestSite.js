import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Form,
  Label,
  FormFeedback,
  FormGroup,
} from "reactstrap";
import { actionCreators } from "../../store/DrugAndAlcoholTesting";
import SignatureSection from "../DrugTestCollector/DrugTestSite/SignatureAlcoholSection";
import base64ToByteArray from "../../services/base64ToByteArray";
import ToastAlert from "../../components/ToastAlert";

const formState = {
  serialNumber: "",
  confirmSerialNumber: "",
  validForm: "",
  technician: "",
  device: "",
  waiting: "",
  testingDeviceName: "",
  deviceSerial: "",
  actionTime: "",
  readingTime: "",
  result: "",
  remarks: "",
  issuesCollection: "",
};

const reducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value,
  };
};

const AlcoholTestSite = (props) => {
  const [state, useState] = useReducer(reducer, formState);

  const dispatch = useDispatch();

  const collectorSignature = useSelector(
    (state) => state.drugAndAlcoholTesting.collectorSignature
  );
  const donorSignature = useSelector(
    (state) => state.drugAndAlcoholTesting.donorSignature
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
  const onChange = (e) => {
    useState({ field: e.target.name, value: e.target.value });
  };

  const toBytes = (stringFile) => {
    var parts = stringFile.split(";base64,");
    var base64 = parts[1];
    var byteArray = base64ToByteArray(base64);
    return byteArray;
  };

  const redirectCollector = () => {
    window.location.replace("/#/AlcoholCollector");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let form = new FormData();

    const collectorCertification = document.querySelector(
      'input[name="collectorConfirmation"]:checked'
    )
      ? true
      : false;
    const driverCertification = document.querySelector(
      'input[name="driverConfirmation"]:checked'
    )
      ? true
      : false;
    const collectorDate = document.querySelector(
      'input[name="DateTimeCollectionCollector"]'
    ).value;
    const driverDate = document.querySelector(
      'input[name="DateTimeCollectionDriver"]'
    ).value;

    form.append("ActivationTime", state.actionTime);
    form.append("Device", state.device);
    form.append("DeviceSerialNumber", state.deviceSerial);
    form.append("IssuesCollection", state.issuesCollection);
    form.append("ReadingTime", state.readingTime);
    form.append("Remarks", state.remarks);
    form.append("Result", state.result);
    form.append("Technician", state.technician);
    form.append("TestingDeviceName", state.testingDeviceName);
    form.append("ValidForm", state.validForm);
    form.append("Wait", state.waiting);
    form.append("CollectorCertification", collectorCertification);
    form.append("DriverCertification", driverCertification);
    form.append("DateTimeCollectionCollector", collectorDate);
    form.append("DateTimeCollectionDriver", driverDate);
    form.append("Status", "Collection Completed");
    form.append("FileCollectorSignature", toBytes(collectorSignature));
    form.append("FileDonorSignature", toBytes(donorSignature));
    form.append("IdScheduleTest", props.scheduleData.Id);
    dispatch(actionCreators.createAlcoholTest(form, redirectCollector));
  };

  const {
    serialNumber,
    confirmSerialNumber,
    validForm,
    technician,
    device,
    waiting,
    testingDeviceName,
    deviceSerial,
    actionTime,
    readingTime,
    result,
    remarks,
    issuesCollection,
  } = state;

  return (
    <React.Fragment>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md="12">
            <Card className="text-center">
              <CardHeader
                className="card-blue-gray-header"
                style={{
                  textAlign: "left",
                  fontSize: "12pt",
                }}
              >
                Test Site
              </CardHeader>
              <CardBody style={{ textAlign: "left" }}>
                <Col>
                  <Row>
                    <FormGroup>
                      <label className="font-weight-bold">
                        Is the donor carrying a valid form of identification?
                      </label>
                    </FormGroup>
                  </Row>
                  <Row>
                    <FormGroup className="mr-4">
                      <label>
                        <input
                          type="checkbox"
                          onChange={onChange}
                          checked={validForm === "Yes"}
                          value={"Yes"}
                          style={{ marginRight: "5px" }}
                          name="validForm"
                        />
                        Yes
                      </label>
                    </FormGroup>
                    <FormGroup>
                      <label>
                        <input
                          type="checkbox"
                          onChange={onChange}
                          checked={validForm === "No"}
                          value={"No"}
                          style={{ marginRight: "5px" }}
                          name="validForm"
                        />
                        No
                      </label>
                    </FormGroup>
                  </Row>
                </Col>
                {validForm !== "" ? (
                  <div>
                    <Col>
                      <Row>
                        <label className="font-weight-bold">Technician</label>
                      </Row>
                      <Row>
                        <FormGroup className="mr-4">
                          <label>
                            <input
                              type="checkbox"
                              onChange={onChange}
                              checked={technician === "BAT"}
                              value="BAT"
                              style={{ marginRight: "5px" }}
                              name="technician"
                            />
                            BAT
                          </label>
                        </FormGroup>
                        <FormGroup>
                          <label>
                            <input
                              type="checkbox"
                              onChange={onChange}
                              checked={technician === "STT"}
                              value="STT"
                              style={{ marginRight: "5px" }}
                              name="technician"
                            />
                            STT
                          </label>
                        </FormGroup>
                      </Row>
                    </Col>
                    <Col>
                      {technician !== "" ? (
                        <div>
                          <Row>
                            <label className="font-weight-bold">Device</label>
                          </Row>
                          <Row>
                            <FormGroup className="mr-4">
                              <label>
                                <input
                                  type="checkbox"
                                  onChange={onChange}
                                  checked={device === "Saliva"}
                                  value="Saliva"
                                  style={{ marginRight: "5px" }}
                                  name="device"
                                />
                                Saliva
                              </label>
                            </FormGroup>
                            <FormGroup>
                              <label>
                                <input
                                  type="checkbox"
                                  onChange={onChange}
                                  checked={device === "Breath"}
                                  value="Breath"
                                  style={{ marginRight: "5px" }}
                                  name="device"
                                />
                                Breath
                              </label>
                            </FormGroup>
                          </Row>
                          {device !== "" ? (
                            <div>
                              <Row>
                                <label className="mr-4">15 minute Wait:</label>
                                <FormGroup className="mr-4">
                                  <label>
                                    <input
                                      type="checkbox"
                                      onChange={onChange}
                                      checked={waiting === "Yes"}
                                      value="Yes"
                                      style={{ marginRight: "5px" }}
                                      name="waiting"
                                    />
                                    Yes
                                  </label>
                                </FormGroup>
                                <FormGroup>
                                  <label>
                                    <input
                                      type="checkbox"
                                      onChange={onChange}
                                      checked={waiting === "No"}
                                      value="No"
                                      style={{ marginRight: "5px" }}
                                      name="waiting"
                                    />
                                    No
                                  </label>
                                </FormGroup>
                              </Row>
                              <Row>
                                {waiting !== "" ? (
                                  <FormGroup>
                                    <label htmlFor="issuesCollection">
                                      Issues in Collection?
                                    </label>
                                    <select
                                      className="form-control"
                                      id="issuesCollection"
                                      onChange={onChange}
                                      name="issuesCollection"
                                    >
                                      <option selected>Choose...</option>
                                      <option value={"No Issues"}>
                                        No Issues
                                      </option>
                                      <option value={"Refusal Sign"}>
                                        Refusal To Sign
                                      </option>
                                      <option value={"Initial Vial Refusal"}>
                                        Initial Vial Refusal
                                      </option>
                                      <option value={"Insufficient Sample"}>
                                        Insufficient Sample
                                      </option>
                                      <option value={"Medical Explanation"}>
                                        "Shy Lung" With No Medical Explanation
                                      </option>
                                    </select>
                                  </FormGroup>
                                ) : null}
                              </Row>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </Col>
                  </div>
                ) : null}
                {issuesCollection !== "" &&
                technician === "BAT" &&
                device === "Breath" ? (
                  <div>
                    <Col>
                      <Row>
                        <label className="font-weight-bold">
                          Screening Test
                        </label>
                      </Row>
                      <Row>
                        <Col sm="6" className="pl-0">
                          <FormGroup>
                            <Label htmlFor="testingDeviceName">
                              Testing Device Name:
                            </Label>
                            <Input
                              id="testingDeviceName"
                              name="testingDeviceName"
                              value={testingDeviceName}
                              onChange={onChange}
                              onBlur=""
                              disabled=""
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="6">
                          <FormGroup>
                            <Label htmlFor="deviceSerial">
                              Device Serial # OR Lot & Exp. Date
                            </Label>
                            <Input
                              id="deviceSerial"
                              name="deviceSerial"
                              value={deviceSerial}
                              onChange={onChange}
                              onBlur=""
                              disabled=""
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4" className="pl-0">
                          <FormGroup>
                            <Label htmlFor="actionTime">Action Time:</Label>
                            <Input
                              id="actionTime"
                              name="actionTime"
                              value={actionTime}
                              onChange={onChange}
                              type="date"
                              onBlur=""
                              disabled=""
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label htmlFor="readingTime">Reading Time:</Label>
                            <Input
                              id="readingTime"
                              name="readingTime"
                              type="date"
                              value={readingTime}
                              onChange={onChange}
                              onBlur=""
                              disabled=""
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <Label htmlFor="result">Result</Label>
                            <Input
                              id="result"
                              name="result"
                              value={result}
                              onChange={onChange}
                              onBlur=""
                              disabled=""
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Row>
                            <label className="font-weight-bold">Remarks</label>
                          </Row>
                        </Col>
                        <Col sm="12" className="pl-0">
                          <FormGroup>
                            <Input
                              id="remarks"
                              name="remarks"
                              value={remarks}
                              onChange={onChange}
                              onBlur=""
                              disabled=""
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                ) : null}
                {issuesCollection !== "" ? (
                  <Row>
                    <Col>
                      <SignatureSection reducer={onChange} />
                    </Col>
                  </Row>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default AlcoholTestSite;
