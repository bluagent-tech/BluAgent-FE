import React from 'react';
import DataTable from 'react-data-table-component';
import DropdownMenu from './../../../components/DropdownMenu';
export default function PaymentCard() {
  const columns = [
    { name: '', selector: 'photo', grow: 0 },
    {
      name: 'Card',
      selector: 'card',
      center: true,
      sortable: true,
      width: '70px',
    },
    {
      name: 'EXPIRATION DATE',
      selector: 'expDate',
      center: true,
      width: '100px',
    },
    {
      name: 'DEFAULT PAYMENT',
      selector: 'defaultPayment',
      center: true,
    },
    { name: 'OPTIONS', selector: 'options', grow: 0 },
  ];
  return (
    <>
      <DataTable columns={columns} />
    </>
  );
}
