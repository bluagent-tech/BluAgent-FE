import React, { useState } from "react";
import USAMap from "react-usa-map";
import { Bar } from "react-chartjs-2";
import { Collapse } from "react-collapse";
import InspectionsTable from "./InspectionTable";

const InspectionMap = (props) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="col pl-0">
      <div className="d-flex align-items-center cursor-menu" onClick={() => setCollapse(!collapse)}>
        <h4 className="text-muted mb-0 mr-1">Radius of Operations</h4>
        <i
          className={
            collapse !== false ? "fas fa-angle-down" : "fas fa-angle-right"
          }
          
        ></i>
      </div>
      <Collapse isOpened={collapse}>
        <div className="d-flex justify-content-center">
          <USAMap title={"Inspection Map"} customize={props.states()} />
        </div>
        <div >
        <Bar options={props.options} data={props.verticalData} />
        </div>
        <InspectionsTable data={props.inspectionTable} total={props.totalInspections.length}/>
      </Collapse>
    </div>
  );
};

export default InspectionMap;
