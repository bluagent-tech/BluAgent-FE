import React, { Component } from "react";
import {
  Button,
  Card,
  CardSubtitle,
  CardFooter,
  CardBody,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/UserLog";
import swal from "sweetalert";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ""
    };
    this.confirmPassword = this.confirmPassword.bind(this);
    this.handledSubmit = this.handledSubmit.bind(this);
  }

  componentDidMount() {
    let token = this.props.match.params.token.replace("token=", "");
    if (token === undefined) {
      window.location.replace("/");
    } else {
      this.setState({ token: token });
    }
  }

  handledSubmit(e) {
    e.preventDefault();
    let credential = {
      Email: "",
      Password: "",
      NewPassword: ""
    };
    const { token } = this.state;
    if (this.PasswordC.value === this.Password.value) {
      credential.Email = this.Email.value;
      credential.Password = this.Password.value;
      credential.NewPassword = this.Password.value;
      this.props.ResetPassword(credential, token);
    }
  }

  confirmPassword(e) {
    e.preventDefault();
    if (e.target.value !== this.Password.value) {
      e.target.style = "border-color: red";
    } else {
      e.target.style = "";
    }
  }

  handleClickSwalEvent = () => {
    window.location.replace("login");
  };

  alert() {
    document.getElementById("resetPasswordContainer").style.display = "none";
    swal({
      title: "Password Changed",
      icon: "success",
      text: "The password has been succesfully changed",
      buttons: { Ok: { text: "Ok" } }
    }).then(() => {
      window.location.replace("login");
    });
  }

  render() {
    return (
      <div className="app flex-row ">
        {this.props.message === "Password Changed Correctly"
          ? this.alert()
          : ""}
        <Container id="resetPasswordContainer" style={{ marginTop: "30px" }}>
          <Row className="justify-content-center font-weight-bold">
            <Col md="7" className="ml-5 ">
              Reset Password
            </Col>
          </Row>
          <br />
          <Row className="justify-content-center">
            <Col md="7">
              <Form
                id="form"
                name="form"
                onSubmit={this.handledSubmit}
                ref={form => (this.form = form)}
              >
                <Card className="mx-4 shadow rounded">
                  <CardBody className="p-4">
                    <Row className="mb-4">
                      <Col className="text-center">
                        <div className="p-1">
                          <img
                            src="../../assets/img/logo/logo.png"
                            alt="branding logo"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="justify-content-center mb-4">
                      <Col>
                        <CardSubtitle className=" text-muted pt-2">
                          <span>
                            To reset your password enter your new password and
                            Email.
                          </span>
                        </CardSubtitle>
                      </Col>
                    </Row>
                    <InputGroup>
                      <Col md="3" className=" text-muted pt-2">
                        <span>Email</span>
                      </Col>
                      <Col md="9">
                        <input
                          ref={Email => (this.Email = Email)}
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="Email"
                          autoComplete="email"
                          maxength="100"
                          required
                        />
                      </Col>
                    </InputGroup>
                    <InputGroup style={{ marginTop: "10px" }}>
                      <Col md="3" className=" text-muted pt-2">
                        <span>Password</span>
                      </Col>
                      <Col md="9">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password (8 or more characters)"
                          id="Password"
                          name="Password"
                          ref={Password => (this.Password = Password)}
                          minLength="8"
                          required
                        />
                      </Col>
                    </InputGroup>
                    <InputGroup style={{ marginTop: "10px" }}>
                      <Col md="3" className=" text-muted pt-2">
                        <span>Confirm</span>
                      </Col>
                      <Col md="9">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          onBlur={this.confirmPassword}
                          id="PasswordC"
                          name="PasswordC"
                          ref={PasswordC => (this.PasswordC = PasswordC)}
                          minLength="8"
                          required
                        />
                      </Col>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="p-3 bg-white">
                    <Row className="justify-content-end mb-2">
                      <Col xl="3" className="text-center">
                        <Button
                          type="submit"
                          color="primary"
                          className="px-2"
                          block
                        >
                          Reset Password
                        </Button>
                      </Col>
                      {this.props.isLoading ? (
                        <img
                          alt="loading"
                          style={{
                            width: "140px",
                            position: "absolute",
                            left: "225px",
                            bottom: "0px"
                          }}
                          src="../../assets/img/icons/loading2.gif"
                        />
                      ) : (
                        <div />
                      )}
                    </Row>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  state => state.userLog,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ForgotPassword);
