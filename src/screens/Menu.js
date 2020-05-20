import React from "react";
import {
  Alert,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  MaterialIcons,
  Feather,
  SimpleLineIcons,
  MaterialCommunityIcons,
  AntDesign
} from "@expo/vector-icons";

import UserAvatar from "react-native-user-avatar";
import firebase from "firebase";

export default class Menu extends React.Component {
  //set initial state for email and fullName
  state = {
    email: "",
    fullName: "",
  };
  //create componentDidMount function that connects with firestore get the current user documentation and returns full name
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

  createSignOutAlert = () =>
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            this.handleSignOut();
            this.props.navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );

  //create handle signOut function from firebase
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => this.setState({ errorMessage: error.message }));
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

        <View style={{ margin: 15, alignItems: "flex-start", flexDirection: "row"}}>
          <UserAvatar
            size={60}
            name="JM"
            bgColors={["#ccc", "#03857d", "#ccaabb"]}
          />

          <Text style={styles.username}>{this.state.fullName}</Text>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.heading}>Menu</Text>

          <TouchableOpacity
            style={styles.itensContainer}
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <AntDesign name="user" color="#09756c" size={25} />
            <Text style={styles.description}> Profile </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itensContainer}
            onPress={() => this.props.navigation.navigate("Inventory")}
          >
            <SimpleLineIcons name="notebook" color="#09756c" size={23} />
            <Text style={styles.description}> Food Inventory </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itensContainer}
            onPress={() => this.props.navigation.navigate("Recipes")}
          >
            <Feather name="book-open" color="#09756c" size={25} />
            <Text style={styles.description}> Recipes </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itensContainer}
            onPress={() => this.props.navigation.navigate("Tips")}
          >
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              color="#09756c"
              size={25}
            />
            <Text style={styles.description}> Useful Tips </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itensContainer}
            onPress={() => this.createSignOutAlert()}
          >
            <MaterialCommunityIcons name="logout" color="#09756c" size={23} />
            <Text style={styles.description}> Logout </Text>
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

  goBack: {
    color: "#616161",
    fontSize: 20,
    fontWeight: "bold",
  },

  username: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    paddingTop: 15,
    paddingLeft: 10,
  },

  heading: {
    fontSize: 26,
    color: "#616161",
    paddingBottom: 20,
    fontWeight: "bold",
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

  userContainer: {
    flex: 2,
    paddingHorizontal: 15,
    flexDirection: "row",
  },

  menuContainer: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingBottom: 250,
  },

  itensContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  description: {
    fontSize: 17,
    color: "#09756c",
    fontWeight: "bold",
  },

  userImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginTop: 15,
  },
});
