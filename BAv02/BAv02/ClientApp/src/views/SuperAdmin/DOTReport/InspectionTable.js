import React from "react";
import DataTable from "react-data-table-component";
import { Col, Row } from "reactstrap";
const InspectionsTable = ({ data, total }) => {
  const buildTableData = (data, inspectionTotal) => {
    const years = Object.keys(data);
    const states = Object.keys(data[years[0]]);

    let rows = years.map((year) => {
      const row = { year: year };
      let total = 0;

      states.forEach((state) => {
        row[state] = data[year][state];
        total += data[year][state];
      });

      row.year = row.year + " (" + total + ")";

      return row;
    });

    let totalsRow = { year: "Total" };
    let percentagesRow = { year: "Porcentage" };

    states.forEach((state) => {
      let total = 0;
      rows.forEach((row) => {
        total += row[state];
      });
      totalsRow[state] = total;
      percentagesRow[state] =
        ((total / inspectionTotal) * 100).toFixed(2) + "%";
    });

    rows.push(totalsRow);
    rows.push(percentagesRow);

    return rows;
  };

  const tableData = buildTableData(data, total);

  const columns = [
    { name: "", selector: "year", sortable: true },
    ...Object.keys(data[Object.keys(data)[0]]).map((state) => {
      return { name: state, selector: state };
    }),
  ];

  return (
    <Row>
      <Col>
        <DataTable
          title="Inspection State"
          columns={columns}
          data={tableData}
          style={{ overflow: "auto" }}
          responsive={true}
        />
      </Col>
    </Row>
  );
};

export default InspectionsTable;
