import React from "react";
import * as jsPDF from "jspdf";
import { Button } from "reactstrap";
import Loading from "../../../components/Loading";

import Pag1 from "../../../assets/img/DriverManual/Safety-Manual_page-0001.jpg";
import Pag2 from "../../../assets/img/DriverManual/Safety-Manual_page-0002.jpg";
import Pag3 from "../../../assets/img/DriverManual/Safety-Manual_page-0003.jpg";
import Pag4 from "../../../assets/img/DriverManual/Safety-Manual_page-0004.jpg";
import Pag5 from "../../../assets/img/DriverManual/Safety-Manual_page-0005.jpg";
import Pag6 from "../../../assets/img/DriverManual/Safety-Manual_page-0006.jpg";
import Pag7 from "../../../assets/img/DriverManual/Safety-Manual_page-0007.jpg";
import Pag8 from "../../../assets/img/DriverManual/Safety-Manual_page-0008.jpg";
import Pag9 from "../../../assets/img/DriverManual/Safety-Manual_page-0009.jpg";
import Pag10 from "../../../assets/img/DriverManual/Safety-Manual_page-0010.jpg";

import Pag11 from "../../../assets/img/DriverManual/Safety-Manual_page-0011.jpg";
import Pag12 from "../../../assets/img/DriverManual/Safety-Manual_page-0012.jpg";
import Pag13 from "../../../assets/img/DriverManual/Safety-Manual_page-0013.jpg";
import Pag14 from "../../../assets/img/DriverManual/Safety-Manual_page-0014.jpg";
import Pag15 from "../../../assets/img/DriverManual/Safety-Manual_page-0015.jpg";
import Pag16 from "../../../assets/img/DriverManual/Safety-Manual_page-0016.jpg";
import Pag17 from "../../../assets/img/DriverManual/Safety-Manual_page-0017.jpg";
import Pag18 from "../../../assets/img/DriverManual/Safety-Manual_page-0018.jpg";
import Pag19 from "../../../assets/img/DriverManual/Safety-Manual_page-0019.jpg";
import Pag20 from "../../../assets/img/DriverManual/Safety-Manual_page-0020.jpg";

import Pag21 from "../../../assets/img/DriverManual/Safety-Manual_page-0021.jpg";
import Pag22 from "../../../assets/img/DriverManual/Safety-Manual_page-0022.jpg";
import Pag23 from "../../../assets/img/DriverManual/Safety-Manual_page-0023.jpg";
import Pag24 from "../../../assets/img/DriverManual/Safety-Manual_page-0024.jpg";
import Pag25 from "../../../assets/img/DriverManual/Safety-Manual_page-0025.jpg";
import Pag26 from "../../../assets/img/DriverManual/Safety-Manual_page-0026.jpg";
import Pag27 from "../../../assets/img/DriverManual/Safety-Manual_page-0027.jpg";
import Pag28 from "../../../assets/img/DriverManual/Safety-Manual_page-0028.jpg";
import Pag29 from "../../../assets/img/DriverManual/Safety-Manual_page-0029.jpg";
import Pag30 from "../../../assets/img/DriverManual/Safety-Manual_page-0030.jpg";

import Pag31 from "../../../assets/img/DriverManual/Safety-Manual_page-0031.jpg";
import Pag32 from "../../../assets/img/DriverManual/Safety-Manual_page-0032.jpg";
import Pag33 from "../../../assets/img/DriverManual/Safety-Manual_page-0033.jpg";
import Pag34 from "../../../assets/img/DriverManual/Safety-Manual_page-0034.jpg";
import Pag35 from "../../../assets/img/DriverManual/Safety-Manual_page-0035.jpg";
import Pag36 from "../../../assets/img/DriverManual/Safety-Manual_page-0036.jpg";
import Pag37 from "../../../assets/img/DriverManual/Safety-Manual_page-0037.jpg";
import Pag38 from "../../../assets/img/DriverManual/Safety-Manual_page-0038.jpg";
import Pag39 from "../../../assets/img/DriverManual/Safety-Manual_page-0039.jpg";
import Pag40 from "../../../assets/img/DriverManual/Safety-Manual_page-0040.jpg";

import Pag41 from "../../../assets/img/DriverManual/Safety-Manual_page-0041.jpg";
import Pag42 from "../../../assets/img/DriverManual/Safety-Manual_page-0042.jpg";
import Pag43 from "../../../assets/img/DriverManual/Safety-Manual_page-0043.jpg";
import Pag44 from "../../../assets/img/DriverManual/Safety-Manual_page-0044.jpg";
import Pag45 from "../../../assets/img/DriverManual/Safety-Manual_page-0045.jpg";
import Pag46 from "../../../assets/img/DriverManual/Safety-Manual_page-0046.jpg";

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

const DriverSafetyManual = (props) => {
  const ActualDate = new Date();
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

    doc.addImage(manualImg1, "JPEG", 0, 0, 445, 630);
    doc.setFont("times");
    doc.setFontType("bold");
    doc.setFontSize(30);

    Titulo
      ? (doc.text(title1, 58, 157), doc.text(title2, 58, 181))
      : doc.text(title1, 58, 181);
    doc.setFontSize(8);

    // doc.text(props.company.LegalName, 58, 181);
    doc.addPage();
    doc.addImage(manualImg2, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg3, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg4, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg5, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg6, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg7, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg8, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg9, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg10, "JPEG", 0, 0, 445, 630);
    doc.addPage();

    doc.addImage(manualImg11, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg12, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg13, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg14, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg15, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg16, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg17, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg18, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg19, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg20, "JPEG", 0, 0, 445, 630);
    doc.addPage();

    doc.addImage(manualImg21, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg22, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg23, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg24, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg25, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg26, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg27, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg28, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg29, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg30, "JPEG", 0, 0, 445, 630);
    doc.addPage();

    doc.addImage(manualImg31, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg32, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg33, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg34, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg35, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg36, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg37, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg38, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg39, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg40, "JPEG", 0, 0, 445, 630);
    doc.addPage();

    doc.addImage(manualImg41, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg42, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg43, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg44, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg45, "JPEG", 0, 0, 445, 630);
    doc.addPage();
    doc.addImage(manualImg46, "JPEG", 0, 0, 445, 630);
    // doc.addPage();

    const newName = "Driver Safety Manual " + ActualDate.getFullYear() + ".pdf";
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
      {props.genDriver ? (
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
          {props.isloading ? <Loading /> : "GENERATE DRIVER SAFETY MANUAL"}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default DriverSafetyManual;
