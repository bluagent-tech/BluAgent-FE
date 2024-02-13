import React from "react";
const User = JSON.parse(localStorage['user']);

const CompanyComponent = (props) => {
  return (
    <div className="d-flex justify-content-between flex-wrap">
      {User.Role == 'SUPERADMIN' ?
        (<div className="col-sm-5">
          <div className="text-muted">Motor Carrier Report For</div>
          <div className="text-muted">
            <strong>PRIME INSURANCE COMPANY</strong>
          </div>
        </div>) : null
      }
      {props.data !== undefined ? (
        <div className="col-sm-5">
          <div className="text-muted">Company Name:</div>
          <div className="text-muted">
            <strong>{props.data.LEGAL_NAME}</strong>
          </div>
          <div className="text-muted">
            <strong>DOT:{props.data.DOT_NUMBER}</strong>
          </div>
        </div>
      ) : null}
      <div className="col-sm-2">
        <div className="text-muted">Status:</div>
        <button
          className={
            props.status >= 20
              ? "btn btn-danger"
              : props.status >= 10 && props.status < 20
              ? "btn btn-warning"
              : "btn btn-success"
          }
        >
          <strong>
            {props.status >= 20
              ? "Unsatisfactory"
              : props.status >= 10 && props.status < 20
              ? "Conditional"
              : "Satisfactory"}
          </strong>
        </button>
      </div>
    </div>
  );
};

export default CompanyComponent;
