import React from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import firebase from "firebase";
import Fire from "../config/Fire";

export default class Loading extends React.Component {
  /*method to fetch data from firebase API after mounting components
    checks for user in persistent storage (if user has logged in before), if so go to App navigation stack
    otherwise go to authentication stack (get started)
    console.log for debbuging purposes*/
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "App" : "Auth");
      console.log(user);
    });
  }

  //renders screen view the view
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../images/splashScreen.jpeg")}
        />
      </View>
    );
  }
}

//create style for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "70%",
    height: "70%",
  },
});
