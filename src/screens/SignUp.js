import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import Fire from "../config/Fire";

export default class SignUp extends React.Component {

  //set initial state for user's info (fullName, email, password) and error
  state = {
    user: {
      fullName: "",
      email: "",
      password: "",
      error: null,
    },
  };

  handleSignUp = () => {
    if (
      this.state.user.fullName === "" ||
      this.state.user.email === "" ||
      this.state.password === ""
    ) {
      Alert.alert("Please, enter details to sign up!");
    } else {
      Fire.shared.createUser(this.state.user);
    }
    
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            style={styles.logo}
            source={require("../../images/logo.jpeg")}
          />

          <Text style={styles.heading}>Sign Up</Text>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Full name"
            onChangeText={(fullName) =>
              this.setState({ user: { ...this.state.user, fullName } })
            }
            value={this.state.user.fullName}
          />

          <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) =>
              this.setState({ user: { ...this.state.user, email } })
            }
            value={this.state.user.email}
          />

          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            onChangeText={(password) =>
              this.setState({ user: { ...this.state.user, password } })
            }
            value={this.state.user.password}
          />

          <View style={styles.signUpButton}>
            <Button
              color="#00554e"
              title="Sign Up"
              onPress={this.handleSignUp}
            />
          </View>
          <Text style={styles.paragraph}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    fontSize: 16,
  },

  body: {
    backgroundColor: "#ffffff",
    padding: 10,
    paddingTop: 40,
    height: "85%",
    width: "85%",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 16,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00554e",
    padding: 6,
    margin: 10,
    width: 230,
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
    fontSize: 18,
    color: "#00554e",
    fontWeight: "bold",
  },
});
