import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  CustomInput,
  Form,
  FormGroup,
  Col,
  Label,
  Input
} from "reactstrap";
import base64ToByteArray2 from "./../../../services/base64ToByteArray2";
import getCurrentDate from "./../../../services/getCurrentDate";
import dateConvertTables from "./../../../services/dateConvertTables";
import TableCom from "./../../../components/Table";
import AlertDelete from "./../../../components/AlertDelete";

class DocumentDA extends React.Component {
  constructor(props) {
    super(props);
    this.state = { certificate: [], policy: [], training: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var pre = new FormData(e.target);
    pre.append("id", JSON.parse(localStorage.getItem("user")).Id);
    pre.append("certificate", this.state.certificate);
    pre.append("policy", this.state.policy);
    pre.append("training", this.state.training);
    this.props.submit(pre);

    document.getElementById("CertificateEnroll").value = "";
    document.getElementById("DrugsPolicy").value = "";
    document.getElementById("SuperTraining").value = "";
    document.getElementById("TrainingDate").value = "";
    document.getElementById("SupervisorsName").value = "";
    document.getElementById("EnrollDate").value = "";
  }

  readFile(e) {
    var input = e.target;
    var nameFile = input.files[0].name.substr(-4);
    if (input.name == "CertificateEnroll") {
      var reader = new FileReader();
      var pdf = "";
      reader.onload = e => {
        pdf = base64ToByteArray2(e.target.result);
        if (nameFile === ".pdf") {
          document.getElementById("errorCertificateEnroll").style.display =
            "none";
          this.setState({ certificate: pdf });
        } else {
          document.getElementById("errorCertificateEnroll").style.display =
            "inline-block";
          this.setState({ certificate: "" });
        }
      };
      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) {}
    } else if (input.name == "DrugsPolicy") {
      var reader = new FileReader();
      var pdf = "";
      reader.onload = e => {
        pdf = base64ToByteArray2(e.target.result);
        if (nameFile === ".pdf") {
          document.getElementById("errorDrugsPolicy").style.display = "none";
          this.setState({ policy: pdf });
        } else {
          document.getElementById("errorDrugsPolicy").style.display =
            "inline-block";
          this.setState({ policy: "" });
        }
      };
      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) {}
    } else if (input.name == "SuperTraining") {
      var reader = new FileReader();
      var pdf = "";
      reader.onload = e => {
        pdf = base64ToByteArray2(e.target.result);
        if (nameFile === ".pdf") {
          document.getElementById("errorSuperTraining").style.display = "none";
          this.setState({ training: pdf });
        } else {
          document.getElementById("errorSuperTraining").style.display =
            "inline-block";
          this.setState({ training: "" });
        }
      };
      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) {}
    }
  }

  render() {
    var id = JSON.parse(localStorage.getItem("user")).Id;

    let repST = [
      "SUPERVISOR TRAINING",
      "DATE",
      "SUPERVISOR NAME",
      "DOWNLOAD",
      "DELETE"
    ];

    let rowItemsST = this.props.training.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.SuperTraining}</td>
        <td className="text-center">{dateConvertTables(row.TrainingDate)}</td>
        <td className="text-center">{row.SupervisorsName}</td>
        <td className="text-center">
          <a
            color="primary"
            href={"assets/img/Images/DrugsTest/docs/" + row.SuperTraining}
            download={"SuperTraining.pdf"}
          >
            Download
          </a>
        </td>
        <td className="text-center">
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            style={{ color: "red" }}
            onClick={() => {
              this.props.toggleDST(row.IdTraining);
            }}
          ></i>
        </td>
      </tr>
    ));

    let rep = ["CERTIFICATE OF ENROLLMENT", "DATE", "DOWNLOAD", "DELETE"];

    let rowItems = this.props.certificate.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.CertificateEnroll}</td>
        <td className="text-center">{dateConvertTables(row.EnrollDate)}</td>
        <td className="text-center">
          <a
            color="primary"
            href={"assets/img/Images/DrugsTest/docs/" + row.CertificateEnroll}
            download={"CertificateEnroll.pdf"}
          >
            Download
          </a>
        </td>
        <td className="text-center">
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            style={{ color: "red" }}
            onClick={() => {
              this.props.toggleDDA(row.IdCertificate);
            }}
          ></i>
        </td>
      </tr>
    ));

    return (
      <div className="col-md-3">
        <input
          type="image"
          onClick={() => {
            this.props.toggle();
          }}
          className="img-responsive"
          src="assets/img/dashboard/back/test/docda1.png"
          onMouseOver={e =>
            (e.currentTarget.src = "/assets/img/dashboard/front/test/docda.png")
          }
          onMouseOut={e =>
            (e.currentTarget.src = "assets/img/dashboard/back/test/docda1.png")
          }
          alt="Submit"
          height="100"
          width="100"
        />
        <h6>DOCUMENTS</h6>

        <Modal isOpen={this.props.modal} className={"modal-lg "}>
          <ModalHeader name="modal1" toggle={this.props.toggle}>
            DOCUMENTS
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="text-input">
                    Drug & Alcohol Testing Policy
                  </Label>
                  <Label
                    className="error"
                    id="errorDrugsPolicy"
                    style={{
                      display: "none",
                      marginLeft: "10px",
                      fontSize: "8pt"
                    }}
                  >
                    File not supported
                  </Label>
                  <CustomInput
                    type="file"
                    accept=".pdf"
                    name="DrugsPolicy"
                    id="DrugsPolicy"
                    onChange={this.readFile}
                    required
                  />
                </Col>
                <Col md="2">
                  <br />
                  {this.props.docs.DrugsPolicy !== null ? (
                    <Button
                      color="primary"
                      href={
                        "assets/img/Images/DrugsTest/docs/" +
                        this.props.docs.DrugsPolicy
                      }
                      download={"D&A Policy"}
                    >
                      Download
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md="2">
                  <br />
                  <Button
                    outline
                    color="primary"
                    type="submit"
                    disabled={this.props.isLoading ? true : false}
                  >
                    Save
                  </Button>{" "}
                </Col>
              </FormGroup>
            </Form>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="text-input">DOT Supervisor Training</Label>
                  <Label
                    className="error"
                    id="errorSuperTraining"
                    style={{
                      display: "none",
                      marginLeft: "10px",
                      fontSize: "8pt"
                    }}
                  >
                    File not supported
                  </Label>
                  <CustomInput
                    type="file"
                    accept=".pdf"
                    name="SuperTraining"
                    id="SuperTraining"
                    onChange={this.readFile}
                    required
                  />
                </Col>
                <Col md="3">
                  <Label htmlFor="text-input">Certification Date</Label>
                  <Input
                    type="date"
                    max={getCurrentDate()}
                    id="TrainingDate"
                    name="TrainingDate"
                    required
                  />
                </Col>
                <Col md="3">
                  <Label htmlFor="text-input">Supervisor's Name</Label>
                  <Input
                    type="text"
                    id="SupervisorsName"
                    name="SupervisorsName"
                    placeholder="Full Name"
                    required
                  />
                </Col>
                <Col md="2">
                  <br />
                  <Button
                    outline
                    color="primary"
                    type="submit"
                    disabled={this.props.isLoading ? true : false}
                  >
                    Save
                  </Button>{" "}
                </Col>
              </FormGroup>
            </Form>
            <FormGroup>
              <TableCom
                rowItems={rowItemsST}
                header={repST}
                count={this.props.countST}
                page={this.props.pageST}
                getItems={index => {
                  this.props.getTraining(id, index, 3);
                }}
              />
              <AlertDelete
                message="You are sure that delete that Supervisor Training"
                modal={this.props.modalDST}
                toggle={() => {
                  this.props.toggleDST(this.props.idDeleteST);
                }}
                delete={() => {
                  this.props.deleteT(this.props.idDeleteST, id);
                }}
              />
            </FormGroup>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="text-input">Certificate of Enrollment</Label>
                  <Label
                    className="errorCertificateEnroll"
                    id="error"
                    style={{
                      display: "none",
                      marginLeft: "10px",
                      fontSize: "8pt"
                    }}
                  >
                    File not supported
                  </Label>
                  <CustomInput
                    type="file"
                    accept=".pdf"
                    name="CertificateEnroll"
                    id="CertificateEnroll"
                    onChange={this.readFile}
                    required
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Enrollment Date</Label>
                  <Input
                    type="date"
                    max={getCurrentDate()}
                    id="EnrollDate"
                    name="EnrollDate"
                    required
                  />
                </Col>
                <Col md="2">
                  <br />
                  <Button
                    outline
                    color="primary"
                    type="submit"
                    disabled={this.props.isLoading ? true : false}
                  >
                    Save
                  </Button>{" "}
                </Col>
              </FormGroup>
            </Form>
            <FormGroup>
              <TableCom
                rowItems={rowItems}
                header={rep}
                count={this.props.count}
                page={this.props.page}
                getItems={index => {
                  this.props.getCertificates(id, index, 3);
                }}
              />
              <AlertDelete
                message="You are sure that delete that Certificate of Enrollment"
                modal={this.props.modalDDA}
                toggle={() => {
                  this.props.toggleDDA(this.props.idDeleteDA);
                }}
                delete={() => {
                  this.props.deleteC(this.props.idDeleteDA, id);
                }}
              />
            </FormGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DocumentDA;
