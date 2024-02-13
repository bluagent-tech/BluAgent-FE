import React from 'react';
import ReactDOM from 'react-dom';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Button, Col, Row, FormGroup, Input } from 'reactstrap';
import convertDate from './../../../services/dateConvertTables';

class PdfMCS150 extends React.Component {
  pdfExportComponent;

  constructor(props) {
    super(props);
    this.state = { orin: undefined };
    this.exportPDFWitHmethod = this.exportPDFWitHmethod.bind(this);
  }

  componentDidUpdate() {
    if (document.getElementById('formPDF').style.display === 'block') {
      for (var Index in this.props.hazardMaterials) {
        var element = this.props.hazardMaterials[Index];
        var text = document.getElementsByClassName('hazardTextPDF');
        for (var Index2 in text) {
          if (Index2 === 'length') {
            break;
          }
          var name = text[Index2].children[0].innerText;
          if (
            name.substr(-3, 3) ===
            element.HazardMaterialClasification.substr(-3, 3)
          ) {
            text[Index2].children[1].checked = element.Carrier;
            text[Index2].children[2].checked = element.Shipper;
            text[Index2].children[3].checked = element.BulkHm;
            text[Index2].children[4].checked = element.NonBulk;
          }
        }
      }
    }
  }

  render() {
    var id = JSON.parse(localStorage.getItem('user')).Id;
    //TODO: change div line 69: to FORM if is necessary keep in div if works properly.
    return (
      <div style={{ zIndex: '1' }}>
        <div className='example-config'>
          <Button
            htmlFor='formPDF'
            className='px-2 buttons-royal text-white'
            block
            onClick={() => {
              this.exportPDFWithComponent();
              this.props.getData(id, true);
            }}
          >
            Print MCS-150 Form
          </Button>
        </div>
        <PDFExport
          ref={(component) => (this.pdfExportComponent = component)}
          paperSize='A4'
          fileName={'MCS150-' + convertDate(this.props.companyData.CurrentDate)}
        >
          <div>
            <div
              id='formPDF'
              className='contact100-form validate-form'
              style={{ display: 'none' }}
            >
              <center>
                <h5 style={{ marginTop: '20px' }}>FORM MCS-150</h5>
              </center>
              <div style={{ padding: '20px' }}>
                <table style={{ fontSize: '6pt' }}>
                  <tbody>
                    <tr>
                      <th colSpan='6'>REASON FOR FILING (select only one):</th>
                    </tr>
                    <tr
                      style={{
                        borderBottom: '.5px solid #3399ff',
                        textAlign: 'center',
                      }}
                    >
                      <td colSpan='6'>
                        <input
                          className='input-radio100'
                          type='radio'
                          style={{ width: '1.2em', height: '1.2em' }}
                        />
                        <label
                          className='radio_Label'
                          style={{ marginLeft: '5px', marginRight: '10px' }}
                        >
                          {' '}
                          New Application
                        </label>
                        <input
                          className='input-radio100'
                          type='radio'
                          defaultChecked
                          style={{ width: '1.2em', height: '1.2em' }}
                        />
                        <label
                          className='label-radio100'
                          style={{
                            marginLeft: '5px',
                            marginRight: '10px',
                            border: 'none',
                          }}
                        >
                          Biennial Update or Changes
                        </label>
                        <input
                          className='input-radio100'
                          type='radio'
                          style={{ width: '1.2em', height: '1.2em' }}
                        />
                        <label
                          className='label-radio100'
                          style={{ marginLeft: '5px', marginRight: '10px' }}
                        >
                          Out of Business Notification
                        </label>
                        <input
                          className='input-radio100'
                          type='radio'
                          style={{ width: '1.2em', height: '1.2em' }}
                        />
                        <label
                          className='label-radio100'
                          style={{ marginLeft: '5px', marginRight: '10px' }}
                        >
                          Reapplication (after revocation of new entrant)
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan='2'>1. LEGAL BUSINESS NAME: </th>
                      <td colSpan='4'>
                        {' '}
                        <Input
                          className='pdfInput'
                          style={{'fontSize': '10px'}}
                          defaultValue={this.props.companyData.LegalName}
                        />{' '}
                      </td>
                    </tr>
                    <tr>
                      <th colSpan='3'>
                        2. DOING BUSINESS AS NAME (if different from Legal
                        Business Name):
                      </th>
                      <td colSpan='3'>
                        {' '}
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.DbaName}
                        />{' '}
                      </td>
                    </tr>
                    <tr>
                      <th colSpan='6'>3-7. PRINCIPAL PLACE OF BUSINESS: </th>
                    </tr>
                    <tr style={{ fontSize: '5pt', textAlign: 'center' }}>
                      <td colSpan='2'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.PhysicalAddress}
                        />
                        3. STREET ADDRESS/ROUTE NUMBER
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.MainCity}
                        />
                        4. CITY
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.MainState}
                        />
                        5. STATE/PROVINCE
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.PhysicalZip}
                        />
                        6. ZIP CODE
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black' }}
                        />
                        7. COLONIA (Mexico only)
                      </td>
                    </tr>
                    <tr>
                      <th colSpan='2'>8-12. MAILING ADDRESS: </th>
                      <td colSpan='4'>
                        <input
                          className='input-radio100'
                          type='radio'
                          id='YesAddress'
                          style={{
                            marginLeft: '15px',
                            width: '1.2em',
                            height: '1.2em',
                          }}
                        />
                        <label
                          className='label-radio100'
                          style={{ marginLeft: '5px', marginRight: '20px' }}
                        >
                          Same as Principal Address
                        </label>
                        <input
                          className='input-radio100'
                          type='radio'
                          id='NoAddress'
                          style={{ width: '1.2em', height: '1.2em' }}
                        />
                        <label
                          className='label-radio100'
                          style={{ marginLeft: '5px', marginRight: '20px' }}
                        >
                          Mailing address below:
                        </label>
                      </td>
                    </tr>
                    <tr style={{ fontSize: '5pt', textAlign: 'center' }}>
                      <td colSpan='2'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.MailAddress}
                        />
                        8. STREET ADDRESS/ROUTE NUMBER
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.MailingCity}
                        />
                        9. CITY
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.MailingState}
                        />
                        10. STATE/PROVINCE
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.MailZip}
                        />
                        11. ZIP CODE
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                        />
                        12. COLONIA (Mexico only)
                      </td>
                    </tr>
                    <tr>
                      <th colSpan='6'>13-15. CONTACT NUMBERS: </th>
                    </tr>
                    <tr style={{ fontSize: '5pt', textAlign: 'center' }}>
                      <td colSpan='2'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.PhoneNumber}
                        />
                        13. PRINCIPAL BUSINESS PHONE NUMBER
                      </td>
                      <td colSpan='2'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.MovilPhone}
                        />
                        14. PRINCIPAL CONTACT CELL PHONE NUMBER
                      </td>
                      <td colSpan='2'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black' }}
                        />
                        15. PRINCIPAL BUSINESS FAX NUMBER
                      </td>
                    </tr>
                    <tr>
                      <th colSpan='6'>16-19. IDENTIFICATION NUMBERS: </th>
                    </tr>
                    <tr style={{ fontSize: '5pt', textAlign: 'center' }}>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.Dot}
                        />
                        16. USDOT NUMBER
                      </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={
                            this.props.companyData.McMx !== 'UNDEFINED'
                              ? this.props.companyData.McMx
                              : ''
                          }
                        />
                        17. MC or MX NUMBER
                      </td>
                      <td colSpan='2'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                        />
                        18. DUN & BRADSTREET NUMBER
                      </td>
                      <td colSpan='2'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.Tax}
                        />
                        19. IRS/TAX ID NUMBER (see instructions before
                        completing this section)
                      </td>
                    </tr>
                    <tr>
                      <th>20. E-MAIL ADDRESS: </th>
                      <td colSpan='5'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black', 'fontSize': '10px' }}
                          defaultValue={this.props.companyData.Email}
                        />
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '.5px solid #3399ff' }}>
                      <th colSpan='3'>
                        21. CARRIER MILEAGE (to nearest 10,000 miles for the
                        previous 12 months):
                      </th>
                      <td colSpan='3'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black' , 'fontSize': '10px'}}
                          defaultValue={this.props.companyData.Mcs150Mileage}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ paddingTop: '15px' }} colSpan='6'>
                        22. COMPANY OPERATIONS (check all that apply):
                      </th>
                    </tr>
                    <tr style={{ borderBlock: '.5px solid black' }}>
                      <td colSpan='6'>
                        <input
                          className='input-radio100'
                          type='checkbox'
                          style={{
                            width: '1.2em',
                            marginLeft: '20px',
                            height: '1.2em',
                          }}
                          id='A'
                        />
                        <label
                          className='label-radio100'
                          style={{
                            marginLeft: '5px',
                            marginRight: '10px',
                            width: '10%',
                          }}
                        >
                          A. Interstate Carrier
                        </label>
                        <input
                          className='input-radio100'
                          type='checkbox'
                          style={{ width: '1.2em', height: '1.2em' }}
                          id='B'
                        />
                        <label
                          className='label-radio100'
                          style={{
                            marginLeft: '5px',
                            marginRight: '10px',
                            width: '10%',
                          }}
                        >
                          B. Intrastate Hazmat Carrier
                        </label>
                        <input
                          className='input-radio100'
                          type='checkbox'
                          style={{ width: '1.2em', height: '1.2em' }}
                          id='C'
                        />
                        <label
                          className='label-radio100'
                          style={{
                            marginLeft: '5px',
                            marginRight: '10px',
                            width: '15%',
                          }}
                        >
                          C. Intrastate Non-Hazmat Carrier
                        </label>
                        <input
                          className='input-radio100'
                          type='checkbox'
                          style={{ width: '1.2em', height: '1.2em' }}
                          id='D'
                        />
                        <label
                          className='label-radio100'
                          style={{
                            marginLeft: '5px',
                            marginRight: '10px',
                            width: '15%',
                          }}
                        >
                          D. Interstate Hazmat Shipper
                        </label>
                        <input
                          className='input-radio100'
                          type='checkbox'
                          style={{ width: '1.2em', height: '1.2em' }}
                          id='E'
                        />
                        <label
                          className='label-radio100'
                          style={{ marginLeft: '5px', width: '15%' }}
                        >
                          {' '}
                          E. Intrastate Hazmat Shipper{' '}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table style={{ fontSize: '6pt' }}>
                  <tbody>
                    <tr>
                      <th colSpan='5'>
                        23. OPERATION CLASSIFICATIONS (check all that apply):
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.A}
                          />
                          A. Authorized For-Hire
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.D}
                          />
                          B. Exempt For-Hire
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.G}
                          />
                          C. Private Property
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.B}
                          />
                          D. Private Motor Carrier of Passengers (Business)
                        </label>
                      </td>
                      <td>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.E}
                          />
                          E. Private Motor Carrier of Passengers (Non-Business)
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.H}
                          />
                          F. Migrant
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.C}
                          />
                          G. U.S. Mail
                        </label>
                      </td>
                      <td>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.F}
                          />
                          H. Federal Government
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.I}
                          />
                          I. State Government
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em' , 'fontSize': '10px'}}
                            defaultChecked={this.props.operationC.J}
                          />
                          J. Local Government
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.K}
                          />
                          K. Indian Tribe
                        </label>
                      </td>
                      <td colSpan='2'>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.operationC.L}
                          />
                          L. Other:
                        </label>
                        <Input
                          className='pdfInput'
                          style={{ border: '.5px solid black', height: '50px', 'fontSize': '10px' }}
                          defaultValue={this.props.operationC.Other}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th colSpan='5'>
                        24. CARGO CLASSIFICATIONS (check all that apply):{' '}
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.A}
                          />
                          A. General Freight
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.B}
                          />
                          B. Household Goods
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.C}
                          />
                          C. Metal: Sheets, Coils, Rolls
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.D}
                          />
                          D. Motor Vehicles
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.E}
                          />
                          E. Drive Away/Towaway
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.F}
                          />
                          F. Logs, Poles, Beams, Lumber
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.G}
                          />
                          G. Building Materials
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.H}
                          />
                          H. Mobile Homes
                        </label>
                      </td>
                      <td>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.I}
                          />
                          I. Machinery, Large Objects
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.J}
                          />
                          J. Fresh Produce
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.K}
                          />
                          K. Liquids/Gases
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.L}
                          />
                          L. Intermodal Container
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.M}
                          />
                          M. Passengers
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.N}
                          />
                          N. Oil Field Equipment
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.O}
                          />
                          O. Livestock
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.P}
                          />
                          P. Grain, Feed, Hay
                        </label>
                      </td>
                      <td>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.Q}
                          />
                          Q. Coal/Coke
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.R}
                          />
                          R. Meat
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.S}
                          />
                          S. Garbage, Refuse, Trash
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em' , 'fontSize': '10px'}}
                            defaultChecked={this.props.cargoC.T}
                          />
                          T. U.S. Mail
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.U}
                          />
                          U. Chemicals
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.V}
                          />
                          V. Commodities Dry Bulk
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.W}
                          />
                          W. Refrigerated Food
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.X}
                          />
                          X. Beverages
                        </label>
                      </td>
                      <td colSpan='2'>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.Y}
                          />
                          Y. Paper Product
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.Z}
                          />
                          Z. Utility
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.AA}
                          />
                          AA. Farm Supplies
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.BB}
                          />
                          BB. Construction
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em', 'fontSize': '10px' }}
                            defaultChecked={this.props.cargoC.CC}
                          />
                          CC. Water Well
                        </label>
                        <label
                          className='label-radio100'
                          style={{ width: '100%' }}
                          htmlFor='radio1'
                        >
                          <input
                            className='input-radio100'
                            type='checkbox'
                            style={{ width: '1.2em', height: '1.2em' , 'fontSize': '10px'}}
                            defaultChecked={this.props.cargoC.DD}
                          />
                          DD. Other:
                        </label>
                        <Input
                          className='pdfInput'
                          style={{ border: '.5px solid black', height: '50px' , 'fontSize': '10px'}}
                          defaultValue={this.props.cargoC.Other}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <br />
                <br />
                <div
                  style={{
                    fontSize: '6pt',
                    borderTop: '.5px solid #3399ff',
                    borderBottom: '.5px solid #3399ff',
                  }}
                >
                  <Row style={{ marginTop: '10px' }}>
                    <Col>
                      <FormGroup>
                        <label style={{ fontWeight: 'bold' }}>
                          25. HAZARDOUS MATERIALS (Carrier or Shipper) (check
                          all that apply):
                        </label>
                        <br />
                        <label>
                          (C=Carrier; S=Shipper; B=Bulk, in cargo tanks;
                          NB=Non-Bulk, in packages)
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-15px' }}>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup>
                        <label
                          style={{
                            width: '65%',
                            paddingLeft: '5px',
                            paddingRight: '0px',
                          }}
                        ></label>
                        <label style={{ fontWeight: 'bold' }}>C</label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          S
                        </label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          B
                        </label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          NB
                        </label>
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup>
                        <label style={{ width: '65%' }}></label>
                        <label style={{ fontWeight: 'bold' }}>C</label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          S
                        </label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          B
                        </label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          NB
                        </label>
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup>
                        <label style={{ width: '65%' }}></label>
                        <label style={{ fontWeight: 'bold' }}>C</label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          S
                        </label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          B
                        </label>
                        <label
                          style={{ fontWeight: 'bold', marginLeft: '10px' }}
                        >
                          NB
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-20px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          A. DIV 1.1
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          O. DIV 2.3D
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          CC. DIV 6.2
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          B. DIV 1.2
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          P. CLASS 3
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          DD. CLASS 7
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          C. DIV 1.3
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          Q. CLASS 3A
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          EE. HRCQ
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          D.DIV 1.4
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          R. CLASS 3B
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          FF. CLASS 8
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          E. DIV 1.5
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          S. COMB LIQ
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          GG. CLASS 8A
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          F. DIV 1.6
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          T. DIV 4.1
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          HH. CLASS 8B
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          G. DIV 2.1 (Flam. Gas)
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          U. DIV 4.2
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          II. CLASS 9
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          H. DIV 2.1 LPG
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          V. DIV 4.3
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          JJ. ELEVATED TEMP. MAT.
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          I. DIV 2.1 (Methane)
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          W. DIV 5.1
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          KK. INFECTIOUS WASTE
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          J. DIV 2.2
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          X. DIV 5.2
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          LL. MARINE POLLUTANTS
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          K. DIV 2.2D (Ammonia)
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          Y. DIV 6.1A
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          MM. HAZARDOUS SUB (RQ)
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          L. DIV 2.3A
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          Z. DIV 6.1B
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          NN. HAZARDOUS WASTE
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          M. DIV 2.3B
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          AA. DIV 6.1 POISON
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          OO. ORM
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '-25px' }}>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          N. DIV 2.3C
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      style={{
                        paddingLeft: '5px',
                        paddingRight: '0px',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <FormGroup className='hazardTextPDF'>
                        <label style={{ fontWeight: 'bold', width: '65%' }}>
                          BB. DIV 6.1 SOLID
                        </label>
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                        <input
                          type='checkbox'
                          style={{ marginRight: '5px', width: '1.3em' }}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingLeft: '5px', paddingRight: '0px' }}>
                      <FormGroup></FormGroup>
                    </Col>
                  </Row>
                </div>
                <br />

                <table style={{ fontSize: '6pt' }}>
                  <tbody>
                    <tr>
                      <th colSpan='16'>
                        26. NUMBER OF VEHICLES THAT WILL BE OPERATED IN THE
                        U.S.:
                      </th>
                    </tr>
                    <tr>
                      <th rowSpan='3'></th>
                      <th rowSpan='3'>Straight Trucks</th>
                      <th rowSpan='3'>Truck Tractors</th>
                      <th rowSpan='3'>Trailers</th>
                      <th rowSpan='3'>Hazmat Cargo Tank Trucks</th>
                      <th rowSpan='3'>Hazmat Cargo Tank Trailers</th>
                      <th rowSpan='3'>Motor-coach</th>
                      <th
                        colSpan='9'
                        style={{
                          borderBottom: '.5px solid #3399ff',
                          textAlign: 'center',
                        }}
                      >
                        Number of vehicles carrying number of passengers
                        (including the driver)
                      </th>
                    </tr>
                    <tr>
                      <th
                        colSpan='3'
                        style={{
                          borderBottom: '.5px solid #3399ff',
                          textAlign: 'center',
                        }}
                      >
                        School Bus
                      </th>
                      <th
                        style={{
                          borderBottom: '.5px solid #3399ff',
                          textAlign: 'center',
                        }}
                      >
                        Bus
                      </th>
                      <th
                        colSpan='2'
                        style={{
                          borderBottom: '.5px solid #3399ff',
                          textAlign: 'center',
                        }}
                      >
                        Passenger Van
                      </th>
                      <th
                        colSpan='3'
                        style={{
                          borderBottom: '.5px solid #3399ff',
                          textAlign: 'center',
                        }}
                      >
                        Limousine
                      </th>
                    </tr>
                    <tr>
                      <th>1-8</th>
                      <th>9-15</th>
                      <th>16+</th>
                      <th>16+</th>
                      <th>1-8</th>
                      <th>9-15</th>
                      <th>1-8</th>
                      <th>9-15</th>
                      <th>16+</th>
                    </tr>
                    <tr
                      style={{
                        borderTop: '.5px solid #3399ff',
                        borderBottom: '.5px solid #3399ff',
                        textAlign: 'center',
                      }}
                    >
                      <th style={{ borderRight: '.5px solid #3399ff' }}>
                        Owned
                      </th>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input
                          className='pdfInput'
                          defaultValue={
                            !this.props.companyData.PcFlag
                              ? this.props.companyData.Powerunit
                              : null
                          }
                        />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input
                          className='pdfInput'
                          defaultValue={
                            this.props.companyData.PcFlag
                              ? this.props.companyData.Powerunit
                              : null
                          }
                        />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderTop: '.5px solid #3399ff',
                        borderBottom: '.5px solid #3399ff',
                        textAlign: 'center',
                      }}
                    >
                      <th style={{ borderRight: '.5px solid #3399ff' }}>
                        Term Leased
                      </th>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderTop: '.5px solid #3399ff',
                        borderBottom: '.5px solid #3399ff',
                        textAlign: 'center',
                      }}
                    >
                      <th style={{ borderRight: '.5px solid #3399ff' }}>
                        Trip Leased
                      </th>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                      <td style={{ borderRight: '.5px solid #3399ff' }}>
                        <Input className='pdfInput' />
                      </td>
                    </tr>

                    <tr>
                      <th
                        style={{ paddingBottom: '10px', paddingTop: '15px' }}
                        colSpan='16'
                      >
                        27. DRIVER INFORMATION:{' '}
                      </th>
                    </tr>

                    <tr>
                      <th colSpan='4'>DRIVER INFORMATION </th>
                      <th colSpan='3'>INTERSTATE</th>
                      <th colSpan='3'>INTRASTATE</th>
                      <th colSpan='3'>TOTAL DRIVERS</th>
                      <th colSpan='3'>TOTAL CDL DRIVERS</th>
                    </tr>
                    <tr
                      style={{
                        borderTop: '.5px solid #3399ff',
                        borderBottom: '.5px solid #3399ff',
                        textAlign: 'center',
                      }}
                    >
                      <th
                        colSpan='4'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        Within 100-Mile Radius
                      </th>
                      <td
                        colSpan='3'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        <Input
                          className='pdfInput'
                          defaultValue={this.props.companyData.WithinInterstate}
                        />
                      </td>
                      <td
                        colSpan='3'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        <Input
                          className='pdfInput'
                          defaultValue={this.props.companyData.WithinIntrastate}
                        />
                      </td>
                      <td
                        colSpan='3'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        <Input
                          className='pdfInput'
                          defaultValue={this.props.companyData.TotalWithin}
                        />
                      </td>
                      <td
                        colSpan='3'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        <Input
                          className='pdfInput'
                          defaultValue={this.props.companyData.TotalWithin}
                        />
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderTop: '.5px solid #3399ff',
                        borderBottom: '.5px solid #3399ff',
                        textAlign: 'center',
                      }}
                    >
                      <th
                        colSpan='4'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        Beyond 100-Mile Radius
                      </th>
                      <td
                        colSpan='3'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        <Input
                          className='pdfInput'
                          defaultValue={
                            this.props.companyData.BeyonfInterstate === 0 &&
                            this.props.companyData.DriverTotal > 0 &&
                            (this.props.companyData.CarrierOperation === 'A' ||
                              this.props.companyData.CarrierOperation === 'D')
                              ? this.props.companyData.DriverTotal
                              : this.props.companyData.BeyonfInterstate
                          }
                        />
                      </td>
                      <td
                        colSpan='3'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        <Input
                          className='pdfInput'
                          defaultValue={
                            this.props.companyData.BeyonfIntrastate === 0 &&
                            this.props.companyData.DriverTotal > 0 &&
                            (this.props.companyData.CarrierOperation === 'B' ||
                              this.props.companyData.CarrierOperation === 'C' ||
                              this.props.companyData.CarrierOperation === 'E')
                              ? this.props.companyData.DriverTotal
                              : this.props.companyData.BeyonfIntrastate
                          }
                        />
                      </td>
                      <td
                        colSpan='3'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        <Input
                          className='pdfInput'
                          defaultValue={
                            this.props.companyData.TotalBeyon === 0 &&
                            this.props.companyData.DriverTotal > 0
                              ? this.props.companyData.DriverTotal
                              : this.props.companyData.TotalBeyon
                          }
                        />
                      </td>
                      <td
                        colSpan='3'
                        style={{ borderRight: '.5px solid #3399ff' }}
                      >
                        <Input
                          className='pdfInput'
                          defaultValue={
                            this.props.companyData.TotalBeyon === 0 &&
                            this.props.companyData.DriverTotal > 0
                              ? this.props.companyData.DriverTotal
                              : this.props.companyData.TotalBeyon
                          }
                        />
                      </td>
                    </tr>

                    <tr>
                      <th
                        style={{ paddingBottom: '10px', paddingTop: '15px' }}
                        colSpan='16'
                      >
                        28. IS YOUR USDOT NUMBER REGISTRATION CURRENTLY REVOKED
                        BY THE FMCSA?{' '}
                      </th>
                    </tr>

                    <tr>
                      <td colSpan='3'>
                        <input
                          className='input-radio100'
                          type='radio'
                          style={{ width: '1.2em', height: '1.2em' }}
                        />
                        <label
                          className='radio_Label'
                          style={{ marginLeft: '5px', marginRight: '10px' }}
                        >
                          Yes
                        </label>
                        <input
                          className='input-radio100'
                          type='radio'
                          style={{ width: '1.2em', height: '1.2em' }}
                          defaultChecked
                        />
                        <label
                          className='label-radio100'
                          style={{ marginLeft: '5px', marginRight: '10px' }}
                        >
                          No
                        </label>
                      </td>
                      <td colSpan='4' style={{ marginLeft: '5px' }}>
                        If yes, enter your USDOT Number:
                      </td>
                      <td colSpan='3'>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th colSpan='16'>29. COMPLIANCE CERTIFICATION: </th>
                    </tr>
                    <tr>
                      <td colSpan='16'>
                        <p>
                          ALL MOTOR PASSENGER CARRIER APPLICANTS must certify as
                          follows:
                        </p>
                        <p style={{ marginLeft: '7px' }}>
                          Applicant is fit, willing, and able to provide the
                          proposed operations and to comply with all pertinent
                          statutory and regulatory requirements, including the
                          U.S. Department of Transportation’s Americans with
                          Disabilities Act regulations for over-the-road bus
                          companies located at 49 CFR Part 37, Subpart H, if
                          applicable.
                        </p>
                        <input
                          className='input-radio100'
                          type='checkbox'
                          style={{ width: '1.2em', height: '1.2em' }}
                          defaultChecked={
                            this.props.cargoC.PassengerCertificate
                          }
                        />
                        <label
                          className='radio_Label'
                          style={{ marginLeft: '5px', marginRight: '20px' }}
                        >
                          Yes
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='16'>
                        <p>
                          Private entities that are primarily in the business of
                          transporting people, whose operations affect commerce,
                          and that transport passengers in an over-the-road bus
                          (defined as a bus characterized by an elevated
                          passenger deck over a baggage compartment) are subject
                          to the U.S. Department of Transportation’s Americans
                          with Disabilities Act regulations located at 49 CFR
                          Part 37, Subpart H. For a general overview of these
                          regulations, go to the Federal
                        </p>
                      </td>
                    </tr>
                    <tr style={{ borderTop: '.5px solid #3399ff' }}>
                      <th colSpan='16'>
                        30. PLEASE ENTER NAME(S) OF SOLE PROPRIETOR, PARTNERS,
                        OR OFFICERS AND TITLES
                        <br />
                        (e.g., president, treasurer, general partner, limited
                        partner)
                      </th>
                    </tr>

                    <tr>
                      <th style={{ paddingLeft: '40px' }}>1.</th>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black' }}
                        />
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: '.5px solid #3399ff',
                        paddingBottom: '10px',
                      }}
                    >
                      <th style={{ paddingLeft: '40px' }}>2.</th>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black' }}
                        />
                        <p>(please type or print names)</p>
                      </td>
                    </tr>

                    <tr>
                      <th
                        colSpan='16'
                        style={{ paddingTop: '15px', paddingBottom: '10px' }}
                      >
                        31. CERTIFICATION STATEMENT (to be completed by
                        authorized official):{' '}
                      </th>
                    </tr>

                    <tr
                      style={{
                        borderTop: '.5px solid #3399ff',
                        borderLeft: '.5px solid #3399ff',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <td style={{ paddingLeft: '40px' }}>I, </td>
                      <td>
                        <Input
                          className='pdfInput'
                          style={{
                            borderBottom: '.5px solid black',
                            fontSize: '1em',
                          }}
                          defaultValue={this.props.companyData.UserName}
                        />
                      </td>
                      <td colSpan='5'>
                        , certify that I am familiar with the Federal Motor
                        Carrier Safety Regulations and/or Federal
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderLeft: '.5px solid #3399ff',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <td colSpan='7' style={{ paddingLeft: '10px' }}>
                        <p>
                          Hazardous Materials Regulations. Under penalties of
                          perjury, I declare that the information entered on
                          this report is, to the best of my knowledge and
                          belief, true, correct, and complete.
                        </p>
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderLeft: '.5px solid #3399ff',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <th style={{ paddingLeft: '10px', width: '8%' }}>
                        Signature:{' '}
                      </th>
                      <td style={{ width: '30%' }}>
                        {this.props.companyData.Signature !== '' ? (
                          <img
                            alt='signature'
                            id='img3'
                            src={this.props.companyData.Signature}
                            width='100'
                            height='60'
                          />
                        ) : (
                          ''
                        )}
                      </td>
                      <th style={{ width: '4%' }}>Title: </th>
                      <td style={{ width: '20%' }}>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black' }}
                          defaultValue={this.props.companyData.Title}
                        />
                      </td>
                      <th style={{ width: '4%' }}>Date: </th>
                      <td style={{ width: '15%' }}>
                        <Input
                          className='pdfInput'
                          style={{ borderBottom: '.5px solid black' }}
                          defaultValue={convertDate(
                            this.props.companyData.CurrentDate
                          )}
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: '.5px solid #3399ff',
                        borderLeft: '.5px solid #3399ff',
                        borderRight: '.5px solid #3399ff',
                      }}
                    >
                      <td colSpan='3'></td>
                      <td colSpan='4'>
                        <p>(please type or print)</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </PDFExport>
      </div>
    );
  }

  exportPDFWitHmethod = () => {
    savePDF(ReactDOM.findDOMNode(this.pdfExportComponent), {
      paperSize: 'A4',
      imageResolution: 50,
    });
  };
  exportPDFWithComponent = () => {
    var p = document.getElementById('formPDF');
    p.style = 'display:block';
    this.pdfExportComponent.save();
    setTimeout(function () {
      p.style = 'display:none';
    }, 2000);
    window.open('https://ask.fmcsa.dot.gov/app/ask', '_blank');
  };
}

export default PdfMCS150;
