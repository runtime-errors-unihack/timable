import { FC, useEffect, useState } from "react";
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
  View,
  PDFDownloadLink,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import axios from "axios";
import { GetPinModel } from "../../models/pin-model";
import { StatusEnum, TypeEnum } from "../../utils/constants";

const Analytics: FC = () => {
  const [screenshotTypeChart, setScreenshotTypeChart] = useState<null | string>(
    null
  );
  const [screenshotDonutChart, setScreenshotDonutChart] = useState<
    null | string
  >(null);
  const [screenshotColumnChart, setScreenshotColumnChart] = useState<
    null | string
  >(null);

  const captureScreenshot = async (containerId?: any) => {
    const container = document.getElementById(containerId);

    if (container) {
      try {
        const canvas = await html2canvas(container);
        return canvas.toDataURL("image/png");
      } catch (error) {
        console.error("Error capturing screenshot:", error);
        return null;
      }
    }

    return null;
  };

  useEffect(() => {
    const captureAndSetScreenshots = async () => {
      // Wait for 3 seconds before capturing the screenshots
      setTimeout(async () => {
        const screenshotTypeChart = await captureScreenshot("type-chart");
        const screenshotDonutChart = await captureScreenshot("donut-chart");
        const screenshotColumnChart = await captureScreenshot("column-chart");

        setScreenshotTypeChart(screenshotTypeChart);
        setScreenshotDonutChart(screenshotDonutChart);
        setScreenshotColumnChart(screenshotColumnChart);
      }, 3000); // 3000 milliseconds = 3 seconds
    };

    captureAndSetScreenshots();
  }, []);

  const [pins, setPins] = useState<Array<GetPinModel>>([]);
  const [cityAverage, setCityAverage] = useState<number>();
  const [firstThree, setFirstThree] = useState<[string, unknown][]>([]);

  useEffect(() => {
    const getPins = async () => {
      const allPins = await axios.get("http://localhost:8000/pin");
      setPins(allPins.data);
    };
    getPins();
  }, []);

  useEffect(() => {
    const getStatistics = async () => {
      const statistics = await axios.get(
        "http://localhost:8000/statistics/area-accessibility-score"
      );
      let counter = 0;
      let sum = 0;
      if (statistics.data) {
        Object.entries(statistics.data).forEach(([key, value]: any) => {
          counter = counter + 1;
          sum = sum + value;
        });
        setCityAverage(counter ? sum / counter : 0);
        const sortedArray = Object.entries(statistics.data).sort(
          ([, valueA]: any, [, valueB]: any) => {
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
          }
        );
        setFirstThree(
          sortedArray.slice(sortedArray.length - 3, sortedArray.length)
        );
      }
    };
    getStatistics();
  }, []);

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const styles = StyleSheet.create({
    reportTitle: {
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
      fontWeight: 600,
      marginBottom: 30,
    },

    subTitle: {
      fontSize: 14,
      textAlign: "left",
      // marginTop: 30,
      paddingTop: 40,
      fontWeight: 600,
    },
    category: {
      fontWeight: 600,
      border: "1px solid black",
      fontSize: 12,
      width: 120,
      textAlign: "center",
    },
    tableContainer: {
      // border: "1px solid black",
      marginTop: 20,
      width: 560,
    },
    tableColumn: {
      display: "flex",
      width: 600,
      justifyContent: "space-evenly",
      flexDirection: "row",
    },

    firstChartContainer: {
      display: "flex",
      flexDirection: "row",
    },
    legend: {
      fontSize: 12,
      width: 500,
      margin: "5px 5px 25px 5px",
    },
    legendContainer: {
      paddingTop: 60,
      paddingLeft: 50,
    },
    normalText: { paddingTop: 50, fontSize: 12 },
    colm1: { backgroundColor: "#f5d55a", padding: 5, fontSize: 12 },
    colm2: { backgroundColor: "#25a377", fontSize: 12 },
    colm3: { backgroundColor: "#d14647", fontSize: 12 },
    colm4: { backgroundColor: "#3572a8", fontSize: 12 },

    reportContainer: {
      padding: 10,
    },

    containerFirstChart: {
      display: "flex",
      flexDirection: "row",
    },

    subTitle1: {
      fontSize: 14,
      fontWeight: 600,
      textAlign: "left",
      paddingTop: 20,
    },

    monthTitle: {
      border: "1px solid black",
      fontSize: 12,
      width: 60,
    },
    monthContainer: {
      display: "flex",
      flexDirection: "row",
      textAlign: "center",
      paddingLeft: "60px",
      paddingTop: "20px",
    },
    rowContainer: {
      width: 660,
      display: "flex",
      flexDirection: "row",
    },
    rowLastChartCell: {
      border: "1px solid black",
      textAlign: "center",
      fontSize: "12px",
      width: "60px",
    },
    normalTextTable: {
      width: "60px",
      fontSize: "10px",
      border: "1px solid black",
    },
    cityAverage: {
      fontSize: 16,
      fontWeight: 600,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 10,
    },
    zoneTitle: {
      margin: 5,
    },
    cityAverageContainer: {
      padding: 10,
    },
    cityScore: {
      color: "#d14647",
      fontSize: 16,
      fontWeight: 700,
    },
    normalTextZone: {
      fontSize: 14,
      color: "#25a377",
    },
    topZonesContainer: {
      padding: "20",
      display: "flex",
      justifyContent: "flex-start",
      width: 400,
      textAlign: "left",
    },
    zoneTitleTitle: {
      marginLeft: 5,
      fontSize: 14,
    },
  });

  const MyDoc = () => (
    <Document>
      <Page size="A4">
        <View style={styles.reportContainer}>
          <Text style={styles.reportTitle}>
            TimAble Report - {formattedDate}
          </Text>
          <Text style={styles.subTitle1}>
            Disability-Related Issues: Breakdown by Category
          </Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableColumn}>
              <Text style={styles.category}>Visual Impairment</Text>
              <Text style={styles.category}>Physical Impairment</Text>
              <Text style={styles.category}>Auditory Disabilities</Text>
              <Text style={styles.category}>Speech Disabilities</Text>
            </View>
            <View style={styles.tableColumn}>
              <Text style={styles.category}>
                {
                  pins.filter(
                    (pin) =>
                      pin.disability_types[0].name ===
                      TypeEnum.VISUAL_IMPAIRMENT
                  ).length
                }
              </Text>
              <Text style={styles.category}>
                {" "}
                {
                  pins.filter(
                    (pin) =>
                      pin.disability_types[0].name ===
                      TypeEnum.PHYSICAL_IMPAIRMENT
                  ).length
                }
              </Text>
              <Text style={styles.category}>
                {
                  pins.filter(
                    (pin) =>
                      pin.disability_types[0].name ===
                      TypeEnum.AUDITORY_DISABILITIES
                  ).length
                }
              </Text>
              <Text style={styles.category}>
                {" "}
                {
                  pins.filter(
                    (pin) =>
                      pin.disability_types[0].name ===
                      TypeEnum.SPEECH_DISABILITIES
                  ).length
                }
              </Text>
            </View>
          </View>

          <View style={styles.containerFirstChart}>
            {screenshotTypeChart && (
              <Image
                style={{ marginTop: 20, width: 280, height: 300 }}
                src={screenshotTypeChart}
              />
            )}
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>
                Visual Impairment <Text style={styles.colm1}>First column</Text>
              </Text>
              <Text style={styles.legend}>
                Physical Impairment{" "}
                <Text style={styles.colm2}>Second Column</Text>
              </Text>
              <Text style={styles.legend}>
                Speech Disabilities{" "}
                <Text style={styles.colm3}>Third Column</Text>
              </Text>
              <Text style={styles.legend}>
                Auditory Disabilities{" "}
                <Text style={styles.colm4}>Fourth Column</Text>
              </Text>
            </View>
          </View>
          <Text style={styles.subTitle}>Accessible - Non Accessible Ratio</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableColumn}>
              <Text style={styles.category}>Accessible</Text>
              <Text style={styles.category}>Non-Accessible</Text>
            </View>
            <View style={styles.tableColumn}>
              <Text style={styles.category}>
                {(
                  (pins.filter((pin) => pin.status === StatusEnum.GOOD).length /
                    pins.length) *
                  100
                ).toFixed(2)}
                %
              </Text>
              <Text style={styles.category}>
                {(
                  (pins.filter((pin) => pin.status === StatusEnum.BAD).length /
                    pins.length) *
                  100
                ).toFixed(2)}
                %
              </Text>
            </View>
          </View>
          {screenshotDonutChart && (
            <Image
              style={{
                marginTop: 10,
                width: 500,
                height: 230,
                paddingBottom: 20,
              }}
              src={screenshotDonutChart}
            />
          )}

          <Text style={styles.subTitle}>Progress over the last 8 months</Text>
          <Text style={styles.normalText}>
            Total pins added in the month - Remaining active issues - Closed
            issues
          </Text>
          <View style={styles.monthContainer}>
            <Text style={styles.monthTitle}>November</Text>
            <Text style={styles.monthTitle}>October</Text>
            <Text style={styles.monthTitle}>September</Text>
            <Text style={styles.monthTitle}>August</Text>
            <Text style={styles.monthTitle}>July</Text>
            <Text style={styles.monthTitle}>June</Text>
            <Text style={styles.monthTitle}>May</Text>
            <Text style={styles.monthTitle}>April</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.normalTextTable}>Total issues added</Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 10 &&
                    (pin.status === StatusEnum.BAD ||
                      pin.status === StatusEnum.CLOSED)
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 9 &&
                    (pin.status === StatusEnum.BAD ||
                      pin.status === StatusEnum.CLOSED)
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 8 &&
                    (pin.status === StatusEnum.BAD ||
                      pin.status === StatusEnum.CLOSED)
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 7 &&
                    (pin.status === StatusEnum.BAD ||
                      pin.status === StatusEnum.CLOSED)
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 6 &&
                    (pin.status === StatusEnum.BAD ||
                      pin.status === StatusEnum.CLOSED)
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 5 &&
                    (pin.status === StatusEnum.BAD ||
                      pin.status === StatusEnum.CLOSED)
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 4 &&
                    (pin.status === StatusEnum.BAD ||
                      pin.status === StatusEnum.CLOSED)
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 3 &&
                    (pin.status === StatusEnum.BAD ||
                      pin.status === StatusEnum.CLOSED)
                ).length
              }
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.normalTextTable}>Issues Closed</Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 10 &&
                    pin.status === StatusEnum.CLOSED
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 9 &&
                    pin.status === StatusEnum.CLOSED
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 8 &&
                    pin.status === StatusEnum.CLOSED
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 7 &&
                    pin.status === StatusEnum.CLOSED
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 6 &&
                    pin.status === StatusEnum.CLOSED
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 5 &&
                    pin.status === StatusEnum.CLOSED
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 4 &&
                    pin.status === StatusEnum.CLOSED
                ).length
              }
            </Text>
            <Text style={styles.rowLastChartCell}>
              {
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 3 &&
                    pin.status === StatusEnum.CLOSED
                ).length
              }
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.normalTextTable}>Remaining Issues</Text>
            <Text style={styles.rowLastChartCell}>
              {pins.length -
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 10 &&
                    pin.status === StatusEnum.BAD
                ).length}
            </Text>
            <Text style={styles.rowLastChartCell}>
              {pins.length -
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 9 &&
                    pin.status === StatusEnum.BAD
                ).length}
            </Text>
            <Text style={styles.rowLastChartCell}>
              {pins.length -
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 8 &&
                    pin.status === StatusEnum.BAD
                ).length}
            </Text>
            <Text style={styles.rowLastChartCell}>
              {pins.length -
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 7 &&
                    pin.status === StatusEnum.BAD
                ).length}
            </Text>
            <Text style={styles.rowLastChartCell}>
              {pins.length -
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 6 &&
                    pin.status === StatusEnum.BAD
                ).length}
            </Text>
            <Text style={styles.rowLastChartCell}>
              {pins.length -
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 5 &&
                    pin.status === StatusEnum.BAD
                ).length}
            </Text>
            <Text style={styles.rowLastChartCell}>
              {pins.length -
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 4 &&
                    pin.status === StatusEnum.BAD
                ).length}
            </Text>
            <Text style={styles.rowLastChartCell}>
              {pins.length -
                pins.filter(
                  (pin) =>
                    new Date(pin.date_created).getMonth() === 3 &&
                    pin.status === StatusEnum.BAD
                ).length}
            </Text>
          </View>
          {screenshotColumnChart && (
            <Image
              style={{ marginTop: 20, width: 390, height: 290 }}
              src={screenshotColumnChart}
            />
          )}
        </View>
        <View style={styles.cityAverageContainer}>
          <Text style={styles.cityAverage}>
            City Average -{" "}
            <Text style={styles.cityScore}>
              {(cityAverage ? cityAverage * 100 : 0).toFixed(2)}
            </Text>
          </Text>
        </View>
        <View style={styles.topZonesContainer}>
          <Text style={styles.zoneTitleTitle}>
            Top zones - according to the zone accessibility score
          </Text>
          {firstThree.length && (
            <>
              <View style={styles.zoneTitle}>
                <Text style={styles.normalTextZone}>
                  {" "}
                  {`${firstThree[0][0] ?? ""} ${firstThree[0][1] ?? 0}`}{" "}
                </Text>
              </View>
              <View style={styles.zoneTitle}>
                <Text style={styles.normalTextZone}>
                  {`${firstThree[1][0] ?? ""} ${firstThree[1][1] ?? 0}`}{" "}
                </Text>
              </View>
              <View style={styles.zoneTitle}>
                <Text style={styles.normalTextZone}>
                  {" "}
                  {`${firstThree[2][0] ?? ""} ${firstThree[2][1] ?? 0}`}
                </Text>
              </View>
            </>
          )}
        </View>
      </Page>
    </Document>
  );

  const handleOpenAndDownload = ({ blob, url, loading, error }: any) => {
    if (url) {
      window.open(url, "_blank");
      const anchor = document.createElement("a");
      anchor.href = url as any;
      anchor.download = "somename.pdf";
      anchor.click();
      return;
    } else {
      // If loading is true, wait for 3 seconds and then try again
      setTimeout(() => {
        handleOpenAndDownload({ blob, url, loading, error });
      }, 4000); // 3000 milliseconds = 3 seconds
    }
  };

  return (
    <>
      <div className="chartContainers">
        <div id="donut-chart">
          <DonutChart
            high={(
              (pins.filter((pin) => pin.status === StatusEnum.GOOD).length /
                pins.length) *
              100
            ).toFixed(2)}
            low={(
              (pins.filter((pin) => pin.status === StatusEnum.BAD).length /
                pins.length) *
              100
            ).toFixed(2)}
          />
        </div>
        <div id="column-chart">
          <ColumChart />
        </div>
      </div>
      <div id="type-chart">
        <TypeChart pins={pins} />
      </div>
      <div className="buttonPdfContainer">
        <StaticCards
          totalPins={pins.length}
          closedPins={
            pins.filter((pin) => pin.status === StatusEnum.CLOSED).length
          }
          cityAverage={cityAverage ?? 0}
          topZones={firstThree}
        />
        <PDFDownloadLink document={<MyDoc />} fileName="timAble - Report.pdf">
          {({ blob, url, loading, error }) => (
            <div>
              <Button
                type="primary"
                danger
                className="pdfButton"
                onClick={() =>
                  handleOpenAndDownload({ blob, url, loading, error })
                }
              >
                Generate Report
              </Button>
            </div>
          )}
        </PDFDownloadLink>
      </div>
    </>
  );
};

export default Analytics;
