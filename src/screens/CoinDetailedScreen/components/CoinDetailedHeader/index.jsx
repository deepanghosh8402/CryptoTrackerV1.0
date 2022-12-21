import React from "react";
import { Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { View, Image, Text } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { useWatchlist } from "../../../../Contexts/watchlistContext";
const CoinDetailsHeader = (props) => {
  const { image, coinId, marketCapRank, symbol } = props;
  // console.log(props);
  const navigation = useNavigation();
  const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } =
    useWatchlist();
  const checkIfCoinIsWatchlisted = () =>
    watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);
  const handleWatchListCoin = () => {
    if (checkIfCoinIsWatchlisted()) {
      return removeWatchlistCoinId(coinId);
    }
    return storeWatchlistCoinId(coinId);
  };
  return (
    <View style={styles.cointContainer}>
      <Ionicons
        name="chevron-back-outline"
        size={30}
        color="white"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.tickerContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={{ width: 25, height: 25 }}
        />
        <Text style={styles.tickerTitle}>{symbol}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.tickerTitle}>{marketCapRank}</Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchlisted() ? "star" : "star-o"}
        size={25}
        color={checkIfCoinIsWatchlisted() ? "#FFBF00" : "white"}
        onPress={handleWatchListCoin}
      />
    </View>
  );
};

export default CoinDetailsHeader;
