import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import ModalListRandomAlcoholTest from '../../containers/Drivers/RandomTestDriverList/ModalListRandomAlcoholTest';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './../../store/WidgetAlcohol';

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
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: 'Visitors',
  invert: false,
};

const idCompany = JSON.parse(localStorage.getItem('idCompany'));

class WidgetAlcohol extends Component {
  constructor(props) {
    super(props);
    this.RandomStats = this.RandomStats.bind(this);
    this.setPercentageText = this.setPercentageText.bind(this);
  }
  componentDidMount() {
    this.RandomStats();
  }

  RandomStats() {
    var form = new FormData();
    form.append('idCompany', idCompany);
    this.props.getRandomStatsAlcohol(form);
  }

  setPercentageText() {
    if (parseInt(this.props.quarter) === 1) {
      return this.props.quarterCompleted
        ? 'Completed'
        : this.props.QA1PercentageOfDrugtestDrivers + '%';
    } else if (parseInt(this.props.quarter) === 2) {
      return this.props.quarterCompleted
        ? 'Completed'
        : this.props.QA2PercentageOfDrugtestDrivers + '%';
    } else if (parseInt(this.props.quarter) === 3) {
      return this.props.quarterCompleted
        ? 'Completed'
        : this.props.QA3PercentageOfDrugtestDrivers + '%';
    } else if (parseInt(this.props.quarter) === 4) {
      return this.props.quarterCompleted
        ? 'Completed'
        : this.props.QA4PercentageOfDrugtestDrivers + '%';
    }
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
      Q1remainingDrivers,
      Q1PercentageOfDrugtestDrivers,
      Q2remainingDrivers,
      Q2PercentageOfDrugtestDrivers,
      Q3remainingDrivers,
      Q3PercentageOfDrugtestDrivers,
      Q4remainingDrivers,
      Q4PercentageOfDrugtestDrivers,
      driversRandomList,
      getRandomStats,
      getRandomList
    } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const card = { style: '', bgColor: '', icon: icon, children: children };

    if (invert) {
      progress.style = 'progress';
      progress.color = '';
      card.style = 'text';
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(
      classNames(className, card.style, card.bgColor),
      cssModule
    );
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);
    return (
      <Card className={classes}>
        <CardBody>
          <small className='text-muted text-uppercase font-weight-bold'>
            {title}
          </small>
          <div className='h3  text-center' style={{ paddingTop: '10px' }}>
            {this.setPercentageText()}
          </div>
          <Progress
            className={progress.style}
            color={progress.color}
            value={
              this.props.quarter === '1'
                ? this.props.QA1PercentageOfDrugtestDrivers
                : this.props.quarter === '2'
                ? this.props.QA2PercentageOfDrugtestDrivers
                : this.props.quarter === '3'
                ? this.props.QA3PercentageOfDrugtestDrivers
                : this.props.quarter === '4'
                ? this.props.QA4PercentageOfDrugtestDrivers
                : 0
            }
          />
          <small className='text-muted'>
            {' '}
            {this.props.quarter === '1'
              ? 'Progress ' + this.props.QA1remainingDrivers
              : this.props.quarter === '2'
              ? 'Progress ' + this.props.QA2remainingDrivers
              : this.props.quarter === '3'
              ? 'Progress ' + this.props.QA3remainingDrivers
              : this.props.quarter === '4'
              ? 'Progress ' + this.props.QA4remainingDrivers
              : 'Progress ' + 0}{' '}
          </small>
          <ModalListRandomAlcoholTest
            porcent={
              this.props.quarter === '1'
                ? this.props.QA1PercentageOfDrugtestDrivers
                : this.props.quarter === '2'
                ? this.props.QA2PercentageOfDrugtestDrivers
                : this.props.quarter === '3'
                ? this.props.QA3PercentageOfDrugtestDrivers
                : this.props.quarter === '4'
                ? this.props.QA4PercentageOfDrugtestDrivers
                : 0
            }
            countListDriverCompany={this.props.countListDriverCompanyA}
            quarter={this.props.quarter}
            className='mb-1'
          />
        </CardBody>
      </Card>
    );
  }
}

WidgetAlcohol.propTypes = propTypes;
WidgetAlcohol.defaultProps = defaultProps;

export default connect(
  (state) => state.widgetAlcohol,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(WidgetAlcohol);
