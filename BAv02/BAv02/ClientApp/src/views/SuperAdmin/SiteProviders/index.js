// Import Libraries
import React, { Fragment, Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  Label,
  FormGroup,
  ButtonGroup,
  Form,
  Row
} from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Switch from "react-switch";

// Declares Variables

const columns = [
  {
    name: "#",
    selector: "id",
    sortable: true,
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Fein",
    selector: "fein",
    sortable: true,
  },
  {
    name: "ABI",
    selector: "alternateBussinessIdentifier",
    sortable: true,
  },
  {
    name: "Address",
    selector: "address",
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: "phoneNumber",
    sortable: true,
  },
  {
    name: "Fax Number",
    selector: "faxNumber",
    sortable: true,
  },
  {
    name: "Options",
    cell: () => <Button>Archived</Button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
const superAdminRole = JSON.parse(localStorage.getItem("user")).Role;

class SiteProviders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fein: "",
      alternateBussinessIdentifier: "",
      address: "",
      phoneNumber: "",
      faxNumber: "",
      isActive: true,
      isAchived: false,
      dateArchived: "",
      dateCreated: "",
      dateModifed: "",
      archivedByUserId: 1,
      providers: [],
      error: "",
      showModal: false,
      activeChecked: true,
      getAllActive: false,
      searchProvider: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRowClicked = this.handleRowClicked.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeFein = this.handleChangeFein.bind(this);
    this.handleChangeABI = this.handleChangeABI.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeFax = this.handleChangeFax.bind(this);
    this.handleChangeActive = this.handleChangeActive.bind(this);
    this.handleChangeAchived = this.handleChangeAchived.bind(this);
    this.getAllActiveProviders = this.getAllActiveProviders.bind(this);
    this.getProviders = this.getProviders.bind(this);
    this.getAllInactiveProviders = this.getAllInactiveProviders.bind(this);
    this.handlerSeachProbiderDataTable = this.handlerSeachProbiderDataTable.bind(
      this
    );
  }

  // Action Handlers
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount() {
    this.getProviders();
  }

  handleChangeActive(activeChecked) {
    this.setState({ activeChecked });
  }

  handleChangeAchived(isAchived) {
    this.setState({ isAchived });
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleChangeFein = (event) => {
    this.setState({
      fein: event.target.value,
    });
  };
  handleChangeABI = (event) => {
    this.setState({
      alternateBussinessIdentifier: event.target.value,
    });
  };

  handleChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  handleChangePhone = (event) => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };

  handleChangeFax = (event) => {
    this.setState({
      faxNumber: event.target.value,
    });
  };

  handleChangedateArchived = (event) => {
    this.setState({
      isActive: event.target.value,
    });
  };

  handleChangeDateCreated = (event) => {
    this.setState({
      dateCreated: event.target.value,
    });
  };

  handleChangeEdited = (event) => {
    this.setState({
      dateModifed: event.target.value,
    });
  };

  handlerSeachProbiderDataTable = (event) => {
    this.setState({
      searchProvider: event.target.value,
    });
  };

  // fetch Methods
  getProviders() {
    let url = "/api/Provider/GetAllProviders";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          providers: response,
        });
      })
      .catch((error) => console.log(error));
  }

  handleSubmit(e) {
    e.preventDefault();

    const provider = {
      name: this.state.name,
      fein: this.state.fein,
      alternateBussinessIdentifier: this.state.alternateBussinessIdentifier,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      faxNumber: this.state.faxNumber,
      isActive: this.state.isActive,
      isAchived: this.state.isAchived,
      dateArchived: this.state.dateArchived,
      dateCreated: this.state.dateCreated,
      dateModifed: this.state.dateModifed,
      archivedByUserId: this.state.archivedByUserId,
    };
    axios
      .post("/api/Provider/InsertProvider", provider)
      .then((response) => {
        this.setState({
          name: "",
          fein: "",
          alternateBussinessIdentifier: "",
          address: "",
          phoneNumber: "",
          faxNumber: "",
          isActive: "",
          isAchived: "",
          dateArchived: "",
          dateCreated: "",
          dateModifed: "",
          archivedByUserId: "",
        });
        this.toggleModal();
        this.getProviders();
      })
      .catch((err) => {
        this.toggleModal();
      });
  }

  getAllInactiveProviders() {
      let url = "/api/Provider/GetAllInactiveProviders";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          providers: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllActiveProviders() {
    let url = "/api/Provider/GetAllActiveProviders";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          providers: response,
        });
      })
      .catch((error) => console.log(error));
  }

  editProvider = (event) => {
    event.preventDefault();
    let id = 0;
    axios
      .put(`/api/Provider/UpdateProvider${id}`, this.state)
      .then((result) => {
        this.setState({
          response: result,
        });
      })
      .catch((error) => console.log(error));
  };

  handleRowClicked = (row) => {
    window.location.replace("/#/providers-profile/" + row.id);
  };

  render() {
    if (superAdminRole === "SUPERADMIN") {
      const { providers } = this.state;
      return (
        <Card>
          <CardBody>
            <Fragment>
              <Row>
                <Col>
                  <Form>
                    <FormGroup>
                      <Input
                        name="search"
                        id="search"
                        placeholder="Search Provider"
                        value={this.state.searchProvider}
                        onChange={this.handlerSeachProbiderDataTable}
                      ></Input>
                    </FormGroup>
                  </Form>
                </Col>
                <Col>
                  <div className="float-right">
                    <ButtonGroup>
                      <Button
                        color="primary"
                        onClick={this.getAllInactiveProviders}
                      >
                        View Inactive
                      </Button>
                      <Button color="primary" onClick={this.getProviders}>
                        View All
                      </Button>
                      <Button
                        color="primary"
                        onClick={this.getAllActiveProviders}
                      >
                        View Active
                      </Button>
                    </ButtonGroup>
                  </div>
                  <br></br>
                  <br></br>
                  <Button
                    className="float-right"
                    style={{
                      borderRadius: 100,
                      height: 50,
                      width: 50,
                      fontSize: 16,
                    }}
                    color="primary"
                    onClick={this.toggleModal}
                  >
                    +
                  </Button>
                </Col>
              </Row>

              <Modal
                size="lg"
                isOpen={this.state.showModal}
                toggle={this.toggleModal}
              >
                <ModalHeader toggle={this.toggleModal}>
                  Create Provider
                </ModalHeader>
                <Form onSubmit={this.handleSubmit}>
                  <ModalBody>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            name="name"
                            id="name"
                            placeholder=""
                            value={this.state.name}
                            onChange={this.handleChangeName}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>FEIN</Label>
                          <Input
                            name="fein"
                            id="fein"
                            placeholder=""
                            value={this.state.fein}
                            onChange={this.handleChangeFein}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>Alternate Bussiness Identifier</Label>
                          <Input
                            name="alternateBussinessIdentifier"
                            id="alternateBussinessIdentifier"
                            value={this.state.alternateBussinessIdentifier}
                            onChange={this.handleChangeABI}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Address</Label>
                          <Input
                            name="address"
                            id="address"
                            value={this.state.address}
                            onChange={this.handleChangeAddress}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Phone Number</Label>
                          <Input
                            name="phoneNumber"
                            id="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handleChangePhone}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>Fax Number</Label>
                          <Input
                            name="faxNumber"
                            id="faxNumber"
                            value={this.state.faxNumber}
                            onChange={this.handleChangeFax}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Is Active</Label>
                          <br />
                          <Switch
                            onChange={this.handleChangeActive}
                            checked={this.state.activeChecked}
                          ></Switch>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>Is Archived</Label>
                          <br />
                          <Switch
                            onChange={this.handleChangeAchived}
                            checked={this.state.isAchived}
                          ></Switch>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={{ display: "none" }}>
                      <Col>
                        <FormGroup>
                          <Input
                            type="text"
                            name="dateArchived"
                            id="dateArchived"
                            value={this.state.dateArchived}
                            onChange={this.handleChangedateArchived}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            type="text"
                            name="dateCreated"
                            id="dateCreated"
                            value={this.state.dateCreated}
                            onChange={this.handleChangeDateCreated}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            type="text"
                            name="dateModifed"
                            id="dateModifed"
                            value={this.state.dateModifed}
                            onChange={this.handleChangeEdited}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" color="primary">
                      Create
                    </Button>
                    <Button color="secondary" onClick={this.toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              </Modal>
            </Fragment>
            <DataTable
              responsive={true}
              onRowClicked={this.handleRowClicked}
              columns={columns}
              data={providers}
              pagination
            ></DataTable>
          </CardBody>
        </Card>
      );
    } else {
      return <p>YOU ARE NOT SUPER ADMIN</p>;
    }
  }
}

export default SiteProviders;
