import React, { useState, useEffect, Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Collapse } from "react-collapse";
import Switch from "react-switch";
import {
  StyleSheet,
} from "@react-pdf/renderer";

const style = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    display: "block",
    width: "100%",
  },
  titleAgreement: {
    color: "white",
    backgroundColor: "#00519D",
    padding: "5px",
  },
  textContent: {
    fontSize: 12,
    lineHeight: 1.5,
    textAlign: "justify",
  },
  titleTop: {
    fontSize: 18,
    fontWeight: "bolder",
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
});

const DriverAgreement = function (props) {
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

  return (
    <div>
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
        <strong>Driver Authorization and Consent</strong>
      </Button>

      <Modal size="xl" isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <div>
            <div style={style.page}>
              <div style={style.section}>
                <div
                  style={{ textAlign: "center" }}
                  className="container-fluid"
                >
                  {isSpanish ? (
                    <div
                      style={style.titleTop}
                      className="px-5 text-center"
                    >
                      Para ser leido y firmado por el aplicante
                    </div>
                  ) : (
                    <div
                      style={style.titleTop}
                      className="px-5 text-center"
                    >
                      To Be Read and Signed by Applicant
                    </div>
                  )}
                  <div className="d-flex justify-content-end align-items-center"><Switch
                    className="pull-right"
                    onChange={toggler}
                    checked={isSpanish}
                    uncheckedIcon={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: 12,
                          color: "#FFF",
                          paddingRight: 10,
                          top:'-30px'
                        }}
                      >
                        English
                      </div>
                    }
                    checkedIcon={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: 12,
                          color: "#FFF",
                          paddingLeft: 10,
                          top:'-30px'
                        }}
                      >
                        Español
                      </div>
                    }
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={20}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                    height={30}
                    width={80}
                    //paddingRight={0}
                    margin="5px"
                  /></div>
                </div>
                <br></br>
                {isSpanish ? (
                  <div>
                    <div
                      className=" align-items-center cursor-menu"
                      onClick={() => setCollapse(!collapse)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                      Application for Employment Authorization
                      </h4>
                    </div>
                    <Collapse isOpened={collapse}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          I authorize you to make sure investigations and
                          inquiries to my personal, employment, financial or
                          medical history and other related matters as may be
                          necessary in arriving at an employment decision.
                          (Generally, inquiries regarding medical history will
                          be made only if and after a conditional offer of
                          employment has been extended.) I hereby release
                          employers, schools, health care providers and other
                          persons from all liability in responding to inquiries
                          and releasing information in connection with my
                          application.
                        </div>
                      </div>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          In the event of employment, I understand that false or
                          misleading information given in my application or
                          interview(s) may result in discharge. I understand,
                          also, that I am required to abide by all rules and
                          regulations of the Company{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          . “I understand that information I provide regarding
                          current and/or previous employers may be used, and
                          those employer(s) will be contacted, for the purpose
                          of investigating my safety performance history as
                          required by 49 CFR 391.23(d) and (e). I understand
                          that I have the right to:
                        </div>
                      </div>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          • Review information provided by current/previous
                          employers;
                          <br></br>• Have errors in the information corrected by
                          previous employers and for those previous employers to
                          re-send the corrected information to the prospective
                          employer; and
                          <br></br>• Have a rebuttal statement attached to the
                          alleged erroneous information, if the previous
                          employer(s) and I cannot agree on the accuracy of the
                          information.”
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className=" align-items-center cursor-menu"
                      onClick={() => setCollapse2(!collapse2)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Pre-employment Urinalysis and Breath Analysis Consent Form
                      </h4>
                    </div>
                    <Collapse isOpened={collapse2}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          I understand that as required by the Federal Motor
                          Carrier Administration Regulations, Title 49 Code of
                          Federal Regulations, Section 382.301, all
                          driver-applicants of this employer must be tested for
                          controlled substances and alcohol as a pre-condition
                          for employment.
                          <br></br>I consent to the urine sample collection and
                          testing for controlled substances, and the breath
                          sample collection and testing for alcohol.
                          <br></br>I understand that a verified positive test
                          result for controlled substances and/or an alcohol
                          concentration of 0.04 or higher will render me
                          unqualified to operate a commercial motor vehicle.
                          <br></br>
                          The medical review officer will maintain the results
                          of my controlled substance test. Negative and positive
                          results will be reported to the employer. If the
                          results are positive, the controlled substance will be
                          identified.
                          <br></br>
                          Alcohol test results will be maintained by the
                          employer.
                          <br></br>
                          The results will not be released to any other parties
                          without my written authorization.
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className="align-items-center cursor-menu"
                      onClick={() => setCollapse3(!collapse3)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        PSP Disclosure Authorization
                      </h4>
                    </div>
                    <Collapse isOpened={collapse3}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          THE BELOW DISCLOSURE AND AUTHORIZATION LANGUAGE IS FOR
                          MANDATORY USE BY ALL ACCOUNT HOLDERS.
                          <br />
                          IMPORTANT DISCLOSURE REGARDING BACKGROUND REPORTS FROM
                          THE PSP Online Service.
                        </div>
                      </div>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          In connection with your application for employment
                          with{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          (“Prospective Employer”), Prospective Employer, its
                          employees, agents or contractors may obtain one or
                          more reports regarding your driving, and safety
                          inspection history from the Federal Motor Carrier
                          Safety Administration (FMCSA). <br />
                          <br />
                          When the application for employment is submitted in
                          person, if the Prospective Employer uses any
                          information it obtains from FMCSA in a decision to not
                          hire you or to make any other adverse employment
                          decision regarding you, the Prospective Employer will
                          provide you with a copy of the report upon which its
                          decision was based and a written summary of your
                          rights under the Fair Credit Reporting Act before
                          taking any final adverse action. If any final adverse
                          action is taken against you based upon your driving
                          history or safety report, the Prospective Employer
                          will notify you that the action has been taken and
                          that the action was based in part or in whole on this
                          report.
                          <br /> <br />
                          When the application for employment is submitted by
                          mail, telephone, computer, or other similar means, if
                          the Prospective Employer uses any information it
                          obtains from FMCSA in a decision to not hire you or to
                          make any other adverse employment decision regarding
                          you, the Prospective Employer must provide you within
                          three business days of taking adverse action oral,
                          written or electronic notification: that adverse
                          action has been taken based in whole or in part on
                          information obtained from FMCSA; the name, address,
                          and the toll free telephone number of FMCSA; that the
                          FMCSA did not make the decision to take the adverse
                          action and is unable to provide you the specific
                          reasons why the adverse action was taken; and that you
                          may, upon providing proper identification, request a
                          free copy of the report and may dispute with the FMCSA
                          the accuracy or completeness of any information or
                          report. If you request a copy of a driver record from
                          the Prospective Employer who procured the report,
                          then, within 3 business days of receiving your
                          request, together with proper identification, the
                          Prospective Employer must send or provide to you a
                          copy of your report and a summary of your rights under
                          the Fair Credit Reporting Act.
                          <br /> <br />
                          Neither the Prospective Employer nor the FMCSA
                          contractor supplying the crash and safety information
                          has the capability to correct any safety data that
                          appears to be incorrect. You may challenge the
                          accuracy of the data by submitting a request to
                          https://dataqs.fmcsa.dot.gov. If you challenge crash
                          or inspection information reported by a State, FMCSA
                          cannot change or correct this data. Your request will
                          be forwarded by the DataQs system to the appropriate
                          State for adjudication.
                          <br /> <br />
                          Any crash or inspection in which you were involved
                          will display on your PSP report. Since the PSP report
                          does not report, or assign, or imply fault, it will
                          include all Commercial Motor Vehicle (CMV) crashes
                          where you were a driver or co-driver and where those
                          crashes were reported to FMCSA, regardless of fault.
                          Similarly, all inspections, with or without
                          violations, appear on the PSP report. State citations
                          associated with Federal Motor Carrier Safety
                          Regulations (FMCSR) violations that have been
                          adjudicated by a court of law will also appear, and
                          remain, on a PSP report.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.textContent}>
                          The Prospective Employer cannot obtain background
                          reports from FMCSA without your authorization.
                          <hr />
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.textContent}>AUTHORIZATION</div>
                      </div>

                      <div style={style.section}>
                        <div style={style.textContent}>
                          If you agree that the Prospective Employer may obtain
                          such background reports, please read the following and
                          sign below:
                          <br /> <br />I authorize{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          (“Prospective Employer”) to access the FMCSA
                          Pre-Employment Screening Program (PSP) system to seek
                          information regarding my commercial driving safety
                          record and information regarding my safety inspection
                          history. I understand that I am authorizing the
                          release of safety performance information including
                          crash data from the previous five (5) years and
                          inspection history from the previous three (3) years.
                          I understand and acknowledge that this release of
                          information may assist the Prospective Employer to
                          make a determination regarding my suitability as an
                          employee. I further understand that neither the
                          Prospective Employer nor the FMCSA contractor
                          supplying the crash and safety information has the
                          capability to correct any safety data that appears to
                          be incorrect. I understand I may challenge the
                          accuracy of the data by submitting a request to
                          https://dataqs.fmcsa.dot.gov. If I challenge crash or
                          inspection information reported by a State, FMCSA
                          cannot change or correct this data. I understand my
                          request will be forwarded by the DataQs system to the
                          appropriate State for adjudication. I understand that
                          any crash or inspection in which I was involved will
                          display on my PSP report. Since the PSP report does
                          not report, or assign, or imply fault, I acknowledge
                          it will include all CMV crashes where I was a driver
                          or co-driver and where those crashes were reported to
                          FMCSA, regardless of fault. Similarly, I understand
                          all inspections, with or without violations, will
                          appear on my PSP report, and State citations
                          associated with FMCSR violations that have been
                          adjudicated by a court of law will also appear, and
                          remain, on my PSP report.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.textContent}>
                          I have read the above Disclosure Regarding Background
                          Reports provided to me by Prospective Employer and I
                          understand that if I sign this Disclosure and
                          Authorization, Prospective Employer may obtain a
                          report of my crash and inspection history. I hereby
                          authorize Prospective Employer and its employees,
                          authorized agents, and/or affiliates to obtain the
                          information authorized above.
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className="align-items-center cursor-menu"
                      onClick={() => setCollapse4(!collapse4)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Employer Pull Notice Program Authorization for Release
                        of Driver Record Information
                      </h4>
                    </div>
                    <Collapse isOpened={collapse4}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          I,{" "}
                          <strong style={style.textDriverName}>
                            {props.props.Name + " " + props.props.LastName}
                          </strong>{" "}
                          , California Driver License,{" "}
                          <strong style={style.textDriverName}>
                            {props.props.License}
                          </strong>{" "}
                          , hereby authorize the Department of Motor
                          Vehicles(DMV) to disclose or other make available, my
                          driving record, to my employer,{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          .
                          <br />
                          <br />
                          I Understand that my employer may enroll me in the
                          Employer Pull Notice(EPN) program to receive a driver
                          record report at least once every 12 months or when
                          any subsequent, failure to appear, accident, driver's
                          license suspension, revocation or any other action is
                          taken against my driving privilege during employment.
                          <br />
                          <br />I am not driving in a capacity that requires
                          mandatory enrollment in the EPN program pursuant to
                          California Vehicle Code(CVC) Section 1808.1(k). I
                          understand that enrollment in the EPN program is an
                          effort to promote driver safety, and that my driver
                          license report will be released to my employer to
                          determine my eligibility as a licensed driver for my
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className=" align-items-center cursor-menu"
                      onClick={() => setCollapse5(!collapse5)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Authorization to Obtain Motor Vehicle Record
                      </h4>
                    </div>
                    <Collapse isOpened={collapse5}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          THE UNDERSIGNED DOES HEREBY ACKNOWLEDGE AND CERTIFY AS
                          FOLLOWS:
                          <br></br>
                          1. Certifies that the undersigned is an employee, or
                          has applied to become an employee of the below named
                          employer in a position which involves the operation of
                          a motor vehicle and the undersigned gives his or her
                          consent to the release of their driving record (MVR)
                          for review by:{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          .<br></br>
                          2. That the undersigned authorizes his or her driving
                          record to be periodically obtained and reviewed for
                          the purpose of initial and continued employment.
                          <br></br>
                          3. That all information presented in this form is true
                          and correct. The undersigned makes this certification
                          and affirmation under penalty of perjury and
                          understands that knowingly making a false statement or
                          representation on this form is a criminal violation.
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className="align-items-center cursor-menu"
                      onClick={() => setCollapse6(!collapse6)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Clearing House Annual Query
                      </h4>
                    </div>
                    <Collapse isOpened={collapse6}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          General Consent for Limited Queries of the Federal
                          Motor Carrier Safety Administration (FMCSA) Drug and
                          Alcohol Clearinghouse.
                        </div>
                      </div>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          I,{" "}
                          <strong style={style.textDriverName}>
                            {props.props.Name + " " + props.props.LastName}
                          </strong>
                          , hereby provide consent to conduct a multiple limited
                          queries for the duration of employment of the FMCSA
                          commercial Driver's License Drug and Alcohol
                          ClearingHouse to determine wheter drug or alcohol
                          violation information about me in the ClearingHouse. I
                          understand that if the limited query conducted by{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          indicates that drug or alcohol violation information
                          about me exists in the ClearingHouse, FMCSA will not
                          disclose that information to{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          without first obtaining additional specific consent
                          from me. I further understand that if I refuse to
                          provide consent for{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          to conduct a limited query of the ClearingHouse,{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          must prohibit me from performing safety-sensitive
                          functions, including driving a commercial motor
                          vehicle, as required by FMCSA's drug and alcohol
                          program regulations.
                        </div>
                      </div>
                      <div>
                        <div>
                          {props.signatureDiv !== undefined
                            ? props.signatureDiv(props.company.Id, props.props.Id)
                            : ""}
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className="align-items-center cursor-menu"
                      onClick={() => setCollapse7(!collapse7)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Pre-Employment Drug Testing Policy
                      </h4>
                    </div>
                    <Collapse isOpened={collapse7}>
                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>PROPÓSITO:</strong>
                        </div>
                        <div style={style.textContent}>
                          El propósito de esta política es proporcionar un
                          ambiente seguro y productivo para evitar accidentes,
                          lesiones y daños materiales que puedan resultar del
                          abuso de las drogas, y así mismo proteger a los
                          clientes que hacen uso de los servicios públicos.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>ÁMBITO DE APLICACIÓN: </strong>
                        </div>
                        <div style={style.textContent}>
                          Esta póliza cubre a los solicitantes que han cumplido
                          con las normas señaladas en el Apéndice A, incluyendo
                          a los solicitantes de puestos temporales,
                          estacionales, tiempo parcial o bien que trabajan menos
                          de medio tiempo o tiempo limitado, y a todos aquellos
                          que no están en un empleo permanente. La lista
                          principal de las posiciones reales para pre-empleo
                          droga se mantendrá en el Departamento de Servicios
                          para los empleados. Esta política no se aplica a los
                          empleados actuales que son candidatos internos para
                          las posiciones abiertas.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>DECLARACIÓN: </strong>
                        </div>
                        <div style={style.textContent}>
                          "CompanyName"está comprometida a un lugar de trabajo
                          libre de los efectos del uso de alcohol y drogas no
                          autorizadas. El uso de drogas no autorizadas pueden
                          plantear graves riesgos para el usuario y sus colegas,
                          así como para el público que utilicé el servicio. Por
                          lo tanto, "COMPANYNAME" ha elegido llevar a cabo la
                          prueba de pre-empleo para evitar la contratación de
                          personas cuyo uso no autorizado de drogas crea un
                          potencial de deterioro o inseguridad en el rendimiento
                          del trabajo.
                          <br></br>
                          Los solicitantes de puestos de trabajo que cumplen con
                          las normas señaladas en el Apéndice A se someterá a la
                          detección de la presencia de drogas ilegales, como
                          condición para el empleo. Los solicitantes estarán
                          obligados a someterse a un análisis de orina en un
                          laboratorio de "COMPANYNAME" de su elección.
                          <br></br>
                          <br></br>
                          <strong>TABLA DE CONTENIDO</strong>
                          <ul>
                            <li>Pruebas Pre-empleo</li>
                            <li>Marihuana Medicinal</li>
                            <li>Costo de las pruebas</li>
                            <li>Procedimientos de las pruebas de drogas</li>
                            <li>Revision de los resultados</li>
                            <li>Evaluación médica, Reporte Oficial</li>
                            <li>MRO verificación sin notificar a los </li>
                            <li>Comunicación de los resultados... </li>
                            <li>Mantenimiento de Registros de resultados...</li>
                            <li>DefinicDefinición de términos</li>
                            <li>Apéndice A</li>
                          </ul>
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Pruebas de Pre-empleo</strong>
                        </div>
                        <div style={style.textContent}>
                          La prueba de pre-empleo es necesaria para que todas
                          las posiciones se cumplan de acuerdo a las normas
                          enumeradas en el Apéndice A. Los solicitantes serán
                          notificados de que las pruebas de drogas son un
                          requisito del proceso de selección. El resultado de
                          prueba de drogas que se verifique como positivo, para
                          el uso no autorizado de sustancias controladas,
                          descalificará al solicitante para la posición que se
                          le ofrece. Un resultado negativo diluido no es
                          satisfactorio en un examen de pre-empleo. A los
                          solicitantes se les dará una oportunidad adicional
                          para proporcionar una muestra válida. El resultado de
                          la segunda prueba determinará si el solicitante es
                          candidato para el empleo.
                          <br></br>
                          Una persona que recibe cualquiera de los siguientes
                          resultados en la prueba de droga no es candidata para
                          ser contratada, y será descalificado por "COMPANYNAME"
                          por un período de veinticuatro (24) meses a partir de
                          la fecha del resultado de la prueba:
                          <br></br>
                          <ul>
                            <li>verificado "positivo"</li>
                            <li>en segundo lugar "negativo diluido",</li>
                            <li>
                              segunda muestra fuera del rango de temperatura
                              permitido,
                            </li>
                            <li>
                              "cancelado-inválido resultado" en la explicación
                              del donante no es aceptado por la MRO,
                            </li>
                            <li>verificado "adulterado",</li>
                            <li>verificar "sustituido".</li>
                          </ul>
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Marihuana Medicinal</strong>
                        </div>
                        <div style={style.textContent}>
                          La marihuana es una sustancia controlada Clase I, y su
                          uso es ilegal bajo la ley federal. Aunque La ley de
                          California (§ 11362.5 (b) (1) (A) y (d) de 1996 ())
                          exime de persecución penal en corte del estado a las
                          personas que obtengan una "tarjeta de identificación
                          en el registro" del Departamento de California de
                          Servicios Humanos, sobre la base de una declaración de
                          su asistente médico, que el individuo tiene una
                          "condición médica debilitante", esto no es una
                          explicación aceptable para una prueba positiva de la
                          droga en esta Política.
                          <br></br>
                          La revisión médica Oficial (MRO) de forma automática
                          verificará las pruebas como positivos.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Costo de las pruebas</strong>
                        </div>
                        <div style={style.textContent}>
                          "COMPANYNAME" pagará por todas las pruebas de drogas
                          antes del empleo.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Procedimientos de prueba de la droga</strong>
                        </div>
                        <div style={style.textContent}>
                          La muestras de orina para la prueba de drogas será
                          realizado por personal calificado utilizando la cadena
                          de custodia procedimientos que se describen en los
                          Estados Unidos del Departamento de Transporte (DOT)
                          regulaciones (49 CFR Parte 40) y con el respeto a la
                          privacidad y la dignidad de la persona que otorgara la
                          muestra.
                          <br></br>
                          En la muestra de prueba de la droga se reunirá por lo
                          menos 45 ml de orina. Si el solicitante es incapaz de
                          proporcionar un volumen suficiente de orina en el
                          primer intento ("vejiga tímida"), él / ella tendrá la
                          oportunidad de tomar hasta 40 onzas de fluidos dentro
                          de tres horas. Al final de este período, si una
                          muestra de volumen adecuado ha no ha sido siempre, la
                          prueba será cancelada. Una nueva prueba se permitirá
                          si el solicitante proporciona una evaluación médica de
                          un médico con licencia, aceptable para el{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          que tiene experiencia en los problemas médicos que
                          plantea la incapacidad del solicitante para
                          proporcionar una muestra suficiente.
                          <br></br>
                          El colector debe verificar la temperatura de la
                          muestra al recibirla del solicitante. El rango de
                          temperatura aceptable es 90 a 100 grados Fahrenheit.
                          Si la muestra está fuera del rango aceptable, el
                          solicitante deberá iniciar una segunda observación en
                          la colección. Si la segunda muestra también está fuera
                          del rango aceptable, el solicitante será
                          descalificado. Si dentro del rango, la segunda muestra
                          se pondrá a prueba en el laboratorio. Sólo los
                          laboratorios certificados por el Abuso de Sustancias y
                          Servicios de Salud Mental. Cuando una prueba de
                          detección inicial de drogas es positivo, una segunda
                          prueba de confirmación automáticamente se llevará a
                          cabo. La confirmación de las pruebas positivas será
                          reportada por el laboratorio; para el MRO para su
                          verificación (véase "Prueba de la Droga Revisión de
                          los resultados").
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>
                            Resultados de la prueba de drogas revisión.
                          </strong>
                        </div>
                        <div style={style.textContent}>
                          Resultados de la prueba de drogas de un solicitante
                          que se reportan como positivo adulterados, o
                          sustituido por el laboratorio de pruebas serán
                          revisados y verificados por el médico Oficial de
                          Revisión (MRO). Un resultado de prueba de droga
                          positiva se define como la detección de uno o más de
                          los sustancias que figuran en la tabla que aparece a
                          continuación.
                          <br></br>
                          <br></br>
                          <table className="table">
                            <thead className="thead-dark">
                              <tr>
                                <th scope="col">Sustancia o Clase</th>
                                <th scope="col">Corte de Detección Inicial</th>
                                <th scope="col">Corte de Confirmación</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>Anfetaminas</th>
                                <td>1000 ng/Ml</td>
                                <td>500 ng/mL</td>
                              </tr>
                              <tr>
                                <th>Cocaina</th>
                                <td>300 ng/mL</td>
                                <td>150 ng/mL</td>
                              </tr>
                              <tr>
                                <th>Marihuana (THC)</th>
                                <td>50 ng/mL</td>
                                <td>15 ng/mL</td>
                              </tr>
                              <tr>
                                <th>Opiáceos</th>
                                <td>2000 ng/mL</td>
                                <td>2000/10ng/mL</td>
                              </tr>
                              <tr>
                                <th>Fenciclidina (PCP)</th>
                                <td>25 ng/Ml</td>
                                <td>25 ng/Ml</td>
                              </tr>
                            </tbody>
                          </table>
                          <br></br>
                          Una prueba positiva confirmada por un laboratorio
                          certificado no identifican automáticamente al empleado
                          o solicitante por ser una violación de esta política.
                          El MRO lleva detallado conocimiento de las posibles
                          explicaciones alternativas médicas para su / su
                          revisión de la prueba resultados. Esta revisión es
                          realizada por la MRO antes de la transmisión de los
                          resultados de{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          .
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>
                            Evaluación médica Opciones Oficiales de Información:
                          </strong>
                        </div>
                        <div style={style.textContent}>
                          <ul>
                            <li>"negativo" - explica por sí mismo.</li>
                            <li>
                              "negativo diluido" - Tras la recepción de un
                              "negativo diluido," el solicitante deberá ser
                              obligados a proporcionar otra muestra tan pronto
                              como sea posible.
                            </li>
                            <li>
                              "Cancelado - prueba no se realiza, defecto fatal
                              (con defecto establecido) o no corregida Un error.
                              "Una prueba de drogas se cancela ni positivo ni
                              negativo y no consecuencias son que se le
                              atribuye. El solicitante tendrá la oportunidad de
                              tomar una segunda prueba.
                            </li>
                            <li>
                              "Cancelado - Resultado no válido." Un "número no
                              válido" significa que el laboratorio no pudo para
                              obtener un resultado válido cuando se trata de
                              examinar la muestra. Si el MRO ha aceptó la
                              explicación de los donantes en cuanto a por qué el
                              laboratorio no pudo obtener un resultado válido,
                              el MRO notificará al condado y una nueva prueba
                              será permitido. Si el MRO no ha aceptado la
                              explicación de los donantes, el MRO notificará
                              "COMPANYNAME" y el solicitante será descalificado.
                            </li>
                            <li>
                              "positiva o positiva Diluir" - El solicitante será
                              descalificado.
                            </li>
                            <li>
                              "adulterado" - El solicitante será descalificado.
                            </li>
                            <li>
                              "sustituido" - El solicitante será descalificado.
                              MRO verifica sin notificar a los empleados.
                            </li>
                          </ul>
                          El MRO está autorizado para comprobar como positiva
                          una prueba o bien negativa. "COMPANYNAME" ha realizado
                          con éxito y documentado un contacto con el
                          solicitante, y ha pedido al solicitante en contacto
                          con el MRO.
                          <strong> NOTA:</strong> Si una prueba se verifica
                          positiva en el último caso, el donante puede dar la
                          información MRO documentación que las enfermedades
                          graves, lesiones u otras circunstancias caso de fuerza
                          mayor que él / ella en contacto con el MRO. Sobre la
                          base de esta información, el MRO puede volver a abrir
                          la verificación, lo que permite que el donante
                          presente una información relativa a una explicación
                          legítima para la prueba positiva. Si el MRO concluye
                          que no existe una explicación legítima, el MRO deberá
                          verificar la prueba como negativo.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Comunicación de los resultados</strong>
                        </div>
                        <div style={style.textContent}>
                          El MRO o su / su representante designado informará
                          resultados de las pruebas SÓLO a la Empleador
                          designado Representante (DER). La confidencialidad se
                          mantiene estrictamente. Si el resultado es positivo,
                          el MRO o su / su representante autorizado dará informe
                          de la identidad de la sustancia controlada.
                          <br></br>
                          Los solicitantes pueden obtener copias de los
                          resultados de la prueba mediante la solicitud de las
                          mismas por escrito de la MRO dentro de los 60 días de
                          ser notificado de los resultados.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>
                            Mantenimiento de Registros de Procedimientos
                          </strong>
                        </div>
                        <div style={style.textContent}>
                          "COMPANYNAME" mantendrá registros de pre-empleo de
                          pruebas de drogas en un sistema de archivo seguro con
                          información disponible sólo en una "necesidad de
                          saber" por un período de dos años.
                          <br></br>
                          <strong>Definición de Términos</strong>
                          <br></br>
                          <strong>Muestras adulteradas:</strong> Una muestra que
                          contiene una sustancia que no se espera que este
                          presente en la orina humana, o bien que contenga una
                          sustancia presente alta concentración que no es
                          consistente con la orina humana.
                          <br></br>
                          <strong>CFR:</strong> Código de los Estados Unidos de
                          Regulaciones Federales.
                          <br></br>
                          <strong>Cadena de custodia:</strong> Procedimiento
                          para tener en cuenta la integridad de cada muestra de
                          orina por el seguimiento de su manejo y almacenamiento
                          desde el punto de recogida de hasta la disposición
                          final de la muestra. Estos procedimientos se requieren
                          que un minucioso análisis de drogas apropiadas que
                          forman parte de un Departamento de Salud y Servicios
                          Humanos (DHHS), y Abuso de Sustancias, Servicios de
                          Salud Mental (SAMHSA) laboratorio certificado se
                          utiliza en de la colección a la recepción por el
                          laboratorio.
                          <br></br>
                          <strong>La colección de sitios:</strong> Una clínica
                          designada / instalación donde los solicitantes o
                          empleados pueden presentarse con el fin de
                          proporcionar una muestra de su orina para ser
                          analizada.
                          <br></br>
                          <strong>Colector:</strong> Persona que instruye y
                          ayuda a los solicitantes y/o empleados, recogiendo la
                          muestra de orina para el proceso.
                          <br></br>
                          <strong>Prueba de confirmación:</strong> Un segundo
                          método de análisis de pruebas de drogas para
                          identificar la presencia de una droga independiente de
                          la prueba inicial y se utiliza un técnica diferente y
                          principio químico de la de la prueba inicial con el
                          fin de garantizar confiabilidad y precisión.
                          Cromatografía de gases / espectrometría de masas
                          (GC-MS) es la única confirmación autorizada método
                          para la prueba de drogas del DOT mandato.
                          <br></br>
                          <strong>Sustancias Controladas:</strong> Las
                          sustancias que figuran en los Anexos I a V de 21 USC
                          802 ya que podrá ser revisado de vez en cuando (21 CFR
                          1308). Las sustancias controladas incluyen las drogas
                          ilícitas y medicamentos que pueden ser autorizadas
                          para su uso por un médico o dentista para ciertos usos
                          médicos, pero que están sujetos a mal uso o abuso.
                          <br></br>
                          <strong>"COMPANYNAME":</strong> Empleador
                          <br></br>
                          <strong>
                            Empleador designado Representante (DER):{" "}
                          </strong>
                          Un empleado autorizado por el empleador para
                          administrar y tomar decisiones en las pruebas y los
                          procesos de evaluación. La DER también recibe
                          resultados de las pruebas y otras comunicaciones para
                          el empleador y comunica los resultados de la prueba a
                          los distintos departamentos.
                          <br></br>
                          <strong>Diluir muestras:</strong> Una muestra con
                          valores de creatinina y la gravedad específica que son
                          más bajos lo que se esperaba de la orina humana.
                          <br></br>
                          <strong>DOT:</strong> United States Department of
                          Transportation.
                          <br></br>
                          <strong>FHWA:</strong> Administración Federal de
                          Carreteras.
                          <br></br>
                          <strong>FMCSA:</strong> Federal Motor Carrier Safety
                          Administration.
                          <br></br>
                          <strong>Prueba inicial o de proyección:</strong> Una
                          pantalla de inmunoensayo para eliminar la "negativa"
                          la orina muestras de mayor consideración.
                          <br></br>
                          <strong>Médico Oficial de Revisión (MRO):</strong> Un
                          médico licenciado en medicina u osteopatía con
                          conocimiento de los trastornos de abuso de drogas y
                          las pruebas de drogas que es responsable de revisar y
                          la verificación de los resultados de análisis de
                          drogas antes de su comunicación a los designados,
                          Representante del empleador.
                          <br></br>
                          <strong>Prueba de las Drogas negativas:</strong>{" "}
                          Prueba en la que las pruebas iniciales o de
                          confirmación, no se presentaron pruebas de una droga
                          prohibida en el sistema de un solicitante por encima
                          de los niveles establecidos, o bien que una prueba de
                          lo cual se verifica como negativa por el MRO (ejemplo,
                          la revisión mostró un resultado positivo se debió a
                          los medicamentos de prescripción o cualquier otro uso
                          autorizado de sustancias controladas).
                          <br></br>
                          <strong>Prueba de Drogas Positiva:</strong> Resultado
                          de la prueba de orina que indica la presencia de
                          sustancias controladas más allá de los niveles de
                          corte.
                          <br></br>
                          <strong>
                            Prueba de Drogas Positiva confirmó:
                          </strong>{" "}
                          Una prueba de drogas positiva que ha sido objeto de
                          una primera "Screening" de prueba y una prueba de
                          conformidad que valida el primer resultado. Las
                          pruebas de drogas son confirmadas por el laboratorio
                          SAMHSA certificado que realiza los análisis.
                          <br></br>
                          <strong>
                            Prueba de Drogas Positiva Verificado:
                          </strong>{" "}
                          Una prueba de drogas positiva confirmada (ver arriba)
                          después de investigación realizada por la MRO, que ha
                          determinado que no existe una explicación legítima
                          para la presencia de la sustancia controlada que se
                          detectó.
                          <br></br>
                          <strong>Las drogas prohibidas:</strong> Marihuana,
                          cocaína, opiáceos, fenciclidina (PCP), y las
                          anfetaminas.
                          <br></br>
                          <strong>Negarse a someterse:</strong> Negativa de un
                          individuo para proporcionar una muestra de orina.
                          <br></br>
                          <strong>SAMHSA:</strong> Abuso de Sustancias y
                          Servicios de Salud Mental, una división de los EE.UU.
                          Departamento de Salud y Servicios Humanos (DHHS), que
                          es responsable de laboratorios de certificación para
                          realizar pruebas de drogas en el lugar federales.
                          <br></br>
                          <strong>Detección inicial o de prueba:</strong> La
                          pantalla de Inmunoensayo para eliminar la "negativa"
                          la orina muestras de mayor consideración.
                          <br></br>
                          <strong>Muestra sustituida:</strong> Una muestra con
                          valores de creatinina y la gravedad específica que no
                          son consistentes con la orina humana.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Muestra sustituida:</strong>
                        </div>
                        <div style={style.textContent}>
                          Los puestos que hayan probado las siguientes normas se
                          aplican para evaluar si un puesto de trabajo y / o
                          clasificación puede ser aprobado para pre-empleo droga
                          que prueba posterior a la oferta. Adiciones o
                          supresiones la lista de cargos y / o clasificaciones
                          elegibles para las pruebas de drogas antes del empleo
                          pueden ser hechas por solicitud del supervisor del
                          departamento afectado o la persona designada para el
                          Supervisor de Servicios de los empleados. Para ser
                          incluido en la lista, el solicitante de las
                          actividades diarias típicas que incluyen los derechos
                          de tales como:
                          <br></br>
                          Los empleados cubiertos por los Estados Unidos del
                          Departamento de Transporte Reglamentos, Código 49 de
                          Regulaciones Federales (CFR), Parte 40 y Parte 382. He
                          leído en su totalidad y entender las declaraciones
                          anteriores y las condiciones de empleo Los
                          solicitantes proporcionan la siguiente información:
                          Firma, Fecha, Licencia de conducir.
                          <br></br>
                          Drogas y Alcohol Política e Información
                          <br></br>
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          está comprometido a proporcionar un lugar seguro para
                          sus empleados, y también se compromete a poner a
                          salvo, a los operadores de sus vehículos. Tenemos la
                          intención de nuestro lugar de trabajo esté libre de
                          drogas, y que los empleados estén libres de los
                          efectos del alcohol mientras están en servicio. Una
                          parte clave del programa de la empresa es el
                          cumplimiento de la Federal Motor Reglamento de
                          Seguridad de Autotransportes, 49 CFR, Parte 382.
                          <br></br>
                          La siguiente información es siempre de acuerdo con la
                          Parte 382.601: Patrón de contacto designado <strong style={style.textDriverName}>
                            {props.company.Der}
                          </strong>{" "} es la persona designada de la
                          compañía para proporcionar información sobre el
                          programa de sustancias controladas. Las preguntas
                          deben ser dirigidas a él en "Company Phone #".
                          <br></br>
                          Categorías sometidas a pruebas: Todos los conductores
                          de vehículos que tengan una licencia de conductor
                          comercial, que trabajan a tiempo parcial o a tiempo
                          completo para{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          están sujetos a la sustancia controlada prueba de lo
                          dispuesto en la Parte 382.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Sensible a la seguridad Funciones</strong>
                        </div>
                        <div style={style.textContent}>
                          Todos los conductores se considera que cumplen con las
                          funciones de seguridad sensible en cualquier período
                          en que se realicen efectivamente, la conducción de un
                          vehículo comercial.
                          <br></br>
                          Estas funciones también se definen como:
                          <ul>
                            <li>
                              Tiempo en una propiedad de terminales,
                              instalaciones o de otro tipo a la espera de ser
                              enviados.
                            </li>
                            <li>
                              Tiempo la inspección del equipo según sea
                              necesario, o el servicio / acondicionado una
                              vehículos de motor.
                            </li>
                            <li>Conducción.</li>
                            <li>
                              El tiempo pasado en o en cualquier vehículo
                              comercial.
                            </li>
                            <li>
                              El tiempo dedicado carga o descarga de un vehículo
                              o permanecer en la preparación de conducir un
                              vehículo.
                            </li>
                            <li>
                              El tiempo dedicado supervisar o ayudar a cargar o
                              descargar un vehículo.
                            </li>
                            <li>
                              El tiempo empleado asistir a un vehículo que está
                              siendo descargada.
                            </li>
                            <li>
                              Tiempo empleado en realizar los requisitos de
                              conductor en relación con los accidentes.
                            </li>
                            <li>
                              El tiempo dedicado reparación, la obtención de
                              asistencia o permanecer en la asistencia en un
                              vehículo descompuesto.
                            </li>
                            <li>
                              El tiempo dedicado a dar una muestra de aliento o
                              de orina en el cumplimiento de las requisitos de
                              la Parte 382.
                            </li>
                          </ul>
                          <br></br>
                          Las conductas prohibidas
                          <br></br>
                          En concreto, todos los conductores que realizan
                          funciones sensibles para la seguridad deben cumplir
                          con lo siguiente:
                          <br></br>
                          <ul>
                            <li>
                              Ningún conductor deberá presentarse al trabajo o
                              permanecer en el servicio mientras que tiene una
                              concentración de alcohol de 0.02 o más.
                            </li>
                            <li>
                              Ningún conductor deberá poseer alcohol, a menos
                              que el alcohol se manifiesta y se transporte como
                              parte de un envío.
                            </li>
                            <li>
                              Ningún conductor deberá utilizar el alcohol en el
                              desempeño de las funciones de seguridad sensibles.
                            </li>
                            <li>
                              Ningún conductor deberá realizar funciones
                              sensibles para la seguridad dentro de las cuatro
                              horas de uso alcohol.
                            </li>
                            <li>
                              No requiere operador para tener un accidente
                              después de la prueba de alcohol, se utiliza la
                              prueba ocho horas siguientes al accidente, o hasta
                              que él o ella sufren un accidente después de
                              prueba de alcohol, lo que ocurra primero.
                            </li>
                            <li>
                              Ningún chofer deberá negarse a someterse a un
                              accidente de correos; al azar; razonable sospecha,
                              o de seguimiento, el alcohol o la prueba de
                              sustancias controladas.
                            </li>
                            <li>
                              Ningún conductor deberá presentarse al trabajo o
                              permanecer en su puesto cuando el conductor
                              utiliza cualquier sustancia controlada. Una
                              excepción es cuando el uso de la sustancia
                              controlada es de conformidad con las instrucciones
                              de un médico y no afecta negativamente la
                              capacidad del conductor para operar un vehículo
                              comercial. (El empleador puede requerir un
                              controlador para informar al patrón de uso de
                              cualquier droga terapéutica).
                              <strong>Nota:</strong> el uso de otro individuo
                              medicina de la prescripción puede considerarse
                              prohibido el uso de sustancias controladas.
                            </li>
                            <li>
                              Ningún conductor deberá presentarse para el
                              servicio, permanecer en servicio o realizar una
                              crítica a la seguridad función, si el conductor da
                              positivo por sustancias controladas.
                            </li>
                          </ul>
                          <br></br>
                          <strong>Tipos de pruebas</strong>
                          <br></br>
                          El alcohol y las siguientes pruebas de sustancias
                          controladas se llevarán a cabo. En orden para el
                          conductor que se le permita realizar funciones
                          sensibles para la seguridad, un impacto negativo
                          resultado de las sustancias controladas y una
                          concentración de alcohol de menos de 0,02 será
                          necesario. (Una concentración de entre 0,02 y 0,039 se
                          traducirá en unas 24 horas descalificación. Una
                          concentración de 0.04 dará como resultado una prueba
                          positiva)
                          <br></br>
                          <ul>
                            <li>
                              Previa al empleo - administrada antes de la
                              realización de un piloto de seguridad funciones
                              sensibles para la primera vez que un empleador.
                            </li>
                            <li>
                              Después del accidente - administrado tan pronto
                              como sea posible, después de un accidente
                              participación de un vehículo comercial, si no es
                              una fatalidad, o si el conductor está citado por
                              una violación de tráfico que se mueve. (Es
                              necesario una prueba de alcohol en las 8 horas
                              siguientes al accidente, y sustancias controladas,
                              dentro de 32 horas).
                            </li>
                            <li>
                              Al azar - administrados si el nombre de un
                              conductor es seleccionado en un sorteo al azar,
                              llevan a cabo periódicamente durante todo el año.
                              Los conductores notificados de forma aleatoria
                              deben presentarse de inmediato para su análisis.
                            </li>
                            <li>
                              Sospecha razonable - administrados si el empleador
                              tiene razones o sospechas para creer que el
                              conductor se encuentre en violación de alguna de
                              las prohibiciones mencionadas anteriormente.
                            </li>
                            <li>
                              Volver al servicio - administrada antes de que un
                              conductor regrese al servicio, después de haber
                              salido "positivo" de sustancias controladas o
                              alcohol. También hay que administrar un retorno a
                              la prueba de servicio si un conductor está
                              inhabilitado por la prueba de azar.{" "}
                            </li>
                            <li>
                              Seguimiento - Si un conductor se ha negado a la
                              prueba o ha dado positivo, y desea se
                              re-calificado para realizar funciones sensibles
                              para la seguridad, él / ella debe ser aconsejado
                              por un profesional de abuso de sustancias (SAP),
                              siga lo recomendado por el programa, y luego de
                              producir un efecto negativo "Regreso al trabajo"
                              resultado de la prueba. El SAP se dirigirá a la
                              empresa para administrar un mínimo de los seis
                              "Seguimiento" pruebas en los próximos 12 meses.
                              Este número puede ser el aumento de la SAP. La
                              empresa seleccionará los tiempos para el
                              seguimiento pruebas.
                            </li>
                          </ul>
                          <br></br>
                          <strong>Procedimientos de prueba</strong>
                          <br></br>
                          Todas las pruebas se llevarán a cabo con los
                          procedimientos que se describen en el Código de
                          Regulaciones Federales, Parte 40. Estos procedimientos
                          están diseñados para proteger a los conductores y
                          mantener la integridad en el proceso de prueba así
                          como garantizar la validez de los resultados de las
                          pruebas.
                          <br></br>
                          <strong>
                            Consecuencias de la conducta prohibida
                          </strong>
                          <br></br>
                          Cualquier conductor que se involucra en una conducta
                          prohibida por la Parte 382 será inmediatamente
                          eliminado el desempeño de cualquier función de
                          seguridad sensible. Además, el conductor estará sujeto
                          a la terminación de su / empleo con{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          . Bajo la política actual de la compañía, el conductor
                          que dé positivo se le ofrecerá “por única vez” la
                          oportunidad para ser reintegrado. Para el
                          restablecimiento el conductor debe someterse a una
                          evaluación de las necesidades de tratamiento por un
                          abuso de sustancias y completar el tratamiento
                          recomendado. Además, el conductor tendrá que someterse
                          a otra prueba.
                          <br></br>
                          <strong>La Prueba Negativa</strong>
                          <br></br>
                          Si cualquier conductor se niega a realizarse la prueba
                          bajo las condiciones establecidas en la Parte 382, la
                          negativa será tratada como un resultado positivo, y
                          estará sujeto a las consecuencias de una positivo de
                          la prueba.
                          <br></br>
                          <strong>Informacion</strong>
                          <br></br>
                          Las siguientes páginas contienen información sobre los
                          síntomas y efectos del uso del alcohol y sustancias
                          controladas. Todos los empleados son avisados con este
                          documento y con los requisitos de la Federal Motor
                          Reglamento de Seguridad de Autotransportes, Partes 382
                          y Parte 40.
                          <br></br>
                          <strong>Alcohol y Sustancias Controladas</strong>
                          <br></br>
                          Los signos generales de abuso de sustancias y alcohol
                          controlados incluyen:
                          <ul>
                            <li>La tardanza o el ausentismo</li>
                            <li>
                              Pedir prestado dinero de los compañeros de trabajo
                            </li>
                            <li>Problemas con las relaciones</li>
                            <li>Aumento de la irritabilidad</li>
                            <li>Disminución del período de atención</li>
                            <li>Dificultad para recordar las instrucciones</li>
                            <li>Tomar la crítica personal</li>
                            <li>La negación de cualquier problema</li>
                            <li>Parafernalia presente</li>
                          </ul>
                          <br></br>
                          <strong>Tipos de parafernalia:</strong>
                          <ul>
                            <li>Los papeles de fumar</li>
                            <li>Las tuberías, pipas de agua</li>
                            <li>Hojas de afeitar, espejos pequeños</li>
                            <li>Cucharas pequeñas y pajitas</li>
                            <li>Polvo blanco</li>
                            <li>Las jeringas, agujas</li>
                            <li>Goteros</li>
                            <li>Goma tubería</li>
                          </ul>
                          <br></br>
                          <strong>
                            Utiliza los síntomas físicos y efectos
                          </strong>
                          <br></br>
                          Marihuana: Enrojecimiento de los ojos algunos de los
                          usos médicos de THC, Efecto de la cara pálida dura 4.2
                          horas; se queda en, Sistema durante varios días /
                          semanas; Olor fuerte, como la cuerda quema almacenan
                          en las células del tejido graso, Fuerte, bullicioso en
                          las primeras etapas ahumado o por vía oral,
                          Somnolencia, etapas de euforia, aumento del apetito;
                          comportamiento desorientado, inhibiciones relajado,
                          efecto negativo en la visión periférica, Una
                          sobredosis puede causar fatiga, paranoia, no es fatal.
                          <br></br>
                          <strong>
                            Utiliza los síntomas físicos y efectos
                          </strong>
                          <br></br>
                          Cocaína: Secreción nasal, problemas nasales Puede ser
                          utilizado como un anestésico local, Marcas de agujas
                          en los brazos muy adictivo, Mareos que duran entre 1-2
                          horas, Pupilas dilatadas olfateó, fumado o inyectado,
                          Sequedad en la boca y la nariz mayor estado de alerta,
                          euforia, excitación, aumento del pulso, y la presión
                          arterial, insomnio, pérdida del apetito, Mal aliento;
                          sobredosis labios lamiendo frecuentes pueden causar
                          agitación, alucinaciones; convulsiones, posible
                          muerte, La falta de interés en la comida y el sueño.
                          <br></br>
                          <strong>Los opiáceos</strong>
                          <br></br>
                          Somnolencia, letargo utiliza como analgésico,
                          medicamento para la tos, Dificultad en el habla
                          altamente adictivo (codeína es moderadamente
                          adictivo), Pupilas dilatadas por más de 3 horas,
                          Cicatrices aguja, Pérdida del apetito causa euforia,
                          somnolencia, náuseas, Náuseas, enrojecimiento de la
                          cara, la sobredosis puede causar respiración lenta y
                          superficial, piel fría y húmeda; convulsiones, posible
                          muerte.
                          <br></br>
                          <strong>PCP</strong>
                          <br></br>
                          Aumento del ritmo cardíaco / de la presión arterial.
                          Sofocos, sudoración, mareos, el efecto entumecimiento
                          dura varios días, Somnolencia, Pupilas dilatadas,
                          Rigidez muscular, alucinaciones, Los síntomas de una
                          sobredosis puede causar intoxicación más intensa, sin
                          olor, viajes de alcohol, la muerte es posible.
                          <br></br>
                          <strong>Alcohol y sustancias controladas</strong>
                          <br></br>
                          Síntomas físicos y sus efectos, Aumento de la
                          respiración y del corazón, descontrol de peso,
                          narcolepsia, trastorno por déficit de atención, La
                          presión arterial alta, fiebre alta, son síntomas de
                          muy adictos, Efecto de pupilas dilatadas por más de 2
                          horas, Disminución del apetito, sequedad de boca,
                          Sudoración, dolor de cabeza; visión borrosa, Mareos,
                          insomnio, pérdida del apetito; euforia excitación,
                          Incapaz de dormir, Una sobredosis puede causar
                          agitación, convulsiones, posible muerte.
                          <br></br>
                          <strong>Alcohol</strong>
                          <br></br>
                          Descuido limitado uso medicinal, jarabes para la tos
                          Dificultad para hablar adictivo; puede ser genética,
                          Dificultad para caminar, emocionalmente inestable,
                          Reacción violenta, demasiado hablador, Resaca (dolor
                          de cabeza), Olor a alcohol.
                        </div>
                      </div>
                    </Collapse>
                    {props.signatureDiv !== undefined ? props.signatureDiv(props.company.Id, props.props.Id) : ""}
                    <br></br>

                    {/* <img
                className="mob-img"
                style={{ padding: 10, border: "1px solid #ccc" }}
                src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.props.companyInfo.Id}/Drivers/${this.props.props.Id}/DriverSignature/signature.png`} 
                ref={(img) => (this.img = img)}
                onError={() => {
                  this.img.src = "assets/img/Images/NoSignature2.png";
                  this.img.style = "width:320px;height:180px;";
                }}
                /> */}
                  </div>
                ) : (
                  <div>
                    <div
                      className=" align-items-center cursor-menu"
                      onClick={() => setCollapse(!collapse)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        Application for Employment Authorization
                      </h4>
                    </div>
                    <Collapse isOpened={collapse}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          I authorize you to make sure investigations and
                          inquiries to my personal, employment, financial or
                          medical history and other related matters as may be
                          necessary in arriving at an employment decision.
                          (Generally, inquiries regarding medical history will
                          be made only if and after a conditional offer of
                          employment has been extended.) I hereby release
                          employers, schools, health care providers and other
                          persons from all liability in responding to inquiries
                          and releasing information in connection with my
                          application.
                        </div>
                      </div>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          In the event of employment, I understand that false or
                          misleading information given in my application or
                          interview(s) may result in discharge. I understand,
                          also, that I am required to abide by all rules and
                          regulations of the Company{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          . “I understand that information I provide regarding
                          current and/or previous employers may be used, and
                          those employer(s) will be contacted, for the purpose
                          of investigating my safety performance history as
                          required by 49 CFR 391.23(d) and (e). I understand
                          that I have the right to:
                        </div>
                      </div>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          • Review information provided by current/previous
                          employers;
                          <br></br>• Have errors in the information corrected by
                          previous employers and for those previous employers to
                          re-send the corrected information to the prospective
                          employer; and
                          <br></br>• Have a rebuttal statement attached to the
                          alleged erroneous information, if the previous
                          employer(s) and I cannot agree on the accuracy of the
                          information.”
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className=" align-items-center cursor-menu"
                      onClick={() => setCollapse2(!collapse2)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Pre-employment Urinalysis and Breath Analysis Consent Form
                      </h4>
                    </div>
                    <Collapse isOpened={collapse2}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          I understand that as required by the Federal Motor
                          Carrier Administration Regulations, Title 49 Code of
                          Federal Regulations, Section 382.301, all
                          driver-applicants of this employer must be tested for
                          controlled substances and alcohol as a pre-condition
                          for employment.
                          <br></br>I consent to the urine sample collection and
                          testing for controlled substances, and the breath
                          sample collection and testing for alcohol.
                          <br></br>I understand that a verified positive test
                          result for controlled substances and/or an alcohol
                          concentration of 0.04 or higher will render me
                          unqualified to operate a commercial motor vehicle.
                          <br></br>
                          The medical review officer will maintain the results
                          of my controlled substance test. Negative and positive
                          results will be reported to the employer. If the
                          results are positive, the controlled substance will be
                          identified.
                          <br></br>
                          Alcohol test results will be maintained by the
                          employer.
                          <br></br>
                          The results will not be released to any other parties
                          without my written authorization.
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className="align-items-center cursor-menu"
                      onClick={() => setCollapse3(!collapse3)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        PSP Disclosure Authorization
                      </h4>
                    </div>
                    <Collapse isOpened={collapse3}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          THE BELOW DISCLOSURE AND AUTHORIZATION LANGUAGE IS FOR
                          MANDATORY USE BY ALL ACCOUNT HOLDERS.
                          <br />
                          IMPORTANT DISCLOSURE REGARDING BACKGROUND REPORTS FROM
                          THE PSP Online Service.
                        </div>
                      </div>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          In connection with your application for employment
                          with{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          (“Prospective Employer”), Prospective Employer, its
                          employees, agents or contractors may obtain one or
                          more reports regarding your driving, and safety
                          inspection history from the Federal Motor Carrier
                          Safety Administration (FMCSA). <br />
                          <br />
                          When the application for employment is submitted in
                          person, if the Prospective Employer uses any
                          information it obtains from FMCSA in a decision to not
                          hire you or to make any other adverse employment
                          decision regarding you, the Prospective Employer will
                          provide you with a copy of the report upon which its
                          decision was based and a written summary of your
                          rights under the Fair Credit Reporting Act before
                          taking any final adverse action. If any final adverse
                          action is taken against you based upon your driving
                          history or safety report, the Prospective Employer
                          will notify you that the action has been taken and
                          that the action was based in part or in whole on this
                          report.
                          <br /> <br />
                          When the application for employment is submitted by
                          mail, telephone, computer, or other similar means, if
                          the Prospective Employer uses any information it
                          obtains from FMCSA in a decision to not hire you or to
                          make any other adverse employment decision regarding
                          you, the Prospective Employer must provide you within
                          three business days of taking adverse action oral,
                          written or electronic notification: that adverse
                          action has been taken based in whole or in part on
                          information obtained from FMCSA; the name, address,
                          and the toll free telephone number of FMCSA; that the
                          FMCSA did not make the decision to take the adverse
                          action and is unable to provide you the specific
                          reasons why the adverse action was taken; and that you
                          may, upon providing proper identification, request a
                          free copy of the report and may dispute with the FMCSA
                          the accuracy or completeness of any information or
                          report. If you request a copy of a driver record from
                          the Prospective Employer who procured the report,
                          then, within 3 business days of receiving your
                          request, together with proper identification, the
                          Prospective Employer must send or provide to you a
                          copy of your report and a summary of your rights under
                          the Fair Credit Reporting Act.
                          <br /> <br />
                          Neither the Prospective Employer nor the FMCSA
                          contractor supplying the crash and safety information
                          has the capability to correct any safety data that
                          appears to be incorrect. You may challenge the
                          accuracy of the data by submitting a request to
                          https://dataqs.fmcsa.dot.gov. If you challenge crash
                          or inspection information reported by a State, FMCSA
                          cannot change or correct this data. Your request will
                          be forwarded by the DataQs system to the appropriate
                          State for adjudication.
                          <br /> <br />
                          Any crash or inspection in which you were involved
                          will display on your PSP report. Since the PSP report
                          does not report, or assign, or imply fault, it will
                          include all Commercial Motor Vehicle (CMV) crashes
                          where you were a driver or co-driver and where those
                          crashes were reported to FMCSA, regardless of fault.
                          Similarly, all inspections, with or without
                          violations, appear on the PSP report. State citations
                          associated with Federal Motor Carrier Safety
                          Regulations (FMCSR) violations that have been
                          adjudicated by a court of law will also appear, and
                          remain, on a PSP report.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.textContent}>
                          The Prospective Employer cannot obtain background
                          reports from FMCSA without your authorization.
                          <hr />
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.textContent}>AUTHORIZATION</div>
                      </div>

                      <div style={style.section}>
                        <div style={style.textContent}>
                          If you agree that the Prospective Employer may obtain
                          such background reports, please read the following and
                          sign below:
                          <br /> <br />I authorize{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          (“Prospective Employer”) to access the FMCSA
                          Pre-Employment Screening Program (PSP) system to seek
                          information regarding my commercial driving safety
                          record and information regarding my safety inspection
                          history. I understand that I am authorizing the
                          release of safety performance information including
                          crash data from the previous five (5) years and
                          inspection history from the previous three (3) years.
                          I understand and acknowledge that this release of
                          information may assist the Prospective Employer to
                          make a determination regarding my suitability as an
                          employee. I further understand that neither the
                          Prospective Employer nor the FMCSA contractor
                          supplying the crash and safety information has the
                          capability to correct any safety data that appears to
                          be incorrect. I understand I may challenge the
                          accuracy of the data by submitting a request to
                          https://dataqs.fmcsa.dot.gov. If I challenge crash or
                          inspection information reported by a State, FMCSA
                          cannot change or correct this data. I understand my
                          request will be forwarded by the DataQs system to the
                          appropriate State for adjudication. I understand that
                          any crash or inspection in which I was involved will
                          display on my PSP report. Since the PSP report does
                          not report, or assign, or imply fault, I acknowledge
                          it will include all CMV crashes where I was a driver
                          or co-driver and where those crashes were reported to
                          FMCSA, regardless of fault. Similarly, I understand
                          all inspections, with or without violations, will
                          appear on my PSP report, and State citations
                          associated with FMCSR violations that have been
                          adjudicated by a court of law will also appear, and
                          remain, on my PSP report.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.textContent}>
                          I have read the above Disclosure Regarding Background
                          Reports provided to me by Prospective Employer and I
                          understand that if I sign this Disclosure and
                          Authorization, Prospective Employer may obtain a
                          report of my crash and inspection history. I hereby
                          authorize Prospective Employer and its employees,
                          authorized agents, and/or affiliates to obtain the
                          information authorized above.
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className="align-items-center cursor-menu"
                      onClick={() => setCollapse4(!collapse4)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Employer Pull Notice Program Authorization for Release
                        of Driver Record Information
                      </h4>
                    </div>
                    <Collapse isOpened={collapse4}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          I,{" "}
                          <strong style={style.textDriverName}>
                            {props.props.Name + " " + props.props.LastName}
                          </strong>{" "}
                          , California Driver License,{" "}
                          <strong style={style.textDriverName}>
                            {props.props.License}
                          </strong>{" "}
                          , hereby authorize the Department of Motor
                          Vehicles(DMV) to disclose or other make available, my
                          driving record, to my employer,{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          .
                          <br />
                          <br />
                          I Understand that my employer may enroll me in the
                          Employer Pull Notice(EPN) program to receive a driver
                          record report at least once every 12 months or when
                          any subsequent, failure to appear, accident, driver's
                          license suspension, revocation or any other action is
                          taken against my driving privilege during employment.
                          <br />
                          <br />I am not driving in a capacity that requires
                          mandatory enrollment in the EPN program pursuant to
                          California Vehicle Code(CVC) Section 1808.1(k). I
                          understand that enrollment in the EPN program is an
                          effort to promote driver safety, and that my driver
                          license report will be released to my employer to
                          determine my eligibility as a licensed driver for my
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className=" align-items-center cursor-menu"
                      onClick={() => setCollapse5(!collapse5)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Authorization to Obtain Motor Vehicle Record
                      </h4>
                    </div>
                    <Collapse isOpened={collapse5}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          THE UNDERSIGNED DOES HEREBY ACKNOWLEDGE AND CERTIFY AS
                          FOLLOWS:
                          <br></br>
                          1. Certifies that the undersigned is an employee, or
                          has applied to become an employee of the below named
                          employer in a position which involves the operation of
                          a motor vehicle and the undersigned gives his or her
                          consent to the release of their driving record (MVR)
                          for review by:{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          .<br></br>
                          2. That the undersigned authorizes his or her driving
                          record to be periodically obtained and reviewed for
                          the purpose of initial and continued employment.
                          <br></br>
                          3. That all information presented in this form is true
                          and correct. The undersigned makes this certification
                          and affirmation under penalty of perjury and
                          understands that knowingly making a false statement or
                          representation on this form is a criminal violation.
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className="align-items-center cursor-menu"
                      onClick={() => setCollapse6(!collapse6)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Clearing House Annual Query
                      </h4>
                    </div>
                    <Collapse isOpened={collapse6}>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          General Consent for Limited Queries of the Federal
                          Motor Carrier Safety Administration (FMCSA) Drug and
                          Alcohol Clearinghouse.
                        </div>
                      </div>
                      <div style={style.section}>
                        <div style={style.textContent}>
                          I,{" "}
                          <strong style={style.textDriverName}>
                            {props.props.Name + " " + props.props.LastName}
                          </strong>
                          , hereby provide consent to conduct a multiple limited
                          queries for the duration of employment of the FMCSA
                          commercial Driver's License Drug and Alcohol
                          ClearingHouse to determine wheter drug or alcohol
                          violation information about me in the ClearingHouse. I
                          understand that if the limited query conducted by{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          indicates that drug or alcohol violation information
                          about me exists in the ClearingHouse, FMCSA will not
                          disclose that information to{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          without first obtaining additional specific consent
                          from me. I further understand that if I refuse to
                          provide consent for{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          to conduct a limited query of the ClearingHouse,{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          must prohibit me from performing safety-sensitive
                          functions, including driving a commercial motor
                          vehicle, as required by FMCSA's drug and alcohol
                          program regulations.
                        </div>
                      </div>
                    </Collapse>
                    <br></br>

                    <div
                      className="align-items-center cursor-menu"
                      onClick={() => setCollapse7(!collapse7)}
                    >
                      <h4 style={style.titleAgreement} className="mb-0 mr-1">
                        {" "}
                        Pre-Employment Drug Testing Policy
                      </h4>
                    </div>
                    <Collapse isOpened={collapse7}>
                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>PURPOSE:</strong>
                        </div>
                        <div style={style.textContent}>
                          The purposes of this policy are to provide a safe and
                          productive working environment, to prevent accidents,
                          injuries and property damage which may result from
                          drug abuse, and to protect vulnerable clients who are
                          dependent on public services.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>SCOPE:</strong>
                        </div>
                        <div style={style.textContent}>
                          This policy covers applicants for all positions which
                          have met the standards identified in Appendix A,
                          including applicants for temporary and seasonal
                          positions, part-time working less than half time,
                          limited term, and non-represented employees on
                          employment agreements. The master list of the actual
                          positions which are eligible for pre-employment drug
                          testing will be kept in the Department of Employee
                          Services. This policy does not apply to current
                          employees who are internal applicants for open
                          positions.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>POLICY STATEMENT: </strong>
                        </div>
                        <div style={style.textContent}>
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          is committed to a workplace which is free from the
                          effects of unauthorized drug use. Unauthorized drug
                          use may pose serious risks to the user and his or her
                          colleagues, as well as to the public we serve.
                          Therefore,
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          has chosen to conduct pre-employment screening to
                          prevent the hiring of individuals whose unauthorized
                          use of drugs creates a potential for impaired or
                          unsafe job performance.
                          <br></br>
                          Applicants for jobs which meet the standards
                          identified in Appendix A will undergo screening for
                          the presence of illegal drugs as a condition for
                          employment. Applicants will be required to submit to a
                          urinalysis test at a laboratory of{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          .<br></br>
                          <br></br>
                          <strong>TABLE OF CONTENTS</strong>
                          <ul>
                            <li>Pre-employment Testing</li>
                            <li>Medical Marijuana</li>
                            <li>Costs of Testing</li>
                            <li>Drug Testing Procedures</li>
                            <li>Drug Test Results Review</li>
                            <li>Medical Review Officer Reporting Options</li>
                            <li>
                              MRO Verification without Notifying the Employee
                            </li>
                            <li>Communication of Results </li>
                            <li>Record Keeping Procedures</li>
                            <li>Definition of Terms</li>
                            <li>Appendix A</li>
                          </ul>
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Pre-employment Testing</strong>
                        </div>
                        <div style={style.textContent}>
                          Pre-employment drug testing is required for all
                          positions which meet the standards listed in Appendix
                          A. Applicants will be notified that drug testing is a
                          requirement of the selection process. A drug test
                          result which is verified as positive for unauthorized
                          use of controlled substances, or found to be
                          substituted or adulterated, will disqualify the
                          applicant for the offered position. A negative dilute
                          result is unsatisfactory on a pre-employment test.
                          Applicants will be given one additional opportunity to
                          provide a valid specimen. The result of the second
                          test will determine whether the applicant is eligible
                          for employment.
                          <br></br>A person who receives any of the following
                          results on the drug test is not eligible to be hired,
                          and is disqualified from consideration from
                          "CompanyName" for a period of twenty-four (24) months
                          from the date of the test result:
                          <br></br>
                          <ul>
                            <li>verified “positive”,</li>
                            <li>second "negative dilute",</li>
                            <li>
                              second sample outside the allowed temperature
                              range,
                            </li>
                            <li>
                              “cancelled—invalid result” where the donor’s
                              explanation is not accepted by the MRO,
                            </li>
                            <li>verified “adulterated”,</li>
                            <li>verified “substituted”.</li>
                          </ul>
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Medical Marijuana</strong>
                        </div>
                        <div style={style.textContent}>
                          Marijuana is a Class I controlled substance; its use
                          is illegal under federal law. Although California law
                          (§ 11362.5(b) (1) (A) and (d) (1996)) exempts from
                          criminal prosecution in state court those individuals
                          who obtain a “registry identification card” from the
                          California Department of Human Services, based on a
                          statement from their attending physician that the
                          individual has a “debilitating medical condition”,
                          this is not an acceptable explanation for a positive
                          drug test under this Policy.
                          <br></br>
                          The Medical Review Officer (MRO) will automatically
                          verify such tests as positive.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Costs of Testing</strong>
                        </div>
                        <div style={style.textContent}>
                          "CompanyName" will pay for all pre-employment drug
                          tests.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Drug Testing Procedures</strong>
                        </div>
                        <div style={style.textContent}>
                          Urine specimen collection for drug testing will be
                          performed by qualified individuals in conformance with
                          current standards of practice, using chain of custody
                          procedures as described by United States Department of
                          Transportation (DOT) regulations (49 CFR Part 40) and
                          with respect for the privacy and dignity of the person
                          giving the specimen.
                          <br></br>
                          Drug test specimens will be collected to provide at
                          least 45 ml of urine. If an applicant is unable to
                          provide an adequate volume of urine on the first
                          attempt (“shy bladder”), he/she will have an
                          opportunity to drink up to 40 ounces of fluids within
                          three hours. At the end of this period, if a sample of
                          adequate volume has not been provided, the test will
                          be cancelled. A retest will be allowed if the
                          applicant provides a medical evaluation from a
                          licensed physician, acceptable to the{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          who has expertise in the medical issues raised by the
                          applicant's failure to provide a sufficient specimen.
                          <br></br>
                          The collector will check the temperature of the
                          specimen upon receiving it from the applicant. The
                          acceptable temperature range is 90 - 100 degrees
                          Fahrenheit. If the specimen is outside the acceptable
                          range, the applicant will begin a second unobserved
                          collection. If the second specimen is also outside the
                          acceptable range, the applicant will be disqualified.
                          If within range, the second specimen will be tested at
                          the lab. Only laboratories certified by the Substance
                          Abuse and Mental Health Services Administration
                          (SAMHSA) of the U.S. Department of Health and Human
                          Services will perform drug testing.
                          <br></br>
                          When an initial screening test for drugs is positive,
                          a second, confirmatory test will automatically be
                          performed. Confirmed positive drug tests will be
                          reported by the testing laboratory to the MRO for
                          verification (see “Drug Test Results Review”).
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Drug Test Results Review.</strong>
                        </div>
                        <div style={style.textContent}>
                          Drug test results of an applicant which are reported
                          as positive, adulterated, or Substituted by the
                          testing laboratory will be reviewed and verified by
                          the Medical Review Officer (MRO). A POSITIVE drug test
                          result is defined as the detection of any one or more
                          of the Substances listed in the table shown below.
                          <br></br>
                          <br></br>
                          <table class="table">
                            <thead class="thead-dark">
                              <tr>
                                <th scope="col">Substance or Class</th>
                                <th scope="col">Initial Screening: Cut-Off</th>
                                <th scope="col">Confirmation: Cut-Off</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>Amphetamines</th>
                                <td>1000 ng/Ml</td>
                                <td>500 ng/mL</td>
                              </tr>
                              <tr>
                                <th>Cocaine</th>
                                <td>300 ng/mL</td>
                                <td>150 ng/mL</td>
                              </tr>
                              <tr>
                                <th>Marijuana (THC)</th>
                                <td>50 ng/mL</td>
                                <td>15 ng/mL</td>
                              </tr>
                              <tr>
                                <th>Opiates</th>
                                <td>2000 ng/mL</td>
                                <td>2000/10ng/mL</td>
                              </tr>
                              <tr>
                                <th>Phencyclidine (PCP)</th>
                                <td>25 ng/Ml</td>
                                <td>25 ng/Ml</td>
                              </tr>
                            </tbody>
                          </table>
                          <br></br>A confirmed positive test from a certified
                          laboratory does not automatically identify an employee
                          or applicant as being in violation of this policy. The
                          MRO brings detailed knowledge of possible alternate
                          medical explanations to his/her review of the test
                          results. This review is performed by the MRO prior to
                          the transmission of results to{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>
                            Medical Review Officer Reporting Options:
                          </strong>
                        </div>
                        <div style={style.textContent}>
                          <ul>
                            <li>“Negative” - self explanatory</li>
                            <li>
                              “Negative Dilute” - Upon receipt of a “negative
                              dilute,” the applicant shall be required to
                              provide another specimen as soon as possible.
                            </li>
                            <li>
                              “Canceled - Test Not Performed, Fatal Flaw (with
                              flaw stated) or Uncorrected Flaw.” A canceled drug
                              test is neither positive nor negative and no
                              consequences are attached to it. The applicant
                              will be given the opportunity to take a second
                              test.
                            </li>
                            <li>
                              “Cancelled - Invalid Result.” An “invalid result”
                              means the laboratory was unable to obtain a valid
                              result when attempting to test the specimen. If
                              the MRO has accepted the donor's explanation as to
                              why the laboratory was unable to obtain a valid
                              result, then the MRO will notify the County and a
                              retest will be allowed. If the MRO has not
                              accepted the donor's explanation, the MRO will
                              notify{" "}
                              <strong style={style.textDriverName}>
                                {props.company.LegalName}
                              </strong>{" "}
                              and the applicant will be disqualified.{" "}
                            </li>
                            <li>
                              “Positive or Positive Dilute” - Applicant is
                              disqualified.
                            </li>
                            <li>“Adulterated” - Applicant is disqualified.</li>
                            <li>
                              “Substituted” - Applicant is disqualified. MRO
                              Verification without Notifying the Employee
                            </li>
                          </ul>
                          MRO Verification without Notifying the Employee the
                          MRO is permitted to verify a test as positive, or as a
                          refusal to test because of a laboratory report of a
                          positive adulterated, or substituted specimen without
                          interviewing the applicant under the following
                          circumstances:
                          <ul>
                            <li>
                              The applicant expressly declines the opportunity
                              to discuss the test with the MRO;
                            </li>
                          </ul>
                          <br></br>
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          has successfully made and documented a contact with
                          the applicant, and has asked the applicant to contact
                          the MRO, and more than 72 hours have passed since{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          contacted the applicant.
                          <br></br>
                          <strong>NOTE:</strong> If a test is verified positive
                          under the latter circumstances, the donor may give the
                          MRO information documenting that serious illness,
                          injury, or other circumstances unavoidably prevented
                          him/her from contacting the MRO. On the basis of this
                          information, the MRO may re-open the verification,
                          allowing the donor to present information concerning a
                          legitimate explanation for the positive test. If the
                          MRO concludes that there is a legitimate explanation,
                          the MRO shall verify the test as negative.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Communication of Results</strong>
                        </div>
                        <div style={style.textContent}>
                          The MRO or his/her designated representative will
                          report test results ONLY to the Designated Employer
                          Representative (DER). Confidentiality will be strictly
                          maintained. If the result is positive, the MRO or
                          his/her authorized representative will report the
                          identity of the controlled substance.
                          <br></br>
                          Applicants may obtain copies of their test results by
                          requesting them in writing from the MRO within 60 days
                          of being notified of the results.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Record Keeping Procedures</strong>
                        </div>
                        <div style={style.textContent}>
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          DER will maintain pre-employment drug testing records
                          in a secure filing system with information available
                          only on a “need to know” basis for a period of two
                          years.
                          <br></br>
                          <br></br>
                          <strong>Definition of Terms</strong>
                          <br></br>
                          <strong>Adulterated Specimen:</strong> A specimen that
                          contains a substance that is not expected to be
                          present in human urine, or contains a substance
                          expected to be present but is at a concentration so
                          high that it is not consistent with human urine.
                          <br></br>
                          <strong>CFR:</strong> United States Code of Federal
                          Regulations.
                          <br></br>
                          <strong>Cadena de custodia:</strong> Procedures to
                          account for the integrity of each urine specimen by
                          tracking its handling and storage from point of
                          specimen collection to final disposition of the
                          specimen. These procedures shall require that an
                          appropriate drug testing custody form from a
                          Department of Health and Human Services (DHHS),
                          Substance Abuse and Mental Health Services
                          Administration (SAMHSA) certified laboratory be used
                          from time of collection to receipt by the laboratory.
                          <br></br>
                          <strong>Collection Site: </strong> A designated
                          clinic/facility where applicants or employees may
                          present themselves for the purpose of providing a
                          specimen of their urine to be analyzed for the
                          presence of drugs.
                          <br></br>
                          <strong>Collector:</strong> A person who instructs and
                          assists applicants and employees through the urine
                          specimen collection process.
                          <br></br>
                          <strong>Confirmation Test:</strong> A second
                          analytical drug testing procedure to identify the
                          presence of a specific drug or metabolite which is
                          independent of the initial test and which uses a
                          different technique and chemical principle from that
                          of the initial test in order to ensure reliability and
                          accuracy. Gas chromatography/mass spectrometry (GC-MS)
                          is the only authorized confirmation method for DOT
                          mandated drug testing.
                          <br></br>
                          <strong>Controlled Substances: </strong> Substances
                          listed on Schedules I through V in 21 U.S.C. 802 as
                          they may be revised from time to time (21 CFR 1308).
                          Controlled substances include illicit drugs and drugs
                          which may be authorized for use by a physician or
                          dentist for certain medical uses, but which are
                          subject to misuse or abuse.
                          <br></br>
                          <strong>"COMPANYNAME":</strong> Employer
                          <br></br>
                          <strong>
                            Designated Employer Representative (DER):
                          </strong>
                          An employee authorized by the employer to manage and
                          make decisions in the testing and evaluation
                          processes. The DER also receives test results and
                          other communications for the employer and communicates
                          test results to individual departments.
                          <br></br>
                          <strong>Dilute Specimen: </strong> A specimen with
                          creatinine and specific gravity values that are lower
                          than expected for human urine.
                          <br></br>
                          <strong>DOT:</strong> United States Department of
                          Transportation.
                          <br></br>
                          <strong>FHWA:</strong> Federal Highway Administration.
                          <br></br>
                          <strong>FMCSA:</strong> Federal Motor Carrier Safety
                          Administration.
                          <br></br>
                          <strong>Initial or Screening Test:</strong> An
                          immunoassay screen to eliminate “negative” urine
                          specimens from further consideration.
                          <br></br>
                          <strong>Medical Review Officer (MRO): </strong> A
                          licensed doctor of medicine or osteopathy with
                          knowledge of drug abuse disorders and drug testing who
                          is responsible for reviewing and verifying drug
                          testing results prior to their communication to the
                          Designated Employer Representative.
                          <br></br>
                          <strong>Negative Drug Test: </strong> A test in which
                          initial or confirmation testing did not show evidence
                          of a prohibited drug in an applicant's system above
                          established levels; OR, a test which is verified as
                          negative by the MRO (e.g. review showed positive test
                          was due to prescription medication or other authorized
                          use of controlled substance).
                          <br></br>
                          <strong>Positive Drug Test: </strong> A urine drug
                          test result which indicates the presence of controlled
                          Substances beyond the cut-off levels.
                          <br></br>
                          <strong>Confirmed Positive Drug Test: </strong> A
                          positive drug test which has undergone an initial
                          “screening” test AND a confirmation test which
                          validates the first result. Drug tests are confirmed
                          by the SAMHSA certified laboratory which performs the
                          analyses.
                          <br></br>
                          <strong>Verified Positive Drug Test: </strong> A
                          confirmed positive drug test (see above) after
                          investigation by the MRO, who has determined that no
                          legitimate explanation exists for the presence of the
                          controlled substance that was detected.
                          <br></br>
                          <strong>Prohibited Drugs: </strong> Marijuana,
                          cocaine, opiates, phencyclidine (PCP), and
                          amphetamines.
                          <br></br>
                          <strong>Refusal to Submit: </strong> Refusal by an
                          individual to provide a urine specimen.
                          <br></br>
                          <strong>SAMHSA:</strong> Substance Abuse and Mental
                          Health Services Administration, a division of the US
                          Department of Health and Human Services (DHHS) which
                          is responsible for certifying laboratories to perform
                          federal workplace drug testing.
                          <br></br>
                          <strong>Screening or Initial Test: </strong>{" "}
                          Immunoassay screen to eliminate “negative” urine
                          specimens from further consideration.
                          <br></br>
                          <strong>Substituted Specimen: </strong> A specimen
                          with creatinine and specific gravity values that are
                          so diminished that they are not consistent with human
                          urine.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Appendix A:</strong>
                        </div>
                        <div style={style.textContent}>
                          The following standards are applied in evaluating
                          whether a job title and/or classification can be
                          approved for pre-employment, post-offer drug testing.
                          Additions or deletions to the list of job titles
                          and/or classifications eligible for pre-employment
                          drug testing can be made by request from the affected
                          Department Supervisor or designee to the Supervisor of
                          Employee Services. To be included on the list, the
                          applicant's typical daily activities must include
                          duties such as:
                          <br></br>
                          Employees covered by United States Department of
                          Transportation. Regulations, 49 Code of Federal
                          Regulations (CFR) Part 40 and Part 382. I have read in
                          full and understand the above statements and
                          conditions of employment Applicants Signature Date
                          Driver's License information: CDL Number State.
                          <br></br>
                          Drug and Alcohol Policy & Information
                          <br></br>
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          is committed to providing a safe workplace for its
                          employees, and the company is also committed to
                          placing safe, professional drivers in its vehicles. We
                          intend our workplace to be drug free, and that
                          employees will be free from the effects of alcohol
                          while on duty. A critical part of the company's
                          program is compliance with the Federal Motor Carrier
                          Safety Regulations, CFR 49, Part 382. The following
                          information is provided in accordance with Part
                          382.601:
                          <br></br>
                          The following information is provided in accordance
                          with Part 382.601: Designated Employer Contact "DER
                          Company Contact Owner" is the company's designated
                          person for providing information on the controlled
                          substances program. Questions should be directed to
                          him at "Company Phone #"
                          <br></br>
                          Categories Subject to Testing: All vehicle drivers who
                          hold a Commercial Driver License, who work part time
                          or full time for{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          are subject to the controlled substance testing
                          provisions in Part 382.
                        </div>
                      </div>

                      <div style={style.section}>
                        <div style={style.section}>
                          <strong>Safety Sensitive Functions</strong>
                        </div>
                        <div style={style.textContent}>
                          All drivers are considered to be performing safety
                          sensitive functions during any period in which they
                          are actually performing, ready to perform, or
                          immediately available to perform as a driver of a
                          commercial motor vehicle.
                          <br></br>
                          These functions are further defined as:
                          <ul>
                            <li>
                              Time at a terminal, facility or other property
                              waiting to be dispatched.
                            </li>
                            <li>
                              Time inspecting equipment as required, or
                              servicing/conditioning a motor vehicle.
                            </li>
                            <li>Driving</li>
                            <li>Time spent in or on any commercial vehicle.</li>
                            <li>
                              Time spent loading or unloading a vehicle or
                              remaining in readiness to operate a vehicle.
                            </li>
                            <li>
                              Time spent supervising or assisting loading or
                              unloading a vehicle.
                            </li>
                            <li>
                              Time spent attending a vehicle being unloaded.
                            </li>
                            <li>
                              Time spent performing driver requirements relating
                              to accidents.
                            </li>
                            <li>
                              Time spent repairing, obtaining assistance or
                              remaining in attendance upon a disabled Vehicle.
                            </li>
                            <li>
                              Time spent providing a breath or urine sample in
                              compliance with the requirements of Part 382.
                            </li>
                          </ul>
                          <br></br>
                          Prohibited Conduct
                          <br></br>
                          Specifically, all drivers who are performing safety
                          sensitive functions must comply with the following:
                          <br></br>
                          <ul>
                            <li>
                              No driver shall report for duty or remain on duty
                              while having an alcohol concentration of 0.02 or
                              greater.
                            </li>
                            <li>
                              No driver shall possess alcohol, unless the
                              alcohol is manifested and transported as part of a
                              shipment.
                            </li>
                            <li>
                              No driver shall use alcohol while performing
                              safety sensitive functions.
                            </li>
                            <li>
                              No driver shall perform safety sensitive functions
                              within four hours of using alcohol.
                            </li>
                            <li>
                              No driver required to take a post-accident alcohol
                              test shall use alcohol for eight hours following
                              the accident, or until he or she undergoes a
                              post-accident alcohol test, whichever occurs
                              first.
                            </li>
                            <li>
                              No driver shall refuse to submit to a
                              post-accident; random; reasonable suspicion; or
                              follow-up, alcohol or controlled substances test.
                            </li>
                            <li>
                              No driver shall report for duty or remain on duty
                              when the driver uses any controlled substance. An
                              exception is when the use of the controlled
                              substance is pursuant to the instructions of a
                              physician who has advised the driver that the
                              substance does not adversely affect the driver's
                              ability to safely operate a commercial motor
                              vehicle. (The employer may require a driver to
                              inform the employer of any therapeutic drug use.)
                              <strong>Note:</strong> the use of another
                              individual's prescription medicine may be
                              considered prohibited controlled substance use.
                            </li>
                            <li>
                              No driver shall report for duty, remain on duty,
                              or perform a safety sensitive function, if the
                              driver tests positive for controlled substances.
                            </li>
                          </ul>
                          <br></br>
                          <strong>Types of Testing</strong>
                          <br></br>
                          The following alcohol and controlled substance tests
                          will be performed. In order for the driver to be
                          allowed to perform safety sensitive functions, a
                          negative result for controlled substances and an
                          alcohol concentration of less than 0.02 will be
                          necessary. (A concentration between 0.02 and 0.039
                          will result in a 24 hour disqualification). A
                          concentration of 0.04 will result in a positive test.
                          <br></br>
                          <ul>
                            <li>
                              Pre-employment - administered prior to a driver
                              performing safety sensitive functions for the
                              first time for an employer. (controlled substances
                              testing only).
                            </li>
                            <li>
                              Post-accident - administered as soon as
                              practicable, following an accident involving a
                              commercial motor vehicle, if there is a fatality,
                              or if the driver is cited for a moving traffic
                              violation. (we must test for alcohol within 8
                              hours of the accident, and controlled substances
                              within 32 hours).
                            </li>
                            <li>
                              Random - administered if a driver's name is
                              selected in a random drawing, conducted
                              periodically throughout the year. Drivers notified
                              of a random selection must submit immediately for
                              testing.
                            </li>
                            <li>
                              Reasonable suspicion - administered if the
                              employer has reasonable suspicion to believe the
                              driver is in violation of any of the prohibitions
                              listed above.
                            </li>
                            <li>
                              Return to duty - Administered prior to a driver
                              returning to duty, following a “positive”
                              controlled substances or alcohol test. We must
                              also administer a return to duty test if a driver
                              is disqualified from the random pool for any
                              reason, and then re-enters the random pool.
                            </li>
                            <li>
                              Follow-up - If a driver has refused to test or
                              tested positive, and wishes to be re-qualified to
                              perform safety sensitive functions, he/she must be
                              counseled by a Substance Abuse Professional (SAP),
                              follow the recommended program, and then produce a
                              negative “Return to Duty” test result. The SAP
                              will then direct the company to administer a
                              minimum of six “Follow-up” tests in the next 12
                              months. This number may be increased by the SAP.
                              The company will select the times for the
                              follow-up tests.
                            </li>
                          </ul>
                          <br></br>
                          <strong>Testing Procedures</strong>
                          <br></br>
                          All testing will be performed with procedures that are
                          outlined in the Code of Federal Regulations, Part 40.
                          These procedures are designed to protect the driver,
                          maintain integrity in the testing process and
                          safeguard the validity of the test results.
                          <br></br>
                          <strong>Consequences of Prohibited Conduct</strong>
                          <br></br>
                          Any driver who engages in conduct prohibited by Part
                          382 will be immediately removed from performing any
                          safety sensitive function. In addition, the driver
                          will be subject to termination from his/her employment
                          with{" "}
                          <strong style={style.textDriverName}>
                            {props.company.LegalName}
                          </strong>{" "}
                          . Under the company's current policy, the driver who
                          tests positive will be offered a “once per lifetime”
                          last chance to be reinstated. The reinstatement will
                          be subject to the driver submitting to a treatment
                          needs assessment by an authorized Substance Abuse
                          Professional, and following and completing the
                          recommended treatment. In addition, the driver will be
                          required to submit to a Return to Duty controlled
                          substance and/or alcohol test.
                          <br></br>
                          <strong>Refusal to Test</strong>
                          <br></br>
                          If any driver refuses to test under the conditions
                          outlined in Part 382, the refusal will be treated as a
                          positive result, and will be subject to consequences
                          of a positive test.
                          <br></br>
                          <strong>Information</strong>
                          <br></br>
                          The following pages contain information regarding the
                          symptoms and effects of the use of alcohol and
                          controlled substances. All employees are encouraged to
                          be familiar with this document and with the
                          requirements of the Federal Motor Carrier Safety
                          Regulations, Parts 382 and Part 40.
                          <br></br>
                          <strong>Alcohol and Controlled Substances</strong>
                          <br></br>
                          General Signs of Abuse of alcohol and controlled
                          substances include:
                          <ul>
                            <li>Tardiness or absenteeism</li>
                            <li>Borrowing money from co-workers</li>
                            <li>Problems with relationships</li>
                            <li>Increased irritability</li>
                            <li>Decreased attention span</li>
                            <li>Difficulty remembering instructions</li>
                            <li>Taking criticism personally</li>
                            <li>Denial of any problem</li>
                            <li>Paraphernalia present</li>
                          </ul>
                          <br></br>
                          <strong>Types of paraphernalia:</strong>
                          <ul>
                            <li>Roach clips</li>
                            <li>Cigarette papers</li>
                            <li>Pipes, bongss</li>
                            <li>Razor blades, small mirrors</li>
                            <li>Small spoons and straws</li>
                            <li>White powder</li>
                            <li>Syringes; needles</li>
                            <li>Eye droppers</li>
                            <li>Rubber tubing</li>
                          </ul>
                          <br></br>
                          <strong>Physical Symptoms Uses and Effects</strong>
                          <br></br>
                          Marijuana Red eyes some medical uses for THC, Pale
                          face Effect lasts 2-4 hours; stays in, System for
                          several days/weeks; Strong odor, like burning rope
                          stored in fat tissue cells, Loud, boisterous in early
                          stages Smoked or taken orally, Sleepy, stuporous in
                          later stages causes euphoria; increased appetite;
                          disoriented behavior; relaxed inhibitions; negative
                          effect on peripheral vision, Overdose can cause
                          fatigue; paranoia; not fatal.
                          <br></br>
                          <strong>Physical Symptoms Uses and Effects</strong>
                          <br></br>
                          Cocaine Runny nose; nasal problems May be used as a
                          local anesthetic, Needle marks on arms highly
                          addictive, Dizziness Effect lasts 1-2 hours, Dilated
                          pupils Sniffed, smoked or injected, Dry mouth and nose
                          increased alertness; euphoria; excitation; increased
                          pulse and blood pressure; insomnia; loss of appetite,
                          Bad breath; frequent lip licking Overdose can cause
                          agitation; hallucination; convulsions; possible death
                          Lack of interest in food and sleep.
                          <br></br>
                          <strong>Opiates</strong>
                          <br></br>
                          Drowsiness; lethargy Used as pain killer; cough
                          medicine, Slurred speech highly addictive (codeine is
                          moderately addictive), Constricted pupils Effect lasts
                          3-6 hours, Needle scars Sniffed, injected, smoked,
                          taken orally, Loss of appetite Causes euphoria;
                          drowsiness; nausea, Nausea; flushed face Overdose can
                          cause slow, shallow breathing; clammy skin;
                          convulsions; possible death.
                          <br></br>
                          <strong>PCP</strong>
                          <br></br>
                          Increased heart rate/blood pressure No medical uses,
                          Flushing, sweating, dizziness, highly addictive;
                          effect lasts several numbness, drowsiness days, Pupils
                          dilated Smoked, injected, taken orally, Rigid muscles,
                          deadened actions Causes illusions; hallucinations,
                          Symptoms of intoxication Overdose may cause more
                          intense without smell of alcohol trips; possible
                          death.
                          <br></br>
                          <strong>
                            Physical Symptoms Uses and Effects Amphetamines.
                          </strong>
                          <br></br>
                          Increased heart and breathing Used for weight control;
                          to treat rates narcolepsy; attention deficit disorder.
                          High blood pressure; high fever highly addictive,
                          Dilated pupils Effect lasts 2-4 hours, Decreased
                          appetite; dry mouth Injected or taken orally,
                          Sweating; headache; blurred Increased alertness,
                          pulse, and blood vision; dizziness pressure; insomnia;
                          loss of appetite; euphoria; excitation, Unable to
                          sleep Overdose may cause agitation; convulsions;
                          possible death.
                          <br></br>
                          <strong>Alcohol</strong>
                          <br></br>
                          Sloppiness Limited medicinal use; over the counter
                          sleep aids; cough syrups, Slurred speech Addictive;
                          may be genetic, Trouble walking Moody, emotionally
                          unstable, Has the “shakes” Accident-prone, Blackouts
                          Withdrawn; may be violent; overly talkative, Hangover
                          (headaches), Smell of alcohol.
                        </div>
                      </div>
                    </Collapse>
                    {props.signatureDiv !== undefined ? props.signatureDiv(props.company.Id, props.props.Id) : ""}
                  </div>
                )}
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
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DriverAgreement;
