import React, { Component, Fragment } from 'react';
import {
  FormGroup,
  Col,
  Button,
  UncontrolledTooltip,
  Input,
  Row,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Maintenance';
import AddVehicle from './Modal/AddVehicle';
import AddWorkOrder from './Modal/AddWorkOrder';
import ExportTrucks from './Modal/ExportTrucks';
import dateConvertTables from './../../services/dateConvertTables';
import AlertDeleteTruck from './../../components/AlertDeleteTruck';
import DropdownMenu from './../../components/DropdownMenu';
import Switch from 'react-switch';
import DataTable from 'react-data-table-component';
import '../../components/Styles/DataTable.css';
import moment from "moment";
const id = JSON.parse(localStorage.getItem('user')).Id;
const idCompany = JSON.parse(localStorage.getItem("idCompany"));


const Filter = ({ onFilter, reduxProps }) => {
  let dataExportTrucks = {}
  let dataExportTrucksWithInspections = {}
  const x = reduxProps.dataExportTrucks.Items;
  if (x !== undefined) {
    dataExportTrucks = x.map(function (obj, index) {
      var fObj = obj;
      fObj.index = index + 1;
      return fObj;
    });
  }
  const w = reduxProps.dataExportTrucksWithInspections.Items;
  if (w !== undefined) {
    dataExportTrucksWithInspections = w.map(function (obj, index) {
      var fObj = obj;
      fObj.index = index + 1;
      return fObj;
    });
  }
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
        {/* Col cambiado a md="0" */}
        <Col md='0'>
          <Button
            //Estilo del boton cambiado
            style={{
              borderRadius: '30px',
              width: '30px',
              height: '30px',
              paddingLeft: '0px',
              paddingTop: '0px',
              fontSize: "20px",
              paddingRight: "0px",
              paddingBottom: "0px",
              lineHeight: 1,
              marginRight: "20px",
            }}
            color="#1b8eb7"
            className='btn btn-primary'
            onClick={reduxProps.toggle1}
            id='addT'
          >
            +
          </Button>
          <UncontrolledTooltip placement='bottom' target='addT'>
            Add New Truck
          </UncontrolledTooltip>
          <AddVehicle
            toggle={reduxProps.toggle1}
            modal={reduxProps.modal1}
            states={reduxProps.states}
            OnSubmit={reduxProps.addTruck}
            onBlur={reduxProps.validateVinExistence}
            getVin={reduxProps.getDataTruckByVin}
            existVin={reduxProps.existVin}
            isLoading={reduxProps.isLoading}
            error={reduxProps.error}
            dataByVin={reduxProps.dataTruckByVin}
          />
          <Button
            id='exportTrucks'
            onClick={reduxProps.toggleET}
            color="primary"
            className="fa fa-file-text-o btn btn-primary text-white options-drugs"
            style={{
              borderRadius: '30px',
              width: '30px',
              height: '30px',
              paddingLeft: '0px',
              paddingTop: '0px',
              fontSize: "15px",
              paddingRight: "0px",
              paddingBottom: "0px",
              lineHeight: 1,
              marginRight: "20px",
            }}
          />
          <UncontrolledTooltip placement='bottom' target='exportTrucks'>
            Export Truck's
          </UncontrolledTooltip>
          <ExportTrucks
            toggle={reduxProps.toggleET}
            modal={reduxProps.modalET}
            states={reduxProps.states}
            dataExportTrucks={dataExportTrucks}
            dataExportTrucksWithInspections={dataExportTrucksWithInspections}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const VehicleImg = (img, idVehicle, VehicleType) => {
  return (
    <div className='align-right'>
      <div className='avatar'>
        <img
          src={
            img === null
              ? imgVehicleType(VehicleType)
              : `https://bluagent-files.s3-us-west-2.amazonaws.com/${localStorage['idCompany']}/TrucksFile/${idVehicle}/truckAvatar.png`
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

const OptionMenu = ({ reduxProps, idVehicle, isInactive, bus }) => {
  if (isInactive) {
    return (
      <div className='text-center'>
        <DropdownMenu
          direction='right'
          itemID={idVehicle}
          menuOptions={[
            [
              'Restore',
              () => {
                reduxProps.toggleD1(idVehicle, 'restore');
              },
            ],
          ]}
        />
      </div>
    );
  } else {
    return (
      <div className='text-center'>
        <DropdownMenu
          direction='right'
          toggleWorkOrderModal={() => {
            reduxProps.toggleWO(idVehicle);
          }}
          toggleDeleteModal={() => {
            reduxProps.toggleD1(idVehicle, 'Deactivate');
          }}
          itemID={idVehicle}
          menuOptions={[
            [
              'Create Inspection',
              () => {
                reduxProps.toggleVehicleInspectionModal('VEHICLE', idVehicle);
              },
            ],
            ['Create Work Order', 'This is a function2'],
            ['Deactivate', 'This is a function'],
          ]}
        />
      </div>
    );
  }
};

// MAINTENANCE TRUCKS
class Trucks extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: true,
      open: false,
      filterTextTrucks: '',
      filterTextInactiveTrucks: '',
    };
  }

  handleChange(checked) {
    this.setState({ checked });

    this.props.exportTrucks(id, checked);
    this.props.exportTrucksInspections(id, checked);

    if (checked === true) {
      document.getElementById('activeItemsContainer').style.display = 'block';
      document.getElementById('inactiveItemsContainer').style.display = 'none';
    } else {
      document.getElementById('activeItemsContainer').style.display = 'none';
      document.getElementById('inactiveItemsContainer').style.display = 'block';
    }
  }

  componentDidMount() {
    this.props.getStates();
    this.props.getTrucks(id, 1, 1000, false);
    this.props.getTrucks(id, 1, 1000, true);
    this.props.GetCameraByIdCompanyAndType(idCompany, 'Camera')
    this.props.exportTrucks(id, this.state.checked);
    this.props.exportTrucksInspections(id, this.state.checked);
  }

  mapTrucksForDataTable(items, isInactive) {
    let data = items.map((row) => {
      var object = {};
      object.id = row.Id
      object.photo = VehicleImg(row.FileImage, row.Id, row.VehicleType);
      object.vehicleNumber = row.Name;
      object.vin = row.Vin;
      object.plate = row.Plate;
      object.plateState = row.PlateState;
      object.plateExp = row.PlateExpiration;
      object.status = row.Status;
      object.options = (
        <OptionMenu
          reduxProps={this.props}
          isInactive={isInactive}
          idVehicle={row.Id}
          bus={
            row.VehicleType === 'BUS' || row.Passenger === 'Y' ? true : false
          }
        />
      );
      return object;
    });

    return data;
  }

  handleRowClicked = (row) => {
    window.location.replace('/#/Trucks/' + row.options.props.idVehicle);
  };



  render() {
    // console.log(this.props.hasCameraService);
    const trucksData = this.mapTrucksForDataTable(this.props.trucks, false).sort((a, b) => {
      if (b.vehicleNumber > a.vehicleNumber)
        return -1;
      if (b.vehicleNumber < a.vehicleNumber)
        return 1;
      return 0;
    });
    // console.log('truck data', trucksData);
    const inactiveTrucksData = this.mapTrucksForDataTable(
      this.props.inactiveTrucks,
      true
    );

    const columns = [
      { name: "", selector: "photo", grow: 0, width: "70px" },
      {
        name: "VEHICLE NUMBER",
        selector: "vehicleNumber",
        sortable: true,
        width: "100px",

      },
      { name: 'VIN', selector: 'vin', center: true },

      //{ name: 'PLATE', selector: 'plate', center: true },
      {
        name: "PLATE STATE",
        selector: "plateState",
        sortable: true,
        center: true,
      },
      {
        name: "PLATE EXP",
        selector: (row) =>
          row.plateExp !== null ? row.plateExp : "00-00-0000",
        sortable: true,
        center: true,
        format: (row) =>
          row.plateExp !== null
            ? moment(row.plateExp).format("MM-DD-YYYY")
            : null,
      },
      { name: 'CAMERA STATUS', selector: 'cameraStatus' },
      { name: "OPTIONS", selector: "options", grow: 0, center: true },
    ];

    const columnsInactive = [
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

    const filteredTrucks = trucksData.filter((item) => {
      return (
        item.vehicleNumber
          .toLowerCase()
          .includes(this.state.filterTextTrucks.toLowerCase()) ||
        item.vin
          .toLowerCase()
          .includes(this.state.filterTextTrucks.toLowerCase())
      );
    });


    const greyDot = () => {
      return (
        <div className="row d-flex align-items-center">
          <div className="col-5">
            <div
              className="rounded-circle bg-secondary position-relative"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </div>
          <div className="col-7">
            <span>NA</span>
          </div>
        </div>
      );
    };

    const online = () => {
      return (
        <div className="row d-flex align-items-center">
          <div className="col-4">
            <div
              className="rounded-circle bg-success position-relative"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </div>
          <div className="col-8">
            <span>ONLINE</span>
          </div>
        </div>
      );
    };

    const offline = () => {
      return (
        <div className="row d-flex align-items-center">
          <div className="col-4">
            <div
              className="rounded-circle bg-danger position-relative"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </div>
          <div className="col-8">
            <span>OFFLINE</span>
          </div>
        </div>
      );
    };

    /**
     * 
              (camera) =>
                camera.idVehicle == truck.id &&
                (camera.status === "Assigned" ||
                  camera.status === "Pending to unassign" ||
                  camera.status === "Pending to assign")
                  camera.status === "Pending to unassign")
            );
            if (filterCamStatus.length == 0) {
              return greyDot();
            } else if (filterCamStatus[0].status == "Assigned" || filterCamStatus[0].status == "Pending to unassign") {
              return online();
            } else if (filterCamStatus[0].status == "Pending to assign") {
              return offline();
            } else {
              return online();
            }
          } else {
            return greyDot();
     */

    const camStatus = (truck) => {
      //console.log('TRUCK DATA: ', truck);
      //console.log('props : ', this.props.hasCameraService);
      if (this.props.hasCameraService) {
        var filterCamStatus = this.props.camera.filter(
          (camera) =>
            camera.idVehicle == truck.id &&
            (camera.status === "Assigned" ||
              camera.status === "Pending to unassign" ||
              camera.status === "Pending to assign")
        );
        if (filterCamStatus.length == 0) {
          return greyDot();
        } else if (filterCamStatus[0].status == "Assigned" || filterCamStatus[0].status == "Pending to unassign") {
          return online();
        } else if (filterCamStatus[0].status == "Pending to assign") {
          return offline();
        } else {
          return greyDot();
        }

      }else {
        return greyDot();
      }
    }

    const modifiedTrucksData = filteredTrucks.map((item) => ({
      ...item,
      plateState: `${item.plateState}-${item.plate}`,
      cameraStatus: camStatus(item)
    }));


    const modifiedInactiveTrucksData = inactiveTrucksData.map((item) => ({
      ...item,
      plateState: `${item.plateState}-${item.plate}`,
      cameraStatus: greyDot()
    }));


    const filteredInactiveTrucks = modifiedInactiveTrucksData.filter((item) => {
      return (
        item.vehicleNumber
          .toLowerCase()
          .includes(this.state.filterTextInactiveTrucks.toLowerCase()) ||
        item.vin
          .toLowerCase()
          .includes(this.state.filterTextInactiveTrucks.toLowerCase())
      );
    });
    return (
      <div className="animated fadeIn">
        <Row style={{ marginBottom: '10px', textAlign: 'right' }}>
          <Col md={{ size: 2, offset: 10 }}>
            <Switch
              uncheckedIcon={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: 12,
                    color: '#FFF',
                    paddingRight: 10,
                  }}
                >
                  Inactive
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: 12,
                    color: '#FFF',
                    paddingLeft: 10,
                  }}
                >
                  Active
                </div>
              }
              onChange={this.handleChange}
              checked={this.state.checked}
              onColor='#86d3ff'
              onHandleColor='#2693e6'
              handleDiameter={20}
              boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
              activeBoxShadow='0px 0px 1px 5px rgba(0, 0, 0, 0.2)'
              height={30}
              width={75}
              className='react-switch'
            />
          </Col>
        </Row>
        <div id='activeItemsContainer'>
          <Filter
            state={this.state}
            reduxProps={this.props}
            data={trucksData}
            onFilter={(value) => {
              this.setState({ filterTextTrucks: value });
            }}
          />
          <DataTable
            responsive={true}
            onRowClicked={this.handleRowClicked}
            pagination
            columns={columns}
            data={modifiedTrucksData}
          />
        </div>
        <div id='inactiveItemsContainer' style={{ display: 'none' }}>
          <Filter
            state={this.state}
            reduxProps={this.props}
            data={inactiveTrucksData}
            onFilter={(value) => {
              this.setState({ filterTextInactiveTrucks: value });
            }}
          />
          <DataTable
            responsive={true}
            onRowClicked={this.handleRowClicked}
            pagination
            columns={columnsInactive}
            data={filteredInactiveTrucks}
          />
        </div>
        <AlertDeleteTruck
          modalType={this.props.modalType}
          modal={this.props.modalD1}
          id={id}
          idV={this.props.idDelete1}
        />

        <AddWorkOrder
          toggle={this.props.toggleWO}
          modal={this.props.modalWO}
          states={this.props.states}
          OnSubmit={this.props.addWorkOrder}
          isLoading={this.props.isLoading}
          error={this.props.error}
          typeT={'VEHICLE'}
        />
      </div>
    );
  }
}

export default connect(
  (state) => state.maintenance,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Trucks);
