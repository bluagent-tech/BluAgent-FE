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

class OperationClasification extends React.Component {
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
    this.props.toggle(this.props.modalO);
    this.props.getData(this.props.id);
  }

  onChangeReadOnly(e) {
    const { checked } = e.target;
    if (checked === true) {
      document.getElementById('otherText').style.display = 'block';
    } else {
      document.getElementById('otherText').style.display = 'none';
    }
  }

  render() {
    return (
      <div>
        <Button
          type='submit'
          onClick={this.toggle}
          className='px-2 buttons-royal text-white'
          htmlFor='formOperation'
          block
        >
          {' '}
          Open
        </Button>
        <Modal isOpen={this.props.modalO} className={'modal-lg '}>
          <ModalHeader name='modal1' toggle={this.toggle}>
            OPERATION CLASSIFICATIONS (check all that apply)
          </ModalHeader>
          <Form id='formOperation' onSubmit={this.handleSubmit}>
            <ModalBody>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.A}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='A'
                      />
                      Authorized For-Hire
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.D}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='D'
                      />
                      Private Motor Carrier of Passengers (Business)
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.G}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='G'
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
                        defaultChecked={this.props.operationC.B}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='B'
                      />
                      Exempt For-Hire
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.E}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='E'
                      />
                      Private Motor Carrier of Passengers (Non-Business)
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.H}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='H'
                      />
                      Federal Government
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
                        defaultChecked={this.props.operationC.C}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='C'
                      />
                      Private Property
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.F}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='F'
                      />
                      Migrant
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.I}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='I'
                      />
                      State Government
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
                        defaultChecked={this.props.operationC.J}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='J'
                      />
                      Local Government
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.K}
                        value='true'
                        style={{ marginRight: '5px' }}
                        name='K'
                      />
                      Indian Tribe
                    </label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label>
                      <input
                        type='checkbox'
                        defaultChecked={this.props.operationC.L}
                        value='true'
                        onChange={this.onChangeReadOnly}
                        style={{ marginRight: '5px' }}
                        name='L'
                      />
                      Other
                    </label>
                    <input
                      type='text'
                      id='otherText'
                      className='form-control'
                      style={{ display: 'none' }}
                      name='Other'
                      defaultValue={this.props.operationC.Other}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                className='buttons-royal text-white'
                type='submit'
                disabled={this.props.isLoading ? true : false}
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
                  alt='loading'
                  src='../../assets/img/icons/loading2.gif'
                />
              ) : (
                <div></div>
              )}
              <Button
                className='buttons-royal text-white'
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

export default OperationClasification;
