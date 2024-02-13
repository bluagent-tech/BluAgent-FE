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
      email: "",
      password: ""
    };

    this.props.logout();
    this.getUrlVars = this.getUrlVars.bind(this);
    this.alert = this.alert.bind(this);
    this.handledSubmit = this.handledSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var token = this.getUrlVars()["token"];
    if (token !== undefined) {
      this.props.login("", "", token);
    }
  }

  getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value;
        return parts
      }
    );
    return vars;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handledSubmit(e) {
    e.preventDefault();
    let credential = {
      Email: "",
      Password: "",
      NewPassword: ""
    };
    const { email } = this.state;
    if (email) {
      credential.Email = email;
      this.props.ForgotPassword(credential);
    }
  }

  handleClickSwalEvent = () => {
    window.location.replace("login");
  };

  alert() {
    document.getElementById("forgotPasswordContainer").style.display = "none";
    swal({
      title: "Email Sent",
      icon: "success",
      text: `We've sent email to ${this.state.email}. It containes instructions on how to reset your password`,
      buttons: { Ok: { text: "Ok" } }
    }).then(() => {
      window.location.replace("login");
    });
  }

  render() {
    const { email } = this.state;

    return (
      <div className="app flex-row ">
        {this.props.message === "Email Sent" ? this.alert() : ""}
        <Container id="forgotPasswordContainer" style={{ marginTop: "30px" }}>
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
                            Enter your email address to receive instructions on
                            how reset your password.
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
                          type="email"
                          className="form-control"
                          placeholder="email@example.com"
                          autoComplete="email"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                          maxLength="100"
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
                          Send
                        </Button>
                      </Col>
                      {this.props.isLoading ? (
                        <img
                          style={{
                            width: "140px",
                            position: "absolute",
                            left: "225px",
                            bottom: "0px"
                          }}
                          src="../../assets/img/icons/loading2.gif"
                          alt="loading"
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
