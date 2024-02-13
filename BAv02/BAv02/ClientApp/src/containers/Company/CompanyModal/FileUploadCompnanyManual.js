import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/AccountSettings";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Alert,
  Row,
  Col,
} from "reactstrap";
import FileUpload from "./../../../components/FileUpload";
import AlertDelete from "../../../components/AlertDelete";
import DataTable from "react-data-table-component";
import DropdownMenu from "../../../components/DropdownMenu";
import FleetSafetyManual from "../Pdf/FleetSafetyManualPDF";
import DriverSafetyManual from "../Pdf/DriverSafetyManualPDF";

const ActualDate = new Date();
const actualyear = ActualDate.getFullYear();
let Files = {
  dataFleet: [],
  dataDriver: [],
};
var data = [];
const columns = [
  {
    name: "DATE",
    selector: (row) => row.date,
    sortable: true,
    center: true,
  },
  {
    name: "FILE NAME",
    selector: (row) => row.fileName,
    center: true,
  },
  {
    name: "PREVIEW",
    selector: (row) => row.preview,
    center: true,
  },
  {
    name: "OPTIONS",
    selector: (row) => row.options,
    center: true,
  },
];

class FileUploadCompanyManual extends React.Component {
  isFleetSafatyManual = (file) => {
    return file.DocType.trim() === "FleetSafetyManual";
  };

  isDriverManualDoc = (file) => {
    return file.DocType.trim() === "DriverSafetyManual";
  };

  isSafetyComplianceReportDoc = (file) => {
    return file.DocType.trim() === "SafetyComplianceReport";
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openDeleteModal: false,
      activeTab: new Array(4).fill("1"),
      idDelete: 0,
      docTypeToDelete: "",
      fileNameToDelete: "",
      allFilesFleet: [],
      allFilesDriver: [],
      genDriver: true,
      genFleet: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("documentos: ", this.props.docs);
    if (this.props.message === "File deleted successfully") {
      // this.props.toggle();
    }
    if (prevProps.docs !== this.props.docs) {
      Files.dataFleet = this.props.docs.filter(this.isFleetSafatyManual);
      Files.dataDriver = this.props.docs.filter(this.isDriverManualDoc);

      const { dataFleet: allFilesFleet = [] } = Files;
      this.setState({ allFilesFleet });
      const { dataDriver: allFilesDriver = [] } = Files;
      this.setState({ allFilesDriver });
    }
  }

  componentWillReceiveProps() {
    Files.dataFleet = this.props.docs.filter(this.isFleetSafatyManual);
    Files.dataDriver = this.props.docs.filter(this.isDriverManualDoc);

    const { dataFleet: allFilesFleet = [] } = Files;
    this.setState({ allFilesFleet });
    const { dataDriver: allFilesDriver = [] } = Files;
    this.setState({ allFilesDriver });
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
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
      this.props.idUser,
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

  toggleTab = (tabPane, tab) => {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  };

  render() {
    if (this.state.allFilesFleet.length !== 0) {
      for (let i = 0; i < this.state.allFilesFleet.length; i++) {
        if (
          this.state.allFilesFleet[i].DescriptionDoc.slice(20, 24) ===
          actualyear.toString()
        ) {
          this.state.genFleet = false;
          break;
        } else {
          this.state.genFleet = true;
        }
      }
    } else {
      this.state.genFleet = true;
    }

    if (this.state.allFilesDriver.length !== 0) {
      for (let i = 0; i < this.state.allFilesDriver.length; i++) {
        if (
          this.state.allFilesDriver[i].DescriptionDoc.slice(21, 25) ===
          actualyear.toString()
        ) {
          this.state.genDriver = false;
          break;
        } else {
          this.state.genDriver = true;
        }
      }
    } else {
      this.state.genDriver = true;
    }

    // for (let i = 0; i < this.state.allFilesDriver.length; i++) {
    //   if (this.state.allFilesDriver.length != 0) {
    //     if (
    //       this.state.allFilesDriver[i].DescriptionDoc.slice(21, 25) ==
    //       actualyear
    //     ) {
    //       // this.setState({ genFleet: false });
    //       this.state.genDriver = false;
    //     } else {
    //       this.state.genDriver = true;
    //     }
    //   } else {
    //     this.state.genDriver = true;
    //   }
    // }

    // if (this.state.allFilesFleet.length === 0) {
    //   this.state.genFleet = true;
    // }
    // if (this.state.allFilesDriver.length === 0) {
    //   this.state.genDriver = true;
    // }
    // for (let i = 0; i < this.state.allFilesFleet.length; i++) {
    //   console.log("for", this.state.genFleet);

    //   if (this.state.allFilesFleet.length != 0) {
    //     if (
    //       this.state.allFilesFleet[i].DescriptionDoc.slice(20, 24) ===
    //       actualyear.toString()
    //     ) {
    //       console.log("Mismo ano");
    //       this.state.genFleet = false;
    //       // this.setState({ genFleet: false });
    //     } else if (this.state.genFleet !== false) {
    //       console.log("else de adentro");
    //       this.state.genFleet = true;
    //     }
    //   } else {
    //     console.log("poner en true");
    //     this.state.genFleet = true;
    //   }
    // }

    // console.log("Datos del documento para hacer la url: ", this.props);
    var rowFleet = this.state.allFilesFleet.map((row, index) => ({
      id: index,
      date: row.DescriptionDoc.slice(20, 24),
      fileName: row.DescriptionDoc.slice(0, 19),
      preview: (
        <Button
          key={index}
          style={{
            color: "white",
            backgroundColor: "#008ecc",
          }}
          onClick={() =>
            window.open(
              "https://bluagent-files.s3-us-west-2.amazonaws.com/" +
              this.props.company.Id +
              "/" +
              row.DocType +
              "/" +
              row.DocName
            )
          }
        >
          Preview
        </Button>
      ),
      options: (
        <DropdownMenu
          right
          class={
            this.props.class === null ? "" : this.props.class + "fix-dropdowns"
          }
          direction="right"
          toggleDeleteModal={() => {
            this.props.idVehicle
              ? this.props.download(
                this.props.idVehicle,
                this.props.idUser,
                row.DocType,
                row.DocName,
                row.DescriptionDoc
              )
              : this.props.downloadDoc(
                this.props.idUser,
                row.DocType,
                row.DocName,
                row.DescriptionDoc
              );
          }}
          menuOptions={[
            [
              "Delete",
              () => {
                this.props.toggleDeleteFilesCompanyModal(
                  row.Id,
                  this.props.idUser,
                  row.DocType,
                  row.DocName
                );
              },
            ],
            ["Download", "This is a function"],
          ]}
        />
      ),
    }));

    var rowDriver = this.state.allFilesDriver.map((row, index) => ({
      id: index,
      date: row.DescriptionDoc.slice(21, 25),
      fileName: row.DescriptionDoc.slice(0, 21),
      preview: (
        <Button
          key={index}
          style={{
            color: "white",
            backgroundColor: "#008ecc",
          }}
          onClick={() =>
            window.open(
              "https://bluagent-files.s3-us-west-2.amazonaws.com/" +
              this.props.company.Id +
              "/" +
              row.DocType +
              "/" +
              row.DocName
            )
          }
        >
          Preview
        </Button>
      ),
      options: (
        <DropdownMenu
          right
          class={
            this.props.class === null ? "" : this.props.class + "fix-dropdowns"
          }
          direction="right"
          toggleDeleteModal={() => {
            this.props.idVehicle
              ? this.props.download(
                this.props.idVehicle,
                this.props.idUser,
                row.DocType,
                row.DocName,
                row.DescriptionDoc
              )
              : this.props.downloadDoc(
                this.props.idUser,
                row.DocType,
                row.DocName,
                row.DescriptionDoc
              );
          }}
          menuOptions={[
            [
              "Delete",
              () => {
                this.props.toggleDeleteFilesCompanyModal(
                  row.Id,
                  this.props.idUser,
                  row.DocType,
                  row.DocName
                );
              },
            ],
            ["Download", "This is a function"],
          ]}
        />
      ),
    }));
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
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.toggle}
        >
          <ModalHeader name="modal1" toggle={this.toggle}>
            SAFETY PROGRAM
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
                  FLEET SAFETY MANUALS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggleTab(0, "2");
                  }}
                >
                  DRIVER SAFETY MANUALS
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "3"}
                  onClick={() => {
                    this.toggleTab(0, "3");
                  }}
                >
                  SAFETY COMPLIANCE REPORT
                </NavLink>
              </NavItem> */}
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {/* FLEET SAFETY MANUALS */}
              <TabPane tabId="1">
                <DataTable columns={columns} data={rowFleet} />
                <FileUpload
                  onlyUpload={true}
                  id="FleetSafetyUpload"
                  docType="FleetSafetyManual"
                  filter={this.isFleetSafatyManual}
                  getAllDocuments={this.props.getAllDocuments}
                  downloadDoc={this.props.downloadDoc}
                  toggleDeleteFilesCompanyModal={this.toggleDeleteModal}
                  deleteDoc={this.props.deleteDoc}
                  docs={this.props.docs}
                  uploadFile={this.props.uploadFile}
                  toggle={this.toggle}
                  message=""
                />
                <FleetSafetyManual
                  uploadFile={this.props.uploadFile}
                  idUser={this.props.idUser}
                  docType="FleetSafetyManual"
                  genFleet={this.state.genFleet}
                  company={this.props.company}
                  isloading={this.props.isLoadingUploadManual}
                />
              </TabPane>
              {/* DRIVER SAFETY MANUALS */}
              <TabPane tabId="2">
                <DataTable columns={columns} data={rowDriver} />

                <FileUpload
                  onlyUpload={true}
                  id="driverSafetyUpload"
                  docType="DriverSafetyManual"
                  filter={this.isDriverManualDoc}
                  getAllDocuments={this.props.getAllDocuments}
                  downloadDoc={this.props.downloadDoc}
                  toggleDeleteFilesCompanyModal={this.toggleDeleteModal}
                  deleteDoc={this.props.deleteDoc}
                  docs={this.props.docs}
                  uploadFile={this.props.uploadFile}
                  toggle={this.toggle}
                  message=""
                />
                <DriverSafetyManual
                  uploadFile={this.props.uploadFile}
                  idUser={this.props.idUser}
                  docType="DriverSafetyManual"
                  genDriver={this.state.genDriver}
                  company={this.props.company}
                  isloading={this.props.isLoadingUploadManual}
                />
              </TabPane>

              {/* <TabPane tabId="3">
                <FileUpload
                  id="safetyComplianceUpload"
                  docType="SafetyComplianceReport"
                  filter={this.isSafetyComplianceReportDoc}
                  getAllDocuments={this.props.getAllDocuments}
                  downloadDoc={this.props.downloadDoc}
                  toggleDeleteFilesCompanyModal={this.toggleDeleteModal}
                  deleteDoc={this.props.deleteDoc}
                  docs={this.props.docs}
                  uploadFile={this.props.uploadFile}
                  toggle={this.toggle}
                  message=""
                />
              </TabPane> */}
            </TabContent>
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

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(FileUploadCompanyManual);
