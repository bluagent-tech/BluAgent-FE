import React from 'react';
import {
    Col,
    Button,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Form,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Input,
    Row,
    UncontrolledTooltip,
} from "reactstrap";
import "material-components-web";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/AccountSettings";
class FMCSAuser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            optionSelected: "",
            name: null,
            nextStep: false,
            showPass: true,
            FMCSA: false
        }
        this.handleRadioSelect = this.handleRadioSelect.bind(this);
        this.NextButton = this.NextButton.bind(this);
        this.openInNewTab = this.openInNewTab.bind(this);
    }
    handleRadioSelect(result) {
        this.setState({ name: result })
    }
    openInNewTab(url) {
        window.open(url, '_blank', 'noopener,noreferrer')
    }
    async componentDidMount() {
        await this.props.getFMCSA(localStorage["idCompany"]);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.FMCSA !== this.state.FMCSA) {
            this.props.getFMCSA(localStorage["idCompany"]);
        }
    }

    async handleSelect() {
        var form = new FormData(document.getElementById("sendInst"));
        form.append("id", localStorage["idCompany"]);
        //form.append("passfmcsa", this.props.idDriver);
        //form.append("userfmcsa", this.props.idCompany);
        await this.props.upload(form);
        this.setState({
            FMCSA: true
        })
    };

    TogglePass() {
        if (this.state.showPass === false) {
            this.setState({ showPass: true })
        } else {
            this.setState({ showPass: false })
        }
    }

    NextButton() {
        if (this.state.name === false) {
            this.setState({ nextStep: false })
        } else if (this.state.name === true) {
            this.setState({
                nextStep: true
            })
            this.setState({
                name: null
            })
        }
    }

    render() {
        return (
            <div>
                <div style={{
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: "flex"
                    // justifyContent: 'center',
                }}>{
                        this.props.user != null ? (<FormGroup>
                            <Form onSubmit={this.handleSelect} id="sendInst">
                                <Col md="12">
                                    <br />
                                    <Label for="emailDriver">User name</Label>
                                    <div class="input-group mb-3">
                                        <Input
                                            type="text"
                                            name="userfmcsa"
                                            id="userfmcsa"
                                            autocomplete="off"
                                            //value={this.props.fmcsaInfo[1]}
                                            defaultValue={this.props.user}
                                        ></Input>
                                    </div>
                                    <br />
                                </Col>
                                <Col md="12">
                                    <Label for="manInst">Password</Label>
                                    <div class="input-group mb-3">
                                        <Input
                                            type={this.state.showPass ? "password" : "text"}
                                            name="passfmcsa"
                                            autocomplete="off"
                                            id="passfmcsa"
                                            defaultValue={this.props.password}
                                        ></Input>
                                        <div class="input-group-append">
                                            <Button
                                                color={"primary"}
                                                style={{ backgroundColor: "#3b86ff" }}
                                                onClick={() => this.TogglePass()}
                                            >
                                                See
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={{ size: 6, offset: 6 }} style={{ textAlign: "right" }}>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        style={{ margin: "12px", backgroundColor: "#3b86ff" }}
                                        onClick={() => { this.handleSelect(), this.props.toggle() }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.props.toggle()}
                                    >
                                        Cancel
                                    </button>
                                </Col>
                            </Form>
                        </FormGroup>) : (
                            this.state.nextStep === false ? (<>
                                <h4 id="ti">Do you have a FMCSA portal?</h4>
                                <UncontrolledTooltip
                                    placement='left'
                                    target='ti'
                                >
                                    Motor carriers can log in using their U.S. DOT Number and FMCSA-issued U.S. DOT Number Personal Identification Number (PIN), NOT their Docket Number PIN. If you are experiencing PIN issues, visit our PIN Help page for additional assistance.
                                    In the coming months, access by U.S. DOT Number and U.S. DOT Number PIN will be disabled on SMS and motor carriers will need to log in using the FMCSA Portal. To prepare for this transition, register for a Portal account today.
                                </UncontrolledTooltip>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <div style={{ margin: "15px" }}>
                                        <input onClick={() => this.handleRadioSelect(false)} id="No" type="radio" value="No" name="FMCSA" checked={this.state.name === false ? true : null} /> No
                                    </div>
                                    <div>
                                        <input onClick={() => this.handleRadioSelect(true)} id="Yes" type="radio" value="Yes" name="FMCSA" checked={this.state.name === true ? true : null} /> Yes
                                    </div>
                                </div></>) :
                                (<>
                                    <h4>FMCSA Portal User</h4>
                                    <FormGroup>
                                        <Form onSubmit={this.handleSelect} id="sendInst">
                                            <Col md="12">
                                                <br />
                                                <Label for="emailDriver">User name</Label>
                                                <div class="input-group mb-3">
                                                    <Input
                                                        type="text"
                                                        name="userfmcsa"
                                                        id="userfmcsa"
                                                        autocomplete="off"
                                                        //value={this.props.fmcsaInfo[1]}
                                                        defaultValue={this.props.user}
                                                    ></Input>
                                                </div>
                                                <br />
                                            </Col>
                                            <Col md="12">
                                                <Label for="manInst">Password</Label>
                                                <div class="input-group mb-3">
                                                    <Input
                                                        type={this.state.showPass ? "password" : "text"}
                                                        name="passfmcsa"
                                                        autocomplete="off"
                                                        id="passfmcsa"
                                                        defaultValue={this.props.password}
                                                    ></Input>
                                                    <div class="input-group-append">
                                                        <Button
                                                            color={"primary"}
                                                            style={{ backgroundColor: "#3b86ff" }}
                                                            onClick={() => this.TogglePass()}
                                                        >
                                                            See
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={{ size: 6, offset: 6 }} style={{ textAlign: "right" }}>
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    style={{ margin: "12px", backgroundColor: "#3b86ff" }}
                                                    onClick={() => { this.handleSelect(), this.props.toggle() }}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={() => this.props.toggle()}
                                                >
                                                    Cancel
                                                </button>
                                            </Col>
                                        </Form>
                                    </FormGroup>
                                </>
                                )
                        )
                    }

                </div>
                <Row>
                    <Col md={{ size: 6, offset: 6 }} style={{ textAlign: "right" }}>
                        {
                            this.state.name === null ? ("") : (<button
                                className="btn btn-primary"
                                type="button"
                                //onClick={() => this.openInNewTab("Google.com")}
                                onClick={() => this.state.name === false ? this.openInNewTab("https://portal.fmcsa.dot.gov/AccountRequest/AccountRequestForm1.jsp") : this.NextButton()}
                            >
                                Next
                            </button>)
                        }

                    </Col>
                </Row>
            </div>
        )
    }
}

export default FMCSAuser;