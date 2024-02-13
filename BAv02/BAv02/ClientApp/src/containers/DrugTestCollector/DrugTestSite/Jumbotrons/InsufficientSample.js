import React from 'react';
import { Jumbotron } from 'reactstrap';

const InsufficientSample = () => {
  return (
    <React.Fragment>
      <Jumbotron
        style={{
          color: '#fff',
          backgroundColor: '#576271',
        }}
      >
        <h2>
          Donor Unable to Provide Sufficient Sample. Here are your next steps:
        </h2>
        <ul>
          <li>
            Request the donor to drink fluids and provide a new sample witin 2-3
            hrs.
          </li>
          <li>
            Mark this collection as 'Suspended'. You can resume this collection
            when the donor arrives again.
          </li>
          <li>
            If the Donor still cannot provide sufficient sample, this will be
            considered as a refusal scenario. Please add any
            remarks/observations in the Remarks section.
          </li>
          <li>
            If the 2nd Sample isn't sufficient, mrak this collection as
            Cancelled after entering any necessary information.
          </li>
          <li>
            Notify the DER (Designated Employee Representative) as soon as
            possible, Our system will prompt you to notify the DER via Email on
            the following page.
          </li>
        </ul>
      </Jumbotron>
    </React.Fragment>
  );
};

export default InsufficientSample;
