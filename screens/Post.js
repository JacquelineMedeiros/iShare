import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import Menu from "./screens/Menu";
import Message from "./screens/Message";
import Notification from "./screens/Notification";
import Menu from "./screens/Menu";

export default class Post extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.childContainer}>
          <Text style={{ fontSize: 30 }}>This is message</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef",
    flexDirection: "column"
  },
  childContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 100
  },
  header: {
    backgroundColor: "cyan",
    width: "100%",
    height: "15%"
  }
});