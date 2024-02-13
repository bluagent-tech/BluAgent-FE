import React from 'react';
import {
  Card,
  CardBody,
  Col,
} from 'reactstrap';


// REDUX ACTIONS
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/AccountSettings";

// COMPONENTS
import Users from '../../../views/AccountSettings/Users';

//  GET USER ROLE
const superAdminRole = JSON.parse(localStorage.getItem('user')).Role;

const SuperAdminUsers = (props) => {

  if (superAdminRole === 'SUPERADMIN') {
    return (
      <Card>
        <CardBody>
          <Col lg={12}>
            <h2>Super Admin & Users</h2>
          </Col>
          <Users />
        </CardBody>
      </Card>
    );
  } else {
    return <p>YOU ARE NOT SUPER ADMIN</p>;
  }
};

export default connect(
  state => state.accountSettings,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(SuperAdminUsers);