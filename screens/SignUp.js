import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import firebase from "firebase";

//export default function App() {

export default class SignUp extends React.Component {

  createAccountCreatedAlert = () =>
    Alert.alert(
      "Account created",
      "Login now to start enjoying iShare!",
      [
        {
          text: "OK",
          onPress: () => {(this.handleSignUp)}
        },
      ],
      { cancelable: false }
    );

    state = {
    fullName: "",
    email: "",
    password: "",
    error: null,
  };

  
  handleSignUp = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Home"))      
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Image style={styles.logo} source={require("../images/logo.jpg")} />

          <Text style={styles.heading}>Sign Up</Text>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Full name"
            onChangeText={(fullName) => this.setState({ fullName })}
            value={this.state.fullName}
          />

          <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />

          <TextInput style={styles.input} placeholder="Confirm Password" />

          <View style={styles.signUpButton}>
            <Button color="#00554e" title="Sign Up"onPress={(this.handleSignUp)}/>
          </View>
          <Text style={styles.paragraph}>Already have an account?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={(fontWeight="500", color="#00554e")}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01a89e",
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontWeight: "bold",
    fontSize: 28,
    paddingTop: 5,
    paddingBottom: 10,
    color: "#00554e",
  },


  paragraph: {
    fontSize: 15,
  },

  body: {
    backgroundColor: "#e6ecea",
    padding: 20,
    height: "80%",
    width: "80%",
    alignItems: "center",
    alignContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#00554e",
    padding: 3,
    margin: 10,
    width: 200,
  },

  logo: {
    width: 140,
    height: 110,
  },

  signUpButton: {
    width: "85%",
    padding: 10,
    borderRadius: 90,
  },

  login: {
    fontSize: 15,
    color: "#00554e",
    fontWeight: "bold",
  },
});
