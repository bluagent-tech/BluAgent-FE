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
  TabPane,
  UncontrolledTooltip,
  Form,
} from "reactstrap";
import base64ToByteArray2 from "./../../../services/base64ToByteArray2";
import dateConvertTables from "./../../../services/dateConvertTables";
import DatePicker from "./../../../components/DatePicker";
import DataTable from "react-data-table-component";
import "../../../components/Styles/DataTable.css";
import AlertDelete from "./../../../components/AlertDelete";
const idCompany = localStorage["idCompany"];

//DMV PUBLIC DRIVING RECORD

class Dmv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      File: [],
      activeTab: new Array(4).fill("1"),
      fileName: undefined,
      recordDate: "",
      dateReview: "",
      issueDate: "",
      deleteDmvAlertOpen: false,
      dmvToDelete: {},
      deleteEpnAlertOpen: false,
      epnToDelete: {},
    };
    this.toggle = this.toggle.bind(this);
    this.readFile = this.readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.savePullNotice = this.savePullNotice.bind(this);
    this.handleIssueDate = this.handleIssueDate.bind(this);
    this.handleRecordDate = this.handleRecordDate.bind(this);
    this.handleDateReview = this.handleDateReview.bind(this);
  }

  handleIssueDate(e) {
    this.setState({ issueDate: e.target.value });
  }

  handleRecordDate(e) {
    this.setState({ recordDate: e.target.value });
  }

  handleDateReview(e) {
    this.setState({ dateReview: e.target.value });
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
      File: [],
      fileName: undefined,
      ExpirationDate: null,
      IssueDate: null,
    });
  }

  toggleDeleteDMV = (idUser, idDmv, idCompany, fileName) => {
    let dmvToDelete = {};
    dmvToDelete = {
      idUser: idUser,
      idDmv: idDmv,
      idCompany: idCompany,
      fileName: fileName,
    };

    this.setState({
      deleteDmvAlertOpen: !this.state.deleteDmvAlertOpen,
      dmvToDelete: dmvToDelete,
    });
  };

  toggleDeleteEpn = (idUser, idEpn, idCompany, fileName) => {
    let epnToDelete = {};

    epnToDelete = {
      idUser: idUser,
      idEpn: idEpn,
      idCompany: idCompany,
      fileName: fileName,
    };

    this.setState({
      deleteEpnAlertOpen: !this.state.deleteEpnAlertOpen,
      epnToDelete: epnToDelete,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    var dmv = new FormData(e.target);
    dmv.append("IdDriver", this.props.id);
    dmv.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    dmv.append("fileName", this.state.fileName);
    dmv.append("file", this.state.File);
    var issueDate = new Date(document.getElementById("IssueDate").value);
    var month =
      issueDate.getMonth() + 1 < 10
        ? "0" + (issueDate.getMonth() + 1)
        : issueDate.getMonth() + 1;
    var day =
      issueDate.getDate() < 10
        ? "0" + issueDate.getDate()
        : issueDate.getDate();
    var year = issueDate.getFullYear() + 1;
    var oneMoreYear = year + "-" + month + "-" + day;
    dmv.append("ExpirationDate", oneMoreYear);
    this.props.submit(dmv);
    document.getElementById("file").value = "";
    document.getElementById("IssueDate").value = "";
    this.setState({ File: [], fileName: undefined });
  }

  savePullNotice(e) {
    e.preventDefault();
    var epn = new FormData(e.target);
    epn.append("IdDriver", this.props.id);
    epn.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    epn.append("file", this.state.File);
    this.props.submitPull(epn);
    //document.getElementById("DriverLicense").value = "";
    this.setState({
      File: [],
      fileName: undefined,
      issueDate: "",
      recordDate: "",
      dateReview: "",
    });
  }

  readFile(e) {
    var input = e.target;
    var nameFile = input.files[0].name.substr(-4);
    if (input) {
      var reader = new FileReader();
      var file = "";
      reader.onload = (e) => {
        file = base64ToByteArray2(e.target.result);
        if (file) {
          this.setState({ File: file });
        }
      };

      try {
        this.setState({ fileName: input.files[0].name });
        reader.readAsDataURL(input.files[0]);
      } catch (error) {}
    }
  }

  mapDMVForDataTable = (items) => {
    let data = items.map((row) => {
      var object = {};
      object.dmvFileName = row.DmvFileName;
      object.issueDate = dateConvertTables(row.IssueDate);
      object.expirationDate = dateConvertTables(row.ExpirationDate);
      object.download = (
        <Button
          type="button"
          color="primary"
          onClick={() => {
            this.props.download(row.IdDriver, "DrivingRecord", row.DmvFileName);
          }}
        >
          Download File
        </Button>
      );
      object.delete = (
        <i
          className="icon-close font-2x2icon-close icons font-2xl d-block"
          onClick={() => {
            this.toggleDeleteDMV(
              row.IdDriver,
              row.Id,
              idCompany,
              row.DmvFileName
            );
          }}
          style={{ color: "red", cursor: "pointer" }}
        ></i>
      );
      return object;
    });
    return data;
  };

  mapPullNoticeForDataTable = (items) => {
    var data = null;
    if (items != undefined) {
      data = items.map((row) => {
        var object = {};
        object.recordDate = dateConvertTables(row.RecordDate);
        object.requesterCode = row.RequesterCode;
        object.violations = row.Violations;
        object.reviewedBy = row.ReviewedBy;
        object.dateReview = dateConvertTables(row.DateReview);
        object.download = (
          <Button
            type="button"
            color="primary"
            onClick={() => {
              this.props.download(
                row.IdDriver,
                "EmployerPullNotice",
                row.FileName
              );
            }}
          >
            Download
          </Button>
        );
        object.delete = (
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            onClick={() => {
              this.toggleDeleteEpn(
                row.IdDriver,
                row.Id,
                idCompany,
                row.FileName
              );
            }}
            style={{ color: "red", cursor: "pointer" }}
          ></i>
        );
        return object;
      });
    } else {
      data = null;
    }

    return data;
  };

  render() {
    const { issueDate, recordDate, dateReview } = this.state;

    const columnsDMV = [
      {
        name: "FILE NAME",
        selector: "dmvFileName",
        sortable: true,
      },
      {
        name: "ISSUE DATE",
        selector: "issueDate",
        sortable: true,
      },
      {
        name: "EXPIRATION DATE",
        selector: "expirationDate",
        sortable: true,
      },
      {
        name: "DOWNLOAD DRIVING RECORD FILE",
        selector: "download",
      },
      {
        name: "",
        selector: "delete",
        center: true,
        width: "80px",
      },
    ];

    const dmvList = this.mapDMVForDataTable(this.props.list);

    const columnsPullNotice = [
      {
        name: "RECORD DATE",
        selector: "recordDate",
        sortable: true,
      },
      {
        name: "REQUESTER CODE",
        selector: "requesterCode",
        sortable: true,
      },
      {
        name: "VIOLATIONS",
        selector: "violations",
        sortable: true,
      },
      {
        name: "REVIEWED BY",
        selector: "reviewedBy",
        sortable: true,
      },
      {
        name: "DATE OF REVIEW",
        selector: "dateReview",
        sortable: true,
      },
      {
        name: "FILE",
        selector: "download",
        center: true,
      },
      {
        name: "",
        selector: "delete",
        center: true,
        width: "80px",
      },
    ];

    const pullNoticeList = this.mapPullNoticeForDataTable(this.props.listPull);

    return (
      <div className="col-md-3">
        <input
          onClick={() => {
            this.props.toggle(this.props.id);
          }}
          className="img-responsive"
          type="image"
          src="assets/icons/icons8-renew.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-renew.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-renew.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>DMV</h6>
        <Modal
          isOpen={this.props.modal}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.props.toggle}
        >
          <ModalHeader name="modal1" toggle={this.props.toggle}>
            DMV
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
                  DRIVING RECORD
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
                  }}
                >
                  EMPLOYER PULL NOTICE
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="1">
                {this.props.statusR === "ACTIVE" ? (
                  <Form onSubmit={this.handleSubmit}>
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
                        <label>Date Issued</label>
                        <input
                          className="form-control"
                          type="date"
                          id="IssueDate"
                          name="IssueDate"
                          required
                          onChange={this.handleIssueDate}
                          value={issueDate}
                        />
                      </Col>
                    </FormGroup>
                    <br />
                    <FormGroup row>
                      <Col md="6">
                        <Button
                          className="buttons-royal text-white px-5"
                          type="submit"
                          disabled={!issueDate}
                        >
                          Save
                        </Button>
                        {"  "}
                        <Button
                          className="buttons-royal text-white px-5"
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

                <DataTable
                  responsive={true}
                  columns={columnsDMV}
                  data={dmvList}
                  pagination
                />

                <AlertDelete
                  message="Are you sure you to delete this DMV Record?"
                  modal={this.state.deleteDmvAlertOpen}
                  toggle={this.toggleDeleteDMV}
                  delete={() => {
                    this.toggleDeleteDMV();

                    this.props.deleteDMV(
                      this.state.dmvToDelete.idUser,
                      this.state.dmvToDelete.idDmv,
                      this.state.dmvToDelete.idCompany,
                      this.state.dmvToDelete.fileName
                    );
                  }}
                />
              </TabPane>
              {/*EMPLOYER PULL NOTICE*/}
              <TabPane tabId="2">
                {this.props.statusR === "ACTIVE" ? (
                  <Form
                    onSubmit={this.savePullNotice}
                    ref={(form) => (this.form = form)}
                  >
                    <FormGroup row>
                      <Col md="6">
                        <Label htmlFor="text-input">
                          Driver License
                          <i
                            id="driver"
                            className="icon-question"
                            style={{ marginLeft: "5px", color: "grey" }}
                          ></i>
                          <UncontrolledTooltip
                            placement="right"
                            target="driver"
                          >
                            Provide the complete DL Number issued to the driver
                            from their home state. Note: If the driver has a
                            previously issued CA DL Number, or “X” number.
                          </UncontrolledTooltip>
                        </Label>
                        <Input
                          type="text"
                          name="DriverLicense"
                          maxLength="15"
                          required
                        />
                      </Col>
                      <Col md="6">
                        <label>Record Date</label>
                        <input
                          className="form-control"
                          type="date"
                          name="RecordDate"
                          required
                          value={recordDate}
                          onChange={this.handleRecordDate}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="6">
                        <Label htmlFor="text-input">Requester Code</Label>
                        <Input type="text" name="RequesterCode" required />
                      </Col>
                      <Col md="6">
                        <Label htmlFor="text-input">Violations</Label>
                        <select
                          className="form-control"
                          name="Violations"
                          required
                        >
                          <option value="">SELECT</option>
                          <option value="None to report">None to report</option>
                          <option value="Violation were found, please review">
                            Violation were found, please review
                          </option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <label>Date Reviewed</label>
                        <input
                          className="form-control"
                          type="date"
                          name="DateReview"
                          labelText="Date of Review"
                          required
                          value={dateReview}
                          onChange={this.handleDateReview}
                        />
                      </Col>
                      <Col>
                        <Label htmlFor="text-input">Reviewed by:</Label>
                        <Input type="text" name="ReviewedBy" required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="12">
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
                    <br />
                    <FormGroup row>
                      <Col md="6">
                        <Button
                          className="buttons-royal text-white px-5"
                          type="submit"
                          disabled={!dateReview || !recordDate}
                        >
                          Save
                        </Button>
                        {"  "}
                        <Button
                          className="buttons-royal text-white px-5"
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
                <DataTable
                  responsive={true}
                  columns={columnsPullNotice}
                  data={pullNoticeList}
                  pagination
                />

                <AlertDelete
                  message="Are you sure you want to delete Employment Pull Notice?"
                  modal={this.state.deleteEpnAlertOpen}
                  toggle={this.toggleDeleteEpn}
                  delete={() => {
                    this.toggleDeleteEpn();

                    this.props.deleteEPN(
                      this.state.epnToDelete.idUser,
                      this.state.epnToDelete.idEpn,
                      this.state.epnToDelete.idCompany,
                      this.state.epnToDelete.fileName
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

export default Dmv;
