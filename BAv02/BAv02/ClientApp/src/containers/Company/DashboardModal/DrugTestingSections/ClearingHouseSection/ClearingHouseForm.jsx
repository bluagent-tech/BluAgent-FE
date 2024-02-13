import React from "react";
import {
    FormGroup,
    Form,
    Col,
    Label,
    Alert,
    Button,
} from "reactstrap";


class ClearingHouseData extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitCredentials = this.handleSubmitCredentials.bind(this);
        this.state = {
            checked: true,
            showPass: false,
        }
    }

    componentDidMount() {
        do {
            var ch = new FormData();
            ch.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
            this.props.clearingHouseCredentials(ch)
        } while (this.props.CompanyData == [])
    }

    handleSubmitCredentials(e, id) {
        e.preventDefault();
        var Password = document.getElementById("Password");
        var ConfirmPass = document.getElementById("ConfirmPass");
        var requiredPassword = document.getElementById("requiredPassword");
        var requiredConfirmPass = document.getElementById(
            "requiredConfirmPassword"
        );

        if (Password.value == ConfirmPass.value) {
            var credentials = new FormData(e.target);
            credentials.append("HaveAccount", this.state.checked);
            credentials.append("Id", JSON.parse(localStorage.getItem("idCompany")));
            this.props.saveData(credentials);
            this.props.toggle();
        } else {
            requiredPassword.style.display = "block";
            requiredConfirmPass.style.display = "block";
        }
    }

    showPassword() {
        var passElement = document.getElementById("Password");
        var confirmElement = document.getElementById("ConfirmPass");

        if (!this.state.showPass) {
            this.setState({ showPass: true });
            passElement.type = "text";
            confirmElement.type = "text";
        } else {
            this.setState({ showPass: false });
            passElement.type = "password";
            confirmElement.type = "password";
        }
    }

    haveAccount() {
        var HaveAccount = document.getElementById("HaveAccount");
        var Username = document.getElementById("Username");
        var Password = document.getElementById("Password");
        var ConfirmPass = document.getElementById("ConfirmPass");
        var Phone = document.getElementById("Phone");

        if (HaveAccount.checked == true) {
            Username.value = "";
            Password.value = "";
            ConfirmPass.value = "";
            Phone.value = "";
            Username.disabled = true;
            Password.disabled = true;
            ConfirmPass.disabled = true;
            Phone.disabled = true;
            this.setState({ checked: false });
        } else {
            Username.disabled = false;
            Password.disabled = false;
            ConfirmPass.disabled = false;
            Phone.disabled = false;
            this.setState({ checked: true });
        }
    }

    render() {
        var email = this.props.isLoading
            ? null
            : this.props.CompanyCredentials == ""
                ? ""
                : this.props.CompanyCredentials[0].UserNameCH;
        var correo = "https://secure.login.gov/en?user[email]=" + email;
        return (
            <Form
                onSubmit={(e) => {
                    this.handleSubmitCredentials(e, this.props.id);
                }}
            >
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Username or Email</Label>
                        <input
                            type="text"
                            className="form-control"
                            id="Username"
                            name="UserNameCH"
                            defaultValue={
                                this.props.isLoading
                                    ? null
                                    : this.props.CompanyCredentials == ""
                                        ? ""
                                        : this.props.CompanyCredentials[0].UserNameCH
                            }
                            disabled={
                                this.props.isLoading
                                    ? null
                                    : this.props.CompanyCredentials == ""
                                        ? false
                                        : !this.props.CompanyCredentials[0].HaveAccount
                            }
                            required
                        />
                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Phone</Label>
                        <input
                            type="number"
                            className="form-control"
                            id="Phone"
                            name="Phone"
                            defaultValue={
                                this.props.isLoading
                                    ? null
                                    : this.props.CompanyCredentials == ""
                                        ? ""
                                        : this.props.CompanyCredentials[0].Phone
                            }
                            disabled={
                                this.props.isLoading
                                    ? null
                                    : this.props.CompanyCredentials == ""
                                        ? false
                                        : !this.props.CompanyCredentials[0].HaveAccount
                            }
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <Label htmlFor="text-input">Password</Label>
                        <input
                            type="password"
                            className="form-control"
                            id="Password"
                            name="PasswordCH"
                            defaultValue={
                                this.props.isLoading
                                    ? null
                                    : this.props.CompanyCredentials == ""
                                        ? ""
                                        : this.props.CompanyCredentials[0].PasswordCH
                            }
                            disabled={
                                this.props.isLoading
                                    ? null
                                    : this.props.CompanyCredentials == ""
                                        ? false
                                        : !this.props.CompanyCredentials[0].HaveAccount
                            }
                            required
                        />
                    </Col>
                    <Col md="6">
                        <Label htmlFor="text-input">Confirm Password</Label>
                        <div className="d-flex justify-content-center align-items-center">
                            <input
                                type="password"
                                className="form-control mr-3"
                                id="ConfirmPass"
                                name="ConfirmPass"
                                defaultValue={
                                    this.props.isLoading
                                        ? null
                                        : this.props.CompanyCredentials == ""
                                            ? ""
                                            : this.props.CompanyCredentials[0].PasswordCH
                                }
                                disabled={
                                    this.props.isLoading
                                        ? null
                                        : this.props.CompanyCredentials == ""
                                            ? false
                                            : !this.props.CompanyCredentials[0].HaveAccount
                                }
                                required
                            />
                            <i
                                class="far fa-eye"
                                onClick={() => {
                                    this.showPassword();
                                }}
                                style={{
                                    // marginTop: "25%",
                                    backgroundColor: "#3BA7FF",
                                    border: "7px solid #3BA7FF",
                                    color: "#fff",
                                    // padding: "2%",
                                    borderRadius: "7px",
                                    cursor: "pointer",
                                }}
                            ></i>
                            <span
                                id="requiredConfirmPassword"
                                style={{
                                    color: "red",
                                    fontWeight: "bold",
                                    display: "none",
                                }}
                            >
                                * Confirm Password is required
                            </span>
                        </div>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="6">
                        <input
                            type="checkbox"
                            id="HaveAccount"
                            defaultChecked={
                                this.props.isLoading
                                    ? null
                                    : this.props.CompanyCredentials == ""
                                        ? false
                                        : !this.props.CompanyCredentials[0].HaveAccount
                            }
                            onClick={() => {
                                this.haveAccount();
                            }}
                            value="true"
                        />
                        <label style={{ marginLeft: "5px" }}>
                            Not Registered on Clearing House
                        </label>
                    </Col>
                    <Col md="6">
                        <Alert
                            style={{
                                alignItems: "center",
                                backgroundColor: "#dff0fe",
                                borderLeft: "4px solid #dff0fe",
                                borderColor: "#4788c7",
                                color: "#4788c7",
                                padding: "6px",
                            }}
                        >
                            Go to{" "}
                            <strong>
                                <a href={correo} target="_blank">
                                    Clearing House{" "}
                                </a>
                            </strong>
                        </Alert>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Button
                            className="buttons-royal text-white px-5"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default ClearingHouseData;