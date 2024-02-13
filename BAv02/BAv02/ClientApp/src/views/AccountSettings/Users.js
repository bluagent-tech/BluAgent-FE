import React, { Component, Fragment } from 'react';
import NewUser from './../../containers/NewUser';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/AccountSettings';
import { Col, Row, FormGroup, Input } from 'reactstrap';
import AlertDelete from './../../components/AlertDelete';
import DataTable from 'react-data-table-component';
import '../../components/Styles/DataTable.css';
import Switch from 'react-switch';
const id = JSON.parse(localStorage.getItem('user')).Id;

const Filter = ({ onFilter }) => {
  return (
    <React.Fragment>
      <FormGroup style={{ marginBottom: '0px' }} row>
        <Col md='12'>
          <Input
            id='search'
            type='search'
            role='search'
            placeholder='Search User'
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  );
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      filterTextUsers: '',
      filterTextInactiveUsers: '',
      checked: true,
    };
  }

  componentDidMount() {
    this.props.getRoles(id, 1, 100);
  }

  handleRowClicked = (row) => {
    window.location.replace('/#/Users/' + row.Id);
  };

  handleChange(checked) {
    this.setState({ checked });

  }

  mapUsersForDataTable(items) {
    let data;
    data = items.map((row) => {
      var object = {};
      object.Id = row.Id;
      object.name = `${row.Name} ${row.LastName}`;
      object.email = row.Email;
      object.role = row.Role;
      object.delete = object.delete = (
        <div className='text-center' style={{ fontWeight: 'bold' }}>
          {row.Id !== id ? (
            <i
              className='icon-close font-2x2icon-close icons font-2xl d-block'
              onClick={() => {
                row.Status == "ACTIVE" ?
                this.props.toggleDU(row.Id) : 
                this.props.toggleAU(row.Id)
              }}
              style={{ color: 'red', cursor: 'pointer' }}
            ></i>
          ) : (
            'Current User'
          )}
        </div>
      );
      return object;
    });

    return data;
  }

  render() {
    const columnsActive = [
      {
        name: 'NAME',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'EMAIL',
        selector: 'email',
        center: true,
      },
      {
        name: 'TYPE OF USER',
        selector: 'role',
        center: true,
      },
      { name: 'DEACTIVATE ', selector: 'delete', center: true },
    ];

    const columnsInactive = [
      {
        name: 'NAME',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'EMAIL',
        selector: 'email',
        center: true,
      },
      {
        name: 'TYPE OF USER',
        selector: 'role',
        center: true,
      },
      { name: 'REACTIVATE ', selector: 'delete', center: true },
    ];

    const users = this.mapUsersForDataTable(this.props.users);
    const inactiveUsers = this.mapUsersForDataTable(this.props.inactiveUsers);

    const filteredUsers = users.filter((item) => 
      item.name.toLowerCase().includes(this.state.filterTextUsers.toLowerCase())
    );

    const filteredInactiveUsers = inactiveUsers.filter((item) => 
      item.name.toLowerCase().includes(this.state.filterTextInactiveUsers.toLowerCase())
    );
    return (
      <Fragment>
        <Row>
          <Col mb='4'>
            <h5>Users Information</h5>
            <hr />
          </Col>
        </Row>
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
        <br />
        {this.state.checked ?
          (
            <><Row>
              <Col mb="4">
                <Filter
                  data={users}
                  onFilter={(value) => {
                    this.setState({ filterTextUsers: value });
                  }}
                />
              </Col>
              <Col mb="2">
                <NewUser />
              </Col>
            </Row>
              <DataTable
                responsive={true}
                onRowClicked={this.handleRowClicked}
                pagination
                columns={columnsActive}
                data={filteredUsers}
              />
            </>) : (
            <>
              <Row>
                <Col mb="4">
                  <Filter
                    data={inactiveUsers}
                    onFilter={(value) => {
                      this.setState({ filterTextInactiveUsers: value });
                    }}
                  />
                </Col>
                <Col mb="2">
                  <NewUser />
                </Col>
              </Row>
              <DataTable
                responsive={true}
                onRowClicked={this.handleRowClicked}
                pagination
                columns={columnsInactive}
                data={filteredInactiveUsers}
              /></>)}
        <AlertDelete
          message={'Are you sure you want to DEACTIVATE this user?'}
          modal={this.props.modalDU}
          toggle={() => {
            this.props.toggleDU(0);
          }}
          delete={() => {
            this.props.inactiveUser(
              this.props.idDeleteU,
              JSON.parse(localStorage.getItem('user')).Id
            );
          }}
        />
        <AlertDelete
          modalType = {'restore'}
          message={'Are you sure you want to REACTIVATE this user?'}
          modal={this.props.modalAU}
          toggle={() => {
            this.props.toggleAU(0);
          }}
          restore={() => {
            this.props.activeUser(
              this.props.idReactivateU,
              JSON.parse(localStorage.getItem('user')).Id
            );
          }}
        />
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Users);