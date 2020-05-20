import React from "react";
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
/*moment: js library used interact with date and time domain. 
here I used fromNow() to give the time when a post was created based on the timestamp and the actual date.
Source: https://medium.com/better-programming/using-moment-js-in-react-native-d1b6ebe226d4
*/
import moment from "moment";

import Header from "../components/Header";
const firebase = require("firebase");
require("firebase/firestore");

posts = [
  {
    id: "",
    name: "",
    title: "",
    expireDate: "",
    description: "",
    timestamp: "",
    avatar: "",
    image: "",
  },
];

export default class Home extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData() {
    var that = this;
    let postRef = firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .limit(10);
    let allPosts = postRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var post = that.state.posts;
          const data = (doc.id, "=>", doc.data());
          that.setState({ posts: post });
          //console.log(data.image);
          post.push({
            id: data.id,
            title: data.title,
            description: data.description,
            expireDate: data.expireDate,
            timestamp: data.timestamp,
            image: data.image,
            avatar: require("../../images/avatar.png"),
            name: "Jackie Medeiros"
            
          });
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  renderPost = (post) => {
    return (
      <View style={styles.feedContainer}>
        <Image style={styles.avatar} source={post.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
          </View>

          <View style={{ marginLeft: -20 }}>
            <View>
              <Image
                source={{ uri : post.image }}
                style={styles.postImage}
              />
              <Text style={styles.title}>Item: {post.title}</Text>
              <Text style={styles.post}>Exp date: {post.expireDate}</Text>
              <Text style={styles.post}>Description: {post.description}</Text>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ios-heart-empty"
                  size={24}
                  color="#474747"
                  style={{ marginTop: 7 }}
                />
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Chat')}
                >
                  <Ionicons
                    name="ios-chatbubbles"
                    color="#474747"
                    size={24}
                    style={{ marginTop: 7, marginLeft:15 }}
                  />
                </TouchableOpacity>
              </View>
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
            data={this.state.posts}
            renderItem={({ item }) => this.renderPost(item)}
            keyExtractor={(item) => item.id}
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

  avatar: {
    width: 38,
    height: 38,
    marginLeft: 2,
    marginRight: 10,
    borderRadius: 18,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#474747",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
    color: "#c2c3c9",    
  },

  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#474747",
  },
  post: {
    marginTop: 5,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: "90%",
    height: 170,
    marginVertical: 5,
    borderRadius: 7,
  },
});
