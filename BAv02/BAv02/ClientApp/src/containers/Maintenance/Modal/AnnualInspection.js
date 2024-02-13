﻿import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/Trucks";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Alert,
  Row,
  Col,
} from "reactstrap";
import DropdownMenu from "../../../components/DropdownMenu";
import DataTable from "react-data-table-component";
import dateConvertTables from "../../../services/dateConvertTables";
import moment from "moment";
import FilesCard from "../../../components/FilesCard";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Pagination from "../../../components/Pagination";

const userId = JSON.parse(localStorage.getItem("user")).Id;
const id = localStorage["idCompany"];

registerPlugin(FilePondPluginFileValidateType);

let Files = {
  data: [],
};

const OptionMenuInspections = ({
  reduxProps,
  idInspection,
  idCompany,
  idVehicle,
  inspectionType,
  fileName,
}) => {
  return (
    <div className="text-center">
      <DropdownMenu
        direction="right"
        itemID={idInspection}
        idCompany={idCompany}
        idVehicleInspection={idVehicle}
        inspectionType={inspectionType}
        fileName={fileName}
        menuOptions={[["Download", "Download"]]}
      />
    </div>
  );
};

const OptionMenuPMInspections = ({
  reduxProps,
  idInspection,
  idCompany,
  idVehicle,
  inspectionType,
  fileName,
}) => {
  return (
    <div className="text-center">
      <DropdownMenu
        direction="right"
        itemID={idInspection}
        idCompany={idCompany}
        idVehicle={idVehicle}
        inspectionType={inspectionType}
        fileName={fileName}
        menuOptions={[["Download", "Download"]]}
      />
    </div>
  );
};

class AnnualInspection extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.mapInspectionsDataTable = this.mapInspectionsDataTable.bind(this);
    this.mapPMInspectionsDataTable = this.mapPMInspectionsDataTable.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {
      open: false,
      activeTab: new Array(4).fill("1"),
      filterTextInspections: "",
      filterTextPMInspections: "",
      allFiles: [],
      currentFiles: [],
      currentPage: null,
      totalPages: null,
      fileDeleted: false,
      countFiles: 0,
    };
  }

  fileCard = (file) => {
    return (
      <FilesCard
        idVehicle={this.props.id}
        docType={this.props.docType}
        download={this.props.downloadDoc}
        toggle={this.props.toggleD}
        delete={this.props.deleteDoc}
        key={file.Id}
        file={file}
        class="FileCardsDropdown"
      />
    );
  };

  toggle() {
    this.props.getInspections(this.props.idVehicle, this.props.vehicleType);
    this.setState({ open: !this.state.open });
  }
  toggleTab(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  uploadFile() {
    var form = new FormData();
    let files = this.pond.getFiles();
    let timeout = 5000;
    if (files.length !== 0) {
      document.getElementById("loading").style = "display:block";
      document.getElementById("warningAlert").style = "display:none";

      files.forEach((file) => {
        form.append("files", file.file);
      });

      form.append("idUser", userId);
      form.append("id", this.props.id);
      form.append("docType", this.props.docType);

      this.props.uploadFile(form);

      setTimeout(() => {
        this.toggle();
      }, timeout);
    } else {
      document.getElementById("warningAlert").style = "display:block";
    }
  }

  componentDidMount() {
    this.mapInspectionsDataTable();
    this.mapPMInspectionsDataTable();
  }

  componentWillReceiveProps() {
    Files.data = this.props.docs.filter(this.props.filter);
    const { data: allFiles = [] } = Files;
    this.setState({ allFiles });
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

  mapInspectionsDataTable() {
    let data;
    data = this.props.maintenanceInspections.map((row) => {
      var object = {};
      object.vehicleNumber = row.VehicleNumber;
      object.vin = row.Vin;
      object.inspectionType = row.InspectionType;
      object.date = row.InspectionDate;
      object.odometer = row.Odometer;
      object.options = (
        <OptionMenuInspections
          reduxProps={this.props}
          isInactive={false}
          idInspection={row.Id}
          idCompany={id}
          idVehicle={row.IdVehicle}
          inspectionType={row.InspectionType}
          fileName={row.FileName}
        />
      );
      return object;
    });

    return data;
  }

  mapPMInspectionsDataTable() {
    let data;
    data = this.props.inspections.map((row) => {
      var object = {};
      object.vehicleNumber = row.VehicleNumber;
      object.vin = row.Vin;
      object.inspectionType = row.InspectionType;
      object.date = row.InspectionDate;
      object.mileageDue = row.Odometer;
      object.options = (
        <OptionMenuPMInspections
          reduxProps={this.props}
          isInactive={false}
          idInspection={row.Id}
          idCompany={id}
          idVehicle={row.IdVehicle}
          inspectionType={row.InspectionType}
          fileName={row.FileName}
        />
      );
      return object;
    });
    return data;
  }

  onPageChanged = (data) => {
    const { allFiles } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentFiles = allFiles.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentFiles, totalPages });
  };

  render() {
    const { allFiles, currentFiles, countFiles } = this.state;
    /// inspections
    const inspectionColumns = [
      {
        name: "VEHICLE",
        selector: "vehicleNumber",
        center: true,
        sortable: true,
      },
      {
        name: "VIN",
        selector: "vin",
        center: true,
      },
      {
        name: "TYPE",
        selector: "inspectionType",
        center: true,
      },
      {
        name: "DATE",
        selector: (row) => (row.date !== null ? row.date : "00-00-0000"),
        center: true,
        sortable: true,
        format: (row) =>
          row.date !== null ? moment(row.date).format("MM-DD-YYYY") : null,
      },
      {
        name: "ODOMETER",
        selector: "odometer",
        center: true,
        grow: 0,
      },
      { name: "OPTIONS", selector: "options", grow: 0, center: true },
    ];
    const inspections = this.mapInspectionsDataTable(this.props.inspections);
    const filteredInspections = inspections.filter((item) =>
      item.vehicleNumber
        .toLowerCase()
        .includes(this.state.filterTextInspections.toLowerCase())
    );

    const PMinspections = this.mapPMInspectionsDataTable(
      this.props.PMinspections
    );
    return (
      <div className="col-md-3">
        <input
          type="image"
          onClick={this.toggle}
          className="img-responsive"
          src="assets/icons/icons8-inspection.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-inspection.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-inspection.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>ANNUAL INSPECTION</h6>
        <Modal
          isOpen={this.state.open}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.toggle}
        >
          <ModalHeader name="modal1" toggle={this.toggle}>
            MAINTENANCE INSPECTIONS
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
                  INSPECTIONS
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggleTab(0, '2');
                  }}
                >
                  PM INSPECTION
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => {
                    this.toggleTab(0, '3');
                  }}
                >
                  REPAIR RECORD
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggleTab(0, "2");
                  }}
                >
                  MANUAL INSPECTIONS
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {/*inspections*/}
              <TabPane tabId="1">
                <DataTable
                  responsive={true}
                  pagination
                  columns={inspectionColumns}
                  data={filteredInspections}
                />
              </TabPane>
              {/*om inspections*/}
              {/* <TabPane tabId="2">
                <DataTable
                  responsive={true}
                  pagination
                  columns={PMinspectionColumns}
                  data={filteredPMInspections}
                />
              </TabPane> */}
              {/*repair record*/}
              {/* <TabPane tabId="3"></TabPane> */}
              {/*MANUAL RECORD */}
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
                        ref={(ref) => (this.pond = ref)}
                        allowFileTypeValidation={false}
                        allowRevert={false}
                        instantUpload={false}
                        allowMultiple={true}
                        maxFiles={100}
                        maxParallelUploads={100}
                        onupdatefiles={(countFiles) => {
                          this.setState({
                            countFiles: countFiles.length,
                          });
                        }}
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
                        style={{
                          display: "none",
                        }}
                        src="../../assets/img/icons/loading2.gif"
                        alt="loading"
                      />
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button className="buttons-royal text-white" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => state.trucks,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(AnnualInspection);
