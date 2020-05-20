import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import ImagePicker from "expo-image-picker";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import UserAvatar from "react-native-user-avatar";
import firebase from "firebase";

export default class Profile extends React.Component {
  state = {
    avatar: "",
    fullName: ""
  };

  componentDidMount() {
    let userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let fullName = doc.data().fullName;
          this.setState({ fullName });
          console.log(fullName);
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  }

  //image picker from expo plugin
  selectAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        this.setState({ avatar: result.uri });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          
        <View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons name="arrow-back" color="#616161" size={34} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.goBack}>Back</Text>
            </TouchableOpacity>
            
          </View>
          
        </View>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={this.selectAvatar}
          >
            <UserAvatar
              size={100}
              name="JM"
              bgColors={["#ccc", "#03857d", "#ccaabb"]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectAvatar}>
            <Text style={styles.update}> {this.state.fullName}</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  goBack: {
    color: "#616161",
    fontSize: 20,
    fontWeight: "bold",
  },
  profile: {
    marginTop: 64,
    alignItems: "center",
  },
  // avatarContainer: {
  //   shadowColor: "#151734",
  //   shadowRadius: 30,
  //   shadowOpacity: 0.4,
  // },
  // avatar: {
  //   width: 136,
  //   height: 136,
  //   borderRadius: 68,
  // },
  update: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
});
