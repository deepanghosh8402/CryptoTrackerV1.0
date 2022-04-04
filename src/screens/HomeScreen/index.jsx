import { FlatList } from "react-native";
import CoinIteam from "../../components/Coiniteam";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";

const HomeScreen = () => {
  return (
    <FlatList
      data={cryptocurrencies}
      renderItem={({ item }) => <CoinIteam marketCoin={item} />}
    />
  );
};

export default HomeScreen;
