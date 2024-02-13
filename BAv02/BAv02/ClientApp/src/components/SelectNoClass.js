import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SelectNoClass extends Component {
  render() {
    var list = [];
    if (this.props.options !== null && this.props.options !== undefined) {
      list = this.props.options;
    }
    let optionItems = list.map((option, index) => {
      return (
        <option value={option.Id} key={index}>
          {option.Name}
        </option>
      );
    });
    return (
      <select
        name={this.props.name}
        onChange={this.props.onChange}
        value={this.props.value}
        disabled={
          this.props.disabled !== null && this.props.disabled !== undefined
            ? this.props.disabled
            : false
        }
        required={
          this.props.required !== undefined ? this.props.required : true
        }
      >
        <option value="">SELECT</option>
        {optionItems}
      </select>
    );
  }
}

SelectNoClass.propTypes = {
  disabled: PropTypes.bool,
};
