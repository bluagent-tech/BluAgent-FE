import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SelectNotRequired extends Component {
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
                className="form-control"
                onChange={this.props.onChange}
                value={this.props.value}
                disabled={
                    this.props.disabled !== null && this.props.disabled !== undefined
                        ? this.props.disabled
                        : false
                }
            >
                <option value="">SELECT</option>
                {optionItems}
            </select>
        );
    }
}

SelectNotRequired.propTypes = {
    disabled: PropTypes.bool,
};