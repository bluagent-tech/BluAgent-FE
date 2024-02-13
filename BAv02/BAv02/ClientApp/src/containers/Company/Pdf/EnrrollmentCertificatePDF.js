import React, { useState, useEffect } from "react";
import * as jsPDF from "jspdf";
import { Button, Alert } from "reactstrap";
import Loading from "../../../components/Loading";
import DataCity from "../../../city.json";
import DataState from "../../../states.json";
import Pag1 from "../../../assets/img/EnrrollmentCertificate/D&A Certificate Enrollment_page-0001.jpg";

export default function EnrrollmentCertificate(props) {
  const [dis, setDis] = useState(true);
  const [existSig, setExistSig] = useState(false);
  const [fullData, setFullData] = useState(false);
  const [stateName, setStateName] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [allData, setAllData] = useState({});
  const [gen, setGen] = useState(true);
  //const [props, setProps] = useState(props);

  const ActualDate = new Date();
  const ActualYear = ActualDate.getFullYear();

  const uploadFile = (files, props) => {
    var form = new FormData();
    form.append("files", files);
    form.append("id", props.Idu);
    form.append("docType", "Certificate of Enrollment");
    form.append("idAccident", 0);
    props.uploadFile(form);
  };

  useEffect(() => {
    fetch(
      `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.company.Id}/signature.png`
    ).then((response) => { if (response.status == 200) { setExistSig(true) } });
  }, [])


  useEffect(() => {
    setStateName(
      DataState.filter((state) => state.Id == props.company.PhysicalState)
    );
    setCityName(
      DataCity.filter((state) => state.Id == props.company.PhysicalCity)
    );
  }, [])


  useEffect(() => {
    try {
      setAllData({
        DERname: props.company.Der,
        CompanyName: props.company.LegalName,
        Addres:
          props.company.PhysicalAddress +
          " " +
          stateName[0].Name.toUpperCase() +
          " " +
          cityName[0].Name.toUpperCase() + " " + props.company.PhysicalZip,
      });
      // console.log(allData);
      // console.log('Dentro de setAllData');
      setFullData(true)
    } catch (error) {
      // console.log(allData);
      // console.log('trone');
      setFullData(false)
    }

  }, [stateName, cityName])

  const genPDF = () => {
    setGen(false);
    const genPDF = require("jspdf");
    const doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });

    //Declaracion de imagenes
    const manualImg1 = new Image();
    manualImg1.src = Pag1;
    var splitTitle = [];
    const companysplit = allData.CompanyName.split(" ");
    const companylength = allData.CompanyName.length - companysplit.length;
    var Titulo = false;
    const center = 222.5;
    var primerlinea = 0;
    var segundalinea = 0;
    var title1 = allData.CompanyName;
    var title2 = "";
    if (companylength > 21) {
      Titulo = true;
      title1 = "";
      splitTitle = allData.CompanyName.split(" ");
      let length = 0;
      for (let x = 0; x < splitTitle.length; x++) {
        length = length + splitTitle[x].length;
        if (length <= 21) {
          title1 = title1 + splitTitle[x] + " ";
          primerlinea = primerlinea + 1;
        } else {
          segundalinea = segundalinea + 1;
          title2 = title2 + splitTitle[x] + " ";
        }
      }
    }

    const Suma1 = title1.length + primerlinea;
    const mult1 = Suma1 * 8;
    const div1 = mult1 / 2;
    const startTitle = center - div1;
    const startTitle2 = center - ((title2.length + segundalinea) * 8) / 2;

    var splitAddress = [];
    const addresssplit = allData.Addres.split(" ");
    const addresslength = allData.Addres.length - addresssplit.length;
    var direccion = false;
    const centerDir = 222.5;
    var primerlineaDir = 0;
    var segundalineaDir = 0;
    var title1Dir = allData.Addres;
    var title2Dir = "";
    if (addresslength > 21) {
      direccion = true;
      title1Dir = "";
      splitAddress = allData.Addres.split(" ");
      let length = 0;
      for (let x = 0; x < splitAddress.length; x++) {
        length = length + splitAddress[x].length;
        if (length <= 21) {
          title1Dir = title1Dir + splitAddress[x] + " ";
          primerlineaDir = primerlineaDir + 1;
        } else {
          segundalineaDir = segundalineaDir + 1;
          title2Dir = title2Dir + splitAddress[x] + " ";
        }
      }
    }

    const Suma1Dir = title1Dir.length + primerlineaDir;
    const mult1Dir = Suma1Dir * 7.5;
    const div1Dir = mult1Dir / 2;
    const startTitleDir = centerDir - div1Dir;
    const startTitle2Dir =
      centerDir - ((title2Dir.length + segundalineaDir) * 7) / 2;

    var firma = new Image();
    firma.src = `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.company.Id}/signature.png`;
    doc.addImage(manualImg1, "JPEG", 0, 0, 445, 630);
    doc.setFont("times");
    doc.setFontType("bold");
    doc.setFontSize(20);
    doc.setFillColor(255, 255, 255);
    doc.rect(188, 168, 65, 10, "F");

    Titulo
      ? (doc.text(title1, startTitle, 170), doc.text(title2, startTitle2, 182))
      : doc.text(allData.CompanyName, startTitle, 170);

    doc.setFillColor(255, 255, 255);
    doc.rect(184, 193, 75, 10, "F");

    direccion
      ? (doc.text(title1Dir, startTitleDir, 205),
        doc.text(title2Dir, startTitle2Dir, 218))
      : doc.text(Addres, startTitleDir, 205);

    doc.setFillColor(255, 255, 255);
    doc.setFontSize(10);
    doc.rect(168, 228, 16, 8, "F");
    doc.text(allData.DERname, 169, 235);

    doc.setFillColor(255, 255, 255);
    doc.rect(169, 248, 75, 10, "F");
    doc.text("JANUARY 1, " + ActualYear, 168, 254);

    doc.setFillColor(255, 255, 255);
    doc.rect(169, 267, 85, 10, "F");
    doc.text("DECEMBER 31, " + ActualYear, 168, 274);

    // doc.setFontSize(12);
    // doc.text(DERname, 39, 471);
    doc.addImage(firma, "JPEG", 65, 430, 45, 45);

    // doc.text(props.company.LegalName, 58, 181);
    // doc.addPage();

    const newName =
      "Certificate of Enrollment" + ActualDate.getFullYear() + ".pdf";
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

  // console.log(props);
  // console.log(allData);
  // console.log(stateName);
  // console.log(cityName);
  // console.log('Datos verificados', fullData);
  // console.log('Firma verificada', existSig);

  return (
    <div>
      {existSig == true && fullData == true ? (
        props.gen ? (
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
            {props.isloading ? (
              <Loading />
            ) : (
              "GENERATE CERTIFICATE OF ENROLLMENT"
            )}
          </Button>
        ) : (
          ""
        )
      ) : (
        <Alert
          style={{
            alignItems: "center",
            backgroundColor: "#dff0fe",
            borderLeft: "4px solid #dff0fe",
            borderColor: "#4788c7",
            color: "#4788c7",
            padding: "6px",
            // padding: "15px 20px",
          }}
        >
          {fullData == false ? (
            <>
              <i className="fas fa-exclamation-circle"></i>
              {" "}please verify that you have previously filled out the contact information in the <strong>Account Information</strong> section.

            </>
          ) : (
            <>
              <i className="fas fa-exclamation-circle"></i>
              {" "}Company <strong>Signature </strong> is required to generated the{" "}
              <strong>Certificate of Enrollment</strong>
            </>
          )}
        </Alert>
      )}
    </div>
  );
}
