import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import classNames from "classnames";
import { mapToCssModules } from "reactstrap/lib/utils";

const propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: "8",
  icon: "icon-people",
  color: "info",
  value: "25",
  children: "",
  invert: false,
};

class CollectorInitiated extends Component {
  render() {
    const {
      className,
      cssModule,
      header,
      icon,
      color,
      bColor,
      value,
      children,
      title,
      invert,
      ...attributes
    } = this.props;

    // demo purposes only
    const progress = { style: "", color: color, value: value };
    const card = { style: "", bgColor: "", icon: icon };

    if (invert) {
      progress.style = "progress";
      progress.color = "";
      card.style = "text";
      card.bgColor = "bg-" + color;
    }

    const classes = mapToCssModules(
      classNames(className, card.style, card.bgColor),
      cssModule
    );
    progress.style = classNames("progress-xs mt-3 mb-0", progress.style);

    return (
      <div className={classes} {...attributes}>
        <div>
          <div className="h1 text-muted text-right mb-2">
            <i className={card.icon}></i>
          </div>
          <div className="h3  text-center mb-4">{header}</div>
          <small className="text-muted">{children}</small>
          <Row>
            <Col lg="8">
              <small className="text-dark text-uppercase font-weight-bold">
                {title}
              </small>
            </Col>
            <Col lg="4" className="text-right">
              <button className="buttons-royal text-white btn">
                View More
              </button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

CollectorInitiated.propTypes = propTypes;
CollectorInitiated.defaultProps = defaultProps;

export default CollectorInitiated;
