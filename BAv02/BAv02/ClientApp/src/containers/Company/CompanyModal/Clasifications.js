import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Form,
} from 'reactstrap';

class Clasifications extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onChangeReadOnly = this.onChangeReadOnly.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form.append('idC', this.props.id);
    this.props.submit(form);
    this.toggle();
    e.stopPropagation();
  }

  toggle() {
    this.props.toggle(this.props.modalC);
    this.props.getData(this.props.id);
  }

  onChangeReadOnly(e) {
    const { checked } = e.target;
    if (e.target.name === 'DD') {
      if (checked === true) {
        document.getElementById('otherText').style.display = 'block';
      } else {
        document.getElementById('otherText').style.display = 'none';
      }
    } else {
      if (checked === true) {
        document.getElementById('passenger').style.display = 'block';
      } else {
        document.getElementById('passenger').style.display = 'none';
      }
    }
  }

  render() {
    return (
      <div>
        <Button
          type='submit'
          id='classi'
          onClick={this.toggle}
          className='px-2 buttons-royal text-white'
          block
        >
          {' '}
          Open
        </Button>
        <Modal isOpen={this.props.modalC} className={'modal-lg '}>
          <ModalHeader name='modal1' toggle={this.toggle}>
            CARGO CLASSIFICATIONS (check all that apply)
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.A}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='A'
                      />
                      General Freight
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.I}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='I'
                      />
                      Machinery, Large Objects
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.Q}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='Q'
                      />
                      Coal/Coke
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.Y}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='Y'
                      />
                      Paper Product
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.B}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='B'
                      />
                      Household Goods
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.J}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='J'
                      />
                      Fresh Produce
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.R}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='R'
                      />
                      Meat
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.Z}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='Z'
                      />
                      Utility
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.C}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='C'
                      />
                      Metal: Sheets, Coils, Rolls
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.K}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='K'
                      />
                      Liquids/Gases
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.S}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='S'
                      />
                      Garbage, Refuse, Trash
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.AA}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='AA'
                      />
                      Farm Supplies
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.D}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='D'
                      />
                      Motor Vehicles
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.L}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='L'
                      />
                      Intermodal Container
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.T}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='T'
                      />
                      U.S. Mail
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.BB}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='BB'
                      />
                      Construction
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.E}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='E'
                      />
                      Drive Away/Towaway
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.M}
                        value='true'
                        name='M'
                        style={{ marginRight: '5px' }}
                        onChange={this.onChangeReadOnly}
                      />
                      Passengers
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.U}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='U'
                      />
                      Chemicals
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.CC}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='CC'
                      />
                      Water Well
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.F}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='F'
                      />
                      Logs, Poles, Beams, Lumber
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.N}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='N'
                      />
                      Oil Field Equipment
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.V}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='V'
                      />
                      Commodities Dry Bulk
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.G}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='G'
                      />
                      Building Materials
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.O}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='O'
                      />
                      Livestock
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.W}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='W'
                      />
                      Refrigerated Food
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.H}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='H'
                      />
                      Mobile Homes
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.P}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='P'
                      />
                      Grain, Feed, Hay
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.X}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='X'
                      />
                      Beverages
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.cargoC.DD}
                        value='true'
                        onChange={this.onChangeReadOnly}
                        style={{ marginRight: '5px' }}
                        name='DD'
                      />
                      Other
                    </label>
                    <input
                      type='text'
                      id='otherText'
                      className='form-control'
                      style={{ display: 'none' }}
                      name='Other'
                      defaultValue={this.props.cargoC.Other}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <div id='passenger' style={{ display: 'none' }}>
                <Row>
                  <Col>
                    <FormGroup>
                      <label style={{ fontWeight: 'bold' }}>
                        ALL MOTOR PASSENGER CARRIER APPLICANTS must certify as
                        follows:
                      </label>
                      <label>
                        Applicant is fit, willing, and able to provide the
                        proposed operations and to comply with all pertinent
                        statutory and regulatory requirements, including the
                        U.S. Department of Transportation’s Americans with
                        Disabilities Act regulations for over-the-road bus
                        companies located at 49 CFR Part 37, Subpart H, if
                        applicable.
                        <input
                          type='checkbox'
                          defaultChecked={
                            this.props.cargoC.PassengerCertificate
                          }
                          value='true'
                          style={{ marginLeft: '25px', marginRight: '5px' }}
                          name='PassengerCertificate'
                        />
                        <label>Yes</label>
                      </label>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className='text-white buttons-royal'
                type='submit'
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>
              {this.props.isLoading ? (
                <img
                  alt='loading'
                  style={{
                    width: '140px',
                    position: 'absolute',
                    marginTop: '0px',
                    right: '40%',
                  }}
                  src='../../assets/img/icons/loading2.gif'
                />
              ) : null}
              <Button
                className='text-white buttons-royal'
                onClick={this.toggle}
              >
                Close
              </Button>{' '}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Clasifications;
