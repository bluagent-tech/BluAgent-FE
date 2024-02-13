import React from "react";
import {
  Button,
  CustomInput,
  FormGroup,
  Col,
  Label,
  Input,
  UncontrolledTooltip,
  Form,
} from "reactstrap";
import base64ToByteArray2 from "./../../../services/base64ToByteArray2";
import dateConvertTables from "./../../../services/dateConvertTables";
import TableCom from "./../../../components/Table";
import dateConvert from "../../../services/dateConvertTables";
import DatePicker from "./../../../components/DatePicker";
import AlertDeleteDrugAlcoholCompliance from "./../../../components/AlertDeleteDrugAlcoholCompliance";

//PRE EMPLOYMENT CONTROLLED SUBSTANCES TEST

class DrugAlcoholTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      File: [],
      Form: "",
      fileName: undefined,
      DateApplication: "",
      openCloseModal: false,
      idDoc: "",
      idDriver: "",
      docType: "",
      docName: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.readFile = this.readFile.bind(this);
    this.ShowEditDrugTest = this.ShowEditDrugTest.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeDateForm = this.changeDateForm.bind(this);
    this.DeleteTest = this.DeleteTest.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  DeleteTest(idDoc, idDriver, docType, docName) {
    this.setState({
      openCloseModal: !this.state.openCloseModal,
      idDoc: idDoc,
      idDriver: idDriver,
      docType: docType,
      docName: docName,
    });
  }

  showHide(type) {
    let elementAdd = document.getElementById("Add" + type + "Test").style;
    let elementEdit = document.getElementById("EditForm" + type).style;
    let elementTable;
    if (type == "Drug") {
      elementTable = document.getElementsByClassName("table-responsive")[3]
        .style;
    } else if (type == "Alcohol") {
      elementTable = document.getElementsByClassName("table-responsive")[4]
        .style;
    }

    if (elementEdit.display === "none") {
      elementAdd.display = "none";
      elementTable.display = "none";
      elementEdit.display = "block";
    } else if (elementEdit.display === "block") {
      elementAdd.display = "block";
      elementTable.display = "block";
      elementEdit.display = "none";
      this.changeDateForm("", "block", "");
    }
  }

  changeDateForm(date, display, Form) {
    if (display === "none") {
      this.setState({ DateApplication: date, Form: Form });
    } else if (display === "block") {
      this.setState({ DateApplication: "", Form: "" });
    }
  }

  ShowEditDrugTest(Reason, Specimen, Result, DateApplication, Form, Id, type) {
    let date = "";
    let elementTable;
    if (DateApplication != null) {
      date = DateApplication.replace("T00:00:00", "");
    }

    let elementAdd = document.getElementById("Add" + type + "Test").style;
    let elementEdit = document.getElementById("EditForm" + type).style;

    if (type == "Drug") {
      elementTable = document.getElementsByClassName("table-responsive")[3]
        .style;
    } else if (type == "Alcohol") {
      elementTable = document.getElementsByClassName("table-responsive")[4]
        .style;
    }

    let elementReason = document.getElementById("ReasonEdit" + type);
    let elementSpecimen = document.getElementById("SpecimenEdit" + type);
    let elementResult = document.getElementById("ResultEdit" + type);
    let elementId = document.getElementById("Id" + type);

    if (elementEdit.display === "none") {
      elementAdd.display = "none";
      elementTable.display = "none";
      elementEdit.display = "block";

      elementReason.value = Reason;
      elementSpecimen.value = Specimen;
      elementResult.value = Result;
      elementId.value = Id;
      this.changeDateForm(date, "none", Form);
    } else if (elementEdit.display === "block") {
      elementAdd.display = "block";
      elementTable.display = "block";
      elementEdit.display = "none";

      elementReason.value = "";
      elementSpecimen.value = "";
      elementResult.value = "";
      this.changeDateForm("", "block", "");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var pre = new FormData(e.target);
    pre.append("IdDriver", this.props.id);
    pre.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    pre.append("file", this.state.File);
    pre.append("TypeTest", this.props.TypeTest);
    this.props.submit(pre);
    this.setState({ File: [], Form: "", fileName: undefined });
  }

  handleSubmitEdit(e, type) {
    e.preventDefault();
    let elementReason = document.getElementById("ReasonEdit" + type);
    let elementSpecimen = document.getElementById("SpecimenEdit" + type);
    let elementResult = document.getElementById("ResultEdit" + type);
    let elementId = document.getElementById("Id" + type);
    var pre = new FormData(e.target);
    var elementDate = new Date(
      document.getElementById("DateAppEdit" + type).value
    );
    var month =
      elementDate.getMonth() + 1 < 10
        ? "0" + (elementDate.getMonth() + 1)
        : elementDate.getMonth() + 1;
    var day =
      elementDate.getDate() < 10
        ? "0" + elementDate.getDate()
        : elementDate.getDate();
    var year = elementDate.getFullYear();
    var date = year + "-" + month + "-" + day;

    pre.append("DateApplication", date);
    pre.append("IdDriver", this.props.id);
    pre.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    pre.append("TypeTest", this.props.TypeTest);
    this.props.submit2(pre);
    elementReason.value = "";
    elementSpecimen.value = "";
    elementResult.value = "";
    elementId.value = "";
    this.showHide(type);
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
    let {
      DateApplication,
      openCloseModal,
      idDoc,
      idDriver,
      docType,
      docName,
    } = this.state;
    let rep = [
      "MRO VERIFIED DATE",
      "REASON FOR TEST",
      "RESULT",
      "TEST #",
      "FILE",
      "EDIT",
      "DELETE",
    ];
    let rowItems = this.props.list
      ? this.props.list.map((row, index) => (
          <tr key={index}>
            <td className="text-center">
              {dateConvertTables(row.DateApplication)}
            </td>
            <td className="text-center">{row.Reason}</td>
            <td className="text-center">{row.Result}</td>
            <td className="text-center">{row.Specimen}</td>
            <td className="text-center">
              <Button
                className="btn buttons-royal text-white"
                style={{ color: "#329ad6" }}
                onClick={() => {
                  this.props.download(
                    this.props.id,
                    row.TypeTest + "TestFile",
                    row.ResultFile
                  );
                }}
              >
                Download
              </Button>
            </td>
            {this.props.TypeTest === "Drug" ? (
              <td className="text-center" colSpan="1">
                <Button
                  className="btn btn-warning text-white"
                  style={{ fontSize: "11pt" }}
                  onClick={() => {
                    this.ShowEditDrugTest(
                      row.Reason,
                      row.Specimen,
                      row.Result,
                      row.DateApplication,
                      row.Form,
                      row.Id,
                      "Drug"
                    );
                  }}
                >
                  Edit
                </Button>
              </td>
            ) : this.props.TypeTest === "Alcohol" ? (
              <td className="text-center" colSpan="1">
                <Button
                  className="btn btn-warning text-white"
                  style={{ fontSize: "11pt" }}
                  onClick={() => {
                    this.ShowEditDrugTest(
                      row.Reason,
                      row.Specimen,
                      row.Result,
                      row.DateApplication,
                      row.Form,
                      row.Id,
                      "Alcohol"
                    );
                  }}
                >
                  Edit
                </Button>
              </td>
            ) : (
              ""
            )}
            <td className="text-center" colSpan="2">
              <Button
                className="btn btn-danger text-white"
                style={{ fontSize: "11pt" }}
                onClick={() => {
                  this.DeleteTest(
                    row.Id,
                    this.props.id,
                    row.TypeTest + "TestFile",
                    row.ResultFile
                  );
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
      : "";
    return (
      <div>
        {this.props.statusR === "ACTIVE" ? (
          <Form
            onSubmit={this.handleSubmit}
            ref={(form) => (this.form = form)}
            name="formPE"
            id={
              this.props.TypeTest === "Drug"
                ? "AddDrugTest"
                : this.props.TypeTest === "Alcohol"
                ? "AddAlcoholTest"
                : ""
            }
          >
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Reason for Test</Label>
                <select
                  className="form-control"
                  id="Reason"
                  name="Reason"
                  required
                >
                  <option value="">SELECT</option>
                  <option value="Pre-employment">Pre-employment</option>
                  <option value="Random">Random</option>
                  <option value="Reasonable Suspicion/Cause">
                    Reasonable Suspicion/Cause
                  </option>
                  <option value="Post Accident">Post Accident</option>
                  <option value="Return to Duty">Return to Duty</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Other(Specify)">Other(Specify)</option>
                </select>
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">
                  {this.props.TypeTest === "Drug" ? "Specimen ID #" : "Test #"}
                </Label>
                <Input
                  type="text"
                  id="Specimen"
                  name="Specimen"
                  maxLength="15"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col
                md="6"
                style={{
                  display:
                    this.state.Form == "Chain of Custody" ? "none" : "block",
                }}
              >
                <Label htmlFor="text-input">Result</Label>
                <select
                  className="form-control"
                  id="Result"
                  name="Result"
                  required={
                    this.state.Form == "Chain of Custody" ? false : true
                  }
                >
                  <option value="">SELECT</option>
                  <option value="Negative">Negative</option>
                  <option value="Positive">Positive</option>
                </select>
              </Col>
              <Col
                md="6"
                style={{
                  display:
                    this.state.Form == "Chain of Custody" ? "none" : "block",
                }}
              >
                <DatePicker
                  id="DateApp"
                  name="DateApplication"
                  labelText={
                    this.props.TypeTest === "Drug"
                      ? "MRO Verified Date"
                      : "Confirmation Date"
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              {this.props.TypeTest === "Drug" ? (
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
              ) : (
                ""
              )}
              <Col md="6">
                <Label htmlFor="text-input">Upload File</Label>
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
                  className="btn buttons-royal text-white px-5"
                  type="submit"
                  disabled={this.props.isLoading ? true : false}
                >
                  Save
                </Button>{" "}
                <Button
                  className="btn buttons-royal text-white px-5"
                  onClick={this.props.toggle}
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
          ""
        )}
        <Form
          onSubmit={(e) => {
            this.handleSubmitEdit(e, "Drug");
          }}
          ref={(form) => (this.form = form)}
          name="formPEdit"
          id="EditFormDrug"
          style={{
            display: "none",
          }}
        >
          <FormGroup row>
            <Col md="6">
              <Label htmlFor="text-input">Reason for Test</Label>
              <select
                className="form-control"
                id="ReasonEditDrug"
                name="Reason"
                required
              >
                <option value="">SELECT</option>
                <option value="Pre-employment">Pre-employment</option>
                <option value="Random">Random</option>
                <option value="Reasonable Suspicion/Cause">
                  Reasonable Suspicion/Cause
                </option>
                <option value="Post Accident">Post Accident</option>
                <option value="Return to Duty">Return to Duty</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Other(Specify)">Other(Specify)</option>
              </select>
            </Col>
            <Col md="6">
              <Label htmlFor="text-input">
                {this.props.TypeTest === "Drug" ? "Specimen ID #" : "Test #"}
              </Label>
              <Input
                type="text"
                id="SpecimenEditDrug"
                name="Specimen"
                maxLength="15"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col
              md="6"
              style={{
                display:
                  this.state.Form == "Chain of Custody" ? "none" : "block",
              }}
            >
              <Label htmlFor="text-input">Result</Label>
              <select
                className="form-control"
                id="ResultEditDrug"
                name="Result"
                required
              >
                <option value="">SELECT</option>
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
            </Col>
            <Col
              md="6"
              style={{
                display:
                  this.state.Form == "Chain of Custody" ? "none" : "block",
              }}
            >
              <DatePicker
                id="DateAppEditDrug"
                value={DateApplication}
                labelText={
                  this.props.TypeTest === "Drug"
                    ? "MRO Verified Date"
                    : "Confirmation Date"
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            {this.props.TypeTest === "Drug" ? (
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
                  id="FormEditDrug"
                  required
                  value={this.state.Form}
                  onChange={this.onChange}
                >
                  <option value="">SELECT</option>
                  <option value="MRO Certificate">MRO Certificate</option>
                  <option value="Chain of Custody">Chain of Custody</option>
                </select>
              </Col>
            ) : (
              ""
            )}
            <Col md="6">
              <Input type="hidden" id="IdDrug" name="Id" />
            </Col>
          </FormGroup>
          <br />
          <FormGroup row>
            <Col md="6">
              <Button
                className="btn buttons-royal text-white px-5"
                type="submit"
                disabled={this.props.isLoading ? true : false}
              >
                Update
              </Button>{" "}
              <Button
                className="btn buttons-royal text-white px-5"
                onClick={() => {
                  this.showHide("Drug");
                }}
              >
                Cancel
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
        {this.props.TypeTest === "Drug" ? (
          ""
        ) : (
          <Form
            onSubmit={(e) => {
              this.handleSubmitEdit(e, "Alcohol");
            }}
            ref={(form) => (this.form = form)}
            name="formPEditAlcohol"
            id="EditFormAlcohol"
            style={{
              display: "none",
            }}
          >
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Reason for Test</Label>
                <select
                  className="form-control"
                  id="ReasonEditAlcohol"
                  name="Reason"
                  required
                >
                  <option value="">SELECT</option>
                  <option value="Pre-employment">Pre-employment</option>
                  <option value="Random">Random</option>
                  <option value="Reasonable Suspicion/Cause">
                    Reasonable Suspicion/Cause
                  </option>
                  <option value="Post Accident">Post Accident</option>
                  <option value="Return to Duty">Return to Duty</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Other(Specify)">Other(Specify)</option>
                </select>
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">
                  {this.props.TypeTest === "Drug" ? "Specimen ID #" : "Test #"}
                </Label>
                <Input
                  type="text"
                  id="SpecimenEditAlcohol"
                  name="Specimen"
                  maxLength="15"
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col
                md="6"
                style={{
                  display:
                    this.state.Form == "Chain of Custody" ? "none" : "block",
                }}
              >
                <Label htmlFor="text-input">Result</Label>
                <select
                  className="form-control"
                  id="ResultEditAlcohol"
                  name="Result"
                  required
                >
                  <option value="">SELECT</option>
                  <option value="Negative">Negative</option>
                  <option value="Positive">Positive</option>
                </select>
              </Col>
              <Col
                md="6"
                style={{
                  display:
                    this.state.Form == "Chain of Custody" ? "none" : "block",
                }}
              >
                <DatePicker
                  id="DateAppEditAlcohol"
                  value={DateApplication}
                  labelText={
                    this.props.TypeTest === "Drug"
                      ? "MRO Verified Date"
                      : "Confirmation Date"
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              {this.props.TypeTest === "Drug" ? (
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
                    id="FormEditAlcohol"
                    required
                    value={this.state.Form}
                    onChange={this.onChange}
                  >
                    <option value="">SELECT</option>
                    <option value="MRO Certificate">MRO Certificate</option>
                    <option value="Chain of Custody">Chain of Custody</option>
                  </select>
                </Col>
              ) : (
                ""
              )}
              <Col md="6">
                <Input type="hidden" id="IdAlcohol" name="Id" />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Col md="6">
                <Button
                  className="btn buttons-royal text-white px-5"
                  type="submit"
                  disabled={this.props.isLoading ? true : false}
                >
                  Update
                </Button>{" "}
                <Button
                  className="btn buttons-royal text-white px-5"
                  onClick={() => {
                    this.showHide("Alcohol");
                  }}
                >
                  Cancel
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
        )}

        <TableCom
          rowItems={rowItems}
          header={rep}
          count={this.props.count}
          page={this.props.page}
          getItems={(index) => {
            this.props.TypeTest === "Drug"
              ? this.props.get(
                  this.props.id,
                  index,
                  3,
                  1,
                  3,
                  this.props.TypeTest
                )
              : this.props.get(
                  this.props.id,
                  1,
                  3,
                  index,
                  3,
                  this.props.TypeTest
                );
          }}
        />
        <AlertDeleteDrugAlcoholCompliance
          message="You are sure to delete this Test"
          modal={openCloseModal}
          toggle={() => {
            this.DeleteTest("", "", "", "");
          }}
          delete={() => {
            this.props.deleteDocDACompliance(idDoc, idDriver, docType, docName);
            this.DeleteTest("", "", "", "");
          }}
        />
      </div>
    );
  }
}

export default DrugAlcoholTest;
