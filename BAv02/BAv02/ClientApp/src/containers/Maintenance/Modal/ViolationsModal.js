import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
} from "reactstrap";
import TableCom from "../../../components/Table";
import dateConvertTables from "./../../../services/dateConvertTables";
import DataTable from "react-data-table-component";
import "../../../components/Styles/DataTable.css";
import FileUploadViolations from "./../Modal/FileUploadViolations";
import AlertDelete from "../../../components/AlertDelete";
const userId = JSON.parse(localStorage.getItem('user')).Id;

class ViolationsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: new Array(2).fill("1"),
      openDeleteModal: false,
      idDelete: 0,
      docTypeToDelete: "",
      fileNameToDelete: "",
    };
  }

  isRoadSideFile = (file) => {
    return file.DocType.trim() === "Roadside Inspection";
  };

  toggle = () => {
    this.props.toggle();
  };

  changeTab(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  mapViolationsForDataTable = (items) => {
    let data = items.map((row) => {
      var object = {};
      object.violation = row.ViolCode;
      object.area = row.BasicDesc;
      object.description = row.SectionDesc;
      object.section = row.GroupDesc;
      return object;
    });
    return data;
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

  render() {
    const columns = [
      {
        name: "VIOLATIONS",
        selector: "violation",
        sortable: true,
        width: "100px",
      },
      {
        name: "AREA",
        selector: "area",
        sortable: true,
        center: true,
        width: "150px",
      },
      {
        name: "DESCRIPTION",
        sortable: true,
        center: true,
        width: "350px",
        cell: (row) => (
          <div style={{ whiteSpace: "normal" }}>{row.description}</div>
        ),
      },
      {
        name: "SECTION",

        sortable: true,
        center: true,
        cell: (row) => (
          <div style={{ whiteSpace: "normal" }}>{row.section}</div>
        ),
      },
    ];

    const violations = this.mapViolationsForDataTable(this.props.list);

    return (
      <div>
        <Modal
          isOpen={this.props.openModal}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.toggle}
          name={"modal" + this.props.id}
        >
          <ModalHeader>ROADSIDE INSPECTION VIOLATIONS</ModalHeader>
          <ModalBody>
            <FormGroup row style={{ textAlign: "center" }}>
              <Col md="12">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === "1"}
                      onClick={() => {
                        this.changeTab(0, "1");
                      }}
                    >
                      VIOLATIONS
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === "2"}
                      onClick={() => {
                        this.changeTab(0, "2");
                      }}
                    >
                      UPLOAD
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab[0]}>
                  <TabPane tabId="1">
                    <Row>
                      <Col md="6">
                        <Label htmlFor="reportN" style={{ fontWeight: "bold" }}>
                          Report Number
                        </Label>
                        <Input
                          type="text"
                          id="reportN"
                          style={{ textAlign: "center" }}
                          defaultValue={this.props.id}
                          readOnly
                        />
                      </Col>
                      <Col sm="6">
                        <Label htmlFor="date" style={{ fontWeight: "bold" }}>
                          Date
                        </Label>
                        <Input
                          type="text"
                          id="date"
                          style={{ textAlign: "center" }}
                          defaultValue={dateConvertTables(this.props.date)}
                          readOnly
                        />
                      </Col>
                      <br />
                      {violations.length === 0 ? (
                        <><br></br>
                          <br></br>
                          <br></br>
                          <div
                            className="justify-content-center align-items-center"
                            style={{ minHeight: "10vh", width: "100%" }}
                          >
                            <div className="alert alert-success" role="alert">
                              <h4>No Violations Found.</h4>
                            </div>
                          </div>
                        </>
                      ) : (
                        <DataTable
                          responsive={true}
                          columns={columns}
                          data={violations}
                          pagination
                          striped
                        />
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <FileUploadViolations
                      id="RoadSideViolation"
                      uniqueID={this.props.id}
                      idVehicle={this.props.idVehicle}
                      typeId={this.props.typeId}
                      docType="Roadside Inspection"
                      filter={this.isRoadSideFile}
                      getAllDocuments={this.props.getAllDocuments}
                      downloadDoc={this.props.downloadDoc}
                      toggleDelete={this.toggleDeleteModal}
                      deleteDoc={this.deleteDoc}
                      docs={this.props.docs}
                      uploadFile={this.props.uploadFile}
                      toggle={this.props.toggle}
                      message=""
                    />
                  </TabPane>
                </TabContent>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              outline
              color="danger"
              onClick={() => {
                this.toggle();
              }}
            >
              Close
            </Button>
          </ModalFooter>
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

export default ViolationsModal;
