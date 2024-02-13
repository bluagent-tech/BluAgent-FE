import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Alert,
} from 'reactstrap';
import dateConvertTables from './../../../services/dateConvertTables';
import TableCom from './../../../components/Table';
import PdfEH from './../Pdf/PdfEH';
import { Link } from 'react-router-dom';
import "./cssDM/TablesPDF.css";

//BACKGROUND CHECK INTO PREVIOUS EMPLOYMENT HISTORY FORM

class BackgroundHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DateMailed: '',
      Email: undefined,
      PhoneNumberx: undefined,
      image: '',
      countryPhone: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.close = this.close.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var eh = new FormData(e.target);
    eh.append(
      'PhoneNumber',
      e.target.countryPhone.value + ' ' + e.target.PhoneNumberx.value
    );
    eh.append('IdDriver', this.props.id);
    eh.append('IdEmploymentRecord', this.props.employer.Id);
    eh.append(
      'DriverName',
      this.props.driver.Name + ' ' + this.props.driver.LastName
    );
    eh.append('ProspectiveSignature', this.state.image);
    eh.append('NewEmployerName', this.props.company.LegalName);
    eh.append(
      'NewEmployerAddress',
      this.props.company.PhysicalAddress +
        ', ' +
        this.props.company.PhysicaCity +
        ', ' +
        this.props.company.PhysicalState +
        ', ' +
        this.props.company.PhysicalZip
    );
    eh.append('IdCompany', this.props.company.Id);
    this.props.submit(eh, this.props.driver.FileSignature);
  }

  handleClick() {
    var date = new Date();
    var d = date.getDate();
    var month = date.getMonth() + 1;
    if (d < 10) {
      d = '0' + d;
    }
    if (month < 10) {
      month = '0' + month;
    }
    var f = month + '/' + d + '/' + date.getFullYear();
    this.setState({ DateMailed: f });
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
    let rep = ['EMPLOYER', 'DATE', 'E-MAIL', 'PHONE', 'LINK'];
    let rowItems = this.props.list.map((row, index) => (
      <React.Fragment>
        <tr key={index}>
        <td className='text-center'>{row.NewEmployerName}</td>
        <td className='text-center'>{dateConvertTables(row.DateMailed)}</td>
        <td className='text-center'>{row.NewEmployerEmail}</td>
        <td className='text-center'>
          {row.NewEmployerPhone ? row.NewEmployerPhone.substr(6) : ''}
        </td>
        <td className='text-center'>
          {this.props.statusR === 'INACTIVE' ? (
            '---'
          ) : row.Title === null ? (
            <Link
              to={
                '/LetterInAndEmployHis/' +
                this.props.id +
                '/' +
                row.Id +
                '/' +
                row.IdEmploymentRecord +
                '/' +
                this.props.driver.Name +
                ' ' +
                this.props.driver.LastName
              }
              className='fa fa-link font-2x2 font-2xl d-block'
              style={{ color: '#3C86FF' }}
            ></Link>
          ) : (
            'Answered'
          )}
        </td>
      </tr>
      <tr>
      <td className='text-center' colSpan={"5"}>
        <PdfEH info={row} index={row.Id}/>
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
        <h6>EMPLOYMENT HISTORY</h6>
        <Modal
          isOpen={this.props.modal}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.close}
        >
          <ModalHeader name="modal1" toggle={this.close}>
            BACKGROUND CHECK EMPLOYMENT HISTORY
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
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.close}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default BackgroundHistory;
