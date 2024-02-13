import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  FormGroup,
  TabPane,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  CardSubtitle,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  UncontrolledTooltip,
  Form,
} from "reactstrap";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/UserLog";
import Terms from "../../../containers/User/Terms";
import Privacy from "../../../containers/User/Privacy";
import swal from "sweetalert";
import "./sweetAlertStyle.css";
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from "react-stripe-elements";
import NumberFormat from "react-number-format";
import "../../../components/Styles/StripeSaveCard.css";

const createOptions = () => {
  return {
    style: {
      invalid: {
        color: "#c23d4b",
      },
    },
  };
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = { activeTab: "1", TP: "false", errorMessage: "" };
    //this.validatePassword = this.validatePassword(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.props.ReduxProps.clean();
    this.confirmPassword = this.confirmPassword.bind(this);
    this.alert = this.alert.bind(this);
    this.handleClickSwalEvent = this.handleClickSwalEvent.bind(this);
    this.switchLowercase = this.switchLowercase.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }
  componentDidMount() {
    document.getElementById("createC").setAttribute("disabled", "disabled");
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.props.ReduxProps.logout();
      this.setState({
        activeTab: tab,
      });
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

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  switchLowercase(string) {
    var info = string.split(" ");
    var city = "";
    info.forEach(function (text) {
      if (city === "") {
        city = text.charAt(0).toUpperCase() + text.slice(1);
      } else {
        city = city + " " + text.charAt(0).toUpperCase() + text.slice(1);
      }
    }, this);

    return city;
  }

  async handleSubmit(e) {
    document.getElementsByClassName("error")[0].innerText = "";
    e.preventDefault();
    e.persist();
    let stripeToken;
    let stripeBool = false;
    let user = new FormData(e.target);
    if (this.props.stripe) {
      stripeToken = await this.props.stripe
        .createToken()
        .then(function (response) {
          if (!response.error) {
            stripeBool = true;
            return response.token.id;
          } else {
            document.getElementsByClassName("error")[0].innerText =
              "Invalid Card Number";
          }
        });
    }

    if (this.PasswordC.value === this.Password.value) {
      var {
        LEGAL_NAME,
        DBA_NAME,
        TELEPHONE,
        EMAIL_ADDRESS,
        PHY_STREET,
        PHY_ZIP,
        PHY_CITY,
        PHY_STATE,
        PHY_COUNTRY,
        MCS150_DATE,
        MCS150_MILEAGE,
        MCS150_MILEAGE_YEAR,
        ADD_DATE,
        NBR_POWER_UNIT,
        DRIVER_TOTAL,
        HM_FLAG,
        CARRIER_OPERATION,
        PC_FLAG,
      } = this.props.ReduxProps.company;
      user.append("Status", "ACTIVE");
      if (LEGAL_NAME !== undefined) {
        var h = false;
        if (HM_FLAG === "Y") {
          h = true;
        }
        user.append("DbaName", DBA_NAME);
        user.append(
          "PhoneNumber",
          PHY_COUNTRY !== "MX" ? "US +1" + TELEPHONE : "MX +52" + TELEPHONE
        );
        user.append("EmailAddress", EMAIL_ADDRESS);
        user.append("PhysicalAddress", PHY_STREET);
        user.append("PhysicalZip", PHY_ZIP);
        user.append("city", this.switchLowercase(PHY_CITY.toLowerCase()));
        user.append("state", PHY_STATE);
        user.append("country", PHY_COUNTRY);
        user.append("Hazmat", h);
        user.append("Mcs150Date", MCS150_DATE);
        user.append("Mcs150Mileage", MCS150_MILEAGE);
        user.append("Mcs150MYear", MCS150_MILEAGE_YEAR);
        user.append("AddDate", ADD_DATE);
        user.append("Powerunit", NBR_POWER_UNIT);
        user.append("DriverTotal", DRIVER_TOTAL);
        user.append("PcFlag", PC_FLAG);
        user.append("CarrierOperation", CARRIER_OPERATION);
        user.append("Dot", document.getElementById("Dot").value)
        user.append("LegalName", document.getElementById("LegalName"))
      }
      if (
        /^(?=.*[!@#$%^&])(?=.*[A-Z]).{8,}$/.test(
          e.target.Password.value
        ) &&
        /^(?=.*[!@#$%^&])(?=.*[A-Z]).{8,}$/.test(
          e.target.PasswordC.value
        ) &&
        stripeBool
      ) {
        user.append("val", true);
        document.getElementsByClassName("error")[0].innerText = "";
        user.append("stripeToken", stripeToken);
        // console.log("Datos que vienen en los props de la compania cuando agregamos el dot", this.props.ReduxProps.company);
        this.props.ReduxProps.register(user);
        this.props.ReduxProps.history.push("/login");
      } else {
        user.append("val", false);
        if (!stripeToken) {
          //this.errorMessage("stripe undefined");
        } else {
          this.errorMessage("Wrong Password Format");
        }
      }
    } else {
      this.errorMessage("Passwords don't match");
    }
  }

  errorMessage(msg) {
    document.getElementsByClassName("error")[0].innerText = msg;
  }

  handleClickSwalEvent = () => {
    window.location.replace("login");
  };

  alert() {
    document.getElementById("registerContainer").style.display = "none";
    swal({
      title: "Company registered",
      text: "Please verify your email to activate your account",
      icon: "success",
      buttons: { Ok: { text: "Resend Email" } },
    }).then(() => {
      var userName = document.getElementById("Name").value;
      var userEmail = document.getElementById("Email").value;
      this.props.ReduxProps.sendConfirmationEmail(userEmail, userName);
      this.alert();
    });
  }

  onChange() {
    setTimeout(() => {
      if (
        document.getElementById("termsOfS1").checked &&
        document.getElementById("Dot").value !== ""
      ) {
        if (
          document.getElementById("errorDOT").innerText.trim() ===
          "Duplicate USDOT Account"
        ) {
          document
            .getElementById("createC")
            .setAttribute("disabled", "disabled");
        } else {
          document.getElementById("createC").removeAttribute("disabled");
        }
      } else {
        document.getElementById("createC").setAttribute("disabled", "disabled");
      }
    }, 500);
  }

  render() {
    return (
      <div id="registerContainer" className="app flex-row align-items-center">
        {this.props.ReduxProps.user === "Saved" ? this.alert() : ""}
        <Container style={{ height: "inherit" }}>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4 shadow rounded">
                <CardBody className="p-4 mb-1">
                  <Row className="justify-content-center mb-4">
                    <Col className="text-center">
                      <div className="p-1  justify-content-center">
                        <img
                          src="../../assets/img/logo/logo.png"
                          alt="branding logo"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center mb-4">
                    <Col className="mb-4">
                      <CardSubtitle className=" text-muted pt-2  text-center">
                        <span>Create an Account</span>
                      </CardSubtitle>
                    </Col>
                  </Row>
                  <Nav className="nav-justified" tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1",
                        })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        Company
                      </NavLink>
                    </NavItem>
                    {/*<NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                    >Driver</NavLink>
                </NavItem>*/}
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Form id="form1" onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-comments fa-lg "></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <NumberFormat
                            placeholder="USDOT"
                            allowNegative={false}
                            className="form-control"
                            name="Dot"
                            id="Dot"
                            autoComplete="usdot"
                            maxLength="12"
                            onFocus={this.onChange}
                            onChange={(e) => {
                              this.props.ReduxProps.getDateCompany(
                                e.target.value
                              );
                              this.onChange();
                            }}
                            onBlur={(e) => {
                              this.props.ReduxProps.getDateCompany(
                                e.target.value
                              );
                              this.onChange();
                            }}
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-unlock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="PIN #"
                            name="PINNumber"
                            autoComplete="PINNumber"
                            maxLength="200"
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="cui-home icons font-1.5xl.5 d-block"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className="form-control"
                            type="text"
                            defaultValue={
                              this.props.ReduxProps.company.LEGAL_NAME
                            }
                            placeholder="Company Name"
                            name="LegalName"
                            id="LegalName"
                            autoComplete="companyname"
                            maxLength="200"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="First name"
                            name="Name"
                            id="Name"
                            autoComplete="firtsname"
                            maxLength="50"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Last name"
                            name="LastName"
                            autoComplete="LastNameame"
                            maxLength="50"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="Email"
                            id="Email"
                            autoComplete="email"
                            maxength="100"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password (8 or more characters)"
                            id="Password"
                            name="Password"
                            ref={(Password) => (this.Password = Password)}
                            //onChange={this.handlePasswordValidation}
                            pattern="^(?=.*[!@#$%^&])(?=.*[A-Z]).{8,}$"
                            title="Please enter a valid password (8 or more characters, with at least one special character and one uppercase letter)"
                            required
                          />
                          <UncontrolledTooltip
                            placement="bottom"
                            target="Password"
                          >
                            The password must contain at least 8 characters, 1
                            number or symbol "!@#$%^& and 1 uppercase".
                          </UncontrolledTooltip>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            onBlur={this.confirmPassword}
                            id="PasswordC"
                            name="PasswordC"
                            ref={(PasswordC) => (this.PasswordC = PasswordC)}
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <CardElement
                            onChange={this.handleChange}
                            {...createOptions()}
                          />
                        </InputGroup>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <Terms />
                              <Privacy />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="justify-content-center mb-4">
                          <Col xs="8" className="text-center">
                            <Button
                              type="submit"
                              id="createC"
                              color="success"
                              className="px-4"
                              block
                            >
                              Create Account
                            </Button>
                          </Col>
                          {this.props.ReduxProps.isLoading ? (
                            <img
                              alt="loading"
                              style={{
                                width: "140px",
                                position: "absolute",
                                marginTop: "20px",
                                right: "35%",
                              }}
                              src="../../assets/img/icons/loading2.gif"
                            />
                          ) : (
                            <div></div>
                          )}
                        </Row>
                        <Row className="justify-content-center">
                          <br />
                          <Col className="text-center">
                            {this.props.ReduxProps.error ? (
                              <label
                                className="error"
                                style={{
                                  marginTop: "30px",
                                }}
                              >
                                {" "}
                                {this.props.ReduxProps.error}{" "}
                              </label>
                            ) : (
                              <label></label>
                            )}
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                    <TabPane tabId="2">
                      <Form id="form2" onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="First name"
                            name="Name"
                            autoComplete="firtsname"
                            maxLength="50"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Last name"
                            name="LastName"
                            autoComplete="LastNameame"
                            maxLength="50"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-phone icons font-1.5xl.5 d-block"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                            name="PhoneNumber"
                            autoComplete="telephone"
                            maxLength="15"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="Email"
                            autoComplete="email"
                            maxength="100"
                            required
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password (8 or more characters)"
                            name="Password"
                            autoComplete="new-password"
                            maxLength="20"
                            minLength="8"
                            required
                          />
                        </InputGroup>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <Col md="12"></Col>
                              <Terms />
                              <Privacy />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="justify-content-center mb-4">
                          <Col xs="8" className="text-center">
                            <Button color="success" className="px-4" block>
                              Create
                            </Button>
                          </Col>
                          {this.props.ReduxProps.isLoading ? (
                            <img
                              alt="loading"
                              style={{
                                width: "140px",
                                position: "absolute",
                                marginTop: "0px",
                                right: "40%",
                              }}
                              src="../../assets/img/icons/loading2.gif"
                            />
                          ) : (
                            <div />
                          )}
                        </Row>
                        <Row className="justify-content-center">
                          <Col className="text-center">
                            {this.props.ReduxProps.error ? (
                              <label className="error" id="errorDOT">
                                {" "}
                                {this.props.ReduxProps.error}
                              </label>
                            ) : (
                              <label className="error" id="errorDOT"></label>
                            )}
                            <label
                              className="error"
                              id="errorNewPass"
                              style={{ display: "none" }}
                            >
                              wrong password format
                            </label>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                  </TabContent>
                </CardBody>
                <CardFooter className="p-2 bg-white">
                  <Row className="justify-content-center">
                    <Col className="text-center">
                      <p>
                        Already on BluAgent ? <Link to="/login">Sign in</Link>
                      </p>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const CardForm = injectStripe(Register);

export class CardDemo extends Component {
  render() {
    return (
      <StripeProvider
        apiKey={
          process.env.REACT_APP_ENV === "production"
            ? process.env.REACT_APP_STRIPE_LIVE_SECRET_KEY
            : process.env.REACT_APP_STRIPE_TEST_SECRET_KEY
        }
      >
        <Elements>
          <CardForm ReduxProps={this.props} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default connect(
  (state) => state.userLog,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(CardDemo);
