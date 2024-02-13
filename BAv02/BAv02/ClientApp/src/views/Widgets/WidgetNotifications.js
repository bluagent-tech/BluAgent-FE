import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress } from 'reactstrap';
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
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: '',
  invert: false,
};

class WidgetNotifications extends Component {
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
      ...attributes
    } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const div = { style: '', bgColor: '', icon: icon };

    if (invert) {
      progress.style = 'progress';
      progress.color = '';
      div.style = 'text';
      div.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(
      classNames(className, div.style, div.bgColor),
      cssModule
    );
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);

    return (
      <div className={classes} {...attributes}>
        <div>
          <div className='h1 text-muted text-right mb-2'>
            <img
              height='30'
              width='30'
              src='assets/icons/icons8-notification.svg'
              alt='notification-icon'
            />
          </div>
          <div className='h3  text-center'>{header}</div>
          {/* <small className='text-muted'>{children}</small> */}
          <Progress
            className={progress.style}
            color='primary'
            value={progress.value}
          />
          <div
            style={{ position: 'relative', top: 30 }}
            className='text-muted text-uppercase font-weight-bold'
          >
            {title}
          </div>
        </div>
      </div>
    );
  }
}

WidgetNotifications.propTypes = propTypes;
WidgetNotifications.defaultProps = defaultProps;

export default WidgetNotifications;
