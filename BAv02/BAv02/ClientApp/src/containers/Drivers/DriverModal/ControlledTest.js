import React, { useState } from "react";
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
  UncontrolledTooltip,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/Drivers";
import DrugTestingPolicy from "./DrugTestingPolicy";
import base64ToByteArray2 from "./../../../services/base64ToByteArray2";
import DatePicker from "./../../../components/DatePicker";
import TableCom from "./../../../components/Table";
import AlertDeleteDrugPolicy from "./../../../components/AlertDeleteDrugPolicy";
import DrugAlcoholTest from "./DrugAlcoholTest";
const idCompany = localStorage["idCompany"];
import DriverAgreementInfo from "../../../components/pdf/DriverAgreementInfo";
import PreEmpAgree from "../../../components/pdf/Pre-EmploymentDrugTestingPolicy";
import { Collapse } from "react-collapse";

//PRE EMPLOYMENT CONTROLLED SUBSTANCES TEST

class ControlledTest extends React.Component {
  constructor(props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.toggleOpenDelete = this.toggleOpenDelete.bind(this);
    this.toggle = this.toggle.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCollapble = this.toggleCollapble.bind(this);
    this.state = {
      abrirCollapsable: false,
      open: false,
      openDelete: false,
      DescriptionDoc: "",
      activeTab: new Array(4).fill("1"),
      File: [],
      fileName: undefined,
      DriverId: 0,
      IdDoc: 0,
      DocType: "",
      DocName: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getDocuments(this.props.id, 1, 100);
    this.props.getPEList(this.props.id, 1, 3, 1, 3);
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  toggleOpenDelete(IdDoc, DriverId, DocType, DocName) {
    this.setState({
      openDelete: !this.state.openDelete,
      IdDoc: IdDoc,
      DriverId: DriverId,
      DocType: DocType,
      DocName: DocName,
    });
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
    dmv.append("idD", this.props.id);
    dmv.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    dmv.append("file", this.state.File);
    this.props.saveDoc(dmv);
    this.setState({ DescriptionDoc: "", File: [], fileName: undefined });
  }

  toggle(tabPane, tab) {
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

  onEscapeKeyDown = () => {};

  toggleCollapble = () => {
    this.setState({
      abrirCollapsable: !this.state.abrirCollapsable,
    });
  };

  render() {
    let rep = ["DOCUMENT", "FILE", "DELETE"];
    let { openDelete, DriverId, DocName, DocType, IdDoc } = this.state;
    let rowItems = this.props.docs.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.DocName}</td>
        <td className="text-center">
          <a
            className="btn buttons-royal text-white"
            style={{ color: "#329ad6" }}
            href={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${row.IdDriver}/${row.DescriptionDoc === "Drug Testing Policy" ? "DrugTestingPolicy" : row.DescriptionDoc === "Drug Testing Policy Receipt" ? "DrugTestingPolicyReceipt" : row.DescriptionDoc === "Training" ? "Training" : null}/${row.DocName}`}
            target={"_blank"}
            rel="noreferrer"
          >
            Download
          </a>
        </td>
        <td className="text-center">
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            onClick={() => {
              this.toggleOpenDelete(
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
        <input
          type="image"
          onClick={this.toggleOpen}
          className="img-responsive"
          src="/assets/icons/icons8-doctors-bag.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "/assets/icons/icons8-doctors-bag.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "/assets/icons/icons8-doctors-bag.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>DRUG & ALCOHOL COMPLIANCE</h6>

        <Modal
          isOpen={this.state.open}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.toggleOpen}
        >
          <ModalHeader name="modal1" toggle={this.toggleOpen}>
            DRUG & ALCOHOL COMPLIANCE
          </ModalHeader>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggle(0, "1");
                  }}
                >
                  DRUG TEST
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
                  }}
                >
                  ALCOHOL TEST
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "3"}
                  onClick={() => {
                    this.toggle(0, "3");
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
                  id={this.props.id}
                  isLoading={this.props.isLoadingM}
                  submit={this.props.saveDrugAlcoholTest}
                  submit2={this.props.saveEditDrugAlcoholTest}
                  download={this.props.downloadDoc}
                  page={this.props.pageDrug}
                  count={this.props.countDrug}
                  list={this.props.DrugList}
                  get={this.props.getPEList}
                  statusR={this.props.statusR}
                  toggle={this.toggleOpen}
                  TypeTest="Drug"
                  deleteDocDACompliance={this.props.deleteDocDAComplianceDrug}
                />
              </TabPane>
              {/*ALCOHOL TEST*/}
              <TabPane tabId="2">
                <DrugAlcoholTest
                  id={this.props.id}
                  isLoading={this.props.isLoadingM}
                  submit={this.props.saveDrugAlcoholTest}
                  submit2={this.props.saveEditDrugAlcoholTest2}
                  download={this.props.downloadDoc}
                  page={this.props.pageAlcohol}
                  count={this.props.countAlcohol}
                  list={this.props.AlcoholList}
                  get={this.props.getPEList}
                  statusR={this.props.statusR}
                  toggle={this.toggleOpen}
                  TypeTest="Alcohol"
                  deleteDocDACompliance={
                    this.props.deleteDocDAComplianceAlcohol
                  }
                />
              </TabPane>
              {/*POLICY*/}
              <TabPane tabId="3">
                {this.props.statusR === "ACTIVE" ? (
                  <>
                    <div
                      className="align-items-center cursor-menu"
                      style={{ textAlign: "right" }}
                    >
                      <Button
                        id="addDocument"
                        type="submit"
                        color="primary"
                        className="btn btn-primary text-white fa fa-plus options-drugs"
                        style={{ alingItems: "right", borderRadius: "64px" }}
                        onClick={this.toggleCollapble}
                      ></Button>
                      <UncontrolledTooltip
                        placement="bottom"
                        target="addDocument"
                      >
                        Add Drug and Alcohol policy receipt
                      </UncontrolledTooltip>
                    </div>
                    <br></br>
                    <Collapse isOpened={this.state.abrirCollapsable}>
                      <br></br>
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
                              className="btn buttons-royal text-white px-5 btn"
                              type="submit"
                              disabled={this.props.isLoading ? true : false}
                            >
                              Save
                            </Button>
                            <Button
                              className="btn buttons-royal text-white px-5 btn"
                              onClick={this.toggleOpen}
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
                    </Collapse>
                  </>
                ) : (
                  ""
                )}
                <TableCom
                  rowItems={rowItems}
                  header={rep}
                  count={this.props.count}
                  page={this.props.page}
                  getItems={(index) =>
                    this.props.getAllDocuments(this.props.id, 1, 100)
                  }
                />
                <AlertDeleteDrugPolicy
                  message="You are sure that delete that Document"
                  modal={openDelete}
                  toggle={() => {
                    this.toggleOpenDelete("", "", "", "");
                  }}
                  delete={() => {
                    this.props.deleteDoc(IdDoc, DriverId, DocType, DocName);
                    this.toggleOpenDelete("", "", "", "");
                  }}
                />
                <DriverAgreementInfo
                  companyInfo={this.props.companyInfo}
                  fitness={this.props.fitness}
                  user={this.props.user}
                  driver={this.props.driver}
                  company={idCompany}
                  toggle={this.props.toggle}
                  modal={this.props.modal}
                />
                {/* <DrugTestingPolicy
                  driver={this.props.driver}
                  company={this.props.companyInfo}
                /> */}
                <PreEmpAgree
                  upload={this.props.saveDoc}
                  user={this.props.user}
                  company={this.props.companyInfo}
                  companyInfo={this.props.companyInfo}
                  fitness={this.props.fitness}
                  driver={this.props.driver}
                  companyid={idCompany}
                  toggle={this.props.toggle}
                  modal={this.props.modal}
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
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(ControlledTest);
