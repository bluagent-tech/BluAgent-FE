import React, { Component } from "react";
import {
  CardBody,
  FormGroup,
  Col,
  UncontrolledTooltip,
  Button,
  Input,
} from "reactstrap";
import AlertDelete from "../../components/AlertDelete";
import ExportInspections from "./Modal/ExportInspections";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Maintenance";
import ToastAlert from "../../components/ToastAlert";
import ReactExport from "react-data-export";
import DataTable from "react-data-table-component";
import "../../components/Styles/DataTable.css";
import AddVehicleInspection from "../../containers/Maintenance/Modal/AddVehicleInspection";
import DropdownMenu from "./../../components/DropdownMenu";
import dateConvertTables from "./../../services/dateConvertTables";
import moment from "moment";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const id = localStorage["idCompany"];

const Filter = ({ onFilter, reduxProps }) => {
  // console.log("data del inspection: ", {
  //   cargo: reduxProps.cargoC,
  //   operation: reduxProps.OperationC,
  // });
  return (
    <React.Fragment>
      <FormGroup style={{ marginBottom: "0px" }} row>
        <Col md="10">
          <Input
            className="mb-2"
            id="search"
            type="search"
            role="search"
            placeholder="Search Inspections"
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
        {/* //Col cambiado a md ="0" */}
        <Col md="0">
          <AddVehicleInspection
            operation={reduxProps.OperationC}
            cargo={reduxProps.cargoC}
            operationClass={reduxProps.getOperationClassification}
            cargoClass={reduxProps.getCargoClassification}
            modal={reduxProps.vehicleInspectionModal}
            toggle={reduxProps.toggleVehicleInspectionModal}
            onSubmit={reduxProps.createInspection}
            trucks={reduxProps.trucks}
            trailers={reduxProps.trailers}
            idVehicle={reduxProps.idVehicle}
            vehicleType={reduxProps.vehicleType}
          ></AddVehicleInspection>
          <ExcelFile
            element={
              <Button
                id="btnExportVehicleInspections"
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
            }
          >
            <ExcelSheet
              data={reduxProps.dataExportVehicleInspections.Items}
              name="Vehicle Inspections"
            >
              <ExcelColumn label="Vehicle Number" value="VehicleNumber" />
              <ExcelColumn label="Vehicle Type" value="VehicleType" />
              <ExcelColumn label="Vin" value="Vin" />
              <ExcelColumn label="Plate #" value="Plate" />
              <ExcelColumn label="Inspector Name" value="InspectionName" />
              <ExcelColumn label="Inspection Type" value="InspectionType" />
              <ExcelColumn label="Date" value="InspectionDate" />
              <ExcelColumn label="Odometer" value="Odometer" />
            </ExcelSheet>
          </ExcelFile>
          <UncontrolledTooltip
            placement="bottom"
            target="btnExportVehicleInspections"
          >
            Export Inspections
          </UncontrolledTooltip>
        </Col>
      </FormGroup>
    </React.Fragment>
  );
};

const VehicleImg = (vehicleType, img, idvehicle) => {
  return (
    <div className="align-right">
      <div className="avatar">
        {vehicleType === "TRAILER" ? (
          <img
            src={
              img === null
                ? "assets/maintenancePdf/Images/defaultTrailer.png"
                : `https://bluagent-files.s3-us-west-2.amazonaws.com/${localStorage["idCompany"]}/TrailersFile/${idvehicle}/trailerAvatar.png`
            }
            alt="avatar"
            className="img-avatar"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <img
            src={
              img === null
                ? imgVehicleType(vehicleType)
                : `https://bluagent-files.s3-us-west-2.amazonaws.com/${localStorage["idCompany"]}/TrucksFile/${idvehicle}/truckAvatar.png`
            }
            className="img-avatar"
            alt="avatar"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
    </div>
  );
};

const imgVehicleType = (VehicleType) => {
  let img = "";

  if (VehicleType) {
    switch (VehicleType.trim().toLowerCase()) {
      case "truck":
        img = "assets/icons/icons8-truck.svg";
        break;
      case "car":
        img = "assets/icons/icons8-car.svg";
        break;
      case "tow truck":
        img = "assets/icons/icons8-tow-truck.svg";
        break;
      case "bus":
        img = "assets/icons/icons8-bus.svg";
        break;
      case "flatbed truck":
        img = "assets/icons/icons8-in-flat-bed.svg";
        break;
      case "pick-up":
        img = "assets/icons/icons8-pickup.svg";
        break;
      case "semi-trailer truck":
        img = "assets/icons/icons8-semi-truck.svg";
        break;
      case "van":
        img = "assets/icons/icons8-vanpool.svg";
        break;
      default:
        img = "assets/icons/icons8-truck.svg";
        break;
    }
  }

  return img;
};

const OptionMenu = ({
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
        menuOptions={[
          ["Download", "Download"],
          ["Delete", "Delete"],
        ]}
      />
    </div>
  );
};

class Inspections extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
      filteredTextInspections: "",
      dropdownOpen: false,
    };
  }

  componentDidMount() {
    this.props.getInspections(id);
    this.props.exportVehicleInspections(id);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  mapInspectionsForDataTable(items) {
    let data = items.map((row) => {
      let inspection = {};
      inspection.photo = VehicleImg(
        row.VehicleType,
        row.FileImage,
        row.IdVehicle
      );
      inspection.vehicleNumber = row.VehicleNumber;
      inspection.vin = row.Vin;
      inspection.plate = row.Plate;
      inspection.inspectionType = row.InspectionType;
      inspection.date = row.InspectionDate;
      inspection.odometer = row.Odometer;
      inspection.inspectorName = row.InspectionName;
      inspection.vehicleType = row.VehicleType;

      inspection.options = (
        <OptionMenu
          reduxProps={this.props}
          isInactive={false}
          idInspection={row.Id}
          idCompany={id}
          idVehicle={row.IdVehicle}
          inspectionType={row.InspectionType}
          fileName={row.FileName}
        />
      );

      return inspection;
    });

    return data;
  }

  render() {
    const columns = [
      { name: "", selector: "photo", grow: 0 },
      {
        name: "VEHICLE NUMBER",
        selector: "vehicleNumber",
        center: true,
        sortable: true,
        width: "70px",
      },
      {
        name: "VEHICLE TYPE",
        selector: "vehicleType",
        center: true,
        width: "100px",
      },
      {
        name: "VIN",
        selector: "vin",
        center: true,
      },
      {
        name: "PLATE #",
        selector: "plate",
        center: true,
      },
      {
        name: "INSPECTOR NAME",
        selector: "inspectorName",
        center: true,
      },
      {
        name: "TYPE OF INSPECTION",
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
      },
      { name: "OPTIONS", selector: "options", grow: 0 },
    ];

    const inspectionData = this.mapInspectionsForDataTable(
      this.props.inspections
    );

    const filteredInspections = inspectionData.filter((item) => {
      return (
        item.vehicleNumber
          .toLowerCase()
          .includes(this.state.filteredTextInspections.toLowerCase()) ||
        item.vin
          .toLowerCase()
          .includes(this.state.filteredTextInspections.toLowerCase())
      );
    });

    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <CardBody>
          <Filter
            state={this.state}
            reduxProps={this.props}
            data={inspectionData}
            onFilter={(value) => {
              this.setState({ filteredTextInspections: value });
            }}
          />
          <DataTable
            responsive={true}
            pagination
            columns={columns}
            data={filteredInspections}
          />

          <AlertDelete
            modalType={"Delete"}
            message={"Are you sure you want to delete this Inspection?"}
            modal={this.props.modalDeleteInspection}
            toggle={() => {
              this.props.toggleDeleteInspection(this.props.idInspection);
            }}
            delete={() => {
              this.props.deleteInspection(this.props.idInspectionToggle, id);
            }}
          />
        </CardBody>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.maintenance,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Inspections);
