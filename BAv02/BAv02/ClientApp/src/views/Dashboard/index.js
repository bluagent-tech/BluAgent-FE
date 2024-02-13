import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row } from 'reactstrap';
import FirstLoginTour from '../../components/unboardingUserFirstLogin/FirstLoginTour';
import LazyLoad from 'react-lazyload';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";
import "../../assets/css/DashboardCompany.css";
const idCompany = localStorage.getItem('idCompany');
const id = JSON.parse(localStorage.getItem("user")).Id;

class Dashboard extends Component {
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('user')).Role !== 'SUPERADMIN') {
      // if (JSON.parse(localStorage.getItem('user')).Role !== 'INSURANCE') {
      if (
        JSON.parse(localStorage.getItem('user')).Role !== 'ADMIN' &&
        JSON.parse(localStorage.getItem('permits')).length > 1
      ) {
        document.getElementById('div1').style.display = 'none';
        document.getElementById('div2').style.display = 'none';
        if (
          JSON.parse(localStorage.getItem('permits')).includes('HR') === false
        ) {
          document.getElementById('DQFiles').style.display = 'none';
        }
        if (
          JSON.parse(localStorage.getItem('permits')).includes('DER') === false
        ) {
          document.getElementById('DrugAndAlcoholTest').style.display = 'none';
        }
        if (
          JSON.parse(localStorage.getItem('permits')).includes('Mechanical') ===
          false
        ) {
          document.getElementById('Maintenance').style.display = 'none';
        }
      }
      // }
    }
    this.props.getDataCompany(id, false);
    //this.props.getLabCorps();
    this.props.getCompanyNotifications(idCompany);
  }

  render() {
    return (
      <Fragment>
        <div className='animated fadeIn'>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className='row text-center' style={{ marginTop: '4%' }}>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      md='3'
                      id='div1'
                    >
                      <div
                        style={{ width: '180px' }}
                        className='CompanyProfile'
                      >
                        <Link to='/accountSettings'>
                          <LazyLoad height={150}>
                            <div className='box'>
                              <img
                                alt='dashImg'
                                style={{
                                  margin: '0px 20px',
                                  textDecoration: 'none',
                                }}
                                className='img-responsive'
                                src='/assets/icons/icons8-course.svg'
                                onMouseOver={(e) =>
                                (e.currentTarget.src =
                                  '/assets/icons/icons8-course.svg')
                                }
                                onMouseOut={(e) =>
                                (e.currentTarget.src =
                                  '/assets/icons/icons8-course.svg')
                                }
                                height='150'
                                width='150'
                              />
                              {this.props.isLoadingUsDot ? null :
                                this.props.CompanyNotifications.MCS ||
                                  this.props.CompanyNotifications.PinNumber ||
                                  this.props.CompanyNotifications.CSA ||
                                  this.props.CompanyNotifications.PSP ||
                                  this.props.CompanyNotifications.Certificate ||
                                  this.props.CompanyNotifications.Letters ||
                                  this.props.CompanyNotifications.SafetyReviews ? (
                                  <div>
                                    <span
                                      type="button"
                                      className="icon-button__badge us-dot-iconCP"
                                    >
                                      <strong>!</strong>
                                    </span>
                                  </div>
                                ) : null}
                            </div>
                          </LazyLoad>
                          <h6 className='dashboard-font-heading'>
                            COMPANY PROFILE
                          </h6>
                        </Link>
                      </div>
                    </Col>
                    <Col
                      id='DQFiles'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      md='3'
                    >
                      <div style={{ width: '180px' }} data-tut='DQFiles'>
                        <Link to='./QualificationFile'>
                          <LazyLoad height={150}>
                            <img
                              alt='dashImg'
                              className='img-responsive'
                              src='/assets/icons/icons8-name-tag.svg'
                              onMouseOver={(e) =>
                              (e.currentTarget.src =
                                '/assets/icons/icons8-name-tag.svg')
                              }
                              onMouseOut={(e) =>
                              (e.currentTarget.src =
                                '/assets/icons/icons8-name-tag.svg')
                              }
                              height='150'
                              width='150'
                            />
                          </LazyLoad>
                          <h6 className='dashboard-font-heading'>
                            DRIVER FILES
                          </h6>
                        </Link>
                      </div>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      md='3'
                      id='Maintenance'
                    >
                      <div style={{ width: '180px' }} data-tut='Maintenance'>
                        <Link to='./Maintenance'>
                          <LazyLoad height={150}>
                            <img
                              alt='dashMan'
                              className='img-responsive'
                              src='/assets/icons/icons8-in-transit.svg'
                              onMouseOver={(e) =>
                              (e.currentTarget.src =
                                '/assets/icons/icons8-in-transit.svg')
                              }
                              onMouseOut={(e) =>
                              (e.currentTarget.src =
                                '/assets/icons/icons8-in-transit.svg')
                              }
                              height='150'
                              width='150'
                            />
                          </LazyLoad>
                          <h6 className='dashboard-font-heading'>
                            MAINTENANCE PROGRAM
                          </h6>
                        </Link>
                      </div>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      md='3'
                      id='DrugAndAlcoholTest'
                    >
                      <div
                        style={{ width: '180px' }}
                        data-tut='DrugAndAlcoholTest'
                      >
                        <Link to='./DashboardTest'>
                          <LazyLoad height={150}>
                            <div className="box">
                              <img
                                alt='dashDat'
                                className='img-responsive'
                                src='/assets/icons/icons8-doctors-bag.svg'
                                onMouseOver={(e) =>
                                (e.currentTarget.src =
                                  '/assets/icons/icons8-doctors-bag.svg')
                                }
                                onMouseOut={(e) =>
                                (e.currentTarget.src =
                                  '/assets/icons/icons8-doctors-bag.svg')
                                }
                                height='150'
                                width='150'
                              />
                              {this.props.isLoadingUsDot ? null :
                                this.props.CompanyNotifications.MIS == false ||
                                  this.props.CompanyNotifications.LaboratorySummary ||
                                  this.props.CompanyNotifications.CertificateEnrollment ||
                                  this.props.CompanyNotifications.DrugTestingPolicy ||
                                  this.props.CompanyNotifications.SupervisorTraining ||
                                  this.props.CompanyNotifications.ClearingHouse ? (
                                  <div>
                                    <span
                                      type="button"
                                      className="icon-button__badge us-dot-iconDA"
                                    >
                                      <strong>!</strong>
                                    </span>
                                  </div>
                                ) : null}
                            </div>
                          </LazyLoad>
                          <h6 className='dashboard-font-heading'>
                            DRUG & ALCOHOL COMPLIANCE
                          </h6>
                        </Link>
                      </div>
                    </Col>
                  </div>
                  <div
                    id='div2'
                    className='row text-center'
                    style={{ marginTop: '4%' }}
                  >
                    <Col md='3'>
                      <div className='hoursofservice'>
                        <a
                          href='https://cloud.apolloeld.com/userlogin'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <LazyLoad height={150}>
                            <img
                              alt='hours'
                              className='img-responsive'
                              src='/assets/icons/icons8-schedule.svg'
                              onMouseOver={(e) =>
                              (e.currentTarget.src =
                                '/assets/icons/icons8-schedule.svg')
                              }
                              onMouseOut={(e) =>
                              (e.currentTarget.src =
                                '/assets/icons/icons8-schedule.svg')
                              }
                              height='150'
                              width='150'
                            />
                          </LazyLoad>
                        </a>
                        <h6 className='dashboard-font-heading'>
                          HOURS OF SERVICE
                        </h6>
                      </div>
                    </Col>
                    <Col md='3' className='gpstracking'>
                      <a
                        href='https://gps.bluagent.com'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <LazyLoad height={150}>
                          <img
                            alt='gps'
                            className='img-responsive'
                            src='/assets/icons/icons8-address.svg'
                            onMouseOver={(e) =>
                            (e.currentTarget.src =
                              '/assets/icons/icons8-address.svg')
                            }
                            onMouseOut={(e) =>
                            (e.currentTarget.src =
                              '/assets/icons/icons8-address.svg')
                            }
                            height='150'
                            width='150'
                          />
                        </LazyLoad>
                      </a>
                      <h6 className='dashboard-font-heading'>GPS TRACKING</h6>
                    </Col>
                    <Col md='3' className='training'>
                      <a
                        href='https://bluagent.com/courses/sample-course/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <LazyLoad height={150}>
                          <img
                            alt='training'
                            className='img-responsive'
                            src='/assets/icons/icons8-diploma.svg'
                            onMouseOver={(e) =>
                            (e.currentTarget.src =
                              '/assets/icons/icons8-diploma.svg')
                            }
                            onMouseOut={(e) =>
                            (e.currentTarget.src =
                              '/assets/icons/icons8-diploma.svg')
                            }
                            height='150'
                            width='150'
                          />
                        </LazyLoad>
                      </a>
                      <h6 className='dashboard-font-heading'>TRAINING</h6>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      md='3'
                      id='DrugAndAlcoholTest'
                    >
                      <div
                        style={{ width: '180px' }}
                        data-tut='DrugAndAlcoholTest'
                      >
                        <Link to='/reports'>
                          <LazyLoad height={150}>
                            <img
                              alt='dashDat'
                              className='img-responsive'
                              src='/assets/icons/icons8-resume.svg'
                              onMouseOver={(e) =>
                              (e.currentTarget.src =
                                '/assets/icons/icons8-resume.svg')
                              }
                              onMouseOut={(e) =>
                              (e.currentTarget.src =
                                '/assets/icons/icons8-resume.svg')
                              }
                              height='150'
                              width='150'
                            />
                          </LazyLoad>
                          <h6 className='dashboard-font-heading'>
                            REPORTS
                          </h6>
                        </Link>
                      </div>
                    </Col>
                  </div>

                  <div></div>
                  <br />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <FirstLoginTour />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Dashboard)
