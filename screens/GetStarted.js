import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from "firebase";

export default class GetStarted extends React.Component {
  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     this.props.navigation.navigate(user ? "App" : "Auth");
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Image style={styles.logo} source={require("../images/logo.jpg")} />
          <Text style={styles.heading}>Get started</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.userImage}
              source={require("../images/user.png")}
            />

            <Image
              style={styles.userImage}
              source={require("../images/newUser.png")}
            />
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="LOGIN" color="#00554e" onPress={() => this.props.navigation.navigate('Login')} />
            </View>
            <View style={styles.button}>
              <Button title="SIGN UP" color="grey" onPress={() => this.props.navigation.navigate('SignUp')}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008b87",
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontWeight: "bold",
    fontSize: 36,
    padding: 10,
    color: "#00554e",
    marginTop: 10,
  },

  paragraph: {
    fontSize: 13,
    width: "50%",
  },

  body: {
    backgroundColor: "#e6ecea",
    padding: 20,
    height: "80%",
    width: "80%",
    alignItems: "center",
    alignContent: "center",
  },

  logo: {
    width: 140,
    height: 110,
  },

  button: {
    marginTop: 30,
    width: "55%",
    padding: 10,
    borderRadius: 9,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },

  imageContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignItems: "baseline",
  },

  userImage: {
    padding: 5,
    width: 130,
    height: 140,
  },
});
