import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Row,
  Form
} from "reactstrap";
import PropTypes from "prop-types";
import mayus from "./../../../services/mayus";
import NumberFormat from "react-number-format";
import SaveCardStripe from "../../../components/SaveCardStripe";

//ADD CREDIT CARD DRIVER

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { CardType: "", countryPhone: "US + 1", open: false };
    this.onChange = this.onChange.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open,
      CardType: "",
      countryPhone: "US + 1"
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form.append("id", this.props.id);
    this.props.OnSubmit(form);
  }

  render() {
    return (
      <div className="col-md-3">
        <FormGroup row>
          <Button onClick={this.toggleOpen} color="primary">
            + ADD CARD
          </Button>
        </FormGroup>
        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="modalc" toggle={this.toggleOpen}>
            ADD CARD
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="text-input">Name on Card</Label>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    onKeyUp={mayus}
                    maxLength="20"
                    required
                  />
                </Col>
                <Col md="6">
                  <Label htmlFor="text-input">Phone Number</Label>
                  <div className="form-inline">
                    <select
                      style={{ width: "30%" }}
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
                      style={{ width: "70%" }}
                      format="(###) ###-####"
                      placeholder="(---) --- ----"
                      mask="_"
                      className="form-control"
                      required
                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="7">
                  <Label htmlFor="text-input">Card Number</Label>
                  <SaveCardStripe />
                </Col>
                <Col md="5">
                  <Label htmlFor="text-input">Card Type</Label>
                  <select
                    name="CardType"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.CardType}
                    required
                  >
                    <option value="">select</option>
                    <option value="Credit card">Credit card</option>
                    <option value="Debit card">Debit card</option>
                    <option value="Charge card">Charge card</option>
                    <option value="ATM card">ATM card</option>
                    <option value="Stored-value card">Stored-value card</option>
                    <option value="Fleet card">Fleet card</option>
                  </select>
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" outline color="primary">
                Save
              </Button>{" "}
              {this.props.isLoading ? (
                <img
                  alt="loading"
                  style={{
                    width: "140px",
                    position: "absolute",
                    marginTop: "0px",
                    right: "40%"
                  }}
                  src="../../assets/img/icons/loading2.gif"
                />
              ) : (
                <div></div>
              )}
              <Button
                type="button"
                outline
                color="danger"
                onClick={this.toggleOpen}
              >
                Cancel
              </Button>
              <Row className="justify-content-center">
                <Col mb="4" colSpan="3" className="text-center"></Col>
              </Row>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddCard.propTypes = {
  OnSubmit: PropTypes.func,
  toggle: PropTypes.func
};

export default AddCard;
