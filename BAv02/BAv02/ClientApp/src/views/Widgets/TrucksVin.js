import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

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
  header: '8',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: 'Visitors',
  invert: false,
};

class TrucksVins extends Component {
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
    const progress = { style: '', color: color, value: value };
    const card = { style: '', bgColor: '', icon: icon };

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
      <Fragment>
        <div className={classes} {...attributes}>
          <div>
            <div className='h1 text-muted text-right mb-2'>
              <i className={card.icon}></i>
            </div>
            <div className='h3  text-center'>{header}</div>
            <small className='text-muted'>{children}</small>
            <Progress
              className={progress.style}
              color={bColor}
              value={progress.value}
            />
            <small className='text-muted text-uppercase font-weight-bold'>
              {title}
            </small>
          </div>
        </div>
      </Fragment>
    );
  }
}

TrucksVins.propTypes = propTypes;
TrucksVins.defaultProps = defaultProps;
export default TrucksVins;
