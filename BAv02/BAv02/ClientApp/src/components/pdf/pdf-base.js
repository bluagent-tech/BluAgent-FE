import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontSize: '16pt',
  },
  section: {
    margin: 2,
    padding: 1,
    flexGrow: 1
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  textMax: {
    fontSize: '16pt',
    color: '#000000',
    textAlign: 'center',
    marginTop: '70px'
  },
  textMin: {
    fontSize: '10pt',
    color: '#696969',
    textAlign: 'center'
  },
  carrierText: {
    marginTop: '15px',
    marginLeft: '16px'
  },
  textLocation: {
    position: 'absolute',
    right: '16px',
    float: 'right',
    top: '150px',
    fontSize: '12pt'
  },
  textDate: {
    position: 'absolute',
    right: '16px',
    float: 'right',
    top: '160px',
    fontSize: '12pt'
  },
  textTruck: {
    position: 'absolute',
    right: '16px',
    float: 'right',
    top: '210px',
    fontSize: '12pt'
  },
  
  textPlate: {
    position: 'absolute',
    right: '16px',
    float: 'right',
    top: '230px',
    fontSize: '12pt'
  },
  
  carrierTextLeft: {
    position: 'relative',
    left: '16px',
    top: '80px',
    paddingTop: '5px',
    fontSize: '12pt'
  },
  textCheck: {
    position: 'relative',
    left: '32px',
    top: '80px',
    padding: '5px',
    fontSize: '10pt'
  },
  textCheckRigth: {
    position: 'relative',
    left: '32px',
    top: '90px',
    padding: '5px',
    fontSize: '10pt'
  },
  textDriver: {
    position: 'absolute',
    right: '16px',
    float: 'right',
    top: '340px',
    fontSize: '10pt'
  },
  textDrivers: {
    position: 'absolute',
    right: '16px',
    float: 'right',
    top: '350px',
    fontSize: '10pt'
  },
  textVehicleType: {
    position:'relative',
    fontSize: '20pt',
    left: '16pt',
    textTransform: 'uppercase',
    top: '100px'
  },
  textItems: {
    position:'relative',
    textAlign: 'center',
    fontSize: '12pt',
    fontWeight: 'bold',
    top: '120px'
  }

});  

const MyDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
          <Image style={styles.image} src="https://bluagent.com/wp-content/uploads/2023/03/BluAgent-Logo.png" />
          <Text style={styles.textMax}>DRIVER'S VEHICLE INSPECTION REPORT (DVIR)</Text>
          <Text style={styles.textMin}>AS REQUIRED BY THE D.O.T. FEDERAL MOTOR CARRIER SAFETY REGULATIONS</Text>
          <Text style={styles.carrierTextLeft}>DIVR NUmber: ENRIQUE-10203145-01</Text>
          <Text style={styles.carrierTextLeft}>Carrier: Gutierrez Tours</Text><Text style={styles.textLocation}>Location: Some Location</Text>
          <Text style={styles.carrierTextLeft}>Carrier DOT: 984230</Text><Text style={styles.textDate}>Date: 02/03/2020 Odemoter: 903127 mi </Text>
          <Text style={styles.carrierTextLeft}>Driver: Enrique Mora</Text><Text style={styles.textTruck}>Truck/Tractor No: 104</Text>
          <Text style={styles.carrierTextLeft}>Start Inspection: 03/16/20 02:06 PM</Text><Text style={styles.textPlate}>Truck Licenese Plate:JSUS4LIFE</Text>
          <Text style={styles.carrierTextLeft}>End Inspection: ENRIQUE-10203145-01</Text>
          <Text style={styles.carrierTextLeft}>VIN: -1M8TRMPA7XP0608371</Text>
          <Text style={styles.textCheck}>USE CHECK( ✓ ) IF SATISFACOTRY AND USE ( ✗ ) IF NOT</Text>
          <Text style={styles.textDriver}>D = Driver, M = Mechanic, O = Other</Text>
          <Text style={styles.textCheck}> SATISFACOTRY </Text>
          <Text style={styles.textDrivers}>Prt = Pre-Trip, Pot = Post-trip, Adh = AdHoc</Text>
          <Text style={styles.textVehicleType}>passanger bus</Text>
          <Text style={styles.textItems}>Items</Text>
          <Text style={styles.textItems}></Text>
         
      </View>
    </Page>
  </Document>

)

const pdfGenerator = () => (
  <div>
    <PDFDownloadLink className="btn btn-dark text-white mt-5" document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading Report...' : 'Download Report!')}
    </PDFDownloadLink>
  </div>
)

export default pdfGenerator;