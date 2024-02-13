import React, {Component} from "react";
import PropTypes from "prop-types";
import {Card, CardBody, Progress} from "reactstrap";
import classNames from "classnames";
import {mapToCssModules} from "reactstrap/lib/utils";
import ModalListRandomTest from "../../containers/Drivers/RandomTestDriverList/ModalListRandomTest";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {actionCreators} from "./../../store/Widget06";

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
  header: "87.500",
  icon: "icon-people",
  color: "info",
  value: 0,
  children: "Visitors",
  invert: false,
};

const widgetYear = new Date().getFullYear();

class Widget06 extends Component {
  constructor(props) {
    super(props);
    this.setPercentageText = this.setPercentageText.bind(this);
  }

  setPercentageText() {
      return this.props.quarterCompleted
        ? "Completed"
        : this.props.QremainingDrivers === 0 ? "0%" : Math.floor((this.props.QCompletedDrivers / this.props.QremainingDrivers) * 100) + "%";
  }

  render() {
    const {
      className,
      cssModule,
      header,
      icon,
      color,
      value,
      children,
      title,
      invert,
      isLoading,
      toastAlert,
      QremainingDrivers,
      QPercentageOfDrugtestDrivers,
      driversRandomList,
      getRandomStats,
      getRandomList,
      getStatus,
      quarterCompleted,
      countListDriverCompany,
      ...attributes
    } = this.props;

    // demo purposes only
    const progress = {style: "", color: color, value: value};
    const card = {style: "", bgColor: "", icon: icon, children: children};

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
      <Card className={classes} {...attributes}>
        <CardBody>
          <small className="text-muted text-uppercase font-weight-bold">
            {title}
          </small>
          <div className="h3  text-center" style={{paddingTop: "10px"}}>
            {this.setPercentageText()}
          </div>
          <Progress
            className={progress.style}
            color={progress.color}
            value={(this.props.QCompletedDrivers / this.props.QremainingDrivers) * 100}
          />
          <small className="text-muted">
            {" "}
            {"Progress " + this.props.QCompletedDrivers + "/" + this.props.QremainingDrivers}{" "}
          </small>
          <ModalListRandomTest
            porcent={this.props.QPercentageOfDrugtestDrivers}
            countListDriverCompany={this.props.countListDriverCompany}
            quarter={this.props.quarter}
            complete = {this.setPercentageText()}
            className="mb-1"
            type={this.props.type}
            getStats={this.props.getStatus}
            currentlyYear={widgetYear}
            isYear={this.props.isYear}
            remainingDrivers={this.props.QremainingDrivers}
            completedDrivers={this.props.QCompletedDrivers}
          />
        </CardBody>
      </Card>
    );
  }
}

Widget06.propTypes = propTypes;
Widget06.defaultProps = defaultProps;

export default Widget06
