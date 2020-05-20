import React from "react";
import { View, Image, StyleSheet } from "react-native";

//create constant header (to be used accrossed the application - const because it should not change)
//used const because it is a functional (stateless component) that takes props as argument and return a react element
const StartContainer = (props) => {
  return <View style={styles.container}></View>;
};

//create const styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6ecea",
    padding: 10,
    paddingTop: 40,
    height: "85%",
    width: "85%",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 16,
  },
});

export default StartContainer;
