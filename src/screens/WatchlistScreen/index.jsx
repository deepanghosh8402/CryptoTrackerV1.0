import { View, Text, RefreshControl, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useWatchlist } from "../../Contexts/watchlistContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoinIteam from "../../components/Coiniteam";
import { getWatchlistedCoins } from "../../services/requests";

const WatchlistScreen = () => {
  const { watchlistCoinIds } = useWatchlist();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const transformCoinIds = () => watchlistCoinIds.join("%2c");

  const fetchWatchListedCoins = async () => {
    if (loading) return;

    setLoading(true);
    const watchListedCoinData =
      (await getWatchlistedCoins(1, transformCoinIds())) || [];
    setCoins(watchListedCoinData);
    setLoading(false);
  };

  useEffect(() => {
    fetchWatchListedCoins();
  }, []);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinIteam marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={fetchWatchListedCoins()}
        />
      }
    />
  );
};
export default WatchlistScreen;
