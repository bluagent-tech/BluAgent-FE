import React, { Component, Fragment } from 'react';
import { Col, Row, Button, Badge, FormGroup, Input } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import convertDate from './../../../services/dateConvertTables';
import { actionCreators } from './../../../store/DrugAndAlcoholTesting';

class LogsRandom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  mapLogsDataTable(items) {
    let data = items.map((row,index) => {
      var object = {};
      object.no = index+1;
      object.name = row.Name;
      object.lastname = row.LastName;
      object.reason = row.Reason;
      object.date = convertDate(row.Date);
      object.quarter = row.Quarter;
      object.year = row.Year;
      object.status = row.Status
      return object;
    });

    return data;
  }

  render() {
    const columns = [
        {
          name: 'No.',
          selector: 'no',
          sortable: true,
          grow: 1
        },
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
          grow: 1
        },
        {
          name: 'Last Name',
          selector: 'lastname',
          sortable: true,
          grow: 1
        },
        {
          name: 'Reason',
          selector: 'reason',
          center: true,
          grow: 5
        },
        {
          name: 'Date',
          selector: 'date',
          center: true,
          grow: 1
        },
        {
          name: 'Quarter',
          selector: 'quarter',
          center: true,
          grow: 1
        },
        {
          name: 'Year',
          selector: 'year',
          center: true,
          grow: 1
        },
        {
          name: 'Status',
          selector: 'status',
          center: true,
          grow: 1
        }
      ];
      const logsMap = this.mapLogsDataTable(this.props.logsRandom);
    return (
      <Fragment>
              <Row>
                <Col>
                <DataTable
                style={{overflow: 'auto'}}
                responsive={true}
                pagination
                columns={columns}
                data={logsMap}
                />
                </Col>
              </Row>
      </Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(LogsRandom);
