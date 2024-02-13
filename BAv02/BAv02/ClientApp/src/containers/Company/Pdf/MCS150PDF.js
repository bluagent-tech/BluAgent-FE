import React from "react";
import ReactDOM from "react-dom";
// import { jsPDF } from "jspdf";
import * as jsPDF from "jspdf";
import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Col,
  Row,
  FormGroup,
  Input,
} from "reactstrap";

//Paginas PDF
import pag9 from "../../../assets/img/brand/MCS150/MCS-150_9.jpg";
import pag10 from "../../../assets/img/brand/MCS150/MCS-150_10.jpg";
import pag11 from "../../../assets/img/brand/MCS150/MCS-150_11.jpg";
import { string } from "prop-types";
import Loading from "../../../components/Loading";
// import { Date } from "core-js";
const idCompany = localStorage["idCompany"];
var prueba = false;

function uploadFile(files, props) {
  var form = new FormData();
  form.append("files", files);
  form.append("id", props.IdUser);
  form.append("docType", "MCS-150");
  form.append("idAccident", 0);
  props.upload(form);
}

function carga() {
  prueba = true;
  <Loading></Loading>;
  setTimeout(() => {
    prueba = false;
  }, 5000);
}

const PdfMCS150 = (props, url) => {
  const ActualDate = new Date();
  const pestana = "MCS";
  const Turn = true;
  // const fecha = ActualDate.toDateString();
  function genPDF() {
    const genPDF = require("jspdf");
    const cdld = props.driverList;
    const cantcdl = [];
    for (let x = 0; x < cdld.length; x++) {
      if (cdld[x].CDL == true) {
        cantcdl[x] += 1;
      }
    }

    var interW = 0;
    var intraW = 0;
    var interB = 0;
    var intraB = 0;

    for (let i = 0; i < cdld.length; i++) {
      if (cdld[i].QuestionWithin == 1 && cdld[i].QuestionInterstate == 1) {
        interW = interW + 1;
      }
      if (cdld[i].QuestionBeyond == 1 && cdld[i].QuestionInterstate == 1) {
        interB = interB + 1;
      }
      if (cdld[i].QuestionWithin == 1 && cdld[i].QuestionIntrastate == 1) {
        intraW = intraW + 1;
      }
      if (cdld[i].QuestionBeyond == 1 && cdld[i].QuestionIntrastate == 1) {
        intraB + intraB + 1;
      }
    }

    const data = props.Company;
    const LegalName = data.LegalName;
    const dba = data.DbaName;
    const streetAddres = data.PhysicalAddress;
    var city = "(EMPTY)";
    if (props.cityName.length == 0) {
    } else {
      city = props.cityName[0].Name;
    }

    const state = props.stateName[0].Description;
    var zip = data.PhysicalZip;
    const colonia = "";

    const mailingStreetAddres = data.MailAddress;
    const mailingState = props.mailingStateName[0].Description;
    const mailingCity = props.mailingCityname[0].Name;
    const mailingZip = data.MailZip;
    const mailingColonia = "";

    const principalBussinesPhone = data.PhoneNumber;
    const principalContactCell = data.PhoneNumber; //Preguntar si hay un numero personal
    const pricipalFaxNumber = ""; // Preguntar si hay fax number
    const dotNumber = data.Dot;
    const mcmx = data.McMx;
    const dunBradstreet = ""; // No se esta manejando DUN por el momento
    const irsTax = data.Tax;
    const emailAddress = data.Email;
    const carrierMileage = data.Mcs150Mileage;
    const carrierOperation = data.CarrierOperation;

    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    const isMCS150 = (file) => {
      return file.DocType.trim() === "MCS-150";
    };
    //Declaracion de imagenes
    const misImage9 = new Image();
    const misImage10 = new Image();
    const misImage11 = new Image();
    misImage9.src = pag9;
    misImage10.src = pag10;
    misImage11.src = pag11;

    doc.addImage(misImage9, "JPEG", 0, 0, 445, 630);

    //REASON FOR FILING
    doc.circle(130, 251.2, 3, "FD");
    doc.setFont("times");
    doc.setFontType("bold");
    doc.setFontSize(9);

    //Legal Business Name
    if (LegalName == null) {
      doc.text("(EMPTY)", 143, 278);
    } else {
      doc.text(LegalName, 143, 278);
    }

    //Doing Business as name
    if (dba == null) {
      doc.text("(EMPTY)", 248, 295);
    } else {
      doc.text(dba, 248, 295);
    }

    //PRINCIPAL PLACE OF BUSINESS
    //(street Address)
    if (streetAddres == null) {
      doc.text("(EMPTY)", 71, 325);
    } else {
      doc.text(streetAddres, 71, 325);
    }

    //City
    if (city == null) {
      doc.text("(EMPTY)", 185, 325);
    } else {
      doc.text(city, 185, 325);
    }

    //state/providence
    if (state == null) {
      doc.text("(EMPTY)", 249, 325);
    } else {
      doc.text(state, 249, 325);
    }

    //zipCode
    if (zip == null) {
      doc.text("(EMPTY)", 315, 325);
    } else {
      doc.text(zip, 315, 325);
    }

    //Colonia(Mexico only)
    if (colonia == null) {
      doc.text("(EMPTY)", 363, 325);
    } else {
      doc.text(colonia, 363, 325);
    }

    //MAILING ADDRESS
    if (
      mailingStreetAddres == null &&
      mailingCity == null &&
      mailingState == null &&
      mailingZip == null
    ) {
      //Same as principal Address
      doc.circle(149.3, 345.3, 3, "FD");
      //mailing address below
      doc.circle(228, 345.3, 3, "FD");
      //(street Address)
      if (streetAddres == null) {
        doc.text("(EMPTY)", 71, 361);
      } else {
        doc.text(streetAddres, 71, 361);
      }

      //City
      if (city == null) {
        doc.text("(EMPTY)", 185, 361);
      } else {
        doc.text(city, 185, 361);
      }

      //state/providence
      if (state == null) {
        doc.text("(EMPTY)", 249, 361);
      } else {
        doc.text(state, 249, 361);
      }

      //zipCode
      if (zip == null) {
        doc.text("(EMPTY)", 315, 361);
      } else {
        doc.text(zip, 315, 361);
      }

      //Colonia(Mexico only)
      if (colonia == null) {
        doc.text("(EMPTY)", 363, 361);
      } else {
        doc.text(colonia, 363, 361);
      }
    } else {
      //mailing address below
      doc.circle(228, 345.3, 3, "FD");
      //(street Address)
      doc.text(mailingStreetAddres, 71, 361);

      //City
      doc.text(mailingCity, 185, 361);

      //state/providence
      doc.text(mailingState, 249, 361);

      //zipCode
      doc.text(mailingZip, 315, 361);

      //Colonia(Mexico only)
      doc.text(mailingColonia, 363, 361);
    }

    //CONTACT NUMBER
    //Principal business phone number
    if (principalBussinesPhone == null) {
      doc.text("(EMPTY)", 71, 395);
    } else {
      doc.text(principalBussinesPhone, 71, 395);
    }

    //principal contact cell phone number
    if (principalContactCell == null) {
      doc.text("(EMPTY)", 191, 395);
    } else {
      doc.text(principalContactCell, 191, 395);
    }

    //Principal business fax number
    if (pricipalFaxNumber == null) {
      doc.text("(EMPTY)", 324, 395);
    } else {
      doc.text(pricipalFaxNumber, 324, 395);
    }

    //IDENTIFCATION NUMBERS:
    //USDOT
    if (dotNumber == null) {
      doc.text("(EMPTY)", 80, 432);
    } else {
      doc.text(dotNumber, 80, 432);
    }

    //MC or MX number
    if (mcmx == null) {
      doc.text("(EMPTY)", 159, 432);
    } else {
      doc.text(mcmx, 159, 432);
    }

    //Dun & bradstreet number
    if (dunBradstreet == null) {
      doc.text("(EMPTY)", 241, 432);
    } else {
      doc.text(dunBradstreet, 241, 432);
    }

    //IRS/Tax id number
    if (irsTax == null) {
      doc.text("(EMPTY)", 328, 432);
    } else {
      doc.text(irsTax, 328, 432);
    }

    //E-MAIL ADRESS
    if (emailAddress == null) {
      doc.text("(EMPTY)", 133, 459);
    } else {
      doc.text(emailAddress, 133, 459);
    }

    //CARRIER MILEAGE
    if (carrierMileage == null) {
      doc.text("(EMPTY)", 263, 476);
    } else {
      doc.text(carrierMileage, 263, 476);
    }

    //COMPANY OPERATIONS
    switch (carrierOperation) {
      case "A":
        doc.rect(68, 502, 6, 6, "F"); // filled square
        break;
      case "B":
        //B
        doc.rect(136, 502, 6, 6, "F"); // filled square
        break;
      case "C":
        //C
        doc.rect(205, 502, 6, 6, "F"); // filled square
        break;
      case "D":
        //D
        doc.rect(290, 502, 6, 6, "F"); // filled square
        break;
      case "E":
        //E
        doc.rect(362, 502, 6, 6, "F"); // filled square
        break;
      default:
      // console.log(`Sorry, we are out of ${expr}.`);
    }

    doc.addPage();
    doc.addImage(misImage10, "JPEG", 0, 0, 445, 630);
    //OPERATION CLASSIFICATIONS
    if (props.operationClass.A == true) {
      //A
      doc.rect(68, 58.5, 6, 6, "F"); // filled square
    }
    if (props.operationClass.B == true) {
      //B
      doc.rect(68, 70, 6, 6, "F"); // filled square
    }
    if (props.operationClass.C == true) {
      //C
      doc.rect(68, 82, 6, 6, "F"); // filled square
    }
    if (props.operationClass.D == true) {
      //D
      doc.rect(146, 58.5, 6, 6, "F"); // filled square
    }
    if (props.operationClass.E == true) {
      //E
      doc.rect(146, 79, 6, 6, "F"); // filled square
    }
    if (props.operationClass.F == true) {
      //F
      doc.rect(146, 99, 6, 6, "F"); // filled square
    }
    if (props.operationClass.G == true) {
      //G
      doc.rect(241, 58.5, 6, 6, "F"); // filled square
    }
    if (props.operationClass.H == true) {
      //H
      doc.rect(241, 70, 6, 6, "F"); // filled square
    }
    if (props.operationClass.I == true) {
      //I
      doc.rect(241, 82, 6, 6, "F"); // filled square
    }
    if (props.operationClass.J == true) {
      //J
      doc.rect(241, 94, 6, 6, "F"); // filled square
    }
    if (props.operationClass.K == true) {
      //K
      doc.rect(241, 106, 6, 6, "F"); // filled square
      ///////////////////////////////////////////////
    }
    if ((props.operationClass.L = true)) {
      //L AND OTHER
      doc.rect(321.3, 58.5, 6, 6, "F"); // filled square
      if (props.operationClass.Other == null) {
        doc.text("Sin comentarios", 323, 80);
      } else {
        doc.text(props.operationClass.Other, 323, 80);
      }
    }

    //CARGO CLASSIFICATIONS
    if (props.cargoC.A == true) {
      //A
      doc.rect(68, 140, 6, 6, "F"); // filled square
    }
    if (props.cargoC.B == true) {
      //B
      doc.rect(68, 152.5, 6, 6, "F"); // filled square
    }
    if (props.cargoC.C == true) {
      //C
      doc.rect(68, 164, 6, 6, "F"); // filled square
    }
    if (props.cargoC.D == true) {
      //D
      doc.rect(68, 176, 6, 6, "F"); // filled square
    }
    if (props.cargoC.E == true) {
      //E
      doc.rect(68, 188, 6, 6, "F"); // filled square
    }
    if (props.cargoC.F == true) {
      //F
      doc.rect(68, 200, 6, 6, "F"); // filled square
    }
    if (props.cargoC.G == true) {
      //G
      doc.rect(68, 212, 6, 6, "F"); // filled square
    }
    if (props.cargoC.H == true) {
      //H
      doc.rect(68, 224, 6, 6, "F"); // filled square
    }
    if (props.cargoC.I == true) {
      //I
      doc.rect(165, 140, 6, 6, "F"); // filled square
    }
    if (props.cargoC.J == true) {
      //J
      doc.rect(165, 152.5, 6, 6, "F"); // filled square
    }
    if (props.cargoC.K == true) {
      //K
      doc.rect(165, 164, 6, 6, "F"); // filled square
    }
    if (props.cargoC.L == true) {
      //L
      doc.rect(165, 176, 6, 6, "F"); // filled square
    }
    if (props.cargoC.M == true) {
      //M
      doc.rect(165, 188, 6, 6, "F"); // filled square
    }
    if (props.cargoC.N == true) {
      //N
      doc.rect(165, 200, 6, 6, "F"); // filled square
    }
    if (props.cargoC.O == true) {
      //O
      doc.rect(165, 212, 6, 6, "F"); // filled square
    }
    if (props.cargoC.P == true) {
      //P
      doc.rect(165, 224, 6, 6, "F"); // filled square
    }
    if (props.cargoC.Q == true) {
      //Q
      doc.rect(256, 140, 6, 6, "F"); // filled square
    }
    if (props.cargoC.R == true) {
      //R
      doc.rect(256, 152.5, 6, 6, "F"); // filled square
    }
    if (props.cargoC.S == true) {
      //S
      doc.rect(256, 164, 6, 6, "F"); // filled square
    }
    if (props.cargoC.T == true) {
      //T
      doc.rect(256, 176, 6, 6, "F"); // filled square
    }
    if (props.cargoC.U == true) {
      //U
      doc.rect(256, 188, 6, 6, "F"); // filled square
    }
    if (props.cargoC.V == true) {
      //V
      doc.rect(256, 200, 6, 6, "F"); // filled square
    }
    if (props.cargoC.W == true) {
      //W
      doc.rect(256, 212, 6, 6, "F"); // filled square
    }
    if (props.cargoC.X == true) {
      //X
      doc.rect(256, 224, 6, 6, "F"); // filled square
    }
    if (props.cargoC.Y == true) {
      //Y
      doc.rect(341, 140, 6, 6, "F"); // filled square
    }
    if (props.cargoC.Z == true) {
      //Z
      doc.rect(341, 152.5, 6, 6, "F"); // filled square
    }
    if (props.cargoC.Aa == true) {
      //AA
      doc.rect(341, 164, 6, 6, "F"); // filled square
    }
    if (props.cargoC.Bb == true) {
      //BB
      doc.rect(341, 176, 6, 6, "F"); // filled square
    }
    if (props.cargoC.Cc == true) {
      //CC
      doc.rect(341, 188, 6, 6, "F"); // filled square
    }
    if (props.cargoC.Dd == true) {
      //DD
      doc.rect(341, 200, 6, 6, "F"); // filled square

      if (props.cargoC.Other == null) {
        doc.text("NO COMENTS", 355, 220);
      } else {
        doc.text(props.cargoC.Other.toString(), 341, 212); // filled square
      }
      // //TEXTBOXBELOW
      // doc.text(341, 212); // filled square
    }
    if (props.hmClass.length == 0) {
      // console.log("No hay info al respecto");
    } else {
      if (props.hmClass[0].HazardMaterialClasification == "DIV 1.1") {
        if (props.hmClass[0].Carrier == true) {
          //AC
          doc.rect(142.5, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[0].Shipper == true) {
          //AS
          doc.rect(153.2, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[0].BulkHm == true) {
          //AB
          doc.rect(163.8, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[0].NonBulk == true) {
          //ANM
          doc.rect(174.2, 285.3, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[3].HazardMaterialClasification == "DIV 1.2") {
        if (props.hmClass[3].Carrier == true) {
          //BC
          doc.rect(142.5, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[3].Shipper == true) {
          //BS
          doc.rect(153.2, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[3].BulkHm == true) {
          //BB
          doc.rect(163.8, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[3].NonBulk == true) {
          //BNM
          doc.rect(174.2, 297.2, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[6].HazardMaterialClasification == "DIV 1.3") {
        if (props.hmClass[6].Carrier == true) {
          //CC
          doc.rect(142.5, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[6].Shipper == true) {
          //CS
          doc.rect(153.2, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[6].BulkHm == true) {
          //CB
          doc.rect(163.8, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[6].NonBulk == true) {
          //CNM
          doc.rect(174.2, 309, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[9].HazardMaterialClasification == "DIV 1.4") {
        if (props.hmClass[9].Carrier == true) {
          //DC
          doc.rect(142.5, 321, 6, 6, "F"); // filled square
        }
        if (props.hmClass[9].Shipper == true) {
          //DS
          doc.rect(153.2, 321, 6, 6, "F"); // filled square
        }
        if (props.hmClass[9].BulkHm == true) {
          //DB
          doc.rect(163.8, 321, 6, 6, "F"); // filled square
        }
        if (props.hmClass[9].NonBulk == true) {
          //DNM
          doc.rect(174.2, 321, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[12].HazardMaterialClasification == "DIV 1.5") {
        if (props.hmClass[12].Carrier == true) {
          //EC
          doc.rect(142.5, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[12].Shipper == true) {
          //ES
          doc.rect(153.2, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[12].BulkHm == true) {
          //EB
          doc.rect(163.8, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[12].NonBulk == true) {
          //ENM
          doc.rect(174.2, 333, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[15].HazardMaterialClasification == "DIV 1.6") {
        if (props.hmClass[15].Carrier == true) {
          //FC
          doc.rect(142.5, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[15].Shipper == true) {
          //FS
          doc.rect(153.2, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[15].BulkHm == true) {
          //FB
          doc.rect(163.8, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[15].NonBulk == true) {
          //FNM
          doc.rect(174.2, 345, 6, 6, "F"); // filled square
        }
      }

      if (
        props.hmClass[18].HazardMaterialClasification == "DIV 2.1 (Flam. Gas)"
      ) {
        if (props.hmClass[18].Carrier == true) {
          //GC
          doc.rect(142.5, 357, 6, 6, "F"); // filled square
        }

        if (props.hmClass[18].Shipper == true) {
          //GS
          doc.rect(153.2, 357, 6, 6, "F"); // filled square
        }
        if (props.hmClass[18].BulkHm == true) {
          //GB
          doc.rect(163.8, 357, 6, 6, "F"); // filled square
        }
        if (props.hmClass[18].NonBulk == true) {
          //GNM
          doc.rect(174.2, 357, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[21].HazardMaterialClasification == "DIV 2.1 LPG") {
        if (props.hmClass[21].Carrier == true) {
          //HC
          doc.rect(142.5, 368.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[21].Shipper == true) {
          //HS
          doc.rect(153.2, 368.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[21].BulkHm == true) {
          //HB
          doc.rect(163.8, 368.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[21].NonBulk == true) {
          //HNM
          doc.rect(174.2, 368.5, 6, 6, "F"); // filled square
        }
      }
      if (
        props.hmClass[24].HazardMaterialClasification == "DIV 2.1 (Methane)"
      ) {
        if (props.hmClass[24].Carrier == true) {
          //IC
          doc.rect(142.5, 381, 6, 6, "F"); // filled square
        }
        if (props.hmClass[24].Shipper == true) {
          //IS
          doc.rect(153.2, 381, 6, 6, "F"); // filled square
        }
        if (props.hmClass[24].BulkHm == true) {
          //IB
          doc.rect(163.8, 381, 6, 6, "F"); // filled square
        }
        if (props.hmClass[24].NonBulk == true) {
          //INM
          doc.rect(174.2, 381, 6, 6, "F"); // filled squar
        }
      }

      /////////////////////////////////////////////////////
      if (props.hmClass[27].HazardMaterialClasification == "DIV 2.2") {
        if (props.hmClass[27].Carrier == true) {
          //JC
          doc.rect(142.5, 392.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[27].Shipper == true) {
          //JS
          doc.rect(153.2, 392.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[27].BulkHm == true) {
          //JB
          doc.rect(163.8, 392.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[27].NonBulk == true) {
          //JNM
          doc.rect(174.2, 392.5, 6, 6, "F"); // filled square
        }
      }
      if (props.hmClass[33].HazardMaterialClasification == "DIV 2.3A") {
        if (props.hmClass[33].Carrier == true) {
          //KC
          doc.rect(142.5, 404.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[33].Shipper == true) {
          //KS
          doc.rect(153.2, 404.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[33].BulkHm == true) {
          //KB
          doc.rect(163.8, 404.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[33].NonBulk == true) {
          //KNM
          doc.rect(174.2, 404.5, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[36].HazardMaterialClasification == "DIV 2.3B") {
        if (props.hmClass[36].Carrier == true) {
          //LC
          doc.rect(142.5, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[36].Shipper == true) {
          //LS
          doc.rect(153.2, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[36].BulkHm == true) {
          //LB
          doc.rect(163.8, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[36].NonBulk == true) {
          //LNM
          doc.rect(174.2, 416.5, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[39].HazardMaterialClasification == "DIV 2.3C") {
        if (props.hmClass[39].Carrier == true) {
          //MC
          doc.rect(142.5, 428.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[39].Shipper == true) {
          //MS
          doc.rect(153.2, 428.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[39].BulkHm == true) {
          //MB
          doc.rect(163.8, 428.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[39].NonBulk == true) {
          //MNM
          doc.rect(174.2, 428.5, 6, 6, "F"); // filled square
        }
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////
      if (props.hmClass[1].HazardMaterialClasification == "DIV 2.3D") {
        if (props.hmClass[1].Carrier == true) {
          //NC
          doc.rect(251, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[1].Shipper == true) {
          //NS
          doc.rect(261.5, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[1].BulkHm == true) {
          //NB
          doc.rect(272, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[1].NonBulk == true) {
          //NNM
          doc.rect(282.6, 285.3, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[4].HazardMaterialClasification == "CLASS 3") {
        if (props.hmClass[4].Carrier == true) {
          //OC
          doc.rect(251, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[4].Shipper == true) {
          //OS
          doc.rect(261.5, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[4].BulkHm == true) {
          //OB
          doc.rect(272, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[4].NonBulk == true) {
          //ONM
          doc.rect(282.6, 297.2, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[7].HazardMaterialClasification == "CLASS 3A") {
        if (props.hmClass[7].Carrier == true) {
          //OC
          doc.rect(251, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[7].Shipper == true) {
          //OS
          doc.rect(261.5, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[7].BulkHm == true) {
          //OB
          doc.rect(272, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[7].NonBulk == true) {
          //ONM
          doc.rect(282.6, 297.2, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[10].HazardMaterialClasification == "CLASS 3B") {
        if (props.hmClass[10].Carrier == true) {
          //OC
          doc.rect(251, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[10].Shipper == true) {
          //OS
          doc.rect(261.5, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[10].BulkHm == true) {
          //OB
          doc.rect(272, 297.2, 6, 6, "F"); // filled square
        }
        if (props.hmClass[10].NonBulk == true) {
          //ONM
          doc.rect(282.6, 297.2, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[13].HazardMaterialClasification == "COMB LIQ") {
        if (props.hmClass[13].Carrier == true) {
          //PC
          doc.rect(251, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[13].Shipper == true) {
          //PS
          doc.rect(261.5, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[13].BulkHm == true) {
          //PB
          doc.rect(272, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[13].NonBulk == true) {
          //PNM
          doc.rect(282.6, 309, 6, 6, "F"); // filled square
        }
      }
      /////////////////////////////////////////////////////
      if (props.hmClass[16].HazardMaterialClasification == "DIV 4.1") {
        if (props.hmClass[16].Carrier == true) {
          //QC
          doc.rect(251, 321, 6, 6, "F"); // filled square
        }
        if (props.hmClass[16].Shipper == true) {
        }
        //QS
        doc.rect(261.5, 321, 6, 6, "F"); // filled square
        if (props.hmClass[16].BulkHm == true) {
          //QB
          doc.rect(272, 321, 6, 6, "F"); // filled square
        }
        if (props.hmClass[16].NonBulk == true) {
          //QNM
          doc.rect(282.6, 321, 6, 6, "F"); // filled square
        }
      }
      if (props.hmClass[19].HazardMaterialClasification == "DIV 4.2") {
        if (props.hmClass[19].Carrier == true) {
          //RC
          doc.rect(251, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[19].Shipper == true) {
          //RS
          doc.rect(261.5, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[19].BulkHm == true) {
          //RB
          doc.rect(272, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[19].NonBulk == true) {
          //RNM
          doc.rect(282.6, 333, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[22].HazardMaterialClasification == "DIV 4.3") {
        if (props.hmClass[22].Carrier == true) {
          //SC
          doc.rect(251, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[22].Shipper == true) {
          //SS
          doc.rect(261.5, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[22].BulkHm == true) {
          //SB
          doc.rect(272, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[22].NonBulk == true) {
          //SNM
          doc.rect(282.6, 345, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[25].HazardMaterialClasification == "DIV 5.1") {
        if (props.hmClass[25].Carrier == true) {
          //TC
          doc.rect(251, 357, 6, 6, "F"); // filled square
        }
        if (props.hmClass[25].Shipper == true) {
          //TS
          doc.rect(261.5, 357, 6, 6, "F"); // filled square
        }
        if (props.hmClass[25].BulkHm == true) {
          //TB
          doc.rect(272, 357, 6, 6, "F"); // filled square
        }
        if (props.hmClass[25].NonBulk == true) {
          //TNM
          doc.rect(282.6, 357, 6, 6, "F"); // filled square
        }
      }
      if (props.hmClass[28].HazardMaterialClasification == "DIV 5.2") {
        if (props.hmClass[28].Carrier == true) {
          //UC
          doc.rect(251, 368.8, 6, 6, "F"); // filled square
        }
        if (props.hmClass[28].Shipper == true) {
          //US
          doc.rect(261.5, 368.8, 6, 6, "F"); // filled square
        }
        if (props.hmClass[28].BulkHm == true) {
          //UB
          doc.rect(272, 368.8, 6, 6, "F"); // filled square
        }
        if (props.hmClass[28].NonBulk == true) {
          //UNM
          doc.rect(282.6, 368.8, 6, 6, "F"); // filled square
        }
      }
      if (props.hmClass[31].HazardMaterialClasification == "DIV 6.1A") {
        if (props.hmClass[31].Carrier == true) {
          //VC
          doc.rect(251, 381, 6, 6, "F"); // filled square
        }
        if (props.hmClass[31].Shipper == true) {
          //VS
          doc.rect(261.5, 381, 6, 6, "F"); // filled square
        }
        if (props.hmClass[31].BulkHm == true) {
          //VB
          doc.rect(272, 381, 6, 6, "F"); // filled square
        }
        if (props.hmClass[31].NonBulk == true) {
          //VNM
          doc.rect(282.6, 381, 6, 6, "F"); // filled square
        }
      }
      if (props.hmClass[34].HazardMaterialClasification == "DIV 6.1B") {
        if (props.hmClass[34].Carrier == true) {
          //WC
          doc.rect(251, 392.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[34].Shipper == true) {
          //WS
          doc.rect(261.5, 392.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[34].BulkHm == true) {
          //WB
          doc.rect(272, 392.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[34].NonBulk == true) {
          //WNM
          doc.rect(282.6, 392.5, 6, 6, "F"); // filled square
        }
      }
      if (props.hmClass[37].HazardMaterialClasification == "DIV 6.1 POISON") {
        if (props.hmClass[37].Carrier == true) {
          //XC
          doc.rect(251, 404.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[37].Shipper == true) {
          //XS
          doc.rect(261.5, 404.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[37].BulkHm == true) {
          //XB
          doc.rect(272, 404.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[37].NonBulk == true) {
          //XNM
          doc.rect(282.6, 404.5, 6, 6, "F"); // filled square
        }
      }
      if (props.hmClass[40].HazardMaterialClasification == "DIV 6.1 SOLID") {
        if (props.hmClass[40].Carrier == true) {
          //YC
          doc.rect(251, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[40].Shipper == true) {
          //YS
          doc.rect(261.5, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[40].BulkHm == true) {
          //YB
          doc.rect(272, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[40].NonBulk == true) {
          //YNM
          doc.rect(282.6, 416.5, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[2].HazardMaterialClasification == "DIV 6.2") {
        if (props.hmClass[2].Carrier == true) {
          //ZC
          doc.rect(251, 428.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[2].Shipper == true) {
          //ZS
          doc.rect(261.5, 428.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[2].BulkHm == true) {
          //ZB
          doc.rect(272, 428.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[2].NonBulk == true) {
          //ZNM
          doc.rect(282.6, 428.5, 6, 6, "F"); // filled square
        }
      }

      //-------------------------------------------------------------------------------------------
      if (props.hmClass[5].HazardMaterialClasification == "CLASS 7") {
        if (props.hmClass[5].Carrier == true) {
          //AAC
          doc.rect(378.3, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[5].Shipper == true) {
          //AAS
          doc.rect(389, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[5].BulkHm == true) {
          //AAB
          doc.rect(399.5, 285.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[5].NonBulk == true) {
          //AANM
          doc.rect(410, 285.3, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[8].HazardMaterialClasification == "HRCQ") {
        if (props.hmClass[8].Carrier == true) {
          //BBC
          doc.rect(378.3, 297.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[8].Shipper == true) {
          //BBS
          doc.rect(389, 297.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[8].BulkHm == true) {
          //BBB
          doc.rect(399.5, 297.3, 6, 6, "F"); // filled square
        }
        if (props.hmClass[8].NonBulk == true) {
          //BBNM
          doc.rect(410, 297.3, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[11].HazardMaterialClasification == "CLASS 8") {
        if (props.hmClass[11].Carrier == true) {
          //CCC
          doc.rect(378.3, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[11].Shipper == true) {
          //CCS
          doc.rect(389, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[11].BulkHm == true) {
          //CCB
          doc.rect(399.5, 309, 6, 6, "F"); // filled square
        }
        if (props.hmClass[11].NonBulk == true) {
          //CCNM
          doc.rect(410, 309, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[14].HazardMaterialClasification == "CLASS 8A") {
        if (props.hmClass[14].Carrier == true) {
          //DDC
          doc.rect(378.3, 321, 6, 6, "F"); // filled square
        }
        if (props.hmClass[14].Shipper == true) {
          //DDS
          doc.rect(389, 321, 6, 6, "F"); // filled square
        }
        if (props.hmClass[14].BulkHm == true) {
          //DDB
          doc.rect(399.5, 321, 6, 6, "F"); // filled square
        }
        if (props.hmClass[14].NonBulk == true) {
          //DDNM
          doc.rect(410, 321, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[17].HazardMaterialClasification == "CLASS 8B") {
        if (props.hmClass[17].Carrier == true) {
          //EEC
          doc.rect(378.3, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[17].Shipper == true) {
          //EES
          doc.rect(389, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[17].BulkHm == true) {
          //EEB
          doc.rect(399.5, 333, 6, 6, "F"); // filled square
        }
        if (props.hmClass[17].NonBulk == true) {
          //EENM
          doc.rect(410, 333, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[20].HazardMaterialClasification == "CLASS 9") {
        if (props.hmClass[20].Carrier == true) {
          //FFC
          doc.rect(378.3, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[20].Shipper == true) {
          //FFS
          doc.rect(389, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[20].BulkHm == true) {
          //FFB
          doc.rect(399.5, 345, 6, 6, "F"); // filled square
        }
        if (props.hmClass[20].NonBulk == true) {
          //FFNM
          doc.rect(410, 345, 6, 6, "F"); // filled square
        }
      }

      /////////////////////////////////////////////////////
      if (
        props.hmClass[23].HazardMaterialClasification == "ELEVATED TEMP. MAT."
      ) {
        if (props.hmClass[23].Carrier == true) {
          //GGC
          doc.rect(378.3, 357, 6, 6, "F"); // filled square
        }
        if (props.hmClass[23].Shipper == true) {
          //GGS
          doc.rect(389, 357, 6, 6, "F"); // filled square
        }
        if (props.hmClass[23].BulkHm == true) {
          //GGB
          doc.rect(399.5, 357, 6, 6, "F"); // filled square
        }
        if (props.hmClass[23].NonBulk == true) {
          //GGNM
          doc.rect(410, 357, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[26].HazardMaterialClasification == "INFECTIOUS WASTE") {
        if (props.hmClass[26].Carrier == true) {
          //HHC
          doc.rect(378.3, 368.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[26].Shipper == true) {
          //HHS
          doc.rect(389, 368.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[26].BulkHm == true) {
          //HHB
          doc.rect(399.5, 368.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[26].NonBulk == true) {
          //HHNM
          doc.rect(410, 368.7, 6, 6, "F"); // filled square
        }
      }

      if (
        props.hmClass[29].HazardMaterialClasification == "MARINE POLLUTANTS"
      ) {
        if (props.hmClass[29].Carrier == true) {
          //IIC
          doc.rect(378.3, 380.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[29].Shipper == true) {
          //IIS
          doc.rect(389, 380.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[29].BulkHm == true) {
          //IIB
          doc.rect(399.5, 380.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[29].NonBulk == true) {
          //IINM
          doc.rect(410, 380.7, 6, 6, "F"); // filled square
        }
      }

      if (
        props.hmClass[32].HazardMaterialClasification == "HAZARDOUS SUB (RQ)"
      ) {
        if (props.hmClass[32].Carrier == true) {
          //JJC
          doc.rect(378.3, 392.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[32].Shipper == true) {
          //JJS
          doc.rect(389, 392.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[32].BulkHm == true) {
          //JJB
          doc.rect(399.5, 392.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[32].NonBulk == true) {
          //JJNM
          doc.rect(410, 392.7, 6, 6, "F"); // filled square
        }
      }

      if (props.hmClass[35].HazardMaterialClasification == "HAZARDOUS WASTE") {
        if (props.hmClass[35].Carrier == true) {
          //KKC
          doc.rect(378.3, 404.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[35].Shipper == true) {
          //KKS
          doc.rect(389, 404.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[35].BulkHm == true) {
          //KKB
          doc.rect(399.5, 404.7, 6, 6, "F"); // filled square
        }
        if (props.hmClass[35].NonBulk == true) {
          //KKNM
          doc.rect(410, 404.7, 6, 6, "F"); // filled square
        }
      }

      /////////////////////////////////////////////////////
      if (props.hmClass[38].HazardMaterialClasification == "ORM") {
        if (props.hmClass[38].Carrier == true) {
          //LLC
          doc.rect(378.3, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[38].Shipper == true) {
          //LLS
          doc.rect(389, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[38].BulkHm == true) {
          //LLB
          doc.rect(399.5, 416.5, 6, 6, "F"); // filled square
        }
        if (props.hmClass[38].NonBulk == true) {
          //LLNM
          doc.rect(410, 416.5, 6, 6, "F"); // filled square
        }
      }
    }
    var ownedST = 0;
    var ownedTT = 0;
    var termLST = 0;
    var termLTT = 0;
    var tripLST = 0;
    var tripLTT = 0;

    var hazmatTruckO = 0;
    var hazmatTruckTerm = 0;
    var hazmatTruckTrip = 0;

    var motorCO = 0;
    var motorCTerm = 0;
    var motorCTrip = 0;

    var schoolBus11 = 0;
    var schoolBus12 = 0;
    var schoolBus13 = 0;
    var schoolBus91 = 0;
    var schoolBus92 = 0;
    var schoolBus93 = 0;
    var schoolBus161 = 0;
    var schoolBus162 = 0;
    var schoolBus163 = 0;

    var bus1 = 0;
    var bus2 = 0;
    var bus3 = 0;

    var passenger11 = 0;
    var passenger12 = 0;
    var passenger13 = 0;
    var passenger91 = 0;
    var passenger92 = 0;
    var passenger93 = 0;

    var limousine11 = 0;
    var limousine12 = 0;
    var limousine13 = 0;
    var limousine91 = 0;
    var limousine92 = 0;
    var limousine93 = 0;
    var limousine161 = 0;
    var limousine162 = 0;
    var limousine163 = 0;

    //NUMBER OF VEHICLES THAT WILL BE OPERATED IN THE US
    //1,1
    for (let x = 0; x < props.vehicles.length; x++) {
      if (props.vehicles[x].Status == "ACTIVE") {
        ////////////////////////////////////////////////////////
        //Straight Trucks
        if (
          props.vehicles[x].VehicleType == "BOX TRUCK" &&
          props.vehicles[x].Condition == "Owned"
        ) {
          ownedST = ownedST + 1;
        }
        if (
          props.vehicles[x].VehicleType == "BOX TRUCK" &&
          props.vehicles[x].Condition == "Term Leased"
        ) {
          termLST = termLST + 1;
        }
        if (
          props.vehicles[x].VehicleType == "BOX TRUCK" &&
          props.vehicles[x].Condition == "Trip Leased"
        ) {
          tripLST = tripLST + 1;
        }
        /////////////////////////////////////////////////////////////
        //Truck Tractors
        if (
          props.vehicles[x].VehicleType == "TRUCK " ||
          (props.vehicles[x].VehicleType == "SEMI-TRAILER TRUCK" &&
            props.vehicles[x].Condition == "Trip Leased")
        ) {
          tripLTT = tripLTT + 1;
          // console.log("Entre a truck trip leased");
        }
        if (
          props.vehicles[x].VehicleType == "TRUCK " ||
          (props.vehicles[x].VehicleType == "SEMI-TRAILER TRUCK" &&
            props.vehicles[x].Condition == "Term Leased")
        ) {
          termLTT = termLTT + 1;
          // console.log("Entre a truck term leased");
        }
        if (
          props.vehicles[x].VehicleType == "TRUCK " ||
          (props.vehicles[x].VehicleType == "SEMI-TRAILER TRUCK" &&
            props.vehicles[x].Condition == "Owned")
        ) {
          ownedTT = ownedTT + 1;
          // console.log("Entre a truck owner", ownedTT);
        }
        //////////////////////////////////////////////////////////
        //Hazmat Cargo Tank Truck
        if (
          props.vehicles[x].Condition == "Owned" &&
          props.vehicles[x].Hazmat == true &&
          props.vehicles[x].CargoTank == true
        ) {
          hazmatTruckO = hazmatTruckO + 1;
        }
        if (
          props.vehicles[x].Condition == "Term Leased" &&
          props.vehicles[x].Hazmat == true &&
          props.vehicles[x].CargoTank == true
        ) {
          hazmatTruckTerm = hazmatTruckTerm + 1;
        }
        if (
          props.vehicles[x].Condition == "Trip Leased" &&
          props.vehicles[x].Hazmat == true &&
          props.vehicles[x].CargoTank == true
        ) {
          hazmatTruckTrip = hazmatTruckTrip + 1;
        }
        ///////////////////////////////////////////////////////////////
        //Motor-Coach
        if (
          props.vehicles[x].Condition == "Owned" &&
          props.vehicles[x].VehicleType == "BUS"
        ) {
          motorCO = motorCO + 1;
        }
        if (
          props.vehicles[x].Condition == "Term Leased" &&
          props.vehicles[x].VehicleType == "BUS"
        ) {
          motorCTerm = motorCTerm + 1;
        }
        if (
          props.vehicles[x].Condition == "Trip Leased" &&
          props.vehicles[x].VehicleType == "BUS"
        ) {
          motorCTrip = motorCTrip + 1;
        }
        //-------------------SchoolbBus-------------------//
        if (props.vehicles[x].VehicleType == "SCHOOL BUS") {
          if (props.vehicles[x].Passengers == "1-8") {
            if (props.vehicles[x].Condition == "Owned") {
              schoolBus11 = schoolBus11 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              schoolBus12 = schoolBus12 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              schoolBus13 = schoolBus13 + 1;
            }
          }
          if (props.vehicles[x].Passengers == "9-15") {
            if (props.vehicles[x].Condition == "Owned") {
              schoolBus91 = schoolBus91 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              schoolBus92 = schoolBus92 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              schoolBus93 = schoolBus93 + 1;
            }
          }
          if (props.vehicles[x].Passengers == "16+") {
            if (props.vehicles[x].Condition == "Owned") {
              schoolBus161 = schoolBus161 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              schoolBus162 = schoolBus162 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              schoolBus163 = schoolBus163 + 1;
            }
          }
        }
        //-------------------Bus--------------------------//
        if (props.vehicles[x].VehicleType == "BUS") {
          if (props.vehicles[x].Passengers == "16+") {
            if (props.vehicles[x].Condition == "Owned") {
              bus1 = bus1 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              bus2 = bus2 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              bus3 = bus3 + 1;
            }
          }
        }
        //-------------------PassengerVan-----------------//
        if (props.vehicles[x].VehicleType == "PASSENGER VAN") {
          if (props.vehicles[x].Passengers == "1-8") {
            if (props.vehicles[x].Condition == "Owned") {
              passenger11 = passenger11 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              passenger12 = passenger12 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              passenger13 = passenger13 + 1;
            }
          }
          if (props.vehicles[x].Passengers == "9-15") {
            if (props.vehicles[x].Condition == "Owned") {
              passenger91 = passenger91 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              passenger92 = passenger92 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              passenger93 = passenger93 + 1;
            }
          }
        }
        //-------------------Limousine--------------------//
        if (props.vehicles[x].VehicleType == "LIMOUSINE") {
          if (props.vehicles[x].Passengers == "1-8") {
            if (props.vehicles[x].Condition == "Owned") {
              limousine11 = limousine11 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              limousine12 = limousine12 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              limousine13 = limousine13 + 1;
            }
          }
          if (props.vehicles[x].Passengers == "9-15") {
            if (props.vehicles[x].Condition == "Owned") {
              limousine91 = limousine91 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              limousine92 = limousine92 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              limousine93 = limousine93 + 1;
            }
          }
          if (props.vehicles[x].Passengers == "16+") {
            if (props.vehicles[x].Condition == "Owned") {
              limousine161 = limousine161 + 1;
            }
            if (props.vehicles[x].Condition == "Term Leased") {
              limousine162 = limousine162 + 1;
            }
            if (props.vehicles[x].Condition == "Trip Leased") {
              limousine163 = limousine163 + 1;
            }
          }
        }
      }
    }

    var trailerOw = 0;
    var trailerTerm = 0;
    var trailerTrip = 0;

    var hazmatTrailerO = 0;
    var hazmatTrailerTerm = 0;
    var hazmatTrailerTrip = 0;

    for (let i = 0; i < props.trailers.length; i++) {
      ////////////////////////////////////////////////////////////////
      //Trailers
      if (props.trailers[i].Ownership == "Owned") {
        trailerOw = trailerOw + 1;
      }
      if (props.trailers[i].Ownership == "Term Leased") {
        trailerTerm = trailerTerm + 1;
      }
      if (props.trailers[i].Ownership == "Trip Leased") {
        trailerTrip = trailerTrip + 1;
      }
      ////////////////////////////////////////////////////////////////////////////
      //Hazmat Cargo Tanks Trailers
      if (
        props.trailers[i].Ownership == "Owned" &&
        props.trailers[i].TrailerType == "Tank Trailer" &&
        props.trailers[i].Hazmat == true
      ) {
        hazmatTrailerO = hazmatTrailerO + 1;
      }
      if (
        props.trailers[i].Ownership == "Term Leased" &&
        props.trailers[i].TrailerType == "Tank Trailer" &&
        props.trailers[i].Hazmat == true
      ) {
        hazmatTrailerTerm = hazmatTrailerTerm + 1;
      }
      if (
        props.trailers[i].Ownership == "Trip Leased" &&
        props.trailers[i].TrailerType == "Tank Trailer" &&
        props.trailers[i].Hazmat == true
      ) {
        hazmatTrailerTrip = hazmatTrailerTrip + 1;
      }
      /////////////////////////////////////////////////////////////////////
    }
    doc.text(ownedST.toString(), 50, 511);

    //1,2
    doc.text(termLST.toString(), 50, 529);

    //1,3
    doc.text(tripLST.toString(), 50, 549);

    //2,1
    doc.text(ownedTT.toString(), 80, 511);

    //2,2
    doc.text(termLTT.toString(), 80, 529);

    //2,3
    doc.text(tripLTT.toString(), 80, 549);

    //3,1
    doc.text(trailerOw.toString(), 110, 511);

    //3,2
    doc.text(trailerTerm.toString(), 110, 529);

    //3,3
    doc.text(trailerTrip.toString(), 110, 549);

    //4,1
    doc.text(hazmatTruckO.toString(), 142, 511);

    //4,2
    doc.text(hazmatTruckTerm.toString(), 142, 529);

    //4,3
    doc.text(hazmatTruckTrip.toString(), 142, 549);

    //5,1
    doc.text(hazmatTrailerO.toString(), 172, 511);

    //5,2
    doc.text(hazmatTrailerTerm.toString(), 172, 529);

    //5,3
    doc.text(hazmatTrailerTrip.toString(), 172, 549);

    //6,1
    doc.text(motorCO.toString(), 204, 511);

    //6,2
    doc.text(motorCTerm.toString(), 204, 529);

    //6,3
    doc.text(motorCTrip.toString(), 204, 549);

    //////////////////////////////////////////////

    //SCHOOL BUS
    //1-8 1
    doc.text(schoolBus11.toString(), 231, 511);

    //1-8 2
    doc.text(schoolBus12.toString(), 231, 529);

    //1-8 3
    doc.text(schoolBus13.toString(), 231, 549);
    //-----------------------------------------

    //9-15 1
    doc.text(schoolBus91.toString(), 255, 511);

    //9-15 2
    doc.text(schoolBus92.toString(), 255, 529);

    //9-15 3
    doc.text(schoolBus93.toString(), 255, 549);
    //-------------------------------------------

    //16+ 3
    doc.text(schoolBus161.toString(), 278, 511);

    //16+ 3
    doc.text(schoolBus162.toString(), 278, 529);

    //16+ 3
    doc.text(schoolBus163.toString(), 278, 549);
    //--------------------------------------------
    ///////////////////////////////////////////////
    //BUS
    //16+ 1
    doc.text(bus1.toString(), 302, 511);

    //16+ 2
    doc.text(bus2.toString(), 302, 529);

    //16+ 3
    doc.text(bus3.toString(), 302, 549);
    //-------------------------------------------
    ///////////////////////////////////////////////
    //PASSENGER VAN
    //1-8 1
    doc.text(passenger11.toString(), 325, 511);

    //1-8 2
    doc.text(passenger12.toString(), 325, 529);

    //1-8 3
    doc.text(passenger13.toString(), 325, 549);
    //---------------------------------------------

    //9-15 1
    doc.text(passenger91.toString(), 347, 511);

    //9-15 2
    doc.text(passenger92.toString(), 347, 529);

    //9-15 3
    doc.text(passenger93.toString(), 347, 549);
    //------------------------------------------
    ////////////////////////////////////////////
    //LIMOUSINE
    //1-8 1
    doc.text(limousine11.toString(), 370, 511);

    //1-8 2
    doc.text(limousine12.toString(), 370, 529);

    //1-8 3
    doc.text(limousine13.toString(), 370, 549);
    //------------------------------------------

    //9-15 1
    doc.text(limousine91.toString(), 394, 511);

    //9-15 2
    doc.text(limousine92.toString(), 394, 529);

    //9-15 3
    doc.text(limousine93.toString(), 394, 549);
    //--------------------------------------------

    //16+ 1
    doc.text(limousine161.toString(), 418, 511);

    //16+ 2
    doc.text(limousine162.toString(), 418, 529);

    //16+ 3
    doc.text(limousine163.toString(), 418, 549);

    //-------------------------------------------------------------------------------------------------
    doc.addPage();
    doc.addImage(misImage11, "JPEG", 0, 0, 445, 630);
    //DRIVER INFORMATION
    //Driver information table

    //1,1
    doc.text(interW.toString(), 184, 80);

    //1,2
    doc.text(interB.toString(), 184, 97);

    //2,1
    doc.text(intraW.toString(), 252, 80);

    //2,2
    doc.text(intraB.toString(), 252, 97);

    //3
    doc.text(props.driverList.length.toString(), 321, 88.5);

    //4
    doc.text(cantcdl.length.toString(), 394, 88.5);

    //Is your number USDOT registration currently revoked by the FMCSA
    doc.circle(95, 126.2, 3, "FD");

    //Compliance certification

    if (props.cargoC.M == true) {
      doc.rect(67.8, 201.4, 6, 6, "F"); // filled square
    }

    // doc.text("MCS-150", 440, 625);

    const newName =
      "MCS-150 (" +
      (ActualDate.getMonth() + 1) +
      "-" +
      ActualDate.getDate() +
      "-" +
      ActualDate.getFullYear() +
      ").pdf";
    const pdfdoc = new File([doc.output("blob")], newName, {
      type: doc.output("blob").type,
      lastModified: doc.output("blob").lastModified,
    });
    uploadFile(pdfdoc, props);
    doc.save(newName);
    window.open("https://ask.fmcsa.dot.gov/app/ask", "_blank");
  }

  var id = JSON.parse(localStorage.getItem("user")).Id;

  return (
    <div>
      {props.loading ||
      props.loadingTrailers ||
      props.loadingVehicles ||
      props.loadingDrivers ||
      props.loadingHm ||
      props.loadingOC ? (
        <Loading></Loading>
      ) : (
        <Button
          htmlFor="formPDF"
          className="px-2 buttons-royal text-white"
          block
          disabled={prueba}
          onClick={() => {
            genPDF(), props.update(idCompany, pestana, Turn);
            props.getData(id, true);
          }}
        >
          Print MCS-150 Form
          {prueba ? <Loading></Loading> : ""}
        </Button>
      )}
    </div>
  );
};

export default PdfMCS150;
