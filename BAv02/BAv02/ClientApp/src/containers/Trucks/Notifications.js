import React, { Component } from "react";
import { Col, Row, Button, Form, FormGroup } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Trucks";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var noti = new FormData(e.target);
    noti.append("Idvehicle", this.props.id);
    this.props.saveDataNotifications(noti);
  }

  render() {
    return (
      <Col className="mb-4" style={{ marginTop: "4%" }}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md="4">
              <Button
                size="md"
                type="submit"
                outline
                color="primary"
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>
            </Col>
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
              <div></div>
            )}
            <Col mb="4">
              <FormGroup></FormGroup>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }
}

export default connect(
  state => state.trucks,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Notifications);
