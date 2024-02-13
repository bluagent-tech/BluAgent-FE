import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: '',
  invert: false,
};

class Widget05 extends Component {
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
      <div className={classes} {...attributes}>
        <div>
          <div className=' text-center'>
            {' '}
            {this.props.default ? 
            (<img
              alt='avatar'
              src={this.props.src}
              className='img-avatar'
              style={{ width: '100px', height: '100px', borderRadius: 0 }}
              id='image'
            />) : 
            (
              <img
              alt='avatar'
              src={this.props.src}
              className='img-avatar image-company-profile'
              style={{ width: '100px', height: '100px' }}
              id='image'
            />
            )}
          </div>
          <small className='text-muted text-left text-uppercase font-weight-bold'>
            {children}
          </small>
        </div>
      </div>
    );
  }
}

Widget05.propTypes = propTypes;
Widget05.defaultProps = defaultProps;

export default Widget05;
