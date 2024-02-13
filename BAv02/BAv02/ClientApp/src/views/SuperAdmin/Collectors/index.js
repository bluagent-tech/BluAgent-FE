import React, { Fragment, Component, lazy } from "react";
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
  Row,
} from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Switch from "react-switch";
import "react-google-places-autocomplete/dist/index.min.css";

const WidgetSimple = lazy(() =>
  import("./../../../views/Widgets/WidgetSimple")
);
const superAdminRole = JSON.parse(localStorage.getItem("user")).Role;

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
    name: "Middle Name",
    selector: "middleName",
    sortable: true,
  },
  {
    name: "Last Name",
    selector: "lastName",
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: "phoneNumber",
    sortable: true,
  },
  {
    name: "Address",
    selector: "address",
    sortable: true,
  },
  /*    {
        name: "Discriminator",
        selector: "discriminator",
        sortable: true,
    },*/
  {
    name: "Collection Site",
    selector: "discriminator", //collectionSiteId
    sortable: true,
  },
  /*    {
        name: "Alcohol Testing Allowed",
        selector: "alcoholTestingAllowed",
        sortable: true,
    },
    {
        name: "Drug Testing Allowed",
        selector: "drugTestingAllowed",
        sortable: true,
    }*/
];

class Collectors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      middleName: "",
      address: "",
      phoneNumber: "",
      discriminator: "",
      collectionSiteId: "",
      alcoholTestingAllowed: false,
      drugTestingAllowed: false,
      isActive: false,
      isArchived: false,
      archivedByUserId: "",
      collectionSite: [],
      search: "",
      drugTestTotal: [],
      drugTestCompleted: [],
      drugTestInitialized: [],
      drugTestScheduled: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAllCollectors = this.getAllCollectors.bind(this);
    this.getAllCollectionSite = this.getAllCollectionSite.bind(this);
    this.getAllActiveCollectors = this.getAllActiveCollectors.bind(this);
    this.getAllInactiveCollectors = this.getAllInactiveCollectors.bind(this);
    this.getSearchCollectors = this.getSearchCollectors.bind(this);
    this.getDrugTestTotal = this.getDrugTestTotal.bind(this);
    this.getDrugTestCompleted = this.getDrugTestCompleted.bind(this);
    this.getDrugTestInitialized = this.getDrugTestInitialized.bind(this);
    this.getDrugTestScheduled = this.getDrugTestScheduled.bind(this);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeMiddleName = this.handleChangeMiddleName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleChangeCollectionSiteId = this.handleChangeCollectionSiteId.bind(
      this
    );
    this.handleChangeAlcoholTestingAllowed = this.handleChangeAlcoholTestingAllowed.bind(
      this
    );
    this.handleChangeDrugTestingAllowed = this.handleChangeDrugTestingAllowed.bind(
      this
    );
    this.handleChangeIsActive = this.handleChangeIsActive.bind(this);
    this.handleChangeIsArchived = this.handleChangeIsArchived.bind(this);
    this.handleChangeArchivedByUserId = this.handleChangeArchivedByUserId.bind(
      this
    );
    this.handleChangeSeachCollector = this.handleChangeSeachCollector.bind(
      this
    );
  }

  //Action Handlers
  componentDidMount() {
    this.getAllCollectors();
    this.getAllCollectionSite();

    this.getDrugTestTotal();
    this.getDrugTestCompleted();
    this.getDrugTestScheduled();
    this.getDrugTestInitialized();
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeMiddleName = (event) => {
    this.setState({
      middleName: event.target.value,
    });
  };

  handleChangeLastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  handleChangePhoneNumber = (event) => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };

  handleChangeDiscriminator = (event) => {
    this.setState({
      discriminator: event.target.value,
    });
  };

  handleChangeCollectionSiteId = (event) => {
    this.setState({
      collectionSiteId: event.target.value,
    });
  };

  handleChangeAlcoholTestingAllowed(alcoholTestingAllowed) {
    this.setState({ alcoholTestingAllowed });
  }

  handleChangeDrugTestingAllowed(drugTestingAllowed) {
    this.setState({ drugTestingAllowed });
  }

  handleChangeIsActive(isActive) {
    this.setState({ isActive });
  }

  handleChangeIsArchived(isArchived) {
    this.setState({ isArchived });
  }

  handleChangeArchivedByUserId = (event) => {
    this.setState({
      archivedByUserId: event.target.value,
    });
  };

  handleChangeSeachCollector = (event) => {
    this.setState({
      search: event.target.value,
    });
    this.getSearchCollectors(event.target.value);
  };

  //Fetch Methods
  getAllCollectors() {
    let url = "/api/Collector/GetAllCollectors";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectors: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllCollectionSite() {
    let url = "/api/CollectionSite/GetAllCollectionSites";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectionSite: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllActiveCollectors() {
    let url = "/api/Collector/GetAllActiveCollectors";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectors: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllInactiveCollectors() {
    let url = "/api/Collector/GetAllInactiveCollectors";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectors: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getSearchCollectors(search) {
    let url = "/api/Collector/GetSearchCollectors";
    axios
      .get(url, { params: { search: search } })
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectors: response,
        });
      })
      .catch((error) => console.log(error));
  }

  //DRUG TESTS

  getDrugTestTotal() {
    let url = "api/DrugAndAlcoholTesting/getDrugTestTotal";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          drugTestTotal: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getDrugTestCompleted() {
    let url = "api/DrugAndAlcoholTesting/getDrugTestCompleted";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          drugTestCompleted: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getDrugTestInitialized() {
    let url = "api/DrugAndAlcoholTesting/getDrugTestInitialized";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          drugTestInitialized: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getDrugTestScheduled() {
    let url = "api/DrugAndAlcoholTesting/getDrugTestScheduled";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          drugTestScheduled: response,
        });
      })
      .catch((error) => console.log(error));
  }

  //INSERT COLLECTOR FORM
  handleSubmit(e) {
    e.preventDefault();

    const collector = {
      name: this.state.name,
      lastName: this.state.lastName,
      middleName: this.state.middleName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      collectionSiteId: this.state.collectionSiteId,
      alcoholTestingAllowed: this.state.alcoholTestingAllowed,
      drugTestingAllowed: this.state.drugTestingAllowed,
      isActive: this.state.isActive,
      isArchived: this.state.isArchived,
      archivedByUserId: this.state.archivedByUserId,
    };
    axios
      .post("/api/Collector/InsertCollector", collector)
      .then((response) => {
        this.setState({
          name: "",
          lastName: "",
          middleName: "",
          address: "",
          phoneNumber: "",
          discriminator: "",
          collectionSiteId: "",
          alcoholTestingAllowed: "",
          drugTestingAllowed: "",
          isActive: "",
          isArchived: "",
          archivedByUserId: "",
        });
        this.toggleModal();
        alert("Collector created successfully");
        this.getAllCollectionSite();
      })
      .catch((err) => {
        alert("Error creating Collector");
        this.toggleModal();
      });
  }
//collector index
  render() {
    const { collectors } = this.state;
    if (superAdminRole === "SUPERADMIN") {
      return (
        <Fragment>
          <Row xs="2" sm="4" lg="4">
            <WidgetSimple
              icon="fa fa-wpforms"
              header={this.state.drugTestTotal + " Total Drug Tests"}
            ></WidgetSimple>
            <WidgetSimple
              icon="fa fa-check-square-o"
              header={this.state.drugTestCompleted + " Completed Drug Tests"}
            ></WidgetSimple>
            <WidgetSimple
              icon="fa fa-calendar"
              header={this.state.drugTestScheduled + " Scheduled Drug Tests"}
            ></WidgetSimple>
            <WidgetSimple
              icon="fa fa-calendar-plus-o"
              header={
                this.state.drugTestInitialized + " Initialized Drug Tests"
              }
            ></WidgetSimple>
                        <WidgetSimple
              icon="fa fa-calendar-plus-o"
              header={
                this.state.drugTestInitialized + " Initialized Drug Tests"
              }
            ></WidgetSimple>
          </Row>

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
                          placeholder="Search Collector"
                          value={this.state.search}
                          onChange={this.handleChangeSeachCollector}
                        ></Input>
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col>
                    <div className="float-right">
                      <ButtonGroup>
                        <Button
                          color="primary"
                          onClick={this.getAllInactiveCollectors}
                        >
                          View Inactive
                        </Button>
                        <Button color="primary" onClick={this.getAllCollectors}>
                          View All
                        </Button>
                        <Button
                          color="primary"
                          onClick={this.getAllActiveCollectors}
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

                <Modal //INSERT COLLECTOR
                  size="lg"
                  isOpen={this.state.showModal}
                  toggle={this.toggleModal}
                >
                  <ModalHeader toggle={this.toggleModal}>
                    Create Collector
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
                            <Label>Middle Name</Label>
                            <Input
                              name="middleName"
                              id="middleName"
                              value={this.state.middleName}
                              onChange={this.handleChangeMiddleName}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Last Name</Label>
                            <Input
                              name="lastName"
                              id="lastName"
                              placeholder=""
                              value={this.state.lastName}
                              onChange={this.handleChangeLastName}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={8}>
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
                        <Col>
                          <FormGroup>
                            <Label>Phone Number</Label>
                            <Input
                              name="phoneNumber"
                              id="phoneNumber"
                              value={this.state.phoneNumber}
                              onChange={this.handleChangePhoneNumber}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <FormGroup>
                            <Label>Collection Site</Label>
                            <Input
                              type="select"
                              name="collectionSiteId"
                              id="collectionSiteId"
                              onChange={this.handleChangeCollectionSiteId}
                              value={this.state.collectionSiteId}
                            >
                              <option>Select Collection Site...</option>
                              {this.state.collectionSite.map(
                                (collectionSite) => (
                                  <option
                                    key={collectionSite.id}
                                    value={collectionSite.id}
                                  >
                                    {collectionSite.name}
                                  </option>
                                )
                              )}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>Alcohol Testing</Label>
                            <br />
                            <Switch
                              onChange={this.handleChangeAlcoholTestingAllowed}
                              checked={this.state.alcoholTestingAllowed}
                            ></Switch>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Drug Testing</Label>
                            <br />
                            <Switch
                              onChange={this.handleChangeDrugTestingAllowed}
                              checked={this.state.drugTestingAllowed}
                            ></Switch>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Is Active</Label>
                            <br />
                            <Switch
                              onChange={this.handleChangeIsActive}
                              checked={this.state.isActive}
                            ></Switch>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Is Archived</Label>
                            <br />
                            <Switch
                              onChange={this.handleChangeIsArchived}
                              checked={this.state.isArchived}
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
                        Create Collector
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
                data={collectors}
                pagination
              ></DataTable>
            </CardBody>
          </Card>
        </Fragment>
      );
    } else {
      return <p></p>; //YOU ARE NOT SUPER ADMIN
    }
  }
}

export default Collectors;
