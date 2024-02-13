import React from 'react';
import { Jumbotron } from 'reactstrap';

const DERInformation = ({ Display }) => {
  if (Display) {
    return (
      <React.Fragment>
        <Jumbotron
          style={{
            color: '#fff',
            backgroundColor: '#576271',
          }}
        >
          <h5>
            You can still continue with collection after verifying the donor by
            calling de DER (Designated Employee Representative) at the
            information listed here:
          </h5>
          <h2>RAMSES GAMBOA</h2>
          <p>
            <span style={{ fontWeight: '500' }}>Phone Number:</span> (619)
            661-1078
          </p>
        </Jumbotron>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default DERInformation;
