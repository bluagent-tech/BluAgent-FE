import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  CardSubtitle,
  CardBody,
  Col,
  Form,
  InputGroup,
  Row,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/UserLog";

class Login extends Component {
  constructor(props) {
    super(props);
    localStorage.clear();
    this.state = {
      email: "",
      password: "",
    };

    this.props.logout();
    this.getUrlVars = this.getUrlVars.bind(this);

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
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return parts;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handledSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(email, password);
    }
  }

  render() {
    const { email, password } = this.state;
    const user = localStorage.getItem("user");
    return (
      <div
        className="app flex-row align-items-center"
        style={{
          backgroundImage: "url(../../assets/img/Images/login/BALogin.png)",
          backgroundSize: "cover",
          backgroundPositionX: "-500px",
        }}
      >
        {user ? (
          <Redirect
            to={{ pathname: "/", state: { from: this.props.location } }}
          />
        ) : (
          <div />
        )}

        <div
          className="mx-4 shadow login-screen"
          style={{
            position: "absolute",
            right: "-24px",
            /* margin: 20px; */
            maxWidth: "600px",
            width: "600px",
            paddingTop: "100px",
            backgroundColor: "white",
            height: "inherit",
          }}
        >
          <CardBody className="p-4">
            <Row className="justify-content-center mb-4">
              <Col className="text-center">
                <div className="p-1  justify-content-center">
                  <img
                    style={{ width: "300px" }}
                    src="../../assets/img/logo/BluAgent-Logo.png"
                    alt="branding logo"
                  />
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center mb-4">
              <Col>
                <CardSubtitle className=" text-muted pt-2  text-center testchange">
                  <span style={{ fontSize: "x-large" }}>
                    Trucking Compliance <br /> Made Easy
                  </span>
                  <br />
                </CardSubtitle>
              </Col>
            </Row>
            <br />
            <Form
              id="form"
              name="form"
              onSubmit={this.handledSubmit}
              ref={(form) => (this.form = form)}
              style={{ textAlign: "-webkit-center" }}
            >
              <InputGroup className="mb-4" style={{ width: "75%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  autoComplete="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  maxLength="100"
                  required
                  style={{
                    border: "1px solid #6c757db5",
                    borderRadius: "0",
                    fontSize: "large",
                  }}
                />
              </InputGroup>
              <InputGroup className="mb-4" style={{ width: "75%" }}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  autoComplete="current-password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  maxLength="20"
                  required
                  style={{
                    border: "1px solid #6c757db5",
                    borderRadius: "0",
                    fontSize: "large",
                  }}
                />
              </InputGroup>
              <div style={{ width: "75%" }}>
                <div>
                  <Button
                    type="submit"
                    color="primary"
                    className="px-4"
                    block
                    style={{
                      borderRadius: "0",
                      backgroundColor: "#5fa1fc",
                      borderColor: "#5fa1fc",
                      fontSize: "x-large",
                    }}
                  >
                    Login
                  </Button>
                </div>
                {this.props.isLoading ? (
                  <img
                    style={{
                      width: "140px",
                    }}
                    src="../../assets/img/icons/loading2.gif"
                    alt="loading"
                  />
                ) : (
                  <div />
                )}
                <div>
                  <br />
                  <Link to="/forgotPassword">
                    <small
                      color="#5fa1fc"
                      className="px-2"
                      tabIndex={-1}
                      style={{ color: "#5fa1fc", fontSize: "large" }}
                    >
                      Forgot your password?
                    </small>
                  </Link>
                </div>
              </div>
              <br />
              <Row className="justify-content-center">
                <br />
                <Col className="text-center">
                  {this.props.error ? (
                    <label className="error"> {this.props.error}</label>
                  ) : (
                    <label />
                  )}
                </Col>
              </Row>
              <div
                className="text-center login-have-account"
                style={{
                  position: "absolute",
                  bottom: "50px",
                  right: "125px",
                  fontSize: "x-large",
                }}
              >
                Don't have an account?
                <Link to="/register" style={{ color: "#5fa1fc" }}>
                  {" "}
                  Sign Up{" "}
                </Link>
              </div>
            </Form>
          </CardBody>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state.userLog,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Login);
