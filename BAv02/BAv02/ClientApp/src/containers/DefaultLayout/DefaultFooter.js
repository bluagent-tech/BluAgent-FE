import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children } = this.props;

    return (
      <React.Fragment>
        {process.env.REACT_APP_ENV === 'production' ? (
                <div className='mx-auto'>BluAgent Technologies &copy; { new Date().getFullYear()}</div>
        ) : (
          ''
        )}

        {process.env.REACT_APP_ENV !== 'production' ? (
          <div className='mx-auto'>
            <Badge color='danger'>
              {process.env.REACT_APP_DEVELOPMENT_BLUE_AGENT_APP_NAME}
            </Badge>
          </div>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
