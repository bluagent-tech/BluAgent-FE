import React, { Component, Fragment } from 'react';
import { Col, FormGroup, Button, Row, Form } from 'reactstrap';
import base64ToByteArray from './../services/base64ToByteArray';
import SignaturePad from 'signature_pad/dist/signature_pad';
import Swal from "sweetalert2";

class SignatureEmploymentHistoryRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeSignatureBy: '',
      signatureLink: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addSignatureLetterIn = this.addSignatureLetterIn.bind(this);
  }

  resizeCanvas(e) {
    const idComponent = this.props.id ? this.props.id : 'signaturepad';
    let canvas = document.getElementById(idComponent),
      ratio = Math.max(window.devicePixelRatio || 1, 1);
    if (canvas && ratio) {
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
    }

    if (this.props.signature !== undefined) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = this.props.signature;
      img.onload = () => {
        canvas.getContext('2d').drawImage(img, 0, 0);
      };
    }
  }

  addSignatureLetterIn(form) {
    form.append('LetterInquiryID', this.props.Id);
  }

  componentDidMount() {
    const idComponent = this.props.id ? this.props.id : 'signaturepad';
    let canvas = document.getElementById(idComponent);
    if (this.props.signature !== undefined) {
      this.setState({
        signatureLink: `${this.props.signature}?` + Math.random(),
      });
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = `${this.props.signature}?` + Math.random();
      img.onload = () => {
        canvas.getContext('2d').drawImage(img, 0, 0);
      };
    }
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    if (!this.props.p) {
      var signaturePad = new SignaturePad(canvas, {});
      document.getElementById('clear').addEventListener('click', function () {
        signaturePad.clear();
      });
      document.getElementById('undo').addEventListener('click', function () {
        var data = signaturePad.toData();
        if (data) {
          data.pop();
          signaturePad.fromData(data);
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.signatureLink !== nextProps.signatureLink) {
      //now here set state
      this.setState({
        signatureLink: `${this.props.signature}?` + Math.random(),
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const idComponent = this.props.id ? this.props.id : 'signaturepad';
    var can = document.getElementById(idComponent);
    if (can.toDataURL('image/png') !== '') {
      this.setState({ signatureR: '' });
      var parts = can.toDataURL('image/png').split(';base64,');
      //var contentType = parts[0].replace("data:", "");
      var base64 = parts[1];
      var byteArray = base64ToByteArray(base64);
      var signature = '';
      try {
        signature = byteArray.toString();
      } catch (error) {
        signature = '';
      }
      var sig = new FormData(e.target);
      if (this.props.idDriver) {
        sig.append('idDriver', this.props.idDriver);
      }
      if (this.props.id) {
        sig.append('id', this.props.id);
      }

      if (this.props.specimenNumber) {
        this.createDrugTest(sig);
      }

      sig.append('file', signature);
      this.props.saveSignatureFile(sig);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signature Saved",
        showConfirmButton: false,
        timer: 1500,
      });
      // swal({
      //   title: 'Signature Saved',
      //   icon: 'success',
      //   // buttons: {
      //   //   Ok: {
      //   //     text: 'Continue Survey ...',
      //   //   },
      //   // },
      // });
    } else {
      this.setState({ signatureR: 'Field required' });
    }

    e.stopPropagation();
  }

  render() {
    const idComponent = this.props.id ? this.props.id : 'signaturepad';
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md='6' lg='6' xs='12' sm='12'>
              <h6>Signature</h6>
            </Col>
          </Row>
          <Row>
            <Col md='4' lg='4' xs='12' sm='12'>
              <div className='wrapper'>
                <canvas
                  id={idComponent}
                  className='signaturepad'
                  width={320}
                  height={180}
                ></canvas>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <input
                type='button'
                id='undo'
                value='Undo'
                disabled={this.props.p}
              />
              <input
                type='button'
                id='clear'
                value='Clear'
                disabled={this.props.p}
              />
            </Col>
          </Row>
          <Row>
            <Col md='4'>
              <FormGroup>
                <Button
                  className='mt-2'
                  type='submit'
                  color='primary'
                  disabled={this.props.p}
                >
                  {this.props.saveButtonText
                    ? this.props.saveButtonText
                    : 'Approved'}
                </Button>
              </FormGroup>
            </Col>
            {this.props.isLoading ? (
              <img
                style={{
                  width: '140px',
                  position: 'absolute',
                  marginTop: '0px',
                  right: '40%',
                }}
                alt='loading'
                src='../../assets/img/icons/loading2.gif'
              />
            ) : (
              <div></div>
            )}
            <Col md='8'>
              <FormGroup></FormGroup>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}

export default SignatureEmploymentHistoryRecords;
