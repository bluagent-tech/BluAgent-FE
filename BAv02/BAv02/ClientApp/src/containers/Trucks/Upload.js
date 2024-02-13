import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  CustomInput,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Trucks';
import base64ToByteArray2 from './../../services/base64ToByteArray2';
import AlertDelete from './../../components/AlertDelete';
import TableCom from './../../components/Table';
import mayus from './../../services/mayus';
import { Link } from 'react-router-dom';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readFile = this.readFile.bind(this);
    this.state = { File: [] };
  }

  onClose() {
    this.props.toggle();
  }

  readFile(e) {
    var input = e.target;
    var nameFile = input.files[0].name.substr(-4);
    if (input) {
      var reader = new FileReader();
      var pdf = '';
      reader.onload = (e) => {
        pdf = base64ToByteArray2(e.target.result);
        if (nameFile === '.pdf') {
          document.getElementById('error').style.display = 'none';
          this.setState({ File: pdf });
        } else {
          document.getElementById('error').style.display = 'inline-block';
          this.setState({ File: '' });
        }
      };

      try {
        reader.readAsDataURL(input.files[0]);
      } catch (error) {}
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form.append('id', this.props.id);
    form.append('type', this.props.typeD);
    form.append('file', this.state.file);
    form.append('name', document.getElementById('text').value + '.pdf');
    document.getElementById('text').value = '';
    this.props.OnSubmit(form);
  }

  render() {
    let rep = ['DOCUMENT NAME', 'VIEW', 'DETELE'];

    let rowItems = this.props.docs.map((row, index) => (
      <tr key={index}>
        <td className='text-center'>{row.DescriptionDoc}</td>
        <td className='text-center'>
          <a
            className='icon-check font-2x2icon-check icons font-2xl d-block buttons-royal text-white'
            href={'assets/docs/' + row.Name}
            target='_blank'
          ></a>
        </td>
        <td className='text-center'>
          <i
            className='icon-close font-2x2icon-close icons font-2xl d-block'
            style={{ color: 'red' }}
            onClick={() => {
              this.props.toggleD(row.IdDoc);
            }}
          ></i>
        </td>
      </tr>
    ));

    return (
      <div className='col-md-3'>
        <Modal isOpen={this.props.modal1} className={'modal-lg '}>
          <ModalHeader name='modal1' toggle={this.onClose}>
            UPLOAD FILES
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup row>
                <Col md='4'>
                  <Label
                    className='error'
                    id='error'
                    style={{
                      display: 'none',
                      marginLeft: '10px',
                      fontSize: '8pt',
                    }}
                  >
                    File not supported
                  </Label>
                  <CustomInput
                    type='file'
                    accept='.pdf'
                    id='filect'
                    name='Filect'
                    onChange={this.readFile}
                    required
                  />
                </Col>
                <Col md='4'>
                  <input
                    type='text'
                    id='text'
                    name='text'
                    className='form-control'
                    onKeyUp={mayus}
                    minLength='1'
                    maxLength='13'
                    placeholder='Description Name'
                    required
                  />
                </Col>
                <Col md='4'></Col>
              </FormGroup>
              <FormGroup row>
                <Col md='12'>
                  <br />
                  <TableCom
                    rowItems={rowItems}
                    header={rep}
                    count={this.props.count}
                    page={this.props.page}
                    getItems={(index) => {
                      this.props.getAllDocuments(
                        this.props.id,
                        this.props.typeD,
                        index,
                        7
                      );
                    }}
                  />
                  <AlertDelete
                    message='You are sure that delete that document'
                    modal={this.props.modalD}
                    toggle={() => {
                      this.props.toggleD(this.props.idDelete);
                    }}
                    delete={() => {
                      this.props.deleteDoc(
                        this.props.idDelete,
                        this.props.typeD
                      );
                    }}
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' outline color='primary'>
                Save
              </Button>{' '}
              {this.props.isLoading ? (
                <img
                  style={{
                    width: '140px',
                    position: 'absolute',
                    marginTop: '0px',
                    right: '40%',
                  }}
                  src='../../assets/img/icons/loading2.gif'
                  alt='loading'
                />
              ) : (
                <div></div>
              )}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

Upload.propTypes = {
  OnSubmit: PropTypes.func,
  toggle: PropTypes.func,
};

export default connect(
  (state) => state.trucks,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Upload);
