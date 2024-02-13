import React, { useState } from "react";
import "../../../assets/css/SafetyComplianceReport.css";
import Gauge from "../../../components/GaugeChart";
import ReChart from "../../../components/ReChart";
import ComplianceAlert from "../../../components/ComplianceAlert";
import axios from "axios";

const isCompliance = "Company"
const ComplianceCompany = () => {
  const [company] = useState(JSON.parse(localStorage.getItem("companyReport")));
  //console.log("Company", company);

  return (
    <div className="card">
      <div className="">
        <div className="col-sm-12">
          <h4 className="text-muted mt-4">Company Fitness</h4>
          <div className="justify-content-start d-flex">
            <div className="margin-chart width-template-gauge">
              <Gauge data={company.CompliancePercentage} />
            </div>
            <div className="margin-chart width-template-chart">
              <ReChart data={company.ComplianceDate} type="company" />
            </div>
          </div>
          <div className="col">
            {company.CompanyReport.map((driverList, index) => {
              return (
                <ComplianceAlert
                  isCompliance={isCompliance}
                  tag={driverList.alertTag}
                  porcent={driverList.percentage}
                  alertType={driverList.severy}
                  type="company"
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCompany;
