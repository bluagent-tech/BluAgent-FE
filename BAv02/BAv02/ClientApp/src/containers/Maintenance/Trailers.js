import React, { Component } from "react";
import {
  FormGroup,
  Button,
  Col,
  UncontrolledTooltip,
  Input,
  Row,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Maintenance";
import AddTrailer from "./Modal/AddTrailer ";
import ExportTrailers from "./Modal/ExportTrailer";
import dateConvertTables from "./../../services/dateConvertTables";
import AlertDelete from "./../../components/AlertDelete";
import DropdownMenu from "./../../components/DropdownMenu";
import Switch from "react-switch";
import moment from "moment";
import DataTable from "react-data-table-component";
import "../../components/Styles/DataTable.css";

const id = JSON.parse(localStorage.getItem("user")).Id;

const Filter = ({ onFilter, reduxProps }) => {
  return (
    <React.Fragment>
      <FormGroup style={{ marginBottom: "0px" }} row>
        <Col md="10">
          <Input
            className="mb-2"
            id="search"
            type="search"
            role="search"
            placeholder="Search Trailer"
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
        {/* //Col cambiado a md = "0" */}
        <Col md="0">
          <Button
            //Estilo del boton cambiado
            style={{
              borderRadius: "30px",
              width: "30px",
              height: "30px",
              paddingLeft: "0px",
              paddingTop: "0px",
              fontSize: "20px",
              paddingRight: "0px",
              paddingBottom: "0px",
              lineHeight: 1,
              marginRight: "20px",
            }}
            color="#1b8eb7"
            className="btn btn-primary"
            onClick={reduxProps.toggle2}
            id="addNT"
          >
            +
          </Button>
          <UncontrolledTooltip placement="bottom" target="addNT">
            Add New Trailer
          </UncontrolledTooltip>
          <AddTrailer
            toggle={reduxProps.toggle2}
            modal={reduxProps.modal2}
            states={reduxProps.states}
            OnSubmit={reduxProps.addTrailer}
            onBlur={reduxProps.validateVinExistence}
            getVin={reduxProps.getDataTrailerByVin}
            existVin={reduxProps.existVin}
            dataByVin={reduxProps.dataTrailerByVin}
            isLoading={reduxProps.isLoading}
            error={reduxProps.error}
          />

          <Button
            id="exportnT"
            onClick={reduxProps.toggleET2}
            color="primary"
            className="fa fa-file-text-o btn btn-primary text-white options-drugs"
            //Estilo del boton cambiado
            style={{
              borderRadius: "30px",
              width: "30px",
              height: "30px",
              paddingLeft: "0px",
              paddingTop: "0px",
              fontSize: "15px",
              paddingRight: "0px",
              paddingBottom: "0px",
              lineHeight: 1,
              marginRight: "20px",
            }}
          />
          <UncontrolledTooltip placement="bottom" target="exportnT">
            Export Trailer's
          </UncontrolledTooltip>
          <ExportTrailers
            toggle={reduxProps.toggleET2}
            modal={reduxProps.modalET2}
            states={reduxProps.states}
            dataExportTrailers={reduxProps.dataExportTrailers.Items}
            dataExportTrailersWithInspections={
              reduxProps.dataExportTrailersWithInspections.Items
            }
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  );
};

const VehicleImg = (img, idVehicle) => {
  return (
    <div className="align-right">
      <div className="avatar">
        <img
          src={
            img === null
              ? "assets/maintenancePdf/Images/defaultTrailer.png"
              : `https://bluagent-files.s3-us-west-2.amazonaws.com/${localStorage["idCompany"]}/TrailersFile/${idVehicle}/trailerAvatar.png`
          }
          alt={`truck_avatar${idVehicle}`}
          className="img-avatar"
          style={{ width: "100%", height: "100%" }}
        />
        <span className="avatar-status badge-success"></span>
      </div>
    </div>
  );
};

const OptionMenu = ({ reduxProps, idTrailer, isInactive }) => {
  if (isInactive) {
    return (
      <div className="text-center">
        <DropdownMenu
          direction="right"
          itemID={idTrailer}
          menuOptions={[
            [
              "Restore",
              () => {
                reduxProps.toggleD2(idTrailer, "restore");
              },
            ],
          ]}
        />
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <DropdownMenu
          direction="right"
          toggleWorkOrderModal={() => {
            reduxProps.toggleWO(idTrailer);
          }}
          toggleDeleteModal={() => {
            reduxProps.toggleD2(idTrailer, "Deactivate");
          }}
          itemID={idTrailer}
          menuOptions={[
            [
              "Create Inspection",
              () => {
                reduxProps.toggleVehicleInspectionModal("TRAILER", idTrailer);
              },
            ],
            ["Create Work Order", "This is a function2"],
            ["Deactivate", "This is a function"],
          ]}
        />
      </div>
    );
  }
};

//MAINTENANCE TRAILERS

class Trailers extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: true,
      filterTextTrailers: "",
      filterTextInactiveTrailers: "",
    };
  }

  handleChange(checked) {
    this.setState({ checked });

    this.props.exportTrailers(id, checked);
    this.props.exportTrailersInspections(id, checked);

    if (checked == true) {
      document.getElementById('activeItemsContainer2').style.display = "block";
      document.getElementById('inactiveItemsContainer2').style.display = "none";
    } else {
      document.getElementById('activeItemsContainer2').style.display = "none";
      document.getElementById('inactiveItemsContainer2').style.display = "block";
    }
  }

  componentDidMount() {
    this.props.getStates();

    this.props.getTrailers(id, 1, 1000, false);
    this.props.getTrailers(id, 1, 1000, true);

    this.props.exportTrailers(id, this.state.checked);
    this.props.exportTrailersInspections(id, this.state.checked);
  }

  mapTrailersForDataTable(items, isInactive) {
    let data = items.map((row) => {
      var object = {};
      object.photo = VehicleImg(row.FileImage, row.Id);
      object.trailerNumber = row.Name;
      object.vin = row.Vin;
      object.plate = row.Plate;
      object.plateState = row.PlateState;

      if (row.Hazmat == true) {
        object.hazmat = "YES";
      } else {
        object.hazmat = "NO";
      }
      //object.hazmat = row.Hazmat;
      object.plateExp = row.PlateExpiration;
      object.options = (
        <OptionMenu
          reduxProps={this.props}
          isInactive={isInactive}
          idTrailer={row.Id}
        />
      );
      return object;
    });

    return data;
  }

  handleRowClicked = (row) => {
    window.location.replace("/#/Trailers/" + row.options.props.idTrailer);
  };

  render() {
      const trailersData = this.mapTrailersForDataTable(this.props.trailers,false);
      const inactiveTrailersData = this.mapTrailersForDataTable(this.props.inactiveTrailers,true);
      const columns = [
          { name: "", selector: "photo", grow: 0, width: "70px" },
          {
            name: "TRAILER NUMBER",
            selector: "trailerNumber",
            sortable: true,
            width: "100px",
          },
          { name: "VIN", selector: "vin", center: true },
          { name: "PLATE", selector: "plate", center: true },
          {
            name: "PLATE STATE",
            selector: "plateState",
            sortable: true,
            center: true,
          },
          {
            name: "HAZMAT",
            selector: "hazmat",
            sortable: true,
            center: true,
          },
          { 
            name: "PLATE EXP",
            selector: (row)=> row.plateExp !== null ? row.plateExp : '00-00-0000', 
            sortable: true, 
            center: true,
            format: (row)=> row.plateExp !== null ? moment(row.plateExp).format('MM-DD-YYYY') : null, 
          },
          { name: "OPTIONS", selector: "options", grow: 0 },
        ];
      const filteredTrailers = trailersData.filter((item) => {
          return (
            item.trailerNumber
              .toLowerCase()
              .includes(this.state.filterTextTrailers.toLowerCase()) ||
            item.vin
              .toLowerCase()
              .includes(this.state.filterTextTrailers.toLowerCase())
          );
        });
      const filteredInactiveTrailers = inactiveTrailersData.filter((item) => {
          return (
            item.trailerNumber
              .toLowerCase()
              .includes(this.state.filterTextInactiveTrailers.toLowerCase()) ||
            item.vin
              .toLowerCase()
              .includes(this.state.filterTextInactiveTrailers.toLowerCase())
          );
        });
      
      var modalTitle = "Are you sure you want to DEACTIVATE this trailer?";
    
        if (this.props.modalTypeTrailer === "restore") {
      modalTitle = "Are you sure you want to RESTORE this trailer?";
    }
    return (
      <>
        <div>
          <Row style={{ marginBottom: "10px", textAlign: "right" }}>
            <Col md={{ size: 2, offset: 10 }}>
              <Switch
                uncheckedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 12,
                      color: "#FFF",
                      paddingRight: 10,
                    }}
                  >
                    Inactive
                  </div>
                }
                checkedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 12,
                      color: "#FFF",
                      paddingLeft: 10,
                    }}
                  >
                    Active
                  </div>
                }
                onChange={this.handleChange}
                checked={this.state.checked}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={20}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                height={30}
                width={75}
                className="react-switch"
              />
            </Col>
          </Row>
          <div id='activeItemsContainer2'>
            <Filter
              state={this.state}
              reduxProps={this.props}
              data={trailersData}
              onFilter={(value) => {
                this.setState({ filterTextTrailers: value });
              }}
            />
            <DataTable
              responsive={true}
              onRowClicked={this.handleRowClicked}
              pagination
              columns={columns}
              data={filteredTrailers}
            />
          </div>
          <div id='inactiveItemsContainer2' style={{ display: "none" }}>
            <Filter
              state={this.state}
              reduxProps={this.props}
              data={inactiveTrailersData}
              onFilter={(value) => {
                this.setState({ filterTextInactiveTrailers: value });
              }}
            />
            <DataTable
              responsive={true}
              onRowClicked={this.handleRowClicked}
              pagination
              columns={columns}
              data={filteredInactiveTrailers}
            />
          </div>
          <AlertDelete
            modalType={this.props.modalTypeTrailer}
            message={modalTitle}
            modal={this.props.modalD2}
            toggle={() => {
              this.props.toggleD2(this.props.idDelete2);
            }}
            delete={() => {
              this.props.inactivateTrailer(this.props.idDelete2, id);
            }}
            restore={() => {
              this.props.activateTrailer(
                this.props.idDelete2, id
              );
            }}
          />
        </div>
      </>
    );
  }
}

export default connect(
  (state) => state.maintenance,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Trailers);