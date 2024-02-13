import React, { Component } from 'react';

export default class Document extends Component {

    render() {
        let optionItems = '';
        if (this.props.options !== undefined & this.props.options !== null) {
            optionItems = this.props.options.map((option, index) => {
                return (<button className={"br-alerts list-group-item list-group-item-" + option.Severy}
                    value={option.Id} key={index}><b>{option.TypeId == "VEHICLE" ? option.VehicleNumber : option.TrailerNumber + ':'}</b> {option.Message + " Due date " + option.DueDate} </button>
                );
            }
            );
        }

        return (
            <div name={this.props.name} className="list-group" onClick={this.onClick} >
                {optionItems}
            </div>
        );
    }
}