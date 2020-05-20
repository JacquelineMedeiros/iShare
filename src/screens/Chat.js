import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // image pic reference: https://docs.expo.io/versions/latest/sdk/imagepicker/
import DatePicker from "react-native-datepicker"; // date pic reference: https://aboutreact.com/react-native-datepicker/

import Fire from "../config/Fire";

const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <UserAvatar
              size={40}
              name="PP"
              bgColors={["#ccc", "#03857d", "#ccaabb"]}
            />
          </View>
          <View>
            <Text style={styles.paragraph}>Peter Parker</Text>
          </View>
        </View>
        <View style={styles.chatContainer}>
          <UserAvatar
            size={25}
            name="PP"
            bgColors={["#ccc", "#03857d", "#ccaabb"]}
          />
          <TextInput style={styles.textInputStyle}>
            Hey, how are you? I saw your post!
          </TextInput>
        </View>
        <View style={styles.chatContainer}>
          <UserAvatar
            size={25}
            name="PP"
            bgColors={["#ccc", "#03857d", "#ccaabb"]}
          />
          <TextInput style={styles.textInputStyle}>
            Are the eggs still available?
          </TextInput>
        </View>
        <View style={styles.chatRight}>
          <TextInput style={styles.textInputStyle2}>
            Hi! All good and you?
          </TextInput>
        </View>
        <View style={styles.chatRight}>
          <TextInput style={styles.textInputStyle2}>
            Yes, still available. interested?
          </TextInput>
        </View>
        <View style={styles.chatContainer}>
          <UserAvatar
            size={25}
            name="PP"
            bgColors={["#ccc", "#03857d", "#ccaabb"]}
          />
          <TextInput style={styles.textInputStyle}>
            Yes I'm' interested!
          </TextInput>
        </View>
        <View style={styles.chatContainer}>
          <UserAvatar
            size={25}
            name="PP"
            bgColors={["#ccc", "#03857d", "#ccaabb"]}
          />
          <TextInput style={styles.textInputStyle}>
            Can we arrange a pick up?
          </TextInput>
        </View>
      
        <View style={styles.chatRight}>
          <TextInput style={styles.textInputStyle2}>
            Sure, can you come between 7-8pm?
          </TextInput>
        </View>
        <View style={styles.chatContainer}>
          <UserAvatar
            size={25}
            name="PP"
            bgColors={["#ccc", "#03857d", "#ccaabb"]}
          />
          <TextInput style={styles.textInputStyle}>
           Sure! Where do I meet you?
          </TextInput>
        </View>

        <View style={styles.footer}>
            
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdfa",
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 25,
    marginBottom: 5,
    width: "100%",
    height: "12%",
    borderBottomColor: "#616161",
    borderBottomWidth: 1,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "11%",
    borderBottomColor: "#616161",
    borderBottomWidth: 1,
  },

  paragraph: {
    fontSize: 16,
    marginHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: "bold",
    color: "#44423e",
  },

  textInputStyle: {
    borderRadius: 35,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: "#e2dbcf",
    padding: 10,
    fontSize: 16,
  },
  textInputStyle2: {

    borderRadius: 35,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: "#ccaabb",
    padding: 10,
    fontSize: 16,
  },

  textContainer: {
    flex: 3,
    paddingHorizontal: 15,
    flexDirection: "column",
  },

  chatContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 5,
    width: "100%",
    paddingBottom: 15,

  },

  chatRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
    paddingBottom: 15,
  },
  });
