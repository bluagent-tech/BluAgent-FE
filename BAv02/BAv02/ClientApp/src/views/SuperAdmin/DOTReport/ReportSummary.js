import React from "react";
import InspectionAverageTable from "./InspectionAverageTable";

const ReportSummary = (props) => {
  return (
    <div className="col pl-0">
      <h4 className="text-muted">Overall Report</h4>
      <hr></hr>
      <InspectionAverageTable data={props.data} />
      <div className="mb-4"></div>
      {props.violations.categories.map((list, index) => {
        return (
          <div key={index} className={"alert alert-" + list.color} role="alert">
            <div className="d-flex flex-wrap">
              <div className="col-sm-6">{list.tag}</div>
              <div className="col-sm-6 d-flex justify-content-end">
                <button
                  className={
                    list.status === "Satisfactory"
                      ? "btn btn-success customSizeButton"
                      : list.status === "Unsatisfactory"
                      ? "btn btn-danger customSizeButton"
                      : "btn btn-secondary customSizeButton"
                  }
                >
                  {list.status}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportSummary;
