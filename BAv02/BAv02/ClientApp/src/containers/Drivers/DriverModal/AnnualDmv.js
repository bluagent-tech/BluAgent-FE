import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Alert,
  Label,
  Input,
  Form,
} from 'reactstrap';
import TableCom from './../../../components/Table';
import PdfRD from './../Pdf/PdfRD';
import mayus from './../../../services/mayus';
import dateConvertTables from './../../../services/dateConvertTables';
import DatePicker from '../../../components/DatePicker';
import "./cssDM/TablesPDF.css";

//ANNUAL REVIEW OF DMV DRIVING RECORD

class AnnualDmv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {image: ""};
    this.open = this.open.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
  }

  open() {
    var canvas = document.getElementById("admin2");
    var img = new Image();
    img.src =
      "assets/img/Images/signatures/" + this.props.company.FileSignature;
    img.onload = () => {
      canvas.getContext("2d").drawImage(img, 0, 0);
      this.setState({image: canvas.toDataURL()});
    };
    this.props.toggle(this.props.id, this.props.idLoggedUser, this.props.idCompany);
  }

  onChangeCheck(e) {
    const {checked, name} = e.target;
    if (name === "Question1") {
      if (checked === true) {
        document.getElementById("Question2").checked = false;
      } else {
        document.getElementById("Question2").checked = true;
      }
    }
    if (name === "Question2") {
      if (checked === true) {
        document.getElementById("Question1").checked = false;
      } else {
        document.getElementById("Question1").checked = true;
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var rd = new FormData(e.target);
    rd.append("IdDriver", this.props.id);
    rd.append("IdCompany", this.props.company.Id);
    rd.append("QuestionA", this.Question1.checked);
    rd.append("QuestionB", this.Question2.checked);
    this.props.submit(rd, this.props.company.FileSignature);
  }

  toggle = () => {
    this.props.toggle(this.props.id, this.props.idLoggedUser, this.props.idCompany)
  };

  render() {
    let rep = ["CARRIER", "DATE"];
    let rowItems = this.props.list.map((row, index) => (
      <React.Fragment>
        <tr key={index}>
          <td className="text-center">{row.MotorCarrier}</td>
          <td className="text-center">{dateConvertTables(row.DateReview)}</td>
        </tr>
        <tr>
        <td className="text-center" colSpan={"2"}>
          <PdfRD
            driver={this.props.driver}
            info={row}
            index={index}
            image={this.state.image}
          />
        </td>
        </tr>
      </React.Fragment>
    ));
    return (
      <div className="col-md-3">
        <input
          onClick={() => {
            this.open();
          }}
          className="img-responsive"
          type="image"
          src="assets/icons/icons8-cv.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-cv.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-cv.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>REVIEW OF DMV</h6>
        <canvas
          id="admin2"
          style={{ display: "none" }}
          width={320}
          height={180}
        />
        <Modal
          isOpen={this.props.modal}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.toggle}
        >
          <ModalHeader name="modal1" toggle={this.toggle}>
            ANNUAL REVIEW OF DMV DRIVING RECORD
          </ModalHeader>
          <Col md="12">
            <Alert
              style={{
                backgroundColor: "#dff0fe",
                borderLeft: "4px solid #dff0fe",
                borderColor: "#4788c7",
                color: "#4788c7",
                padding: "15px 20px",
              }}
            >
              Notice: <i className="fas fa-exclamation-circle"></i> Driver
              information needs to be completed on the{" "}
              <strong>Driver's Account Section</strong>
            </Alert>
          </Col>
          <ModalBody>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Last Name</Label>
                <Input
                  type="text"
                  id="lname"
                  name="lname"
                  defaultValue={this.props.driver.LastName}
                  readOnly
                />
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">First Name</Label>
                <Input
                  type="text"
                  id="fname"
                  name="fname"
                  defaultValue={this.props.driver.Name}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Social Security Number</Label>
                <Input
                  type="text"
                  id="number"
                  name="number"
                  defaultValue={this.props.driver.Ssn}
                  readOnly
                />
              </Col>
            </FormGroup>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col>
                  <Label htmlFor="text-input">Motor Carrier's Name</Label>
                  <Input
                    type="text"
                    id="Carrier"
                    name="MotorCarrier"
                    maxLength="200"
                    defaultValue={
                      this.props.company.LegalName !== undefined
                        ? this.props.company.LegalName
                        : ""
                    }
                    onKeyUp={mayus}
                    readOnly
                  />
                </Col>
                <Col>
                <Label htmlFor="DateR">Date of Review</Label>
                  <Input
                        id="DateR"
                        placeholder="Date"
                        type="date"
                        name="DateReview"
                        labelText="Date of Review"
                        required
                      />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <p>
                    {" "}
                    <label>
                      <input
                        id="Question1"
                        name="Question1"
                        type="checkbox"
                        value="Y"
                        onClick={this.onChangeCheck}
                        ref={(Question1) => (this.Question1 = Question1)}
                      />{" "}
                      The Driver meets the minimum requirements for safe
                      driving.
                    </label>
                  </p>
                </Col>
                <Col md="6">
                  <p>
                    {" "}
                    <label>
                      <input
                        id="Question2"
                        name="Question2"
                        type="checkbox"
                        value="Y"
                        onClick={this.onChangeCheck}
                        ref={(Question2) => (this.Question2 = Question2)}
                      />{" "}
                      The Driver is disqualified to drive a motor vehicle
                      pursuant to 391.15.
                    </label>
                  </p>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  {this.props.statusR === "ACTIVE" ? (
                    <Button
                      color="primary"
                      type="submit"
                      disabled={
                        this.props.isLoading ||
                        JSON.parse(localStorage.getItem("user")).Role ===
                          "DRIVER"
                          ? true
                          : false
                      }
                    >
                      Save
                    </Button>
                  ) : (
                    ""
                  )}{" "}
                </Col>
                {this.props.isLoading ? (
                  <img
                    alt="loading"
                    style={{
                      width: "140px",
                      position: "absolute",
                      marginTop: "0px",
                      right: "40%",
                    }}
                    src="../../assets/img/icons/loading2.gif"
                  />
                ) : (
                  <div />
                )}
              </FormGroup>
            </Form>
            <TableCom
              rowItems={rowItems}
              header={rep}
              count={this.props.count}
              page={this.props.page}
              getItems={(index) => {
                this.props.get(
                  this.props.id,
                  index,
                  3,
                  this.props.idLoggedUser,
                  this.props.idCompany
                );
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AnnualDmv;
