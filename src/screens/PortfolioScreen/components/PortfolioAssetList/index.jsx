import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import PortfolioAssetIteam from "../PortfolioAssetIteam";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { useNavigation } from "@react-navigation/native";
import AddNewAssetScreen from "../../../AddNewAssetScreen";

const PortfolioAssetList = () => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={[{ id: "Etharium" }]}
        renderItem={({ iteam }) => <PortfolioAssetIteam assetIteam={iteam} />}
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalance}>Current Balance</Text>
                <Text style={styles.currentBalanceValue}>$20000</Text>
                <Text style={styles.valueChange}>$1000 (All Time)</Text>
              </View>
              <View style={styles.pricaChangePercentageContainer}>
                <AntDesign
                  name={"caretdown"}
                  size={12}
                  color={"white"}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={styles.percentageChange}>1.2%</Text>
              </View>
            </View>
            <Text style={styles.assetsLabel}> Your Assets</Text>
          </>
        }
        ListFooterComponent={
          <Pressable
            style={styles.buttonContainter}
            onPress={() => navigation.navigate("AddNewAssetScreen")}
          >
            <Text style={styles.buttonText}>Add New Asset</Text>
          </Pressable>
        }
      />
    </View>
  );
};

export default PortfolioAssetList;
