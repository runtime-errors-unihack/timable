import { FC, useRef } from "react";
import "./index.styles.css";
import DonutChart from "../../components/DonutChart";
import ColumChart from "../../components/ColumnChart";
import StaticCards from "../../components/StatisticCards";
import TypeChart from "../../components/TypeChart";
import { Button } from "antd";
import {
  Document,
  Text,
  Page,
  PDFViewer,
  View,
  PDFDownloadLink,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const Analytics: FC = () => {
  const today = new Date();

  // Get day, month, and year
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();

  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const openPdfInNewWindow = () => {
    fetch("/path-to-pdf") // Replace '/path-to-pdf' with the actual path or URL of your PDF
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      })
      .catch((error) => console.error("Error fetching PDF:", error));
  };

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/roboto/2.0.1/Roboto-Bold.ttf",
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/roboto/2.0.1/Roboto-Regular.ttf",
      },
    ],
  });

  // Create styles for the document
  const styles = StyleSheet.create({
    page: { paddingTop: 30, paddingBottom: 30, paddingHorizontal: 30 },
    title: {
      fontSize: 20,
      marginBottom: 10,
      fontFamily: "Roboto-Bold",
      textAlign: "center",
    }, // Apply the font family
    subtitle: { fontSize: 14, marginBottom: 10, fontFamily: "Roboto-Regular" }, // Apply the font family
    table: {
      display: undefined,
      width: "auto",
      marginTop: 10,
      border: "1px solid black",
    },
    row: { flexDirection: "row", width: '600px', borderRight: '1px solid red' },
    cell: {
      padding: 5,
      borderColor: "#000",
      borderRight: "1px solid black",
      borderLeft: "1px solid black",
      fontSize: '12px',
      fontWeight: 600,
      width: 200,
      textAlign: 'center'
    },
    headerCell: {
      padding: 5,
      borderBottom: 1,
      backgroundColor: "#eee",
      borderColor: "#000",
      fontSize: "14px",
      borderRight: '1px solid black',
      width: 400
    },
  });

  const MyDoc = () => (
    <Document>
      <Page size="A4">
        <View>
          <Text>TimAble Report - {formattedDate}</Text>
        </View>
        {/* Table */}
        <Text>
          "Disability-Related Issues: Column Chart Showing the Breakdown by
          Category"
        </Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.headerCell}>
              <Text>Visual Impairment</Text>
            </View>
            <View style={styles.headerCell}>
              <Text>Physical Impairment</Text>
            </View>
            <View style={styles.headerCell}>
              <Text>Auditory Disabilities</Text>
            </View>
            <View style={styles.headerCell}>
              <Text>Speech Disabilities</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>233</Text>
            </View>
            <View style={styles.cell}>
              <Text>33</Text>
            </View>
            <View style={styles.cell}>
              <Text>54</Text>
            </View>
            <View style={styles.cell}>
              <Text>23</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  const handleOpenAndDownload = ({ blob, url, loading, error }: any) => {
    if (!loading) {
      // Open PDF in a new window
      window.open(url, "_blank");

      // Download PDF
      const anchor = document.createElement("a");
      anchor.href = url as any;
      anchor.download = "somename.pdf";
      anchor.click();
    }
  };

  return (
    <>
      <div className="chartContainers">
        <DonutChart />
        <ColumChart />
      </div>

      <TypeChart />
      <div className="buttonPdfContainer">
        <StaticCards />

        <Button type="primary" className="pdfButton">
          <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
            {({ blob, url, loading, error }) => (
              <div>
                {loading ? (
                  "Loading document..."
                ) : (
                  <button
                    onClick={() =>
                      handleOpenAndDownload({ blob, url, loading, error })
                    }
                  >
                    Open PDF in new window and Download PDF
                  </button>
                )}
              </div>
            )}
          </PDFDownloadLink>
          {/* </PDFDownloadLink> */}
        </Button>
      </div>
    </>
  );
};

export default Analytics;
