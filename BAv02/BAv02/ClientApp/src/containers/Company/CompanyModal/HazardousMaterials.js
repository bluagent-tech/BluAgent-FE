import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Form,
} from 'reactstrap';

class HazardousMaterials extends React.Component {
  constructor(props) {
    super(props);
    this.showExtraQuestions = this.showExtraQuestions.bind(this);
    this.showQuestions = this.showQuestions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      Hmsafety: '',
      CFR485: '',
      ANYSTATES: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props.modalH) {
      if (
        this.props.HmOptions.Hrcq === true ||
        this.props.HmOptions.QuantityofDivision === true ||
        this.props.HmOptions.Tih === true ||
        this.props.HmOptions.Shipment === true
      ) {
        document.getElementById('extra').style.display = 'block';
        if (
          this.props.HmOptions.Hmsafety !== '' ||
          this.props.HmOptions.Cfr !== null ||
          this.props.HmOptions.Cfr485 !== '' ||
          this.props.HmOptions.Anystates !== ''
        ) {
          document.getElementById('questions').style.display = 'block';
        }
        if (this.props.HmOptions.Anystates === true) {
          document.getElementById('states').style.display = 'block';
        }
      }

      for (var Index in this.props.HmCompanies) {
        var element = this.props.HmCompanies[Index];
        var text = document.getElementsByClassName('hazardText');
        for (var Index2 in text) {
          if (Index2 === 'length') {
            break;
          }
          if (
            text[Index2].children[0].innerText ===
            element.HazardMaterialClasification
          ) {
            text[Index2].children[1].checked = element.Carrier;
            text[Index2].children[2].checked = element.Shipper;
            text[Index2].children[3].checked = element.BulkHm;
            text[Index2].children[4].checked = element.NonBulk;
          }
        }
      }
    }
  }

  showExtraQuestions(e) {
    const { checked } = e.target;
    if (checked === true) {
      document.getElementById('extra').style.display = 'block';
    } else {
      document.getElementById('extra').style.display = 'none';
    }
  }

  showQuestions(e) {
    const { checked } = e.target;
    if (checked === true) {
      document.getElementById('questions').style.display = 'block';
    } else {
      document.getElementById('questions').style.display = 'none';
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === 'Anystates' && value === 'true') {
      document.getElementById('states').style.display = 'block';
    } else if (name === 'Anystates') {
      document.getElementById('states').style.display = 'none';
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var text = document.getElementsByClassName('hazardText');
    var checks = [];
    for (let Index in text) {
      if (Index === 'length') {
        break;
      }
      checks.push({
        name: text[Index].children[0].innerText,
        c: text[Index].children[1].checked,
        s: text[Index].children[2].checked,
        b: text[Index].children[3].checked,
        bn: text[Index].children[4].checked,
      });
    }
    let dummy = JSON.stringify(checks);

    var form = new FormData(e.target);
    form.append('idu', this.props.id);
    form.append('HmC', dummy);
    this.props.submit(form);
    this.props.toggle(this.props.modalH);
    e.stopPropagation();
  }

  render() {
    return (
      <div>
        <Button
          type='submit'
          id='hazardous'
          onClick={() => {
            this.props.toggle(this.props.modalH);
          }}
          className='px-2 buttons-royal text-white'
          block
        >
          {' '}
          Open
        </Button>
        <Modal isOpen={this.props.modalH} className={'modal-lg '}>
          <ModalHeader
            name='modal1'
            toggle={() => {
              this.props.toggle(this.props.modalH);
            }}
          >
            HAZARDOUS MATERIALS (check all that apply)
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody style={{ fontSize: '8pt' }}>
              <Row>
                <Col>
                  <FormGroup>
                    <label>
                      (C=Carrier; S=Shipper; B=Bulk, in cargo tanks;
                      NB=Non-Bulk, in packages)
                    </label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <label style={{ width: '65%' }}></label>
                    <label>C</label>
                    <label style={{ marginLeft: '10px' }}>S</label>
                    <label style={{ marginLeft: '10px' }}>B</label>
                    <label style={{ marginLeft: '10px' }}>NB</label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label style={{ width: '65%' }}></label>
                    <label>C</label>
                    <label style={{ marginLeft: '10px' }}>S</label>
                    <label style={{ marginLeft: '10px' }}>B</label>
                    <label style={{ marginLeft: '10px' }}>NB</label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label style={{ width: '65%' }}></label>
                    <label>C</label>
                    <label style={{ marginLeft: '10px' }}>S</label>
                    <label style={{ marginLeft: '10px' }}>B</label>
                    <label style={{ marginLeft: '10px' }}>NB</label>
                  </FormGroup>
                </Col>
              </Row>
              <Row id='checkboxContainer'>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}> DIV 1.1</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.3D</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 6.2</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 1.2</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>CLASS 3</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>CLASS 7</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 1.3</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>CLASS 3A</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>HRCQ</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 1.4</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>CLASS 3B</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>CLASS 8</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 1.5</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>COMB LIQ</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>CLASS 8A</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 1.6</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 4.1</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>CLASS 8B</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.1 (Flam. Gas)</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 4.2</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>CLASS 9</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.1 LPG</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 4.3</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>ELEVATED TEMP. MAT.</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.1 (Methane)</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 5.1</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>INFECTIOUS WASTE</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.2</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 5.2</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>MARINE POLLUTANTS</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.2D (Ammonia)</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 6.1A</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>HAZARDOUS SUB (RQ)</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.3A</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 6.1B</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>HAZARDOUS WASTE</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.3B</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 6.1 POISON</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>ORM</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 2.3C</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ borderRight: '1px solid grey' }}>
                  <FormGroup className='hazardText'>
                    <label style={{ width: '65%' }}>DIV 6.1 SOLID</label>
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type='checkbox'
                      onChange={this.showExtraQuestions}
                      style={{ marginRight: '5px' }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup></FormGroup>
                </Col>
              </Row>
              <div id='extra' style={{ display: 'none' }}>
                <Row>
                  <Col>
                    <FormGroup>
                      <br />
                      <label style={{ fontWeight: 'bold' }}>
                        WHICH OF THE FOLLOWING HAZARDOUS MATERIALS DOES YOUR
                        COMPANY TRANSPORT? (check all that apply):
                      </label>
                      <br />
                      <label>
                        <input
                          type='checkbox'
                          onChange={this.showQuestions}
                          defaultChecked={this.props.HmOptions.Hrcq}
                          value='true'
                          name='Hrcq'
                          style={{ marginRight: '5px' }}
                        />
                        Highway Route Controlled Quantities (HRCQ) of
                        radioactive materials.
                      </label>
                      <label>
                        <input
                          type='checkbox'
                          onChange={this.showQuestions}
                          defaultChecked={
                            this.props.HmOptions.QuantityofDivision
                          }
                          value='true'
                          name='QuantityofDivision'
                          style={{ marginRight: '5px' }}
                        />
                        More than 25 kg (55 pounds) of a Division 1.1, 1.2, or
                        1.3 material or a quantity of Division 1.5 material that
                        requires placarding.
                      </label>
                      <label>
                        <input
                          type='checkbox'
                          onChange={this.showQuestions}
                          defaultChecked={this.props.HmOptions.Tih}
                          value='true'
                          name='Tih'
                          style={{ marginRight: '5px' }}
                        />
                        For materials that meet the definition of “material
                        poisonous by inhalation” (TIH) as defined in 49 CFR
                        171.8: More than 1 liter (1.08 quarts) per package of a
                        material meeting the definition of a Hazard Zone A TIH
                        material; a material meeting the definition of a Hazard
                        Zone B TIH material in a bulk package (capacity greater
                        than 450 liters [119 gallons]); or a material meeting
                        the definition of a Hazard Zone C or D TIH material in a
                        bulk packaging that has a capacity greater than 13,248
                        liters (3,500 gallons).
                      </label>
                      <label>
                        <input
                          type='checkbox'
                          onChange={this.showQuestions}
                          defaultChecked={this.props.HmOptions.Shipment}
                          value='true'
                          name='Shipment'
                          style={{ marginRight: '5px' }}
                        />
                        Shipments of compressed or refrigerated liquid methane
                        or liquefied natural gas with a methane content of at
                        least 85% in a bulk packaging that has a capacity
                        greater than 13,248 liters (3,500 gallons).
                      </label>
                    </FormGroup>
                  </Col>
                </Row>
                <div id='questions' style={{ display: 'none' }}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor='Hm' style={{ fontWeight: 'bold' }}>
                          ARE YOU APPLYING FOR OR RENEWING A Hm SAFETY PERMIT?
                        </label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <select
                          className='form-control'
                          value={
                            this.state.Hmsafety !== ''
                              ? this.state.Hmsafety
                              : this.props.HmOptions.Hmsafety
                          }
                          name='Hmsafety'
                          onChange={this.onChange}
                          ref={(Hm) => (this.Hm = Hm)}
                        >
                          <option value=''>Select</option>
                          <option value='Initial'>Initial</option>
                          <option value='Renewal'>Renewal</option>
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor='CFR' style={{ fontWeight: 'bold' }}>
                          IF YOUR COMPANY DOES NOT HAVE A USDOT NUMBER, HOW MANY
                          ACCIDENTS AS DEFINED IN 49 CFR 390.5 HAS YOUR COMPANY
                          HAD IN THE PAST 365 DAYS?
                        </label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <input
                          type='text'
                          className='form-control'
                          defaultValue={this.props.HmOptions.Cfr}
                          name='Cfr'
                          ref={(CFR) => (this.CFR = CFR)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label htmlFor='CFR485' style={{ fontWeight: 'bold' }}>
                          DOES YOUR COMPANY CERTIFY THAT THEY HAVE A
                          SATISFACTORY SECURITY PROGRAM IN PLACE AS REQUIRED IN
                          49 CFR PART 385, SUBPART E?
                        </label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <select
                          className='form-control'
                          value={
                            this.state.CFR485 !== ''
                              ? this.state.CFR485
                              : this.props.HmOptions.Cfr485
                          }
                          name='Cfr485'
                          onChange={this.onChange}
                          ref={(CFR485) => (this.CFR485 = CFR485)}
                        >
                          <option value=''>Select</option>
                          <option value='true'>Yes</option>
                          <option value='false'>No</option>
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label
                          htmlFor='ANYSTATES'
                          style={{ fontWeight: 'bold' }}
                        >
                          IS YOUR COMPANY REQUIRED BY ANY STATE(S) TO HAVE A
                          PERMIT FOR ANY OF THE HAZARDOUS MATERIALS?
                        </label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <select
                          className='form-control'
                          value={
                            this.state.ANYSTATES !== ''
                              ? this.state.ANYSTATES
                              : this.props.HmOptions.Anystates
                          }
                          name='Anystates'
                          onChange={this.onChange}
                          ref={(ANYSTATES) => (this.ANYSTATES = ANYSTATES)}
                        >
                          <option value=''>Select</option>
                          <option value='true'>Yes</option>
                          <option value='false'>No</option>
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div id='states' style={{ display: 'none' }}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label style={{ fontWeight: 'bold' }}>
                            CHECK THE STATE(S) IN WHICH YOUR COMPANY HAS THE
                            PERMIT:
                          </label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='AK'
                              defaultChecked={this.props.HmStates.Ak}
                            />
                            AK
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='IA'
                              defaultChecked={this.props.HmStates.Ia}
                            />
                            IA
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='MO'
                              defaultChecked={this.props.HmStates.Mo}
                            />
                            MO
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='OK'
                              defaultChecked={this.props.HmStates.Ok}
                            />
                            OK
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='WA'
                              defaultChecked={this.props.HmStates.Wa}
                            />
                            WA
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='AL'
                              defaultChecked={this.props.HmStates.Al}
                            />
                            AL
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='Idaho'
                              defaultChecked={this.props.HmStates.Idaho}
                            />
                            ID
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='MS'
                              defaultChecked={this.props.HmStates.Ms}
                            />
                            MS
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='Oregon'
                              defaultChecked={this.props.HmStates.Oregon}
                            />
                            OR
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='WI'
                              defaultChecked={this.props.HmStates.Wi}
                            />
                            WI
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='AR'
                              defaultChecked={this.props.HmStates.Ar}
                            />
                            AR
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='IL'
                              defaultChecked={this.props.HmStates.Il}
                            />
                            IL
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='MT'
                              defaultChecked={this.props.HmStates.Mt}
                            />
                            MT
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='PA'
                              defaultChecked={this.props.HmStates.Pa}
                            />
                            PA
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='WV'
                              defaultChecked={this.props.HmStates.Wv}
                            />
                            WV
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='AZ'
                              defaultChecked={this.props.HmStates.Az}
                            />
                            AZ
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='Indiana'
                              defaultChecked={this.props.HmStates.Indiana}
                            />
                            IN
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='NC'
                              defaultChecked={this.props.HmStates.Nc}
                            />
                            NC
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='PR'
                              defaultChecked={this.props.HmStates.Pr}
                            />
                            PR
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='WY'
                              defaultChecked={this.props.HmStates.Wy}
                            />
                            WY
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='CA'
                              defaultChecked={this.props.HmStates.Ca}
                            />
                            CA
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='KS'
                              defaultChecked={this.props.HmStates.Ks}
                            />
                            KS
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='ND'
                              defaultChecked={this.props.HmStates.Nd}
                            />
                            ND
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='RI'
                              defaultChecked={this.props.HmStates.Ri}
                            />
                            RI
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='CO'
                              defaultChecked={this.props.HmStates.Co}
                            />
                            CO
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='KY'
                              defaultChecked={this.props.HmStates.Ky}
                            />
                            KY
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='NE'
                              defaultChecked={this.props.HmStates.Ne}
                            />
                            NE
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='SC'
                              defaultChecked={this.props.HmStates.Sc}
                            />
                            SC
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='CT'
                              defaultChecked={this.props.HmStates.Ct}
                            />
                            CT
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='LA'
                              defaultChecked={this.props.HmStates.La}
                            />
                            LA
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='NH'
                              defaultChecked={this.props.HmStates.Nh}
                            />
                            NH
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='SD'
                              defaultChecked={this.props.HmStates.Sd}
                            />
                            SD
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='DC'
                              defaultChecked={this.props.HmStates.Dc}
                            />
                            DC
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='MA'
                              defaultChecked={this.props.HmStates.Ma}
                            />
                            MA
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='NJ'
                              defaultChecked={this.props.HmStates.Nj}
                            />
                            NJ
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='TN'
                              defaultChecked={this.props.HmStates.Tn}
                            />
                            TN
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='DE'
                              defaultChecked={this.props.HmStates.De}
                            />
                            DE
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='MD'
                              defaultChecked={this.props.HmStates.Md}
                            />
                            MD
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='NM'
                              defaultChecked={this.props.HmStates.Nm}
                            />
                            NM
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='TX'
                              defaultChecked={this.props.HmStates.Tx}
                            />
                            TX
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='FL'
                              defaultChecked={this.props.HmStates.Fl}
                            />
                            FL
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='ME'
                              defaultChecked={this.props.HmStates.Me}
                            />
                            ME
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='NV'
                              defaultChecked={this.props.HmStates.Nv}
                            />
                            NV
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='UT'
                              defaultChecked={this.props.HmStates.Ut}
                            />
                            UT
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='GA'
                              defaultChecked={this.props.HmStates.Ga}
                            />
                            GA
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='MI'
                              defaultChecked={this.props.HmStates.Mi}
                            />
                            MI
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='NY'
                              defaultChecked={this.props.HmStates.Ny}
                            />
                            NY
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='VA'
                              defaultChecked={this.props.HmStates.Va}
                            />
                            VA
                          </label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='HI'
                              defaultChecked={this.props.HmStates.Hi}
                            />
                            HI
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='MN'
                              defaultChecked={this.props.HmStates.Mn}
                            />
                            MN
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='OH'
                              defaultChecked={this.props.HmStates.Oh}
                            />
                            OH
                          </label>
                          <label>
                            <input
                              type='checkbox'
                              style={{ marginRight: '5px' }}
                              value='true'
                              name='VT'
                              defaultChecked={this.props.HmStates.Vt}
                            />
                            VT
                          </label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className='btn buttons-royal text-white px-4'
                type='submit'
                disabled={this.props.isLoading ? true : false}
              >
                Save
              </Button>
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
              ) : null}
              <Button
                className='btn buttons-royal text-white px-4'
                onClick={() => {
                  this.props.toggle(this.props.modalH);
                }}
              >
                Close
              </Button>{' '}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default HazardousMaterials;
