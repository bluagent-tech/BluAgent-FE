import React, { Component } from "react";
import { Alert } from "reactstrap";
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";
import PDFmis from "../../../Drivers/Pdf/PDFmis";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { jsPDF } from "jspdf";

class MISTable extends Component {
  constructor(props) {
    super(props);
    this.onCleanF = this.onCleanF.bind(this);
  }

  onCleanF(e) {
    e.preventDefault();
    this.props.cleanF();
    this.dFromT.value = "";
    this.dToT.value = "";
    this.dToT.min = false;
  }

  render() {
    let header = this.props.header.map((h) => (
      <th scope="col" key={h} className="text-center">
        {h}
      </th>
    ));

    const actualYear = new Date().getFullYear() - 1;
    return (
      <div className="TablaResultados">
        <Table responsive>
          <thead>{header}</thead>
          <tbody>{this.props.rowItems}</tbody>
        </Table>
        {this.props.FirstTime ? (
          ""
        ) : (
          <Alert
            style={{
              backgroundColor: "#cef2e5",
              borderLeft: "4px solid #cef2e5",
              borderColor: "#cef2e5",
              color: "#076246",
              padding: "15px 20px",
            }}
          >
            The MIS Report for the year {actualYear}{" "}
            <strong>HAS ALREADY BEEN GENERATED.</strong>{" "}
          </Alert>
        )}
        <PDFmis
          uploadDoc={this.props.uploadDoc}
          props={this.props.props}
          firstTime={this.props.FirstTime}
          idUser={this.props.idUser}
          CloseMIS={this.props.CloseMIS}
        />
      </div>
    );
  }
}

MISTable.propTypes = {
  getItems: PropTypes.func,
};

export default MISTable;
