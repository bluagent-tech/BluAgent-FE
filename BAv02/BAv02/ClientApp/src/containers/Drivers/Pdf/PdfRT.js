import React from "react";
import ReactDOM from "react-dom";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import {
  Button,
  Col,
  Row,
  Form,
  Label,
  UncontrolledCollapse,
} from "reactstrap";
import dateConvertTables from "./../../../services/dateConvertTables";
class PdfRT extends React.Component {
  pdfExportComponent;

  constructor(props) {
    super(props);
    this.state = { orin: undefined };
    this.exportPDFWithMethod = this.exportPDFWithMethod.bind(this);
  }

  render() {
    return (
      <div style={{ zIndex: "1" }}>
        <div className="example-config">
          <Row>
            <Col md="12">
              <Button
                id={"toggler" + this.props.index}
                className="btn btn-block"
                color="success"
              >
                Preview
              </Button>
            </Col>
          </Row>
        </div>
        <UncontrolledCollapse toggler={"toggler" + this.props.index}>
          <Row style={{ marginTop: "10px" }}>
            <Col md="12">
              <Button
                color="success"
                className="btn btn-block"
                onClick={this.exportPDFWithMethod}
              >
                Download
              </Button>
            </Col>
          </Row>
          <PDFExport
            ref={(component) => (this.pdfExportComponent = component)}
            paperSize="A4"
          >
            <Form
              className="contact100-form validate-form reportForm"
              id={this.props.index}
            >
              <Row>
                <Col md="6">
                  <div className="imgContainer">
                    <img
                      className="imgFile"
                      src={"/assets/img/Images/BluAgent-Logo.png"}
                      ref={(img) => (this.img = img)}
                      crossOrigin="anonymous"
                      alt="logo"
                    />
                  </div>
                </Col>
              </Row>
              <Row className="header">
                <Col md="12">Certificate of Driver's Road Test</Col>
              </Row>
              <Row className="infoHeader">
                <Col md="12">{this.props.info.CompanyName}</Col>
              </Row>
              <Row className="infoHeader">
                <Col md="12">{this.props.info.CompanyAddress}</Col>
              </Row>
              <Row className="header2">
                <Col md="12">Driver Information</Col>
              </Row>
              <Row>
                <Col md="6">
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Name</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {this.props.info.DriverName}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Date of Birth</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {dateConvertTables(this.props.driver.Birthdate)}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label>Driver License</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {this.props.info.License}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="reportLabel">
                      <Label className="reportLabel">Phone Number</Label>
                    </Col>
                    <Col md="6" className="reportLabel">
                      {this.props.driver.PhoneNumber}
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <img
                    className="imgFile"
                    src={`${this.props.driver.DriverLicenseFile}`}
                    ref={(img) => (this.imgLicense = img)}
                    onError={() => {
                      this.imgLicense.src = "assets/img/Images/No-image.png";
                      this.imgLicense.className = "imgFile";
                    }}
                    crossOrigin="anonymous"
                    alt="signature"
                  />
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Vehicle Information</Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Type of Vehicle</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.TypeEquipment}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Type of Trailer</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.ClassEquipment}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  <Label>Type of Bus</Label>
                </Col>
                <Col md="4" className="reportLabel">
                  {this.props.info.TypeBus}
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Certification</Col>
              </Row>
              <Row>
                <Col md="12" className="reportLabel">
                  <Label>
                    This is to certify that{" "}
                    <span className="highlight">
                      {this.props.info.DriverName}
                    </span>{" "}
                    was given a road test under my supervision on{" "}
                    {dateConvertTables(this.props.info.DateC)}.
                    <br />
                    <br />
                    It is my considered opinion that this driver possesses
                    sufficient driving skills to operate safely the type of
                    commercial vehicle listed above.
                  </Label>
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Examiner's Information</Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  Name
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.DerName}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  Date
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.ReviewDate}
                </Col>
              </Row>
              <Row className="header2">
                <Col md="12">Driving's Information</Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  Pretrip Information
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.PretripInspection !== false ? (
                    <img
                      alt="Check"
                      width="15"
                      src="../../../assets/icons/icons8-checkmark.svg"
                    />
                  ) : (
                    <img
                      width="15"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD9ElEQVRoge3Yz28bRRTA8e/Muti4B0jSQOyUGxJ3BFJJ0iZREQQRkMqJvyCi4gIcKEmaXy5JaU/Aqf0zQKhFVFDcJiq9ceRMEhfRIhRInATvzOPg2rFj7+x6U8k++F1WXmvGn7cz82bW0I1udKMb7QwV9MXOu++/LajrwKCIgAAcXOXQZwSkfBMOXevuO9pX79e330CY6l27ebOZUwclIKhrbceX+z0pYq8HOQMTAE62+ckj5c5BeKHlBNqOF6lr23ICnYSv9tdSAp2ED/aHj0Bn4GOOQMfgHSOQCORHxPsi7BqfY0qTVCoSft8aStaSUpqEUuH4o66BIPx/Yvl34ATPrMzjv/YKRd8Pxe8aH3/kFD1Xc2xnBtizJhTvWsSBIxDlye8M9DP45RUSfb0cf/VlHuSusJNfI629pviiKcHYaQaXplGeR+qlF/n9g0/wNv8goWgZDxFGIGjO7xqfvg+nSPT1AqA8j8z8BTgzRNH4gfjsYzxA4kQf/R+dZ88aNz7WFApZsMeU5p/vvkeMqTZRnkdm4TMYHa4mEYQHEGPY+vYGCYUbHyeBsGqTVAq1ep8Hi5cbksguTsPZUbZ9v4wfHWnEW0th8Qskv0YS7cS7JpHrLBRaKtOeh7r7C4WFlbok0JrM3Kfo18fK+NxMI37hMvaHn0grLxzvGIHA4/TWG+9V1E3xtdVm1xjsyKkGKFYQBKUPnlMsvAjP/XqnqTXSCIRtUk9rjb57j8L88qGRUE8EH/MoEQ1fm4S6c4/C3DJY26Q7OQI+1kYWHV+9LwJKNf05VenK1rSLiHdtBdGqUAT8rvGR0eHyOtBNutWK7NI03pvj7PimNXy8o0RMfG21EambTkprsrkZvIlxtn2/BXycBI6Kt5bC/Arr00v1+4TWZHOzeG+dpWhMNHy8RRyOL5pSMP7xguX2KhtNkhi8NIueGGfbmFB87DcyF37fGuT0UCPeGDYvfl6tNmmt4fYqm7OXmiRxETU+zL61bny8o0QwHhFK1vLs5EQjfm4Z+TFfVyrTSmNv/czGTK7h2NFzbpKSsbHwzgScpRJIKc3Dr67hP/rLia9Um7T2kFv5uulUeviIP69+TUorNz7OUeLvsXckCF+Zr/tiKWaep//j82x9cwPJr4VuUkVrkbEhes5NlvHrBZ5CufEiDPx2v6nVkcCkuPCVP518K+xZQ0IR7VQpwr61lIwlpRVeBLwAmYAEQt/IGvAc4BFIKDiudf10C9mkkiiSng6fNrXtAiK8Ch3GN5Q8aQkfqdo0tAtWuqtQp+BjjUAH4V3vZNHfB9qJjzOFOgofbxGz0Tl4WW89AWEKkY0OwU85HnQ3utGNbrQx/geUXOzhLxT8xgAAAABJRU5ErkJggg=="
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  Coupling & Uncoupling of Combination Units
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.CouplinAndUncoupling !== false ? (
                    <img
                      alt="Check"
                      width="15"
                      src="../../../assets/icons/icons8-checkmark.svg"
                    />
                  ) : (
                    <img
                      width="15"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD9ElEQVRoge3Yz28bRRTA8e/Muti4B0jSQOyUGxJ3BFJJ0iZREQQRkMqJvyCi4gIcKEmaXy5JaU/Aqf0zQKhFVFDcJiq9ceRMEhfRIhRInATvzOPg2rFj7+x6U8k++F1WXmvGn7cz82bW0I1udKMb7QwV9MXOu++/LajrwKCIgAAcXOXQZwSkfBMOXevuO9pX79e330CY6l27ebOZUwclIKhrbceX+z0pYq8HOQMTAE62+ckj5c5BeKHlBNqOF6lr23ICnYSv9tdSAp2ED/aHj0Bn4GOOQMfgHSOQCORHxPsi7BqfY0qTVCoSft8aStaSUpqEUuH4o66BIPx/Yvl34ATPrMzjv/YKRd8Pxe8aH3/kFD1Xc2xnBtizJhTvWsSBIxDlye8M9DP45RUSfb0cf/VlHuSusJNfI629pviiKcHYaQaXplGeR+qlF/n9g0/wNv8goWgZDxFGIGjO7xqfvg+nSPT1AqA8j8z8BTgzRNH4gfjsYzxA4kQf/R+dZ88aNz7WFApZsMeU5p/vvkeMqTZRnkdm4TMYHa4mEYQHEGPY+vYGCYUbHyeBsGqTVAq1ep8Hi5cbksguTsPZUbZ9v4wfHWnEW0th8Qskv0YS7cS7JpHrLBRaKtOeh7r7C4WFlbok0JrM3Kfo18fK+NxMI37hMvaHn0grLxzvGIHA4/TWG+9V1E3xtdVm1xjsyKkGKFYQBKUPnlMsvAjP/XqnqTXSCIRtUk9rjb57j8L88qGRUE8EH/MoEQ1fm4S6c4/C3DJY26Q7OQI+1kYWHV+9LwJKNf05VenK1rSLiHdtBdGqUAT8rvGR0eHyOtBNutWK7NI03pvj7PimNXy8o0RMfG21EambTkprsrkZvIlxtn2/BXycBI6Kt5bC/Arr00v1+4TWZHOzeG+dpWhMNHy8RRyOL5pSMP7xguX2KhtNkhi8NIueGGfbmFB87DcyF37fGuT0UCPeGDYvfl6tNmmt4fYqm7OXmiRxETU+zL61bny8o0QwHhFK1vLs5EQjfm4Z+TFfVyrTSmNv/czGTK7h2NFzbpKSsbHwzgScpRJIKc3Dr67hP/rLia9Um7T2kFv5uulUeviIP69+TUorNz7OUeLvsXckCF+Zr/tiKWaep//j82x9cwPJr4VuUkVrkbEhes5NlvHrBZ5CufEiDPx2v6nVkcCkuPCVP518K+xZQ0IR7VQpwr61lIwlpRVeBLwAmYAEQt/IGvAc4BFIKDiudf10C9mkkiiSng6fNrXtAiK8Ch3GN5Q8aQkfqdo0tAtWuqtQp+BjjUAH4V3vZNHfB9qJjzOFOgofbxGz0Tl4WW89AWEKkY0OwU85HnQ3utGNbrQx/geUXOzhLxT8xgAAAABJRU5ErkJggg=="
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  Placing The Commercial Motor Vehicle
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.PlacingComercial !== false ? (
                    <img
                      alt="Check"
                      width="15"
                      src="../../../assets/icons/icons8-checkmark.svg"
                    />
                  ) : (
                    <img
                      width="15"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD9ElEQVRoge3Yz28bRRTA8e/Muti4B0jSQOyUGxJ3BFJJ0iZREQQRkMqJvyCi4gIcKEmaXy5JaU/Aqf0zQKhFVFDcJiq9ceRMEhfRIhRInATvzOPg2rFj7+x6U8k++F1WXmvGn7cz82bW0I1udKMb7QwV9MXOu++/LajrwKCIgAAcXOXQZwSkfBMOXevuO9pX79e330CY6l27ebOZUwclIKhrbceX+z0pYq8HOQMTAE62+ckj5c5BeKHlBNqOF6lr23ICnYSv9tdSAp2ED/aHj0Bn4GOOQMfgHSOQCORHxPsi7BqfY0qTVCoSft8aStaSUpqEUuH4o66BIPx/Yvl34ATPrMzjv/YKRd8Pxe8aH3/kFD1Xc2xnBtizJhTvWsSBIxDlye8M9DP45RUSfb0cf/VlHuSusJNfI629pviiKcHYaQaXplGeR+qlF/n9g0/wNv8goWgZDxFGIGjO7xqfvg+nSPT1AqA8j8z8BTgzRNH4gfjsYzxA4kQf/R+dZ88aNz7WFApZsMeU5p/vvkeMqTZRnkdm4TMYHa4mEYQHEGPY+vYGCYUbHyeBsGqTVAq1ep8Hi5cbksguTsPZUbZ9v4wfHWnEW0th8Qskv0YS7cS7JpHrLBRaKtOeh7r7C4WFlbok0JrM3Kfo18fK+NxMI37hMvaHn0grLxzvGIHA4/TWG+9V1E3xtdVm1xjsyKkGKFYQBKUPnlMsvAjP/XqnqTXSCIRtUk9rjb57j8L88qGRUE8EH/MoEQ1fm4S6c4/C3DJY26Q7OQI+1kYWHV+9LwJKNf05VenK1rSLiHdtBdGqUAT8rvGR0eHyOtBNutWK7NI03pvj7PimNXy8o0RMfG21EambTkprsrkZvIlxtn2/BXycBI6Kt5bC/Arr00v1+4TWZHOzeG+dpWhMNHy8RRyOL5pSMP7xguX2KhtNkhi8NIueGGfbmFB87DcyF37fGuT0UCPeGDYvfl6tNmmt4fYqm7OXmiRxETU+zL61bny8o0QwHhFK1vLs5EQjfm4Z+TFfVyrTSmNv/czGTK7h2NFzbpKSsbHwzgScpRJIKc3Dr67hP/rLia9Um7T2kFv5uulUeviIP69+TUorNz7OUeLvsXckCF+Zr/tiKWaep//j82x9cwPJr4VuUkVrkbEhes5NlvHrBZ5CufEiDPx2v6nVkcCkuPCVP518K+xZQ0IR7VQpwr61lIwlpRVeBLwAmYAEQt/IGvAc4BFIKDiudf10C9mkkiiSng6fNrXtAiK8Ch3GN5Q8aQkfqdo0tAtWuqtQp+BjjUAH4V3vZNHfB9qJjzOFOgofbxGz0Tl4WW89AWEKkY0OwU85HnQ3utGNbrQx/geUXOzhLxT8xgAAAABJRU5ErkJggg=="
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  Use of the commercial motor Vehicle's control intraffic and
                  while passing other motor vehicles
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.CommercialMotorVehicle !== false ? (
                    <img
                      alt="Check"
                      width="15"
                      src="../../../assets/icons/icons8-checkmark.svg"
                    />
                  ) : (
                    <img
                      width="15"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD9ElEQVRoge3Yz28bRRTA8e/Muti4B0jSQOyUGxJ3BFJJ0iZREQQRkMqJvyCi4gIcKEmaXy5JaU/Aqf0zQKhFVFDcJiq9ceRMEhfRIhRInATvzOPg2rFj7+x6U8k++F1WXmvGn7cz82bW0I1udKMb7QwV9MXOu++/LajrwKCIgAAcXOXQZwSkfBMOXevuO9pX79e330CY6l27ebOZUwclIKhrbceX+z0pYq8HOQMTAE62+ckj5c5BeKHlBNqOF6lr23ICnYSv9tdSAp2ED/aHj0Bn4GOOQMfgHSOQCORHxPsi7BqfY0qTVCoSft8aStaSUpqEUuH4o66BIPx/Yvl34ATPrMzjv/YKRd8Pxe8aH3/kFD1Xc2xnBtizJhTvWsSBIxDlye8M9DP45RUSfb0cf/VlHuSusJNfI629pviiKcHYaQaXplGeR+qlF/n9g0/wNv8goWgZDxFGIGjO7xqfvg+nSPT1AqA8j8z8BTgzRNH4gfjsYzxA4kQf/R+dZ88aNz7WFApZsMeU5p/vvkeMqTZRnkdm4TMYHa4mEYQHEGPY+vYGCYUbHyeBsGqTVAq1ep8Hi5cbksguTsPZUbZ9v4wfHWnEW0th8Qskv0YS7cS7JpHrLBRaKtOeh7r7C4WFlbok0JrM3Kfo18fK+NxMI37hMvaHn0grLxzvGIHA4/TWG+9V1E3xtdVm1xjsyKkGKFYQBKUPnlMsvAjP/XqnqTXSCIRtUk9rjb57j8L88qGRUE8EH/MoEQ1fm4S6c4/C3DJY26Q7OQI+1kYWHV+9LwJKNf05VenK1rSLiHdtBdGqUAT8rvGR0eHyOtBNutWK7NI03pvj7PimNXy8o0RMfG21EambTkprsrkZvIlxtn2/BXycBI6Kt5bC/Arr00v1+4TWZHOzeG+dpWhMNHy8RRyOL5pSMP7xguX2KhtNkhi8NIueGGfbmFB87DcyF37fGuT0UCPeGDYvfl6tNmmt4fYqm7OXmiRxETU+zL61bny8o0QwHhFK1vLs5EQjfm4Z+TFfVyrTSmNv/czGTK7h2NFzbpKSsbHwzgScpRJIKc3Dr67hP/rLia9Um7T2kFv5uulUeviIP69+TUorNz7OUeLvsXckCF+Zr/tiKWaep//j82x9cwPJr4VuUkVrkbEhes5NlvHrBZ5CufEiDPx2v6nVkcCkuPCVP518K+xZQ0IR7VQpwr61lIwlpRVeBLwAmYAEQt/IGvAc4BFIKDiudf10C9mkkiiSng6fNrXtAiK8Ch3GN5Q8aQkfqdo0tAtWuqtQp+BjjUAH4V3vZNHfB9qJjzOFOgofbxGz0Tl4WW89AWEKkY0OwU85HnQ3utGNbrQx/geUXOzhLxT8xgAAAABJRU5ErkJggg=="
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="4" className="reportLabel">
                  Turning Commercial Motor Vehicle
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.TourungCommercialMotor !== false ? (
                    <img
                      alt="Check"
                      width="15"
                      src="../../../assets/icons/icons8-checkmark.svg"
                    />
                  ) : (
                    <img
                      width="15"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD9ElEQVRoge3Yz28bRRTA8e/Muti4B0jSQOyUGxJ3BFJJ0iZREQQRkMqJvyCi4gIcKEmaXy5JaU/Aqf0zQKhFVFDcJiq9ceRMEhfRIhRInATvzOPg2rFj7+x6U8k++F1WXmvGn7cz82bW0I1udKMb7QwV9MXOu++/LajrwKCIgAAcXOXQZwSkfBMOXevuO9pX79e330CY6l27ebOZUwclIKhrbceX+z0pYq8HOQMTAE62+ckj5c5BeKHlBNqOF6lr23ICnYSv9tdSAp2ED/aHj0Bn4GOOQMfgHSOQCORHxPsi7BqfY0qTVCoSft8aStaSUpqEUuH4o66BIPx/Yvl34ATPrMzjv/YKRd8Pxe8aH3/kFD1Xc2xnBtizJhTvWsSBIxDlye8M9DP45RUSfb0cf/VlHuSusJNfI629pviiKcHYaQaXplGeR+qlF/n9g0/wNv8goWgZDxFGIGjO7xqfvg+nSPT1AqA8j8z8BTgzRNH4gfjsYzxA4kQf/R+dZ88aNz7WFApZsMeU5p/vvkeMqTZRnkdm4TMYHa4mEYQHEGPY+vYGCYUbHyeBsGqTVAq1ep8Hi5cbksguTsPZUbZ9v4wfHWnEW0th8Qskv0YS7cS7JpHrLBRaKtOeh7r7C4WFlbok0JrM3Kfo18fK+NxMI37hMvaHn0grLxzvGIHA4/TWG+9V1E3xtdVm1xjsyKkGKFYQBKUPnlMsvAjP/XqnqTXSCIRtUk9rjb57j8L88qGRUE8EH/MoEQ1fm4S6c4/C3DJY26Q7OQI+1kYWHV+9LwJKNf05VenK1rSLiHdtBdGqUAT8rvGR0eHyOtBNutWK7NI03pvj7PimNXy8o0RMfG21EambTkprsrkZvIlxtn2/BXycBI6Kt5bC/Arr00v1+4TWZHOzeG+dpWhMNHy8RRyOL5pSMP7xguX2KhtNkhi8NIueGGfbmFB87DcyF37fGuT0UCPeGDYvfl6tNmmt4fYqm7OXmiRxETU+zL61bny8o0QwHhFK1vLs5EQjfm4Z+TFfVyrTSmNv/czGTK7h2NFzbpKSsbHwzgScpRJIKc3Dr67hP/rLia9Um7T2kFv5uulUeviIP69+TUorNz7OUeLvsXckCF+Zr/tiKWaep//j82x9cwPJr4VuUkVrkbEhes5NlvHrBZ5CufEiDPx2v6nVkcCkuPCVP518K+xZQ0IR7VQpwr61lIwlpRVeBLwAmYAEQt/IGvAc4BFIKDiudf10C9mkkiiSng6fNrXtAiK8Ch3GN5Q8aQkfqdo0tAtWuqtQp+BjjUAH4V3vZNHfB9qJjzOFOgofbxGz0Tl4WW89AWEKkY0OwU85HnQ3utGNbrQx/geUXOzhLxT8xgAAAABJRU5ErkJggg=="
                    />
                  )}
                </Col>
              </Row>

              <Row>
                <Col md="4" className="reportLabel">
                  Braking and Slow Commercial
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.BreakingAndSlowCommercial !== false ? (
                    <img
                      alt="Check"
                      width="15"
                      src="../../../assets/icons/icons8-checkmark.svg"
                    />
                  ) : (
                    <img
                      width="15"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD9ElEQVRoge3Yz28bRRTA8e/Muti4B0jSQOyUGxJ3BFJJ0iZREQQRkMqJvyCi4gIcKEmaXy5JaU/Aqf0zQKhFVFDcJiq9ceRMEhfRIhRInATvzOPg2rFj7+x6U8k++F1WXmvGn7cz82bW0I1udKMb7QwV9MXOu++/LajrwKCIgAAcXOXQZwSkfBMOXevuO9pX79e330CY6l27ebOZUwclIKhrbceX+z0pYq8HOQMTAE62+ckj5c5BeKHlBNqOF6lr23ICnYSv9tdSAp2ED/aHj0Bn4GOOQMfgHSOQCORHxPsi7BqfY0qTVCoSft8aStaSUpqEUuH4o66BIPx/Yvl34ATPrMzjv/YKRd8Pxe8aH3/kFD1Xc2xnBtizJhTvWsSBIxDlye8M9DP45RUSfb0cf/VlHuSusJNfI629pviiKcHYaQaXplGeR+qlF/n9g0/wNv8goWgZDxFGIGjO7xqfvg+nSPT1AqA8j8z8BTgzRNH4gfjsYzxA4kQf/R+dZ88aNz7WFApZsMeU5p/vvkeMqTZRnkdm4TMYHa4mEYQHEGPY+vYGCYUbHyeBsGqTVAq1ep8Hi5cbksguTsPZUbZ9v4wfHWnEW0th8Qskv0YS7cS7JpHrLBRaKtOeh7r7C4WFlbok0JrM3Kfo18fK+NxMI37hMvaHn0grLxzvGIHA4/TWG+9V1E3xtdVm1xjsyKkGKFYQBKUPnlMsvAjP/XqnqTXSCIRtUk9rjb57j8L88qGRUE8EH/MoEQ1fm4S6c4/C3DJY26Q7OQI+1kYWHV+9LwJKNf05VenK1rSLiHdtBdGqUAT8rvGR0eHyOtBNutWK7NI03pvj7PimNXy8o0RMfG21EambTkprsrkZvIlxtn2/BXycBI6Kt5bC/Arr00v1+4TWZHOzeG+dpWhMNHy8RRyOL5pSMP7xguX2KhtNkhi8NIueGGfbmFB87DcyF37fGuT0UCPeGDYvfl6tNmmt4fYqm7OXmiRxETU+zL61bny8o0QwHhFK1vLs5EQjfm4Z+TFfVyrTSmNv/czGTK7h2NFzbpKSsbHwzgScpRJIKc3Dr67hP/rLia9Um7T2kFv5uulUeviIP69+TUorNz7OUeLvsXckCF+Zr/tiKWaep//j82x9cwPJr4VuUkVrkbEhes5NlvHrBZ5CufEiDPx2v6nVkcCkuPCVP518K+xZQ0IR7VQpwr61lIwlpRVeBLwAmYAEQt/IGvAc4BFIKDiudf10C9mkkiiSng6fNrXtAiK8Ch3GN5Q8aQkfqdo0tAtWuqtQp+BjjUAH4V3vZNHfB9qJjzOFOgofbxGz0Tl4WW89AWEKkY0OwU85HnQ3utGNbrQx/geUXOzhLxT8xgAAAABJRU5ErkJggg=="
                    />
                  )}
                </Col>
              </Row>

              <Row>
                <Col md="4" className="reportLabel">
                  Bracking and Parking Commercial Motor Vehicle
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.BackingAndParkingCommercial !== false ? (
                    <img
                      alt="Check"
                      width="15"
                      src="../../../assets/icons/icons8-checkmark.svg"
                    />
                  ) : (
                    <img
                      width="15"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD9ElEQVRoge3Yz28bRRTA8e/Muti4B0jSQOyUGxJ3BFJJ0iZREQQRkMqJvyCi4gIcKEmaXy5JaU/Aqf0zQKhFVFDcJiq9ceRMEhfRIhRInATvzOPg2rFj7+x6U8k++F1WXmvGn7cz82bW0I1udKMb7QwV9MXOu++/LajrwKCIgAAcXOXQZwSkfBMOXevuO9pX79e330CY6l27ebOZUwclIKhrbceX+z0pYq8HOQMTAE62+ckj5c5BeKHlBNqOF6lr23ICnYSv9tdSAp2ED/aHj0Bn4GOOQMfgHSOQCORHxPsi7BqfY0qTVCoSft8aStaSUpqEUuH4o66BIPx/Yvl34ATPrMzjv/YKRd8Pxe8aH3/kFD1Xc2xnBtizJhTvWsSBIxDlye8M9DP45RUSfb0cf/VlHuSusJNfI629pviiKcHYaQaXplGeR+qlF/n9g0/wNv8goWgZDxFGIGjO7xqfvg+nSPT1AqA8j8z8BTgzRNH4gfjsYzxA4kQf/R+dZ88aNz7WFApZsMeU5p/vvkeMqTZRnkdm4TMYHa4mEYQHEGPY+vYGCYUbHyeBsGqTVAq1ep8Hi5cbksguTsPZUbZ9v4wfHWnEW0th8Qskv0YS7cS7JpHrLBRaKtOeh7r7C4WFlbok0JrM3Kfo18fK+NxMI37hMvaHn0grLxzvGIHA4/TWG+9V1E3xtdVm1xjsyKkGKFYQBKUPnlMsvAjP/XqnqTXSCIRtUk9rjb57j8L88qGRUE8EH/MoEQ1fm4S6c4/C3DJY26Q7OQI+1kYWHV+9LwJKNf05VenK1rSLiHdtBdGqUAT8rvGR0eHyOtBNutWK7NI03pvj7PimNXy8o0RMfG21EambTkprsrkZvIlxtn2/BXycBI6Kt5bC/Arr00v1+4TWZHOzeG+dpWhMNHy8RRyOL5pSMP7xguX2KhtNkhi8NIueGGfbmFB87DcyF37fGuT0UCPeGDYvfl6tNmmt4fYqm7OXmiRxETU+zL61bny8o0QwHhFK1vLs5EQjfm4Z+TFfVyrTSmNv/czGTK7h2NFzbpKSsbHwzgScpRJIKc3Dr67hP/rLia9Um7T2kFv5uulUeviIP69+TUorNz7OUeLvsXckCF+Zr/tiKWaep//j82x9cwPJr4VuUkVrkbEhes5NlvHrBZ5CufEiDPx2v6nVkcCkuPCVP518K+xZQ0IR7VQpwr61lIwlpRVeBLwAmYAEQt/IGvAc4BFIKDiudf10C9mkkiiSng6fNrXtAiK8Ch3GN5Q8aQkfqdo0tAtWuqtQp+BjjUAH4V3vZNHfB9qJjzOFOgofbxGz0Tl4WW89AWEKkY0OwU85HnQ3utGNbrQx/geUXOzhLxT8xgAAAABJRU5ErkJggg=="
                    />
                  )}
                </Col>
              </Row>

              <Row>
                <Col md="4" className="reportLabel">
                  Operating Commercial Motor
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.OperatingCommercialMotor !== false ? (
                    <img
                      alt="Check"
                      width="15"
                      src="../../../assets/icons/icons8-checkmark.svg"
                    />
                  ) : (
                    <img
                      width="15"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD9ElEQVRoge3Yz28bRRTA8e/Muti4B0jSQOyUGxJ3BFJJ0iZREQQRkMqJvyCi4gIcKEmaXy5JaU/Aqf0zQKhFVFDcJiq9ceRMEhfRIhRInATvzOPg2rFj7+x6U8k++F1WXmvGn7cz82bW0I1udKMb7QwV9MXOu++/LajrwKCIgAAcXOXQZwSkfBMOXevuO9pX79e330CY6l27ebOZUwclIKhrbceX+z0pYq8HOQMTAE62+ckj5c5BeKHlBNqOF6lr23ICnYSv9tdSAp2ED/aHj0Bn4GOOQMfgHSOQCORHxPsi7BqfY0qTVCoSft8aStaSUpqEUuH4o66BIPx/Yvl34ATPrMzjv/YKRd8Pxe8aH3/kFD1Xc2xnBtizJhTvWsSBIxDlye8M9DP45RUSfb0cf/VlHuSusJNfI629pviiKcHYaQaXplGeR+qlF/n9g0/wNv8goWgZDxFGIGjO7xqfvg+nSPT1AqA8j8z8BTgzRNH4gfjsYzxA4kQf/R+dZ88aNz7WFApZsMeU5p/vvkeMqTZRnkdm4TMYHa4mEYQHEGPY+vYGCYUbHyeBsGqTVAq1ep8Hi5cbksguTsPZUbZ9v4wfHWnEW0th8Qskv0YS7cS7JpHrLBRaKtOeh7r7C4WFlbok0JrM3Kfo18fK+NxMI37hMvaHn0grLxzvGIHA4/TWG+9V1E3xtdVm1xjsyKkGKFYQBKUPnlMsvAjP/XqnqTXSCIRtUk9rjb57j8L88qGRUE8EH/MoEQ1fm4S6c4/C3DJY26Q7OQI+1kYWHV+9LwJKNf05VenK1rSLiHdtBdGqUAT8rvGR0eHyOtBNutWK7NI03pvj7PimNXy8o0RMfG21EambTkprsrkZvIlxtn2/BXycBI6Kt5bC/Arr00v1+4TWZHOzeG+dpWhMNHy8RRyOL5pSMP7xguX2KhtNkhi8NIueGGfbmFB87DcyF37fGuT0UCPeGDYvfl6tNmmt4fYqm7OXmiRxETU+zL61bny8o0QwHhFK1vLs5EQjfm4Z+TFfVyrTSmNv/czGTK7h2NFzbpKSsbHwzgScpRJIKc3Dr67hP/rLia9Um7T2kFv5uulUeviIP69+TUorNz7OUeLvsXckCF+Zr/tiKWaep//j82x9cwPJr4VuUkVrkbEhes5NlvHrBZ5CufEiDPx2v6nVkcCkuPCVP518K+xZQ0IR7VQpwr61lIwlpRVeBLwAmYAEQt/IGvAc4BFIKDiudf10C9mkkiiSng6fNrXtAiK8Ch3GN5Q8aQkfqdo0tAtWuqtQp+BjjUAH4V3vZNHfB9qJjzOFOgofbxGz0Tl4WW89AWEKkY0OwU85HnQ3utGNbrQx/geUXOzhLxT8xgAAAABJRU5ErkJggg=="
                    />
                  )}
                </Col>
              </Row>

              <Row>
                <Col md="4" className="reportLabel">
                  Road Test Performed By
                </Col>
                <Col md="8" className="reportLabel">
                  {this.props.info.RoadTestPerformedBy !== false
                    ? this.props.info.RoadTestPerformedBy
                    : "NO Availeable"}
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <img
                    className="imgFile"
                    src={`${this.props.info.DerSignature}`}
                    ref={(imgDerSignature) =>
                      (this.imgDerSignature = imgDerSignature)
                    }
                    onError={() => {
                      this.imgDerSignature.src =
                        "assets/img/Images/No-image.png";
                      this.imgDerSignature.className = "imgFile";
                    }}
                    crossOrigin="anonymous"
                    alt="signature"
                  />
                </Col>
              </Row>
            </Form>
          </PDFExport>
        </UncontrolledCollapse>
      </div>
    );
  }

  exportPDFWithMethod = () => {
    savePDF(ReactDOM.findDOMNode(this.pdfExportComponent), { paperSize: "A4" });
  };
}

export default PdfRT;
