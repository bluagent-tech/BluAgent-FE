import React from 'react';
import ReactDOM from 'react-dom';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { Button, Col, Row, InputGroup, Input, Form } from 'reactstrap';

 //MULTIPLE-EMPLOYER PDF FORM

class PdfME extends React.Component {
    pdfExportComponent;

    constructor(props) {
        super(props);
        this.exportPDFWithComponent = this.exportPDFWithComponent.bind(this);
        this.exportPDFWithMethod = this.exportPDFWithMethod.bind(this);
    }

    
    render() {

           
        return (
            <div style={{ zIndex: '1' }}>
                <div className="example-config">
                    <Button color="success" onClick={() => { this.exportPDFWithMethod(); }}>Download</Button>
                </div>
                <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                    <Form className="contact100-form validate-form" id={this.props.id} style={{ display: 'none' }}>
                        <div style={{ padding: '20px' }}>
                            <center>
                                <h5>MULTIPLE-EMPLOYER DRIVERS</h5>
                            </center>

                            <Row className="pdfRow">
                                <Col md="12">
                                    <p style={{ fontSize: '9pt', textAlign: 'justify', width: '550px' }}>
                                        Instructions:  If a motor carrier employs a person as a multiple-employer driver (as defined in 49 CFR 390.5), the motor carrier shall comply with
                                        all requirements of Part 391, except the carrier need not:
                                            </p>
                                </Col>
                            </Row>
                            <Row className="pdfRow">
                                <Col md="1"></Col>
                                <Col md="11">
                                    <p style={{ fontSize: '9pt', textAlign: 'justify', width: '450px' }}>
                                        (1)   Require the person to furnish an application for employment (391.21);
                                            </p>
                                    <p style={{ fontSize: '9pt', textAlign: 'justify', width: '450px' }}>
                                        (2)   Make an inquiry into the persons driving recotrd during the prededing three years to the appropriate State agency(s) an an investigation of persons employment
                                        record during the preceding three years (391.23);
                                            </p>
                                    <p style={{ fontSize: '9pt', textAlign: 'justify', width: '450px' }}>
                                        (3)   Perform annual review of the persons driving record (391.25); or
                                            </p>
                                    <p style={{ fontSize: '9pt', textAlign: 'justify', width: '450px' }}>
                                        (4)   Require the person to furnish a record of violations or a certificate (391.27).
                                            </p>
                                </Col>
                            </Row>
                            <Row className="pdfRow">
                                <Col md="12">
                                    <p style={{ fontSize: '9pt', textAlign: 'justify', width: '550px' }}>
                                        The checklist below may be helpfuk to ensure that required documets are obtained.
                                            </p>
                                </Col>
                            </Row>

                            <Row className="pdfRow">
                                <Col md="12">
                                    <center>
                                        <h6>DRIVER QUALIFICATIONS FILE CHECKLIST</h6>
                                    </center>
                                </Col>
                            </Row>
                            <Row className="pdfRow">
                                <Col md="6">
                                    <InputGroup className="pdfFormGroup">
                                        <span className="pdfSpan">Name</span>
                                        <Input className="pdfInput" defaultValue={this.props.Name} />
                                    </InputGroup>
                                </Col>
                                <Col md="6">
                                    <InputGroup className="pdfFormGroup">
                                        <span className="pdfSpan">Social Security Number</span>
                                        <Input className="pdfInput" defaultValue={this.props.Ssn === null || this.props.Ssn === '' ? "N/A" : this.props.Ssn} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="pdfRow">
                                <Col md="5">
                                    <InputGroup className="pdfFormGroup">
                                        <span className="pdfSpan">Drivers License Number</span>
                                        <Input className="pdfInput" defaultValue={this.props.License} />
                                    </InputGroup>
                                </Col>
                                <Col md="4">
                                    <InputGroup className="pdfFormGroup">
                                        <span className="pdfSpan">Type of License</span>
                                        <Input className="pdfInput" defaultValue={this.props.typeL}/>
                                    </InputGroup>
                                </Col>
                                <Col md="3">
                                    <InputGroup className="pdfFormGroup">
                                        <span className="pdfSpan">State</span>
                                        <Input className="pdfInput" defaultValue={this.props.state} />
                                    </InputGroup>
                                </Col>
                            </Row>


                            <Row className="pdfRow">
                                <Col md="12">
                                    <p style={{ fontSize: '9pt', textAlign: 'justify', width: '550px' }}>
                                        In addition to the above information, copies of the following must be obtained.
                                            </p>
                                </Col>
                            </Row>
                            <Row className="pdfRow">
                                <Col md="4"></Col>
                                <Col md="8">
                                    <input className="input-radio100" id="radio1" type="checkbox" defaultChecked={this.props.data[0] === 1 ? 'checked' : ''} name="type-product" value="physical" />
                                    <label style={{ marginLeft: '5px' }} className="label-radio100" htmlFor="radio1">
                                        Medical Examiners Certificate
			                            </label>
                                    <br />
                                    <input className="input-radio100" id="radio1" type="checkbox" defaultChecked={this.props.License !== null ? 'checked' : ''} name="type-product" value="physical" />
                                    <label style={{ marginLeft: '5px' }} className="label-radio100" htmlFor="radio1">
                                        Road Test (or equivalent)
			                            </label>
                                    <br />
                                    <input className="input-radio100" id="radio1" type="checkbox" defaultChecked={this.props.License !== null ? 'checked' : ''} name="type-product" value="physical" />
                                    <label style={{ marginLeft: '5px' }} className="label-radio100" htmlFor="radio1">
                                        Certificate of Road Test
			                            </label>
                                    <br />
                                    <input className="input-radio100" id="radio1" type="checkbox" defaultChecked={this.props.data[1] === 1 ? 'checked' : ''} name="type-product" value="physical" />
                                    <label style={{ marginLeft: '5px' }} className="label-radio100" htmlFor="radio1">
                                        Control Substances Test
			                            </label>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </PDFExport>
            </div>

        );
    }

    exportPDFWithMethod = () => {
        var p = document.getElementById(this.props.id);
        p.style = "display:block";
        savePDF(ReactDOM.findDOMNode(this.pdfExportComponent), { paperSize: 'A4' });
        p.style = "display:none";
    }
    exportPDFWithComponent = () => {
        //var p = document.getElementById('1');
        //p.style = "display:block";
        //this.pdfExportComponent.save();
        //p.style = "display:none";

    }
}

export default PdfME;