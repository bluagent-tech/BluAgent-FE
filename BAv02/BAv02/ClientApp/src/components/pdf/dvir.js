// import ReactJS
import React from "react";

// Import Modules
import { Page, View, Document, StyleSheet } from "@react-pdf/renderer";


// logo from form
const Logo =
  "https://bluagent.com/wp-content/uploads/2023/03/BluAgent-Logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});


export default class DVIR extends React.Component {
  render() {
    return (
      <div>
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <div style={{ "position": "absolute", "left": "50%", "marginLeft": "-306px", "top": "0px", "width": "612px", "height": "792px", "borderStyle": "outset", "overflow": "hidden" }}>
                <div style={{ "position": "absolute", "left": "0px", "top": "0px" }}>
                  <img
                    style={{ "width": "612px", "height": "792px" }}
                    src="https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg"
                    alt="white bg"
                  ></img>{" "}
                </div>
                <div
                  style={{ "position": "absolute", "left": "86.00px", "top": "97.00px" }}
                  className="cls_002"
                >
                  <img className="logo-form" src={Logo} style={{ "width": "70px", "position": "relative", "top": "-40px", "margin": "0 auto", "display": "block" }} alt="logo form"></img>
                  <span className="cls_002">
                    DRIVER'S VEHICLE INSPECTION REPORT (DVIR)
                  </span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "154.00px", "top": "122.00px" }}
                  className="cls_003"
                >
                  <span className="cls_003">
                    AS REQUIRED BY THE D.O.T. FEDERAL MOTOR CARRIER SAFETY
                    REGULATIONS
                  </span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "148.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">DVIR Number:</span>
                  <span className="cls_005"> ENRIQUE-20200316-140643</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "164.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Carrier:</span>
                  <span className="cls_005"> GUTIERREZ TOURS</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "306.00px", "top": "164.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Location:</span>
                  <span className="cls_005"> 3mi SSE El Porvenir, BN</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "180.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Carrier DOT No.:</span>
                  <span className="cls_005"> 984230</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "306.00px", "top": "180.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Date:</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "385.00px", "top": "180.00px" }}
                  className="cls_005"
                >
                  <span className="cls_005">03/16/20</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "454.00px", "top": "180.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Odometer:</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "533.00px", "top": "180.00px" }}
                  className="cls_005"
                >
                  <span className="cls_005">903127 mi</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "196.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Driver:</span>
                  <span className="cls_005"> ENRIQUE MORA</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "306.00px", "top": "196.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Truck/Tractor No.:</span>
                  <span className="cls_005"> 104</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "212.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Start Inspection:</span>
                  <span className="cls_005"> 03/16/20 02:06 PM</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "306.00px", "top": "212.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">Truck License Plate:</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "228.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">End Inspection:</span>
                  <span className="cls_005"> 03/16/20 02:22 PM</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "244.00px" }}
                  className="cls_004"
                >
                  <span className="cls_004">VIN:</span>
                  <span className="cls_005"> -1M8TRMPA7XP060837</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "30.00px", "top": "265.00px" }}
                  className="cls_006"
                >
                  <span className="cls_006">USE CHECK (</span>
                  <span className="cls_007">,</span>
                  <span className="cls_006">) IF SATISFACTORY AND USE (</span>
                  <span className="cls_008">✗</span>
                  <span className="cls_006">) IF NOT</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "366.00px", "top": "265.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">
                    D = Driver, M = Mechanic, O = Other
                  </span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "123.00px", "top": "279.00px" }}
                  className="cls_006"
                >
                  <span className="cls_006">SATISFACTORY</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "348.00px", "top": "279.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">
                    Prt = Pre-Trip, Pot = Post-Trip, AdH = AdHoc
                  </span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "318.00px" }}
                  className="cls_010"
                >
                  <span className="cls_010">PASSENGER BUS</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "291.00px", "top": "341.00px" }}
                  className="cls_005"
                >
                  <span className="cls_005">Items</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "149.00px", "top": "361.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">D</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "208.00px", "top": "361.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">M</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "269.00px", "top": "361.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">O</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "445.00px", "top": "361.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">D</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "504.00px", "top": "361.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">M</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "565.00px", "top": "361.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">O</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "128.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Prt</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "146.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Pot AdH</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "188.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Prt</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "206.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Pot AdH</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "248.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Prt</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "266.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Pot AdH</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "424.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Prt</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "442.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Pot AdH</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "484.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Prt</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "502.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Pot AdH</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "544.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Prt</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "562.00px", "top": "375.00px" }}
                  className="cls_011"
                >
                  <span className="cls_011">Pot AdH</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "393.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Fluid Leaks Under</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "395.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Loose Wires, Hose</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "407.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Bus</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "409.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Connections OR</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "435.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Belts in Engine</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "443.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Oil Level</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "449.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Compartment</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "477.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Radiator Coolant</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "485.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Battery</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "491.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Level</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "519.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Transmission</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "521.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Unusual Engine Noise</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "548.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Gauges and Warning</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "556.00p" }}
                  className="cls_009"
                >
                  <span className="cls_009">Switches</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "562.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Lights</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "590.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Horn</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "592.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Fans and Defrosters</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "620.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Stop Arm Control</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "624.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Wipers and Washers</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "634.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">(Warning Control)</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "659.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Inside and Outside</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "661.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Brake Pedal and</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "673.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Mirrors</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "675.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Warning Light</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "701.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Operation of Service</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "709.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Emergency Equipment</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "715.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Door</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "199.00px", "top": "774.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">
                    Copyright ©2017 BluAgent Technologies, Inc
                  </span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "549.00px", "top": "774.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Page 1 of 2</span>
                </div>
              </div>
              <div style={{ "position": "absolute", "left": "50%", "marginLeft": "-306px", "top": "802px", "width": "612px", "height": "792px", "borderStyle": "outset", "overflow": "hidden" }}>
                <div style={{ "position": "absolute", "left": "0px", "top": "0px" }}>
                  <img
                    style={{ "width": "612px", "height": "792px" }}
                    src="https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg"
                    width={612}
                    height={792}
                    alt="white background"
                  ></img>{" "}
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "15.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">First Aid Kit</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "17.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Entrance Steps</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "44.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Cleanliness of</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "52.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Condition of Floor</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "58.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Interior</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "86.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Emergency Door and</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "88.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Headlights, Flashers</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "100.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Buzzer</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "100.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">and 4-way Flashers</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "128.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Right Front Tire and</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "130.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Front of Bus -</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "142.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Wheel</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "144.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Windshield</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "170.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Left Front Tire and</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "178.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Stop Arm (School Bus)</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "184.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Wheel</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "213.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Left Side of Bus -</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "217.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Exhaust System</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "227.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Windows and Lights</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "252.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Left Rear Tires and</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "254.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Rear of Bus -</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "266.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Wheels</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "268.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Windows and Lights</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "295.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Right Rear Tires and</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "299.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Tail Pipe</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "309.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Wheels</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "334.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Right Side of Bus -</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "342.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Driver's Seat and Belt</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "348.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Windows and Lights</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "377.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Parking Brake or</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "381.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Directional Lights</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "391.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Service Brake</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "416.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Clutch</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "313.00px", "top": "418.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Steering</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "18.00px", "top": "445.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Wheelchair Lift</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "10.00px", "top": "486.00px" }}
                  className="cls_006"
                >
                  <span className="cls_006">REMARKS:</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "25.00px", "top": "510.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">CONDITION SATISFACTORY</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "321.00px", "top": "510.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">DEFECTS CORRECTED</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "25.00px", "top": "527.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">CONDITION UNSATISFACTORY</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "321.00px", "top": "527.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">NO DEFECT FOUND</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "161.00px", "top": "566.00px" }}
                  className="cls_006"
                >
                  <span className="cls_006">DRIVER'S SIGNATURE:</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "480.00px", "top": "566.00px" }}
                  className="cls_006"
                >
                  <span className="cls_006">DATE:</span>
                  <span className="cls_009"> 03/16/20</span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "199.00px", "top": "774.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">
                    Copyright ©2017 BluAgent Technologies, Inc
                  </span>
                </div>
                <div
                  style={{ "position": "absolute", "left": "549.00px", "top": "774.00px" }}
                  className="cls_009"
                >
                  <span className="cls_009">Page 2 of 2</span>
                </div>
              </div>

            </View>
          </Page>
        </Document>
      </div>
    );
  }
}