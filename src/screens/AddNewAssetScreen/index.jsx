import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";

const AddNewAssetScreen = () => {
  const [boughtAssetQuantitiy, setBoughtAssetQuantitiy] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <SearchableDropdown
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.dropdownItem}
        itemTextStyle={styles.dropdownItemText}
        items={[]}
        onItemSelect={(item) => console.log(item)}
        resetValue={false}
        placeholder={"Select Coin.."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            color: "white",
          },
        }}
      />
      <View style={styles.boughtContainer}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ color: "white", fontSize: 90 }}
            value={boughtAssetQuantitiy}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={setBoughtAssetQuantitiy}
          />
          <Text style={styles.ticker}>BTC</Text>
        </View>
        <Text style={styles.pricePerCoin}>$4000 per coin</Text>
      </View>
      <Pressable
        style={styles.buttonContainter}
        onPress={() => navigation.navigate("AddNewAssetScreen")}
      >
        <Text style={styles.buttonText}>Add New Asset</Text>
      </Pressable>
    </View>
  );
};

export default AddNewAssetScreen;
