import React, { Component } from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import { Form } from 'reactstrap';
import './Styles/StripeSaveCard.css';

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    },
  };
};

class _CardForm extends Component {
  state = {
    errorMessage: '',
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    } else {
    }
  };

  render() {
    return (
      <div className='CardDemo'>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <CardElement onChange={this.handleChange} {...createOptions()} />
          <div className='errorStripeMssg' role='alert'>
            {this.state.errorMessage}
          </div>
        </Form>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

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
          <CardForm handleResult={this.props.handleResult} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default CardDemo;
