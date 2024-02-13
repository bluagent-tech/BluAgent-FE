import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/DrugAndAlcoholTesting';
import { Card, CardBody, Col, CardHeader, Form, FormGroup } from 'reactstrap';
import NumberSpecimenSection from './NumberSpecimenSection';
import ToastAlert from '../../../components/ToastAlert';
import base64ToByteArray from '../../../services/base64ToByteArray';

class MainSection extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      DERJumbotronDisplay: false,
      checked: false,
    };
  }

  isYesAnwser(anwser) {
    if (anwser === 'Yes') {
      return true;
    } else {
      return false;
    }
  }

  submitHandler(e) {
    e.preventDefault();
    const btn = document.getElementById('options');
    let form = new FormData(e.target);
    if (
      btn.name !== 'btnCancelByID' &&
      btn.name !== 'btnCancelByIssues' &&
      btn.name !== 'btnCancelByNoneProvided'
    ) {
      const validID = document.querySelector('input[name="ValidId"]:checked')
        .value;
      const ValidTemperature = document.querySelector(
        'input[name="Temperature"]:checked'
      ).value;
      form.append('ValidIdentification', this.isYesAnwser(validID));
      form.append('ValidTemperature', this.isYesAnwser(ValidTemperature));
      form.append('IdScheduleDrugTest', this.props.idScheduled);
      form.append('provider', 'BluAgent');

      if (btn.name === 'btnStartNewTest') {
        form.append('Status', 'Canceled');
      } else {
        const Collection = document.querySelector(
          'input[name="Collection"]:checked'
        ).value;
        const collectorCertification = document.querySelector(
          'input[name="collectorConfirmation"]:checked'
        );
        const driverCertification = document.querySelector(
          'input[name="driverConfirmation"]:checked'
        );
        const collectorDate = document.querySelector(
          'input[name="DateTimeCollectionCollector"]'
        );
        const driverDate = document.querySelector(
          'input[name="DateTimeCollectionDriver"]'
        );
        form.append('TypeCollection', Collection);
        form.append(
          'CollectorCertification',
          collectorCertification ? true : false
        );
        form.append('DriverCertification', driverCertification ? true : false);
        form.append(
          'fileCollectorSignature',
          this.toBytes(this.props.collectorSignature)
        );
        form.append('FileDonorSignature',  this.toBytes(this.props.donorSignature))
        form.append('DateTimeCollectionCollector', collectorDate.value);
        form.append('DateTimeCollectionDriver', driverDate.value);
        form.append('Status', 'Collection Completed');
      }
      this.props.createDrugTest(form);
    } else {
      var cancelDetails = '';
      if (btn.name === 'btnCancelByIssues') {
        cancelDetails = form.get('IssuesCollection');
      } else if (btn.name === 'btnCancelByID') {
        cancelDetails = form.get('RemarksIdentification');
      } else {
        cancelDetails = form.get('CollectionRemarks');
      }
      this.props.updatStatusScheduleDrug(
        this.props.idScheduled,
        'Canceled',
        cancelDetails
      );
    }

    setTimeout(() => {
      window.location.replace('/#/DashboardCollector');
    }, 3000);
  }

  toBytes(stringFile) {
    var parts = stringFile.split(';base64,');
    var base64 = parts[1];
    var byteArray = base64ToByteArray(base64);
    return byteArray;
  }

  render() {
    const isInitiated =
      this.props.status === 'Collection Initiated' ? 'block' : 'none';
    return (
      <React.Fragment>
        <ToastAlert
          toggleToast={this.props.toggleToastAlert}
          isOpen={this.props.toastAlertState}
          message={this.props.message}
          error={this.props.error}
        />
        <Col
          style={{ display: isInitiated }}
          id='StartCollectionContainer'
          sm='12'
        >
          <Card className='text-center'>
            <CardHeader
              className='card-blue-gray-header'
              style={{
                textAlign: 'left',
                fontSize: '12pt',
              }}
            >
              Drug Test Site
            </CardHeader>
            <CardBody style={{ textAlign: 'left' }}>
              <Form onSubmit={this.submitHandler}>
                <FormGroup>
                  <NumberSpecimenSection
                    number={
                      this.props.DrugTestData
                        ? this.props.DrugTestData.SpecimenNumber
                        : ''
                    }
                    status={this.props.status}
                  />
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(MainSection);
