import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Form,
  Label,
  FormGroup,
} from "reactstrap";
import passwordImage from "../../src/assets/icons/icons8-password-80.png";
import Axios from "axios";

const ResetAllPassword = (props) => {
  const [password, setnewPasswordCompany] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const Color = "primary";
  const modalHeader = "";

  const handlePassword = (e) => {
    setnewPasswordCompany(e.target.value);
    if (
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
        e.target.value
      )
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    e.preventDefault();
  };

  const handleSubmitPassword = () => {
    setConfirmation(true);
  };

  const handleCleanStates = () => {
    setConfirmation(false);
    setnewPasswordCompany("");
  };

  const resetPassword = () => {
    Axios.post(`/api/CompanySuperAdmin/ResetAllPassword?password=${password}`)
      .then((response) => {
        console.log("response: ", response);
        if (response.status === 200) {
          props.toast(true, "Passwords changed successfully");
          handleCleanStates();
        } else {
          props.toast(true, "");
          handleCleanStates();
        }
      })
      .catch((error) => {
        console.log(error);
        props.toast(true, "");
        handleCleanStates();
      })
      .finally(() => props.toggle());
  };

  return (
    <Fragment>
      <Form>
        <FormGroup>
          <Modal isOpen={props.modal} className={"modal-" + "white"}>
            <ModalHeader toggle={props.toggle}></ModalHeader>
            <ModalBody>
              {confirmation ? (
                <div className="pb-4 pr-4 pl-4">
                  <div className="row">
                    <div className="col-sm-2">
                      <img src={passwordImage} width={"50px"} />
                    </div>
                    <div className="col-sm-10">
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "20px",
                          color: "#54595E",
                        }}
                      >
                        Confirm Reset Password
                      </div>
                      <div className="text-muted">
                        Are you sure you want to reset the all companies
                        passwords?
                      </div>
                    </div>
                  </div>
                  <div className="row pt-3 justify-content-around">
                    <div className="col-sm-6">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-lg w-100"
                        onClick={handleCleanStates}
                      >
                        No, Cancel
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg w-100"
                        onClick={resetPassword}
                      >
                        Yes, Confirm
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pb-4 pr-4 pl-4">
                  <div className="col">
                    <div
                      className="text-center"
                      style={{
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#54595E",
                      }}
                    >
                      Enter the New Password
                    </div>
                    <div className="text-center text-muted">
                      When resetting, the passwords of all companies will be
                      changed
                    </div>
                  </div>
                  <div className="pb-3 pt-3">
                    <Input
                      autoComplete="new-password"
                      type="password"
                      value={password}
                      placeholder={"New Password"}
                      onChange={handlePassword}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isValid}
                    color={Color}
                    onClick={() => {
                      handleSubmitPassword();
                    }}
                    className="btn-lg btn-block"
                  >
                    Reset Password
                  </Button>
                </div>
              )}
            </ModalBody>
          </Modal>
        </FormGroup>
      </Form>
    </Fragment>
  );
};

export default ResetAllPassword;
