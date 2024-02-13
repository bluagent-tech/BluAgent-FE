import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import TestCompleted from './testCompleted';
import TestInProcess from './testInProcess';
import TestReached from './testReached';

export default function HeadAlcohol() {
  return (
    <>
      <Row>
        <TestCompleted />
        <TestInProcess />
        <TestReached />
      </Row>
    </>
  );
}
