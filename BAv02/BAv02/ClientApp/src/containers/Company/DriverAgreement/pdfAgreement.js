import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function PdfAgreement() {
  return (
    <Document>
      <Page style={styles.page}>
        <div>Ok</div>
      </Page>
    </Document>
  );
}
