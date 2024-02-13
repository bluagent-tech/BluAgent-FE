import React from "react";
import {
  Button,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import TableCom from "./../../../components/Table";
import dateConvertTables from "./../../../services/dateConvertTables";
import PdfLI from "./../Pdf/PdfLI";
import { Link } from "react-router-dom";
import "./cssDM/TablesPDF.css";

class InquiryTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      DateMailed: "",
      Email: undefined,
      PhoneNumberx: undefined,
      image: "",
      countryPhone: undefined,
      closeModal: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var inq = new FormData(e.target);
    inq.append(
      "PhoneNumber",
      e.target.countryPhone.value + " " + e.target.PhoneNumberx.value
    );
    inq.append("IdDriver", this.props.id);
    inq.append("IdEmployeeRecord", this.props.employer.Id);
    inq.append("IdCompany", this.props.company.Id);
    inq.append("CompletedBySignature", this.state.image);
    inq.append("NewEmployerName", this.props.company.LegalName);
    inq.append(
      "NewEmployerAddress",
      this.props.company.PhysicalAddress +
        ", " +
        this.props.company.PhysicaCity +
        ", " +
        this.props.company.PhysicalState +
        ", " +
        this.props.company.PhysicalZip
    );
    inq.append(
      "DriverName",
      this.props.driver.Name + " " + this.props.driver.LastName
    );
    //inq.append('DateSent', getCurrentDate());
    this.props.submit(inq, this.props.driver.FileSignature);
  }

  closeModal() {
    this.setState({
      closeModal: !this.state.closeModal,
    });
  }

  handleClick() {
    var date1 = new Date();
    var d = date1.getDate();
    var month = date1.getMonth() + 1;
    if (d < 10) {
      d = "0" + d;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var f = date1.getFullYear() + "-" + month + "-" + d;
    this.setState({ date: f, DateMailed: f });
    this.props.toggle(this.props.id);
  }

  close() {
    this.setState({ Email: undefined, PhoneNumberx: undefined });
    this.props.toggle();
  }

  onChange(e) {
    var { name, value } = e.target;
    this.setState({ [name]: value });
  }
  render() {
    let rep = ["EMPLOYER", "DATE", "E-MAIL", "PHONE", "LINK"];
    let rowItems = this.props.list.map((row, index) => (
      <React.Fragment>
        <tr key={index}>
          <td className="text-center">{row.PreviousEmployerName}</td>
          <td className="text-center">{dateConvertTables(row.DateSent)}</td>
          <td className="text-center">{row.PreviousEmployerEmail}</td>
          <td className="text-center">{row.PreviousEmployerPhone.substr(3)}</td>
          <td className="text-center">
            {this.props.statusR === "INACTIVE" ? (
              "---"
            ) : row.CompletedByTitle === null ? (
              <Link
                to={
                  "/LetterIn/" +
                  this.props.id +
                  "/" +
                  row.Id +
                  "/" +
                  JSON.parse(localStorage.getItem("user")).Id
                }
                readOnly
                className="fa fa-link font-2x2 font-2xl d-block"
                style={{ color: "#3C86FF" }}
              ></Link>
            ) : (
              "Answered"
            )}
          </td>
        </tr>
        <tr>
          <td className="text-center" colSpan={"5"}>
            <PdfLI driver={this.props.driver} info={row} index={index} />
          </td>
        </tr>
      </React.Fragment>
    ));

    return (
      <div className="col-md-3">
        <input
          onClick={this.handleClick}
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
          disabled={this.props.tipoUsuario === "DRIVER" ? true : false}
        />
        <h6>LETTER OF INQUIRY</h6>
        <Modal
          isOpen={this.props.modal}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.close}
        >
          <ModalHeader name="modal1" toggle={this.close}>
            LETTER OF INQUIRY INTO DRUG AND ALCOHOL TESTING{" "}
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
            <TableCom
              rowItems={rowItems}
              header={rep}
              count={this.props.count}
              page={this.props.page}
              getItems={(index) => {
                this.props.get(this.props.id, index, 3);
              }}
              driver={this.props.driver}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.toggle}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default InquiryTest;
