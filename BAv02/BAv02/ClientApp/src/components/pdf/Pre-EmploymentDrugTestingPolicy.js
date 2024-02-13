import React from "react";
import { Button, Alert } from "reactstrap";
import {
  pdf,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/img/brand/Tabla Pre-employment.JPG";

export default class PreEmpAgree extends React.Component {
  constructor() {
    super();

    this.state = {
      ready: false,
      open: false,
    };
  }

  toggle() {
    this.setState(
      (prevState) => ({
        ready: false,
      }),
      () => {
        // THIS IS THE HACK
        setTimeout(() => {
          this.setState({ ready: true });
        }, 1);
      }
    );
  }

  myfunction = async (doc) => {
    let blobPDF = await pdf(doc).toBlob();
    var file = new File([blobPDF], "filename.pdf", {
      type: blobPDF.type,
    });

    var form = new FormData();
    form.append("idD", this.props.driver.Id);
    form.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    form.append("file", file);
    this.props.upload(form);

    // var input = file;
    // var nameFile = input.name.substr(-4);
    // console.log("input: ", input);
    // // if (input) {
    // var reader = new FileReader();
    // var pdfd = "";
    // reader.onload = (file) => {
    //   pdfd = base64ToByteArray2(file.result);
    //   console.log("namefile: ", nameFile);
    //   if (nameFile === ".pdf") {
    // var dmv = new FormData();
    // dmv.append("idD", this.props.driver.Id);
    // dmv.append("idCompany", JSON.parse(localStorage.getItem("idCompany")));
    // dmv.append("file", pdfd);
    // this.props.upload(dmv);
    //     // document.getElementById("error").style.display = "none";
    //     // this.setState({ File: pdf });
    //   }
    //   // else {
    //   //   document.getElementById("error").style.display = "inline-block";
    //   //   this.setState({ File: "" });
    //   // }
    // };

    // try {
    //   this.setState({ fileName: input.files[0].name });
    //   reader.readAsDataURL(input.files[0]);
    // } catch (error) {}
    // }

    // this.setState({ DescriptionDoc: "", File: [], fileName: undefined });
  };

  render() {
    const firma = `https://bluagent-files.s3.us-west-2.amazonaws.com/${this.props.company.Id}/Drivers/${this.props.driver.Id}/DriverSignature/signature.png`;
    const { ready } = this.state;

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
      signature: {
        width: "200px",
      },
    });

    let formattedDate = "";
    if (this.props.driver.HiringDate !== undefined) {
      formattedDate = this.props.driver.HiringDate.substr(0, 10);
    }
    // const signatureAgreement = (idCompany, idDriver) => (
    //   // console.log("Datos del link del usuario:", {
    //   //   Company: idCompany,
    //   //   Driver: idDriver,
    //   //   props: props,
    //   // }),
    //   <div>
    //     <h4 className="mt-4">
    //       {"Driver name: "}
    //       {this.props.driver.Name} {this.props.driver.LastName}
    //     </h4>
    //     <h4 className="mt-4">
    //       {"Driver License #: "}
    //       {this.props.driver.License}
    //     </h4>
    //     {this.props.driver.FileSignature !== null ? (
    //       <img
    //         src={`https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${idDriver}/DriverSignature/signature.png`}
    //       />
    //     ) : (
    //       <img src={NoSignature} />
    //     )}

    //     <h4 className="mt-4">
    //       {"Date of signature: "}
    //       {formattedDate}
    //     </h4>
    //   </div>
    // );

    const MyDocumentPDF = (
      <Document>
        <Page size="A4" style={style.page}>
          <View style={style.section}>
            <Text style={style.titleAgreement}>
              Pre-Employment Drug Testing Policy
            </Text>
            <Text style={style.textContent}>
              PURPOSE:
              {"\n"}
              The purposes of this policy are to provide a safe and productive
              working environment, to prevent accidents, injuries and property
              damage which may result from drug abuse, and to protect vulnerable
              clients who are dependent on public services.
              {"\n\n"}
              SCOPE: This policy covers applicants for all positions which have
              met the standards identified in Appendix A, including applicants
              for temporary and seasonal positions, part-time working less than
              half time, limited term, and non-represented employees on
              employment agreements. The master list of the actual positions
              which are eligible for pre-employment drug testing will be kept in
              the Department of Employee Services. This policy does not apply to
              current employees who are internal applicants for open positions.
              {"\n\n"}
              POLICY STATEMENT:
              {"\n"}
              {this.props.company.LegalName} is committed to a workplace which
              is free from the effects of unauthorized drug use. Unauthorized
              drug use may pose serious risks to the user and his or her
              colleagues, as well as to the public we serve. Therefore,
              {this.props.company.LegalName}
              has chosen to conduct pre-employment screening to prevent the
              hiring of individuals whose unauthorized use of drugs creates a
              potential for impaired or unsafe job performance.
              {"\n"}
              Applicants for jobs which meet the standards identified in
              Appendix A will undergo screening for the presence of illegal
              drugs as a condition for employment. Applicants will be required
              to submit to a urinalysis test at a laboratory of{" "}
              {this.props.company.LegalName}.{"\n\n"}
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
              substituted or adulterated, will disqualify the applicant for the
              offered position.
              {"\n\n"}A negative dilute result is unsatisfactory on a
              pre-employment test.
              {"\n"}
              Applicants will be given one additional opportunity to provide a
              valid specimen. The result of the second test will determine
              whether the applicant is eligible for employment.
              {"\n"}A person who receives any of the following results on the
              drug test is not eligible to be hired, and is disqualified from
              consideration from
              {this.props.company.LegalName}
              for a period of twenty-four (24) months from the date of the test
              result:
              {"\n"}
            </Text>
            <Text style={style.jump}></Text>
            <Text style={style.list}>• verified “positive”,</Text>
            <Text style={style.list}>• second "negative dilute",</Text>
            <Text style={style.list}>
              • second sample outside the allowed temperature range,
            </Text>
            <Text style={style.list}>
              • “cancelled—invalid result” where the donor’s explanation is not
              accepted by the MRO,
            </Text>
            <Text style={style.list}>• verified “adulterated”,</Text>
            <Text style={style.list}>• verified “substituted”.</Text>
            <Text style={style.textContent}>
              Medical Marijuana
              {"\n"}
              Marijuana is a Class I controlled substance; its use is illegal
              under federal law. Although California law (§ 11362.5(b) (1) (A)
              and (d) (1996)) exempts from criminal prosecution in state court
              those individuals who obtain a “registry identification card” from
              the California Department of Human Services, based on a statement
              from their attending physician that the individual has a
              “debilitating medical condition”, this is not an acceptable
              explanation for a positive drug test under this Policy.
              {"\n"}
              The Medical Review Officer (MRO) will automatically verify such
              tests as positive.
              {"\n\n"}
              Costs of Testing
              {"\n"}
              {this.props.company.LegalName}
              will pay for all pre-employment drug tests.
              {"\n\n"}
              Drug Testing Procedures
              {"\n"}
              Urine specimen collection for drug testing will be performed by
              qualified individuals in conformance with current standards of
              practice, using chain of custody procedures as described by United
              States Department of Transportation (DOT) regulations (49 CFR Part
              40) and with respect for the privacy and dignity of the person
              giving the specimen.
              {"\n\n"}
              Drug test specimens will be collected to provide at least 45 ml of
              urine. If an applicant is unable to provide an adequate volume of
              urine on the first attempt (“shy bladder”), he/she will have an
              opportunity to drink up to 40 ounces of fluids within three hours.
              At the end of this period, if a sample of adequate volume has not
              been provided, the test will be cancelled. A retest will be
              allowed if the applicant provides a medical evaluation from a
              licensed physician, acceptable to the{" "}
              {this.props.company.LegalName} who has expertise in the medical
              issues raised by the applicant's failure to provide a sufficient
              specimen.
              {"\n\n"}
              The collector will check the temperature of the specimen upon
              receiving it from the applicant. The acceptable temperature range
              is 90 - 100 degrees Fahrenheit. If the specimen is outside the
              acceptable range, the applicant will begin a second unobserved
              collection. If the second specimen is also outside the acceptable
              range, the applicant will be disqualified. If within range, the
              second specimen will be tested at the lab.
              {"\n"}
              Only laboratories certified by the Substance Abuse and Mental
              Health Services Administration (SAMHSA) of the U.S. Department of
              Health and Human Services will perform drug testing.
              {"\n\n"}
              When an initial screening test for drugs is positive, a second,
              confirmatory test will automatically be performed. Confirmed
              positive drug tests will be reported by the testing laboratory to
              the MRO for verification (see “Drug Test Results Review”).
              {"\n\n"}
              Drug Test Results Review.
              {"\n"}
              Drug test results of an applicant which are reported as positive,
              adulterated, or Substituted by the testing laboratory will be
              reviewed and verified by the Medical Review Officer (MRO). A
              POSITIVE drug test result is defined as the detection of any one
              or more of the Substances listed in the table shown below.
              {"\n\n"}
            </Text>
            <Image src={logo} />
            <Text style={style.textContent}>
              A confirmed positive test from a certified laboratory does not
              automatically identify an employee or applicant as being in
              violation of this policy. The MRO brings detailed knowledge of
              possible alternate medical explanations to his/her review of the
              test results. This review is performed by the MRO prior to the
              transmission of results to
              {this.props.company.LegalName}.{"\n\n"}
              Medical Review Officer Reporting Options:
              {"\n"}
            </Text>
            <Text style={style.jump}></Text>
            <Text style={style.list}>• “Negative” - self explanatory</Text>
            <Text style={style.list}>
              • “Negative Dilute” - Upon receipt of a “negative dilute,” the
              applicant shall be required to provide another specimen as soon as
              possible.
            </Text>
            <Text style={style.list}>
              • “Canceled - Test Not Performed, Fatal Flaw (with flaw stated) or
              Uncorrected Flaw.” A canceled drug test is neither positive nor
              negative and no consequences are attached to it. The applicant
              will be given the opportunity to take a second test.
            </Text>
            <Text style={style.list}>
              • “Cancelled - Invalid Result.” An “invalid result” means the
              laboratory was unable to obtain a valid result when attempting to
              test the specimen. If the MRO has accepted the donor's explanation
              as to why the laboratory was unable to obtain a valid result, then
              the MRO will notify the County and a retest will be allowed. If
              the MRO has not accepted the donor's explanation, the MRO will
              notify
              {this.props.company.LegalName}
              and the applicant will be disqualified.
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
              substituted specimen without interviewing the applicant under the
              following circumstances:
            </Text>
            <Text style={style.jump}></Text>
            <Text style={style.list}>
              • The applicant expressly declines the opportunity to discuss the
              test with the MRO;
            </Text>
            <Text style={style.textContent}>
              {this.props.company.LegalName}
              has successfully made and documented a contact with the applicant,
              and has asked the applicant to contact the MRO, and more than 72
              hours have passed since {this.props.company.LegalName}
              contacted the applicant.
              {"\n"}
              NOTE: If a test is verified positive under the latter
              circumstances, the donor may give the MRO information documenting
              that serious illness, injury, or other circumstances unavoidably
              prevented him/her from contacting the MRO. On the basis of this
              information, the MRO may re-open the verification, allowing the
              donor to present information concerning a legitimate explanation
              for the positive test. If the MRO concludes that there is a
              legitimate explanation, the MRO shall verify the test as negative.
              {"\n\n"}
              Communication of Results
              {"\n"}
              The MRO or his/her designated representative will report test
              results ONLY to the Designated Employer Representative (DER).
              Confidentiality will be strictly maintained. If the result is
              positive, the MRO or his/her authorized representative will report
              the identity of the controlled substance.
              {"\n"}
              Applicants may obtain copies of their test results by requesting
              them in writing from the MRO within 60 days of being notified of
              the results.
              {"\n\n"}
              Record Keeping Procedures
              {"\n"}
              {this.props.company.LegalName}
              DER will maintain pre-employment drug testing records in a secure
              filing system with information available only on a “need to know”
              basis for a period of two years.
              {"\n\n"}
              Definition of Terms
              {"\n\n"}
              Adulterated Specimen: A specimen that contains a substance that is
              not expected to be present in human urine, or contains a substance
              expected to be present but is at a concentration so high that it
              is not consistent with human urine.
              {"\n\n"}
              CFR: United States Code of Federal Regulations.
              {"\n\n"}
              Cadena de custodia: Procedures to account for the integrity of
              each urine specimen by tracking its handling and storage from
              point of specimen collection to final disposition of the specimen.
              These procedures shall require that an appropriate drug testing
              custody form from a Department of Health and Human Services
              (DHHS), Substance Abuse and Mental Health Services Administration
              (SAMHSA) certified laboratory be used from time of collection to
              receipt by the laboratory.
              {"\n\n"}
              Collection Site: A designated clinic/facility where applicants or
              employees may present themselves for the purpose of providing a
              specimen of their urine to be analyzed for the presence of drugs.
              {"\n\n"}
              Collector: A person who instructs and assists applicants and
              employees through the urine specimen collection process.
              {"\n\n"}
              Confirmation Test: A second analytical drug testing procedure to
              identify the presence of a specific drug or metabolite which is
              independent of the initial test and which uses a different
              technique and chemical principle from that of the initial test in
              order to ensure reliability and accuracy. Gas chromatography/mass
              spectrometry (GC-MS) is the only authorized confirmation method
              for DOT mandated drug testing.
              {"\n\n"}
              Controlled Substances: Substances listed on Schedules I through V
              in 21 U.S.C. 802 as they may be revised from time to time (21 CFR
              1308). Controlled substances include illicit drugs and drugs which
              may be authorized for use by a physician or dentist for certain
              medical uses, but which are subject to misuse or abuse.
              {"\n\n"}
              {this.props.company.LegalName}: Employer
              {"\n\n"}
              Designated Employer Representative (DER): An employee authorized
              by the employer to manage and make decisions in the testing and
              evaluation processes. The DER also receives test results and other
              communications for the employer and communicates test results to
              individual departments.
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
              osteopathy with knowledge of drug abuse disorders and drug testing
              who is responsible for reviewing and verifying drug testing
              results prior to their communication to the Designated Employer
              Representative.
              {"\n\n"}
              Negative Drug Test: A test in which initial or confirmation
              testing did not show evidence of a prohibited drug in an
              applicant's system above established levels; OR, a test which is
              verified as negative by the MRO (e.g. review showed positive test
              was due to prescription medication or other authorized use of
              controlled substance).
              {"\n\n"}
              Positive Drug Test: A urine drug test result which indicates the
              presence of controlled Substances beyond the cut-off levels.
              {"\n\n"}
              Confirmed Positive Drug Test: A positive drug test which has
              undergone an initial “screening” test AND a confirmation test
              which validates the first result. Drug tests are confirmed by the
              SAMHSA certified laboratory which performs the analyses.
              {"\n\n"}
              Verified Positive Drug Test: A confirmed positive drug test (see
              above) after investigation by the MRO, who has determined that no
              legitimate explanation exists for the presence of the controlled
              substance that was detected.
              {"\n\n"}
              Prohibited Drugs: Marijuana, cocaine, opiates, phencyclidine
              (PCP), and amphetamines.
              {"\n\n"}
              Refusal to Submit: Refusal by an individual to provide a urine
              specimen.
              {"\n\n"}
              SAMHSA: Substance Abuse and Mental Health Services Administration,
              a division of the US Department of Health and Human Services
              (DHHS) which is responsible for certifying laboratories to perform
              federal workplace drug testing.
              {"\n\n"}
              Screening or Initial Test: Immunoassay screen to eliminate
              “negative” urine specimens from further consideration.
              {"\n\n"}
              Substituted Specimen: A specimen with creatinine and specific
              gravity values that are so diminished that they are not consistent
              with human urine.
              {"\n\n"}
              Appendix A:
              {"\n"}
              The following standards are applied in evaluating whether a job
              title and/or classification can be approved for pre-employment,
              post-offer drug testing. Additions or deletions to the list of job
              titles and/or classifications eligible for pre-employment drug
              testing can be made by request from the affected Department
              Supervisor or designee to the Supervisor of Employee Services. To
              be included on the list, the applicant's typical daily activities
              must include duties such as:
              {"\n"}
              Employees covered by United States Department of Transportation.
              Regulations, 49 Code of Federal Regulations (CFR) Part 40 and Part
              382. I have read in full and understand the above statements and
              conditions of employment Applicants Signature Date Driver's
              License information: CDL Number State.
              {"\n\n\n\n\n"}
              Drug and Alcohol Policy & Information
              {"\n"}
              {this.props.company.LegalName}
              is committed to providing a safe workplace for its employees, and
              the company is also committed to placing safe, professional
              drivers in its vehicles. We intend our workplace to be drug free,
              and that employees will be free from the effects of alcohol while
              on duty. A critical part of the company's program is compliance
              with the Federal Motor Carrier Safety Regulations, CFR 49, Part
              382. The following information is provided in accordance with Part
              382.601:
              {"\n\n"}
              The following information is provided in accordance with Part
              382.601:
              {"\n"}
              Designated Employer Contact
              {this.props.company.Der}
              is the company's designated person for providing information on
              the controlled substances program. Questions should be directed to
              him at {this.props.user.PhoneNumber}.{"\n"}
              Categories Subject to Testing: All vehicle drivers who hold a
              Commercial Driver License, who work part time or full time for{" "}
              {this.props.company.LegalName}
              are subject to the controlled substance testing provisions in Part
              382.
              {"\n\n"}
              Safety Sensitive Functions
              {"\n"}
              All drivers are considered to be performing safety sensitive
              functions during any period in which they are actually performing,
              ready to perform, or immediately available to perform as a driver
              of a commercial motor vehicle.
              {"\n\n"}
              These functions are further defined as:
            </Text>
            <Text style={style.jump}></Text>
            <Text style={style.list}>
              • Time at a terminal, facility or other property waiting to be
              dispatched.
            </Text>
            <Text style={style.list}>
              • Time inspecting equipment as required, or servicing/conditioning
              a motor vehicle.
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
              • Time spent performing driver requirements relating to accidents.
            </Text>
            <Text style={style.list}>
              • Time spent repairing, obtaining assistance or remaining in
              attendance upon a disabled Vehicle.
            </Text>
            <Text style={style.list}>
              • Time spent providing a breath or urine sample in compliance with
              the requirements of Part 382.
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
              use alcohol for eight hours following the accident, or until he or
              she undergoes a post-accident alcohol test, whichever occurs
              first.
            </Text>
            <Text style={style.list}>
              • No driver shall refuse to submit to a post-accident; random;
              reasonable suspicion; or follow-up, alcohol or controlled
              substances test.
            </Text>
            <Text style={style.list}>
              • No driver shall report for duty or remain on duty when the
              driver uses any controlled substance. An exception is when the use
              of the controlled substance is pursuant to the instructions of a
              physician who has advised the driver that the substance does not
              adversely affect the driver's ability to safely operate a
              commercial motor vehicle. (The employer may require a driver to
              inform the employer of any therapeutic drug use.) Note: the use of
              another individual's prescription medicine may be considered
              prohibited controlled substance use.
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
              performed. In order for the driver to be allowed to perform safety
              sensitive functions, a negative result for controlled substances
              and an alcohol concentration of less than 0.02 will be necessary.
              (A concentration between 0.02 and 0.039 will result in a 24 hour
              disqualification). A concentration of 0.04 will result in a
              positive test.
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
              • Random - administered if a driver's name is selected in a random
              drawing, conducted periodically throughout the year. Drivers
              notified of a random selection must submit immediately for
              testing.
            </Text>
            <Text style={style.list}>
              • Reasonable suspicion - administered if the employer has
              reasonable suspicion to believe the driver is in violation of any
              of the prohibitions listed above.
            </Text>
            <Text style={style.list}>
              • Return to duty - Administered prior to a driver returning to
              duty, following a “positive” controlled substances or alcohol
              test. We must also administer a return to duty test if a driver is
              disqualified from the random pool for any reason, and then
              re-enters the random pool.
            </Text>
            <Text style={style.list}>
              • Follow-up - If a driver has refused to test or tested positive,
              and wishes to be re-qualified to perform safety sensitive
              functions, he/she must be counseled by a Substance Abuse
              Professional (SAP), follow the recommended program, and then
              produce a negative “Return to Duty” test result. The SAP will then
              direct the company to administer a minimum of six “Follow-up”
              tests in the next 12 months. This number may be increased by the
              SAP. The company will select the times for the follow-up tests.
            </Text>
            <Text style={style.textContent}>
              Testing Procedures
              {"\n"}
              All testing will be performed with procedures that are outlined in
              the Code of Federal Regulations, Part 40. These procedures are
              designed to protect the driver, maintain integrity in the testing
              process and safeguard the validity of the test results.
              {"\n\n"}
              Consequences of Prohibited Conduct
              {"\n"}
              Any driver who engages in conduct prohibited by Part 382 will be
              immediately removed from performing any safety sensitive function.
              In addition, the driver will be subject to termination from
              his/her employment with
              {this.props.company.LegalName}. Under the company's current
              policy, the driver who tests positive will be offered a “once per
              lifetime” last chance to be reinstated. The reinstatement will be
              subject to the driver submitting to a treatment needs assessment
              by an authorized Substance Abuse Professional, and following and
              completing the recommended treatment. In addition, the driver will
              be required to submit to a Return to Duty controlled substance
              and/or alcohol test.
              {"\n\n"}
              Refusal to Test
              {"\n"}
              If any driver refuses to test under the conditions outlined in
              Part 382, the refusal will be treated as a positive result, and
              will be subject to consequences of a positive test.
              {"\n\n"}
              Information
              {"\n"}
              The following pages contain information regarding the symptoms and
              effects of the use of alcohol and controlled substances. All
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
              hours; stays in, System for several days/weeks; Strong odor, like
              burning rope stored in fat tissue cells, Loud, boisterous in early
              stages Smoked or taken orally, Sleepy, stuporous in later stages
              causes euphoria; increased appetite; disoriented behavior; relaxed
              inhibitions; negative effect on peripheral vision, Overdose can
              cause fatigue; paranoia; not fatal.
              {"\n\n"}
              Physical Symptoms Uses and Effects
              {"\n\n"}
              Cocaine
              {"\n"}
              Runny nose; nasal problems May be used as a local anesthetic,
              Needle marks on arms highly addictive, Dizziness Effect lasts 1-2
              hours, Dilated pupils Sniffed, smoked or injected, Dry mouth and
              nose increased alertness; euphoria; excitation; increased pulse
              and blood pressure; insomnia; loss of appetite, Bad breath;
              frequent lip licking Overdose can cause agitation; hallucination;
              convulsions; possible death Lack of interest in food and sleep.
              {"\n\n\n\n\n"}
              Opiates
              {"\n"}
              Drowsiness; lethargy Used as pain killer; cough medicine, Slurred
              speech highly addictive (codeine is moderately addictive),
              Constricted pupils Effect lasts 3-6 hours, Needle scars Sniffed,
              injected, smoked, taken orally, Loss of appetite Causes euphoria;
              drowsiness; nausea, Nausea; flushed face Overdose can cause slow,
              shallow breathing; clammy skin; convulsions; possible death.
              {"\n\n"}
              PCP
              {"\n"}
              Increased heart rate/blood pressure No medical uses, Flushing,
              sweating, dizziness, highly addictive; effect lasts several
              numbness, drowsiness days, Pupils dilated Smoked, injected, taken
              orally, Rigid muscles, deadened actions Causes illusions;
              hallucinations, Symptoms of intoxication Overdose may cause more
              intense without smell of alcohol trips; possible death.
              {"\n\n"}
              Physical Symptoms Uses and Effects Amphetamines.
              {"\n"}
              Increased heart and breathing Used for weight control; to treat
              rates narcolepsy; attention deficit disorder. High blood pressure;
              high fever highly addictive, Dilated pupils Effect lasts 2-4
              hours, Decreased appetite; dry mouth Injected or taken orally,
              Sweating; headache; blurred Increased alertness, pulse, and blood
              vision; dizziness pressure; insomnia; loss of appetite; euphoria;
              excitation, Unable to sleep Overdose may cause agitation;
              convulsions; possible death.
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
              Driver name: {this.props.driver.Name} {this.props.driver.LastName}
            </Text>
            <Text style={style.textContent}>
              Driver License: {this.props.driver.License}
            </Text>
            <Text style={style.textContent}>
              Date of signature: {formattedDate}
            </Text>
            <Text style={style.textContent}>signature:</Text>
            <Image src={firma} style={style.signature} />
          </View>
        </Page>
      </Document>
    );

    return (
      <div>
        {this.props.driver.FileSignature !== null ? (
          // <PDFDownloadLink
          //   document={MyDocumentPDF}
          //   fileName={"PDF Agreement -"}
          // >
          //   <div className="text-center">
          //     <Button
          //       className="text-white px-5 py-2 btn btn-success"
          //       // onClick={() => this.setState({ ready: false })}
          //     >
          //       Download PDF
          //     </Button>
          //   </div>
          // </PDFDownloadLink>

          <div className="text-center">
            <Button
              className="text-white px-5 py-2 btn btn-success"
              onClick={() => this.myfunction(MyDocumentPDF)}
            >
              GENERATE DRUG TESTING POLICY
            </Button>
          </div>
        ) : (
          <Alert
            style={{
              backgroundColor: "#dff0fe",
              borderLeft: "4px solid #dff0fe",
              borderColor: "#4788c7",
              color: "#4788c7",
              padding: "15px 20px",
            }}
          >
            Notice: <i className="fas fa-exclamation-circle"></i> the driver's{" "}
            <strong>signature </strong> is NOT registered
          </Alert>
        )}

        {/* <div className="text-center">
          <Button
            className="buttons-royal text-white px-5 py-2 btn"
            onClick={() => this.toggle()}
          >
            Generate Drug Testing Policy PDF
          </Button>
        </div> */}
      </div>
    );
  }
}
