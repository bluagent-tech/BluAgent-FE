import React, { Component } from 'react';

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
} from 'reactstrap';
import PropTypes from 'prop-types';

import {
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler,
} from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className='d-lg-none' display='md' mobile />
        <AppNavbarBrand
          full={{
            src: '../../assets/img/Images/logo.png',
            width: 116,
            height: 25,
            alt: 'Bluagent Logo',
          }}
          minimized={{
            src: '../../assets/img/Images/Profileb.png',
            width: 30,
            height: 30,
            alt: 'Bluagent Logo',
          }}
        />
        <AppSidebarToggler className='d-md-down-none' display='lg' />
        <Nav className='ml-auto' navbar>
          <AppHeaderDropdown direction='down'>
            <UncontrolledDropdown>
              <DropdownToggle nav>
                <span
                  style={{ verticalAlign: 'middle' }}
                  className='d-none d-sm-block float-left'
                >
                  {JSON.parse(localStorage.getItem('user')).Name +
                    ' ' +
                    JSON.parse(localStorage.getItem('user')).LastName}
                </span>
                <img
                  style={{ width: '35px' }}
                  src={
                    JSON.parse(localStorage.getItem('user')).FileImage === null
                      ? '../../assets/icons/icons8-male-user.svg'
                      : JSON.parse(localStorage.getItem('user')).Role ===
                        'COLLECTOR'
                      ? `https://bluagent-files.s3-us-west-2.amazonaws.com/Collectors/Users/${
                          JSON.parse(localStorage.getItem('user')).Id
                        }/userAvatar.png`
                      : JSON.parse(localStorage.getItem('user')).Role ===
                        'DRIVER'
                      ? `https://bluagent-files.s3-us-west-2.amazonaws.com/${
                          localStorage['idCompany']
                        }/Drivers/${
                          JSON.parse(localStorage.getItem('user')).Id
                        }/driverAvatar.png`
                      : `https://bluagent-files.s3-us-west-2.amazonaws.com/${
                          localStorage['idCompany']
                        }/Users/${
                          JSON.parse(localStorage.getItem('user')).Id
                        }/userAvatar.png`
                  }
                  alt='avatar'
                  className='img-avatar image-user-profile-default-header'
                />
              </DropdownToggle>

              <DropdownMenu right style={{ right: 10 }}>
                <DropdownItem header tag='div' className='text-center'>
                  <strong>Settings</strong>
                </DropdownItem>
                {JSON.parse(localStorage.getItem('user')).Role !== 'DRIVER' ? (
                  <DropdownItem onClick={(e) => this.props.toProfile(e)}>
                    <i className='fa fa-user' style={{ color: '000' }}></i>{' '}
                    Profile
                  </DropdownItem>
                ) : (
                  <div />
                )}
                <DropdownItem onClick={(e) => this.props.onLogout(e)}>
                  <i className='fa fa-lock'></i> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
