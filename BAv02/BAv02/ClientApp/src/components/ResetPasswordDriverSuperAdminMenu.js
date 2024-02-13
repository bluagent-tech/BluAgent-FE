import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Form, Label } from "reactstrap";

const ResetPasswordDriverSuperAdminMenu = (props) => {
  const [password, setnewPasswordDriver] = useState('');
  const [isValid, setIsValid] = useState(true)
  const Color = 'primary';
  const modalHeader = 'Reset Password';

  const handlePassword = (e) => {
    e.preventDefault();
    setnewPasswordDriver(e.target.value);
    if (/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
      e.target.value)) {
      setIsValid(false)
    } else { setIsValid(true) }
  }

  const handleSubmitPassword = () => {
    //conexion
    axios.post('/api/UserLog/updateUserPassword?idUser=' + props.idDriver + "&password=" + password)
      .then((response) => {
        const r = JSON.parse(response.data);
        if (r.status === 0) {
          props.toast(true, 'Password changed successfully')
        }
        else {
          props.toast(true, '')
        }
      }).catch(error => { console.log(error); props.toast(true, '') })
    setnewPasswordDriver('');
  }
  return (
    <Form onSubmit={handleSubmitPassword}>
      <Modal isOpen={props.modal} className={"modal-" + Color}>
        <ModalHeader toggle={props.toggle}>
          {props.modalHeader === undefined
            ? modalHeader
            : props.modalHeader}
        </ModalHeader>
        <ModalBody>{props.message}
          <Label>New Password:</Label>
          <Input
            value={password}
            onChange={handlePassword}
            type='password'
          />
        </ModalBody>

        <ModalFooter>
          <Button
            disabled={isValid}
            type='submit'
            color={Color}
            onClick={() => { handleSubmitPassword(); props.toggle() }}
          >
            {props.modalHeader === undefined
              ? modalHeader
              : modalHeader}
          </Button>{" "}
          <Button color="secondary" onClick={()=>{props.toggle();setnewPasswordDriver('')}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Form>

  )
}

export default ResetPasswordDriverSuperAdminMenu;