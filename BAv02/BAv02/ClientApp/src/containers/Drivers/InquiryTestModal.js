import React, { Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Input,
  UncontrolledTooltip,
  Form,
} from 'reactstrap';
import dateConvertTables from './../../services/dateConvertTables';
import getCurrentDate from './../../services/getCurrentDate';
import NumberFormat from 'react-number-format';
import DatePicker from './../../components/DatePicker';

class InquiryTestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      DateMailed: '',
      Email: undefined,
      PhoneNumberx: undefined,
      image: '',
      countryPhone: undefined,
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
      'PhoneNumber',
      e.target.countryPhone.value + ' ' + e.target.PhoneNumberx.value
    );
    inq.append('IdDriver', this.props.id);
    inq.append('IdEmployeeRecord', this.props.employer.Id);
    inq.append('IdCompany', this.props.company.Id);
    inq.append('CompletedBySignature', this.state.image);
    inq.append('NewEmployerName', this.props.company.LegalName);
    inq.append(
      'NewEmployerAddress',
      this.props.company.PhysicalAddress +
        ', ' +
        this.props.company.PhysicaCity +
        ', ' +
        this.props.company.PhysicalState +
        ', ' +
        this.props.company.PhysicalZip
    );
    inq.append(
      'DriverName',
      this.props.driver.Name + ' ' + this.props.driver.LastName
    );
    //inq.append('DateSent', getCurrentDate());
    this.props.submit(inq, this.props.driver.FileSignature);
  }

  handleClick() {
    var date1 = new Date();
    var d = date1.getDate();
    var month = date1.getMonth() + 1;
    if (d < 10) {
      d = '0' + d;
    }
    if (month < 10) {
      month = '0' + month;
    }
    var f = date1.getFullYear() + '-' + month + '-' + d;
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
    return (
      <Fragment>
        <button
          onClick={this.handleClick}
          type="button"
          className="btn btn-primary float-right text-dark text-uppercase mr-5"
          alt="Submit"
          height="100"
          width="100"
        >
          send new letter inquiry
        </button>
        <h6>LETTER OF INQUIRY</h6>
        <Modal
          isOpen={this.props.modal}
          className={"modal-lg "}
          backdrop={"static"}
          toggle={this.close}
        >
          <ModalHeader name="modal1" toggle={this.close}>
            LETTER OF INQUIRY INTO DRUG AND ALCOHOL TESTING{" "}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md="12">
                  <Label
                    style={{
                      fontWeight: "bold",
                      borderBottom: "1px solid grey",
                      paddingLeft: "10px",
                      width: "100%",
                    }}
                  >
                    PROSPECTIVE EMPLOYER
                  </Label>
                </Col>
              </FormGroup>
              <FormGroup row>
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
              </FormGroup>
              <FormGroup row>
                <Col md="12">
                  <Label
                    style={{
                      fontWeight: "bold",
                      borderBottom: "1px solid grey",
                      paddingLeft: "10px",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    PREVIOUS EMPLOYER INFORMATION
                  </Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="12">
                  <Input
                    type="text"
                    id="above"
                    name="above"
                    defaultValue={this.props.employer.EmployerName}
                    style={{ marginTop: "10px" }}
                    readOnly
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    defaultValue={this.props.employer.Address}
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">State</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    defaultValue={this.props.employer.State}
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    defaultValue={this.props.employer.City}
                    readOnly
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Zip Code</Label>
                  <Input
                    type="text"
                    id="zip"
                    name="zip"
                    defaultValue={this.props.employer.Zip}
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Telephone Number</Label>
                  <Input
                    type="text"
                    id="day"
                    name="day"
                    defaultValue={this.props.employer.Telephone}
                    readOnly
                  />
                </Col>
                <DatePicker
                  id="DateMailed"
                  name="DateMailed"
                  labelText="Date Of Driver's Authorization"
                  value={dateConvertTables(this.props.employer.DateTo)}
                />
              </FormGroup>
              {this.props.statusR !== "ACTIVE" ? (
                <div>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">
                        Date
                        <i
                          id="currentDate"
                          className="icon-question"
                          style={{ marginLeft: "5px", color: "grey" }}
                        ></i>
                        <UncontrolledTooltip
                          placement="right"
                          target="currentDate"
                        >
                          This is the date the Letter of Inquiry was sent to the
                          previous employer.
                        </UncontrolledTooltip>
                      </Label>
                      <DatePicker
                        id="date"
                        name="DateSent"
                        value={dateConvertTables(getCurrentDate())}
                      />
                    </Col>
                    <Col md="9">
                      <Label htmlFor="text-input">Email</Label>
                      <Input
                        type="text"
                        id="Email"
                        name="Email"
                        maxLength="50"
                        value={
                          this.state.Email === undefined
                            ? this.props.employer.Email
                            : this.state.Email
                        }
                        onChange={this.onChange}
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="text-input">Telephone Number</Label>
                      <div className="form-inline">
                        <select
                          style={{ width: "30%" }}
                          value={
                            this.state.countryPhone !== undefined
                              ? this.state.countryPhone
                              : this.props.employer.Telephone !== undefined &&
                                this.props.employer.Telephone !== null
                              ? this.props.employer.Telephone.substr(0, 6)
                              : "US +1"
                          }
                          className="form-control"
                          name="countryPhone"
                          onChange={this.onChange}
                        >
                          <option value="US +1">US +1</option>
                          <option value="MX +52">MX +52</option>
                          <option value="CAN +1">CAN +1</option>
                        </select>
                        <NumberFormat
                          style={{ width: "70%" }}
                          format="(###) ###-####"
                          placeholder="(---) --- ----"
                          mask="_"
                          className="form-control"
                          name="PhoneNumberx"
                          value={
                            this.state.PhoneNumberx === undefined &&
                            this.props.employer.Telephone !== undefined
                              ? this.props.employer.Telephone.substr(6)
                              : this.state.PhoneNumberx
                          }
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </Col>
                    <Col md="6">
                      <Label htmlFor="text-input">
                        Comment
                        <i
                          id="comment"
                          className="icon-question"
                          style={{ marginLeft: "5px", color: "grey" }}
                        ></i>
                        <UncontrolledTooltip placement="right" target="comment">
                          Please add a comment if the person in contact didn't
                          anwer.
                        </UncontrolledTooltip>
                      </Label>
                      <select className="form-control" name="Comment">
                        <option value="Letter of Inquiry Completed by Email">
                          Letter of Inquiry Completed by Email
                        </option>
                        <option value="Letter of Inquiry Completed by Phone">
                          Letter of Inquiry Completed by Phone
                        </option>
                        <option value="No response">No response</option>
                        <option value="Other">Other</option>
                      </select>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
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
                </div>
              ) : (
                ""
              )}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.close}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default InquiryTestModal;
