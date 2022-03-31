import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import HomeScreen from "./src/components/Coiniteam/screens/HomeScreen";
import CoinDetailsScreen from "./src/components/Coiniteam/screens/CoinDetailedScreen";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen /> */}
      <CoinDetailsScreen></CoinDetailsScreen>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    // backgroundColor: "white",
    paddingTop: 50,
  },
});
