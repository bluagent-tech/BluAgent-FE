// Import Libraries
import React, { Fragment, Component } from 'react';
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
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Switch from 'react-switch';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

// Declares Variables
const userId = JSON.parse(localStorage.getItem('user')).Id;
const columns = [
  {
    name: '#',
    selector: 'id',
    sortable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Fein',
    selector: 'fein',
    sortable: true,
  },
  {
    name: 'ABI',
    selector: 'alternateBussinessIdentifier',
    sortable: true,
  },
  {
    name: 'Address',
    selector: 'address',
    sortable: true,
  },
  {
    name: 'Phone Number',
    selector: 'phoneNumber',
    sortable: true,
  },
  {
    name: 'Fax Number',
    selector: 'faxNumber',
    sortable: true,
  },
  {
    name: 'Options',
    cell: () => <Button>Archived</Button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

class CollectionSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fein: '',
      alternateBussinessIdentifier: '',
      address: '',
      phoneNumber: '',
      faxNumber: '',
      isActive: true,
      isArchived: false,
      dateArchived: '',
      dateCreated: '',
      dateModifed: '',
      archivedByUserId: userId,
      providers: [],
      collectionSites: [],
      error: '',
      showModal: false,
      activeChecked: true,
      getAllActive: false,
      searchProvider: '',
      providerId: '',
      providerBool: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeFein = this.handleChangeFein.bind(this);
    this.handleChangeABI = this.handleChangeABI.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeFax = this.handleChangeFax.bind(this);
    this.handleChangeActive = this.handleChangeActive.bind(this);
    this.handleChangeArchived = this.handleChangeArchived.bind(this);
    //this.getAllCollectors = this.getAllCollectors.bind(this);
    this.getAllCollectionSites = this.getAllCollectionSites.bind(this);
    this.getAllActiveCollectionSites = this.getAllActiveCollectionSites.bind(
      this
    );
    this.getAllInactiveCollectionSites = this.getAllInactiveCollectionSites.bind(
      this
    );
    this.handlerSeachProbiderDataTable = this.handlerSeachProbiderDataTable.bind(
      this
    );
    this.getProvidersForForm = this.getProvidersForForm.bind(this);
    this.handleProviderId = this.handleProviderId.bind(this);
    this.handleRowClicked = this.handleRowClicked.bind(this);
  }

  // Action Handlers
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      //Clear fields if modal is closed
      name: '',
      fein: '',
      alternateBussinessIdentifier: '',
      address: '',
      phoneNumber: '',
      faxNumber: '',
      isActive: true,
      isArchived: false,
      dateArchived: '',
      dateCreated: '',
      dateModifed: '',
      archivedByUserId: userId,
      providerId: '',
      providerBool: true,
    });
  };

  componentDidMount() {
    this.getAllCollectionSites();
    this.getProvidersForForm();
  }

  handleChangeActive(isActive) {
    this.setState({ isActive });
  }

  handleChangeArchived(isArchived) {
    this.setState({ isArchived });
  }

  handleProviderId = (event) => {
    if (
      event.target.value === null ||
      event.target.value === '' ||
      event.target.value === '0'
    ) {
      this.setState({
        providerId: event.target.value,
        providerBool: true,
      });
    } else {
      this.setState({
        providerId: event.target.value,
        providerBool: false,
      });
    }
  };

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
  getAllCollectionSites() {
    let url = '/api/CollectionSite/GetAllCollectionSites';
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectionSites: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllInactiveCollectionSites() {
    let url = '/api/CollectionSite/GetAllInactiveCollectionSites';
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectionSites: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getAllActiveCollectionSites() {
    let url = '/api/CollectionSite/GetAllActiveCollectionSites';
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectionSites: response,
        });
      })
      .catch((error) => console.log(error));
  }

  getProvidersForForm() {
    let url = '/api/Provider/GetAllActiveProviders';
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
    const collectionSites = {
      name: this.state.name,
      fein: this.state.fein,
      alternateBussinessIdentifier: this.state.alternateBussinessIdentifier,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      faxNumber: this.state.faxNumber,
      isActive: this.state.isActive,
      isArchived: this.state.isArchived,
      dateArchived: this.state.dateArchived,
      dateCreated: this.state.dateCreated,
      dateModifed: this.state.dateModifed,
      providerId: this.state.providerId,
      archivedByUserId: userId,
    };
    axios
      .post('/api/CollectionSite/InsertCollectionSite', collectionSites)
      .then((response) => {
        this.setState({
          name: '',
          fein: '',
          alternateBussinessIdentifier: '',
          address: '',
          phoneNumber: '',
          faxNumber: '',
          isActive: true,
          isArchived: false,
          dateArchived: '',
          dateCreated: '',
          dateModifed: '',
          archivedByUserId: userId,
          providerId: '',
          providerBool: true,
        });
        this.toggleModal();
        alert('Collection Site created successfully');
        this.getAllCollectionSites();
      })
      .catch((err) => {
        alert('Error creating Collection Site');
        this.toggleModal();
      });
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

  //TODO: redirect to collector site profile
  handleRowClicked = (collector_site) => {
    //window.location.replace("/#/collector-site-profile/" + collector_site.id);
  };

  render() {
    const { collectionSites } = this.state;
    return (
      <Card>
        <CardBody>
          <Fragment>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Input
                      name='search'
                      id='search'
                      placeholder='Search Collection Site'
                      value={this.state.searchProvider}
                      onChange={this.handlerSeachProbiderDataTable}
                    ></Input>
                  </FormGroup>
                </Form>
              </Col>
              <Col>
                <div className='float-right'>
                  <ButtonGroup>
                    <Button
                      color='primary'
                      onClick={this.getAllInactiveCollectionSites}
                    >
                      View Inactive
                    </Button>
                    <Button
                      color='primary'
                      onClick={this.getAllCollectionSites}
                    >
                      View All
                    </Button>
                    <Button
                      color='primary'
                      onClick={this.getAllActiveCollectionSites}
                    >
                      View Active
                    </Button>
                  </ButtonGroup>
                </div>
                <br></br>
                <br></br>
                <Button
                  className='float-right'
                  style={{
                    borderRadius: 100,
                    height: 50,
                    width: 50,
                    fontSize: 16,
                  }}
                  color='primary'
                  onClick={this.toggleModal}
                >
                  +
                </Button>
              </Col>
            </Row>

            <Modal
              size='lg'
              isOpen={this.state.showModal}
              toggle={this.toggleModal}
            >
              <ModalHeader toggle={this.toggleModal}>
                Create Collection Site
              </ModalHeader>
              <Form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          name='name'
                          id='name'
                          placeholder=''
                          value={this.state.name}
                          onChange={this.handleChangeName}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>FEIN</Label>
                        <Input
                          name='fein'
                          id='fein'
                          placeholder=''
                          value={this.state.fein}
                          onChange={this.handleChangeFein}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Alternate Bussiness Identifier</Label>
                        <Input
                          name='alternateBussinessIdentifier'
                          id='alternateBussinessIdentifier'
                          value={this.state.alternateBussinessIdentifier}
                          onChange={this.handleChangeABI}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={8}>
                      <FormGroup>
                        <Label>Address</Label>
                        <GooglePlacesAutocomplete
                          onSelect={console.log}
                          name='address'
                          id='address'
                          value={this.state.address}
                          onChange={this.handleChangeAddress}
                        />
                        {/* <Input
                          name="address"
                          id="address"
                          value={this.state.address}
                          onChange={this.handleChangeAddress}
                        /> */}
                      </FormGroup>
                    </Col>
                    <Col lg={4}>
                      <FormGroup>
                        <Label>Select Provider</Label>
                        <Input
                          type='select'
                          name='providerId'
                          id='providerId'
                          onChange={this.handleProviderId}
                          value={this.state.providerId}
                        >
                          <option value='0'>Select Provider...</option>
                          {this.state.providers.map((provider) => (
                            <option key={provider.id} value={provider.id}>
                              {provider.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Phone Number</Label>
                        <Input
                          name='phoneNumber'
                          id='phoneNumber'
                          value={this.state.phoneNumber}
                          onChange={this.handleChangePhone}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Fax Number</Label>
                        <Input
                          name='faxNumber'
                          id='faxNumber'
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
                          checked={this.state.isActive}
                        ></Switch>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Is Archived</Label>
                        <br />
                        <Switch
                          onChange={this.handleChangeArchived}
                          checked={this.state.isArchived}
                        ></Switch>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ display: 'none' }}>
                    <Col>
                      <FormGroup>
                        <Input
                          type='text'
                          name='dateArchived'
                          id='dateArchived'
                          value={this.state.dateArchived}
                          onChange={this.handleChangedateArchived}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          type='text'
                          name='dateCreated'
                          id='dateCreated'
                          value={this.state.dateCreated}
                          onChange={this.handleChangeDateCreated}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input
                          type='text'
                          name='dateModifed'
                          id='dateModifed'
                          value={this.state.dateModifed}
                          onChange={this.handleChangeEdited}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type='submit'
                    color='primary'
                    disabled={this.state.providerBool}
                  >
                    Create
                  </Button>
                  <Button color='secondary' onClick={this.toggleModal}>
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
            data={collectionSites}
            pagination
          ></DataTable>
        </CardBody>
      </Card>
    );
  }
}

export default CollectionSite;
