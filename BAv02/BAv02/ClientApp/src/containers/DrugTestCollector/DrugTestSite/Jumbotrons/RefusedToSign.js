import React from 'react';
import { Jumbotron } from 'reactstrap';

const DERInformation = () => {
  return (
    <React.Fragment>
      <Jumbotron
        style={{
          color: '#fff',
          backgroundColor: '#576271',
        }}
      >
        <h2>Donor Refused to sign</h2>
        <h5>Please enter the necessary remarks and observations</h5>
      </Jumbotron>
    </React.Fragment>
  );
};

export default DERInformation;
