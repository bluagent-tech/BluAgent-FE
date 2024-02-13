import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  CustomInput,
  Col,
  Label,
  Input,
  Form,
} from 'reactstrap';
import base64ToByteArray2 from './../../../services/base64ToByteArray2';
import dateConvertTables from './../../../services/dateConvertTables';
import TableCom from './../../../components/Table';
import DatePicker from './../../../components/DatePicker';
import AlertDelete from '../../../components/AlertDelete';
import moment from 'moment';
//MEDICAL EXAMINER'S CERTIFICATE

class MedicalCertf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      File: [], 
      fileName: undefined,
      id: 0,
      medicalCertificateId: "",
      idDriver: 0,
      medicalFile: "",
     };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var mc = new FormData(e.target);
    mc.append("IdDriver", this.props.id);
    mc.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    mc.append("file", this.state.File);

    this.props.submit(mc);
    this.setState({File: [], fileName: undefined});
  }

  readFile(e) {
    var input = e.target;
    if (input) {
      var reader = new FileReader();
      var pdf = "";
      reader.onload = (e) => {
        pdf = base64ToByteArray2(e.target.result);
        document.getElementById("error").style.display = "none";
        this.setState({File: pdf});
      };

      try {
        this.setState({fileName: input.files[0].name});
        reader.readAsDataURL(input.files[0]);
      } catch (error) {}
    }
  }

  render() {
    let { openDelete } = this.state;
    let rep = ["CERTIFICATE", "CREATED", "EXPIRATION", "FILE", "DELETE"];
    let rowItems;

    rowItems = this.props.list.map((row, index) => (
      <tr key={index}>
        <td className="text-center">{row.MedicalCertificateId}</td>
        <td className="text-center">{moment(row.IssueDate).format('MM-DD-YYYY') }</td>
        <td className="text-center">{moment(row.ExpirationDate).format('MM-DD-YYYY')}</td>
        <td className="text-center">
          <Button
            style={{color: "#329ad6"}}
            onClick={() => {
              this.props.download(
                row.IdDriver,
                "MedicalExaminer",
                row.MedicalFile
              );
            }}
          >
            Download
          </Button>
        </td>
        <td className="text-center">
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            onClick={() => {
              this.setState({id: row.Id, 
              medicalCertificateId: row.MedicalCertificateId,
              idDriver: row.IdDriver,
              medicalFile: row.MedicalFile});

              this.props.toggleD(row.Id, row.MedicalCertificateId, row.IdDriver, row.MedicalFile);
            }}
            style={{color: "red", cursor: "pointer"}}
          ></i>
        </td>
      </tr>
    ));
    return (
      <div className="col-md-3">
        <input
          onClick={() => {
            this.props.toggle(this.props.id);
          }}
          className="img-responsive"
          type="image"
          src="assets/icons/icons8-treatment.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-treatment.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-treatment.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>MEDICAL CERTIFICATION</h6>

        <Modal
          isOpen={this.props.modal}
          className={"modal-lg "}
          backdrop={"static"}
          toggle={this.props.toggle}
        >
          <ModalHeader name="modal1" toggle={this.props.toggle}>
            MEDICAL EXAMINER'S CERTIFICATE
          </ModalHeader>
          <ModalBody>
            {this.props.statusR === "ACTIVE" ? (
              <Form name="formMC" onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="text-input">Medical Certification ID</Label>
                    <Input
                      type="text"
                      id="Medical1"
                      name="MedicalCertificateId"
                      maxLength="15"
                      required
                    />
                  </Col>
                  <Col md="6">
                    <Label htmlFor="text-input">File Upload</Label>
                    <Label
                      className="error"
                      id="error"
                      style={{
                        display: "none",
                        marginLeft: "10px",
                        fontSize: "8pt",
                      }}
                    >
                      File not supported
                    </Label>
                    <CustomInput
                      label={this.state.fileName}
                      type="file"
                      accept=".pdf"
                      id="filemc"
                      name="MedicalFile"
                      onChange={this.readFile}
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                  <Label htmlFor="Created">Issue Date</Label>
                  <Input
                        id="Created"
                        placeholder="Date"
                        type="date"
                        name="IssueDate"
                        required
                      />
                  </Col>
                  <Col md="6">
                  <Label htmlFor="MedicalExp">Expiration Date</Label>
                  <Input
                        id="MedicalExp"
                        placeholder="Date"
                        type="date"
                        name="ExpirationDate"
                        required
                      />
                  </Col>
                </FormGroup>
                <br />
                <FormGroup row>
                  <Col md="6">
                    <Button
                      color="primary"
                      type="submit"
                      disabled={this.props.isLoading ? true : false}
                    >
                      Save
                    </Button>{" "}
                    <Button color="danger" onClick={this.props.toggle}>
                      Close
                    </Button>{" "}
                  </Col>
                  {this.props.isLoading ? (
                    <img
                      style={{
                        width: "140px",
                        position: "absolute",
                        marginTop: "0px",
                        right: "40%",
                      }}
                      src="../../assets/img/icons/loading2.gif"
                      alt="loading"
                    />
                  ) : (
                    <div />
                  )}
                </FormGroup>
              </Form>
            ) : (
              ""
            )}
            <TableCom
              rowItems={rowItems}
              header={rep}
              count={this.props.count}
              page={this.props.page}
              getItems={(index) => {
                this.props.get(this.props.id, index, 3);
              }}
            />
          </ModalBody>
        </Modal>

        <AlertDelete
          message="You are sure to delete this medical certificate"
          modal={this.props.modalD}
          toggle={() => {
            this.props.toggleD();
          }}
          delete={() => {
            this.props.deleteCertificate(
              this.state.id,
              this.state.medicalCertificateId,
              this.state.idDriver,
              this.state.medicalFile,
              this.props.idCompany,
              this.props.toggleD()
            );
          }}
        />
      </div>
    );
  }
}

export default MedicalCertf;
