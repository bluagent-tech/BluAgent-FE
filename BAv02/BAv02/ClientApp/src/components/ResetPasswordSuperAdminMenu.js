import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Form, Label, FormGroup } from "reactstrap";
import ToastAlert from "./ToastAlert";

const ResetPasswordSuperAdminMenu = (props) => {
  const [password, setnewPasswordCompany] = useState('');
  const [isValid, setIsValid] = useState(true)
  const Color = 'primary';
  const modalHeader = 'Reset Password';

  const handlePassword = (e) => {
    setnewPasswordCompany(e.target.value)
    if (/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
      e.target.value)) {
        setIsValid(false)
      } else { setIsValid(true) }
      e.preventDefault();
  }

  const handleSubmitPassword = () => {
    //conexion
    axios.post('/api/UserLog/updateCompanyPassword?idCompany=' + props.idCompany + "&password=" + password)
      .then((response) => {
        const r = JSON.parse(response.data);
        if (r.status === 0) {
          props.toast(true, 'Password changed successfully')
        }
        else {
          props.toast(true, '')
        }
      }).catch(error => { console.log(error); props.toast(true, '') })
    setnewPasswordCompany('');
  }


  return (
    <Fragment>
      <Form onSubmit={handleSubmitPassword}>
        <FormGroup>
          <Modal isOpen={props.modal} className={"modal-" + Color}>
            <ModalHeader toggle={props.toggle}>
              {props.modalHeader === undefined
                ? modalHeader
                : props.modalHeader}
            </ModalHeader>
            <ModalBody>{props.message}
              <Label>New Password:</Label>
              <Input
                autoComplete="new-password"
                type='password'
                value={password}
                onChange={handlePassword}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                disabled={isValid}
                color={Color}
                onClick={() => { handleSubmitPassword(); props.toggle() }}
              >
                {props.modalHeader === undefined
                  ? modalHeader
                  : modalHeader}
              </Button>{" "}
              <Button color="secondary" onClick={()=>{props.toggle();setnewPasswordCompany('')}}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </FormGroup>
      </Form>
    </Fragment>
  )
}

export default ResetPasswordSuperAdminMenu;