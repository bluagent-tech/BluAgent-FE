import React from "react";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Label,
  UncontrolledTooltip
} from "reactstrap";
import NumberFormat from "react-number-format";

class InviteDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Country: "",
      password: "",
      activeTab: "1",
      countryPhone: "US +1",
      phoneRequired: true,
      emailRequired: false
    };
    this.handleTabsToggle = this.handleTabsToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleTabsToggle(tab) {
    if (tab === "1") {
      this.setState({ phoneRequired: true });
      this.setState({ emailRequired: false });
    } else {
      this.setState({ phoneRequired: false });
      this.setState({ emailRequired: true });
    }
    this.setState({
      activeTab: tab,
      countryPhone: "US +1"
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let id = JSON.parse(localStorage.getItem("user")).Id;

    if (this.state.activeTab === "1") {
      let form = new FormData();
      form.append(
        "phoneNumber",
        this.state.countryPhone.substr(3) + " " + this.state.PhoneNumber
      );
      form.append("idu", id);
      this.props.sendSMS(form);
    } else {
      let form = new FormData();
      form.append("email", this.state.Email);
      form.append("idu", id);
      this.props.sendEmail(form);
      //const queryString = form.toString();
    }
  }

  generatePassword() {
    var caracteres = "ABCDEFGHIJKLMnopqrtuvwxyz012346789!@#$&";
    var contraseña = "";
    var i = 0;
    for (i = 0; i < 8; i++) {
      contraseña += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    this.setState({ password: contraseña });
  }

  render() {
    return (
      <Col style={{ paddingRight: "0px" }}>
        <Button
          id="invite"
          type="submit"
          color="primary"
          style={{ borderRadius: "30px", width: "30px", height: "30px", padding: "0px" }}
          className="icon-envelope icons d-block"
          onClick={this.props.toggle}
        />
        <UncontrolledTooltip placement="bottom" target="invite">
          Invite Driver
        </UncontrolledTooltip>
        <Modal isOpen={this.props.modal} className={"modal-lg "}>
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader name="modal1" toggle={this.props.toggle}>
              INVITE DRIVER
            </ModalHeader>
            <ModalBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab === "1"}
                    onClick={() => {
                      this.handleTabsToggle("1");
                    }}
                  >
                    SMS
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab === "2"}
                    onClick={() => {
                      this.handleTabsToggle("2");
                    }}
                  >
                    Email
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {/*SMS*/}
                <TabPane tabId="1">
                  <p>
                    Enter your driver phone Number. They will recieve an SMS
                    with a link to BluAgent
                  </p>
                  <Col md="12">
                    <Label htmlFor="text-input">Phone Number</Label>
                    <div className="form-inline">
                      <select
                        style={{ width: "20%" }}
                        value={this.state.countryPhone}
                        className="form-control"
                        name="countryPhone"
                        onChange={this.onChange}
                      >
                        <option value="US +1">US +1</option>
                        <option value="MX +52">MX +52</option>
                        <option value="CAN +1">CAN +1</option>
                      </select>
                      <NumberFormat
                        onChange={this.onChange}
                        style={{ width: "80%" }}
                        format="(###) ###-####"
                        placeholder="(---) --- ----"
                        mask="_"
                        className="form-control"
                        name="PhoneNumber"
                        id="phoneInput"
                        required={this.state.phoneRequired}
                      />
                    </div>
                  </Col>
                </TabPane>
                {/*Email*/}
                <TabPane tabId="2">
                  <p>
                    Enter your driver Email Address. They will recieve an Email
                    with a link to BluAgent
                  </p>
                  <Col md="12">
                    <Label htmlFor="text-input">Email</Label>
                    <input
                      onChange={this.onChange}
                      type="email"
                      id="newEmail"
                      maxLength="100"
                      className="form-control"
                      name="Email"
                      required={this.state.emailRequired}
                    />
                  </Col>
                </TabPane>
              </TabContent>
            </ModalBody>
            <ModalFooter>
              <FormGroup row>
                <Col
                  mb="4"
                  colSpan="3"
                  style={{ textAlign: "center", marginTop: "4%" }}
                ></Col>
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                disabled={this.props.isLoading ? true : false}
              >
                Send
              </Button>

              {this.props.isLoading ? (
                <img
                  style={{
                    width: "140px",
                    position: "absolute",
                    marginTop: "0px",
                    right: "40%"
                  }}
                  src="../../assets/img/icons/loading2.gif"
                  alt="loading"
                />
              ) : (
                <div />
              )}
              <Button color="danger" onClick={this.props.toggle}>
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Col>
    );
  }
}

export default InviteDriver;
