import React from "react";

const ComplianceTrailersAlert = (props) => {
  return (
    <div>
      <div className="col-sm-11 d-flex">
        <div className="col-sm-4">
          <strong className="text-muted">{props.type}</strong>
        </div>
        <div className="col-sm-4">
          <strong className="text-muted d-none-auto">
            {props.data[0].Date.slice(0, 4)}
          </strong>
        </div>
        <div className="col-sm-4">
          <strong className="text-muted d-none-auto">
            {props.data[4].Date.slice(0, 4)}
          </strong>
        </div>
      </div>
      {props.quarter.map((listQuarters, index) => {
        return (
          <div key={index}>
            <div className="col-sm-1 position-quarter">
              <strong className="text-muted">Q{index + 1}</strong>
              <strong className="text-muted quearter-init-year">
                {listQuarters.DatePast.slice(0, 4)}
              </strong>
              <strong className="text-muted quearter-end-year">
                {listQuarters.DatePresent.slice(0, 4)}
              </strong>
            </div>
            <div className={"custom-alert d-flex "+ listQuarters.Severy +"-alert"}>
              <div className="col-sm-11">
                <div className="row alert-center">
                  <div className="col-sm-4">
                    <strong></strong>
                  </div>
                  <div className="col-sm-4">
                    <strong>
                      {props.type === "Missing"
                        ? Math.abs(listQuarters.TrucksCountPast - props.actives)
                        : listQuarters.TrucksCountPast}
                    </strong>
                  </div>
                  <div className="col-sm-4">
                    <strong>
                      {props.type === "Missing"
                        ? Math.abs(
                            listQuarters.TrucksCountPresent - props.actives
                          )
                        : listQuarters.TrucksCountPresent}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="icon-alert col-sm-1 d-none-auto">
                <i
                  className={
                    listQuarters.Severy !== "green"
                      ? "fas fa-exclamation-circle"
                      : "fas fa-check-circle"
                  }
                ></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComplianceTrailersAlert;
