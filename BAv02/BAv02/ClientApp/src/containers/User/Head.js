import React, { Component } from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/UserLog';

class Head extends Component {
  render() {
    return (
      <Col sm='3'>
        <Card className='text-center h-40'>
          <CardBody className='text-dark'>
            <div className='text-center'>
              <img
                alt='profile'
                style={{ width: '165px', height: '165px' }}
                id='image'
                src={
                  this.props.user.FileImage === null ||
                  this.props.user.FileImage === undefined
                    ? 'assets/img/Images/profile/profile.png'
                    : this.props.user.Role !== 'COLLECTOR'
                    ? `https://bluagent-files.s3-us-west-2.amazonaws.com/${localStorage['idCompany']}/Users/${this.props.user.Id}/userAvatar.png`
                    : `https://bluagent-files.s3-us-west-2.amazonaws.com/Collectors/Users/${this.props.user.Id}/userAvatar.png`
                }
                className='img-avatar border-blue image-user-profile'
                style={{ width: 200, height: 200 }}
              />
              <span className='avatar-status badge-danger'></span>
            </div>
            <div className='text-center'>
              {this.props.user.Name !== undefined
                ? this.props.user.Name + ' ' + this.props.user.LastName
                : ''}
            </div>
            <div className='text-center'>
              <span>Position | {this.props.user.Position}</span>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default connect(
  (state) => state.userLog,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Head);
