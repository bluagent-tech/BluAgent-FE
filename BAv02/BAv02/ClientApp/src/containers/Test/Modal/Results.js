import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  Badge,
} from "reactstrap";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className="col-md-3">
        <input
          type="image"
          onClick={this.toggle}
          className="img-responsive"
          src="assets/img/dashboard/back/test/resultslab1.png"
          onMouseOver={(e) =>
            (e.currentTarget.src =
              "/assets/img/dashboard/front/test/resultslab.png")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src =
              "assets/img/dashboard/back/test/resultslab1.png")
          }
          alt="Submit"
          height="100"
          width="100"
        />
        <h6>TESTING RESULTS</h6>

        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="modal1" toggle={this.toggle}>
            CONTROLLED SUBSTANCES TEST RESULTS
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>
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
            <Button outline color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Results;
