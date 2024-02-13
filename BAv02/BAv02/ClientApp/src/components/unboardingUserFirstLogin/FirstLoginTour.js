import React, { Component } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Tour, { STATUS, ACTIONS, EVENTS } from 'react-joyride';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/UserLog';
import TutorialTab from '../../components/TutorialTab/TutorialTab';

const idCompany = JSON.parse(localStorage.getItem("idCompany"));

class App extends Component {
  disableBody = (target) => disableBodyScroll(target);
  enableBody = (target) => enableBodyScroll(target);

  state = {
    run: false,
    steps: [
      {
        content: (
          <React.Fragment>
            <h2>Welcome!</h2>
            <p>
              This is the BluAgent Dashboard tutorial. We are happy to guide you
              through the first configuration steps.
            </p>
            <p>Lets Go!</p>
            <small className="bg-danger text-white p-1">
              To close tutorial or finish click skip !
            </small>
          </React.Fragment>
        ),
        placement: "center",
        locale: {
          skip: <strong aria-label="Skip">Skip</strong>,
          close: <strong aria-label="Close">Close!</strong>,
        },
        target: "body",
      },
      {
        target: ".CompanyProfile",
        content: (
          <React.Fragment>
            <h2>Account Settings</h2>
            <p>
              Mantains and Updates Motor Carrier management Safety information.
            </p>
            <small className="bg-danger text-white p-1">
              To close tutorial or finish click skip !
            </small>
          </React.Fragment>
        ),
        placement: "right",
      },
      {
        target: '[data-tut="DQFiles"]',
        content: (
          <React.Fragment>
            <h2>Qualifications Files</h2>
            <p>
              Speeds Driver On-Boarding, Avoids Expiration, Maintains
              Compliance.
            </p>
            <small className="bg-danger text-white p-1">
              To close tutorial or finish click skip !
            </small>
          </React.Fragment>
        ),
        placement: "right",
      },
      {
        target: '[data-tut="Maintenance"]',
        content: (
          <React.Fragment>
            <h2>Maintenance</h2>
            <p>
              Speeds Vehicle On-boarding, systematically mantain inspections and
              repair records.
            </p>
            <small className="bg-danger text-white p-1">
              To close tutorial or finish click skip !
            </small>
          </React.Fragment>
        ),
        placement: "right",
      },
      {
        target: '[data-tut="DrugAndAlcoholTest"]',
        content: (
          <React.Fragment>
            <h2>Drug & Alcohol Testing</h2>
            <p>Speeds Driver On-boarding, on random selection program.</p>
            <small className="bg-danger text-white p-1">
              To close tutorial or finish click skip !
            </small>
          </React.Fragment>
        ),
        placement: "left",
      },
      {
        target: ".hoursofservice",
        content: (
          <React.Fragment>
            <h2>Hours of Service</h2>
            <p>Driver ELD Management. </p>
            <small className="bg-danger text-white p-1">
              To close tutorial or finish click skip !
            </small>
          </React.Fragment>
        ),
        placement: "left",
      },
      {
        target: ".gpstracking",
        content: (
          <React.Fragment>
            <h2>GPS Tracking</h2>
            <p>GPS Service for Truck & Driver Tracking. </p>
            <small className="bg-danger text-white p-1">
              To close tutorial or finish click skip !
            </small>
          </React.Fragment>
        ),
        placement: "right",
      },
      {
        target: ".training",
        content: (
          <React.Fragment>
            <h2>Training</h2>
            <p>Bluagent Training Program. </p>
            <small className="bg-danger text-white p-1">
              To close tutorial or finish click skip !
            </small>
          </React.Fragment>
        ),
        placement: "left",
      },
    ],
    stepIndex: 0,
  };

  componentDidMount() {
    this.props.getOnBoard(idCompany);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onboardUser !== this.props.onboardUser) {
      this.setState({ run: !this.props.onboardUser });
    }
  }
  
  componentWillUnmount() {
    enableBodyScroll();
  }
  TutorialTabOnClickEvent() {
    this.setState({ run: true });
  }

  handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    }

    if ([STATUS.SKIPPED].includes(status)) {
      enableBodyScroll();
      this.setState({ run: false });
      this.props.OnboardCompleted(idCompany);
    }

    if ([STATUS.FINISHED].includes(status)) {
      enableBodyScroll();
      this.setState({ run: false, stepIndex: 0 });
      this.props.OnboardCompleted(idCompany);
    }

    if ([STATUS.RUNNING].includes(status)) {
      disableBodyScroll();
    }
  };

  render() {
    const { steps, stepIndex } = this.state;

    return (
      <React.Fragment>
        <Tour
          continuous
          run={this.state.run}
          callback={this.handleJoyrideCallback}
          steps={steps}
          showSkipButton
          spotlightClicks
          disableOverlayClose
          disableBeacon={true}
          isFixed={true}
          showProgress
          stepIndex={stepIndex}
          closeProps={true}
          styles={{
            options: {
              primaryColor: "var(--royal-blue)",
              zIndex: 10000,
            },
          }}
        />
        <TutorialTab onClickEvent={() => this.TutorialTabOnClickEvent()} />
      </React.Fragment>
    );
  }
}
export default connect(
  (state) => state.userLog,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(App);
