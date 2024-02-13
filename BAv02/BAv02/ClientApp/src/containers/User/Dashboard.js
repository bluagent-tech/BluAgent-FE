import React, { Component } from "react";
import { TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/UserLog";
import Password from "./../Drivers/DriverModal/Password";
class Dashboard extends Component {
  render() {
    return (
      <TabPane tabId="1">
        <div className="row text-center" style={{ marginTop: "4%" }}>
          <Password
            toggle={this.props.toggleCP}
            modal={this.props.modalCP}
            id={this.props.id}
            submit={this.props.changePassword}
            error={this.props.error}
            message={this.props.message}
            isLoading={this.props.isLoading}
            disabled={false}
          />
        </div>
      </TabPane>
    );
  }
}

export default connect(
  (state) => state.userLog,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Dashboard);
