import React, { Component } from "react";
import { withToastManager } from "react-toast-notifications";

class App extends Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { isOpen } = this.props;

    if (prevProps.isOpen !== isOpen) {
      return { isOpen };
    }

    return null;
  }

  componentDidUpdate(props, state, snapshot) {
    if (!snapshot) return;

    const { toastManager } = props;
    const { isOpen } = snapshot;

    if (isOpen) {
      // prepare the content
      const content = (
        <div>
          <strong>{this.props.message === "" ? "Error" : "Success"}</strong>
          <div>
            {this.props.message === "" ? this.props.error : this.props.message}
          </div>
        </div>
      );

      // add the applicable toast
      toastManager.add(content, {
        appearance: this.props.message === "" ? "error" : "success",
        autoDismiss: isOpen
      });
      this.props.toggleToast(false);
    }
  }

  render() {
    return null;
  }
}
export default withToastManager(App);
