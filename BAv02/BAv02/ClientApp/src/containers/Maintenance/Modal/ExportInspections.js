import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExportInspections extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.toggle();
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} className={'modal-md '}>
        <ModalHeader name='modal2' toggle={this.onClose}>
          Export Maintenance
        </ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Col md='6'>
              <ExcelFile
                element={
                  <img
                    onClick={this.onClose}
                    className='img-responsive'
                    width='100'
                  ></img>
                }
              ></ExcelFile>
              <ExcelSheet></ExcelSheet>
            </Col>
          </FormGroup>
        </ModalBody>
      </Modal>
    );
  }
}

export default ExportInspections;
