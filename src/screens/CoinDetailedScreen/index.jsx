import React, { useState } from "react";
import CoinDetailsHeader from "../CoinDetailedScreen/components/CoinDetailedHeader";
import Coin from "../../../assets/data/crypto.json";
import { View, Image, Text, Dimensions, TextInput } from "react-native";
import styles from "./style";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { AntDesign } from "@expo/vector-icons";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

// import * as haptics from "expo-haptics";
const CoinDetailedScreen = () => {
  const {
    image: { small },
    name,
    symbol,
    prices,
    market_data: { market_cap_rank, current_price, price_change_24h },
  } = Coin;
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState(current_price.usd.toString());
  const chanageCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };
  const chanageUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };
  const percentageColor = price_change_24h < 0 ? "#ea3943" : "#16c784";

  const points = prices.map(([timestamp, value]) => ({
    timestamp,
    value,
  }));
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("window").width;
  const Chart = gestureHandlerRootHOC(() => (
    <View>
      <GestureDetector>
        <LineChart.Provider data={points}>
          <LineChart height={screenWidth / 2} width={screenWidth}>
            <LineChart.Path color={chartColor} />
            <LineChart.CursorCrosshair color={chartColor} />
          </LineChart>
        </LineChart.Provider>
      </GestureDetector>
    </View>
    // <View>
    //   <LineChart.Provider data={points}>
    // <LineChart>
    //   <LineChart.Path color="hotpink">
    //     <LineChart.Gradient />
    //     <LineChart.Highlight color="#FFFFFF" from={10} to={15} />
    //     <LineChart.HorizontalLine at={{ value: 56923.84 }} />
    //     <LineChart.Dot color="red" at={10} hasPulse />
    //   </LineChart.Path>
    //   <LineChart.CursorCrosshair color="#FFFFFF">
    //     <LineChart.Tooltip />
    //   </LineChart.CursorCrosshair>
    // </LineChart>
    //   </LineChart.Provider>
    // </View>
  ));
  const onCurrentIndexChange =
    ((number) => {
      console.log(number);
    },
    []);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <CoinDetailsHeader
        image={small}
        name={name}
        marketCapRank={market_cap_rank}
        symbol={symbol}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.currentPrice}>${current_price.usd}</Text>
        </View>

        <View
          style={{
            backgroundColor: percentageColor,
            paddingHorizontal: 5,
            paddingVertical: 8,
            borderRadius: 5,
            flexDirection: "row",
            height: 40,
          }}
        >
          <AntDesign
            name={price_change_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={"white"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />

          <Text style={{ color: "white", fontSize: 15, fontWeight: "400" }}>
            {price_change_24h.toFixed(2)}%
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: "white", alignSelf: "center" }}>
            {symbol.toUpperCase()}
          </Text>
          <TextInput
            style={styles.input}
            value={coinValue.toString()}
            keyboardType="numeric"
            onChangeText={chanageCoinValue}
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
          <TextInput
            style={styles.input}
            value={usdValue.toString()}
            keyboardType="numeric"
            onChangeText={chanageUsdValue}
          />
        </View>
      </View>
      {/* <GestureHandlerRootView> */}
      <Chart />
      {/* </GestureHandlerRootView> */}
    </View>
  );
};

export default CoinDetailedScreen;
