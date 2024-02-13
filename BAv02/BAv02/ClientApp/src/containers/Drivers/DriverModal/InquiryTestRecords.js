import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './../../../store/Drivers';
import { Table } from 'reactstrap';
import dateConvertTables from './../../../services/dateConvertTables';
import { DataTable } from 'react-data-table-component';

class InquiryTestRecords extends React.Component {
  render() {
    return (
      <Fragment>
        {this.props.employmentRList.map((row) => (
          <Table dark key={row.Id}>
            <thead>
              <tr>
                <th className='text-uppercase'>employer</th>
                <th className='text-uppercase'>email</th>
                <th className='text-uppercase'>date</th>
                <th className='text-uppercase'>position</th>
                <th className='text-uppercase'>view</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{row.EmployerName}</th>
                <th>{row.Email}</th>
                <th>
                  {dateConvertTables(row.DateFrom) +
                    '  to  ' +
                    dateConvertTables(row.DateTo)}
                </th>
                <th>{row.PositionHeld}</th>
                <th>
                  <button
                    onClick={() => {
                      this.props.toggleNR(row);
                    }}
                    className='btn btn-outline-success fa fa-search font-2x2icon-check icons font-2xl d-block buttons-royal text-white'
                    style={{ cursor: 'pointer', color: '#ffffff' }}
                  ></button>
                </th>
              </tr>
            </tbody>
          </Table>
        ))}
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(InquiryTestRecords);
