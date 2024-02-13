import img from "../../../assets/img/brand/MIS1.jpg";
import img2 from "../../../assets/img/brand/MIS2.jpg";
import { jsPDF } from "jspdf";
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap";
import Loading from "../../../components/Loading";
import React, { useState, useEffect, Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/AccountSettings";

const id = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = JSON.parse(localStorage.getItem("idCompany"));

function uploadFile(files, props) {
  var form = new FormData();
  form.append("files", files);
  form.append("id", props.idUser);
  form.append("docType", "MISReport");
  form.append("idAccident", 0);
  props.uploadDoc(form);
}

const PDFmis = (props, url) => {


  useEffect(() => {
    props.getCompanyNotifications(idCompany);
  }, []);

  var ln = false;
  var dban = false;
  var bP = false;
  var pA = false;
  var empty = false;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [dis, setDis] = useState(false);
  const toggleDis = () => setDis(true);

  var ValidationMIS = props.props.props.ValidationMIS;
  const actualDate = new Date();
  const actualYear = new Date().getFullYear() - 1;
  var isDownload = false;

  // console.log("variables para ver si faltan datos", ln, dban, bP, pA, empty);
  const DataMIS = props.props.props.CompanyData[0];

  const QuantityDrivers = props.props.props.QuantityDrivers.toString();
  const MIS = props.props.props.MISCollectionReport;
  var random = 0;
  var pre = 0;

  if (DataMIS.PhysicalAddress == null || DataMIS.PhysicalAddress == null) {
    pA = true;
    empty = true;
  }

  if (DataMIS.PhoneNumber == null || DataMIS.PhoneNumber == null) {
    bP = true;
    empty = true;
  }

  if (DataMIS.LegalName == null || DataMIS.LegalName == null) {
    ln = true;
    empty = true;
  }
  if (DataMIS.DbaName == null || DataMIS.DbaName == null) {
    dban = true;
    empty = true;
  }

  function genPDF(isDownload) {
    // toggleDis();
    ValidationMIS = true;
    const jsPDF = require("jspdf");
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      // format: "a4",
      format: [1675, 2250],
    });
    // doc.internal.scaleFactor = 30;
    const misImage1 = new Image();
    const misImage2 = new Image();
    misImage1.src = img;
    misImage2.src = img2;
    // var dbaName = "NA";

    var legalName = "";
    var dbaName = "";
    var pn_CL = "";
    var pn_Number = "";
    var phoneNumber = "NA";
    var physicalAddres = "NA";

    if (DataMIS.PhysicalAddress == null) {
      physicalAddres = "Empty";
      pA = true;
    } else {
      physicalAddres = DataMIS.PhysicalAddress;
    }

    if (DataMIS.PhoneNumber == null) {
      phoneNumber = "0000000000";
      pn_CL = "Empty";
      pn_Number = "Empty";
      bP = true;
    } else {
      phoneNumber = DataMIS.PhoneNumber;
      pn_CL = phoneNumber.slice(3, 5);
      pn_Number = phoneNumber.slice(6);
    }

    if (DataMIS.LegalName == null) {
      legalName = "EMPTY";
      ln = true;
    } else {
      legalName = DataMIS.LegalName;
    }

    if (DataMIS.DbaName == null) {
      dbaName = "EMPTY";
      dban = true;
    } else {
      dbaName = DataMIS.DbaName;
    }

    const ourName = "BluAgent Technologies";

    const email = DataMIS.Email;

    const baPhoneNumber = "US +1 (619) 878-5852";
    const allEmployeeCategory = QuantityDrivers.toString();
    const pn_CLBA = baPhoneNumber.slice(3, 5);
    const pn_BANumber = baPhoneNumber.slice(6);
    const dot = DataMIS.Dot;
    const totalTable1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const totalTable2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    //////////////////////////////////TABLA 1//////////////////////
    const totalTestResults = [0, 0, 0, 0, 0, 0];
    const verifiedNegativeResult = [0, 0, 0, 0, 0, 0];
    const verifiedPositiveResults1omore = [0, 0, 0, 0, 0, 0];
    const positiveForMariguana = [0, 0, 0, 0, 0, 0];
    const positiveForCocaine = [0, 0, 0, 0, 0, 0];
    const positiveForPCP = [0, 0, 0, 0, 0, 0];
    const positiveForOpiates = [0, 0, 0, 0, 0, 0];
    const positiveForAmphetamines = [0, 0, 0, 0, 0, 0];
    const adulterated = [0, 0, 0, 0, 0, 0];
    const substituted = [0, 0, 0, 0, 0, 0];
    const noMedicalExplanation = [0, 0, 0, 0, 0, 0];
    const otherRefusualsToSubmitToTesting = [0, 0, 0, 0, 0, 0];
    const drugCanceledResults = [0, 0, 0, 0, 0, 0];

    /////////////////////////////TABLE 2/////////////////////////////
    const totalNumberOfScreeningTestResult = [0, 0, 0, 0, 0, 0];
    const screeningTestResultsBelow = [0, 0, 0, 0, 0, 0];
    const screeningTestResultsGreater = [0, 0, 0, 0, 0, 0];
    const numberOfConfirmationTestResult = [0, 0, 0, 0, 0, 0];
    const confirmationTestResult_0_02 = [0, 0, 0, 0, 0, 0];
    const confirmationTestResult_0_04 = [0, 0, 0, 0, 0, 0];
    const shyLung = [0, 0, 0, 0, 0, 0];
    const OtherRefusalToSubmit = [0, 0, 0, 0, 0, 0];
    const alcoholCanceledResult = [0, 0, 0, 0, 0, 0];

    for (var x = 0; x < MIS.length; x++) {
      if (MIS[x].TypeTestCompliance == "Drug") {
        switch (MIS[x].ReasonCompliance) {
          case "Pre-employment":
            totalTestResults[0] += 1;
            FilterMISResult(MIS[x], 0);
            FilterMISStatus(MIS[x], 0);

            break;
          case "Random":
            totalTestResults[1] += 1;
            FilterMISResult(MIS[x], 1);
            FilterMISStatus(MIS[x], 1);

            break;
          case "Post Accident":
            totalTestResults[2] += 1;
            FilterMISResult(MIS[x], 2);
            FilterMISStatus(MIS[x], 2);

            break;
          case "Reasonable Suspicion/Cause":
            totalTestResults[3] += 1;
            FilterMISResult(MIS[x], 3);
            FilterMISStatus(MIS[x], 3);

            break;
          case "Return to Duty":
            totalTestResults[4] += 1;
            FilterMISResult(MIS[x], 4);
            FilterMISStatus(MIS[x], 4);

            break;
          case "Follow-Up":
            totalTestResults[5] += 1;
            FilterMISResult(MIS[x], 5);
            FilterMISStatus(MIS[x], 5);
            break;
        }
      } else {
        switch (MIS[x].ReasonCompliance) {
          case "Pre-employment":
            totalNumberOfScreeningTestResult[0] += 1;
            FilterMISStatus(MIS[x], 0);
            FilterMISScreening(MIS[x], 0);

            FilterMISAlcohol(MIS[x], 0);
            break;
          case "Random":
            totalNumberOfScreeningTestResult[1] += 1;
            FilterMISStatus(MIS[x], 1);
            FilterMISScreening(MIS[x], 1);

            FilterMISAlcohol(MIS[x], 1);
            break;
          case "Post Accident":
            totalNumberOfScreeningTestResult[2] += 1;
            FilterMISStatus(MIS[x], 2);
            FilterMISScreening(MIS[x], 2);

            FilterMISAlcohol(MIS[x], 2);
            break;
          case "Reasonable Suspicion/Cause":
            totalNumberOfScreeningTestResult[3] += 1;
            FilterMISStatus(MIS[x], 3);
            FilterMISScreening(MIS[x], 3);

            FilterMISAlcohol(MIS[x], 3);
            break;
          case "Return to Duty":
            totalNumberOfScreeningTestResult[4] += 1;
            FilterMISStatus(MIS[x], 4);
            FilterMISScreening(MIS[x], 4);

            FilterMISAlcohol(MIS[x], 4);
            break;
          case "Follow-Up":
            totalNumberOfScreeningTestResult[5] += 1;
            FilterMISStatus(MIS[x], 5);
            FilterMISScreening(MIS[x], 5);

            FilterMISAlcohol(MIS[x], 5);
            break;
        }
      }
    }

    //#region Filter DrugTest
    function FilterMISResult(MIS, Coord) {
      if (MIS.Result == "Negative") {
        verifiedNegativeResult[Coord] += 1;
      } else if (MIS.Result == "Positive") {
        FilterMISDrug(MIS, Coord);
        verifiedPositiveResults1omore[Coord] += 1;
      } else if (MIS.Result == "Refusal to Test - Adultered") {
        adulterated[Coord] += 1;
      } else if (MIS.Result == "Refusal to Test - Substituted") {
        substituted[Coord] += 1;
      } else if (MIS.Result == "Negative - Diluted") {
        noMedicalExplanation[Coord] += 1;
      } else if (MIS.Result == "Refusal to Test - Other") {
        otherRefusualsToSubmitToTesting[Coord] += 1;
      }
    }

    /* Cambiar cuando conozcamos como se
    llamaran los valores del campo PositiveFor*/
    function FilterMISDrug(MIS, coord) {
      const positiveDrugs = SplitString(MIS);
      for (var x = 0; x < positiveDrugs.length; x++) {
        if (positiveDrugs[x] == "Marijuana") {
          positiveForMariguana[coord] += 1;
        } else if (positiveDrugs[x] == "Cocaine") {
          positiveForCocaine[coord] += 1;
        } else if (positiveDrugs[x] == "PCP") {
          positiveForPCP[coord] += 1;
        } else if (positiveDrugs[x] == "Opiates") {
          positiveForOpiates[coord] += 1;
        } else if (positiveDrugs[x] == "Amphetamines") {
          positiveForAmphetamines[coord] += 1;
        }
      }
    }

    function SplitString(MIS) {
      const str = MIS.PositiveFor;
      const words = str.split(",");
      return words;
    }

    //#endregion

    /*
      Por el momento el Status lo estamos comparando
      con null para ver el filtrado de datos pero en
      el futuro cambiar la comparacion a los Status
      'Canceled'
    */
    function FilterMISStatus(MIS, coord) {
      if (MIS.SDTStatus == "Canceled" && MIS.TypeTestCompliance == "Drug") {
        drugCanceledResults[coord] += 1;
      }
      if (MIS.SATStatus == "Canceled" && MIS.TypeTestCompliance == "Alcohol") {
        alcoholCanceledResult[coord] += 1;
      }
    }

    /*
    Agregar a la vista en la base de datos
    la columna IssuesCollection donde vendran
    los campos para los Refusal
    */
    function FilterMISAlcohol(MIS, coord) {
      if (MIS.ResultAlcoholTest == "“Shy Lung” With No Medical Explanation") {
        shyLung[coord] += 1;
      } else if (
        MIS.ResultAlcoholTest == "Refusal to sign" ||
        MIS.ResultAlcoholTest == "Initial Vial Refusal" ||
        MIS.ResultAlcoholTest == "Insufficient Sample"
      ) {
        OtherRefusalToSubmit[coord] += 1;
      }
    }

    function FilterMISScreening(MIS, coord) {
      if (MIS.AlcoholResult < 0.02) {
        screeningTestResultsBelow[coord] += 1;
      } else if (MIS.AlcoholResult >= 0.02) {
        FilterMISAlcoholConfirm(MIS, coord);
        screeningTestResultsGreater[coord] += 1;
      }
    }

    function FilterMISAlcoholConfirm(MIS, coord) {
      if (MIS.ConfirmationTest >= 0.02 && MIS.ConfirmationTest <= 0.039) {
        confirmationTestResult_0_02[coord] += 1;
        numberOfConfirmationTestResult[coord] += 1;
      } else if (MIS.ConfirmationTest >= 0.04) {
        confirmationTestResult_0_04[coord] += 1;
        numberOfConfirmationTestResult[coord] += 1;
      }
    }

    doc.addImage(misImage1, "JPEG", 0, 0, 1275, 1650);

    doc.setTextColor("Black");
    doc.setFontSize(25);
    doc.text(actualYear.toString(), 755, 76);
    doc.text(legalName, 225, 120);
    doc.text(dbaName, 460, 154);
    doc.text(physicalAddres, 158, 186);
    doc.text(email, 980, 186);
    doc.text(ourName, 316, 218);
    doc.text(ourName, 750, 218);
    doc.text(pn_CL, 191, 251);
    doc.text(pn_Number, 250, 251);
    doc.text(actualDate.toDateString(), 728, 251);
    doc.text(ourName, 440, 315);
    doc.text(pn_CLBA, 928, 315);
    doc.text(pn_BANumber, 993, 315);
    doc.text(dot, 456, 358);
    // Agregue lo subrayado de Owner-Operator
    if (DataMIS.Title == "OWNER-OPERATOR") {
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 0);
      doc.roundedRect(802, 343, 42, 20, 3, 3, "FD");
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 0);
      doc.roundedRect(1095, 343, 42, 20, 3, 3, "FD");
      doc.setFont("times");
      doc.text("YES", 805, 360);
      doc.text("YES", 1098, 360);
    } else {
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 0);
      doc.roundedRect(872, 343, 37, 20, 3, 3, "FD");
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 0);
      doc.roundedRect(1166, 343, 37, 20, 3, 3, "FD");
      doc.setFont("times");
      doc.text("NO", 878, 358);
      doc.text("NO", 1171, 358);
    }
    doc.text(allEmployeeCategory, 1060, 496);
    doc.text("DOT - FMCSA", 185, 625);

    doc.text(allEmployeeCategory, 565, 625);
    doc.text("1", 517, 520);
    doc.text("X", 65, 360);

    for (let y = 0; y < 6; y++) {
      totalTable1[0] += totalTestResults[y];
      totalTable1[1] += verifiedNegativeResult[y];
      totalTable1[2] += verifiedPositiveResults1omore[y];
      totalTable1[3] += positiveForMariguana[y];
      totalTable1[4] += positiveForCocaine[y];
      totalTable1[5] += positiveForPCP[y];
      totalTable1[6] += positiveForOpiates[y];
      totalTable1[7] += positiveForAmphetamines[y];
      totalTable1[8] += adulterated[y];
      totalTable1[9] += substituted[y];
      totalTable1[10] += noMedicalExplanation[y];
      totalTable1[11] += otherRefusualsToSubmitToTesting[y];
      totalTable1[12] += drugCanceledResults[y];
      totalTable2[0] += totalNumberOfScreeningTestResult[y];
      totalTable2[1] += screeningTestResultsBelow[y];
      totalTable2[2] += screeningTestResultsGreater[y];
      totalTable2[3] += numberOfConfirmationTestResult[y];
      totalTable2[4] += confirmationTestResult_0_02[y];
      totalTable2[5] += confirmationTestResult_0_04[y];
      totalTable2[6] += OtherRefusalToSubmit[y];
      totalTable2[7] += shyLung[y];
      totalTable2[8] += alcoholCanceledResult[y];
    }

    ///////////////////////////////////TABLA/////////////////////
    // x = 282, 368, 445, 514, 585, 660, 735, 806, 885, 960, 1030, 1104, 1173
    // y = 894, 935, 971, 1007, 1044, 1081, 1117

    const coorx1 = [
      282,
      368,
      445,
      514,
      585,
      660,
      735,
      806,
      885,
      960,
      1030,
      1104,
      1173,
    ];
    const coory1 = [894, 935, 971, 1007, 1044, 1081];

    for (let y = 0; y < coory1.length; y++) {
      doc.text(totalTestResults[y].toString(), coorx1[0], coory1[y]);
      doc.text(verifiedNegativeResult[y].toString(), coorx1[1], coory1[y]);
      doc.text(
        verifiedPositiveResults1omore[y].toString(),
        coorx1[2],
        coory1[y]
      );
      doc.text(positiveForMariguana[y].toString(), coorx1[3], coory1[y]);
      doc.text(positiveForCocaine[y].toString(), coorx1[4], coory1[y]);
      doc.text(positiveForPCP[y].toString(), coorx1[5], coory1[y]);
      doc.text(positiveForOpiates[y].toString(), coorx1[6], coory1[y]);
      doc.text(positiveForAmphetamines[y].toString(), coorx1[7], coory1[y]);
      doc.text(adulterated[y].toString(), coorx1[8], coory1[y]);
      doc.text(substituted[y].toString(), coorx1[9], coory1[y]);
      doc.text(noMedicalExplanation[y].toString(), coorx1[10], coory1[y]);
      doc.text(
        otherRefusualsToSubmitToTesting[y].toString(),
        coorx1[11],
        coory1[y]
      );
      doc.text(drugCanceledResults[y].toString(), coorx1[12], coory1[y]);
    }
    /////////////////////////////////////TABLA2//////////////////////////////
    //////// Y =  1387, 1423, 1463, 1497, 1537, 1571, 1608
    //////// X = 349, 474, 600, 713, 820, 902, 986, 1060, 1138
    const coorx2 = [349, 474, 600, 713, 820, 902, 986, 1060, 1138];
    const coory2 = [1387, 1423, 1463, 1497, 1537, 1571];

    for (var y = 0; y < coory2.length; y++) {
      doc.text(
        totalNumberOfScreeningTestResult[y].toString(),
        coorx2[0],
        coory2[y]
      );
      doc.text(screeningTestResultsBelow[y].toString(), coorx2[1], coory2[y]);
      doc.text(screeningTestResultsGreater[y].toString(), coorx2[2], coory2[y]);
      doc.text(
        numberOfConfirmationTestResult[y].toString(),
        coorx2[3],
        coory2[y]
      );
      doc.text(confirmationTestResult_0_02[y].toString(), coorx2[4], coory2[y]);
      doc.text(confirmationTestResult_0_04[y].toString(), coorx2[5], coory2[y]);
      doc.text(OtherRefusalToSubmit[y].toString(), coorx2[6], coory2[y]);
      doc.text(shyLung[y].toString(), coorx2[7], coory2[y]);
      doc.text(alcoholCanceledResult[y].toString(), coorx2[8], coory2[y]);
    }

    for (let a = 0; a < coorx1.length; a++) {
      doc.text(totalTable1[a].toString(), coorx1[a], 1117);
    }
    for (let b = 0; b < coorx2.length; b++) {
      doc.text(totalTable2[b].toString(), coorx2[b], 1608);
    }

    doc.addPage();

    doc.addImage(misImage2, "JPEG", 0, 0, 1275, 1650);

    const newName = "MIS Report " + actualYear + " " + dot + ".pdf";
    const pdfdoc = new File([doc.output("blob")], newName, {
      type: doc.output("blob").type,
      lastModified: doc.output("blob").lastModified,
    });

    uploadFile(pdfdoc, props);
    setModal(false);
  }
  return (
    <React.Fragment>
      {props.FirstTime ? (
        <div>
          {props.isLoading ? (
            <Button color="success">
              <Loading />
            </Button>
          ) : (
            props.isLoadingUsDot ? null :
            (<Button
              onClick={toggle}
              color="success"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
              GENERATE
            </Button>)
          )}

          <Modal isOpen={modal} toggle={toggle} className={"modal-success "}>
            <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
            <ModalBody>
              {ln || dban || bP || pA ? (
                <React.Fragment>
                  <p>
                    Attention <i className="fas fa-exclamation-circle"></i>{" "}
                    Missing data to generate the MIS Report, please enter
                    missing data in the company profile.
                  </p>
                  <div />
                  <p>
                    Make shure that the following fields have been completed
                  </p>
                  <ul>
                    {ln ? <li type="disc">Legal Company Name</li> : ""}
                    {dban ? <li type="disc">DBA Name</li> : ""}
                    {bP ? <li type="disc">Business Phone</li> : ""}
                    {pA ? <li type="disc">Physical Address</li> : ""}
                  </ul>
                </React.Fragment>
              ) : (
                <p>
                  Attention <i className="fas fa-exclamation-circle"></i> Are
                  you sure you want to create the MIS Report for the current
                  year? note that once generated you will not be able to change
                  it so make sure the information is correct
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => {
                  genPDF((isDownload = true));
                  props.CloseMIS;
                  props.CompanyNotifications.MIS = true;
                  props.updateCompanyNotifications(
                    idCompany,
                    "MIS",
                    true
                  );
                }}
                disabled={empty}
              >
                OK
              </Button>

              <Button color="danger" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(PDFmis);