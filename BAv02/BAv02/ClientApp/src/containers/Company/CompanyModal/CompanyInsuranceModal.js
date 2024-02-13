import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Fade,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Alert,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Pagination from "./../../../components/Pagination";
import FilesCard from "./../../../components/FilesCard";
import AlertDelete from "../../../components/AlertDelete";
import dateConvertTables from "../../../services/dateConvertTables";
import DatePicker from "../../../components/DatePicker";

registerPlugin(FilePondPluginFileValidateType);
const userId = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = localStorage["idCompany"];

let Files = {
  data: [],
};

export default class CompanyInsuranceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDeleteModal: false,
      allFiles: [],
      currentFiles: [],
      currentPage: null,
      totalPages: null,
      fileDeleted: false,
      countFiles: 0,
      activeTab: new Array(2).fill("1"),
      idDelete: 0,
      docTypeToDelete: "",
      fileNameToDelete: "",
      checkDomesticEnterprise: false,
      check123: 1,
      provider: "",
      otherProvider: "",
      policyDate: null,
      operationRadius: 0,
      portEntry: "",
      policyTerm: 0,
    };
  }

  componentDidMount() {
    this.props.getAllDocuments(userId, 1, 100);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.message === "File deleted successfully") {
      this.setState({ open: false });
      this.props.resetMessage();
    }

    if (prevProps.docs !== this.props.docs) {
      Files.data = this.props.docs.filter(this.props.filter);
      const { data: allFiles = [] } = Files;
      this.setState({ allFiles });
    }
  }

  componentWillReceiveProps() {
    Files.data = this.props.docs.filter(this.props.filter);
    const { data: allFiles = [] } = Files;
    this.setState({ allFiles });
  }

  onPageChanged = (data) => {
    const { allFiles } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentFiles = allFiles.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentFiles, totalPages });
  };

  fileCard = (file) => {
    return (
      <FilesCard
        docType={this.props.docType}
        download={this.props.downloadDoc}
        toggle={this.toggleDeleteModal}
        delete={this.deleteDoc}
        key={file.Id}
        file={file}
        class="FileCardsDropdown"
      />
    );
  };

  uploadFile = () => {
    var form = new FormData();
    let files = this.pond.getFiles();
    let timeout = 5000;
    if (files.length !== 0) {
      document.getElementById("loading").style = "display:block";
      document.getElementById("warningAlert").style = "display:none";
      files.forEach((file) => {
        form.append("files", file.file);
      });

      form.append("id", userId);
      form.append("docType", this.props.docType);
      form.append("idAccident", 0);
      this.props.uploadFile(form);
      setTimeout(() => {
        this.toggle();
      }, timeout);
    } else {
      document.getElementById("warningAlert").style = "display:block";
    }
  };

  toggle = () => {
    this.setState({ open: !this.state.open });

    if (!this.state.open) {
      this.props.getCompanyInsuranceInformation(idCompany);
    }
  };

  toggleTab(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

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
      userId,
      this.state.docTypeToDelete,
      this.state.fileNameToDelete,
      this.props.idVehicle
    );

    this.setState({
      openDeleteModal: !this.state.openDeleteModal,
      idDelete: 0,
      docTypeToDelete: "",
      fileNameToDelete: "",
    });

    this.toggle();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    var insurance = new FormData(e.target);
    insurance.append("idCompany", idCompany);
    insurance.append("checkDomesticEnterpriseA", document.getElementById("checkDomesticEnterprise").checked);
    if (this.props.insuranceInfo !== null) {
      insurance.append(
        "CompanyInsuranceID",
        this.props.insuranceInfo.CompanyInsuranceID
      );
    }
    this.props.saveCompanyInsuranceInformation(insurance);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onChangecheckDomesticEnterprise = () => {
    this.setState({ checkDomesticEnterprise: !this.state.checkDomesticEnterprise });
    this.setState({ check123: 2 });
  }

  render() {
    const { allFiles, currentFiles, countFiles } = this.state;

    return (
      <React.Fragment>
        <input
          type="image"
          onClick={this.toggle}
          className="img-responsive"
          src={this.props.imgSrc}
          onMouseOver={(e) =>
            (e.currentTarget.src = this.props.imgsrcMouseOver)
          }
          onMouseOut={(e) => (e.currentTarget.src = this.props.imgSrc)}
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>
          {this.props.iconText ? this.props.iconText : this.props.modalHeader}
        </h6>
        <Modal
          isOpen={this.state.open}
          className={"modal-lg "}
          backdrop={"static"}
          toggle={this.toggle}
        >
          <ModalHeader name="filePondModal" toggle={this.toggle}>
            {this.props.modalHeader}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === "1"}
                    onClick={() => {
                      this.toggleTab(0, "1");
                    }}
                  >
                    INSURANCE INFORMATION
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === "2"}
                    onClick={() => {
                      this.toggleTab(0, "2");
                    }}
                  >
                    INSURANCE FILES
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[0]}>
                <TabPane tabId="1">
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Row>
                        <Col style={{ marginLeft: "10px" }} md="12">
                          <input
                            id="checkDomesticEnterprise"
                            name="checkDomesticEnterprise"
                            type="checkbox"
                            onChange={this.onChangecheckDomesticEnterprise}
                            defaultChecked={
                              this.props.insuranceInfo !== null ?
                              this.props.insuranceInfo.checkDomesticEnterprise : false
                              }
                            className="mr-2"
                          />
                          <label htmlFor="checkDomesticEnterprise" style={{ fontSize: "1rem" }}>
                            &nbsp;Domestic Company
                          </label>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label htmlFor="text-input">Insurance Provider</Label>
                          <select
                            name="provider"
                            className="form-control"
                            onChange={this.onChange}
                            value={
                              this.props.insuranceInfo !== null &&
                              this.props.insuranceInfo.Provider !== null &&
                              this.state.provider === ""
                                ? this.props.insuranceInfo.Provider
                                : this.state.provider
                            }
                            required
                          >
                            <option value="">SELECT</option>
                            <option value="New Business">
                              New Business / Nuevo Negocio
                            </option>
                            <option value="New Horizon">New Horizon</option>
                            <option value="National Unity">
                              National Unity
                            </option>
                            <option value="CAIC">CAIC</option>
                            <option value="Qualitas">Qualitas</option>
                            <option value="Other">Other / Otros</option>
                          </select>
                        </Col>
                        {this.state.provider === "Other" ||
                        (this.props.insuranceInfo != null && 
                          this.props.insuranceInfo.OtherProvider !== null &&
                          this.state.provider === "") ? (
                          <Col id="other" md="4">
                            <Label htmlFor="text-input">
                              Other Insurance Provider
                            </Label>
                            <Input
                              type="text"
                              defaultValue={
                                this.props.insuranceInfo != null &&
                                this.props.insuranceInfo.Provider === "Other"
                                  ? this.props.insuranceInfo.OtherProvider : ""
                              }
                              name="otherProvider"
                            />
                          </Col>
                        ) : (
                          ""
                        )}

                        <Col id="other" md="4">
                          <DatePicker
                            id="PolicyDate"
                            name="PolicyDate"
                            labelText="Policy Effective Date"
                            value={
                              this.props.insuranceInfo !== null &&
                              this.props.insuranceInfo.PolicyDate !== null
                                ? dateConvertTables(
                                    this.props.insuranceInfo.PolicyDate
                                  )
                                : ""
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <Label htmlFor="text-input">Operation Radius</Label>
                          <select
                            name="operationRadius"
                            className="form-control"
                            onChange={this.onChange}
                            value={
                              this.props.insuranceInfo !== null &&
                                this.props.insuranceInfo.OperationRadius !==
                                null &&
                                this.state.operationRadius === 0
                                ? this.props.insuranceInfo.OperationRadius
                                : this.state.operationRadius
                            }
                            required
                          >
                            <option value="">SELECT</option>
                            <option value="50">0 - 50</option>
                            <option value="250">0 - 250</option>
                            <option value="500">0 - 500</option>
                            <option value="750">0 - 750</option>
                            <option value="1000">0 - 1,000</option>
                            <option value="1500">0 - 1,500</option>
                          </select>
                        </Col>
                        <Col md="4">
                          <Label htmlFor="text-input">Port of Entry</Label>
                          <select
                            name="portEntry"
                            className="form-control"
                            onChange={this.onChange}
                            value={
                              this.props.insuranceInfo !== null &&
                                this.props.insuranceInfo.PortEntry &&
                                this.state.portEntry === ""
                                ? this.props.insuranceInfo.PortEntry
                                : this.state.portEntry
                            }
                            required
                            disabled={
                              this.state.check123 != 1 ?
                                this.state.checkDomesticEnterprise :
                                this.props.insuranceInfo == null ?
                                  false :
                                  this.props.insuranceInfo.checkDomesticEnterprise
                            }
                          >
                            <option value="">SELECT</option>
                            <option style={{ fontWeight: "bold" }} disabled>
                              Baja California
                            </option>
                            <option value="All ports in AZ,CA,NM,& TX(PST)">
                              All ports in AZ,CA,NM,& TX(PST)
                            </option>
                            <option value="Andrade, CA(PST)">
                              Andrade, CA(PST)
                            </option>
                            <option value="Calexico, CA(PST)">
                              Calexico, CA(PST)
                            </option>
                            <option value="California & Arizona. All Ports(PST)">
                              California & Arizona. All Ports(PST)
                            </option>
                            <option value="San Ysidro / Otay, CA(PST)">
                              San Ysidro / Otay, CA(PST)
                            </option>
                            <option value="Tecate, CA(PST)">
                              Tecate, CA(PST)
                            </option>
                            <option style={{ fontWeight: "bold" }} disabled>
                              Chihuahua
                            </option>
                            <option value="Columbus / Sta. Teresa, NM(MST)">
                              Columbus / Sta. Teresa, NM(MST)
                            </option>
                            <option value="El Paso, TX(MST)">
                              El Paso, TX(MST)
                            </option>
                            <option value="Presidio, TX(MST)">
                              Presidio, TX(MST)
                            </option>
                            <option value="Texas & New Mexico, All Ports(MST)">
                              Texas & New Mexico, All Ports(MST)
                            </option>
                            <option style={{ fontWeight: "bold" }} disabled>
                              Sonora
                            </option>
                            <option value="Douglas,AZ(MST)">
                              Douglas,AZ(MST)
                            </option>
                            <option value="El Sasabe, AZ(MST)">
                              El Sasabe, AZ(MST)
                            </option>
                            <option value="Lukevile,AZ(MST)">
                              Lukevile,AZ(MST)
                            </option>
                            <option value="Naco,AZ(MST)">Naco,AZ(MST)</option>
                            <option value="Nogales,AZ(MST)">
                              Nogales,AZ(MST)
                            </option>
                            <option value="San Luis Rio Colorado,AZ(MST)">
                              San Luis Rio Colorado,AZ(MST)
                            </option>
                            <option style={{ fontWeight: "bold" }} disabled>
                              Tam,Coah, NL
                            </option>
                            <option value="AZ y TX. Todos los puertos(MST)">
                              AZ y TX. Todos los puertos(MST)
                            </option>
                            <option value="Boquillas, TX(CST)">
                              Boquillas, TX(CST)
                            </option>
                            <option value="Brownsville, TX(CST)">
                              Brownsville, TX(CST)
                            </option>
                            <option value="Del Rio, TX(CST)">
                              Del Rio, TX(CST)
                            </option>
                            <option value="Eagle Pass, TX(CST)">
                              Eagle Pass, TX(CST)
                            </option>
                            <option value="Hidalgo, TX(CST)">
                              Hidalgo, TX(CST)
                            </option>
                            <option value="Laredo, TX(CST)">
                              Laredo, TX(CST)
                            </option>
                            <option value="Mission, TX(CST)">
                              Mission, TX(CST)
                            </option>
                            <option value="Pharr, TX(CST)">
                              Pharr, TX(CST)
                            </option>
                            <option value="Progreso, TX(CST)">
                              Progreso, TX(CST)
                            </option>
                            <option value="Rio Grande City, TX(CST)">
                              Rio Grande City, TX(CST)
                            </option>
                            <option value="Roma, TX(CST)">Roma, TX(CST)</option>
                            <option value="Texas, All Ports(CST)">
                              Texas, All Ports(CST)
                            </option>
                          </select>
                        </Col>
                        <Col md="4">
                          <Label htmlFor="text-input">Policy Term</Label>
                          <select
                            name="policyTerm"
                            className="form-control"
                            onChange={this.onChange}
                            value={
                              this.props.insuranceInfo !== null &&
                              this.props.insuranceInfo.PolicyTerm !== null &&
                              this.state.policyTerm === 0
                                ? this.props.insuranceInfo.PolicyTerm
                                : this.state.policyTerm
                            }
                            required
                          >
                            <option value="">SELECT</option>
                            <option value="1">1 Month</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                          </select>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={{ size: "4", offset: "8" }}>
                          <Button
                            size="md"
                            type="submit"
                            color="primary"
                            className="btn btn-primary btn-block mt-5"
                          >
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Form>
                </TabPane>
                <TabPane tabId="2">
                  <div className="container mb-5">
                    <Row>
                      <Col md="12">
                        <div className="row d-flex flex-row py-2">
                          {currentFiles.map(this.fileCard)}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FilePond
                          // id="pond"
                          ref={(ref) => (this.pond = ref)}
                          allowFileTypeValidation={false}
                          onupdatefiles={(countFiles) => {
                            this.setState({
                              countFiles: countFiles.length,
                            });
                          }}
                          allowRevert={false}
                          instantUpload={false}
                          allowMultiple={true}
                          maxFiles={100}
                          maxParallelUploads={100}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Pagination
                          totalRecords={allFiles.length}
                          pageLimit={5}
                          onPageChanged={this.onPageChanged}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        md={{ size: 6, offset: 6 }}
                        style={{ textAlign: "right" }}
                      >
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={this.uploadFile}
                          disabled={countFiles === 0 ? true : false}
                        >
                          Upload Files
                        </button>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                      <Col md="12" style={{ textAlign: "center" }}>
                        <Alert
                          id="warningAlert"
                          color="warning"
                          style={{ display: "none" }}
                        >
                          No file has been added for upload
                        </Alert>
                        <img
                          id="loading"
                          className="imgLoading"
                          style={{ display: "none" }}
                          src="../../assets/img/icons/loading2.gif"
                          alt="loading"
                        />
                      </Col>
                    </Row>
                  </div>
                </TabPane>
              </TabContent>
            </FormGroup>
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
      </React.Fragment>
    );
  }
}
