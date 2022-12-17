import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/Navigation";
import {
  backgroundColor,
  color,
} from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import WatchlistProvider from "./src/Contexts/watchlistContext";
export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#121212",
        },
      }}
    >
      <WatchlistProvider>
        <View style={styles.container}>
          <Navigation />
          {/* <HomeScreen /> */}
          {/* <CoinDetailsScreen></CoinDetailsScreen> */}
          <StatusBar style="light" />
        </View>
      </WatchlistProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#121212",
    backgroundColor: "white",
    paddingTop: 50,
  },
});
