import React, { useState } from "react";
import "../../../assets/css/SafetyComplianceReport.css";
import Gauge from "../../../components/GaugeChart";
import ReChart from "../../../components/ReChart";
import ComplianceAlert from "../../../components/ComplianceAlert";
import moment from 'moment';
import axios from "axios";
//Se importara collapse para poder mostrar a los drivers faltantes

const ComplianceDriver = (props) => {
  const [driver] = useState(JSON.parse(localStorage.getItem("driverReport")));
  const stateNumber = useState(
    JSON.parse(localStorage.getItem("StateCompanyN"))
  );
  // var filter;
  // var filterDrivers
  // //console.log(driver);
  // filterDrivers = driver.DriverReport.map((item) => {
  //   //console.log("filter 1", item);
  //   filter = item.alldrivers.map((item2) => {
  //     //console.log(item2);
  //   })
  // })

  // console.log("Datos de los maps", driver.DriverReport);
  //console.log("datos del local en driver report: ", driver, filterDrivers);


  // function getDrivers(driver.DriverReport.alldrivers.map((item) => {
  //   return (
  //     console.log("mapeado", item)
  //     // item.trailerNumber
  //     //   .toLowerCase()
  //     //   .includes(this.state.filterTextTrailers.toLowerCase()) ||
  //     // item.vin
  //     //   .toLowerCase()
  //     //   .includes(this.state.filterTextTrailers.toLowerCase())
  //   );
  // }))

  const columnsDrivers = [
    {
      name: "Name",
      selector: (row) => row.Name,
      center: false,
      compact: true,
      sortable: true
    },
    {
      name: "Last Name",
      selector: (row) => row.lastname,
      center: false,
      compact: true,
      sortable: true
    },
    {
      name: "License",
      selector: (row) => row.license,
      center: false,
      compact: true,
      sortable: true
    },
    {
      name: "Date of Birthday",
      selector: (row) => moment(row.birthdate).format('MM-DD-YYYY'),
      center: false,
      compact: true,
      sortable: true
    },
  ];

  return (
    <div className="card">
      <div className="">
        <div className="col-sm-12">
          <h4 className="text-muted mt-4">Driver Fitness</h4>
          <div className="justify-content-start d-flex">
            <div className="margin-chart width-template-gauge">
              <Gauge data={driver.CompliancePercentage} />
            </div>
            <div className="margin-chart width-template-chart">
              <ReChart data={driver.DriversByQuarters} type="driver" />
            </div>
          </div>
          <div className="col mt-4">
            <p className="text-muted">
              <strong>{driver.ActiveDrivers} Active Drivers</strong>
            </p>
            <p className="text-muted">
              <strong>
                {driver.DriversInFullCompliance} Driver in Compliance
              </strong>
            </p>
          </div>
          <div className="col">
            {driver.DriverReport.map((driverList, index) => {
              // console.log("Driver list del map", driverList.alldrivers);
              let rows = driverList.alldrivers.map((row, index2) => ({
                id: index2,
                Name: row.Name,
                lastname: row.lastName,
                birthdate: row.BirthDate,
                license: row.License
              }))
              if (driverList.alertTag !== "Processed alerts") {
                return (
                  <div>
                    <ComplianceAlert
                      columns={columnsDrivers}
                      stateNumber={stateNumber[0]}
                      tag={driverList.alertTag}
                      driverCount={driverList.driverCount}
                      driverOutCount={driver.ActiveDrivers}
                      porcent={driverList.percentage}
                      alertType={driverList.severy}
                      id={index}
                      rows={rows}
                      type="driver"
                    />
                    {/* <Collapse in={settings.find(item => item.id === index).open}
                      timeout="auto"
                      unmountOnExit> */}
                    {/* <div>
                      {
                        driverList.alertTag === "Employer Pull Notice" && stateNumber[0] === 2 ? (<DataTable
                          pagination
                          columns={columns}
                        //data={rows}
                        />) : (<DataTable
                          pagination
                          columns={columns}
                          data={rows}
                        />)
                      }
                    </div> */}
                    {/* </Collapse> */}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDriver;
