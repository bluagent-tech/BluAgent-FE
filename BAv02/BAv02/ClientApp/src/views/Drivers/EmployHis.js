import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Drivers';
import SignatureEmploymentHistoryRecords from './../../containers/signatureEmploymentHistoryRecords';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import DatePicker from '../../components/DatePicker';
const idCompany = localStorage['idCompany'];

//EMPLOYMENT HISTORY DRIVER LINK

class EmployHis extends Component {
  constructor(props) {
    super(props);
    this.state = { link: '', id: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLink = this.getLink.bind(this);
    this.getParams = this.getParams.bind(this);
    this.alert = this.alert.bind(this);
  }

  componentDidMount() {
    if (
      this.props.match.params.id !== null &&
      this.props.match.params.id !== undefined
    ) {
      return this.props.match.params.id;
    } else {
      var d = atob(this.props.match.params.x.substr(5)).split(',');
      let mydate = new Date(d[4]);
      let convert = mydate.getTime();
      if (Date.now() <= convert) {
        return this.props.match.params.id;
      } else {
        this.props.history.push('/login');
      }
    }
    var canvas = document.getElementById(this.props.match.params.idE);

    function resizeCanvas() {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.getContext('2d').scale(ratio, ratio);
    }
    if (
      this.props.match.params.x !== null &&
      this.props.match.params.x !== undefined
    ) {
      window.onresize = resizeCanvas;
      resizeCanvas();
    }
  }

  getLink() {
    var date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    var dd = [
      this.props.match.params.id,
      this.props.match.params.idE,
      this.props.match.params.name,
      idCompany,
      date.getTime(),
    ];
    var d = JSON.stringify(dd);
    var f = 'HmTpS' + btoa(d);
    this.setState({ link: window.location.origin + '/#/LetterInAndEmployHis/' + f });
  }

  getParams(param) {
    let d = [];
    if (param === 'company') {
      d = atob(this.props.match.params.x.substr(5)).split(',');
      return d[3];
    }
    if (param === 'user') {
      d = atob(this.props.match.params.x.substr(5)).split(',');
      return d[0];
    }
    if (param === 'name') {
      d = atob(this.props.match.params.x.substr(5)).split(',');
      return d[2];
    }

    if (param === 'idE') {
      d = atob(this.props.match.params.x.substr(5)).split(',');
      return d[1];
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var can = document.getElementById(
      this.props.match.params.idE
        ? this.props.match.params.idE
        : this.getParams('idE')
    );
    var rt = new FormData(e.target);
    var signature = can.toDataURL('image/png');
    if (
      this.props.match.params.idE !== null &&
      this.props.match.params.idE !== undefined
    ) {
      rt.append('Id', this.props.match.params.idE);
      rt.append('IdDriver', this.props.match.params.id);
    } else {
      let d = atob(this.props.match.params.x.substr(5)).split(',');
      rt.append('id', d[1]);
      rt.append('IdDriver', d[0]);
    }

    if (signature) {
      rt.append('Signature', 'signature.png');
    }

    if (idCompany !== null && idCompany !== undefined) {
      rt.append('IdCompany', idCompany);
    } else {
      let d = atob(this.props.match.params.x.substr(5)).split(',');
      rt.append('IdCompany', d[3]);
    }

    if (
      this.props.match.params.name !== null &&
      this.props.match.params.name !== undefined
    ) {
      rt.append('DriverName', this.props.match.params.name);
    } else {
      let d = atob(this.props.match.params.x.substr(5)).split(',');
      rt.append('DriverName', d[2]);
    }
    this.props.saveEHistoryAnswer(rt);
  }

  alert() {
    swal({
      title: 'Survey completed',
      icon: 'success',
      buttons: {
        Ok: {
          text: 'Ok',
          onClick: this.props.history.push(
            '/Drivers/' + this.props.match.params.id
          ),
        },
      },
    });
  }

  render() {
    return (
      <div className='container-fluid' style={{ marginTop: '3%' }}>
        <div className='animated fadeIn'>
          {/* DRIVER */}
          {/*LEVEL 1*/}
          <Row>
            <Col sm='3'>
              <Card className='text-center'>
                <CardBody className='text-white bg-primary'>
                  <div className='text-center'>
                    <img
                      src={
                        this.props.match.params.id !== null &&
                        this.props.match.params.id !== undefined
                          ? `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${this.props.match.params.id}/driverAvatar.png`
                          : `https://bluagent-files.s3-us-west-2.amazonaws.com/${this.getParams(
                              'company'
                            )}/Drivers/${this.getParams(
                              'user'
                            )}/driverAvatar.png`
                      }
                      ref={(img) => (this.img = img)}
                      onError={() =>
                        (this.img.src = 'assets/img/Images/profile/profile.png')
                      }
                      width='200px'
                      height='200px'
                      alt={this.props.driver.Image}
                      className='img-avatar'
                    />
                    <span className='avatar-status badge-danger'></span>
                  </div>
                  <div className='text-center'>
                    {this.props.match.params.name !== null &&
                    this.props.match.params.name !== undefined
                      ? this.props.match.params.name
                      : this.getParams('name')}
                  </div>
                  <div>{this.props.driver.License}</div>
                </CardBody>
              </Card>
              {this.props.match.params.id !== null &&
              this.props.match.params.id !== undefined ? (
                <Card className='text-center'></Card>
              ) : (
                ''
              )}
            </Col>
            {/*LEVEL 2*/}
            <Col sm='9'>
              <Card>
                <CardHeader className='text-center'>
                  <h5>
                    REQUEST FOR EMPLOYMENT INFORMATION FROM PREVIOUS EMPLOYER
                  </h5>
                  <div className='card-header-actions'>
                    {this.props.match.params.id !== null &&
                    this.props.match.params.id !== undefined ? (
                      <Link to={'Dashboard'}>
                        <Button size='md' outline color='primary'>
                          Back
                        </Button>
                      </Link>
                    ) : (
                      ''
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          1. Is the employment record with your company correct
                          as stated above?
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='1'
                          name='Question1'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>YES</option>
                          <option value={1}>NO</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          2. What kind of work did the applicant do?
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='2'
                          name='Question2'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>DRIVER</option>
                          <option value={1}>MECHANIC</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          3. Did the applicant drive commercial motor vehicles?
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='3'
                          name='Question3'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>YES</option>
                          <option value={1}>NO</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          4. Was the applicant a safe and efficient driver?
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='4'
                          name='Question4'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>YES</option>
                          <option value={1}>NO</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          5. Was the applicant involved in any vehicle
                          accidents?
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='5'
                          name='Question5'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>YES</option>
                          <option value={1}>NO</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          6. Reason for leaving your company:
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='6'
                          name='Question6'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>Discharged</option>
                          <option value={1}>Laid off</option>
                          <option value={2}>Resigned</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>Remarks:</Label>
                        <Input
                          type='textarea'
                          id='6'
                          name='RemarkQuestion6'
                          style={{ resize: 'none' }}
                          maxLength='355'
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          7. Was the applicant's general conduct satisfactory?
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='7'
                          name='Question7'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>YES</option>
                          <option value={1}>NO</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          8. Is the applicant competent for the position sought?
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='8'
                          name='Question8'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>YES</option>
                          <option value={1}>NO</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>
                          9. Did the applicant at any time drink alcoholic
                          beverages while on duty?
                        </Label>
                      </Col>
                      <Col md='5'>
                        <select
                          id='9'
                          name='Question9'
                          className='form-control'
                          required
                        >
                          <option value=''>SELECT</option>
                          <option value={0}>YES</option>
                          <option value={1}>NO</option>
                        </select>
                      </Col>
                    </FormGroup>
                    <FormGroup row className='text-center'>
                      <Col md='3'>
                        <Label htmlFor='text-input'></Label>
                      </Col>
                      <Col md='3'>
                        <Label>Excellent</Label>
                      </Col>
                      <Col md='3'>
                        <Label>Good</Label>
                      </Col>
                      <Col md='3'>
                        <Label>Bad</Label>
                      </Col>
                    </FormGroup>
                    <FormGroup row className='text-center'>
                      <Col md='3'>
                        <Label htmlFor='text-input'>Quality of work</Label>
                      </Col>
                      <Col md='3'>
                        <Input
                          type='radio'
                          id='c'
                          value={1}
                          name='Quality'
                          required
                        />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={2} name='Quality' />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={3} name='Quality' />
                      </Col>
                    </FormGroup>
                    <FormGroup row className='text-center'>
                      <Col md='3'>
                        <Label htmlFor='text-input'>
                          Cooperation with others
                        </Label>
                      </Col>
                      <Col md='3'>
                        <Input
                          type='radio'
                          id='c'
                          value={1}
                          name='Cooperation'
                          required
                        />
                      </Col>
                      <Col md='3'>
                        <Input
                          type='radio'
                          id='c'
                          value={2}
                          name='Cooperation'
                        />
                      </Col>
                      <Col md='3'>
                        <Input
                          type='radio'
                          id='c'
                          value={3}
                          name='Cooperation'
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className='text-center'>
                      <Col md='3'>
                        <Label htmlFor='text-input'>Safety habits</Label>
                      </Col>
                      <Col md='3'>
                        <Input
                          type='radio'
                          id='c'
                          value={1}
                          name='Safety'
                          required
                        />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={2} name='Safety' />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={3} name='Safety' />
                      </Col>
                    </FormGroup>
                    <FormGroup row className='text-center'>
                      <Col md='3'>
                        <Label htmlFor='text-input'>Personal habits</Label>
                      </Col>
                      <Col md='3'>
                        <Input
                          type='radio'
                          id='c'
                          value={1}
                          name='Personal'
                          required
                        />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={2} name='Personal' />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={3} name='Personal' />
                      </Col>
                    </FormGroup>
                    <FormGroup row className='text-center'>
                      <Col md='3'>
                        <Label htmlFor='text-input'>Driving skill</Label>
                      </Col>
                      <Col md='3'>
                        <Input
                          type='radio'
                          id='c'
                          value={1}
                          name='Driving'
                          required
                        />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={2} name='Driving' />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={3} name='Driving' />
                      </Col>
                    </FormGroup>
                    <FormGroup row className='text-center'>
                      <Col md='3'>
                        <Label htmlFor='text-input'>Attitude</Label>
                      </Col>
                      <Col md='3'>
                        <Input
                          type='radio'
                          id='c'
                          value={1}
                          name='Attitude'
                          required
                        />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={2} name='Attitude' />
                      </Col>
                      <Col md='3'>
                        <Input type='radio' id='c' value={3} name='Attitude' />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='7'>
                        <Label htmlFor='text-input'>Remarks:</Label>
                        <Input
                          type='textarea'
                          id='6'
                          name='Remarks'
                          style={{ resize: 'none' }}
                          maxLength='355'
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <DatePicker
                        id='date'
                        name='DateMailed'
                        labelText='Date'
                      />
                    </FormGroup>
                    <p
                      style={{
                        fontSize: '13pt',
                        textAlign: 'justify',
                        width: '550px',
                      }}
                    >
                      This section was completed by:
                    </p>
                    <FormGroup row>
                      <Col md='6'>
                        <Label htmlFor='text-input'>Name</Label>
                        <Input
                          type='text'
                          id='6'
                          name='Name'
                          maxLength='50'
                          required
                        />
                      </Col>
                      <Col md='6'>
                        <Label htmlFor='text-input'>Title</Label>
                        <Input
                          type='text'
                          id='6'
                          name='Title'
                          maxLength='50'
                          required
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md='4'>
                        {this.props.signature === 'signature.png' ? (
                          <img
                            id='SignatureHistory'
                            name='SignatureHistory'
                            src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/EmployerSignatureHistory/${this.props.match.params.idE}/signature.png`}
                            alt='employer-signature'
                          />
                        ) : (
                          <SignatureEmploymentHistoryRecords
                            name='eHisitory'
                            id={
                              this.props.match.params.idE
                                ? this.props.match.params.idE
                                : this.getParams('idE')
                            }
                            saveSignatureFile={
                              this.props.saveSignatureFileEmployerHistory
                            }
                          />
                        )}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md='4'>
                        <Button
                          size='md'
                          outline
                          color='primary'
                          onClick={this.toggle}
                        >
                          Save
                        </Button>
                        {this.props.isLoading ? (
                          <img
                            style={{
                              width: '140px',
                              position: 'absolute',
                              marginTop: '0px',
                              right: '40%',
                            }}
                            src='../../assets/img/icons/loading2.gif'
                            alt='loading'
                          />
                        ) : (
                          <div />
                        )}
                      </Col>
                      <Col md='7'>
                        {this.props.message === 'Saved Correctly'
                          ? this.alert()
                          : ''}
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(EmployHis);
