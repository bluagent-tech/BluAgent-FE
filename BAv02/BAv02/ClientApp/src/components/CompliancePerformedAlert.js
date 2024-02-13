import React from "react";

const CompliancePerformedAlert = (props) => {
  return (
    <div>
      <div className="col-sm-1 position-quarter">
        <strong className="text-muted performed-init-year">
          {props.annual[0].Date.slice(0, 4)}
        </strong>
        <strong className="text-muted performed-end-year">
          {props.annual[1].Date.slice(0, 4)}
        </strong>
      </div>
      <div
        className={
          (props.annual[1].severy) + "-alert custom-alert d-flex "
        }
      >
        <div className="col-sm-11">
          <div className="row alert-center">
            <div className="col-sm-4">
              <strong>{props.type}</strong>
            </div>
            <div className="col-sm-4">
              <strong>
                {props.type === "Missing"
                  ? props.actives - props.annual[0].TrucksCount
                  : props.annual[0].TrucksCount}
              </strong>
            </div>
            <div className="col-sm-4">
              <strong>
                {props.type === "Missing"
                  ? props.actives - props.annual[1].TrucksCount
                  : props.annual[1].TrucksCount}
              </strong>
            </div>
          </div>
        </div>
        <div className="icon-alert col-sm-1 d-none-auto">
          <i
            className={
              props.annual[1].severy == "green"
                ? "fas fa-check-circle"
                : "fas fa-exclamation-circle"
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

export default CompliancePerformedAlert;
