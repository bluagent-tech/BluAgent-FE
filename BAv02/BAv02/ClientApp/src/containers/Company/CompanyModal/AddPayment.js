import React, { Component, Fragment } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  Row,
  Col,
  Form,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/AccountSettings';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import '../../../components/Styles/StripeSaveCard.css';

const createOptions = () => {
  return {
    style: {
      invalid: {
        color: '#c23d4b',
      },
    },
  };
};

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.onChangeR = this.onChangeR.bind(this);
    this.toggleAddCardModal = this.toggleAddCardModal.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChangeR(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  onChange(e) {
    const { checked, name } = e.target;
    var p = this.state.permits;
    if (checked === true) {
      p.push(name);
      this.setState({ permits: p });
    } else {
      var i = p.indexOf(name);
      p.splice(i, 1);
      this.setState({ permits: p });
    }
  }
  toggleAddCardModal() {
    this.setState({ countryPhone: '+1', Role: '', password: '', permits: [] });
    this.props.ReduxProps.toggleAddCardModal();
  }

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  async handlesubmit(e) {
    e.preventDefault();
    e.persist();
    let stripeToken;
    let form = new FormData();
    if (this.props.stripe) {
      stripeToken = await this.props.stripe
        .createToken()
        .then(function (response) {
          return response.token;
        });
    }
    stripeToken.name = e.target.Name.value;
    form.append('customerId', null);
    form.append('stripeToken', stripeToken.id);
    form.append('idUser', JSON.parse(localStorage.getItem('user')).Id);
    this.props.ReduxProps.attachPaymentMethod(form);
  }

  render() {
    return (
      <Fragment>
        <Button
          className='text-white buttons-royal'
          onClick={this.toggleAddCardModal}
        >
          Add Card
        </Button>
        <Modal
          isOpen={this.props.ReduxProps.addCardModal}
          className={'modal-md'}
        >
          <ModalHeader toggle={this.toggleAddCardModal}> Add Card</ModalHeader>
          <Form onSubmit={this.handlesubmit}>
            <ModalBody>
              <div className='form-body'>
                <Row>
                  <Col md='12'>
                    <div className='form-group'>
                      <label htmlFor='nufname'>Name on Card</label>
                      <input
                        type='text'
                        id='nufname'
                        maxLength='49'
                        className='form-control'
                        name='Name'
                        ref={(nufname) => (this.nufname = nufname)}
                        required
                      />
                    </div>
                  </Col>
                  <Col md='12'>
                    <div className='form-group'>
                      <label>Card Number</label>
                      <CardElement
                        onChange={this.handleChange}
                        {...createOptions()}
                      />
                    </div>
                  </Col>
                  <Col md='12' lg='12'>
                    <div className='form-group'>
                      <label>Supported Card Types</label>
                    </div>
                    <div className='payment-logos mx-auto'>
                      <i class='fas fa-credit-card'></i>
                      <i class='fab fa-cc-visa'></i>
                      <i class='fab fa-cc-visa'></i>
                      <i class='fab fa-cc-amex'></i>
                      <i class='fab fa-cc-discover'></i>
                      <i class='fab fa-cc-stripe'></i>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md='6'></Col>
                </Row>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type='submit'
                className='px-4 buttons-royal'
                disabled={this.props.ReduxProps.isLoading ? true : false}
              >
                Save
              </Button>
              {this.props.ReduxProps.isLoading ? (
                <img
                  alt='loading'
                  style={{
                    width: '140px',
                    position: 'absolute',
                    marginTop: '0px',
                    right: '40%',
                  }}
                  src='../../assets/img/icons/loading2.gif'
                />
              ) : (
                <div></div>
              )}
              <Button
                type='button'
                onClick={this.toggleAddCardModal}
                className='px-4 buttons-royal'
              >
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

const CardForm = injectStripe(NewUser);

export class CardDemo extends Component {
  render() {
    return (
      <StripeProvider
        apiKey={
          process.env.REACT_APP_ENV === 'production'
            ? process.env.REACT_APP_STRIPE_LIVE_SECRET_KEY
            : process.env.REACT_APP_STRIPE_TEST_SECRET_KEY
        }
      >
        <Elements>
          <CardForm ReduxProps={this.props} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(CardDemo);
