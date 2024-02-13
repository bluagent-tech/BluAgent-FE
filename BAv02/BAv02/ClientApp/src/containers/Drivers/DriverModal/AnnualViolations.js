import React from 'react';
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
  Form,
  Alert,
} from 'reactstrap';
import mayus from './../../../services/mayus';
import TableCom from './../../../components/Table';
import PdfCV from './../Pdf/PdfCV';
import dateConvertTables from './../../../services/dateConvertTables';
import DatePicker from './../../../components/DatePicker';
import "./cssDM/TablesPDF.css";

//ANNUAL DRIVERS CERTIFICATION OF VIOLATIONS

class AnnualViolations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cert: 0,
      image: '',
      imageA: '',
      Location: '',
      Offense: '',
      TypeVehicleOperated: '',
      ViolationDate: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
    this.open = this.open.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.disbleButton = this.disbleButton.bind(this);
    this.handleSelectVihicleType = this.handleSelectVihicleType.bind(this);
    this.handleOffense = this.handleOffense.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }

  changeValue(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  }

  disbleButton(e) {
    this.setState({
      Location: e.target.value,
    });
  }

  handleOffense(e) {
    this.setState({
      Offense: e.target.value,
    });
  }

  dateChange(e) {
    this.setState({
      ViolationDate: e.target.value,
    });
  }

  handleSelectVihicleType(e) {
    e.preventDefault();
    this.setState({
      TypeVehicleOperated: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ cert: 0 });
    var cv = new FormData(e.target);
    cv.append('IdDriver', this.props.id);
    this.props.submit(cv);
  }

  handleApprove(e) {
    e.preventDefault();
    this.setState({ cert: 1 });
    var c = new FormData();
    c.append('id', this.props.id);
    this.props.submitC(
      c,
      this.props.company.FileSignature,
      this.props.driver.FileSignature
    );
  }

  open() {
    var canvas = document.getElementById('admin');
    var img = new Image();
    img.src =
      'assets/img/Images/signatures/' + this.props.company.FileSignature;
    img.onload = () => {
      canvas.getContext('2d').drawImage(img, 0, 0);
      this.setState({ imageA: canvas.toDataURL() });
    };
    this.props.toggle(this.props.id);
  }

  render() {
    let rep = ['DATE', 'OFFENSE', 'LOCATION'];
    let repC = ['DATE', 'COMPANY'];

    let rowItems = this.props.list.map((row, index) => (
      <tr key={index}>
        <td className='text-center'>{dateConvertTables(row.ViolationDate)}</td>
        <td className='text-center'>{row.Offense}</td>
        <td className='text-center'>{row.Location}</td>
      </tr>
    ));

    let rowItemsC = this.props.listC.map((row, index) => (
      <React.Fragment>
        <tr key={index}>
        <td className='text-center'>
          {dateConvertTables(row[0].CertificationDate)}
        </td>
        <td className='text-center'>{row[0].Company}</td>
      </tr>
      <tr>
        <td className='text-center' colSpan={"2"}>
          <PdfCV
            driver={this.props.driver}
            info={row}
            index={index}
            img={this.state.image}
            imageA={this.state.imageA}
            company={this.props.company}
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
          src="assets/icons/icons8-renew.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-renew.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-renew.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>CERTIFICATION OF VIOLATIONS</h6>
        <canvas
          id="admin"
          style={{ display: "none" }}
          width={320}
          height={180}
        />

        <Modal
          isOpen={this.props.modal}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.props.toggle}
        >
          <ModalHeader name="modal1" toggle={this.props.toggle}>
            ANNUAL DRIVER'S CERTIFICATION OF VIOLATIONS
          </ModalHeader>
          <ModalBody>
            <Alert
              style={{
                backgroundColor: "#dff0fe",
                borderLeft: "4px solid #dff0fe",
                borderColor: "#4788c7",
                color: "#4788c7",
                padding: "15px 20px",
              }}
            >
              Notice: <i className="fas fa-exclamation-circle"></i> If the
              driver does not have any violation write N/A or Select N/A in the
              selection field before Approving
            </Alert>
            {this.props.statusR === "ACTIVE" ? (
              <div>
                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">
                      I Certify that the following is a true and complete list
                      of traffic violations (other than parking violations) for
                      which I have been convicted or forfeited bond or
                      collateral during the past 12 months.
                    </Label>
                  </Col>
                </FormGroup>
                <Form id="formV" name="formV" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Col>
                    <Label htmlFor="ViolationDate">
                      Date
                    </Label>
                      <Input
                        id="ViolationDate"
                        placeholder="Date"
                        type="date"
                        name="ViolationDate"
                        labelText="Date"
                        value={this.state.ViolationDate}
                        onChange={this.dateChange}
                        required
                      />
                    </Col>
                    <Col md="6">
                      <Label htmlFor="Offense">Offense</Label>
                      <Input
                        type="text"
                        id="Offense"
                        name="Offense"
                        maxLength="200"
                        onKeyUp={mayus}
                        required
                        placeholder="if the driver doesn't have any offense, type N/A"
                        value={this.state.Offense}
                        onChange={this.handleOffense}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Label htmlFor="Location">Location</Label>
                      <Input
                        type="text"
                        id="Location"
                        name="Location"
                        maxLength="150"
                        onKeyUp={mayus}
                        required
                        placeholder="if the driver doesn't have any Location, type N/A"
                        onChange={this.disbleButton}
                        value={this.state.Location}
                      />
                    </Col>
                    <Col md="6">
                      <Label htmlFor="TypeVo">Type of Vehicle Operated</Label>

                      <Input
                        type="select"
                        name="TypeVehicleOperated"
                        className="form-control"
                        required
                        value={this.state.TypeVehicleOperated}
                        onChange={this.handleSelectVihicleType}
                      >
                        <option value="">select</option>
                        <option value="N/A">N/A</option>
                        <option value="Truck ">Truck</option>
                        <option value="Tow Truck">Tow Truck</option>
                        <option value="Semi-Trailer Truck">
                          Semi-Trailer Truck
                        </option>
                        <option value="Box Truck">Box Truck</option>
                        <option value="Flatbed Truck">Flatbed Truck</option>
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="Bus">Bus</option>
                        <option value="Pick-Up">Pick-Up</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6">
                      <Button color="primary" type="submit">
                        Save
                      </Button>{" "}
                    </Col>
                    {this.props.isLoading && this.state.cert === 0 ? (
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
                <TableCom
                  rowItems={rowItems}
                  header={rep}
                  count={this.props.count}
                  page={this.props.page}
                  getItems={(index) => {
                    this.props.get(this.props.id, index, 3);
                  }}
                />
                <FormGroup row>
                  <Col md="12">
                    <Label htmlFor="text-input">
                      If no violations are listed above, I certify that I have
                      not been convicted or forfeited bond or collateral on
                      account of any violation required to be listed during the
                      past 12 months.
                    </Label>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Button
                      color="success"
                      onClick={this.handleApprove}
                      disabled={
                        this.props.isLoading ||
                        this.state.Location === "" ||
                        this.state.Offense === "" ||
                        this.state.TypeVehicleOperated === "" ||
                        JSON.parse(localStorage.getItem("user")).Role ===
                          "DRIVER"
                          ? true
                          : false
                      }
                    >
                      Approve
                    </Button>{" "}
                  </Col>
                  {this.props.isLoading && this.state.cert === 1 ? (
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
            <TableCom
              rowItems={rowItemsC}
              header={repC}
              count={this.props.countC}
              page={this.props.pageC}
              getItems={(index) => {
                this.props.getC(this.props.id, index, 3);
              }}
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

export default AnnualViolations;
