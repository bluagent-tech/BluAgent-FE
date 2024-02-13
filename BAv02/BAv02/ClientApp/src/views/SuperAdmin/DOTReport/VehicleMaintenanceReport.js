import React, { useState } from "react";
import { Collapse } from "react-collapse";

const VehicleMaintenanceReport = (props) => {
  const [collapse, setCollapse] = useState(false);

  const StringOfStates = (arrayStates) => {
    let states = "";
    let endOfIndex = arrayStates.length - 1;
    arrayStates.map((array, index) => {
      if (index !== endOfIndex) {
        states = states + (array + ",");
      } else {
        states = states + array;
      }
    });

    return states;
  };
  return (
    <div className="col pl-0">
      <div
        className="d-flex align-items-center cursor-menu"
        onClick={() => setCollapse(!collapse)}
      >
          <h4 className="text-muted mb-0 mr-1">Vehicle Maintenance Report</h4>
          <i
            className={
              collapse !== false ? "fas fa-angle-down" : "fas fa-angle-right"
            }
          ></i>
      </div>

      <Collapse isOpened={collapse}>
        <div className="d-flex justify-content-between">
          <table id="tables-vehicle-report" className="table">
            <thead>
              <tr>
                <th scope="col-sm-0"></th>
                <th scope="col-sm-6">Unique VINs</th>
                <th scope="col-sm-4">Unique License Plate</th>
                <th scope="col-sm-4">Licensing States</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{"Power Units(past 12 months)"}</th>
                <td>{props.report.vehicleDate.vehiclesLast12Month.length}</td>
                <td>{props.report.vehicleDate.vehiclesLast12Month.length}</td>
                <td>
                  {StringOfStates(
                    props.report.vehicleDate.head12Month.listVehicleStates
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">{"Power Units(past 24 months)"}</th>
                <td>{props.report.vehicleDate.vehiclesLast24Month.length}</td>
                <td>{props.report.vehicleDate.vehiclesLast24Month.length}</td>
                <td>
                  {StringOfStates(
                    props.report.vehicleDate.last24Month.listVehicleStates
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">{"Trailers"}</th>
                <td>{props.report.trailer.length}</td>
                <td>{props.report.trailer.length}</td>
                <td>
                  {StringOfStates(
                    props.report.vehicleDate.last24Month.listTrailerLicenState
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Collapse>
    </div>
  );
};

export default VehicleMaintenanceReport;
