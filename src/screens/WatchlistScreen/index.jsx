import { View, Text } from "react-native";
import React, { useContext, FlatList } from "react";
import { useWatchlist } from "../../Contexts/watchlistContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoinIteam from "../../components/Coiniteam";

const WatchlistScreen = () => {
  const { watchlistCoinIds } = useWatchlist();

  // const checkIfCoinIsWatchlisted = () =>
  //   watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);
  // console.log(checkIfCoinIsWatchlisted());
  const array = [1, 2, 3, 4, 5];

  // checks whether an element is even
  const even = (element) => element % 2 === 0;
  console.log("start");
  watchlistCoinIds.map((item) => {
    console.log(...item);
  });
  //console.log(watchlistCoinIds);

  // expected output: true
  return (
    <View>
      <Text>Example</Text>
    </View>
    // <FlatList
    //   data={watchlistCoinIds}
    //   renderItem={({ item }) => <CoinIteam marketCoin={item} />}
    // />
  );
};
export default WatchlistScreen;
