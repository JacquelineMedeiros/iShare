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

export default class Menu extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.childContainer}>
          <Text style={{ fontSize: 30 }}>This is menu</Text>
        </View>
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdfa",
    flexDirection: "column",
    height: "100%"
  },

  header: {
    height: "15%"
  }
});