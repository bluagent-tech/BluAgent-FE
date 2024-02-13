import React from "react";
import DropdownMenu from "../components/DropdownMenu";
import { Row, Col } from "reactstrap";
import "./Styles/FilesCard.css";
const toSplit = "\\";
class FilesCard extends React.Component {
  render() {
    const { DocName = "", DescriptionDoc = "", Id = 0 } = this.props.file || {};
    var descrip = DescriptionDoc.split(toSplit.substring(0, 1));
    var descriptionDoc = descrip[descrip.length - 1];
    return (
      <React.Fragment>
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
                <Col md="10">
                  <span
                    className="country-name text-dark d-block font-weight-bold"
                    style={{ wordBreak: "break-word" }}
                  >
                    {descriptionDoc}
                  </span>
                </Col>
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
                    class={
                      this.props.class === null
                        ? ""
                        : this.props.class + "fix-dropdowns"
                    }
                    direction="left"
                    toggleDeleteModal={() => {
                      this.props.idVehicle
                        ? this.props.download(
                            this.props.idVehicle,
                            JSON.parse(localStorage.user).Id,
                            this.props.docType,
                            DocName,
                            descriptionDoc
                          )
                        : this.props.download(
                            JSON.parse(localStorage.user).Id,
                            this.props.docType,
                            DocName,
                            descriptionDoc
                          );
                    }}
                    menuOptions={[
                      [
                        "Delete",
                        () => {
                          this.props.toggle(Id, this.props.docType, DocName);
                        },
                      ],
                      ["Download", "This is a function"],
                    ]}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default FilesCard;
