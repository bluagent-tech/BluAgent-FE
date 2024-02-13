import React, { Component, Fragment } from 'react';
import { Col, Row, Button, Badge, FormGroup, Input, UncontrolledTooltip } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './../../../store/DrugAndAlcoholTesting';

const idCompany = JSON.parse(localStorage.getItem('idCompany'));

class DrugTestRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleShowTextArea = this.handleShowTextArea.bind(this);
    this.reScheduleDrugTest = this.reScheduleDrugTest.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  openReason(id) {
    let elemento = document.getElementById("reason" + id);
    elemento.style.display = "block";
  }

  closeReason(id) {
    let elemento = document.getElementById("reason" + id);
    elemento.style.display = "none";
  }

  reScheduleDrugTest(IdRandom, IdDriver, q, idCompany) {
    let elemento = document.getElementById("comment" + IdRandom).value;
    var form = new FormData();
    form.append('DriverID', IdDriver);
    form.append('reason', elemento);
    form.append('q', q);
    form.append('idCompany', idCompany);
    form.append('IdRandom', IdRandom);
    form.append('type', this.props.type)
    this.props.generateReSchedule(form);
    this.closeReason(IdRandom);
  }

  handleShowTextArea(e, selectCancelOption) {
    e.preventDefault();
    if (selectCancelOption !== 'select') {
      this.setState({
        showTextArea: !this.state.showTextArea,
      });
    }
  }

  handleResultText = (result, status, idDriver) => {
    if (result !== null) {
      return result;
    } else if (result === null) {
      return 'Pending';
    } else {
      if (status === 'Canceled') {
        return 'Canceled';
      } else {
        return 'Pending';
      }
    }
  };

  render() {
    return (
      <Fragment>
        <ol>
          {this.props.driversRandomList.map((drivers) => (
            <li key={drivers.IdDriver}>
              <Row>
                <Col>
                  <p>{drivers.Name === null ? "Manual Test" : drivers.Name}</p>
                  <p>{drivers.LastName}</p>
                  <p>{drivers.PhoneNumber}</p>
                </Col>
                <Col>
                  <label style={{ textAlign: 'center', display: 'block' }}>
                    Status
                  </label>
                  <Badge
                    id={'badgeStatus' + drivers.IdDriver}
                    pill
                    style={
                      drivers.Status === 'Draft'
                        ? {
                          backgroundColor: "#f5e74e",
                          color: '#ffffff',
                          fontSize: '9pt',
                        }
                        : drivers.Status === 'Scheduled'
                          ? {
                            backgroundColor: '#ffc107',
                            color: '#ffffff',
                            fontSize: '9pt',
                          }
                          : drivers.Status === 'Canceled'
                            ? {
                              backgroundColor: '#e93535',
                              color: '#ffffff',
                              fontSize: '9pt',
                            }
                            : drivers.Status === 'Collection Initiated'
                              ? {
                                backgroundColor: '#3b86ff',
                                color: '#ffffff',
                                fontSize: '9pt',
                              }
                              : drivers.Status === null
                                ? {
                                  backgroundColor: '#ffc107',
                                  color: '#ffffff',
                                  fontSize: '9pt',
                                }
                                : {
                                  backgroundColor: '#4ad991',
                                  color: '#ffffff',
                                  fontSize: '9pt',
                                }
                    }
                  >
                    {drivers.Status !== null ? drivers.Status === "Draft" ? "Ready to Schedule" : drivers.Status : 'Pending'}
                  </Badge>

                  <label style={{ textAlign: 'center', display: 'block' }}>
                    Result
                  </label>
                  <Badge
                    id={'badgeResult' + drivers.IdDriver}
                    pill
                    style={
                      drivers.Result === 'Pending'
                        ? {
                          backgroundColor: '#17a2b8',
                          color: '#ffffff',
                          fontSize: '9pt',
                        }
                        : drivers.Result === 'Negative'
                          ? {
                            backgroundColor: '#28a745',
                            color: '#ffffff',
                            fontSize: '9pt',
                          }
                          : drivers.Result === 'Negative - Diluted'
                            ? {
                              backgroundColor: '#f0650e',
                              color: '#ffffff',
                              fontSize: '9pt',
                            }
                            : drivers.Result === null
                              ? drivers.Status === 'Canceled'
                                ? {
                                  backgroundColor: '#e93535',
                                  color: '#ffffff',
                                  fontSize: '9pt',
                                }
                                : {
                                  backgroundColor: '#17a2b8',
                                  color: '#ffffff',
                                  fontSize: '9pt',
                                }
                              : {
                                backgroundColor: '#e93535',
                                color: '#ffffff',
                                fontSize: '9pt',
                              }
                    }
                  >
                    {this.handleResultText(
                      drivers.Result,
                      drivers.Status,
                      'badgeResult' + drivers.IdDriver
                    )}
                  </Badge>
                </Col>
                <Col>
                  <ul className='icons-ul'>
                    {drivers.ResultFile !== null ? (
                      <li className='icons-list'>
                        <a
                          href={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${drivers.IdDriver}/DrugTestFile/${drivers.ResultFile}`}
                          target='_blank'
                        >
                          <i className='fa fa-download icons-blue' id='downloadTooltip'></i>
                          <UncontrolledTooltip target='downloadTooltip'><p>Download Result</p></UncontrolledTooltip>                        </a>
                      </li>
                    ) : (
                      <li className='icons-list'>
                        <i className='fa fa-download' id='downloadTooltip'></i>
                        <UncontrolledTooltip target='downloadTooltip'><p>Download Result</p></UncontrolledTooltip>
                      </li>
                    )}
                    {drivers.Status === 'Draft' && this.props.complete != 'Completed' ? (
                      <li className='icons-list'>
                        <i
                          //onClick={() => this.reScheduleDrugTest(drivers.Id,drivers.IdDriver,drivers.Quarter,drivers.IdCompany)}
                          onClick={() => this.openReason(drivers.Id)}
                          className='fas fa-sync-alt icons-blue'
                          style={{ cursor: 'pointer' }}
                        ></i>
                      </li>
                    ) :
                      (
                        <li className='icons-list'>
                          <i className='fas fa-sync-alt'></i>
                        </li>
                      )}
                  </ul>
                </Col>
              </Row>
              <hr />
              <Row
                id={"reason" + drivers.Id}
                style={{ display: 'none', marginBottom: '2rem' }}
              >
                <Col md='12' sm='12' className="text-center">
                  <FormGroup>
                    <Row>
                      <Col md="1">
                        <span>Reason:</span>
                      </Col>
                      <Col md="6">
                        <Input
                          id={"comment" + drivers.Id}
                          type='text'
                        >
                        </Input>
                      </Col>
                      <Col md="5">
                        <Button
                          onClick={() => this.reScheduleDrugTest(drivers.Id, drivers.IdDriver, drivers.Quarter, drivers.IdCompany)}
                          className='btn buttons-royal text-white px-5'
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => this.closeReason(drivers.Id)}
                          className='btn buttons-royal text-white px-5'>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </li>
          ))}
        </ol>
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(DrugTestRandom);
