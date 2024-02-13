import React, { Component } from 'react';
import {
  CardBody,
  FormGroup,
  Col,
  UncontrolledTooltip,
  Button,
  Input,
  Badge,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Maintenance';
import dateConvertTables from './../../services/dateConvertTables';
import AddWorkOrderWithVehicles from './Modal/AddWorkOrderWithVehicles';
import DataTable from 'react-data-table-component';
import '../../components/Styles/DataTable.css';
import DropdownMenu from '../../components/DropdownMenu';
import AlertDelete from '../../components/AlertDelete';
import ReactExport from "react-data-export";
import moment from 'moment';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const id = JSON.parse(localStorage.getItem('user')).Id;
const idCompany = localStorage["idCompany"];

const Filter = ({ onFilter, reduxProps }) => {
  return (
    <React.Fragment>
      <FormGroup style={{marginBottom: "0px"}} row>
        <Col md="10">
          <Input
            className="mb-2"
            id="search"
            type="search"
            role="search"
            placeholder="Search Work Order"
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
        <Col md="0">
          <Button
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
            onClick={reduxProps.toggleWorkOrderWithVehicles}
            id="addWorkOrder"
          >
            +
          </Button>
          <UncontrolledTooltip placement="bottom" target="addWorkOrder">
            Add New Work Order
          </UncontrolledTooltip>     
          <ExcelFile
            element={
              <Button
                id="btnExportWorkOrders"
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
                marginRight: "20px",}}
              />
            }
          >
            <ExcelSheet data={reduxProps.dataExportWorkOrders.Items} name="Work Orders">
              <ExcelColumn label="Equipment" value="VehicleNumber" />
              <ExcelColumn label="Vehicle Type" value="VehicleType" />
              <ExcelColumn label="Requested" value="CreatedDate" />
              <ExcelColumn label="Service Type" value="Type" />
              <ExcelColumn label="Status" value="Status" />
              <ExcelColumn label="Assignation" value="AssignedTo" />
            </ExcelSheet>
          </ExcelFile>
          <UncontrolledTooltip placement="bottom" target="btnExportWorkOrders">
            Export Work Orders
          </UncontrolledTooltip>
        </Col>
      </FormGroup>
    </React.Fragment>
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


const VehicleImg = (vehicleType, img, idvehicle, ExactVehicleType) => {
  return (
    <div className='align-right'>
      <div className='avatar'>
        <img
          src={
            vehicleType == 'VEHICLE' ?
              img === null ?
                imgVehicleType(ExactVehicleType) :
                `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/TrucksFile/${idvehicle}/truckAvatar.png`
              : img === null ?
                'assets/maintenancePdf/Images/defaultTrailer.png' :
                `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/TrailersFile/${idvehicle}/trailerAvatar.png`
          }
          className='img-avatar'
          alt='Avatar'
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

const OptionMenu = ({ reduxProps, idWorkOrder }) => {
  return (
    <div className='text-center'>
      <DropdownMenu
        direction='right'
        itemID={idWorkOrder}
        menuOptions={[
          [
            'Delete',
            () => {
              reduxProps.toggleDeleteWorkOrder(idWorkOrder);
            },
          ],
        ]}
      />
    </div>
  );
};

//MAINTENANCE WORK ORDERS

class WorkOrder extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      open: false,
      filterTextWorkOrder: '',
    };
  }

  componentDidMount() {
    this.props.getWorkOrders(id);
    this.props.exportWorkOrders(idCompany)
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  mapWorkOrdersForDataTable(items) {
    let data;
    data = items.map((row) => {
      let workOrder = {};
      workOrder.id = row.Id;
      workOrder.photo = VehicleImg(
        row.VehicleType,
        row.FileImage,
        row.IdVehicle,
        row.ExactVehicleType,
      );
      workOrder.equipment = row.VehicleNumber;
      if (!workOrder.equipment) {
        workOrder.equipment = '';
      }
      workOrder.vehicleType = row.VehicleType;
      workOrder.requested = row.CreatedDate;
      workOrder.serviceType = row.Type;
      workOrder.status = row.Status;
      workOrder.assignation = row.AssignedTo;
      workOrder.options = (
        <OptionMenu reduxProps={this.props} idWorkOrder={row.Id} />
      );
      return workOrder;
    });
    return data;
  }

  handleRowClicked = (row) => {
    window.location.replace('/#/WorkOrder/' + row.id);
  };

  render() {
    const columns = [
      { name: '', selector: 'photo', grow: 0 },
      {
        name: 'EQUIPMENT',
        selector: 'equipment',
        center: true,
        sortable: true,
      },
      {
        name: 'VEHICLE TYPE',
        selector: 'vehicleType',
        center: true,
        sortable: true,
      },
      {
        name: 'REQUESTED',
        selector: (row)=> row.requested !== null ? row.requested : "00-00-0000",
        center: true,
        sortable: true,
        format: (row)=> row.requested !== null ? moment(row.requested).format('MM-DD-YYYY') : null,
      },
      {
        name: 'SERVICE TYPE',
        selector: 'serviceType',
        center: true,
        sortable: true,
      },
      { 
        name: 'STATUS', 
        selector: 'status', 
        center: true, 
        sortable: true, 
        cell: (row) => (
          <Badge
            pill
            style={
              row.status === "Open"
                ? {
                  backgroundColor: "#fff3cd",
                  color: "#000000de",
                  fontSize: "13px",
                }
                : row.status === "Closed"
                  ? {
                    backgroundColor: "#dbf2e3",
                    color: "#000000de",
                    fontSize: "13px",
                  }
                  : {
                    backgroundColor: "#d2eef7",
                    color: "#000000de",
                    fontSize: "13px",
                  }
            }
          >
            {row.status}
          </Badge>
        ),
      },
      {
        name: 'ASSIGNATION',
        selector: 'assignation',
        center: true,
        sortable: true,
      },
      { name: 'OPTIONS', selector: 'options', grow: 0 },
    ];

    const workOrderData = this.mapWorkOrdersForDataTable(this.props.workOrder);

    const filteredWorkOrders = workOrderData.filter((item) => {
      return (
        item.equipment
          .toLowerCase()
          .includes(this.state.filterTextWorkOrder.toLowerCase())
      );
    });

    return (
      <React.Fragment>
        <CardBody>
          <Filter
            state={this.state}
            reduxProps={this.props}
            data={workOrderData}
            onFilter={(value) => {
              this.setState({ filterTextWorkOrder: value });
            }}
          />
          <DataTable
            responsive={true}
            onRowClicked={this.handleRowClicked}
            pagination
            columns={columns}
            data={filteredWorkOrders}
          />
          <AlertDelete
            modalType={'Delete'}
            message={'Are you sure you want to delete this work order?'}
            modal={this.props.modalDeleteWorkOrder}
            toggle={() => {
              this.props.toggleDeleteWorkOrder(this.props.idDeleteWO);
            }}
            delete={() => {
              this.props.deleteWorkOrder(this.props.idDeleteWO, id);
            }}
          />
        </CardBody>
        <AddWorkOrderWithVehicles />
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.maintenance,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(WorkOrder);
