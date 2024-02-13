import React, { Fragment } from 'react';
import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

class DriverTestReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  filterByReview(items) {
    let data = items.map((row) => {
      var object = {};
      object.Status = row.Status;
      return object;
    });
    return data;
  }
  render() {
    // const review = this.filterByReview(this.props.processReview);
    // const filterReview = review.filter((item) => {
    //   if (item.Status === 'Pending') {
    //     return item;
    //   }
    //   return item;
    // });
    return (
      <Fragment>
        <div className='text-right'>
          <img
            height='30'
            src='assets/icons/icons8-edit-property.svg'
            alt='notification-icon'
          />
        </div>
        <div className='text-center text-header-widget panels-text'>
          {this.props.porcent + '%'}
        </div>
        <div>
          <Row>
            <Col md='5'>
              <div
                style={{ position: 'relative' }}
                className='text-muted text-uppercase font-weight-bold'
              >
                Percentage Reached
              </div>
            </Col>
            <Col md='1'>
              <span style={{ position: 'relative' }}>
                <i
                  id='currentDate'
                  className='icon-question'
                  style={{ marginLeft: '-25px', color: 'grey' }}
                ></i>
                <UncontrolledTooltip target='currentDate'>
                  <p>
                    ●The minimum annual percentage rate for random drug testing
                    is 50% of the average number of drivers.
                  </p>
                  <p>
                    ●The minimum annual percentage rate for random alcohol
                    testing is 10% f the average number of drivers.
                  </p>
                </UncontrolledTooltip>
              </span>
            </Col>
            <Col>
              {parseInt(this.props.porcent) >= 50 ? (
                <div className='text-right'>
                  <button
                    className='btn btn-success text-white'
                    onClick={this.toggle}
                  >
                    View Details
                  </button>
                </div>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </div>

        <Modal isOpen={this.state.open} className={'modal-md '}>
          <ModalHeader name='modal1' toggle={this.toggle}>
            PERCENTAGE REACHED
          </ModalHeader>
          <ModalBody>
            <div style={{ textAlign: 'center' }}>
              <img
                alt='Check'
                src='/assets/icons/icons8-checkmark.svg'
                style={{ width: '50px' }}
              />
              <h4>You're All Caught Up!</h4>
              <span style={{ fontSize: '15px', color: '#b2bec3' }}>
                {/* You've completed your driver qualification file! */}
              </span>
            </div>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default DriverTestReview;
