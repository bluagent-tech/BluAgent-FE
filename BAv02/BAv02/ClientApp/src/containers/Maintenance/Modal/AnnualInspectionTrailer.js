import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  CustomInput,
  Card,
  CardBody,
  CardHeader,
  Table,
  Badge,
} from "reactstrap";
import DatePicker from "../../../components/DatePicker";
import base64ToByteArray2 from "../../../services/base64ToByteArray2";

class AnnualInspectionTrailer extends React.Component {
  constructor(props) {
    super(props);
    this.readFileF = this.readFileF.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false, File: [] };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  readFileF(e) {
    var input = e.target;
    var nameFile = input.files[0].name.substr(-4);
    if (input) {
      var reader = new FileReader();
      var pdf = "";
      reader.onload = (e) => {
        pdf = base64ToByteArray2(e.target.result);
        if (nameFile === ".pdf") {
          document.getElementById("error").style.display = "none";
          this.setState({ File: pdf });
        } else {
          document.getElementById("error").style.display = "inline-block";
          this.setState({ File: "" });
        }
      };

      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) {}
    }
  }

  render() {
    return (
      <div className="col-md-3">
        <input
          type="image"
          onClick={this.toggle}
          className="img-responsive"
          src="assets/img/dashboard/back/maintenance/annualt1.png"
          onMouseOver={(e) =>
            (e.currentTarget.src =
              "/assets/img/dashboard/front/maintenance/annualt.png")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src =
              "assets/img/dashboard/back/maintenance/annualt1.png")
          }
          alt="Submit"
          height="100"
          width="100"
        />
        <h6>State Inspection</h6>
        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="modal1" toggle={this.toggle}>
            DRIVER VEHICLE INSPECTION REPORT
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">DVIR Form</Label>
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
                  type="file"
                  id="file"
                  name="File"
                  accept=".pdf"
                  onChange={this.readFileF}
                />
              </Col>
              <DatePicker id="date" name="date" labelText="Date" />
            </FormGroup>
            <FormGroup row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify" />
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>DVIR</th>
                          <th>Date registered</th>
                          <th>View</th>
                          <th>Cancel</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Samppa Nori</td>
                          <td>2012/01/01</td>
                          <td>Member</td>
                          <td>
                            <Badge color="success">Active</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td>Estavan Lykos</td>
                          <td>2012/02/01</td>
                          <td>Staff</td>
                          <td>
                            <Badge color="danger">Banned</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td>Chetan Mohamed</td>
                          <td>2012/02/01</td>
                          <td>Admin</td>
                          <td>
                            <Badge color="secondary">Inactive</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td>Derick Maximinus</td>
                          <td>2012/03/01</td>
                          <td>Member</td>
                          <td>
                            <Badge color="warning">Pending</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td>Friderik Dávid</td>
                          <td>2012/01/21</td>
                          <td>Staff</td>
                          <td>
                            <Badge color="success">Active</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" onClick={this.toggle}>
              Save
            </Button>{" "}
            <Button outline color="primary" onClick={this.toggle}>
              Cancel
            </Button>{" "}
            <Button outline color="success" onClick={this.toggleLarge}>
              View
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AnnualInspectionTrailer;
