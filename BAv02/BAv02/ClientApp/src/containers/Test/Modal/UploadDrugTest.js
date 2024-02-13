import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CustomInput,
  FormGroup,
  Col,
  Label,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/DrugAndAlcoholTesting";
import base64ToByteArray2 from "./../../../services/base64ToByteArray2";
import DatePicker from "./../../../components/DatePicker";
import dateConvertTables from "./../../../services/dateConvertTables";
import TableCom from "./../../../components/Table";
import AlertDelete from "./../../../components/AlertDelete";
import DrugAlcoholTest from "./../../Drivers/DriverModal/DrugAlcoholTest";

//PRE EMPLOYMENT CONTROLLED SUBSTANCES TEST

class UploadDrugTest extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      DescriptionDoc: "",
      activeTab: new Array(4).fill("1"),
      File: [],
      fileName: undefined,
    };
    this.onChange = this.onChange.bind(this);
  }

  onClose() {
    //this.setState({ Type: undefined });
    this.props.toggleDrugDoc(0, 0);
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

  handleSubmit(e) {
    e.preventDefault();
    var dmv = new FormData(e.target);
    dmv.append("idD", this.props.Id);
    dmv.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    dmv.append("file", this.state.File);
    this.props.saveDocDA(dmv);
    this.setState({ DescriptionDoc: "", File: [], fileName: undefined });
  }

  toggleTab(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    let rep = ["DOCUMENT", "DATE RECEIPT", "FILE", "DELETE"];
    let rowItems = this.props.docsDAT.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.DocName}</td>
        <td className="text-center">{dateConvertTables(row.DateReceipt)}</td>
        <td className="text-center">
          <button
            alt="docs"
            style={{ color: "#329ad6" }}
            onClick={() => {
              this.props.downloadDoc(row.Id, row.DescriptionDoc, row.DocName);
            }}
          >
            Download
          </button>
        </td>
        <td className="text-center">
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            onClick={() => {
              this.props.toggleD(
                row.Id,
                row.IdDriver,
                row.DescriptionDoc,
                row.DocName
              );
            }}
            style={{ color: "red", cursor: "pointer" }}
          ></i>
        </td>
      </tr>
    ));
    return (
      <div className="col-md-3">
        <Modal isOpen={this.props.modalDT} className={"modal-lg "}>
          <ModalHeader name="modalDT" toggle={this.onClose}>
            DRUG & ALCOHOL COMPLIANCE
          </ModalHeader>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggleTab(0, "1");
                  }}
                >
                  DRUG TEST
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggleTab(0, "2");
                  }}
                >
                  ALCOHOL TEST
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "3"}
                  onClick={() => {
                    this.toggleTab(0, "3");
                  }}
                >
                  DRUG TESTING POLICY
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {/*DRUG TEST*/}
              <TabPane tabId="1">
                <DrugAlcoholTest
                  id={this.props.Id}
                  isLoading={this.props.isLoading}
                  submit={this.props.saveDrugAlcoholTest}
                  download={this.props.downloadDoc}
                  page={this.props.pageDrug}
                  count={this.props.countDrug}
                  list={this.props.DrugList}
                  get={this.props.getPEList}
                  statusR="ACTIVE"
                  toggle={this.onClose}
                  TypeTest="Drug"
                />
              </TabPane>
              {/*ALCOHOL TEST*/}
              <TabPane tabId="2">
                <DrugAlcoholTest
                  id={this.props.Id}
                  isLoading={this.props.isLoading}
                  submit={this.props.saveDrugAlcoholTest}
                  download={this.props.downloadDoc}
                  page={this.props.pageAlcohol}
                  count={this.props.countAlcohol}
                  list={this.props.AlcoholList}
                  get={this.props.getPEList}
                  statusR="ACTIVE"
                  toggle={this.onClose}
                  TypeTest="Alcohol"
                />
              </TabPane>
              {/*POLICY*/}
              <TabPane tabId="3">
                <Form
                  onSubmit={this.handleSubmit}
                  ref={(form) => (this.form = form)}
                >
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="text-input">Document</Label>
                      <select
                        className="form-control"
                        name="DescriptionDoc"
                        value={this.state.DescriptionDoc}
                        onChange={this.onChange}
                        required
                      >
                        <option value="">SELECT</option>
                        <option value="Drug Testing Policy">
                          Drug Testing Policy
                        </option>
                        <option value="Drug Testing Policy Receipt">
                          Drug Testing Policy Receipt
                        </option>
                        <option value="Training">Training</option>
                      </select>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="text-input">File Upload</Label>
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
                        id="file"
                        accept=".pdf"
                        onChange={this.readFile}
                        name="File"
                        required
                      />
                    </Col>
                  </FormGroup>
                  {this.state.DescriptionDoc ===
                  "Drug Testing Policy Receipt" ? (
                    <FormGroup row>
                      <DatePicker
                        labelText="Date of Receipt"
                        name="DateReceipt"
                      />
                    </FormGroup>
                  ) : null}
                  <br />
                  <FormGroup row>
                    <Col md="6">
                      <Button
                        className="btn buttons-royal text-white px-5"
                        type="submit"
                        disabled={this.props.isLoading ? true : false}
                      >
                        Save
                      </Button>

                      <Button
                        className="btn buttons-royal text-white px-5"
                        onClick={this.onClose}
                      >
                        Close
                      </Button>
                    </Col>
                    {this.props.isLoading ? (
                      <img
                        alt="loading"
                        style={{
                          width: "140px",
                          position: "absolute",
                          marginTop: "0px",
                          right: "40%",
                        }}
                        src="../../assets/img/icons/loading2.gif"
                      />
                    ) : (
                      <div />
                    )}
                  </FormGroup>
                </Form>
                <TableCom
                  rowItems={rowItems}
                  header={rep}
                  count={this.props.count}
                  page={this.props.page}
                  getItems={(index) =>
                    this.props.getAllDocuments(this.props.Id, 1, 100)
                  }
                />

                <AlertDelete
                  message="You are sure that delete that Document"
                  modal={this.props.modalD}
                  toggle={() => {
                    this.props.toggleD(0);
                  }}
                  delete={() => {
                    this.props.deleteDocOfDriver(
                      this.props.idDeleteDoc,
                      this.props.driverId,
                      this.props.docType,
                      this.props.fileName
                    );
                  }}
                />
              </TabPane>
            </TabContent>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(UploadDrugTest);
