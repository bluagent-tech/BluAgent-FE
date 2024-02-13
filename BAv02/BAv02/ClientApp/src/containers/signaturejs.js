import React, { Component } from 'react';
import { Col, FormGroup, Button, Row, Form } from 'reactstrap';
import base64ToByteArray from './../services/base64ToByteArray';
import SignaturePad from 'signature_pad/dist/signature_pad';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/AccountSettings';

class Signature extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitS = this.handleSubmitS.bind(this);
    this.createDrugTest = this.createDrugTest.bind(this);
    this.state = { signatureR: '', signatureLink: '' };
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

  
  //componentWillUnmount() {
  //  window.addEventListener("resize", this.resizeCanvas.bind(this));
  //}

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

    this.resizeCanvas();

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

  handleSubmitS(e) {
    e.preventDefault();
    const idComponent = this.props.id ? this.props.id : 'signaturepad';
    var can = document.getElementById(idComponent);
    if (
      can.toDataURL('image/png') !==
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAC0CAYAAADl5PURAAAFPElEQVR4Xu3UAREAAAgCMelf2iA/GzA8do4AAQJRgUVzi02AAIEzgJ6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1gHmgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHmVi84AQIPATQAtSobFv4AAAAASUVORK5CYII='
    ) {
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
    } else {
      this.setState({ signatureR: 'Field required' });
    }

    e.stopPropagation();
  }

  createDrugTest(form) {
    form.append('specimenNumber', this.props.specimenNumber);
    form.append('idScheduled', this.props.scheduledID);
  }

  render() {
    const idComponent = this.props.id ? this.props.id : 'signaturepad';
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmitS}>
          <Row>
            <Col md='6'>
              {this.props.LabelText ? (
                this.props.LabelText
              ) : (
                <h3>Signature </h3>
              )}
              <label className='error'>{this.state.signatureR}</label>
            </Col>
          </Row>
          <Row>
            <div style={{display:"block", width: 320, height: 180, paddingLeft: 15, paddingRight: 15}}>
                <canvas
                  id={idComponent}
                  className='signaturepad'
                  width={320}
                  height={180}
                 />
            </div>
          </Row>
          <Row>
            <Col sm="12" style={{display:"block"}}>
                <input
                style={{ marginLeft: '6px' }}
                type='button'
                id='undo'
                value='Undo'
                className='text-white buttons-royal btn mr-2 mt-2'
                disabled={this.props.p}
              />
              <input
                type='button'
                id='clear'
                value='Clear'
                className='text-white buttons-royal btn mt-2'
                disabled={this.props.p}
              />
              <Button
                style={{ marginLeft: '6px' }}
                type='submit'
                className='text-white buttons-royal btn mr-2 mt-2'
                disabled={this.props.p}
              >
                {this.props.saveButtonText
                  ? this.props.saveButtonText
                  : 'Approved'}
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md='4'>
              <FormGroup></FormGroup>
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
      </React.Fragment>
    );
  }
}

export default Signature
