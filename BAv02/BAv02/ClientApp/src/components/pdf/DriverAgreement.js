import React from 'react'
import {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
    Link,
  } from "@react-pdf/renderer";

import logo from "../../assets/img/brand/Tabla Pre-employment.JPG";

const DriverAgreement = (props) => {
  let formattedDate = "";
  if (props.driver.HiringDate !== undefined) {
    formattedDate = props.driver.HiringDate.substr(0, 10);
  }

  const signatureAgreement = (props) => (
    <Text style={style.textContent}>
      <Text style={style.textContent}>
        Driver name: 
        {props.driver.Name} {props.driver.LastName}
      </Text>
      <Text style={style.textContent}>
        Driver License #:
        {props.driver.License}
      </Text>
      {
      //   <Image
      //     src="https://www.somosxbox.com/wp-content/uploads/2015/02/new-xbox-logo.jpg"
      //     style={{width:'50px', height: '50px'}}
      //     // ref={(img) => (img = img)}
      //     // onError={() => {
      //     //   img.src = "assets/img/Images/NoSignature2.png";
      //     //   img.style = "width:320px;height:180px;";
      //     // }}
      //   />
      }
      <Text style={style.textContent}>
        Date of signature:
        {formattedDate}
      </Text>
    </Text>
  );

    const style = StyleSheet.create({
        page: {
          padding: 50,
          backgroundColor: "white",
          flexDirection: "column",
        },
        section: {
          width: "100%",
          flexGrow: 1,
        },
        titleAgreement: {
          fontSize: 12,
          color: "white",
          backgroundColor: "#00519D",
          padding: "5px",
          marginTop: 25,
        },
        textContent: {
          fontSize: 8,
          textAlign: "justify",
          marginTop: 15,
        },
        titleTop: {
          fontSize: 14,
          fontWeight: "bolder",
          textAlign: "center",
          textTransform: "uppercase",
        },
        textDriverName: {
          fontSize: 8,
          fontStyle: "italic",
        },
        jump: {
          marginTop: 15,
        },
        textContentsmall: {
          fontSize: 8,
          textAlign: "justify",
          marginTop: 7,
        },
        list: {
          fontSize: 8,
          textAlign: "justify",
          marginTop: 6,
          paddingLeft: 10,
        },
      });

        return (
          <Document>
            <Page size="A4" style={style.page}>
              <View style={style.section}>
                <Text style={style.titleTop}>
                  <strong>TO BE READ AND SIGNED</strong>
                </Text>
                <Text style={style.titleAgreement}>
                  Application for Employment
                </Text>
                <Text style={style.textContent}>
                  I authorize you to make sure investigations and inquiries to my
                  personal, employment, financial or medical history and other
                  related matters as may be necessary in arriving at an employment
                  decision. (Generally, inquiries regarding medical history will
                  be made only if and after a conditional offer of employment has
                  been extended.) I hereby release employers, schools, health care
                  providers and other persons from all liability in responding to
                  inquiries and releasing information in connection with my
                  application.
                </Text>
                <Text style={style.textContent}>
                  In the event of employment, I understand that false or
                  misleading information given in my application or interview(s)
                  may result in discharge. I understand, also, that I am required
                  to abide by all rules and regulations of the Company. “I
                  understand that information I provide regarding current and/or
                  previous employers may be used, and those employer(s) will be
                  contacted, for the purpose of investigating my safety
                  performance history as required by 49 CFR 391.23(d) and (e). I
                  understand that I have the right to:
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>
                  • Review information provided by current/previous employers;
                </Text>
                <Text style={style.list}>
                  • Have errors in the information corrected by previous employers
                  and for those previous employers to re-send the corrected
                  information to the prospective employer; and
                </Text>
                <Text style={style.list}>
                  • Have a rebuttal statement attached to the alleged erroneous
                  information, if the previous employer(s) and I cannot agree on
                  the accuracy of the information.”
                </Text>
  
                <Text style={style.titleAgreement}>
                  Pre-employment Urinalysis and Breath Analysis Consent Form
                </Text>
                <Text style={style.textContent}>
                  I understand that as required by the Federal Motor Carrier
                  Administration Regulations, Title 49 Code of Federal
                  Regulations, Section 382.301, all driver-applicants of this
                  employer must be tested for controlled substances and alcohol as
                  a pre-condition for employment.
                </Text>
                <Text style={style.textContentsmall}>
                  I consent to the urine sample collection and testing for
                  controlled substances, and the breath sample collection and
                  testing for alcohol.
                </Text>
                <Text style={style.textContentsmall}>
                  I understand that a verified positive test result for controlled
                  substances and/or an alcohol concentration of 0.04 or higher
                  will render me unqualified to operate a commercial motor
                  vehicle.
                </Text>
                <Text style={style.textContentsmall}>
                  The medical review officer will maintain the results of my
                  controlled substance test. Negative and positive results will be
                  reported to the employer. If the results are positive, the
                  controlled substance will be identified.
                </Text>
                <Text style={style.textContentsmall}>
                  Alcohol test results will be maintained by the employer.
                </Text>
                <Text style={style.textContentsmall}>
                  The results will not be released to any other parties without my
                  written authorization.{"\n\n"}
                </Text>
                <Text style={style.titleAgreement}>
                  PSP Disclosure Authorization
                </Text>
                <Text style={style.textContentsmall}>
                  THE BELOW DISCLOSURE AND AUTHORIZATION LANGUAGE IS FOR MANDATORY
                  USE BY ALL ACCOUNT HOLDERS. {"\n"} IMPORTANT DISCLOSURE
                  REGARDING BACKGROUND REPORTS FROM THE PSP Online Service.
                  {"\n\n"}
                  In connection with your application for employment with{" "}
                  {props.driver.Name + " " + props.driver.LastName}. Prospective
                  Employer, its employees, agents or contractors may obtain one or
                  more reports regarding your driving, and safety inspection
                  history from the Federal Motor Carrier Safety Administration
                  (FMCSA). When the application for employment is submitted in
                  person, if the Prospective Employer uses any information it
                  obtains from FMCSA in a decision to not hire you or to make any
                  other adverse employment decision regarding you, the Prospective
                  Employer will provide you with a copy of the report upon which
                  its decision was based and a written summary of your rights
                  under the Fair Credit Reporting Act before taking any final
                  adverse action. If any final adverse action is taken against you
                  based upon your driving history or safety report, the
                  Prospective Employer will notify you that the action has been
                  taken and that the action was based in part or in whole on this
                  report.
                  {"\n\n"}
                  When the application for employment is submitted by mail,
                  telephone, computer, or other similar means, if the Prospective
                  Employer uses any information it obtains from FMCSA in a
                  decision to not hire you or to make any other adverse employment
                  decision regarding you, the Prospective Employer must provide
                  you within three business days of taking adverse action oral,
                  written or electronic notification: that adverse action has been
                  taken based in whole or in part on information obtained from
                  FMCSA; the name, address, and the toll free telephone number of
                  FMCSA; that the FMCSA did not make the decision to take the
                  adverse action and is unable to provide you the specific reasons
                  why the adverse action was taken; and that you may, upon
                  providing proper identification, request a free copy of the
                  report and may dispute with the FMCSA the accuracy or
                  completeness of any information or report. If you request a copy
                  of a driver record from the Prospective Employer who procured
                  the report, then, within 3 business days of receiving your
                  request, together with proper identification, the Prospective
                  Employer must send or provide to you a copy of your report and a
                  summary of your rights under the Fair Credit Reporting Act.
                  {"\n\n"}
                  Neither the Prospective Employer nor the FMCSA contractor
                  supplying the crash and safety information has the capability to
                  correct any safety data that appears to be incorrect. You may
                  challenge the accuracy of the data by submitting a request to
                  https://dataqs.fmcsa.dot.gov. If you challenge crash or
                  inspection information reported by a State, FMCSA cannot change
                  or correct this data. Your request will be forwarded by the
                  DataQs system to the appropriate State for adjudication.
                  {"\n\n\n\n\n"}
                  Any crash or inspection in which you were involved will display
                  on your PSP report. Since the PSP report does not report, or
                  assign, or imply fault, it will include all Commercial Motor
                  Vehicle (CMV) crashes where you were a driver or co-driver and
                  where those crashes were reported to FMCSA, regardless of fault.
                  Similarly, all inspections, with or without violations, appear
                  on the PSP report. State citations associated with Federal Motor
                  Carrier Safety Regulations (FMCSR) violations that have been
                  adjudicated by a court of law will also appear, and remain, on a
                  PSP report.
                  {"\n"}
                  The Prospective Employer cannot obtain background reports from
                  FMCSA without your authorization.
                </Text>
                <Text style={style.textContent}>{"\n\n"}AUTHORIZATION</Text>
                <Text style={style.textContentsmall}>
                  If you agree that the Prospective Employer may obtain such
                  background reports, please read the following and sign below:
                  {"\n\n"}I authorize{" "}
                  {props.driver.Name + " " + props.driver.LastName}
                  (“Prospective Employer”) to access the FMCSA Pre-Employment
                  Screening Program (PSP) system to seek information regarding my
                  commercial driving safety record and information regarding my
                  safety inspection history. I understand that I am authorizing
                  the release of safety performance information including crash
                  data from the previous five (5) years and inspection history
                  from the previous three (3) years. I understand and acknowledge
                  that this release of information may assist the Prospective
                  Employer to make a determination regarding my suitability as an
                  employee. I further understand that neither the Prospective
                  Employer nor the FMCSA contractor supplying the crash and safety
                  information has the capability to correct any safety data that
                  appears to be incorrect. I understand I may challenge the
                  accuracy of the data by submitting a request to
                  https://dataqs.fmcsa.dot.gov. If I challenge crash or inspection
                  information reported by a State, FMCSA cannot change or correct
                  this data. I understand my request will be forwarded by the
                  DataQs system to the appropriate State for adjudication. I
                  understand that any crash or inspection in which I was involved
                  will display on my PSP report. Since the PSP report does not
                  report, or assign, or imply fault, I acknowledge it will include
                  all CMV crashes where I was a driver or co-driver and where
                  those crashes were reported to FMCSA, regardless of fault.
                  Similarly, I understand all inspections, with or without
                  violations, will appear on my PSP report, and State citations
                  associated with FMCSR violations that have been adjudicated by a
                  court of law will also appear, and remain, on my PSP report.
                  {"\n\n"}I have read the above Disclosure Regarding Background
                  Reports provided to me by Prospective Employer and I understand
                  that if I sign this Disclosure and Authorization, Prospective
                  Employer may obtain a report of my crash and inspection history.
                  I hereby authorize Prospective Employer and its employees,
                  authorized agents, and/or affiliates to obtain the information
                  authorized above.
                </Text>
                <Text style={style.titleAgreement}>
                  Employer Pull Notice Program Authorization for Release of Driver
                  Record Information
                </Text>
                <Text style={style.textContent}>
                  I, {props.driver.Name}, California Driver License,{" "}
                  {props.driver.License}, hereby authorize the Department of Motor
                  Vehicles(DMV) to disclose or other make available, my driving
                  record, to my employer, {props.company.LegalName}.{"\n\n"}I
                  Understand that my employer may enroll me in the Employer Pull
                  Notice(EPN) program to receive a driver record report at least
                  once every 12 months or when any subsequent, failure to appear,
                  accident, driver's license suspension, revocation or any other
                  action is taken against my driving privilege during employment.
                  {"\n\n"}I am not driving in a capacity that requires mandatory
                  enrollment in the EPN program pursuant to California Vehicle
                  Code(CVC) Section 1808.1(k). I understand that enrollment in the
                  EPN program is an effort to promote driver safety, and that my
                  driver license report will be released to my employer to
                  determine my eligibility as a licensed driver for my{" "}
                  {"\n\n\n\n\n"}
                </Text>
                <Text style={style.titleAgreement}>
                  Authorization to Obtain Motor Vehicle Record
                </Text>
                <Text style={style.textContent}>
                  THE UNDERSIGNED DOES HEREBY ACKNOWLEDGE AND CERTIFY AS FOLLOWS:
                  {"\n"}
                </Text>
                <Text style={style.list}>
                  1. Certifies that the undersigned is an employee, or has applied
                  to become an employee of the below named employer in a position
                  which involves the operation of a motor vehicle and the
                  undersigned gives his or her consent to the release of their
                  driving record (MVR) for review by: {props.company.LegalName}.
                </Text>
                <Text style={style.list}>
                  2. That the undersigned authorizes his or her driving record to
                  be periodically obtained and reviewed for the purpose of initial
                  and continued employment.
                </Text>
                <Text style={style.list}>
                  3. That all information presented in this form is true and
                  correct. The undersigned makes this certification and
                  affirmation under penalty of perjury and understands that
                  knowingly making a false statement or representation on this
                  form is a criminal violation.
                </Text>
                <Text style={style.titleAgreement}>
                  ClearingHouse Annuel Query
                </Text>
                <Text style={style.textContent}>
                  General Consent for Limited Queries of the Federal Motor Carrier
                  Safety Administration (FMCSA) Drug and Alcohol Clearinghouse.
                </Text>
                <Text style={style.textContentsmall}>
                  I, {props.driver.Name}, hereby provide consent to conduct a
                  multiple limited queries for the duration of employment of the
                  FMCSA commercial Driver's License Drug and Alcohol ClearingHouse
                  to determine wheter drug or alcohol violation information about
                  me in the ClearingHouse.
                  {"\n\n"}I understand that if the limited query conducted by{" "}
                  {props.company.LegalName}
                  indicates that drug or alcohol violation information about me
                  exists in the ClearingHouse, FMCSA will not disclose that
                  information to {props.company.LegalName} without first obtaining
                  additional specific consent from me.
                  {"\n\n"}I further understand that if I refuse to provide consent
                  for {props.company.LegalName}
                  to conduct a limited query of the ClearingHouse,{" "}
                  {props.company.LegalName}
                  must prohibit me from performing safety-sensitive functions,
                  including driving a commercial motor vehicle, as required by
                  FMCSA's drug and alcohol program regulations.
                </Text>
                <Text style={style.titleAgreement}>
                  Pre-Employment Drug Testing Policy
                </Text>
                <Text style={style.textContent}>
                  PURPOSE:
                  {"\n"}
                  The purposes of this policy are to provide a safe and productive
                  working environment, to prevent accidents, injuries and property
                  damage which may result from drug abuse, and to protect
                  vulnerable clients who are dependent on public services.
                  {"\n\n"}
                  SCOPE: This policy covers applicants for all positions which
                  have met the standards identified in Appendix A, including
                  applicants for temporary and seasonal positions, part-time
                  working less than half time, limited term, and non-represented
                  employees on employment agreements. The master list of the
                  actual positions which are eligible for pre-employment drug
                  testing will be kept in the Department of Employee Services.
                  This policy does not apply to current employees who are internal
                  applicants for open positions.
                  {"\n\n"}
                  POLICY STATEMENT:
                  {"\n"}
                  {props.company.LegalName} is committed to a workplace which is
                  free from the effects of unauthorized drug use. Unauthorized
                  drug use may pose serious risks to the user and his or her
                  colleagues, as well as to the public we serve. Therefore,
                  {props.company.LegalName} has chosen to conduct pre-employment
                  screening to prevent the hiring of individuals whose
                  unauthorized use of drugs creates a potential for impaired or
                  unsafe job performance.
                  {"\n"}
                  Applicants for jobs which meet the standards identified in
                  Appendix A will undergo screening for the presence of illegal
                  drugs as a condition for employment. Applicants will be required
                  to submit to a urinalysis test at a laboratory of{" "}
                  {props.company.LegalName}.{"\n\n"}
                  TABLE OF CONTENTS
                  {"\n"}
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>• Pre-employment Testing</Text>
                <Text style={style.list}>• Medical Marijuana</Text>
                <Text style={style.list}>• Costs of Testing</Text>
                <Text style={style.list}>• Drug Testing Procedures</Text>
                <Text style={style.list}>• Drug Test Results Review</Text>
                <Text style={style.list}>
                  • Medical Review Officer Reporting Options
                </Text>
                <Text style={style.list}>
                  • MRO Verification without Notifying the Employee
                </Text>
                <Text style={style.list}>• Communication of Results</Text>
                <Text style={style.list}>• Record Keeping Procedures</Text>
                <Text style={style.list}>• Definition of Terms</Text>
                <Text style={style.list}>• Appendix A</Text>
  
                <Text style={style.textContent}>
                  Pre-employment Testing
                  {"\n"}
                  Pre-employment drug testing is required for all positions which
                  meet the standards listed in Appendix A. Applicants will be
                  notified that drug testing is a requirement of the selection
                  process.
                  {"\n"}A drug test result which is verified as positive for
                  unauthorized use of controlled substances, or found to be
                  substituted or adulterated, will disqualify the applicant for
                  the offered position.
                  {"\n\n"}A negative dilute result is unsatisfactory on a
                  pre-employment test.
                  {"\n"}
                  Applicants will be given one additional opportunity to provide a
                  valid specimen. The result of the second test will determine
                  whether the applicant is eligible for employment.
                  {"\n"}A person who receives any of the following results on the
                  drug test is not eligible to be hired, and is disqualified from
                  consideration from {props.company.LegalName}
                  for a period of twenty-four (24) months from the date of the
                  test result:
                  {"\n"}
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>• verified “positive”,</Text>
                <Text style={style.list}>• second "negative dilute",</Text>
                <Text style={style.list}>
                  • second sample outside the allowed temperature range,
                </Text>
                <Text style={style.list}>
                  • “cancelled—invalid result” where the donor’s explanation is
                  not accepted by the MRO,
                </Text>
                <Text style={style.list}>• verified “adulterated”,</Text>
                <Text style={style.list}>• verified “substituted”.</Text>
                <Text style={style.textContent}>
                  Medical Marijuana
                  {"\n"}
                  Marijuana is a Class I controlled substance; its use is illegal
                  under federal law. Although California law (§ 11362.5(b) (1) (A)
                  and (d) (1996)) exempts from criminal prosecution in state court
                  those individuals who obtain a “registry identification card”
                  from the California Department of Human Services, based on a
                  statement from their attending physician that the individual has
                  a “debilitating medical condition”, this is not an acceptable
                  explanation for a positive drug test under this Policy.
                  {"\n"}
                  The Medical Review Officer (MRO) will automatically verify such
                  tests as positive.
                  {"\n\n"}
                  Costs of Testing
                  {"\n"}
                  {props.company.LegalName} will pay for all pre-employment drug
                  tests.
                  {"\n\n"}
                  Drug Testing Procedures
                  {"\n"}
                  Urine specimen collection for drug testing will be performed by
                  qualified individuals in conformance with current standards of
                  practice, using chain of custody procedures as described by
                  United States Department of Transportation (DOT) regulations (49
                  CFR Part 40) and with respect for the privacy and dignity of the
                  person giving the specimen.
                  {"\n\n"}
                  Drug test specimens will be collected to provide at least 45 ml
                  of urine. If an applicant is unable to provide an adequate
                  volume of urine on the first attempt (“shy bladder”), he/she
                  will have an opportunity to drink up to 40 ounces of fluids
                  within three hours. At the end of this period, if a sample of
                  adequate volume has not been provided, the test will be
                  cancelled. A retest will be allowed if the applicant provides a
                  medical evaluation from a licensed physician, acceptable to the{" "}
                  {props.company.LegalName} who has expertise in the medical
                  issues raised by the applicant's failure to provide a sufficient
                  specimen.
                  {"\n\n"}
                  The collector will check the temperature of the specimen upon
                  receiving it from the applicant. The acceptable temperature
                  range is 90 - 100 degrees Fahrenheit. If the specimen is outside
                  the acceptable range, the applicant will begin a second
                  unobserved collection. If the second specimen is also outside
                  the acceptable range, the applicant will be disqualified. If
                  within range, the second specimen will be tested at the lab.
                  {"\n"}
                  Only laboratories certified by the Substance Abuse and Mental
                  Health Services Administration (SAMHSA) of the U.S. Department
                  of Health and Human Services will perform drug testing.
                  {"\n\n"}
                  When an initial screening test for drugs is positive, a second,
                  confirmatory test will automatically be performed. Confirmed
                  positive drug tests will be reported by the testing laboratory
                  to the MRO for verification (see “Drug Test Results Review”).
                  {"\n\n"}
                  Drug Test Results Review.
                  {"\n"}
                  Drug test results of an applicant which are reported as
                  positive, adulterated, or Substituted by the testing laboratory
                  will be reviewed and verified by the Medical Review Officer
                  (MRO). A POSITIVE drug test result is defined as the detection
                  of any one or more of the Substances listed in the table shown
                  below.
                  {"\n\n"}
                </Text>
                <Image src={logo} />
                <Text style={style.textContent}>
                  A confirmed positive test from a certified laboratory does not
                  automatically identify an employee or applicant as being in
                  violation of this policy. The MRO brings detailed knowledge of
                  possible alternate medical explanations to his/her review of the
                  test results. This review is performed by the MRO prior to the
                  transmission of results to {props.company.LegalName}.{"\n\n"}
                  Medical Review Officer Reporting Options:
                  {"\n"}
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>• “Negative” - self explanatory</Text>
                <Text style={style.list}>
                  • “Negative Dilute” - Upon receipt of a “negative dilute,” the
                  applicant shall be required to provide another specimen as soon
                  as possible.
                </Text>
                <Text style={style.list}>
                  • “Canceled - Test Not Performed, Fatal Flaw (with flaw stated)
                  or Uncorrected Flaw.” A canceled drug test is neither positive
                  nor negative and no consequences are attached to it. The
                  applicant will be given the opportunity to take a second test.
                </Text>
                <Text style={style.list}>
                  • “Cancelled - Invalid Result.” An “invalid result” means the
                  laboratory was unable to obtain a valid result when attempting
                  to test the specimen. If the MRO has accepted the donor's
                  explanation as to why the laboratory was unable to obtain a
                  valid result, then the MRO will notify the County and a retest
                  will be allowed. If the MRO has not accepted the donor's
                  explanation, the MRO will notify {props.company.LegalName} and
                  the applicant will be disqualified.
                </Text>
                <Text style={style.list}>
                  • “Positive or Positive Dilute” - Applicant is disqualified.
                </Text>
                <Text style={style.list}>
                  • “Adulterated” - Applicant is disqualified.
                </Text>
                <Text style={style.list}>
                  • “Substituted” - Applicant is disqualified. MRO Verification
                  without Notifying the Employee
                </Text>
                <Text style={style.textContent}>
                  MRO Verification without Notifying the Employee the MRO is
                  permitted to verify a test as positive, or as a refusal to test
                  because of a laboratory report of a positive adulterated, or
                  substituted specimen without interviewing the applicant under
                  the following circumstances:
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>
                  • The applicant expressly declines the opportunity to discuss
                  the test with the MRO;
                </Text>
                <Text style={style.textContent}>
                  {props.company.LegalName} has successfully made and documented a
                  contact with the applicant, and has asked the applicant to
                  contact the MRO, and more than 72 hours have passed since{" "}
                  {props.company.LegalName} contacted the applicant.
                  {"\n"}
                  NOTE: If a test is verified positive under the latter
                  circumstances, the donor may give the MRO information
                  documenting that serious illness, injury, or other circumstances
                  unavoidably prevented him/her from contacting the MRO. On the
                  basis of this information, the MRO may re-open the verification,
                  allowing the donor to present information concerning a
                  legitimate explanation for the positive test. If the MRO
                  concludes that there is a legitimate explanation, the MRO shall
                  verify the test as negative.
                  {"\n\n"}
                  Communication of Results
                  {"\n"}
                  The MRO or his/her designated representative will report test
                  results ONLY to the Designated Employer Representative (DER).
                  Confidentiality will be strictly maintained. If the result is
                  positive, the MRO or his/her authorized representative will
                  report the identity of the controlled substance.
                  {"\n"}
                  Applicants may obtain copies of their test results by requesting
                  them in writing from the MRO within 60 days of being notified of
                  the results.
                  {"\n\n"}
                  Record Keeping Procedures
                  {"\n"}
                  {props.company.LegalName} DER will maintain pre-employment drug
                  testing records in a secure filing system with information
                  available only on a “need to know” basis for a period of two
                  years.
                  {"\n\n"}
                  Definition of Terms
                  {"\n\n"}
                  Adulterated Specimen: A specimen that contains a substance that
                  is not expected to be present in human urine, or contains a
                  substance expected to be present but is at a concentration so
                  high that it is not consistent with human urine.
                  {"\n\n"}
                  CFR: United States Code of Federal Regulations.
                  {"\n\n"}
                  Cadena de custodia: Procedures to account for the integrity of
                  each urine specimen by tracking its handling and storage from
                  point of specimen collection to final disposition of the
                  specimen. These procedures shall require that an appropriate
                  drug testing custody form from a Department of Health and Human
                  Services (DHHS), Substance Abuse and Mental Health Services
                  Administration (SAMHSA) certified laboratory be used from time
                  of collection to receipt by the laboratory.
                  {"\n\n"}
                  Collection Site: A designated clinic/facility where applicants
                  or employees may present themselves for the purpose of providing
                  a specimen of their urine to be analyzed for the presence of
                  drugs.
                  {"\n\n"}
                  Collector: A person who instructs and assists applicants and
                  employees through the urine specimen collection process.
                  {"\n\n"}
                  Confirmation Test: A second analytical drug testing procedure to
                  identify the presence of a specific drug or metabolite which is
                  independent of the initial test and which uses a different
                  technique and chemical principle from that of the initial test
                  in order to ensure reliability and accuracy. Gas
                  chromatography/mass spectrometry (GC-MS) is the only authorized
                  confirmation method for DOT mandated drug testing.
                  {"\n\n"}
                  Controlled Substances: Substances listed on Schedules I through
                  V in 21 U.S.C. 802 as they may be revised from time to time (21
                  CFR 1308). Controlled substances include illicit drugs and drugs
                  which may be authorized for use by a physician or dentist for
                  certain medical uses, but which are subject to misuse or abuse.
                  {"\n\n"}
                  {props.company.LegalName}: Employer
                  {"\n\n"}
                  Designated Employer Representative (DER): An employee authorized
                  by the employer to manage and make decisions in the testing and
                  evaluation processes. The DER also receives test results and
                  other communications for the employer and communicates test
                  results to individual departments.
                  {"\n\n"}
                  Dilute Specimen: A specimen with creatinine and specific gravity
                  values that are lower than expected for human urine.
                  {"\n\n"}
                  DOT: United States Department of Transportation.
                  {"\n\n"}
                  FHWA: Federal Highway Administration.
                  {"\n\n"}
                  FMCSA: Federal Motor Carrier Safety Administration.
                  {"\n\n"}
                  Initial or Screening Test: An immunoassay screen to eliminate
                  “negative” urine specimens from further consideration.
                  {"\n\n"}
                  Medical Review Officer (MRO): A licensed doctor of medicine or
                  osteopathy with knowledge of drug abuse disorders and drug
                  testing who is responsible for reviewing and verifying drug
                  testing results prior to their communication to the Designated
                  Employer Representative.
                  {"\n\n"}
                  Negative Drug Test: A test in which initial or confirmation
                  testing did not show evidence of a prohibited drug in an
                  applicant's system above established levels; OR, a test which is
                  verified as negative by the MRO (e.g. review showed positive
                  test was due to prescription medication or other authorized use
                  of controlled substance).
                  {"\n\n"}
                  Positive Drug Test: A urine drug test result which indicates the
                  presence of controlled Substances beyond the cut-off levels.
                  {"\n\n"}
                  Confirmed Positive Drug Test: A positive drug test which has
                  undergone an initial “screening” test AND a confirmation test
                  which validates the first result. Drug tests are confirmed by
                  the SAMHSA certified laboratory which performs the analyses.
                  {"\n\n"}
                  Verified Positive Drug Test: A confirmed positive drug test (see
                  above) after investigation by the MRO, who has determined that
                  no legitimate explanation exists for the presence of the
                  controlled substance that was detected.
                  {"\n\n"}
                  Prohibited Drugs: Marijuana, cocaine, opiates, phencyclidine
                  (PCP), and amphetamines.
                  {"\n\n"}
                  Refusal to Submit: Refusal by an individual to provide a urine
                  specimen.
                  {"\n\n"}
                  SAMHSA: Substance Abuse and Mental Health Services
                  Administration, a division of the US Department of Health and
                  Human Services (DHHS) which is responsible for certifying
                  laboratories to perform federal workplace drug testing.
                  {"\n\n"}
                  Screening or Initial Test: Immunoassay screen to eliminate
                  “negative” urine specimens from further consideration.
                  {"\n\n"}
                  Substituted Specimen: A specimen with creatinine and specific
                  gravity values that are so diminished that they are not
                  consistent with human urine.
                  {"\n\n"}
                  Appendix A:
                  {"\n"}
                  The following standards are applied in evaluating whether a job
                  title and/or classification can be approved for pre-employment,
                  post-offer drug testing. Additions or deletions to the list of
                  job titles and/or classifications eligible for pre-employment
                  drug testing can be made by request from the affected Department
                  Supervisor or designee to the Supervisor of Employee Services.
                  To be included on the list, the applicant's typical daily
                  activities must include duties such as:
                  {"\n"}
                  Employees covered by United States Department of Transportation.
                  Regulations, 49 Code of Federal Regulations (CFR) Part 40 and
                  Part 382. I have read in full and understand the above
                  statements and conditions of employment Applicants Signature
                  Date Driver's License information: CDL Number State.
                  {"\n\n\n\n\n"}
                  Drug and Alcohol Policy & Information
                  {"\n"}
                  {props.company.LegalName} is committed to providing a safe
                  workplace for its employees, and the company is also committed
                  to placing safe, professional drivers in its vehicles. We intend
                  our workplace to be drug free, and that employees will be free
                  from the effects of alcohol while on duty. A critical part of
                  the company's program is compliance with the Federal Motor
                  Carrier Safety Regulations, CFR 49, Part 382. The following
                  information is provided in accordance with Part 382.601:
                  {"\n\n"}
                  The following information is provided in accordance with Part
                  382.601:
                  {"\n"}
                  Designated Employer Contact {props.company.Der} is the company's
                  designated person for providing information on the controlled
                  substances program. Questions should be directed to him at{" "}
                  {props.user.PhoneNumber}.{"\n"}
                  Categories Subject to Testing: All vehicle drivers who hold a
                  Commercial Driver License, who work part time or full time for{" "}
                  {props.company.LegalName} are subject to the controlled
                  substance testing provisions in Part 382.
                  {"\n\n"}
                  Safety Sensitive Functions
                  {"\n"}
                  All drivers are considered to be performing safety sensitive
                  functions during any period in which they are actually
                  performing, ready to perform, or immediately available to
                  perform as a driver of a commercial motor vehicle.
                  {"\n\n"}
                  These functions are further defined as:
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>
                  • Time at a terminal, facility or other property waiting to be
                  dispatched.
                </Text>
                <Text style={style.list}>
                  • Time inspecting equipment as required, or
                  servicing/conditioning a motor vehicle.
                </Text>
                <Text style={style.list}>• Driving</Text>
                <Text style={style.list}>
                  • Time spent in or on any commercial vehicle.
                </Text>
                <Text style={style.list}>
                  • Time spent loading or unloading a vehicle or remaining in
                  readiness to operate a vehicle.
                </Text>
                <Text style={style.list}>
                  • Time spent supervising or assisting loading or unloading a
                  vehicle.
                </Text>
                <Text style={style.list}>
                  • Time spent attending a vehicle being unloaded.
                </Text>
                <Text style={style.list}>
                  • Time spent performing driver requirements relating to
                  accidents.
                </Text>
                <Text style={style.list}>
                  • Time spent repairing, obtaining assistance or remaining in
                  attendance upon a disabled Vehicle.
                </Text>
                <Text style={style.list}>
                  • Time spent providing a breath or urine sample in compliance
                  with the requirements of Part 382.
                </Text>
                <Text style={style.textContent}>
                  Prohibited Conduct
                  {"\n"}
                  Specifically, all drivers who are performing safety sensitive
                  functions must comply with the following:
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>
                  • No driver shall report for duty or remain on duty while having
                  an alcohol concentration of 0.02 or greater.
                </Text>
                <Text style={style.list}>
                  • No driver shall possess alcohol, unless the alcohol is
                  manifested and transported as part of a shipment.
                </Text>
                <Text style={style.list}>
                  • No driver shall use alcohol while performing safety sensitive
                  functions.
                </Text>
                <Text style={style.list}>
                  • No driver shall perform safety sensitive functions within four
                  hours of using alcohol.
                </Text>
                <Text style={style.list}>
                  • No driver required to take a post-accident alcohol test shall
                  use alcohol for eight hours following the accident, or until he
                  or she undergoes a post-accident alcohol test, whichever occurs
                  first.
                </Text>
                <Text style={style.list}>
                  • No driver shall refuse to submit to a post-accident; random;
                  reasonable suspicion; or follow-up, alcohol or controlled
                  substances test.
                </Text>
                <Text style={style.list}>
                  • No driver shall report for duty or remain on duty when the
                  driver uses any controlled substance. An exception is when the
                  use of the controlled substance is pursuant to the instructions
                  of a physician who has advised the driver that the substance
                  does not adversely affect the driver's ability to safely operate
                  a commercial motor vehicle. (The employer may require a driver
                  to inform the employer of any therapeutic drug use.) Note: the
                  use of another individual's prescription medicine may be
                  considered prohibited controlled substance use.
                </Text>
                <Text style={style.list}>
                  • No driver shall report for duty, remain on duty, or perform a
                  safety sensitive function, if the driver tests positive for
                  controlled substances.
                </Text>
                <Text style={style.textContent}>
                  Types of Testing
                  {"\n"}
                  The following alcohol and controlled substance tests will be
                  performed. In order for the driver to be allowed to perform
                  safety sensitive functions, a negative result for controlled
                  substances and an alcohol concentration of less than 0.02 will
                  be necessary. (A concentration between 0.02 and 0.039 will
                  result in a 24 hour disqualification). A concentration of 0.04
                  will result in a positive test.
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>
                  • Pre-employment - administered prior to a driver performing
                  safety sensitive functions for the first time for an employer.
                  (controlled substances testing only).
                </Text>
                <Text style={style.list}>
                  • Post-accident - administered as soon as practicable, following
                  an accident involving a commercial motor vehicle, if there is a
                  fatality, or if the driver is cited for a moving traffic
                  violation. (we must test for alcohol within 8 hours of the
                  accident, and controlled substances within 32 hours).
                </Text>
                <Text style={style.list}>
                  • Random - administered if a driver's name is selected in a
                  random drawing, conducted periodically throughout the year.
                  Drivers notified of a random selection must submit immediately
                  for testing.
                </Text>
                <Text style={style.list}>
                  • Reasonable suspicion - administered if the employer has
                  reasonable suspicion to believe the driver is in violation of
                  any of the prohibitions listed above.
                </Text>
                <Text style={style.list}>
                  • Return to duty - Administered prior to a driver returning to
                  duty, following a “positive” controlled substances or alcohol
                  test. We must also administer a return to duty test if a driver
                  is disqualified from the random pool for any reason, and then
                  re-enters the random pool.
                </Text>
                <Text style={style.list}>
                  • Follow-up - If a driver has refused to test or tested
                  positive, and wishes to be re-qualified to perform safety
                  sensitive functions, he/she must be counseled by a Substance
                  Abuse Professional (SAP), follow the recommended program, and
                  then produce a negative “Return to Duty” test result. The SAP
                  will then direct the company to administer a minimum of six
                  “Follow-up” tests in the next 12 months. This number may be
                  increased by the SAP. The company will select the times for the
                  follow-up tests.
                </Text>
                <Text style={style.textContent}>
                  Testing Procedures
                  {"\n"}
                  All testing will be performed with procedures that are outlined
                  in the Code of Federal Regulations, Part 40. These procedures
                  are designed to protect the driver, maintain integrity in the
                  testing process and safeguard the validity of the test results.
                  {"\n\n"}
                  Consequences of Prohibited Conduct
                  {"\n"}
                  Any driver who engages in conduct prohibited by Part 382 will be
                  immediately removed from performing any safety sensitive
                  function. In addition, the driver will be subject to termination
                  from his/her employment with {props.company.LegalName}. Under
                  the company's current policy, the driver who tests positive will
                  be offered a “once per lifetime” last chance to be reinstated.
                  The reinstatement will be subject to the driver submitting to a
                  treatment needs assessment by an authorized Substance Abuse
                  Professional, and following and completing the recommended
                  treatment. In addition, the driver will be required to submit to
                  a Return to Duty controlled substance and/or alcohol test.
                  {"\n\n"}
                  Refusal to Test
                  {"\n"}
                  If any driver refuses to test under the conditions outlined in
                  Part 382, the refusal will be treated as a positive result, and
                  will be subject to consequences of a positive test.
                  {"\n\n"}
                  Information
                  {"\n"}
                  The following pages contain information regarding the symptoms
                  and effects of the use of alcohol and controlled substances. All
                  employees are encouraged to be familiar with this document and
                  with the requirements of the Federal Motor Carrier Safety
                  Regulations, Parts 382 and Part 40.
                  {"\n\n"}
                  Alcohol and Controlled Substances
                  {"\n"}
                  General Signs of Abuse of alcohol and controlled substances
                  include:
                </Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>• Tardiness or absenteeism</Text>
                <Text style={style.list}>• Borrowing money from co-workers</Text>
                <Text style={style.list}>• Problems with relationships</Text>
                <Text style={style.list}>• Increased irritability</Text>
                <Text style={style.list}>• Decreased attention span</Text>
                <Text style={style.list}>
                  • Difficulty remembering instructions
                </Text>
                <Text style={style.list}>• Taking criticism personally</Text>
                <Text style={style.list}>• Denial of any problem</Text>
                <Text style={style.list}>
                  • Paraphernalia present
                  {"\n\n"}
                </Text>
  
                <Text style={style.textContent}>Types of paraphernalia:</Text>
                <Text style={style.jump}></Text>
                <Text style={style.list}>• Roach clips</Text>
                <Text style={style.list}>• Cigarette papers</Text>
                <Text style={style.list}>• Pipes, bongss</Text>
                <Text style={style.list}>• Razor blades, small mirrors</Text>
                <Text style={style.list}>• Small spoons and straws</Text>
                <Text style={style.list}>• White powder</Text>
                <Text style={style.list}>• Syringes; needles</Text>
                <Text style={style.list}>• Eye droppers</Text>
                <Text style={style.list}>
                  • Rubber tubing
                  {"\n\n"}
                </Text>
  
                <Text style={style.textContent}>
                  Physical Symptoms Uses and Effects
                  {"\n\n"}
                  Marijuana
                  {"\n"}
                  Red eyes some medical uses for THC, Pale face Effect lasts 2-4
                  hours; stays in, System for several days/weeks; Strong odor,
                  like burning rope stored in fat tissue cells, Loud, boisterous
                  in early stages Smoked or taken orally, Sleepy, stuporous in
                  later stages causes euphoria; increased appetite; disoriented
                  behavior; relaxed inhibitions; negative effect on peripheral
                  vision, Overdose can cause fatigue; paranoia; not fatal.
                  {"\n\n"}
                  Physical Symptoms Uses and Effects
                  {"\n\n"}
                  Cocaine
                  {"\n"}
                  Runny nose; nasal problems May be used as a local anesthetic,
                  Needle marks on arms highly addictive, Dizziness Effect lasts
                  1-2 hours, Dilated pupils Sniffed, smoked or injected, Dry mouth
                  and nose increased alertness; euphoria; excitation; increased
                  pulse and blood pressure; insomnia; loss of appetite, Bad
                  breath; frequent lip licking Overdose can cause agitation;
                  hallucination; convulsions; possible death Lack of interest in
                  food and sleep.
                  {"\n\n\n\n\n"}
                  Opiates
                  {"\n"}
                  Drowsiness; lethargy Used as pain killer; cough medicine,
                  Slurred speech highly addictive (codeine is moderately
                  addictive), Constricted pupils Effect lasts 3-6 hours, Needle
                  scars Sniffed, injected, smoked, taken orally, Loss of appetite
                  Causes euphoria; drowsiness; nausea, Nausea; flushed face
                  Overdose can cause slow, shallow breathing; clammy skin;
                  convulsions; possible death.
                  {"\n\n"}
                  PCP
                  {"\n"}
                  Increased heart rate/blood pressure No medical uses, Flushing,
                  sweating, dizziness, highly addictive; effect lasts several
                  numbness, drowsiness days, Pupils dilated Smoked, injected,
                  taken orally, Rigid muscles, deadened actions Causes illusions;
                  hallucinations, Symptoms of intoxication Overdose may cause more
                  intense without smell of alcohol trips; possible death.
                  {"\n\n"}
                  Physical Symptoms Uses and Effects Amphetamines.
                  {"\n"}
                  Increased heart and breathing Used for weight control; to treat
                  rates narcolepsy; attention deficit disorder. High blood
                  pressure; high fever highly addictive, Dilated pupils Effect
                  lasts 2-4 hours, Decreased appetite; dry mouth Injected or taken
                  orally, Sweating; headache; blurred Increased alertness, pulse,
                  and blood vision; dizziness pressure; insomnia; loss of
                  appetite; euphoria; excitation, Unable to sleep Overdose may
                  cause agitation; convulsions; possible death.
                  {"\n\n"}
                  Alcohol
                  {"\n"}
                  Sloppiness Limited medicinal use; over the counter sleep aids;
                  cough syrups, Slurred speech Addictive; may be genetic, Trouble
                  walking Moody, emotionally unstable, Has the “shakes”
                  Accident-prone, Blackouts Withdrawn; may be violent; overly
                  talkative, Hangover (headaches), Smell of alcohol.
                </Text>
                <Text style={style.textContent}>
                { signatureAgreement(props)}
                </Text>
              </View>
            </Page>
          </Document>
        );
}

export default DriverAgreement