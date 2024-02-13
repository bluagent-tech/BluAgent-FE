import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  CustomInput,
  Col,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Alert,
  TabPane,
  Form,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/ClearingHouse";
import base64ToByteArray2 from "../../../services/base64ToByteArray2";
import DataTable from "react-data-table-component";
import "../../../components/Styles/DataTable.css";
import convertDate from './../../../services/dateConvertTables';
import AlertDelete from "../../../components/AlertDelete";
import Loading from "../../../components/Loading";

class ClearingHouse extends React.Component {
  constructor(props) {
    super(props);
    this.tabs = this.tabs.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openAlert = this.openAlert.bind(this);
    this.readFile = this.readFile.bind(this);
    this.readFileDC = this.readFileDC.bind(this);
    this.readFileAI = this.readFileAI.bind(this);
    this.handleIssueDate = this.handleIssueDate.bind(this);
    this.handleDateofReview = this.handleDateofReview.bind(this);
    this.handlePermissionDate = this.handlePermissionDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitDC = this.handleSubmitDC.bind(this);
    this.handleSubmitAI = this.handleSubmitAI.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleStatusAI = this.handleStatusAI.bind(this);
    this.emptyFile = this.emptyFile.bind(this);
    this.mapListCHDataTable = this.mapListCHDataTable.bind(this);
    this.mapListDCDataTable = this.mapListDCDataTable.bind(this);
    this.mapListAIDataTable = this.mapListAIDataTable.bind(this);
    this.validDate = this.validDate.bind(this);
    this.state = {
      open: false,
      File: [],
      FileDC: [],
      FileAI: [],
      activeTab: new Array(1).fill('1'),
      fileName: undefined,
      fileNameDC: undefined,
      fileNameAI: undefined,
      issueDate: "",
      DateofReview: "",
      PermissionDate: "",
      status: "",
      statusAI: "",
      checked: true,
      deleteCHAlertOpen: false,
      deleteDCAlertOpen: false,
      deleteAIAlertOpen: false,
      CHToDelete: {},
      DCToDelete: {},
      AIToDelete: {},
      showPass: false,
      flagClearingHouse: false
    };
  }

  componentWillMount() {
    var ch = new FormData();
    ch.append("idDriver", this.props.id);
    this.props.GetClearingHouse(ch);
    this.props.GetDriverConsent(ch);
    this.props.GetAnnualInquiry(ch);
    this.props.GetClearingCredentials(ch);
  }

  handleSubmitCredentials(e, id) {
    e.preventDefault();
    var Password = document.getElementById("Password");
    var ConfirmPass = document.getElementById("ConfirmPass");
    var requiredPassword = document.getElementById("requiredPassword");
    var requiredConfirmPass = document.getElementById("requiredConfirmPassword");


    if (Password.value == ConfirmPass.value) {
      var credentials = new FormData(e.target);
      credentials.append("HaveAccount", this.state.checked);
      credentials.append("IdUser", id);
      this.props.saveClearingCredentials(credentials);
    } else {
      requiredPassword.style.display = 'block';
      requiredConfirmPass.style.display = 'block';
    }
  }

  handleSubmit(e, id) {
    e.preventDefault();
    var clearingHouse = new FormData(e.target);
    clearingHouse.append("IdDriver", id);
    clearingHouse.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    clearingHouse.append("fileName", this.state.fileName);
    clearingHouse.append("file", this.state.File);
    this.props.saveClearingHouse(clearingHouse);
    this.emptyFile("CH");
  }

  handleSubmitDC(e, id) {
    e.preventDefault();
    var driverConsent = new FormData(e.target);
    driverConsent.append("IdDriver", id);
    driverConsent.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    driverConsent.append("fileName", this.state.fileNameDC);
    driverConsent.append("file", this.state.FileDC);
    this.props.saveDriverConsent(driverConsent);
    this.emptyFile("DC");
  }

  handleSubmitAI(e, id) {
    e.preventDefault();
    var AnnualInquiry = new FormData(e.target);
    AnnualInquiry.append("IdDriver", id);
    AnnualInquiry.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    AnnualInquiry.append("DocName", this.state.fileNameAI);
    AnnualInquiry.append("file", this.state.FileAI);
    this.props.saveAnnualInquiry(AnnualInquiry);
    this.emptyFile("AI");
  }

  emptyFile(type) {
    if (type == "CH") {
      document.getElementById("file").value = "";
      document.getElementsByClassName("custom-file-label")[1].innerHTML = 'Choose file';
      document.getElementById("Status").value = "";
      this.setState({ File: [], fileName: undefined, issueDate: "", status: "" });
    }

    if (type == "DC") {
      document.getElementById("fileDC").value = "";
      document.getElementsByClassName("custom-file-label")[3].innerHTML = 'Choose file';
      this.setState({ FileDC: [], fileNameDC: undefined, PermissionDate: "" });
    }

    if (type == "AI") {
      document.getElementById("fileAI").value = "";
      document.getElementsByClassName("custom-file-label")[2].innerHTML = 'Choose file';
      document.getElementById("StatusCH").value = "";
      this.setState({ FileAI: [], fileNameAI: undefined, DateofReview: "", statusAI: "" });
    }
  }

  validDate(prevdate) {
    let today = new Date();
    let date = new Date(prevdate);
    let diff = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    if (diff > 300) {
      return false;
    }
    else {
      return true;
    }
  }

  openAlert() {
    var alertCredentials = document.getElementById("AlertCredentials");

    if (document.getElementById("AlertCredentials")) {
      alertCredentials.style.display = "block";
      setTimeout(function () {
        alertCredentials.style.display = "none";
      }, 1500);
    }

  }

  showPassword() {
    var passElement = document.getElementById("Password");
    var confirmElement = document.getElementById("ConfirmPass");

    if (!this.state.showPass) {
      this.setState({ showPass: true });
      passElement.type = 'text';
      confirmElement.type = 'text';
    }else{
      this.setState({ showPass: false });
      passElement.type = 'password';
      confirmElement.type = 'password';
    }
    
  }

  toggle() {
    this.setState({ open: !this.state.open, fileName: undefined, fileNameDC: undefined, PermissionDate: "", issueDate: "", status: "" });
  }

  toggleDeleteCH = (idUser, idCH, idCompany, fileName) => {
    let CHToDelete = {};
    CHToDelete = {
      idUser: idUser,
      idCH: idCH,
      idCompany: idCompany,
      fileName: fileName,
    };

    this.setState({
      deleteCHAlertOpen: !this.state.deleteCHAlertOpen,
      CHToDelete: CHToDelete
    });
  };

  toggleDeleteDC = (idUser, idDC, idCompany, fileName) => {
    let DCToDelete = {};
    DCToDelete = {
      idUser: idUser,
      idDC: idDC,
      idCompany: idCompany,
      fileName: fileName,
    };

    this.setState({
      deleteDCAlertOpen: !this.state.deleteDCAlertOpen,
      DCToDelete: DCToDelete
    });
  };

  toggleDeleteAI = (idUser, idAI, idCompany, DocName) => {
    let AIToDelete = {};
    AIToDelete = {
      idUser: idUser,
      idAI: idAI,
      idCompany: idCompany,
      DocName: DocName
    };

    this.setState({
      deleteAIAlertOpen: !this.state.deleteAIAlertOpen,
      AIToDelete: AIToDelete
    });
  };

  tabs(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({ activeTab: newArray });
  }

  haveAccount() {
    var HaveAccount = document.getElementById("HaveAccount");
    var Username = document.getElementById("Username");
    var Password = document.getElementById("Password");
    var ConfirmPass = document.getElementById("ConfirmPass");
    var Phone = document.getElementById("Phone");

    if (HaveAccount.checked == true) {
      Username.value = '';
      Password.value = '';
      ConfirmPass.value = '';
      Phone.value = '';
      Username.disabled = true;
      Password.disabled = true;
      ConfirmPass.disabled = true;
      Phone.disabled = true;
      this.setState({ checked: false });
    } else {
      Username.disabled = false;
      Password.disabled = false;
      ConfirmPass.disabled = false;
      Phone.disabled = false;
      this.setState({ checked: true });
    }
  }

  readFile(e) {
    var input = e.target;
    if (input) {
      var reader = new FileReader();
      var file = "";
      reader.onload = (e) => {
        file = base64ToByteArray2(e.target.result);
        this.setState({ File: file });
      };

      try {
        this.setState({ fileName: input.files[0].name });
        reader.readAsDataURL(input.files[0]);
      } catch (error) { }
    }
  }

  readFileDC(e) {
    var input = e.target;
    if (input) {
      var reader = new FileReader();
      var file = "";
      reader.onload = (e) => {
        file = base64ToByteArray2(e.target.result);
        this.setState({ FileDC: file });
      };

      try {
        this.setState({ fileNameDC: input.files[0].name });
        reader.readAsDataURL(input.files[0]);
      } catch (error) { }
    }
  }

  readFileAI(e) {
    var input = e.target;
    if (input) {
      var reader = new FileReader();
      var file = "";
      reader.onload = (e) => {
        file = base64ToByteArray2(e.target.result);
        this.setState({ FileAI: file });
      };

      try {
        this.setState({ fileNameAI: input.files[0].name });
        reader.readAsDataURL(input.files[0]);
      } catch (error) { }
    }
  }

  mapListCHDataTable(items) {
    let data = items.map((row, index) => {
      var object = {};
      object.no = index + 1;
      object.fileName = row.fileName;
      object.Status = row.Status;
      object.Date = convertDate(row.Date);
      object.download = (
        <a
          className="btn btn-primary"
          target="_blank"
          href={"https://bluagent-files.s3-us-west-2.amazonaws.com/" + row.IdCompany + "/Drivers/" + row.IdDriver + "/PreEmploymentInquery/" + row.fileName}
          download
        >
          Download/View
        </a>
      );
      object.delete = (
        <i
          className="icon-close font-2x2icon-close icons font-2xl d-block"
          onClick={() => {
            this.toggleDeleteCH(
              row.IdDriver,
              row.idCH,
              row.IdCompany,
              row.fileName
            );
          }}
          style={{ color: "red", cursor: "pointer" }}
        ></i>
      );
      return object;
    });
    return data;
  }

  mapListDCDataTable(items) {
    let data = items.map((row, index) => {
      var object = {};
      object.no = index + 1;
      object.fileName = row.fileName;
      object.Date = convertDate(row.Date);
      object.download = (
        <a
          className="btn btn-primary"
          target="_blank"
          href={"https://bluagent-files.s3-us-west-2.amazonaws.com/" + row.IdCompany + "/Drivers/" + row.IdDriver + "/DriverConsent/" + row.fileName}
          download
        >
          Download/View
        </a>
      );
      object.delete = (
        <i
          className="icon-close font-2x2icon-close icons font-2xl d-block"
          onClick={() => {
            this.toggleDeleteDC(
              row.IdDriver,
              row.idDC,
              row.IdCompany,
              row.fileName
            );
          }}
          style={{ color: "red", cursor: "pointer" }}
        ></i>
      );
      return object;
    });
    return data;
  }

  mapListAIDataTable(items) {
    let data = items.map((row, index) => {
      var object = {};
      object.no = index + 1;
      object.DocName = row.DocName;
      object.StatusCH = row.StatusCH;
      object.DateOfReview = convertDate(row.DateOfReview);
      object.download = (
        <a
          className="btn btn-primary"
          target="_blank"
          href={"https://bluagent-files.s3-us-west-2.amazonaws.com/" + row.IdCompany + "/Drivers/" + row.IdDriver + "/AnnualInquiry/" + row.DocName}
          download
        >
          Download/View
        </a>
      );
      object.delete = (
        <i
          className="icon-close font-2x2icon-close icons font-2xl d-block"
          onClick={() => {
            this.toggleDeleteAI(
              row.IdDriver,
              row.IdAnnualInquiry,
              row.IdCompany,
              row.DocName
            );
          }}
          style={{ color: "red", cursor: "pointer" }}
        ></i>
      );
      return object;
    });
    return data;
  }

  handleIssueDate(e) {
    this.setState({ issueDate: e.target.value });
  }

  handleDateofReview(e) {
    this.setState({ DateofReview: e.target.value });
  }

  handlePermissionDate(e) {
    this.setState({ PermissionDate: e.target.value });
  }

  handleStatus(e) {
    this.setState({ status: e.target.value });
  }

  handleStatusAI(e) {
    this.setState({ statusAI: e.target.value });
  }


  render() {
    const { PermissionDate, issueDate, DateofReview, status, statusAI, fileName, fileNameDC, fileNameAI, checked } = this.state;

    const columns = [
      {
        name: 'No.',
        selector: 'no',
        sortable: true,
        grow: 1
      },
      {
        name: 'File Name',
        selector: 'fileName',
        sortable: true,
        grow: 7
      },
      {
        name: 'Status',
        selector: 'Status',
        sortable: true,
        grow: 2
      },
      {
        name: 'Date',
        selector: 'Date',
        center: true,
        grow: 2
      },
      {
        name: "Download CH",
        selector: "download",
        center: true,
        grow: 5
      },
      {
        name: "",
        selector: "delete",
        center: true,
        grow: 1
      }
    ];

    const columnsDC = [
      {
        name: 'No.',
        selector: 'no',
        sortable: true,
        grow: 1
      },
      {
        name: 'File Name',
        selector: 'fileName',
        sortable: true,
        grow: 7
      },
      {
        name: 'Date',
        selector: 'Date',
        center: true,
        grow: 2
      },
      {
        name: "Download DC",
        selector: "download",
        center: true,
        grow: 6
      },
      {
        name: "",
        selector: "delete",
        center: true,
        grow: 1
      }
    ];

    const columnsAI = [
      {
        name: 'No.',
        selector: 'no',
        sortable: true,
        grow: 1
      },
      {
        name: 'File Name',
        selector: 'DocName',
        sortable: true,
        grow: 3
      },
      {
        name: 'Status',
        selector: 'StatusCH',
        center: true,
        grow: 2
      },
      {
        name: 'Date of Inquiry',
        selector: 'DateOfReview',
        center: true,
        grow: 2
      },
      {
        name: "Download AI",
        selector: "download",
        center: true,
        grow: 4
      },
      {
        name: "",
        selector: "delete",
        center: true,
        grow: 1
      }
    ];

    const ListCHMap = this.mapListCHDataTable(this.props.CHFiles);
    const ListDCMap = this.mapListDCDataTable(this.props.DCFiles);
    const ListAIMap = this.mapListAIDataTable(this.props.AIFiles);
    const enableDisable = this.validDate(this.props.CHFiles == '' || this.props.CHFiles == undefined ? "" : this.props.CHFiles[0].Date);
    
    if(this.props.isLoading){
      this.state.flagClearingHouse =  true;
    }

    return (
      this.state.flagClearingHouse === false ? null : <div className="col-md-3">
      <input
        onClick={() => { this.toggle(); }}
        className="img-responsive"
        type="image"
        src="assets/icons/icons8-name-tag.svg"
        onMouseOver={(e) =>
          (e.currentTarget.src = "assets/icons/icons8-name-tag.svg")
        }
        onMouseOut={(e) =>
          (e.currentTarget.src = "assets/icons/icons8-name-tag.svg")
        }
        alt="Submit"
        height="150"
        width="150"
      />
      <h6>CLEARING HOUSE</h6>
      <Modal
        isOpen={this.state.open}
        className={"modal-lg"}
        backdrop={"static"}
        toggle={this.toggle}
      >
        <ModalHeader name="modal1" toggle={this.toggle}>
          CLEARING HOUSE
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === "1"}
                onClick={() => {
                  this.tabs(0, "1");
                }}
              >
                Credentials
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === "2"}
                onClick={() => {
                  this.tabs(0, "2");
                }}
              >
                Pre-employment Inquiry
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === "3"}
                onClick={() => {
                  this.tabs(0, "3");
                }}
              >
                Annual Inquiry
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === "4"}
                onClick={() => {
                  this.tabs(0, "4");
                }}
              >
                Driver's Consent
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab[0]}>
            {/*Credentials*/}
            <TabPane tabId="1">
              <Form onSubmit={(e) => { this.handleSubmitCredentials(e, this.props.id); }}>
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="text-input">Username or Email</Label>
                    <input
                      type="text"
                      className="form-control"
                      id="Username"
                      name="UserNameCH"
                      defaultValue={this.props.DriverCredentials == '' ? "" : this.props.DriverCredentials[0].UserNameCH}
                      disabled={this.props.DriverCredentials == '' ? false : !this.props.DriverCredentials[0].HaveAccount}
                      required
                    />
                  </Col>
                  <Col md="6" style={{ marginTop: '4%' }}>
                    <input
                      type="checkbox"
                      id="HaveAccount"
                      defaultChecked={this.props.DriverCredentials == '' ? false : !this.props.DriverCredentials[0].HaveAccount}
                      onClick={() => { this.haveAccount() }}
                      value="true"
                    />
                    <label style={{ marginLeft: '5px' }}>
                      Not Registered on Clearing House
                    </label>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="text-input">Password</Label>
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      name="PasswordCH"
                      defaultValue={this.props.DriverCredentials == '' ? "" : this.props.DriverCredentials[0].PasswordCH}
                      disabled={this.props.DriverCredentials == '' ? false : !this.props.DriverCredentials[0].HaveAccount}
                      required
                    />
                    <span
                      id="requiredPassword"
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        display: 'none'
                      }}
                    >
                      * Password is required
                    </span>
                  </Col>
                  <Col md="6">
                    <i
                      class="far fa-eye"
                      onClick={() => { this.showPassword() }}
                      style={{
                        marginTop: '9.5%',
                        backgroundColor: '#3BA7FF',
                        border: '1px solid #3BA7FF',
                        color: '#fff',
                        padding: '2%',
                        borderRadius: '7px',
                        cursor: 'pointer'
                      }}
                    >
                    </i>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="text-input">Confirm Password</Label>
                    <input
                      type="password"
                      className="form-control"
                      id="ConfirmPass"
                      name="ConfirmPass"
                      defaultValue={this.props.DriverCredentials == '' ? "" : this.props.DriverCredentials[0].PasswordCH}
                      disabled={this.props.DriverCredentials == '' ? false : !this.props.DriverCredentials[0].HaveAccount}
                      required
                    />
                    <span
                      id="requiredConfirmPassword"
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        display: 'none'
                      }}
                    >
                      * Confirm Password is required
                    </span>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="text-input">Phone</Label>
                    <input
                      type="number"
                      className="form-control"
                      id="Phone"
                      name="Phone"
                      defaultValue={this.props.DriverCredentials == '' ? "" : this.props.DriverCredentials[0].Phone}
                      disabled={this.props.DriverCredentials == '' ? false : !this.props.DriverCredentials[0].HaveAccount}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Alert
                      id="AlertCredentials"
                      onChange={this.props.toastAlertState != '' ? this.props.toastAlertState === true ? this.openAlert() : "" : ""}
                      color={"success"}
                      style={{
                        display: "none"
                      }}>
                      {this.props.message}
                    </Alert>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Button
                      className="buttons-royal text-white px-5"
                      type="submit"
                    >
                      Save
                  </Button>
                    {"  "}
                    <Button
                      className="buttons-royal text-white px-5"
                      onClick={() => { this.toggle(); }}
                    >
                      Close
                    </Button>{" "}
                  </Col>
                </FormGroup>
              </Form>
            </TabPane>
            {/*Pre-employment*/}
            <TabPane tabId="2">
              <Form onSubmit={(e) => { this.handleSubmit(e, this.props.id); }}>
                <FormGroup row>
                  <Col>
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
                      onChange={this.readFile}
                      name="File"
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <label>Date of Inquiry</label>
                    <input
                      className="form-control"
                      type="date"
                      id="IssueDate"
                      name="Date"
                      required
                      onChange={this.handleIssueDate}
                      value={issueDate}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <label>Status</label>
                    <select
                      className="form-control"
                      name="Status"
                      id="Status"
                      onChange={this.handleStatus}
                      required
                    >
                      <option value="">SELECT</option>
                      <option value="Prohibited">Prohibited</option>
                      <option value="Not Prohibited">Not Prohibited</option>
                    </select>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <DataTable
                      style={{ overflow: 'auto' }}
                      responsive={true}
                      noHeader={true}
                      paginationPerPage={3}
                      paginationComponentOptions={{
                        noRowsPerPage: true
                      }}
                      pagination
                      columns={columns}
                      data={ListCHMap}
                    />
                    <AlertDelete
                      message="Are you sure you to delete this Clearing House?"
                      modal={this.state.deleteCHAlertOpen}
                      toggle={this.toggleDeleteCH}
                      delete={() => {
                        this.toggleDeleteCH();
                        this.props.deleteCH(
                          this.state.CHToDelete.idUser,
                          this.state.CHToDelete.idCH,
                          this.state.CHToDelete.idCompany,
                          this.state.CHToDelete.fileName
                        );
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Button
                      className="buttons-royal text-white px-5"
                      type="submit"
                      disabled={(!issueDate || !status || !fileName)}
                    >
                      Save
                  </Button>
                    {"  "}
                    <Button
                      className="buttons-royal text-white px-5"
                      onClick={() => { this.toggle(); }}
                    >
                      Close
                    </Button>{" "}
                  </Col>
                </FormGroup>
              </Form>
            </TabPane>
            {/*Annual Inquiry*/}
            <TabPane tabId="3">
              <Form onSubmit={(e) => { this.handleSubmitAI(e, this.props.id); }}>
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="text-input">Prev. Document Name</Label>
                    <Input
                      type="text"
                      id="PrevDocName"
                      name="PrevDocName"
                      value={this.props.CHFiles == '' || this.props.CHFiles == undefined ? "" : this.props.CHFiles[0].fileName}
                      readOnly
                    />
                  </Col>
                  <Col md="6">
                    <Label htmlFor="text-input">Prev. Status</Label>
                    <Input
                      type="text"
                      id="PrevStatus"
                      name="PrevStatus"
                      value={this.props.CHFiles == '' || this.props.CHFiles == undefined ? "" : this.props.CHFiles[0].Status}
                      readOnly
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Label htmlFor="text-input">Prev. Date</Label>
                    <Input
                      type="text"
                      id="PrevDate"
                      name="PrevDate"
                      maxLength="200"
                      value={this.props.CHFiles == '' || this.props.CHFiles == undefined ? "" : this.props.CHFiles[0].Date}
                      readOnly
                    />
                  </Col>
                  <Col>
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
                      label={fileNameAI}
                      type="file"
                      id="fileAI"
                      onChange={this.readFileAI}
                      name="File"
                      required
                      disabled={enableDisable}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <label>Status</label>
                    <select
                      className="form-control"
                      name="StatusCH"
                      id="StatusCH"
                      onChange={this.handleStatusAI}
                      required
                      disabled={enableDisable}
                    >
                      <option value="">SELECT</option>
                      <option value="Prohibited">Prohibited</option>
                      <option value="Not Prohibited">Not Prohibited</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Date Of Inquery</label>
                    <input
                      className="form-control"
                      type="date"
                      id="DateOfReview"
                      name="DateOfReview"
                      required
                      onChange={this.handleDateofReview}
                      value={DateofReview}
                      disabled={enableDisable}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Button
                      color="primary"
                      type="submit"
                      disabled={!DateofReview || !statusAI || !fileNameAI}
                    >
                      Save
                  </Button>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <DataTable
                      style={{ overflow: 'auto' }}
                      responsive={true}
                      noHeader={true}
                      paginationPerPage={3}
                      paginationComponentOptions={{
                        noRowsPerPage: true
                      }}
                      pagination
                      columns={columnsAI}
                      data={ListAIMap}
                    />
                    <AlertDelete
                      message="Are you sure you to delete this Annual Inquiry?"
                      modal={this.state.deleteAIAlertOpen}
                      toggle={this.toggleDeleteAI}
                      delete={() => {
                        this.toggleDeleteAI();
                        this.props.deleteAI(
                          this.state.AIToDelete.idUser,
                          this.state.AIToDelete.idAI,
                          this.state.AIToDelete.idCompany,
                          this.state.AIToDelete.DocName
                        );
                      }}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </TabPane>
            {/*Driver's Consent*/}
            <TabPane tabId="4">
              <Form onSubmit={(e) => { this.handleSubmitDC(e, this.props.id); }}>
                <FormGroup row>
                  <Col>
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
                      label={fileNameDC}
                      type="file"
                      id="fileDC"
                      onChange={this.readFileDC}
                      name="File"
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <label>Permission Date</label>
                    <input
                      className="form-control"
                      type="date"
                      id="PermissionDate"
                      name="Date"
                      required
                      onChange={this.handlePermissionDate}
                      value={PermissionDate}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <DataTable
                      style={{ overflow: 'auto' }}
                      responsive={true}
                      noHeader={true}
                      paginationPerPage={3}
                      paginationComponentOptions={{
                        noRowsPerPage: true
                      }}
                      pagination
                      columns={columnsDC}
                      data={ListDCMap}
                    />
                    <AlertDelete
                      message="Are you sure you to delete this Driver's Consent?"
                      modal={this.state.deleteDCAlertOpen}
                      toggle={this.toggleDeleteDC}
                      delete={() => {
                        this.toggleDeleteDC();
                        this.props.deleteDC(
                          this.state.DCToDelete.idUser,
                          this.state.DCToDelete.idDC,
                          this.state.DCToDelete.idCompany,
                          this.state.DCToDelete.fileName
                        );
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <Button
                      className="buttons-royal text-white px-5"
                      type="submit"
                      disabled={(!PermissionDate || !fileNameDC)}
                    >
                      Save
                  </Button>
                    {"  "}
                    <Button
                      className="buttons-royal text-white px-5"
                      onClick={() => { this.toggle(); }}
                    >
                      Close
                    </Button>{" "}
                  </Col>
                </FormGroup>
              </Form>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </div>
  
    );
  }
}

export default connect(
  (state) => state.clearinghouse,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(ClearingHouse);