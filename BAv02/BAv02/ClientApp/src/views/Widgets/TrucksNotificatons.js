import React, {Component} from "react";
import PropTypes from "prop-types";
import {Row, Col} from "reactstrap";
import classNames from "classnames";
import {mapToCssModules} from "reactstrap/lib/utils";

const propTypes = {
  header: PropTypes.string,
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
  children: "Visitors",
  invert: false,
};

class TrucksNotifications extends Component {
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
    const progress = {style: "", color: color, value: value};
    const card = {style: "", bgColor: "", icon: icon};

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
            <img
              src="assets/icons/icons8-notification.svg"
              alt="icon bell"
              height="30"
              width="30"
            />
          </div>
          <div className="h3  text-center">{header}</div>
          <Row>
            <Col className="text-left">
              <div
                style={{position: "relative", top: 30}}
                className="text-muted text-uppercase font-weight-bold"
              >
                {title}
              </div>
            </Col>
            <Col className="text-right">
              <div
                style={{position: "relative", top: 30}}
                className="text-muted text-uppercase font-weight-bold"
              >
                {children}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

TrucksNotifications.propTypes = propTypes;
TrucksNotifications.defaultProps = defaultProps;

export default TrucksNotifications;
