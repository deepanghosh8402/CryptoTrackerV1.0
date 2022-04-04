import React from "react";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { View, Image, Text } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

const CoinDetailsHeader = (props) => {
  const { image, name, marketCapRank, symbol } = props;
  const navigation = useNavigation();
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
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.tickerTitle}>{marketCapRank}</Text>
        </View>
      </View>
      <EvilIcons name="user" size={30} color="white"></EvilIcons>
    </View>
  );
};

export default CoinDetailsHeader;
