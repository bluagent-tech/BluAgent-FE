import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

export default function DashboardAlcoholActions() {
  const [isFetching, setFetching] = useState(true);
  useEffect(() => {
    setFetching(false);
  }, []);
  return (
    <>
      {isFetching && <h4 className='text-dark'>Loading Dashboard ...!</h4>}
      <Row>
        <Col md='2' sm='12'>
          <input
            type='image'
            className='img-responsive'
            src='assets/icons/icons8-cv.svg'
            height='150'
            width='150'
          ></input>
        </Col>
        <Col md='2' sm='12'>
          <input
            type='image'
            className='img-responsive'
            src='assets/icons/icons8-test-tube.svg'
            height='150'
            width='150'
          ></input>
        </Col>
      </Row>
    </>
  );
}
