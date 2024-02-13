import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const DocPdfAgreement = (props) => {
  const styles = StyleSheet.create({
    page: {},
    heading: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      padding: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: "bolder",
      textAlign: "center",
      textTransform: "capitalize",
      lineHeight: "0.5",
    },
    textContent: {
      display: "block",
      margin: 10,
      padding: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      display: "block",
      backgroundColor: "#3b86ff",
    },
    sectionDobleColumn: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    textLeft: {
      marginRight: 250,
      fontSize: 14,
    },
    buttonDownload: {
      backgroundColor: "#3b86ff",
      color: "white",
      padding: "5px 10px",
      margin: "20px 5px",
    },
  });

  return (
    <div>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>
              Drug and Alcohol Testing Policy Receipt
            </Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.title}>
              {props.company.Der === null ||
              props.company.Der === "null" ||
              props.company.Der === "" ||
              props.company.Der === undefined
                ? "No data Avaliable"
                : props.company.Der}
            </Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.title}>
              {props.company.PhysicalAddress}
              {props.company.PhysicalZip}
              {props.company.State}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Driver Information</Text>
          </View>
          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Name </Text>
            </View>
            <View>
              <Text>
                {props.driver.Name} {props.driver.LastName}
              </Text>
            </View>
          </View>
          <br />
          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Date of Birth </Text>
            </View>
            <View>
              <Text>{props.driver.Birthdate}</Text>
            </View>
          </View>
          <br />
          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Gender </Text>
            </View>
            <View>
              <Text>{props.driver.Gender}</Text>
            </View>
          </View>
          <br />
          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Phone Number </Text>
            </View>
            <View>
              <Text>{props.driver.PhoneNumber}</Text>
            </View>
          </View>
          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Social Security Number </Text>
            </View>
            <View>
              <Text>
                {props.driver.Ssn === null
                  ? "No data Avaliable"
                  : props.driver.Ssn}
              </Text>
            </View>
          </View>
          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Country </Text>
            </View>
            <View>
              <Text>
                {props.driver.Country === null || props.driver.Country === ""
                  ? "No data Avaliable"
                  : props.driver.Ssn}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Email </Text>
            </View>
            <View>
              <Text>
                {props.driver.Email === null || props.driver.Email === ""
                  ? "No data Avaliable"
                  : props.driver.Email}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Email </Text>
            </View>
            <View>
              <Text>
                {props.driver.Email === null || props.driver.Email === ""
                  ? "No data Avaliable"
                  : props.driver.Email}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Address </Text>
            </View>
            <View>
              <Text>
                {props.driver.Street === null || props.driver.Street === ""
                  ? "No data Avaliable"
                  : props.driver.Street}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Hire Date </Text>
            </View>
            <View>
              <Text>
                {props.driver.HiringDate === null ||
                props.driver.HiringDate === ""
                  ? "No data Avaliable"
                  : props.driver.HiringDate}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.section}>
            <Text style={styles.heading}>Driver License Information</Text>
          </View>

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>License Number </Text>
            </View>
            <View>
              <Text>
                {props.driver.License === null || props.driver.License === ""
                  ? "No data Avaliable"
                  : props.driver.License}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>License Class </Text>
            </View>
            <View>
              <Text>
                {props.driver.TypeLicense === null ||
                props.driver.TypeLicense === ""
                  ? "No data Avaliable"
                  : props.driver.TypeLicense}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>License Class </Text>
            </View>
            <View>
              <Text>
                {props.driver.LicenseExpiration === null ||
                props.driver.LicenseExpiration === ""
                  ? "No data Avaliable"
                  : props.driver.LicenseExpiration}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Expiration Date </Text>
            </View>
            <View>
              <Text>
                {props.driver.LicenseExpiration === null ||
                props.driver.LicenseExpiration === ""
                  ? "No data Avaliable"
                  : props.driver.LicenseExpiration}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>Expiration Date </Text>
            </View>
            <View>
              <Text>
                {props.driver.LicenseExpiration === null ||
                props.driver.LicenseExpiration === ""
                  ? "No data Avaliable"
                  : props.driver.LicenseExpiration}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>
                A. Have you ever been denied a license,permit, or privilege to
                operate a motor vehicle?{" "}
              </Text>
            </View>
            <View>
              <Text>
                {props.driver.DeniedLicense === null ||
                props.driver.DeniedLicense === "" ||
                props.driver.DeniedLicense === "null"
                  ? "No data Avaliable"
                  : props.driver.DeniedLicense}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              {" "}
              <Text style={styles.textLeft}>
                B. Has any license, permit, or privilegeever been suspended or
                revoked?
              </Text>
            </View>
            <View>
              <Text>
                {props.driver.LicenseSuspended === null ||
                props.driver.LicenseSuspended === "" ||
                props.driver.LicenseSuspended === "null"
                  ? "No data Avaliable"
                  : props.driver.LicenseSuspended}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.sectionDobleColumn}>
            <View>
              <Text>
                {props.driver.DriverSignature === null ||
                props.driver.DriverSignature === "" ||
                props.driver.DriverSignature === "null" ? (
                  <img
                    width={150}
                    height={150}
                    src="data:image/png;base64,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"
                    alt="no image"
                  />
                ) : (
                  <img
                    src={`https://bluagent-files.s3-us-west-2.amazonaws.com/{${props.company.id}}/Drivers/${props.driver.id}/DriverSignature/signature.png`}
                    alt="Driver Signature"
                  />
                )}
              </Text>
            </View>
          </View>

          <br />

          <View style={styles.section}>
            <Text style={styles.heading}>Certification</Text>
          </View>
        </Page>
      </Document>
    </div>
  );
};

export default DocPdfAgreement;
