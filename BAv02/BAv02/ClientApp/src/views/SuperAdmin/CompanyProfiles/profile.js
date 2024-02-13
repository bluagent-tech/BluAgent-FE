import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Input, Form, FormGroup, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Button, Fade, } from 'reactstrap';
import InputMask from 'react-input-mask';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { companiesActions } from './../../../store/companyStore';
import DataTable from 'react-data-table-component';
import axios from 'axios'
import DropDownSuperAdminMenu from '../../../components/DropDownSuperAdminMenu';
import dateConvertTables from '../../../services/dateConvertTables';
import moment from 'moment';
import ResetPasswordDriverSuperAdminMenu from '../../../components/ResetPasswordDriverSuperAdminMenu';
import ToastAlert from '../../../components/ToastAlert';

const columnsDrivers = [
  {
    name: 'Name',
    selector: 'Name',
    sortable: true
  },
  {
    name: 'Last Name',
    selector: 'LastName',
    sortable: true
  },
  {
    name: 'License',
    selector: 'License',
    sortable: true
  },
  {
    name: 'Date of Birthday',
    selector: 'Birthdate',
    sortable: true
  },
  {
    name: 'Options',
    selector: 'options',
  },
];

const columnsTrucks = [
  { name: '', selector: 'photo', grow: 0, width: '70px' },
  {
    name: 'VEHICLE NUMBER',
    selector: 'vehicleNumber',
    sortable: true,
    width: '100px',
  },
  { name: 'VIN', selector: 'vin', center: true },
  { name: 'PLATE', selector: 'plate', center: true },
  {
    name: 'PLATE STATE',
    selector: 'plateState',
    sortable: true,
    center: true,
  },
  { 
    name: 'PLATE EXP', 
    selector:(row)=> row.plateExp !== null ? row.plateExp : '00-00-0000', 
    sortable: true, 
    center: true,
    format: (row)=> row.plateExp !== null ? moment(row.plateExp).format('MM-DD-YYYY') : null, 
  },
  {
    name: 'STATUS',
    selector: 'status',
    sortable: true,
    center: true,
  },
  { name: 'OPTIONS', selector: 'options', grow: 0, center: true },
];

const VehicleImg = (img, idVehicle, VehicleType, idCompany) => {
  return (
    <div className='align-right'>
      <div className='avatar'>
        <img
          src={
            img === null
              ? imgVehicleType(VehicleType)
              : `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/TrucksFile/${idVehicle}/truckAvatar.png`
          }
          className='img-avatar'
          alt='Avatar'
          style={{ width: '100%', height: '100%' }}
        />
        <span className='avatar-status badge-success'></span>
      </div>
    </div>
  );
};

const imgVehicleType = (VehicleType) => {
  let img = '';

  if (VehicleType) {
    switch (VehicleType.trim().toLowerCase()) {
      case 'truck':
        img = 'assets/icons/icons8-truck.svg';
        break;
      case 'car':
        img = 'assets/icons/icons8-car.svg';
        break;
      case 'tow truck':
        img = 'assets/icons/icons8-tow-truck.svg';
        break;
      case 'bus':
        img = 'assets/icons/icons8-bus.svg';
        break;
      case 'flatbed truck':
        img = 'assets/icons/icons8-in-flat-bed.svg';
        break;
      case 'pick-up':
        img = 'assets/icons/icons8-pickup.svg';
        break;
      case 'semi-trailer truck':
        img = 'assets/icons/icons8-semi-truck.svg';
        break;
      case 'van':
        img = 'assets/icons/icons8-vanpool.svg';
        break;
      default:
        img = 'assets/icons/icons8-truck.svg';
        break;
    }
  }

  return img;
};

const Filter = ({ onFilter }) => {
  return (
    <React.Fragment>
      <Row>
        <Col md='10'>
          <FormGroup>
            <Input
              className='mb-2'
              id='search'
              type='search'
              role='search'
              placeholder='Search Vehicle'
              onChange={(e) => onFilter(e.target.value)}
            />
          </FormGroup>
        </Col>
       
      </Row>
    </React.Fragment>
  );
};

const OptionMenu = ({ 
  postStatusTruck,
  idVehicle, 
  idCompany,
  toast,
  getAllTrucks,
}) => {
    return (
      <div className='text-center'>
        <DropDownSuperAdminMenu
          direction='right'
          archivedTruck={() => {
            postStatusTruck(idVehicle, idCompany, getAllTrucks, toast);
          }}
          itemID={idVehicle}
          menuOptions={[
            ['Archived', 'Archived'],
          ]}
        />
      </div>
    );
};

class ProfileCompanies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      idCompany: parseInt(this.props.match.params.id),
      driversActive: [],
      dataTableTrucks: "",
      dataTableDrivers: "",
      stateNewPassword: false,
      activeTab: new Array(4).fill("1"),
      filterTextTrucks: '',
    };
    this.toggle = this.toggle.bind(this);
    this.getAllDrivers = this.getAllDrivers.bind(this);
    this.getAllTrucks = this.getAllTrucks.bind(this);
    this.mapTrucksForDataTable = this.mapTrucksForDataTable.bind(this);
    this.toggleResetPassword = this.toggleResetPassword.bind(this);
    this.trucksData = [];
  }

  componentDidMount() {
    this.getAllDrivers(this.state.idCompany);
    this.getAllTrucks(this.state.idCompany);
  }

  toggleResetPassword(itemID) {
    this.props.setIDDriver(itemID)
    this.setState({ stateNewPassword: !this.state.stateNewPassword })
  }

  getAllDrivers(idCompany) {
    axios.get('api/DQF/getDriversByIdCompany?idC=' + idCompany +
      "&page=" +
      1 +
      "&page2=" +
      1 +
      "&size=" +
      1000)
      .then((response) => response.data)
      .then((response) => {
        let allDrivers = JSON.parse(response);
        allDrivers.drivers.Items.map((item) => {
          item.Birthdate = (moment(item.Birthdate).format('YYYY-MM-DD'));
          item.options = (<DropDownSuperAdminMenu
            onModal2={() => this.toggleResetPassword(item.IdUser)}
            direction={"up"}
            itemID={item.IdUser}
            menuOptions={[
              ["Reset Password", "Reset Password"]]}
          />);
        });
        this.setState({ dataTableDrivers: allDrivers.drivers.Items })
      }).catch((error) => console.log(error))
  }

  postStatusTruck(idVehicle, idCompany, getAllTrucks, toast) {
    axios.delete('api/Maintenance/archivedTruck?idVehicle=' + idVehicle + '&idCompany=' + idCompany)
      .then((response) => response.data)
      .then((response) => {
        const r = JSON.parse(response);
        if (r.status === 0) {
        getAllTrucks(idCompany);
        toast(true, 'Truck successfully archived');
        } else {
          toast(true, 'Error when truck archived');
        }
      }).catch((error) => console.log(error))
  }

  mapTrucksForDataTable(items, idCompany) {
    let data = items.map((row) => {
      var object = {};
      object.photo = VehicleImg(row.FileImage, row.Id, row.VehicleType, idCompany);
      object.vehicleNumber = row.Name;
      object.vin = row.Vin;
      object.plate = row.Plate;
      object.plateState = row.PlateState;
      object.plateExp = row.PlateExpiration;
      object.status = row.Status;
      object.options = (
        <OptionMenu
          postStatusTruck={this.postStatusTruck}
          idCompany={this.state.idCompany}
          toast={this.props.toggleToastAlert}
          idVehicle={row.Id}
          getAllTrucks={this.getAllTrucks}
        />
      );
      return object;
    });

    return data;
  }

  getAllTrucks(idCompany) {
    axios.get('api/Maintenance/getTrucksCompanySA?idCompany=' + idCompany +
    "&page=" +
    1 +
    "&size=" +
    1000)
      .then((response) => response.data)
      .then((response) => {
        let allTrucks = JSON.parse(response);
         this.trucksData = this.mapTrucksForDataTable(allTrucks.trucks.Items, idCompany).sort((a, b) => {
          if ( b.vehicleNumber > a.vehicleNumber)
              return -1;
          if (b.vehicleNumber < a.vehicleNumber)
              return 1;
          return 0;
      });
        this.setState({ dataTableTrucks: allTrucks.trucks.Items })
      }).catch((error) => console.log(error))
  }


  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    const filteredTrucks = this.trucksData.filter((item) => {
      return (
        item.vehicleNumber
          .toLowerCase()
          .includes(this.state.filterTextTrucks.toLowerCase()) ||
        item.vin
          .toLowerCase()
          .includes(this.state.filterTextTrucks.toLowerCase())
      );
    });
    return (
      <Fragment>
        <div className="animated fadeIn">
          <Row>
            <Col xs={12}>
              <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                <Card>
                  <CardBody>
                    <Col>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            id="1"
                            active={this.state.activeTab[0] === "1"}
                            onClick={() => {
                              this.toggle(0, "1");
                            }}
                          >
                            DRIVERS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            id="2"
                            active={this.state.activeTab[0] === "2"}
                            onClick={() => {
                              this.toggle(0, "2");
                            }}
                          >
                            VEHICLES
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab[0]}>
                        <TabPane tabId="1">
                          <DataTable
                            pagination
                            highlightOnHover
                            pointerOnHover
                            dense
                            responsive={true}
                            columns={columnsDrivers}
                            data={this.state.dataTableDrivers}

                          />
                        </TabPane>
                        <TabPane tabId="2">
                          <Filter
                            state={this.state}
                            // reduxProps={this.props}
                            data={this.trucksData}
                            onFilter={(value) => {
                              this.setState({ filterTextTrucks: value });
                            }}
                          />
                          <DataTable
                            pagination
                            highlightOnHover
                            pointerOnHover
                            dense
                            responsive={true}
                            columns={columnsTrucks}
                            data={filteredTrucks}
                          />
                        </TabPane>
                      </TabContent>
                    </Col>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          </Row>
        </div>
        <ResetPasswordDriverSuperAdminMenu
          idDriver={this.props.idDriver}
          modalType='Reset Pasword'
          modal={this.state.stateNewPassword}
          toggle={() => this.toggleResetPassword()}
          message={''}
          toast={this.props.toggleToastAlert}
        />
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.companies,
  (dispatch) => bindActionCreators(companiesActions, dispatch)
)(ProfileCompanies);
