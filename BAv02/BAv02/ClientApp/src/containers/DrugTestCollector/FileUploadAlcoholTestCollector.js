import React from "react";
import {
  Button,
  CustomInput,
  FormGroup,
  Col,
  Label,
  Form,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "./../../store/DrugAndAlcoholTesting";
import base64ToByteArray2 from "./../../services/base64ToByteArray2";
import DatePicker from "./../../components/DatePicker";
import DropdownMenu from "./../../components/DropdownMenu";
import AlertDelete from "./../../components/AlertDelete";
import "./../../components/Styles/FilesCard.css";

class FileUploadAlcoholTestCollector extends React.Component {
  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.readFile = this.readFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { File: [], Form: "", fileName: undefined };
  }

  uploadFile(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    let request = () => {
      this.props.getProviderScheduledAlcoholTests("BluAgent");
    };
    let closeModal = () => {
      this.props.openCloseAlcoholTest(this.props.alcoholTest.IdScheduleTest);
    };
    let reset = () => {
      document.forms["formPE"].reset();
    };
    form.append("IdDriver", this.props.alcoholScheduleData.IdDriver);
    form.append("idCompany", this.props.alcoholScheduleData.IdCompany);
    form.append("file", this.state.File);
    form.append("TypeTest", "Alcohol");
    form.append("specimenNumber", this.props.alcoholTest.TestNumber);
    form.append("Reason", this.props.alcoholScheduleData.Reason);
    this.props.saveDrugAlcoholTest(form, request, closeModal, reset);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  readFile(e) {
    var input = e.target;
    var nameFile = input.files[0].name.substr(-4);
    if (input) {
      var reader = new FileReader();
      var pdf = "";
      reader.onload = (e) => {
        pdf = base64ToByteArray2(e.target.result);
        if (nameFile === ".pdf") {
          document.getElementById("error").style.display = "none";
          this.setState({ File: pdf });
        } else {
          document.getElementById("error").style.display = "inline-block";
          this.setState({ File: "" });
        }
      };

      try {
        this.setState({ fileName: input.files[0].name });
        reader.readAsDataURL(input.files[0]);
      } catch (error) {}
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Modal isOpen={this.props.modalAlcoholTest} className={"modal-lg "}>
          <ModalHeader
            name="filePondModal"
            toggle={this.props.openCloseAlcoholTest}
          >
            Alcohol Test Result
          </ModalHeader>
          <ModalBody>
            {this.props.FileCompliance === "" ? (
              <Form onSubmit={this.uploadFile}>
                {this.state.Form !== "Chain of Custody" ? (
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">Result</Label>
                      <select
                        className="form-control"
                        id="Result"
                        name="Result"
                        required
                      >
                        <option value="">SELECT</option>
                        <option value="Negative">Negative</option>
                        <option value="Positive">Positive</option>
                        {/*
                        <option value="Negative - Diluted">
                          Negative-Diluted
                        </option>
                        <option value="Refusal to Test - Adultered">
                          Refusal to Test - Adultered
                        </option>
                        <option value="Refusal to Test - Substituted">
                          Refusal to Test - Substituted
                        </option>
                        <option value="Refusal to Test - Other">
                        Refusal to Test - Other
                        </option>
                        */}
                      </select>
                    </Col>
                    <DatePicker
                      id="DateApp"
                      name="DateApplication"
                      labelText={
                        this.props.TypeTest === "Drug"
                          ? "MRO Verified Date"
                          : "Confirmation Date"
                      }
                    />
                    <Col md="4">
                      <Label htmlFor="text-input">Alcohol Level</Label>
                      <select
                        className="form-control"
                        id="PositiveFor"
                        name="PositiveFor"
                        onChange={this.onChange}
                        required
                      >
                        <option value="">SELECT</option>
                        <option value=">=0.02">{">= 0.02"}</option>
                        <option value="<0.02">{"< 0.02"}</option>
                      </select>
                    </Col>
                  </FormGroup>
                ) : (
                  ""
                )}
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="text-input">
                      Form
                      <i
                        id="Formx"
                        className="icon-question"
                        style={{ marginLeft: "5px", color: "grey" }}
                      ></i>
                      <UncontrolledTooltip placement="right" target="Formx">
                        {this.state.Form !== "Chain of Custody"
                          ? " It is a Medical Certificate explanation by a USDOT License physician for a laboratory-confirmed positive, adulterated, or substituted  result, and review and report a verified result to the designated employer representative (DER) in a timely and confidential manner."
                          : "Federal Drug Testing Custody and Control Form - Copy 4 Employer Copy."}
                      </UncontrolledTooltip>
                    </Label>
                    <select
                      className="form-control"
                      name="Form"
                      required
                      value={this.state.Form}
                      onChange={this.onChange}
                    >
                      <option value="">SELECT</option>
                      <option value="MRO Certificate">MRO Certificate</option>
                      <option value="Chain of Custody">Chain of Custody</option>
                    </select>
                  </Col>
                  <Col md="6">
                    <Label htmlFor="text-input">Upload Test Result</Label>
                    <Label
                      className="error"
                      id="error"
                      style={{
                        display: "none",
                        marginLeft: "10px",
                        fontSize: "8pt",
                      }}
                    >
                      File not supported
                    </Label>
                    <CustomInput
                      label={this.state.fileName}
                      type="file"
                      accept=".pdf"
                      id="filect"
                      name="Filect"
                      onChange={this.readFile}
                      required
                    />
                  </Col>
                </FormGroup>
                <br />
                <FormGroup row>
                  <Col md="6">
                    <Button
                      color="primary"
                      type="submit"
                      disabled={this.props.isLoading ? true : false}
                    >
                      Save
                    </Button>{" "}
                    <Button
                      color="danger"
                      onClick={this.props.openCloseAlcoholTest}
                    >
                      Close
                    </Button>{" "}
                  </Col>
                  {this.props.isLoading ? (
                    <img
                      style={{
                        width: "140px",
                        position: "absolute",
                        marginTop: "0px",
                        right: "40%",
                      }}
                      src="../../assets/img/icons/loading2.gif"
                      alt="loading"
                    />
                  ) : (
                    <div />
                  )}
                </FormGroup>
              </Form>
            ) : (
              <div className="row">
                <div className="country-card-container align-items-center w-100 border-gray d-flex rounded border mx-2 my-1  p-0 bg-white">
                  <div className="col-sm-6 col-md-6 d-flex align-items-center">
                    <div className="h-100 position-relative px-2 bg-white rounded-left">
                      {
                        <img
                          style={{ width: "50px", padding: "5px" }}
                          src="/assets/icons/icons8-agreement.svg"
                          className="d-block h-100"
                          alt="PDF File"
                        />
                      }
                    </div>
                    <span className="country-name text-dark d-block font-weight-bold">
                      {this.props.alcoholTest.TestNumber}.pdf
                    </span>
                  </div>
                  <div className="col-sm-6 col-md-6 d-flex justify-content-end">
                    <DropdownMenu
                      class="FileCardsDropdown"
                      direction="right"
                      toggleDeleteModal={() => {
                        this.props.downloadDocCollector(
                          this.props.alcoholScheduleData.IdDriver,
                          this.props.alcoholScheduleData.IdCompany,
                          "AlcoholTestFile",
                          this.props.FileCompliance,
                          this.props.alcoholTest.TestNumber
                        );
                      }}
                      menuOptions={[
                        [
                          "Delete",
                          () => {
                            this.props.toggleD(0);
                          },
                        ],
                        ["Download", "This is a function"],
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}
            <AlertDelete
              message="You are sure that delete that Document"
              modal={this.props.modalD}
              toggle={() => {
                this.props.toggleD(0);
              }}
              delete={() => {
                this.props.deleteDocOfCollector(
                  this.props.alcoholScheduleData.IdDriver,
                  this.props.alcoholScheduleData.IdCompany,
                  "AlcoholTestFile",
                  this.props.FileCompliance,
                  this.props.alcoholTest.TestNumber
                );
              }}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(FileUploadAlcoholTestCollector);
