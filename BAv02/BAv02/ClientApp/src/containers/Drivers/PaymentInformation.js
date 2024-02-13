import React, { Component } from "react";
import { Card, CardBody, Col, FormGroup } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Drivers";
import AddCard from "./DriverModal/AddCard";
import TableCom from "./../../components/Table";
import AlertDelete from "./../../components/AlertDelete";

//DRIVER PAYMENT INFORMATION FORM

class PaymentInformation extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: "active" };
  }

  componentDidMount() {
    this.props.getCards(this.props.id, 1, 10);
  }

  handleOptionChange(id) {
    this.props.statusUpdate(id, this.props.id);
    this.props.getCards(this.props.id, 1, 10);
  }

  render() {
    let rep = ["ACTIVE", "BANK", "CARD NUMBER", "EXPIRES ON", "DELETE"];

    let rowItems = this.props.card.map((row, index) => (
      <tr key={index}>
        <td className="text-center">
          <input
            type="radio"
            checked={row.Status}
            onChange={this.handleOptionChange.bind(this, row.IdCard)}
          />
        </td>
        <td className="text-center">{row.Name}</td>
        <td className="text-center">
          {"************" + row.Number.substring(row.Number.length - 4)}
        </td>
        <td className="text-center">{row.ExpiresOn}</td>
        <td className="text-center">
          <i
            className="icon-close font-2x2icon-close icons font-2xl d-block"
            style={{ color: "red" }}
            onClick={() => {
              this.props.toggleD1(row.IdCard);
            }}
          ></i>
        </td>
      </tr>
    ));

    return (
      <Col className="mb-4" style={{ marginTop: "4%" }}>
        <Card>
          <CardBody>
            <FormGroup row>
              <Col sm="6">
                <AddCard
                  OnSubmit={this.props.addCard}
                  isLoading={this.props.isLoading}
                  error={this.props.error}
                  id={this.props.id}
                />
              </Col>
            </FormGroup>
            <br />
            <TableCom
              rowItems={rowItems}
              header={rep}
              count={this.props.count}
              page={this.props.page}
              getItems={(index) => {
                this.props.getCards(this.props.id, index, 10);
              }}
            />
            <AlertDelete
              message="You are sure that delete that card"
              modal={this.props.modalD1}
              toggle={() => {
                this.props.toggleD1(this.props.idDelete1);
              }}
              delete={() => {
                this.props.deleteCard(this.props.idDelete1);
              }}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
export default connect(
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(PaymentInformation);
