import React, {Component} from "react";
import PropTypes from "prop-types";
import {Progress, Row, Col} from "reactstrap";
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

class Widget04 extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props.alertsCount) {
      return this.props.alertsCount;
    }
  }
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
            {card.icon === "fa fa-bell" ? (
              <img
                src="assets/icons/icons8-notification.svg"
                alt="icon bell"
                height="30"
                width="30"
              />
            ) : card.icon === "fa fa-user" ? (
              <img
                src="/assets/icons/icons8-user.svg"
                alt="icon bell"
                height="30"
                width="30"
              />
            ) : (
              <i className={card.icon}></i>
            )}
          </div>
          <div className="h3  text-center">{header}</div>
          {/* <small className="text-muted">{children}</small> */}
          <Progress
            className={progress.style}
            color={bColor}
            value={progress.value}
          />
          <Row>
            <Col>
              <div
                style={{position: "relative", top: 30}}
                className="text-muted text-uppercase font-weight-bold"
              >
                {title}
              </div>
            </Col>
            <Col>
              <div
                style={{position: "relative", top: 30, textAlign: "right"}}
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

Widget04.propTypes = propTypes;
Widget04.defaultProps = defaultProps;

export default Widget04;
