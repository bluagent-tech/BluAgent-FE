import React, { Component } from 'react';
import AddPayment from '../../containers/Company/CompanyModal/AddPayment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/AccountSettings';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import DropdownMenu2 from './../../components/DropdownMenu';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const id = JSON.parse(localStorage.getItem('user')).Id;

const RowStyle = styled.input`
  margin-left: 0px;
`;

const Filter = ({ onFilter }) => {
  return (
    <React.Fragment>
      <Row>
        <Col lg='10' md='10' sm='12' xs='12'>
          <FormGroup>
            <Input
              className='form-control col-lg-8'
              id='search'
              type='search'
              role='search'
              placeholder='Search Card'
              onChange={(e) => onFilter(e.target.value)}
            />
          </FormGroup>
          <AddPayment />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const CardImg = (brand) => {
  return (
    <div className='align-right'>
      <div style={{ marginLeft: '15px', marginRight: '10px' }}>
        <img
          alt='profile'
          src={
            brand === null
              ? 'assets/img/Images/profile/profile.png'
              : `assets/img/Images/profile/${brand}.png`
          }
          className='img'
          style={{ width: '60%', height: '60%' }}
        />
      </div>
    </div>
  );
};

const OptionMenu = ({ idPayment, reduxProps }) => {
  return (
    <div className='text-center'>
      <DropdownMenu2
        direction='right'
        itemID={idPayment}
        itemsDisabled={
          reduxProps.defaultPaymentMethod === idPayment ? true : false
        }
        toggleDeleteModal={() => {
          reduxProps.detachPaymentMethod(idPayment, id);
        }}
        menuOptions={[
          [
            'Set Default',
            () => {
              reduxProps.setDefaultPayment(id, idPayment);
            },
          ],
          ['Delete', 'This is a function'],
        ]}
      />
    </div>
  );
};

const checkDefaultPaymentMethod = () => {
  return <div className='fa fa-check'></div>;
};

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterTextPaymentMethods: '',
    };
  }

  componentDidMount() {
    this.props.getPaymentsMethods(id);
    this.props.getDefaultPayment(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.defaultPaymentMethod !== this.props.defaultPaymentMethod) {
      this.props.getPaymentsMethods(id);
      this.props.getDefaultPayment(id);
    }

    return false;
  }

  mapPaymentMethodsForDataTable(items) {
    let data = items.map((row) => {
      var object = {};
      object.brandImg = CardImg(row.card.brand);
      object.numbers = `....${row.card.last4}`;
      object.expDate = `${row.card.exp_month} / ${row.card.exp_year}`;
      object.defaultPayment =
        this.props.defaultPaymentMethod === row.id
          ? checkDefaultPaymentMethod()
          : '';
      object.options = (
        <OptionMenu reduxProps={this.props} idPayment={row.id} />
      );
      return object;
    });

    return data;
  }

  render() {
    const columns = [
      { name: '', selector: 'brandImg', grow: 0 },
      { name: 'CARD', selector: 'numbers', sortable: true },
      { name: 'EXPIRATION DATE', selector: 'expDate', center: true },
      { name: 'DEFAULT PAYMENT', selector: 'defaultPayment', center: true },
      { name: 'OPTIONS', selector: 'options', center: true, style: RowStyle },
    ];

    const paymentMethods = this.mapPaymentMethodsForDataTable(
      this.props.paymentMethods
    );

    const filteredPaymentsMethods = paymentMethods.filter((item) =>
      item.numbers
        .toLowerCase()
        .includes(this.state.filterTextPaymentMethods.toLowerCase())
    );

    return (
      <div>
        <Row>
          <Col mb='4'>
            <h5>Payment Information</h5>
          </Col>
        </Row>
        <br />

        <Filter
          reduxProps={this.props}
          data={paymentMethods}
          onFilter={(value) => {
            this.setState({ filterTextPaymentMethods: value });
          }}
        />
        <DataTable
          responsive={true}
          pagination
          columns={columns}
          data={filteredPaymentsMethods}
        />
      </div>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Users);
