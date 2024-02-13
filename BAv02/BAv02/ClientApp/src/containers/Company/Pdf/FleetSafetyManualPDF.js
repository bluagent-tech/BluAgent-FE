import React from "react";
import * as jsPDF from "jspdf";
import { Button } from "reactstrap";
import Loading from "../../../components/Loading";

import Pag1 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0001.jpg";
import Pag2 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0002.jpg";
import Pag3 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0003.jpg";
import Pag4 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0004.jpg";
import Pag5 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0005.jpg";
import Pag6 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0006.jpg";
import Pag7 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0007.jpg";
import Pag8 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0008.jpg";
import Pag9 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0009.jpg";
import Pag10 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0010.jpg";

import Pag11 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0011.jpg";
import Pag12 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0012.jpg";
import Pag13 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0013.jpg";
import Pag14 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0014.jpg";
import Pag15 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0015.jpg";
import Pag16 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0016.jpg";
import Pag17 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0017.jpg";
import Pag18 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0018.jpg";
import Pag19 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0019.jpg";
import Pag20 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0020.jpg";

import Pag21 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0021.jpg";
import Pag22 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0022.jpg";
import Pag23 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0023.jpg";
import Pag24 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0024.jpg";
import Pag25 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0025.jpg";
import Pag26 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0026.jpg";
import Pag27 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0027.jpg";
import Pag28 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0028.jpg";
import Pag29 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0029.jpg";
import Pag30 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0030.jpg";

import Pag31 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0031.jpg";
import Pag32 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0032.jpg";
import Pag33 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0033.jpg";
import Pag34 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0034.jpg";
import Pag35 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0035.jpg";
import Pag36 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0036.jpg";
import Pag37 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0037.jpg";
import Pag38 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0038.jpg";
import Pag39 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0039.jpg";
import Pag40 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0040.jpg";

import Pag41 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0041.jpg";
import Pag42 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0042.jpg";
import Pag43 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0043.jpg";
import Pag44 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0044.jpg";
import Pag45 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0045.jpg";
import Pag46 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0046.jpg";
import Pag47 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0047.jpg";
import Pag48 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0048.jpg";
import Pag49 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0049.jpg";
import Pag50 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0050.jpg";

import Pag51 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0051.jpg";
import Pag52 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0052.jpg";
import Pag53 from "../../../assets/img/FleetManual/Fleet Safety Manual (4)_page-0053.jpg";

const idCompany = localStorage["idCompany"];
var dis = false;

function uploadFile(files, props) {
  var form = new FormData();
  form.append("files", files);
  form.append("id", props.idUser);
  form.append("docType", props.docType);
  form.append("idAccident", 0);
  props.uploadFile(form);
}

//px = position in x
//py = position in y
//data = string in the document
//upload = boleano para subir o no el documento
//pages = las imagenes del documento
//name = El nombre del documento

const FleetSafetyManual = (props) => {
  const ActualDate = new Date();
  //   console.log("Datos de props de fleet: ", props);
  function genPDF() {
    dis = true;
    const genPDF = require("jspdf");
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    //Declaracion de imagenes
    const manualImg1 = new Image();
    const manualImg2 = new Image();
    const manualImg3 = new Image();
    const manualImg4 = new Image();
    const manualImg5 = new Image();
    const manualImg6 = new Image();
    const manualImg7 = new Image();
    const manualImg8 = new Image();
    const manualImg9 = new Image();
    const manualImg10 = new Image();

    const manualImg11 = new Image();
    const manualImg12 = new Image();
    const manualImg13 = new Image();
    const manualImg14 = new Image();
    const manualImg15 = new Image();
    const manualImg16 = new Image();
    const manualImg17 = new Image();
    const manualImg18 = new Image();
    const manualImg19 = new Image();
    const manualImg20 = new Image();

    const manualImg21 = new Image();
    const manualImg22 = new Image();
    const manualImg23 = new Image();
    const manualImg24 = new Image();
    const manualImg25 = new Image();
    const manualImg26 = new Image();
    const manualImg27 = new Image();
    const manualImg28 = new Image();
    const manualImg29 = new Image();
    const manualImg30 = new Image();

    const manualImg31 = new Image();
    const manualImg32 = new Image();
    const manualImg33 = new Image();
    const manualImg34 = new Image();
    const manualImg35 = new Image();
    const manualImg36 = new Image();
    const manualImg37 = new Image();
    const manualImg38 = new Image();
    const manualImg39 = new Image();
    const manualImg40 = new Image();

    const manualImg41 = new Image();
    const manualImg42 = new Image();
    const manualImg43 = new Image();
    const manualImg44 = new Image();
    const manualImg45 = new Image();
    const manualImg46 = new Image();
    const manualImg47 = new Image();
    const manualImg48 = new Image();
    const manualImg49 = new Image();
    const manualImg50 = new Image();

    const manualImg51 = new Image();
    const manualImg52 = new Image();
    const manualImg53 = new Image();

    manualImg1.src = Pag1;
    manualImg2.src = Pag2;
    manualImg3.src = Pag3;
    manualImg4.src = Pag4;
    manualImg5.src = Pag5;
    manualImg6.src = Pag6;
    manualImg7.src = Pag7;
    manualImg8.src = Pag8;
    manualImg9.src = Pag9;
    manualImg10.src = Pag10;
    manualImg11.src = Pag11;
    manualImg12.src = Pag12;
    manualImg13.src = Pag13;
    manualImg14.src = Pag14;
    manualImg15.src = Pag15;
    manualImg16.src = Pag16;
    manualImg17.src = Pag17;
    manualImg18.src = Pag18;
    manualImg19.src = Pag19;
    manualImg20.src = Pag20;
    manualImg21.src = Pag21;
    manualImg22.src = Pag22;
    manualImg23.src = Pag23;
    manualImg24.src = Pag24;
    manualImg25.src = Pag25;
    manualImg26.src = Pag26;
    manualImg27.src = Pag27;
    manualImg28.src = Pag28;
    manualImg29.src = Pag29;
    manualImg30.src = Pag30;
    manualImg31.src = Pag31;
    manualImg32.src = Pag32;
    manualImg33.src = Pag33;
    manualImg34.src = Pag34;
    manualImg35.src = Pag35;
    manualImg36.src = Pag36;
    manualImg37.src = Pag37;
    manualImg38.src = Pag38;
    manualImg39.src = Pag39;
    manualImg40.src = Pag40;
    manualImg41.src = Pag41;
    manualImg42.src = Pag42;
    manualImg43.src = Pag43;
    manualImg44.src = Pag44;
    manualImg45.src = Pag45;
    manualImg46.src = Pag46;
    manualImg47.src = Pag47;
    manualImg48.src = Pag48;
    manualImg49.src = Pag49;
    manualImg50.src = Pag50;
    manualImg51.src = Pag51;
    manualImg52.src = Pag52;
    manualImg53.src = Pag53;

    var splitTitle = [];
    const companysplit = props.company.LegalName.split(" ");
    const companylength = props.company.LegalName.length - companysplit.length;
    var Titulo = false;
    const center = 222.5;
    var primerlinea = 0;
    var segundalinea = 0;
    var title1 = props.company.LegalName;
    var title2 = "";
    if (companylength > 24) {
      Titulo = true;
      title1 = "";
      splitTitle = props.company.LegalName.split(" ");
      let length = 0;
      for (let x = 0; x < splitTitle.length; x++) {
        length = length + splitTitle[x].length;
        if (length <= 24) {
          title1 = title1 + splitTitle[x] + " ";
          primerlinea = primerlinea + 1;
        } else {
          segundalinea = segundalinea + 1;
          title2 = title2 + splitTitle[x] + " ";
        }
      }
    }

    const Suma1 = title1.length + primerlinea;
    const mult1 = Suma1 * 13;
    const div1 = mult1 / 2;
    const startTitle = center - div1;
    const startTitle2 = center - ((title2.length + segundalinea) * 13) / 2;
    // console.log("tamano de company name: ", {
    //   center: center,
    //   titulo: Titulo,
    //   tituloL1: title1.length,
    //   tituloL2: title2.length,
    //   company: companylength,
    //   comienzoTitulo: startTitle,
    //   comienzoTitulo2: startTitle2,
    //   split: splitTitle,
    //   linea1: primerlinea,
    //   linea2: segundalinea,
    //   titulo1: title1,
    //   titulo2: title2,
    //   Comienzo1Suma: title1.length + primerlinea,
    //   T1suma: Suma1,
    //   T1Mul: mult1,
    //   T1Div: div1,
    //   T1Start: startTitle,
    // });

    doc.addImage(manualImg1, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.rect(131, 91, 185, 23, "F");
    doc.setFont("times");
    doc.setFontType("bold");
    doc.setFontSize(30);
    Titulo
      ? (doc.text(title1, startTitle, 106), doc.text(title2, startTitle2, 130))
      : doc.text(title1, startTitle, 106);
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg2, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg3, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(11);
    Titulo
      ? (doc.text(title2, 116, 147), doc.text(title1, 116, 141))
      : doc.text(title1, 116, 147);

    doc.addPage();
    doc.addImage(manualImg4, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    doc.text(props.company.Der, 162, 87);
    doc.text(props.company.Der, 268, 274);
    doc.text(props.company.Der, 262, 340);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 119, 507),
        doc.text(title1, 119, 501))
      : doc.text(title1, 119, 505);
    // doc.text(props.company.LegalName, 119, 504);

    doc.addPage();
    doc.addImage(manualImg5, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg6, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 245, 297),
        doc.text(title1, 245, 291))
      : doc.text(title1, 245, 297);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 245, 297);

    doc.addPage();
    doc.addImage(manualImg7, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg8, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 80, 88),
        doc.text(title1, 80, 82))
      : doc.text(title1, 80, 88);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 80, 88);

    doc.addPage();
    doc.addImage(manualImg9, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.rect(203, 563, 170, 10, "F");
    doc.rect(89, 574, 70, 10, "F");
    doc.setDrawColor(0, 0, 0);
    // doc.line(204, 570, 204, 30);
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 218, 560),
        doc.text(title1, 218, 554))
      : doc.text(title1, 218, 560);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 218, 560);

    doc.addPage();
    doc.addImage(manualImg10, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    doc.text(props.company.Der, 289, 77);
    doc.text(props.company.Der, 91, 231);
    doc.setFontSize(10);
    doc.text(props.company.PhoneNumber, 134, 88);
    doc.text(props.company.PhoneNumber, 299, 230);

    doc.addPage();
    doc.addImage(manualImg11, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg12, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg13, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg14, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg15, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg16, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    doc.text(props.company.LegalName, 161, 231);

    doc.addPage();
    doc.addImage(manualImg17, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg18, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg19, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 139, 356),
        doc.text(title1, 139, 350))
      : doc.text(title1, 139, 356);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 139, 355);

    doc.addPage();
    doc.addImage(manualImg20, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg21, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg22, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg23, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg24, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg25, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg26, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg27, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg28, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg29, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg30, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg31, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg32, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 108, 445),
        doc.text(title1, 108, 439))
      : doc.text(title1, 108, 445);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 108, 445);

    doc.addPage();
    doc.addImage(manualImg33, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.rect(262, 321, 100, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 265, 330),
        doc.text(title1, 265, 324),
        doc.text(title2, 102, 537),
        doc.text(title1, 102, 531))
      : (doc.text(title1, 265, 329), doc.text(title1, 102, 537));
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 265, 328);
    // doc.text(props.company.LegalName, 102, 537);

    doc.addPage();
    doc.addImage(manualImg34, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 174, 81),
        doc.text(title1, 174, 75),
        doc.text(title2, 187, 463),
        doc.text(title1, 187, 457),
        doc.text(title2, 235, 537),
        doc.text(title1, 235, 531))
      : (doc.text(title1, 174, 81),
        doc.text(title1, 187, 462),
        doc.text(title1, 235, 536));
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 174, 81);
    // doc.text(props.company.LegalName, 187, 462);
    // doc.text(props.company.LegalName, 235, 536);

    doc.addPage();
    doc.addImage(manualImg35, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg36, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.rect(209, 541, 100, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(10);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 219, 78),
        doc.text(title1, 219, 72),
        doc.text(title2, 133, 122),
        doc.text(title1, 133, 116),
        doc.text(title2, 255, 166),
        doc.text(title1, 255, 160),
        doc.text(title2, 197, 199),
        doc.text(title1, 197, 193),
        doc.text(title2, 122, 358),
        doc.text(title1, 122, 352),
        doc.text(title2, 122, 402),
        doc.text(title1, 122, 396),
        doc.text(title2, 122, 428),
        doc.text(title1, 122, 422),
        doc.text(title2, 212, 551),
        doc.text(title1, 212, 545))
      : (doc.text(title1, 219, 77),
        doc.text(title1, 133, 121),
        doc.text(title1, 255, 165),
        doc.text(title1, 197, 198),
        doc.text(title1, 122, 357),
        doc.text(title1, 122, 401),
        doc.text(title1, 122, 428),
        doc.text(title1, 212, 548));
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 219, 77);
    // doc.text(props.company.LegalName, 133, 121);
    // doc.text(props.company.LegalName, 255, 165);
    // doc.text(props.company.LegalName, 197, 198);
    // doc.text(props.company.LegalName, 122, 357);
    // doc.text(props.company.LegalName, 122, 401);
    // doc.text(props.company.LegalName, 122, 428);
    // doc.text(props.company.LegalName, 212, 548);

    doc.addPage();
    doc.addImage(manualImg37, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 234, 407),
        doc.text(title1, 234, 401))
      : doc.text(title1, 234, 407);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 234, 406);

    doc.addPage();
    doc.addImage(manualImg38, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 128, 78),
        doc.text(title1, 128, 72),
        doc.text(title2, 140, 320),
        doc.text(title1, 140, 314))
      : (doc.text(title1, 128, 77), doc.text(title1, 140, 318));
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 128, 77);
    // doc.text(props.company.LegalName, 140, 318);

    doc.addPage();
    doc.addImage(manualImg39, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 154, 105),
        doc.text(title1, 154, 99),
        doc.text(title2, 121, 550),
        doc.text(title1, 121, 544))
      : (doc.text(title1, 154, 105), doc.text(title1, 121, 549));
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 154, 105);
    // doc.text(props.company.LegalName, 121, 549);

    doc.addPage();
    doc.addImage(manualImg40, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 201, 276),
        doc.text(title1, 201, 270))
      : doc.text(title1, 201, 276);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 201, 275);

    doc.addPage();
    doc.addImage(manualImg41, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg42, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.rect(139, 21, 150, 10, "F");
    doc.rect(111, 168, 100, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(10);
    Titulo
      ? (doc.setFontSize(6),
        doc.text(title2, 56, 228),
        doc.setFontSize(8),
        doc.text(title1, 353, 217),
        doc.setFontSize(8),
        doc.text(title2, 112, 177),
        doc.text(title1, 112, 171),
        doc.setFontSize(10),
        doc.text(title2, 121, 353),
        doc.text(title1, 121, 347))
      : (doc.setFontSize(9),
        doc.text(title1, 353, 216),
        doc.text(title1, 112, 177),
        doc.setFontSize(11),
        doc.text(title1, 121, 354));
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 141, 29);

    // doc.text(props.company.LegalName, 121, 353);
    // doc.setFontSize(8);
    // doc.text(props.company.LegalName, 356, 217);

    doc.addPage();
    doc.addImage(manualImg43, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 600, 80, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg44, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.rect(97, 168, 98, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(9);
    Titulo
      ? (doc.setFontSize(9),
        doc.text(title2, 99, 176),
        doc.text(title1, 99, 170))
      : doc.text(title1, 99, 176);

    doc.addPage();
    doc.addImage(manualImg45, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(10);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 226, 331),
        doc.text(title1, 226, 325))
      : doc.text(title1, 226, 330);
    // doc.setFontSize(10);
    // doc.text(props.company.LegalName, 226, 329);

    doc.addPage();
    doc.addImage(manualImg46, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg47, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.rect(141, 87, 128, 4, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 147, 88),
        doc.text(title1, 147, 82))
      : doc.text(title1, 147, 88);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 147, 88);

    doc.addPage();
    doc.addImage(manualImg48, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg49, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg50, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg51, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    doc.addPage();
    doc.addImage(manualImg52, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);
    doc.setFontSize(12);
    Titulo
      ? (doc.setFontSize(10),
        doc.text(title2, 94, 253),
        doc.text(title1, 94, 247))
      : doc.text(title1, 94, 253);
    // doc.setFontSize(12);
    // doc.text(props.company.LegalName, 94, 253);

    doc.addPage();
    doc.addImage(manualImg53, "JPEG", 0, 0, 445, 630);
    doc.setFillColor(255, 255, 255);
    doc.rect(51, 593, 55, 10, "F");
    doc.setFontSize(8);
    doc.text(props.company.LegalName, 52, 600);

    const newName = "Fleet Safety Manual " + ActualDate.getFullYear() + ".pdf";
    const pdfdoc = new File([doc.output("blob")], newName, {
      type: doc.output("blob").type,
      lastModified: doc.output("blob").lastModified,
    });
    //   if (upload == true) {
    //     uploadFile(pdfdoc, props);
    //   }
    uploadFile(pdfdoc, props);
    doc.save(newName);
  }

  return (
    <div>
      {props.genFleet ? (
        <Button
          disabled={props.isloading}
          htmlFor="formPDF"
          color="success"
          style={{
            width: "100%",
            marginTop: "10px",
          }}
          onClick={() => {
            genPDF();
          }}
        >
          {props.isloading ? <Loading /> : "GENERATE FLEET SAFETY MANUAL"}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default FleetSafetyManual;
