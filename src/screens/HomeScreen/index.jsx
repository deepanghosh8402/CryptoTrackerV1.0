import { FlatList, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import CoinIteam from "../../components/Coiniteam";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";
import { getMarketData } from "../../services/requests";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState();
  let existingCoins = [];
  const fetchCoins = async (pageNumber) => {
    if (loading) return;
    setLoading(true);
    const fetchedCoins = await getMarketData(pageNumber);
    // existingCoins = [...existingCoins, ...fetchedCoins];
    setCoins((existingCoins) => [...existingCoins, ...fetchedCoins]);
    // setCoins(fetchedCoins);
    setLoading(false);
  };

  const reFetchCoins = async (pageNumber) => {
    if (loading) return;
    setLoading(true);
    const fetchedCoins = await getMarketData(pageNumber);
    setCoins(fetchedCoins);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);
  useEffect(
    () => {},
    [coins] //This is dependency and it will run only when data is changed
  );
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinIteam marketCoin={item} />}
      onEndReached={() => fetchCoins(coins.length / 50 + 1)}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="red"
          onRefresh={reFetchCoins}
        />
      }
    />
  );
};

export default HomeScreen;
