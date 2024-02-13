import React, { Component } from "react";
import { Col, Button } from "reactstrap";



export default class CompletedCollection extends Component {

  render() {
    return (
        <div className="animated fadeIn">
            <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '16pt', margin: '15px 0px 20px 50px' }}>
                <i className="fa fa-check-circle" style={{ margin: '10px' }}></i>
                Thank You! Your Collection is Complete!
            </p>

            <p style={{ fontSize: '12pt', paddingLeft: '35px' }}>
                <i className="fa fa-check-square" style={{ marginRight: '10px', color: '#28a745' }}></i>
                The Testing Lab has notified and will be able to perform the tests after the collection arrives att their site.
            </p>
            <p style={{ fontSize: '12pt', paddingLeft: '35px' }}>
                <i className="fa fa-check-square" style={{ marginRight: '10px', color: '#28a745' }}></i>
                The Requstor has been notified that the test was conducted successfully and that no further action is necessary on their part.
            </p>
            <p style={{ fontSize: '12pt', paddingLeft: '35px' }}>
                <i className="fa fa-info-circle" style={{ marginRight: '10px', color: '#28a745' }}></i>
                If you need to Print Copies of the Collection, you may print them from the Dashboard anytime you want.
            </p>

            <Button style={{ marginLeft: '55px' }} color="primary">Take Me To Drug Tests</Button>
      </div>
    );
  }
}
