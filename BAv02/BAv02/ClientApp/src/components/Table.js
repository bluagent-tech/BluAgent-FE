import React, { Component } from "react";
import {
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";

class TableCom extends Component {
  constructor(props) {
    super(props);
    this.onCleanF = this.onCleanF.bind(this);
  }

  onCleanF(e) {
    e.preventDefault();
    this.props.cleanF();
    this.dFromT.value = "";
    this.dToT.value = "";
    this.dToT.min = false;
  }

  render() {
    let header = this.props.header.map((h) => (
      <th scope="col" key={h} className="text-center">
        {h}
      </th>
    ));

    return (
      <div className="TablaResultados">
        {this.props.p === true ? (
          ""
        ) : (
          // <Form
          //   onSubmit={(e) => {
          //     e.preventDefault();
          //     this.props.filterD(this.dFromT.value, this.dToT.value);
          //   }}
          // >
          //   <FormGroup row>
          //     <Col md='2'>
          //       <DatePicker id='dFromT' name='dFromT' />
          //     </Col>
          //     <Col md='2'>
          //       <DatePicker
          //         id='dToT'
          //         name='dToT'
          //         ref={(dToT) => (this.dToT = dToT)}
          //       />
          //     </Col>
          //     <Col sm='4'>
          //       <Button type='submit' className='buttons-royal text-white'>
          //         Search
          //       </Button>
          //     </Col>
          //     <Col sm='4'>
          //       <Button
          //         type='button'
          //         onClick={this.onCleanF}
          //         className='buttons-royal text-white'
          //       >
          //         Clean Filter
          //       </Button>
          //     </Col>
          //     <br />
          //   </FormGroup>
          // </Form>
          <div />
        )}

        <Table responsive>
          <thead>
            <tr>{header}</tr>
          </thead>
          <tbody>{this.props.rowItems}</tbody>
        </Table>
        <Row className="justify-content-center">
          <Pagination>
            <PaginationItem>
              <PaginationLink
                previous
                tag="button"
                onClick={() => {
                  if (this.props.page > 1) {
                    this.props.getItems(this.props.page - 1);
                  }
                }}
              />
            </PaginationItem>
            {[...Array(this.props.count)].map((i, index) => (
              <PaginationItem
                key={index}
                active={this.props.page === index + 1}
              >
                <PaginationLink
                  tag="button"
                  onClick={() => {
                    if (this.props.page !== index + 1) {
                      this.props.getItems(index + 1);
                    }
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                next
                tag="button"
                onClick={() => {
                  if (this.props.page < this.props.count) {
                    this.props.getItems(this.props.page + 1);
                  }
                }}
              />
            </PaginationItem>
          </Pagination>
        </Row>
      </div>
    );
  }
}

TableCom.propTypes = {
  getItems: PropTypes.func,
};

export default TableCom;
