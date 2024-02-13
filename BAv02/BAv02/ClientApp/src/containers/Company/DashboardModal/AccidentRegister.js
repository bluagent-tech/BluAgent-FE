import React from "react";
import TableCom from "./../../../components/Table";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Col,
  Label,
  Form,
  Nav,
  NavLink,
  NavItem,
  TabPane,
  TabContent,
} from "reactstrap";
import MessageNotification from "../../../components/MessageNotification";
import MessageNotificationTag from "../../../views/Notifications/MessageNotification";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "../../../store/AccountSettings";
import Select from "./../../../components/Select";
import SelectNotRequired from "./../../../components/SelectNotRequired";
import dateConvertTables from "./../../../services/dateConvertTables";
import DatePicker from "./../../../components/DatePicker";
import {FilePond} from "react-filepond";
import "filepond/dist/filepond.min.css";
import AccidentsPDF from "./../Pdf/AccidentsRegistry";
import AccidentRegisterUpload from "./../../../components/AccidentRegisterUpload";
import AlertDelete from "../../../components/AlertDelete";

const id = JSON.parse(localStorage.getItem("user")).Id;

class AccidentRegister extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
      openDeleteModal: false,
      states: "",
      cities: "",
      idAccident: 0,
      IdDriver: "",
      from: "",
      to: "",
      Hm: "",
      countFiles: 0,
      activeTab: new Array(4).fill("1"),
    };
    this.viewAddAccident = this.viewAddAccident.bind(this);
    this.viewRange = this.viewRange.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAccident = this.getAccidents.bind(this);
  }

  toggle() {
    this.props.getStates(1);
    this.props.getDriverList(id);
    this.props.getAccidentRegistry(id, 1, 10);
    this.setState({open: !this.state.open});
  }
  viewAddAccident(id, state) {
    this.setState({
      IdDriver: "",
      Hm: "",
      cities: "",
      states: "",
      idAccident: id,
    });
    this.props.getCities(state);
    var view;
    if (document.getElementById("add").style.display === "block") {
      view = "none";
      document.getElementById("viewButton").style.display = "block";
      // document.getElementById("viewRange").style.display = "block";
      document.getElementById("tableAccident").style.display = "block";
    } else {
      view = "block";
      document.getElementById("viewButton").style.display = "none";
      // document.getElementById("viewRange").style.display = "none";
      document.getElementById("tableAccident").style.display = "none";
    }
    document.getElementById("add").style.display = view;
    document.getElementById("add").reset();
    this.props.getAccidentData(id);
    this.props.getAccidentRegisterDocs(
      JSON.parse(localStorage.user).Id,
      id
    );
  }
  viewRange() {
    var view;
    if (document.getElementById("dateRange").style.display === "block") {
      view = "none";
      document.getElementById("viewRange").style.display = "block";
      document.getElementById("viewButton").style.display = "block";
    } else {
      view = "block";
      document.getElementById("viewRange").style.display = "none";
      document.getElementById("viewButton").style.display = "none";
    }
    document.getElementById("dateRange").style.display = view;

    document.getElementById("generate").style.display = "block";
    document.getElementById("pdf").style.display = "none";
  }

  onChangeState(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
    this.setState({states: event.target.value});

    this.props.getCities(event.target.value);
  }

  onChangeCity(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
    if (event.target.name === "IdCity") {
      this.setState({cities: event.target.value});
    }
  }

  onChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
    if (event.target.name === "IdDriver") {
      this.setState({IdDriver: event.target.value});
    }
  }

  uploadFile(id) {
    this.setState({idAccident: id});
    document.getElementById("upload").style.display = "block";
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form.append("idU", id);
    form.append("Id", this.props.accidentData.Id);
    this.props.addAccident(form);
    this.viewAddAccident();
  }

  downloadPDF(e) {
    e.preventDefault();
    this.setState({from: e.target.from.value, to: e.target.to.value});
    var form = new FormData(e.target);
    form.append("id", id);
    this.props.getAccidentsRegistryPDF(form);
    document.getElementById("generate").style.display = "none";
    document.getElementById("pdf").style.display = "block";
  }
  componentDidMount() {
    this.getAccidents();
  }

  getAccidents = () => {
    return this.props.accidentRegister;
  };

  toggleTab = (tabPane, tab) => {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  };

  isAccidentRecordDoc = (file) => {
    return file.DocType.trim() === "AccidentRegister";
  };

  toggleDeleteModal = (id, docType, docName) => {
    if (id && docType && docName) {
      this.setState({
        openDeleteModal: !this.state.openDeleteModal,
        idDelete: id,
        docTypeToDelete: docType,
        fileNameToDelete: docName,
      });
    } else {
      this.setState({
        openDeleteModal: !this.state.openDeleteModal,
        idDelete: 0,
        docTypeToDelete: "",
        fileNameToDelete: "",
      });
    }
  };

  deleteDoc = () => {
    this.props.deleteDoc(
      this.state.idDelete,
      id,
      this.state.docTypeToDelete,
      this.state.fileNameToDelete
    );

    this.setState({
      open: !this.state.open,
      openDeleteModal: !this.state.openDeleteModal,
      idDelete: 0,
      docTypeToDelete: "",
      fileNameToDelete: "",
    });
  };

  render() {
    let rep = [
      "Accident Number",
      "Accident Date",
      "Accident Hour",
      "City",
      "State",
      "Action",
    ];
    let rowItems = this.props.accidentRegister.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.Id}</td>
        <td className="text-center">{row.AccidentDate}</td>
        <td className="text-center">{row.AccidentHour}</td>
        <td className="text-center">{row.City}</td>
        <td className="text-center">{row.State1}</td>
        <td className="text-center">
          <button
            onClick={() => {
              this.viewAddAccident(row.Id, row.IdState);
            }}
            className="fa fa-expand btn page-link"
            style={{
              cursor: "pointer",
              color: "royalblue",
              display: "inherit",
            }}
          />
        </td>
      </tr>
    ));
    
    const {countFiles} = this.state;
    return (
      <div>
        <img
          alt="hos"
          onClick={this.toggle}
          className="img-responsive"
          src="/assets/icons/icons8-crashed-car.svg"
          style={{cursor:"pointer"}}
          onMouseOver={(e) =>
            (e.currentTarget.src = "/assets/icons/icons8-crashed-car.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "/assets/icons/icons8-crashed-car.svg")
          }
          height="160"
          width="160"
        />
        <Modal
          isOpen={this.state.open}
          className={"modal-lg "}
          backdrop={"static"}
          toggle={this.toggle}
        >
          <ModalHeader name="modal1" toggle={this.toggle}>
            Accident Register - Add Documents
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={this.handleSubmit}
              id="add"
              style={{ display: "none" }}
            >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === "1"}
                    onClick={() => {
                      this.toggleTab(0, "1");
                    }}
                  >
                    ACCIDENT REGISTER
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === "2"}
                    onClick={() => {
                      this.toggleTab(0, "2");
                    }}
                  >
                    FILE UPLOAD
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[0]}>
                {/* ACCIDENT REGISTER */}
                <TabPane tabId="1">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Date of Accident</Label>
                      <DatePicker
                        name="AccidentDate"
                        value={dateConvertTables(
                          this.props.accidentData.AccidentDate
                        )}
                      />
                    </Col>
                    <Col md="3">
                      <Label htmlFor="text-input">Hours of Accident</Label>
                      <input
                        type="time"
                        className="form-control"
                        name="AccidentHour"
                        defaultValue={this.props.accidentData.AccidentHour}
                      />
                    </Col>
                    <Col md="3">
                      <Label htmlFor="text-input">Accident Number</Label>
                      <input
                        type="text"
                        className="form-control"
                        name="ReportNumber"
                        defaultValue={this.props.accidentData.ReportNumber}
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">Street Address</Label>
                      <input
                        type="text"
                        className="form-control"
                        name="Address"
                        defaultValue={this.props.accidentData.Address}
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="text-input">State</Label>
                      <Select
                        name="IdState"
                        options={this.props.states}
                        onChange={this.onChangeState}
                        value={
                          this.state.states !== ""
                            ? this.state.states
                            : this.props.accidentData.IdState
                        }
                        required
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="text-input">City</Label>
                      <Select
                        name="IdCity"
                        options={this.props.cities}
                        onChange={this.onChangeCity}
                        value={
                          this.state.cities !== ""
                            ? this.state.cities
                            : this.props.accidentData.IdCity
                        }
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">No. of Fatalities</Label>
                      <input
                        type="number"
                        className="form-control"
                        name="Fatalities"
                        defaultValue={this.props.accidentData.Fatalities}
                        required
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="text-input">No. of Injuries</Label>
                      <input
                        type="number"
                        className="form-control"
                        name="Injuries"
                        defaultValue={this.props.accidentData.Injuries}
                        required
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="text-input">H/M</Label>
                      <select
                        className="form-control"
                        onChange={this.onChange}
                        name="Hm"
                        value={
                          this.state.Hm !== ""
                            ? this.state.Hm
                            : this.props.accidentData.Hm
                        }
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">Driver's Name</Label>
                      <SelectNotRequired
                        name="IdDriver"
                        options={this.props.driverList}
                        onChange={this.onChange}
                        value={
                          this.state.IdDriver !== ""
                            ? this.state.IdDriver
                            : this.props.accidentData.IdDriver !== ""
                            ? this.props.accidentData.IdDriver
                            : ""
                        }
                      />
                    </Col>
                    <Col mb="4">
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
                        <div></div>
                      )}
                      <input
                        style={{ display: "none" }}
                        type="number"
                        name="IdAccidentRegister"
                        defaultValue={
                          this.props.accidentData.IdAccidentRegister
                            ? this.props.accidentData.IdAccidentRegister
                            : 0
                        }
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm="1">
                      <Button type="submit" color="primary">
                        Save
                      </Button>{" "}
                    </Col>
                    <Col sm="1">
                      <Button color="danger" onClick={this.viewAddAccident}>
                        Cancel
                      </Button>
                    </Col>
                  </FormGroup>
                </TabPane>
                {/* FILE UPLOAD */}
                <TabPane tabId="2">
                  <AccidentRegisterUpload
                    toggle={this.toggle}
                    docType="AccidentRegister"
                    filter={this.isAccidentRecordDoc}
                    idAccidentRegister={this.state.idAccident}
                    downloadDoc={this.props.downloadDoc}
                    toggleDeleteFilesCompanyModal={this.toggleDeleteModal}
                    deleteDoc={this.props.deleteDoc}
                    accidentDocs={this.props.accidentDocs}
                    uploadFile={this.props.uploadFile}
                  />
                </TabPane>
              </TabContent>
            </Form>
            <FormGroup row id="upload" style={{ display: "none" }}>
              <Col md="11">
                <Label htmlFor="text-input">
                  Copy Of State or Insurance Report
                </Label>
                <FilePond
                  allowRevert={false}
                  instantUpload={false}
                  oninit={this.handleInit}
                  onupdatefiles={(countFiles) => {
                    this.setState({
                      countFiles: countFiles.length,
                    });
                  }}
                  allowMultiple={true}
                  maxFiles={100}
                  maxParallelUploads={100}
                  server={
                    "api/AccountSet/UploadDocs?id=" +
                    id +
                    "&docType= Accident Register" +
                    "&idAccident=" +
                    this.state.idAccident +
                    ""
                  }
                />
              </Col>
            </FormGroup>
            <Form
              onSubmit={this.downloadPDF}
              id="dateRange"
              style={{ display: "none" }}
            >
              <FormGroup row>
                <Col md="3">
                  <label htmlFor="text-input">From</label>
                  <DatePicker name="from" />
                </Col>
                <Col md="3">
                  <label htmlFor="text-input">To</label>
                  <DatePicker name="to" />
                </Col>
                <Col md="5">
                  <span>&nbsp;</span>
                  <Button id="generate" type="submit" outline color="primary">
                    Generate Report
                  </Button>
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
                    <div id="pdf">
                      <AccidentsPDF
                        hide={this.viewRange}
                        companyName={this.props.company.LegalName}
                        to={this.state.to}
                        from={this.state.from}
                        accidents={this.props.registryPDF}
                      />
                    </div>
                  )}
                </Col>
              </FormGroup>
            </Form>
            <FormGroup style={{ paddingBottom: "35px" }} row>
              <Button
                id="viewButton"
                onClick={this.viewAddAccident}
                style={{
                  position: "absolute",
                  right: "5%",
                  // top: "3%",
                  borderRadius: "35px",
                  width: "35px",
                  height: "35px",
                  paddingLeft: "0px",
                  paddingTop: "0px",
                  paddingRight: "0px",
                  paddingBottom: "0px",
                  fontSize: "30px",
                  lineHeight: 1,
                }}
                color="primary"
              >
                +
              </Button>
              
            </FormGroup>
            <div id="tableAccident">
              {this.props.accidentRegister.length === 0 ?
                <div style={{ textAlign: "center", marginBottom:"41px" }}>
                  <img
                    alt="Check"
                    src="/assets/icons/icons8-checkmark.svg"
                    style={{ width: "93px" }}
                  />
                  <h4 style={{fontSize:"35px"}}> You're All Caught Up!</h4>
                  <span style={{ fontSize: "20px", color: "#b2bec3" }}>
                    There are currently no accident records.
                  </span>
                </div>
                :
                (<TableCom
                  rowItems={rowItems}
                  header={rep}
                  count={this.props.countA}
                  page={this.props.pageA}
                  getItems={(index) => {
                    this.props.getAccidentRegistry(this.props.id, index, 3);
                  }}
                />)
              }
            </div>
            {this.props.accidentRegister.length === 0 ?
              "" : (
                <Button
                  style={{ position: "absolute", right: "5%", bottom: "30px" }}
                  id="viewRange"
                  onClick={this.viewRange}
                  color="primary"
                >
                  Download
                </Button>)}
          </ModalBody>
        </Modal>

        <AlertDelete
          message="Are you sure you want to delete this file?"
          modal={this.state.openDeleteModal}
          toggle={() => {
            this.toggleDeleteModal();
          }}
          delete={() => {
            this.deleteDoc();
          }}
        />
      </div>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(AccidentRegister);
