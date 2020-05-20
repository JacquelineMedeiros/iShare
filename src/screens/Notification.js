import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
/*moment: js library used interact with date and time domain. 
here I used fromNow() to give the time when a post was created based on the timestamp and the actual date.
Source: https://medium.com/better-programming/using-moment-js-in-react-native-d1b6ebe226d4
*/
import moment from "moment"; 
import Header from "../components/Header";

// temporary data until we pull from Firebase 

notifications = [
  {
    id: 1,
    title: "You have a new message!",
    description: "from Peter Parker",
    timestamp: 1589186954338,
  },

  {
    id: 2,
    title: "Tomatoes",
    description: "is about to expire! Take action!",
    timestamp: 1589186192790,
  },

  {
    id: 3,
    title: "You have a new message!",
    description: "from Steve Rogers",
    timestamp: 1589186192790,
  },
];

export default class Notification extends React.Component {
  renderNotification = (notification) => {
    return (
      <View style={styles.feedContainer}>
        <Entypo
                  name="new"
                  color="#474747"
                  size={28}
                  style={{ marginLeft: 10, marginTop: 15, marginRight: 15 }}
                />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.title}>{notification.title}</Text>
              <Text style={styles.description}>{notification.description}</Text>
              <Text style={styles.timestamp}>

                {moment(notification.timestamp).fromNow()} 
              </Text>
            </View>
          </View>

        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />
        </View>
        <View>
          <FlatList
            style={styles.feed}
            data={notifications}
            renderItem={({ item }) => this.renderNotification(item)}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0d9d9",
    //flexDirection: "column",
    height: "100%",
  },

  header: {
    height: "15%",
  },

  feed: {
    marginHorizontal: 10,
    marginTop: 6,
    marginBottom: 100,
  },

  feedContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    padding: 5,    
    marginVertical: 5,
    borderRadius: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#474747",

  },

  description: {
    fontSize: 16,
    color: "#474747",
  },
  
  timestamp: {
    fontSize: 11,
    color: "#c2c3c9",
    marginTop: 4,
  },
});
