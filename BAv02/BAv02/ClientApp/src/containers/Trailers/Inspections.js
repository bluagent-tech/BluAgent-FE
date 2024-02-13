import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Trailers";
import dateConvertTables from "./../../services/dateConvertTables";
import TableCom from "./../../components/Table";
import ViolationsModal from "../Maintenance/Modal/ViolationsModal";
import DataTable from "react-data-table-component";
import '../../components/Styles/DataTable.css';


class Inspections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      inspection: null,
    };
  }

  componentDidMount() {
    this.props.getTrailerInspections(
      this.props.id,
      1,
      10,
      this.props.fTr,
      this.props.tTr
    );
  }

  isHazmat = (HazmatPlacardReq) => {
    if (HazmatPlacardReq && HazmatPlacardReq !== null) {
      if (HazmatPlacardReq === "Y") {
        return "YES";
      } else {
        return "NO";
      }
    } else {
      return "NO";
    }
  };

  levelText = (inspLevel) => {
    let level = "";

    switch (inspLevel) {
      case "1":
        level = "Full";
        break;
      case "2":
        level = "Walk-Around";
        break;
      case "3":
        level = "Special Study";
        break;
      case "4":
        level = "Terminal";
        break;
      case "5":
        level = "Radioactive Materials";
        break;
    }

    return level;
  };

  onRowClicked = (row) => {
    const inspection = this.props.inspections.find(
      (i) => i.UniqueId === row.unique_id
    );
    this.setState({ openModal: true, inspection: inspection });
  };

  toggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  numberViolations = (row) => {
    if (!row || !row.VIOLATIONS || row.VIOLATIONS.length === 0) {
      return (
        <div>
          <i
            style={{ cursor: "pointer", width: "100%" }}
            onClick={() => {
              this.setState({ openModal: true, inspection: row });
            }}
          >
            <img
              alt="Check"
              width="15"
              src="../../../assets/icons/icons8-checkmark.svg"
            />
          </i>
        </div>
      );
    } else {
      return (
        <div>
          <i
            style={{ cursor: "pointer", width: "100%" }}
            onClick={() => {
              this.setState({ openModal: true, inspection: row });
            }}
          >
            <span className="badge badge-danger badge-pill">
              {row.hasOwnProperty("mensaje") ? 0 : row.VIOLATIONS.length}
            </span>
          </i>
        </div>
      );
    }
  };

  violationsModal = () => {
    const inspection = this.state.inspection;
    if (inspection) {
      return (
        <ViolationsModal
          id={inspection.UniqueId}
          idVehicle={this.props.id}
          typeId="TRAILER"
          nViolations={inspection.VHmaintViol + inspection.HmViol}
          report={inspection.ReportNumber}
          date={inspection.InspDate.replace("T00:00:00", "")}
          count={this.props.countV}
          page={this.props.pageV}
          list={inspection.VIOLATIONS}
          toggle={this.toggle}
          openModal={this.state.openModal}
          getAllDocuments={this.props.getAllDocuments}
          downloadDoc={this.props.downloadDoc}
          toggleDelete={this.props.toggleD}
          deleteDoc={this.props.deleteDoc}
          docs={this.props.docs}
          uploadFile={this.props.uploadFile}
        />
      );
    }
  };

  mapInspectionsForDataTable = (items) => {
    let data = items.map((row) => {
      var object = {};
      object.unique_id = row.UniqueId;
      object.reportNumber = row.ReportState + row.ReportNumber;
      object.date = dateConvertTables(row.InspDate);
      object.oosTotal = row.VehicleOosTotal;
      object.level = this.levelText(row.InspLevelId);
      object.hazmat = this.isHazmat(row.HazmatPlacardReq);
      object.numberViolations = this.numberViolations(row);
      return object;
    });
    return data;
  };

  render() {
    const columns = [
      {
        name: "UNIQUE_ID",
        selector: "unique_id",
        omit: true,
      },
      {
        name: "REPORT NUMBER",
        selector: "reportNumber",
        sortable: true,
      },
      {
        name: "DATE",
        selector: "date",
        center: true,
        sortable: true,
      },
      {
        name: "OOS TOTAL",
        selector: "oosTotal",
        center: true,
      },
      {
        name: "LEVEL",
        selector: "level",
        sortable: true,
        center: true,
      },
      {
        name: "HAZMAT",
        selector: "hazmat",
        sortable: true,
        grow: 0,
      },
      {
        name: "NUMBER OF VIOLATIONS",
        selector: "numberViolations",
        center: true,
      }
    ];

    const inspections = this.mapInspectionsForDataTable(this.props.inspections);

    return (
      <div className="text-center mx-auto">
        {inspections.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <img
              alt="Check"
              src="/assets/icons/icons8-checkmark.svg"
              style={{ width: "50px" }}
            />
            <h4>No Violations Found!</h4>
            <span style={{ fontSize: "15px", color: "#b2bec3" }}>
              This trailer doesn't have violations associated.
            </span>
          </div>
        ) : (
          <DataTable
            responsive={true}
            columns={columns}
            data={inspections}
            onRowClicked={this.onRowClicked} use
            pagination
            striped
          />
        )}
        {this.violationsModal()}
      </div>
    );
  }
}
export default connect(
  (state) => state.trailers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Inspections);
