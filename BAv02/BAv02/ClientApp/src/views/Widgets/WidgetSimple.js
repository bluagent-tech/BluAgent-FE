import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
    header: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.string,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    invert: PropTypes.bool,
};

const defaultProps = {
    header: '8',
    icon: 'icon-people',
    color: 'info',
    bColor: 'lightblue',
    value: '100',
    children: '',
    invert: false,
};

class WidgetSimple extends Component
{
    render() {
        const { className, style, cssModule, header, icon, color, bColor, value, children, title, invert, ...attributes } = this.props;
        const card = { style: 'background-color: lightblue', bgColor: 'background-color: lightblue', icon: icon };
        const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);

        return (
            <Card className={classes} {...attributes} >
                <CardBody stylec={style}>
                    <div className="h5 text-center">
                        <i className={card.icon}> &nbsp;</i>{header}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

WidgetSimple.propTypes = propTypes;
WidgetSimple.defaultProps = defaultProps;

export default WidgetSimple;