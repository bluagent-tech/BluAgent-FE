import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import PropType from 'prop-types';

class AlertSubmit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal isOpen={this.props.modal}
                className={'modal-danger '}>
                <ModalHeader toggle={this.props.toggle}>Alert Delete</ModalHeader>
                <ModalBody>
                    {this.props.message}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.delete}>Delete It</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

AlertDelete.propsType = {
    delete: PropType.func,
    toggle: PropType.func,
    message: PropType.string
}

export default AlertSubmit;