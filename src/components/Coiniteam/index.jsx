import React from "react";
import styles from "./styles";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { useNavigation } from "@react-navigation/native";

const CoinIteam = ({ marketCoin }) => {
  const {
    id,
    name,
    current_price,
    market_cap,
    price_change_percentage_24h,
    symbol,
    market_cap_rank,
    image,
  } = marketCoin;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
  const normaizeMarketcap = (marketCap) => {
    if (marketCap > 1000000000000) {
      return `${Math.floor(marketCap / 1000000000000)} T`;
    }
    if (marketCap > 1000000000) {
      return `${Math.floor(marketCap / 1000000000)} B`;
    }
    if (marketCap > 1000000) {
      return `${Math.floor(marketCap / 1000000)} M`;
    }
    if (marketCap > 1000) {
      return `${Math.floor(marketCap / 1000)} K`;
    }
    return marketCap;
  };

  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => {
        navigation.navigate("CoinDetailsScreen", { coinId: id });
      }}
    >
      {/* {console.log(image)} */}
      <Image
        source={{
          uri: image,
        }}
        style={{
          height: 30,
          width: 30,
          marginRight: 10,
          alignSelf: "center",
        }}
      />

      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: "white" }}>
          MCap
          {normaizeMarketcap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};

export default CoinIteam;
