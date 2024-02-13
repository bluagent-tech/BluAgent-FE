import React from "react";
import DataTable from "react-data-table-component";
import { Col, Row } from "reactstrap";

const InspectionAverageTable = ({ data }) => {

      const filterByReportNumber = (inspections) => {
      let filterList = []
      inspections.map((list) => {
        if (!filterList.some((report) => report.Number === list.Number)) {
          filterList.push(list);
        }
      });
      return filterList
    }

  const buildDataTable = (data) => {
    let newData = [
      {
        fill: "Inspection",
        vehicle: "",
        driver: "",
        hazmat: "",
        sustance: "",
      },
      {
        fill: "Out of Service",
        vehicle: "",
        driver: "",
        hazmat: "",
        sustance: "",
      },
      {
        fill: "Out of Service %",
        vehicle: "",
        driver: "",
        hazmat: "",
        sustance: "",
      },
      {
        fill: "Nat'l Average %",
        vehicle: "",
        driver: "",
        hazmat: "",
        sustance: "",
      },
    ];

    Object.entries(data).map(([key, value], index) => {
      let OOS = value.filter(
        (inspection) => inspection["Out of Service"] === "Yes"
      );

      let totalOOS = filterByReportNumber(OOS);
      let totalInspection = filterByReportNumber(value).length;

      let oosPorcentage = totalInspection == 0 ? 0 : (totalOOS.length / totalInspection) * 100;

      newData[0][key] = key !== 'IEP' ? totalInspection : 0;
      newData[1][key] = key !== 'IEP' ? totalOOS.length : 0;
      newData[2][key] = key !== 'IEP' ? oosPorcentage.toFixed(1) + "%" : "0%";
      newData[3][key] = key !== 'IEP' ? key === 'vehicle' ? "20.72%" : key === 'driver' ? '5.51%' : '4.50%' : "N/A";
    });

    return newData;
  };
  const newData = buildDataTable(data);

  const columns = [
    {
      name: "INSPECTION TYPE",
      selector: "fill",
    },
    {
      name: "VEHICLE",
      selector: "vehicle",
    },
    {
      name: "DRIVER",
      selector: "driver",
    },
    {
      name: "HAZMAT",
      selector: "hazmat",
    },
    {
      name: "IEP",
      selector: "IEP",
    },
  ];

  return (
    <Row>
      <Col>
            <DataTable
              title=""
              columns={columns}
              data={newData}
              style={{ overflow: "auto" }}
              responsive={true}
            />
      </Col>
    </Row>
  );
};

export default InspectionAverageTable;
