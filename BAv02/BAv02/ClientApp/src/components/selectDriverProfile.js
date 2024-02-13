import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SelectDriverProfile extends Component {
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
                value={this.props.value || (this.props.previousDate ? this.props.previousDate : '')}
                disabled={this.props.disabled !== null && this.props.disabled !== undefined
                    ? this.props.disabled
                    : false
                }
                required={
                    this.props.required !== undefined ? this.props.required : true
                }
            >
                <option value={this.props.previousDate || ''} disabled={this.props.value !== ''}>{this.props.previousDate || 'SELECT'}</option>
                {optionItems}
            </select>
        );
    }
}

SelectDriverProfile.propTypes = {
    disabled: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    previousDate: PropTypes.string
};
