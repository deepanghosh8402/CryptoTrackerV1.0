import React, { useContext, createContext, useState, useEffect } from "react";

const WatchlistContext = createContext();
export const useWatchlist = () => useContext(WatchlistContext);
const WatchlistProvider = ({ children }) => {
  const [watchlistCoinIds, setwatchlistCoinIds] = useState([]);
  const getWatchlistData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setwatchlistCoinIds(jsonValue !== null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getWatchlistData();
  }, []);

  const storeWatchlistCoinId = async (coinId) => {
    try {
      const newWatchlist = [...watchlistCoinIds, coinId];
      const jsonValue = JSON.stringify(newWatchlist);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setwatchlistCoinIds(newWatchlist);
    } catch (e) {
      // saving error
    }
  };
  const removeWatchlistCoinId = async (coinID) => {
    try {
      const newWatchlist = watchlistCoinIds.filter(
        (coinIDValue) => coinIDValue != coinID
      );
      const jsonValue = JSON.stringify(newWatchlist);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setwatchlistCoinIds(newWatchlist);
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };
  return (
    <WatchlistContext.Provider value={{ watchlistCoinIds }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
