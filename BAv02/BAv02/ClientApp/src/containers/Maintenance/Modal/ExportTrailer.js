import React from "react";
import { Modal, ModalHeader, ModalBody, FormGroup, Col } from "reactstrap";
import PropTypes from "prop-types";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

/*ADD NEW TRAILER*/

class ExportTrailers extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.toggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} className={"modal-md"}>
        <ModalHeader name="modal2" toggle={this.onClose}>
          EXPORT TRAILERS
        </ModalHeader>

        <ModalBody>
          <FormGroup row>
            <Col md="6">
              <ExcelFile
                element={
                  <img
                    onClick={this.onClose}
                    style={{ marginLeft: "35px" }}
                    className="img-responsive"
                    src="/assets/img/dashboard/back/home/man1.png"
                    onMouseOver={(e) =>
                      (e.currentTarget.src =
                        "/assets/img/dashboard/front/home/man.png")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src =
                        "/assets/img/dashboard/back/home/man1.png")
                    }
                    height="100"
                    width="100"
                    alt="man"
                  />
                }
              >
                <ExcelSheet data={this.props.dataExportTrailers} name="Trialer">
                  <ExcelColumn label="VEHICLE" value="TrailerNumber" />
                  <ExcelColumn label="VIN" value="Vin" />
                  <ExcelColumn label="LICENSE PLATE #" value="Plate" />
                  <ExcelColumn label="STATE" value="PlateState" />
                  <ExcelColumn
                    label="REGISTRATION EXPIRATION DATE"
                    value="PlateExp"
                  />
                </ExcelSheet>
              </ExcelFile>
            </Col>
            <Col md="6">
              <ExcelFile
                element={
                  <img
                    onClick={this.onClose}
                    style={{ marginLeft: "35px" }}
                    className="img-responsive"
                    src="/assets/img/dashboard/back/home/report1.png"
                    onMouseOver={(e) =>
                      (e.currentTarget.src =
                        "/assets/img/dashboard/front/home/report.png")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src =
                        "/assets/img/dashboard/back/home/report1.png")
                    }
                    height="100"
                    width="100"
                    alt="report"
                  />
                }
              >
                <ExcelSheet
                  data={this.props.dataExportTrailersWithInspections}
                  name="Trailer with violations"
                >
                  <ExcelColumn label="VEHICLE #" value="TrailerNumber" />
                  <ExcelColumn label="VIN" value="Vin" />
                  <ExcelColumn label="LICENSE PLATE #" value="Plate" />
                  <ExcelColumn label="STATE" value="PlateState" />
                  <ExcelColumn label="INSPECTIONS DATE" value="InspDate" />
                  <ExcelColumn label="REPORT NUMBER" value="ReportNumber" />
                  <ExcelColumn label="REPORT STATE" value="ReportState" />
                  <ExcelColumn
                    label="INSPECTION LEVED ID"
                    value="InspLevelId"
                  />
                  <ExcelColumn
                    label="COUNTRY CODE STATE"
                    value="CountryCodeState"
                  />
                  <ExcelColumn
                    label="VEHICLE OOS TOTAL"
                    value="VehicleOosTotal"
                  />
                  <ExcelColumn
                    label="TOTAL HAZMAT SENT"
                    value="TotalHazmatSent"
                  />
                  <ExcelColumn label="OOS TOTAL" value="OosTotal" />
                  <ExcelColumn
                    label="HAZMAT OOS TOTAL"
                    value="HazmatOosTotal"
                  />
                  <ExcelColumn label="UNSAFE INSPECTION" value="UnsafeInsp" />
                  <ExcelColumn label="Hm VIOLATION" value="HmViol" />
                </ExcelSheet>
              </ExcelFile>
            </Col>
          </FormGroup>
          <FormGroup row style={{ textAlign: "center" }}>
            <Col md="5">
              <h7>EXPORT ALL TRAILERS</h7>
            </Col>
            <Col md="7">
              <h7>EXPORT TRAILERS WITH ALL YOUR INSPECTIONS</h7>
            </Col>
          </FormGroup>
        </ModalBody>
      </Modal>
    );
  }
}

ExportTrailers.propTypes = {
  OnSubmit: PropTypes.func,
  toggle: PropTypes.func,
};

export default ExportTrailers;
