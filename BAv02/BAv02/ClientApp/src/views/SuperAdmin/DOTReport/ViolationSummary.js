import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Collapse } from "react-collapse";

const ViolationSummary = (props) => {
  const [collapse, setCollapse] = useState(false);

  const columns = [
    {
      name: "",
      selector: "type",
      sortable: true,
    },
    {
      name: <strong>Total</strong>,
      selector: "total",
      sortable: true,
    },
    {
      name: <strong>OOS</strong>,
      selector: "OSS",
      sortable: true,
      center: true,
    },
  ];

  return (
    <div className="col pl-0">
      <div className="d-flex align-items-center cursor-menu" onClick={() => setCollapse(!collapse)}>
        <h4 className="text-muted mb-0 mr-1">Violation Summary</h4>
        <i className={collapse !== false ? "fas fa-angle-down cursor-pointer text-muted" : "fas fa-angle-right cursor-pointer"}></i>
      </div>
      <Collapse isOpened={collapse}>
        
          <DataTable
            columns={columns}
            responsive={true}
            data={props.data}
            highlightOnHover
            pointerOnHover
            dense
          />
        
      </Collapse>
    </div>
  );
};

export default ViolationSummary;
