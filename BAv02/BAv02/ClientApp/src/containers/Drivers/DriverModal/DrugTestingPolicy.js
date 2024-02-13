import React from "react";
import { Button } from "reactstrap";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

export default class DrugTestingPolicy extends React.Component {
  constructor() {
    super();

    this.state = {
      ready: false,
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

  render() {
    const { ready } = this.state;

    const styles = StyleSheet.create({
      page: {
        backgroundColor: "white",
      },
      textCenter: {
        textAlign: "center",
        fontSize: 18,
        textTransform: "capitalize",
        fontWeight: "bold",
        padding: "10px 25px",
      },
      sectionTitlesBlue: {
        color: "white",
        textAlign: "center",
        backgroundColor: "#4788C7",
        padding: "10px 25px",
      },
      sectionInformation: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        padding: "8px 25px",
      },
      column: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "100%",
        flex: 1,
        fontSize: 14,
      },
    });

    const MyDocumentPDF = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.sectionTitlesBlue}>
            <Text>Drug and Alcohol Testing Policy Receipt</Text>
          </View>
          <View style={styles.textCenter}>
            <Text>
              {this.props.company.Der === null ||
              this.props.company.Der === "null" ||
              this.props.company.Der === "null" ||
              this.props.company.Der === undefined
                ? "Information not Avaliable"
                : this.props.company.Der}
            </Text>
          </View>
          <br />
          <View style={styles.textCenter}>
            <Text>
              {this.props.company.PhysicalAddress === null ||
              this.props.company.PhysicalAddress === "null" ||
              this.props.company.PhysicalAddress === "null" ||
              this.props.company.PhysicalAddress === undefined
                ? "Information not Avaliable"
                : this.props.company.PhysicalAddress + this.props.company.State}
            </Text>
          </View>

          <View style={styles.sectionTitlesBlue}>
            <Text>Driver Information</Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Name: </Text>
            <Text style={styles.column}>
              {this.props.driver.Name === undefined ||
              this.props.driver.Name === null
                ? "No Information Avaliable"
                : `${this.props.driver.Name}  ${this.props.driver.LastName}`}
            </Text>
          </View>
          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Date of Birth:</Text>
            <Text style={styles.column}>
              {this.props.driver.Birthdate === undefined ||
              this.props.driver.Birthdate === null
                ? "No Information Avaliable"
                : `${this.props.driver.Birthdate}`}
            </Text>
          </View>
          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Gender:</Text>
            <Text style={styles.column}>
              {this.props.driver.Gender === undefined ||
              this.props.driver.Gender === null
                ? "No Information Avaliable"
                : `${this.props.driver.Gender}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Phone Number:</Text>
            <Text style={styles.column}>
              {this.props.driver.PhoneNumber === undefined ||
              this.props.driver.PhoneNumber === null
                ? "No Information Avaliable"
                : `${this.props.driver.PhoneNumber}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Social Security:</Text>
            <Text style={styles.column}>
              {this.props.driver.Ssn === undefined ||
              this.props.driver.Ssn === null
                ? "No Information Avaliable"
                : `${this.props.driver.Ssn}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Country:</Text>
            <Text style={styles.column}>
              {this.props.driver.Country === undefined ||
              this.props.driver.Country === null
                ? "No Information Avaliable"
                : `${this.props.driver.Country}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Email:</Text>
            <Text style={styles.column}>
              {this.props.driver.Email === undefined ||
              this.props.driver.Email === null
                ? "No Information Avaliable"
                : `${this.props.driver.Email}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Address:</Text>
            <Text style={styles.column}>
              {this.props.driver.Street === undefined ||
              this.props.driver.Street === null
                ? "No Information Avaliable"
                : `${this.props.driver.Street}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>Hire Date:</Text>
            <Text style={styles.column}>
              {this.props.driver.HiringDate === undefined ||
              this.props.driver.HiringDate === null
                ? "No Information Avaliable"
                : `${this.props.driver.HiringDate}`}
            </Text>
          </View>

          <View style={styles.sectionTitlesBlue}>
            <Text>Driver License Information</Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>License Number:</Text>
            <Text style={styles.column}>
              {this.props.driver.License === undefined ||
              this.props.driver.License === null
                ? "No Information Avaliable"
                : `${this.props.driver.License}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>License Class:</Text>
            <Text style={styles.column}>
              {this.props.driver.TypeLicense === undefined ||
              this.props.driver.TypeLicense === null
                ? "No Information Avaliable"
                : `${this.props.driver.TypeLicense}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>License Expiration Date:</Text>
            <Text style={styles.column}>
              {this.props.driver.LicenseExpiration === undefined ||
              this.props.driver.LicenseExpiration === null
                ? "No Information Avaliable"
                : `${this.props.driver.LicenseExpiration}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>License:</Text>
            <Text style={styles.column}>
              {this.props.driver.DriverSignature === undefined ||
              this.props.driver.DriverSignature === null ||
              this.props.driver.DriverSignature === "null" ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAADPElEQVRYhe3YW0/TYBzH8W+7laWFrbIJniIQCboZ70wMxNOFCR7iWS9IfAsmRhOC70AWEr3xHXjjjQSjMWrijYCaeLrQ2N1oBOKJyVG2MgqrF01lw3V2Q1Zi/N2s6+H/fPI8z9pnhf9ZXgR742D3035ANn3ZIw87d496aMqLmLMdAHYKWfFRe89gvVegpREADnY/Nb2GFMqDy22C3/5yv6uVqbRB102Nj8k0myMy8Y7thGskT3CH4s+A/CFGVSTiHTGa6hRGxnS6br5jfMbwBGhHXLpjtSF/A8LqQvqdDjz54qe9NcqtxwlGxtKcv/GO03tjVMsrMycPNwsF9xfsQTtyQOLMvigRVWF8Wqe3XyOlV7YniwLBe+QfgeAt0hUQvEO6BoI3SNdAnwgBP4SDEheORtkYtpC3BzT0AkgRqFOguRa2RaBBBbnKquEroVscTxUFUAOgSFBfDS1h2LIGGkNQH5S4dMxCJqd0+gY1MhmDUABCAZBE2BCEtQpU+axa1RI0hawaLWGrpiJZbYiF7zDFgQ0h2BiERhUi8uK6zP6skReRo5M6ff0aNaLBpiBsCVtQpwhYNRtVq42GUBlAyed8kZ1c5NdJnWt3NaZSRmkT+w9tOdbyOxzJXZfp8zCTlTi1N8r6WoWvE4vIUuLUVlGgU+YWIJk2eT8BHydhQge/JHF8T5R1OcjxlMG3GZNXX2Bw2GRML2/J6QqYyUF9mIDvaYG5hfxz5IDEiT1R6tZYyCu9Gs+GDJIpk5k5ePEJ3oyCsVC4jZKBblBLIwes4Q6HFH6kdAZeJZjNLA7352mT/iGToSkTt/3pCHSLKoQ8u98ZaWQhkYTnn6yeLRu4nNjIiAMSrLn7ZMRE+w4L2QoDbeSZ/dZj0QlpmjA8aTIw7DzgKwb8hdxXHAkwO+9cw3FFHVv7V4yAxNaTUa7eSfB5PM3rtwkuHo2hVrtbma9oD9rJe+KUeDOvCBDKR1YMCOUhHedgk1pkDbScqFVcOxf79Qbj+j2NeMd2oPCcrGgP2inlf7cnQHCP9AwI7pCr/vXbCv0SSk97z2C9kBUfYbIDeP7gctsu8HiIc/Owc/eoKWYPAC+BjNeefyc/Ad+5nEkiap61AAAAAElFTkSuQmCC" />
              ) : (
                <img
                  src={this.props.driver.DriverSignature}
                  alt={`${this.props.driver.Name} ${this.props.driver.LastName}`}
                />
              )}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>
              A. Have you ever been denied a license, <br />
              permit, or privilege to operate a motor:
            </Text>
            <Text style={styles.column}>
              {this.props.driver.DeniedLicense === undefined ||
              this.props.driver.DeniedLicense === null
                ? "No "
                : `${this.props.driver.DeniedLicense}`}
            </Text>
          </View>

          <View style={styles.sectionInformation}>
            <Text style={styles.column}>
              B. Has any license, permit,
              <br /> or privilegeever been suspended or:
            </Text>
            <Text style={styles.column}>
              {this.props.driver.LicenseSuspended === undefined ||
              this.props.driver.LicenseSuspended === null
                ? "No "
                : `${this.props.driver.LicenseSuspended}`}
            </Text>
          </View>

          <View style={styles.sectionTitlesBlue}>
            <Text>Certification</Text>
          </View>
        </Page>
      </Document>
    );

    return (
      <div>
        {ready && (
          <PDFDownloadLink
            document={MyDocumentPDF}
            fileName={`PDF Agreement - ${this.props.driver.Name} ${this.props.driver.LastName} `}
          >
            {({ blob, url, loading }) =>
              loading ? (
                "Loading document..."
              ) : (
                <div className="text-center">
                  <Button
                    className="text-white px-5 py-2 btn btn-success"
                    onClick={() => this.setState({ ready: false })}
                  >
                    Download PDF
                  </Button>
                </div>
              )
            }
          </PDFDownloadLink>
        )}
        {!ready && (
          <div className="text-center">
            <Button
              className="buttons-royal text-white px-5 py-2 btn"
              onClick={() => this.toggle()}
            >
              Generate Drug Testing Policy PDF
            </Button>
          </div>
        )}
      </div>
    );
  }
}
