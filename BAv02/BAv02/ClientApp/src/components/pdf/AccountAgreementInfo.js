import React, { useState, useEffect, Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Collapse } from "react-collapse";
import Switch from "react-switch";
import '../Styles/accountAgreementStyle.css'
import {
    StyleSheet,
} from "@react-pdf/renderer";
import { string } from "prop-types";

const style = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "white",
    },
    section: {
        margin: 10,
        padding: 10,
        paddingLeft: 80,
        paddingRight: 80,
        display: "block",
        width: "100%",
    },
    titleAgreement: {
        color: "white",
        backgroundColor: "#00519D",
        padding: "5px",
    },
    textContent: {
        fontSize: 13,
        lineHeight: 1.5,
        textAlign: "justify",
    },
    italicContentCenter: {
        fontSize: 13,
        lineHeight: 1.5,
        textAlign: "justify",
        fontStyle: "italic",
    },
    titleTop: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        textTransform: "uppercase",
    },
    subTitleTop: {
        fontSize: 16,
        //fontWeight: "bold",
        textAlign: "left",
        textTransform: "uppercase",
    },
    subTitleTop2: {
        fontStyle: "italic",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        textTransform: "uppercase",
    },
    subTitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
        textTransform: "uppercase",
    },
    textDisclaimer: {
        fontSize: 12,
        fontWeight: "bold",
        lineHeight: 1.5,
        textAlign: "justify",
    },
    textDriverName: {
        fontSize: 12,
        fontStyle: "italic",
    },
    signature: {
        margin: 10,
        padding: 10,
        paddingLeft: 80,
        paddingRight: 80,
        display: "block",
        width: "100%",
        justifyContent: "center"
    }
});
var companyData = {
    LegalName: "Legal Name",
    BillingAddress: "Billing Address",
    Dot: "Dot",
    Mcmx: "Mcmx",
    EmailAddress: "Email Address",
    Der: "Der",
    Phone: "000-00-000-00",
}


function Text1() {
    return (
        <>
            <div style={style.titleTop}
                className="px-5 text-center">
                COMPANY CONTRACT/REGISTRATION FORM   SUBSTANCE ABUSE PROGRAM
            </div>
            <div style={style.subTitleTop}
                className="px-5 text-center">
                Motor Carrier Safety Solutions
            </div>
            <div style={style.subTitleTop2}
                className="px-5 text-center">
                Federal Motor Carrier Safety Administration [FMCSA]
            </div>
            <div style={style.subTitle}>
                Testing Fees
            </div>
        </>
    )
}
function Text2() {
    return (
        <div style={style.textContent}>
            <strong>Consortium Fee </strong> $195 per year to be included in the Consortium billable once a year (due January 1st) or upon the start of your contract or renew, pro rated depending on your sign up month per new entries.  Fees are non refundable.
        </div>
    )
}
function Text3() {
    return <div style={style.italicContentCenter} className="px-5 text-center">
        When testing is done you will be billed per fee schedule noted below Arrangements can be made for other collection sites to be used.
    </div>
}
function Text4() {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <table className="tableAgreement">
                <tr>
                    <th className="thAgreement"><strong>Service</strong></th>
                    <th className="thAgreement"><strong>Price</strong></th>
                </tr>
                <tr>
                    <td className="tdAgreement">Pre-Employment</td>
                    <td className="tdAgreement">$60.00</td>
                </tr>
                <tr> <td className="tdAgreement">Post Accident</td>
                    <td className="tdAgreement">$60.00</td>
                </tr>
                <tr>
                    <td className="tdAgreement">Return to Work & Follow-Ups</td>
                    <td className="tdAgreement">$60.00</td>
                </tr>
                <tr>
                    <td className="tdAgreement">Pre-Employment with an alcohol test </td>
                    <td className="tdAgreement">$60.00</td>
                </tr>
                <tr>
                    <td className="tdAgreement">Alcohol testing (alone) Screening</td>
                    <td className="tdAgreement">$45.00</td>
                </tr>
                <tr>
                    <td className="tdAgreement">Confirmation alcohol testing on any positivet</td>
                    <td className="tdAgreement">$45.00</td>
                </tr>
                <tr>
                    <td className="tdAgreement">Random Testing (drug and alcohol)</td>
                    <td className="tdAgreement">$60.00</td>
                </tr>
                <tr>
                    <td className="tdAgreement">Reasonable Suspicion</td>
                    <td className="tdAgreement">$60.00</td>
                </tr>
            </table>
        </div>
    )
}
function Text5() {
    return (
        <div style={style.italicContentCenter} className="px-5 text-center">
            Onsite hourly fee applies if we come to you or if you chose another location for collection Hourly rate $25.00 plus mileage .45 cents / billed clinic fee for other location.
        </div>
    );
}
function Text6() {
    return (
        <div style={style.textContent}>
            All pricing is per test preformed, the fee that will be billable when a test is done will cover the  MRO fee, Lab fee, processing, shipping, data entry, reporting back to you the DER.
        </div>
    );
}
function Text7(Data) {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <table className="tableCompany">
                <thead>
                    <tr>
                        <th className="thAgreement">Company Name</th>
                        <th className="thAgreement">Company Billing Address</th>
                        <th className="thAgreement">DOT#</th>
                        <th className="thAgreement">MC/MX#</th>
                        <th className="thAgreement">Email Address for PDF reporting of your results (directly to your email)</th>
                        <th className="thAgreement">Name of Company Representative (DER) to recibe all confidential information/reports</th>
                        <th className="thAgreement">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="tdAgreement">{Data.LegalName}</td>
                        <td className="tdAgreement">{Data.BillingAddress}</td>
                        <td className="tdAgreement">{Data.Dot}</td>
                        <td className="tdAgreement">{Data.Mcmx}</td>
                        <td className="tdAgreement">{Data.EmailAddress}</td>
                        <td className="tdAgreement">{Data.Der}</td>
                        <td className="tdAgreement">{Data.Phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
function Text8() {
    return (
        <>
            <div style={style.subTitleTop}
                className="px-5 text-center">
                <strong>Record keeping and reporting:</strong>
            </div>
            <div style={style.textContent} className="px-5 text-center">
                We will maintain the proper record keeping and do all of the necessary compliance reporting.
            </div>
        </>
    )
}
function Text9() {
    return (
        <div style={style.textContent}>
            <strong>One Time Fee:</strong> If you are in need of supervisor training and or a drug/alcohol plan.  2 hours of training regarding specific elements of the drug and alcohol supervisors’ awareness training regulations must be completed by anyone in an operator or contractor's company, or under contract that is considered to be in a supervisor capacity.   FMCSA Supervisor's Reasonable Suspicion Training Guide  / Written drug and alcohol plan, order sheet attached.
        </div>
    )
}
function Text10() {
    return (
        <div style={style.textContent}>
            Each customer or company must designate a person(s) within their group to represent the Substance Abuse Program.  The responsibilities of the Designated Representative are as follows.
        </div>
    )
}
function Text11() {
    return (
        <ol>
            <li className="liAgreement">To remove any employee testing positive from a "Drug Free" job site or follow the steps implemented in your "Drug Free" policy.</li>
            <li className="liAgreement">May not disclose any confidential information to any other party without specific written consent of participant.</li>
            <li className="liAgreement">To establish secure measures to insure that confidential information cannot be obtained by any unauthorized person.</li>
            <li className="liAgreement">To receive all confidential information regarding a participant testing positive while employed by your company.</li>
            <li className="liAgreement">To assure that anyone working on a "Drug Free" project meets eligibility requirements.</li>
        </ol>
    )
}
function TextA() {
    return (
        <>
            <div style={style.subTitleTop}>
                <strong>(Federal Testing panel)</strong>
            </div>
            <ul>
                <li className="liAgreement"><stron>5 panel</stron> marijuana metabolite, opiates, amphetamines, cocaine metabolite, phencyclidine.</li>
                <li className="liAgreement">Alcohol testing</li>
            </ul>
        </>
    )
}
//
function Text12() {
    return (
        <div style={style.textContent}>
            All collections will be sent to a SAMSHA approved Laboratory.  All positive results will be sent to a Certified Medical Review Officer, then reported back to the DER.        </div>
    )
}
function Text13() {
    return (
        <div style={style.textContent}>
            A Substance Abuse Policy must be in place before any drug and or alcohol testing can take place.  Employees have been informed and have read and signed all the necessary forms for consent. A Supervisor(s) must be trained in Reasonable Suspicion before suspicion collections can take place.        </div>
    )
}
function Text14() {
    return (
        <div style={style.textContent}>
            A finance charge of 1.5% per month on the unpaid amount of an invoice or the maximum amount allowed by law, will be charged on past due accounts. Payments by Client will thereafter be applied first to accrued interest and then to the principalunpaid balance. Any attorney fees, court costs, or other costs incurred in collection of delinquent accounts shall be paid by Client. If payment of invoices is not current, Motor Carrier Safety Solutions may suspend performing further work. All disputes may only be brought and resolved in San Diego, CA.        </div>
    )
}
function Text15() {
    return (
        <div style={style.textContent}>
            Upon our services for your organization an itemized billing will be sent to the company noted above for payment in full, net 30 days from receipt of statement/invoice.<br></br> If Client has any valid reason for disputing any portion of an invoice, Client will so notify Oscar Gonzalez in writing within five (5) calendar days of receipt of invoice by Client, and if no such notification is given, the invoice will be deemed valid.The portion of the Company's invoice which is not in dispute shall be paid in accordance with the procedures set forth herein. $35.00 charge for any returned checks.        </div>
    )
}
function Text16() {
    return (
        <div style={style.textContent}>
            <em>Modification of agreement: </em>This contract may only be modified in writing and signed by all parties, Motor Carrier Safety Solutions            </div>
    )
}
function Signature(id, date) {
    var formatdate = '';
    if (date != "" && date != undefined) {
        const fechaOriginal = date;
        const fecha = new Date(fechaOriginal);
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();
        const anio = fecha.getFullYear();
        formatdate = `${mes}/${dia}/${anio}`;
    }
    return (
        <div style={style.signature}>
            <div style={style.textContent}>
                Company Representative (Signature):
            </div>
            <div>
                <img
                    alt="Signature"
                    className="signatureAgreement"
                    src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${id}/signature.png`}
                    onError={() => {
                        this.img.src = "assets/img/Images/NoSignature2.png";
                        this.img.style = "width:320px;height:180px;";
                    }}
                />
            </div>
            <div style={style.textContent}>
                Date:
            </div>
            <div>
                {formatdate}
            </div>
        </div>
    )
}
function Text17() {
    return <div style={style.italicContentCenter} className="px-5 text-center">
        We will provide all services concerning drug and alcohol testing required by Department of Transportation Regulations in full compliance with the provisions of 49 CFR Part 40    </div>
}
function Text18() {
    return (
        <div style={style.textContent} className="px-5 text-center">
            Fax or Mail To:<br></br>
            Motor Carrier Safety Solutions<br></br>
            C/O Oscar Gonzalez<br></br>
            2345 Marconi Ct. Suite “D”<br></br>
            San Diego, CA 92154<br></br>
            Phone: 858.204.2801      Fax: 858.623.9924<br></br>
            E-mail: info@mcmx.org
        </div>
    )
}


const AccountAgreement = function (props) {

    if (props != undefined) {
        companyData.LegalName = props.company.LegalName ?? 'NA';
        companyData.BillingAddress = props.company.PhysicalAddress ?? 'NA';
        companyData.Der = props.company.Der ?? 'NA';
        companyData.Address = props.company.PhysicalAddress ?? 'NA';
        companyData.Dot = props.company.Dot ?? 'NA';
        companyData.Mcmx = props.company.McMx ?? 'NA';
        companyData.Phone = props.company.PhoneNumber ?? 'NA';
        companyData.EmailAddress = props.company.Email ?? 'NA';
    }
    //console.log(props.company);
    const [modal, setModal] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [collapse2, setCollapse2] = useState(false);
    const [collapse3, setCollapse3] = useState(false);
    const [collapse4, setCollapse4] = useState(false);
    const [collapse5, setCollapse5] = useState(false);
    const [collapse6, setCollapse6] = useState(false);
    const [collapse7, setCollapse7] = useState(false);
    const toggle = () => setModal(!modal);
    const { className } = props;
    const [isSpanish, setIsSpanish] = useState(false);

    const toggler = () => {
        isSpanish ? setIsSpanish(false) : setIsSpanish(true);
    };
    return <div>
        <Button
            style={{
                fontSize: 18,
                backgroundColor: "white",
                borderColor: "white",
                color: "#3b86ff",
                padding: "0px",
                marginTop: "0px",
            }}
            onClick={toggle}
        >
            <strong>Account Authorization</strong>
        </Button>
        <Modal size="xl" isOpen={modal} className={className}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <div>
                    <div style={style.page}>
                        <div style={style.section}>
                            <div style={style.titleTop}
                                className="px-5 text-center">
                                TO BE READ AND SIGNED BY APPLICANT
                            </div>
                        </div>
                        <div>
                            <div className=" align-items-center cursor-menu"
                                onClick={() => setCollapse(!collapse)}>
                                <h4 style={style.titleAgreement} className="mb-0 mr-1 px-5 text-center">
                                    COMPANY CONTRACT/REGISTRATION FORM   SUBSTANCE ABUSE PROGRAM
                                </h4>
                            </div>
                            <Collapse isOpened={collapse}>
                                <div style={style.section}>
                                    {/* Titulos */}
                                    {Text1()}
                                    {/* Text */}
                                    {Text2()}
                                    <br></br>
                                    {/* Center Text */}
                                    {Text3()}
                                    {/* Columnas */}
                                    {Text4()}
                                    {/* note aboute pricing */}
                                    {Text5()}
                                    <br></br>
                                    {/* all pricing... */}
                                    {Text6()}
                                    {/* table with company information */}
                                    {Text7(companyData)}
                                    <br></br>
                                    {/* record keeping */}
                                    {Text8()}
                                    <br></br>
                                    {/* one time fee */}
                                    {Text9()}
                                    <br></br>
                                    {/* each costumer */}
                                    {Text10()}
                                    {/* lista */}
                                    {Text11()}
                                    <br></br>
                                    {/* bullet list */}
                                    {TextA()}
                                    {/* Parrafos */}
                                    {Text12()}
                                    <br></br>
                                    {Text13()}
                                    <br></br>
                                    {Text14()}

                                </div>
                            </Collapse>
                            {Signature(props.company.Id, props.signaureDate)}
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="buttons-royal text-white px-5 py-2 btn"
                    onClick={toggle}
                >
                    Close
                </Button></ModalFooter>
        </Modal>
    </div >
}
export default AccountAgreement;