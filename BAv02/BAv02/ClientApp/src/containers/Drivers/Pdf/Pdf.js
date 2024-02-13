import React from "react";
import ReactDOM from "react-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Button } from "reactstrap";
import convertDate from "./../../services/convertDate";
import { Form } from "reactstrap";

class Pdf extends React.Component {
  pdfExportComponent;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="example-config">
          {/*<button className="k-button" onClick={this.exportPDFWithComponent}>Export with component</button>     */}
          &nbsp;
          <Button outline color="success" onClick={this.exportPDFWitHmethod}>
            Download
          </Button>
        </div>

        <PDFExport
          ref={(component) => (this.pdfExportComponent = component)}
          paperSize="A4"
        >
          <div
            id="1"
            style={{ display: "none" }}
            className="container-contact100"
          >
            <div className="wrap-contact100">
              <Form className="contact100-form validate-form">
                <span className="contact100-form-title">
                  Employment Application
                </span>
                <div className="wrap-input100 validate-input bg1">
                  <span className="label-input100">Company Name :</span>
                  <label style={{ color: "blue" }}>
                    {this.props.company.LegalName}
                  </label>
                </div>
                <div
                  className="wrap-input100 validate-input bg1"
                  data-validate=""
                >
                  <span className="label-input100">Company Address :</span>
                  <label style={{ color: "blue" }}>
                    {this.props.company.PhysicalAddress}
                  </label>
                </div>
                <div
                  className="wrap-input100 validate-input bg1"
                  data-validate=""
                >
                  <span className="label-input100">
                    City, State, and Zip Code :{" "}
                  </span>
                  <label style={{ color: "blue" }}>
                    {" " +
                      this.props.company.PhysicaCity +
                      ", " +
                      this.props.company.PhysicalState +
                      ", " +
                      this.props.company.PhysicalZip}
                  </label>
                </div>
                <div>
                  <span className="label-input100">
                    <hr />
                  </span>
                </div>
                <div
                  className="wrap-input100 validate-input bg1 rs1-wrap-input100"
                  data-validate=""
                >
                  <span className="label-input100">Name :</span>
                  <label style={{ color: "blue" }}>
                    {this.props.driver.Name}
                  </label>
                </div>
                <div className="wrap-input100 bg1 rs1-wrap-input100">
                  <span className="label-input100">Last Name :</span>
                  <label style={{ color: "blue" }}>
                    {this.props.driver.LastName}
                  </label>
                </div>
                <div
                  className="wrap-input100 validate-input bg1"
                  data-validate=""
                >
                  <span className="label-input100"> Address :</span>
                  <label style={{ color: "blue" }}>
                    {this.props.driver.StreetAddress}
                  </label>
                </div>
                <div
                  className="wrap-input100 validate-input bg1 rs1-wrap-input100"
                  data-validate=""
                >
                  <span className="label-input100">Duration :</span>
                </div>{" "}
                <label style={{ color: "blue" }}></label>
                <div className="wrap-input100 bg1 rs1-wrap-input100">
                  <span className="label-input100">Date of Birth :</span>
                  <label style={{ color: "blue" }}>
                    {convertDate(this.props.driver.Birthdate)}
                  </label>
                </div>
                <div className="wrap-input100 bg1 rs1-wrap-input100">
                  <span className="label-input100">
                    Social Security Number (If Applicable) :
                  </span>
                  <label style={{ color: "blue" }}>
                    {this.props.driver.Ssn}
                  </label>
                </div>
                <span className="contact100-form-title">
                  Address for past three years
                </span>
                <span className="contact100-form-title">
                  Experience and qualifications
                </span>
                <span className="contact100-form-title">Driver experience</span>
                <span className="contact100-form-title">
                  Accident record for past 3 years or more
                </span>
                <span className="contact100-form-title">
                  Traffic Convictions and Forfeitures for the Past 3 Years
                </span>
                <div className="wrap-contact100-form-radio">
                  <span className="label-input200">
                    A. Have you ever been denied a license, permit, or privilige
                    to operate a motor vehicle?
                  </span>

                  <div className="contact100-form-radio m-t-15">
                    <input
                      className="input-radio100"
                      id="radio1"
                      type="radio"
                      name="type-product"
                      value="physical"
                      checked="checked"
                    />
                    <label className="label-radio100" htmlFor="radio1">
                      Yes
                    </label>
                  </div>

                  <div className="contact100-form-radio">
                    <input
                      className="input-radio100"
                      id="radio2"
                      type="radio"
                      name="type-product"
                      value="digital"
                    />
                    <label className="label-radio100" htmlFor="radio2">
                      No
                    </label>
                  </div>
                </div>
                <div className="wrap-contact100-form-radio">
                  <span className="label-input200">
                    B. Has any license, permit, or privilige ever been suspended
                    or revoked?
                  </span>

                  <div className="contact100-form-radio m-t-15">
                    <input
                      className="input-radio100"
                      id="radio3"
                      type="radio"
                      name="type-product2"
                      value="physical"
                      checked="checked"
                    />
                    <label className="label-radio100" htmlFor="radio3">
                      Yes
                    </label>
                  </div>

                  <div className="contact100-form-radio">
                    <input
                      className="input-radio100"
                      id="radio4"
                      type="radio"
                      name="type-product2"
                      value="digital"
                    />
                    <label className="label-radio100" htmlFor="radio4">
                      No
                    </label>
                  </div>
                  <div>
                    <span className="label-input200">
                      If the answer to either A or B is YES, please attach a
                      statement giving details.
                    </span>
                  </div>
                </div>
                <div className="wrap-contact100">
                  <span className="contact100-form-title">
                    Employment Records
                  </span>
                  <h4>
                    NOTE: DOT REQUIRES EMPLOYMENT FOR AT LEAST 3 YEARS AND/OR
                    COMMERCIAL DRIVING EXPERIENCE FOR THE LAST 10 YEARS BE
                    SHOWN.
                  </h4>
                  <hr />
                  <h4>
                    TO BE READ AND SIGNED BY APPLICANT <br />
                    THIS CERTIFIES THAT THIS APPLICATION WAS COMPLETED BY ME,
                    AND THAT ALL ENTRIES ON IT AND INFORMATION IN IT ARE TRUE
                    AND COMPLETE TO THE BEST OF MY KNOWLEDGE. APPLICANTS FOR
                    POSITIONS THAT REQUIRE DRIVING A COMMERCIAL MOTOR VEHICLE
                    (CMV) AT ANY TIME WILL BE REQUIRED TO UNDERGO CONTROLLED
                    SUBSTANCE AND, AT OUR DISCRETION, ALCOHOL TESTING PRIOR TO
                    EMPLOYMENT AND WILL BE SUBJECT TO FURTHER TESTING THROUGHOUT
                    THEIR PERIOD OF EMPLOYMENT. APPLICANTS WILL ALSO BE ASKED TO
                    SIGN FORMS FOR RELEASE OF INFORMATION FROM PREVIOUS
                    EMPLOYERS IN ALL CASES WHERE DRIVING A CMV WAS ONE OF YOUR
                    FUNCTIONS. FAILURE TO SIGN WILL PREVENT THIS EMPLOYER FROM
                    USING YOU AS A CMV DRIVER.
                  </h4>

                  <div className="wrap-contact100">
                    <div
                      className="wrap-input100 validate-input bg1 rs1-wrap-input100"
                      data-validate=""
                    >
                      <span className="label-input100">Name *</span>
                      <input
                        className="input100"
                        type="text"
                        name="email"
                        placeholder=""
                      />
                    </div>

                    <div
                      className=" label-input200 rs1-wrap-input100"
                      id="signature"
                      id="signaturename"
                    >
                      Signature:
                    </div>
                  </div>
                </div>
                <div className="w-full dis-none js-show-service">
                  <div className="wrap-contact100-form-radio">
                    <span className="label-input100">
                      What type of products do you sell?
                    </span>

                    <div className="contact100-form-radio m-t-15">
                      <input
                        className="input-radio100"
                        id="radio1"
                        type="radio"
                        name="type-product"
                        value="physical"
                        checked="checked"
                      />
                      <label className="label-radio100" htmlFor="radio1">
                        Phycical Products
                      </label>
                    </div>

                    <div className="contact100-form-radio">
                      <input
                        className="input-radio100"
                        id="radio2"
                        type="radio"
                        name="type-product"
                        value="digital"
                      />
                      <label className="label-radio100" htmlFor="radio2">
                        Digital Products
                      </label>
                    </div>

                    <div className="contact100-form-radio">
                      <input
                        className="input-radio100"
                        id="radio3"
                        type="radio"
                        name="type-product"
                        value="service"
                      />
                      <label className="label-radio100" htmlFor="radio3">
                        Services Consulting
                      </label>
                    </div>
                  </div>

                  <div className="wrap-contact100-form-range">
                    <span className="label-input100">Budget *</span>

                    <div className="contact100-form-range-value">
                      $<span id="value-lower">610</span> - $
                      <span id="value-upper">980</span>
                      <input type="text" name="from-value" />
                      <input type="text" name="to-value" />
                    </div>

                    <div className="contact100-form-range-bar">
                      <div id="filter-bar"></div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </PDFExport>
      </div>
    );
  }

  exportPDFWitHmethod = () => {
    var p = document.getElementById("1");
    p.style = "display:block";
    savePDF(ReactDOM.findDOMNode(this.pdfExportComponent), { paperSize: "A4" });
    p.style = "display:none";
  };
  exportPDFWithComponent = () => {
    var p = document.getElementById("1");
    p.style = "display:block";
    this.pdfExportComponent.save();
    p.style = "display:none";
  };
}

export default Pdf;
