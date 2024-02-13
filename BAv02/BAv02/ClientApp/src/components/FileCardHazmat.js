import React from "react";
import DropdownMenu from "../components/DropdownMenu";
import { Row, Col } from "reactstrap";
import "./Styles/FilesCard.css";

const toSplit = "\\";

class FileCardHazmat extends React.Component {
  render() {
    return (
      <>
        <div className="col-sm-12 col-md-12 country-card">
          <div className="country-card-container border-gray rounded border mx-2 my-1 d-flex flex-row align-items-center p-0 bg-white col-lg-12">
            <div className="h-100 position-relative px-2 bg-white rounded-left col-2">
              {
                <img
                  style={{ width: "50px", padding: "5px" }}
                  src="/assets/icons/icons8-agreement.svg"
                  className="d-block h-100"
                  alt="pdf"
                />
              }
            </div>
            <div className="col-10">
              <Row>
                <Col md="10"></Col>
                <Col
                  md="2"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DropdownMenu
                    right
                    direction="left"
                    menuOptions={[
                      ["Delete", () => {}],
                      ["Download", () => {}],
                    ]}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default FileCardHazmat;
