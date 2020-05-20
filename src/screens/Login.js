import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
      //console.log(error)
  };

  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.body}>
          <Image style={styles.logo} source={require("../../images/logo.jpeg")} />

          <Text style={styles.heading}>Login</Text>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
          </View>
          
          <TextInput
            keyboardType="email-address" //change keyboard type on device to email address
            style={styles.input}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            placeholder="Enter Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />

          <View style={styles.loginButton}>
            <Button color="#00554e" title="LOGIN" onPress={(this.handleLogin)}/>
          </View>
          <Text style={styles.paragraph}>No account yet?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>Sign up!</Text>
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

  loginButton: {
    width: "85%",
    padding: 10,
    borderRadius: 90,
  },

  error: {
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },

  signUp: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#00554e",

  },

  errorMessage: {
    justifyContent: 'center',
    alignItems: 'center'    
  }
});
