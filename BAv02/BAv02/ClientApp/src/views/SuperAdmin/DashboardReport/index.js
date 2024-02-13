import React from "react";
import { Link } from "react-router-dom";
import ComplianceReport from "../../../assets/img/brand/clipboard.png";
import DOT from "../../../assets/img/brand/black-test-logo.svg";
import GeneralReport from "../../../assets/img/brand/business-report.png";

const DashboardReport = () => {
  var isValid = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row text-center">
            {isValid.Role == "SUPERADMIN"? <div className="col-sm-4">
              <div className="Collector">
                <Link to="/reports/general-report">
                  <img
                    className="img-fluid"
                    src={GeneralReport}
                    alt="general report"
                  />
                </Link>
              </div>
              <p className="text-uppercase font-weight-bold">
                General Report
              </p>
            </div> : null}
            <div className={isValid.Role !== "ADMIN" ? "col-sm-4" : "col-sm-4"}>
              <div className="Collector">
                <Link to="/reports/compliance-report">
                  <img
                    className="img-fluid"
                    src={ComplianceReport}
                    alt="compliance report"
                  />
                </Link>
              </div>
              <p className="text-uppercase font-weight-bold">
                Compliance Report
              </p>
            </div>
            <div className="col-sm">
              <div className="Collector">
                <Link to="/reports/dot-report">
                  <img
                    className="img-fluid"
                    src={DOT}
                    alt="dot report"
                  />
                </Link>
              </div>
              <p className="text-uppercase font-weight-bold">
                DOT Report
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReport;
