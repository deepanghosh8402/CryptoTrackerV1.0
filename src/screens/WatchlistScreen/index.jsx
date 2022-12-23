import { View, Text, RefreshControl, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useWatchlist } from "../../Contexts/watchlistContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoinIteam from "../../components/Coiniteam";
import { getWatchlistedCoins } from "../../services/requests";
// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, RefreshControl } from "react-native";
// import { useWatchlist } from "../../Contexts/WatchlistContext";
// import CoinItem from "../../components/CoinItem";
// import { getWatchlistedCoins } from "../../services/requests";

const WatchlistScreen = () => {
  const { watchlistCoinIds } = useWatchlist();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const transformCoinIds = () => watchlistCoinIds.join("%2c");

  const fetchWatchListedCoins = async () => {
    if (loading) return;

    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(
      1,
      transformCoinIds()
    );
    setCoins(watchlistedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchListedCoins();
    }
  }, [watchlistCoinIds]);
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinIteam marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          // onRefresh={
          //   watchlistCoinIds.length > 0 ? fetchWatchlistedCoins() : null
          // }
        />
      }
    />
  );
};
export default WatchlistScreen;
