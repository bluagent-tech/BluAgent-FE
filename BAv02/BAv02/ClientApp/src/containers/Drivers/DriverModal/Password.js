import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Input,
  UncontrolledTooltip,
  Form,
} from 'reactstrap';

//DRIVER CHANGE PASSWORD

class Password extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var alert = 'good';
    if (
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
        e.target.newPassword.value
      )
    ) {
      if (e.target.newPassword.value !== e.target.cNewPassword.value) {
        alert = 'different';
      }
    } else {
      if (
        /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
          e.target.newPassword.value
        )
      ) {
      } else {
        alert = 'new';
      }
    }
    var cp = new FormData(e.target);
    cp.append('id', this.props.id);
    cp.append('alert', alert);
    this.props.submit(cp);
  }

  render() {
    return (
      <div className='col-md-3'>
        <input
          onClick={this.props.toggle}
          className='img-responsive'
          type='image'
          src='assets/icons/icons8-maintenance.svg'
          onMouseOver={(e) =>
            (e.currentTarget.src = 'assets/icons/icons8-maintenance.svg')
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = 'assets/icons/icons8-maintenance.svg')
          }
          alt='Submit'
          height='150'
          width='150'
          disabled={
            this.props.disabled !== undefined && this.props.disabled !== null
              ? this.props.disabled
              : false
          }
        />
        <h6>CHANGE PASSWORD</h6>

        <Modal isOpen={this.props.modal} className='modal-sm'>
          <ModalHeader name='modal1' toggle={this.props.toggle}>
            CHANGE PASSWORD
          </ModalHeader>
          <Form onSubmit={this.handleSubmit} name='formCP'>
            <ModalBody>
              <FormGroup row>
                <Col md='12'>
                  <Label htmlFor='text-input'>Current Password</Label>
                  <Input
                    type='password'
                    id='pass'
                    name='password'
                    minLength='8'
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md='12'>
                  <Label htmlFor='text-input'>New Password</Label>
                  <Input
                    type='password'
                    id='npass'
                    name='newPassword'
                    minLength='8'
                    required
                  />
                </Col>
                <UncontrolledTooltip placement='bottom' target='npass'>
                  The password must contain at least 8 characters, 1 number or
                  symbol "!@#$%^& and 1 uppercase".
                </UncontrolledTooltip>
              </FormGroup>
              <FormGroup row>
                <Col md='12'>
                  <Label htmlFor='text-input'>Confirm Password</Label>
                  <Input
                    type='password'
                    id='cpass'
                    name='cNewPassword'
                    minLength='8'
                    required
                  />
                </Col>
                <UncontrolledTooltip placement='bottom' target='cpass'>
                  The password must contain at least 8 characters, 1 number or
                  symbol "!@#$%^& and 1 uppercase".
                </UncontrolledTooltip>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                className='buttons-royal text-white'
                type='submit'
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>{' '}
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
              <Button
                className='buttons-royal text-white'
                onClick={this.props.toggle}
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

export default Password;
