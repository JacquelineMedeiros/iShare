import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = (props) => {  
  
  return (
    <View style={styles.containerHeader}>
      <Image style={styles.logo} source={require("../images/logo.jpeg")} />
    </View>
  );
};

const styles = StyleSheet.create({

  containerHeader: {
    flex: 1,
    width: "100%",
    height: "10%",
    //flexDirection: "column",
    backgroundColor: "#ffffff",
    //justifyContent: "flex-start",
    //alignItems: "flex-start",
    paddingTop: "1%",
    //color: "#e6ecea",
  },

  logo: {
    marginTop: "4%",
    marginLeft: "2%",
    width: 90,
    height: 70,
  },
});

export default Header;
