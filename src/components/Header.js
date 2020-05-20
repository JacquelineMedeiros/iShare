import React from "react";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";

//create constant header (to be used accrossed the application - const because it should not change)
//used const because it is a functional (stateless component) that takes props as argument and return a react element
const Header = (props) => {  
  
  return (
    <View style={styles.containerHeader}>
      <Image style={styles.logo} source={require("../../images/logo.jpeg")} />
    </View>
  );
};

//create const styles 
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
