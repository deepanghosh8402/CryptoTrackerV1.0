import React, { useState, useEffect } from "react";
import {
  getDetailedCoinData,
  getCoinMarketChart,
} from "../../services/requests";
import CoinDetailsHeader from "../CoinDetailedScreen/components/CoinDetailedHeader";
import Coin from "../../../assets/data/crypto.json";
import {
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
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

const CoinDetailedScreen = () => {
  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  const [coinValueApi, setCoinValueApi] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinValue, setCoinValue] = useState("1");
  const [loading, setLoading] = useState(false);

  const [usdValue, setUsdValue] = useState("");
  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    getCoinMarketChart;
    setCoinValueApi(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };
  const fetchCoinMarketData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchCoinMarketData(3);
  }, []);
  useEffect(
    () => {},
    [coinValueApi, coinMarketData] //This is dependency and it will run only when data is changed
  );

  if (loading || !coinValueApi) {
    return <ActivityIndicator size="large" />;
  }
  const {
    image: { small },
    name,
    symbol,
    id,
    market_data: {
      market_cap_rank,
      price_change_percentage_24h,
      current_price,
    },
  } = coinValueApi;
  const { prices } = coinMarketData;

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
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const points = prices.map(([timestamp, value]) => ({
    timestamp,
    value,
  }));

  const chartColor =
    current_price.usd > prices[0][1] ? "#16c784" : "#ea3943" || "white";
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
  ));
  const onCurrentIndexChange =
    ((number) => {
      console.log(number);
    },
    []);

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <CoinDetailsHeader
        image={small}
        coinId={id}
        marketCapRank={market_cap_rank}
        symbol={symbol}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>{id}</Text>
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
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={"white"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />

          <Text style={{ color: "white", fontSize: 15, fontWeight: "400" }}>
            {price_change_percentage_24h?.toFixed(2)}%
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
      <GestureHandlerRootView>
        <Chart />
      </GestureHandlerRootView>
    </View>
  );
};
export default CoinDetailedScreen;
