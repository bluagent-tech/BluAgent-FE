import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import collection from "../../ColleccionProcess.json";
import Logo from "../../assets/img/brand/logo.png";
import Check from "../../assets/img/brand/big-check-mark.png";
import Info from "../../assets/img/brand/information-button.png";
const DrugTestCollection = (props) => {
  Font.register({
    family: "Lato",
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      fontSize: "16pt",
      padding: 50,
    },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      paddingBottom: 50,
      paddingTop: 50,
      color: "#20a8d8",
    },
    headingTop: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      paddingTop: 20,
      color: "#20a8d8",
    },
    item: {
      marginBottom: 5,
      flexDirection: "row",
    },
    secundaryItem: {
      marginBottom: 5,
      flexDirection: "row",
      paddingLeft: 20,
      paddingRight: 20,
    },
    bulletPoint: {
      width: 10,
      fontSize: 10,
    },
    bulletPointImage: {
      marginRight: 3,
      width: 10,
      height: 10,
      fontSize: 10,
    },
    itemImage: {
      marginBottom: 5,
      flexDirection: "row",
    },
    itemContent: {
      flex: 1,
      fontSize: 10,
      fontFamily: "Lato",
    },
    image: {
      marginVertical: 15,
      width: 150,
    },
    textConfirmation: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 30
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.image} src={Logo} />
        <View>
          <Text style={styles.headingTop}>CONFIRMATION PAGE </Text>
        </View>
        <View style={styles.textConfirmation}>
          <View style={styles.itemImage}>
            <Image style={styles.bulletPointImage} src={Check} />
            <Text style={styles.itemContent}>
              Thank you! Your {props.test} has been scheduled!
            </Text>
          </View>
          <View style={styles.itemImage}>
            <Image style={styles.bulletPointImage} src={Check} />
            <Text style={styles.itemContent}>
              The collections Site has been notified and will be able to perform
              the collection after the donor arrive at the collection site.
            </Text>
          </View>
          <View style={styles.itemImage}>
            <Image style={styles.bulletPointImage} src={Info} />
            <Text style={styles.itemContent}>
              Please Advise the donor to arrive on time at the collection agency
              with proper form of identification and the test notification email
              sent by the system.
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.heading}>
            During the collection process, a urine specimen collector will:
          </Text>
        </View>
        {collection.map((list, index) => {
          return (
            <View key={index} style={styles.item}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>{list.text}</Text>
            </View>
          );
        })}
        {collection[12].options.map((list, index) => {
          return (
            <View key={index} style={styles.secundaryItem}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.itemContent}>{list}</Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default DrugTestCollection;
