import React from "react";
import ReactDOM from "react-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Button, Form, Col, Row } from "reactstrap";
import convertDate from "./../../../services/dateConvertTables";

class AccidentsRegistry extends React.Component {
  pdfExportComponent;

  render() {
    return (
      <div style={{ zIndex: "1" }}>
        <div className="example-config">
          <Button outline color="success" onClick={this.exportPDFWithMethod}>
            Download Report
          </Button>
        </div>

        <PDFExport
          ref={(component) => (this.pdfExportComponent = component)}
          paperSize="A4"
          fileName={"Accidents " + this.props.from + " - " + this.props.to}
        >
          <div
            id="x1"
            style={{ display: "none" }}
            className="container-contact100"
          >
            <div className="wrap-contact100">
              <Form className="contact100-form validate-form">
                <Row>
                  <Col md={4} className="mx-auto">
                    <img
                      alt="logo"
                      className="imgHeader"
                      src={"/assets/img/Images/BluAgent-Logo.png"}
                      ref={(img) => (this.img = img)}
                      crossOrigin="anonymous"
                      style={{ width: "200px", marginTop: "20px" }}
                    />
                  </Col>
                </Row>
                <center>
                  <h5 style={{ marginTop: "20px" }}>
                    MOTOR VEHICLE ACCIDENT REGISTER
                  </h5>
                </center>

                <div style={{ padding: "30px" }}>
                  <table style={{ width: "100%", fontSize: "6pt" }}>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <th style={{ width: "7%" }}>Motor Carrier Name:</th>
                        <td
                          style={{
                            width: "18%",
                            borderBottom: ".5px solid black",
                          }}
                        >
                          {this.props.companyName}
                        </td>
                        <th style={{ width: "3%" }}></th>
                        <th style={{ width: "2%" }}>From</th>
                        <td
                          style={{
                            width: "5%",
                            borderBottom: ".5px solid black",
                          }}
                        >
                          {this.props.from}
                        </td>
                        <th style={{ width: "1%" }}>To</th>
                        <td
                          style={{
                            width: "5%",
                            borderBottom: ".5px solid black",
                          }}
                        >
                          {this.props.to}
                        </td>
                      </tr>
                      <tr>
                        <th></th>
                        <th style={{ textAlign: "center" }}> Name </th>
                        <th colSpan="2"></th>
                        <th style={{ textAlign: "center" }}> (Date) </th>
                        <th></th>
                        <th style={{ textAlign: "center" }}> (Date) </th>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <table style={{ fontSize: "5pt" }}>
                    <thead>
                      <tr
                        style={{
                          border: ".5px solid black",
                          textAlign: "center",
                        }}
                      >
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Accident File Number
                        </th>
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Date & Time of Accident
                        </th>
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Location of Accident
                        </th>
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Company Equipment Numbers
                        </th>
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Driver's Name and Terminal
                        </th>
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Number of Injuries
                        </th>
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Number of Fatalities
                        </th>
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Property Damage
                        </th>
                        <th
                          style={{
                            border: ".5px solid black",
                            textAlign: "center",
                          }}
                        >
                          Hazardous Materials
                        </th>
                      </tr>
                    </thead>
                    {this.props.accidents.length !== 0 ? (
                      <tbody>
                        {this.props.accidents.map((row, index) => (
                          <tr
                            key={index}
                            style={{
                              fontSize: "6pt",
                              borderBottom: ".5px solid black",
                              textAlign: "center",
                            }}
                          >
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.ReportNumber}
                            </td>
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.AccidentHour !== null
                                ? convertDate(row.AccidentDate) +
                                  " " +
                                  row.AccidentHour
                                : convertDate(row.AccidentDate)}
                            </td>
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.Street !== null && row.City !== null
                                ? row.Street + row.City + row.State1
                                : row.City !== null
                                ? row.City + row.State1
                                : row.State1}
                            </td>
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            ></td>
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.DriverName !== null &&
                              row.DriverLastN !== null
                                ? row.DriverName + " " + row.DriverLastN
                                : ""}
                            </td>
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.Injuries}
                            </td>
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.Fatalities}
                            </td>
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            ></td>
                            <td
                              style={{
                                border: ".5px solid black",
                                textAlign: "center",
                              }}
                            >
                              {row.Hm === false ? "No" : "Yes"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody></tbody>
                    )}
                  </table>
                </div>
              </Form>
            </div>
          </div>
        </PDFExport>
      </div>
    );
  }

  exportPDFWithMethod = () => {
    var p = document.getElementById("x1");
    p.style = "display:block";
    savePDF(ReactDOM.findDOMNode(this.pdfExportComponent), { paperSize: "A4" });
    p.style = "display:none";

    setTimeout(this.props.hide, 1000);
  };
}

export default AccidentsRegistry;
