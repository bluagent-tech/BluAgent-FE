import React, { useState } from "react";
import { Collapse } from "react-collapse";

const InspectionHistory = (props) => {
  const [collapse, setCollapse] = useState(false);

  var totalInspections = [];
  var totalViolations = [];
  var ossTotal = [];
  var ossHazmatTotal = [];
  var table = [];
  var powerUnit = [];
  let cleanTotalInspection = [];

  const TableHead = (inspection) => {
    inspection.map((list, index) => {
      if (list.length !== 0 && index !== 0) {
        list.map((inside, index) => {
          if (index === 0) {
            table.push(inside.InspDate.getFullYear());
          }
        });
      }
    });
  };

  const HistoryTotals = (totalInspections) => {
    var ossCounter = 0;
    var ossHazmat = 0;

    ossTotal.push("Total Vehicle OOS");
    ossHazmatTotal.push("Total Hazmat OOS");
    for (let index = 1; index < totalInspections.length; index++) {
      totalInspections[index].map((list) => {
        ossCounter = list.OosTotal + ossCounter;
        ossHazmat = list.TotalHazmatSent + ossHazmat;
      });
      ossTotal.push(ossCounter);
      ossHazmatTotal.push(ossHazmat);
      ossHazmat = 0;
      ossCounter = 0;
    }
  };

  const ViolationTotals = (violations) => {
    const today = new Date();
    let empyTotalViolations = [];

    empyTotalViolations.push(
      violations.filter((list) => {
        return list.InspDate.getFullYear() === today.getFullYear();
      })
    );
    empyTotalViolations.push(
      violations.filter((list) => {
        return list.InspDate.getFullYear() === today.getFullYear() - 1;
      })
    );
    empyTotalViolations.push(
      violations.filter((list) => {
        return list.InspDate.getFullYear() === today.getFullYear() - 2;
      })
    );

    totalViolations.push("Total Violations");
    for (let i = 0; i < empyTotalViolations.length; i++) {
      if (empyTotalViolations[i].length !== 0) {
        totalViolations.push(empyTotalViolations[i]);
      }
    }
  };

  const PowerUnit = (vehicles) => {
    const today = new Date();

    let totalVehicles = [];
    let empyPowerUnit = [];
    vehicles.listTrailers.map((list) => {
      totalVehicles.push(list);
    });

    vehicles.listVehicles.map((list) => {
      totalVehicles.push(list);
    });

    empyPowerUnit.push(
      totalVehicles.filter(
        (list) => list.Date.getFullYear() === today.getFullYear()
      )
    );
    empyPowerUnit.push(
      totalVehicles.filter(
        (list) => list.Date.getFullYear() === today.getFullYear() - 1
      )
    );
    empyPowerUnit.push(
      totalVehicles.filter(
        (list) => list.Date.getFullYear() === today.getFullYear() - 2
      )
    );

    powerUnit.push("Total Power Units");
    for (let i = 0; i < empyPowerUnit.length; i++) {
      if (empyPowerUnit[i].length !== 0) {
        powerUnit.push(empyPowerUnit[i]);
      }
    }
  };

  const TotalInspectionsForYear = (inspections, violations, vehicles) => {
    const today = new Date();

    totalInspections.push(
      inspections.filter((list) => {
        return list.InspDate.getFullYear() === today.getFullYear();
      })
    );
    totalInspections.push(
      inspections.filter((list) => {
        return list.InspDate.getFullYear() === today.getFullYear() - 1;
      })
    );
    totalInspections.push(
      inspections.filter((list) => {
        return list.InspDate.getFullYear() === today.getFullYear() - 2;
      })
    );

    cleanTotalInspection.push("Total Inspections");

    for (let i = 0; i < totalInspections.length; i++) {
      if (totalInspections[i].length !== 0) {
        cleanTotalInspection.push(totalInspections[i]);
      }
    }

    HistoryTotals(cleanTotalInspection);
    ViolationTotals(violations);
    PowerUnit(vehicles);
    TableHead(cleanTotalInspection);
  };

  TotalInspectionsForYear(props.inspection, props.violation, props.vehicles);

  return cleanTotalInspection !== 0 &&
    totalViolations !== 0 &&
    ossTotal !== 0 &&
    table !== 0 ? (
    <div className="col pl-0">
      <div className="d-flex align-items-center cursor-menu" onClick={() => setCollapse(!collapse)}>
        <h4 className="text-muted mb-0 mr-1">Inspection History</h4>
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
                <th scope="col"></th>
                {table.map((list, index) => {
                  return (
                    <th scope="col" key={index}>
                      {list}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {cleanTotalInspection.map((list, index) => {
                  if (index === 0) {
                    return (
                      <th scope="row" key={index}>
                        {list}
                      </th>
                    );
                  } else {
                    if (table.length === 1 && index <= 1) {
                      return <td key={index}>{list.length}</td>;
                    }
                    if (table.length === 2 && index <= 2) {
                      return <td key={index}>{list.length}</td>;
                    }
                    if (table.length === 3 && index <= 3) {
                      return <td key={index}>{list.length}</td>;
                    }
                  }
                })}
              </tr>
              <tr>
                {powerUnit.map((list, index) => {
                  if (index === 0) {
                    return (
                      <th scope="row" key={index}>
                        {list}
                      </th>
                    );
                  } else {
                    if (table.length === 1 && index <= 1) {
                      return <td key={index}>{list.length}</td>;
                    }
                    if (table.length === 2 && index <= 2) {
                      return <td key={index}>{list.length}</td>;
                    }
                    if (table.length === 3 && index <= 3) {
                      return <td key={index}>{list.length}</td>;
                    }
                  }
                })}
              </tr>
              <tr>
                {ossTotal.map((list, index) => {
                  if (index === 0) {
                    return (
                      <th scope="row" key={index}>
                        {list}
                      </th>
                    );
                  } else {
                    if (table.length === 1 && index <= 1) {
                      return <td key={index}>{list}</td>;
                    }
                    if (table.length === 2 && index <= 2) {
                      return <td key={index}>{list}</td>;
                    }
                    if (table.length === 3 && index <= 3) {
                      return <td key={index}>{list}</td>;
                    }
                  }
                })}
              </tr>
              <tr>
                {ossHazmatTotal.map((list, index) => {
                  if (index === 0) {
                    return (
                      <th scope="row" key={index}>
                        {list}
                      </th>
                    );
                  } else {
                    if (table.length === 1 && index <= 1) {
                      return <td key={index}>{list}</td>;
                    }
                    if (table.length === 2 && index <= 2) {
                      return <td key={index}>{list}</td>;
                    }
                    if (table.length === 3 && index <= 3) {
                      return <td key={index}>{list}</td>;
                    }
                  }
                })}
              </tr>
              <tr>
                {totalViolations.map((list, index) => {
                  if (index === 0) {
                    return (
                      <th scope="row" key={index}>
                        {list}
                      </th>
                    );
                  } else {
                    if (table.length === 1 && index <= 1) {
                      return <td key={index}>{list.length}</td>;
                    }
                    if (table.length === 2 && index <= 2) {
                      return <td key={index}>{list.length}</td>;
                    }
                    if (table.length === 3 && index <= 3) {
                      return <td key={index}>{list.length}</td>;
                    }
                  }
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </Collapse>
    </div>
  ) : null;
};

export default InspectionHistory;
