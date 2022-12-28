import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  dropdownItem: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5,
  },
  dropdownItemText: { color: "white" },
  ticker: {
    color: "grey",
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 5,
    marginTop: 30,
  },
  boughtContainer: {
    alignItems: "center",
    flex: 1,
  },
  buttonContainter: {
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 17,
  },
  pricePerCoin: {
    color: "grey",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.5,
  },
});

export default styles;
