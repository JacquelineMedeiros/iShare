import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

export default class Post extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" color="#616161" size={32} />
          </TouchableOpacity>

          <View>
            <Text style={styles.createPost}>New Post</Text>
          </View>

          <TouchableOpacity>
          <Text style={styles.post}>{"                          "}Share</Text>
          </TouchableOpacity>


        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.userImage}
            source={require("../images/avatar.png")}
          ></Image>
      
          <TextInput
            multiline={true}
            autoFocus={true}
            numberOfLines={2}
            //style={{ flex: 2 }}
            placeholder="What would you like to share?"
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.iconsContainer}>
        <Text style={(styles.add)}>Add a picture {""} </Text>
          <FontAwesome name="picture-o" color="#09756c" size={22}/>
          
        </TouchableOpacity>

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
    paddingLeft: 10,
    paddingTop: 35,
    width: "100%",
    height: "12%",
    borderBottomColor: "#616161",
    borderBottomWidth: 1,
  },

  createPost: {
    fontSize: 22,
    color: "#616161",
  },

  inputContainer: {
    flex: 2,
    paddingHorizontal: 15,
    flexDirection: "column",
  },

  iconsContainer: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10
  },

  postContainer: {

    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10
  },
  add: {

    fontSize: 15,
    color: "#09756c",
  },

  post: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#474747",
    justifyContent: "flex-end",

  },

  userImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginTop: 15,
  },
});
