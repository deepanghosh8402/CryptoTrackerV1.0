import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
export default function App() {
  const data = [
    {
      timestamp: 1625945400000,
      value: 33575.25,
    },
    {
      timestamp: 1625946300000,
      value: 33545.25,
    },
    {
      timestamp: 1625947200000,
      value: 3510.25,
    },
    {
      timestamp: 1625948100000,
      value: 33215.25,
    },
  ];
  const data2 = [
    {
      timestamp: 1625945400000,
      open: 33575.25,
      high: 33600.52,
      low: 33475.12,
      close: 33520.11,
    },
    {
      timestamp: 1625946300000,
      open: 33545.25,
      high: 33560.52,
      low: 33510.12,
      close: 33520.11,
    },
    {
      timestamp: 1625947200000,
      open: 33510.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11,
    },
    {
      timestamp: 1625948100000,
      open: 33215.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11,
    },
  ];
  const Chart = gestureHandlerRootHOC(() => (
    <View>
      <LineChart.Provider data={data}>
        <LineChart>
          <LineChart.Path />
          <LineChart.CursorCrosshair>
            <LineChart.Tooltip />
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>
    </View>
  ));
  return (
    <View style={styles.container}>
      {/* <LineChart.Provider data={data}>
        <LineChart>
          <LineChart.Path />
        </LineChart>
      </LineChart.Provider> */}
      <Chart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
