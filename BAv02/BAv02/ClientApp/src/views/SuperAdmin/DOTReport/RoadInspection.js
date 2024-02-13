import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Collapse } from "react-collapse";
import moment from "moment";
import "../../../assets/css/SafetyComplianceReport.css";

const RoadInspection = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [inspections, setInspections] = useState();

  useEffect(() => {
    setInspections(
      props.inspection.map((ins) => {
        var object = {};
        object.ReportNumber = ins.ReportNumber;
        object.ReportState = ins.ReportState;
        object.InspDate = ins.InspDate;
        object.OosTotal = ins.OosTotal;
        object.InspLevelId = ins.InspLevelId;
        object.HazmatPlacardReq = ins.HazmatPlacardReq;
        object.numberViolations = props.violation.filter(
          (viol) => viol.UniqueId === ins.ReportNumber
        );

        return object;
      })
    );
  }, []);

  const levelText = (inspLevel) => {
    let level = "";

    switch (inspLevel) {
      case 1:
        level = "Standard Inspection";
        break;
      case 2:
        level = "Walk-Around Inspection";
        break;
      case 3:
        level = "Driver/Credential/Administrative Inspection";
        break;
      case 4:
        level = "Special Inspections";
        break;
      case 5:
        level = "Vehicle-Only Inspection";
        break;
      case 6:
        level = "Radioactive Material";
        break;
      case 7:
        level = "Jurisdictional Mandated";
        break;
      case 8:
        level = "Electronic Inspection";
        break;
    }

    return level;
  };

  const numberViolations = (row) => {
    return (
      <div>
        <i style={{ cursor: "pointer", width: "100%" }}>
          {row.length > 0 ? (
            <span
              className="badge badge-danger badge-pill"
              style={{ width: 20.59 }}
            >
              {row.length}
            </span>
          ) : (
            <span className="badge badge-success badge-pill">{"✔"}</span>
          )}
        </i>
      </div>
    );
  };

  const ViolationsTags = (violations, index) => {
    return <div className="row" key={index}>
      <div className="col-md-11 bg-custom p-1 mb-1 font-weight-bold">
        <div className="text-bold text-center">{violations.BasicDesc + " " + "Violation: " + " " + violations.ViolCode + " " + violations.SectionDesc}</div>
      </div>
    </div>;
  };

  const columns = [
    {
      name: "UNIQUE_ID",
      selector: "unique_id",
      omit: true,
    },
    {
      name: "REPORT NUMBER",
      //selector: "ReportNumber",
      selector: (row) => row.ReportState + row.ReportNumber,
      sortable: true,
    },
    {
      name: "DATE",
      // selector: "date",
      selector: (row) => (row.InspDate !== null ? row.InspDate : "00-00-0000"),
      center: true,
      sortable: true,
      format: (row) =>
        row.InspDate !== null
          ? moment(row.InspDate).format("MM-DD-YYYY")
          : null,
    },
    {
      name: "OOS TOTAL",
      selector: "OosTotal",
      center: true,
    },
    {
      name: "LEVEL",
      selector: (row) => levelText(row.InspLevelId),
      sortable: true,
      center: true,
    },
    {
      name: "HAZMAT",
      selector: (row) => (row.HazmatPlacardReq === "N" ? "NO" : "YES"),
      sortable: true,
      grow: 0,
    },
    {
      name: "NUMBER OF VIOLATIONS",
      selector: (row) => numberViolations(row.numberViolations),
      center: true,
    },
  ];

  const ViolationComponent = ({ data }) => {
    return data.numberViolations.length > 0 ? (
      <div>
        {data.numberViolations.map((violation, index) => {
          return ViolationsTags(violation, index);
        })}
      </div>
    ) : (
      <div style={{ textAlign: "center", fontSize: "small", fontWeight: "bold" }}>
        This Inspections Has No Violations
      </div>
    );
  };

  return (
    <div className="col pl-0">
      <div
        className="d-flex align-items-center cursor-menu"
        onClick={() => setCollapse(!collapse)}
      >
        <h4 className="text-muted mb-0 mr-1">Inspections</h4>
        <i
          className={
            collapse !== false
              ? "fas fa-angle-down cursor-pointer text-muted"
              : "fas fa-angle-right cursor-pointer"
          }
        ></i>
      </div>
      <Collapse isOpened={collapse}>
          <DataTable
            columns={columns}
            responsive={true}
            data={inspections}
            highlightOnHover
            pointerOnHover
            dense
            expandableRows
            expandableRowsComponent={<ViolationComponent />}
          />
      </Collapse>
    </div>
  );
};

export default RoadInspection;
