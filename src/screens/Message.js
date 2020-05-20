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
import UserAvatar from "react-native-user-avatar";
/*moment: js library used interact with date and time domain. 
here I used fromNow() to give the time when a post was created based on the timestamp and the actual date.
Source: https://medium.com/better-programming/using-moment-js-in-react-native-d1b6ebe226d4
*/
import moment from "moment"; 
import Header from "../components/Header";

// temporary data until we pull from Firebase 

chats = [
  {
    id: 1,
    name: "Peter Parker",
    message: "Sure! Where do I meet you?",
    timestamp: 1589809133726,
  },

  {
    id: 2,
    name: "Steve Rogers",
    message: "Can we arrange the pickup for 7pm? I'll be around city centre",
    timestamp: 1589746577381,
  },

  {
    id: 3,
    name: "Anthony Stark",
    message: "Sure! That sounds great! I'll see you then.",
    timestamp: 1589186954338,
  },
];

export default class Messages extends React.Component {
  renderChat = (chat) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')}>
      <View style={styles.chatContainer}>
        
        <View style={{ margin: 5, paddingRight: 10, paddingTop: 15, alignItems: "flex-start", flexDirection: "row"}}>
        <UserAvatar
            size={40}
            name={chat.name}
            bgColors={["#ccc", "#03857d", "#ccaabb"]}
          />
        </View>
        
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.title}>{chat.name}</Text>
              <Text style={styles.description}>{chat.message}</Text>
              <Text style={styles.timestamp}>

                {moment(chat.timestamp).fromNow()} 
              </Text>
            </View>
          </View>

        </View>
      </View>
      </TouchableOpacity>
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
            data={chats}
            renderItem={({ item }) => this.renderChat(item)}
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

  chatContainer: {
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
