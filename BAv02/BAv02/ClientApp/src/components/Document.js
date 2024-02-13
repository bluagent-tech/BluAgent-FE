import React, { Component } from "react";

export default class Document extends Component {
  render() {
    let optionItems = "";
    if ((this.props.options !== undefined) & (this.props.options !== null)) {
      optionItems = this.props.options.map((option, index) => {
        return (
          <a
            className="list-group-item list-group-item-action list-group-item-action"
            href={"assets/docs/" + option.Name}
            download={option.DescriptionDoc}
            value={option.IdDoc}
            key={index}
          >
            {option.DescriptionDoc}
          </a>
        );
      });
    }

    return (
      <div name={this.props.name} className="list-group">
        {optionItems}
      </div>
    );
  }
}
