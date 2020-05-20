import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import moment from "moment";
import Header from "../components/Header";

//hardcoded news to be called on a flatlist
news = [
  {
    id: "1",
    title: "Sharing is Caring",
    description: 
    "Give your surplus of food to help tackle food waste! When you share, you avoid waste and help other people, " +
    "who might be in need! You can use iShare application to find people interested or offer to a neighbor or friend! "
    ,
    timestamp: 1589637477000,
    image: require("../../images/sharing.jpg"),
  },

  {
    id: "2",
    title: "Reuse Your Leftovers",
    description: 
    "Instead of throwing your leftovers away, use them to prepare other dishes, such as cassaroles, sandwiches, " +
    "omelets or store them in the fridge to reuse as it is later! Check our recipe session for some inspiration! "
    ,
    timestamp: 1589637477000,
    image: require("../../images/leftovers.jpeg"),
  },

  {
    id: "3",
    title: "Freeze Herbs in Oil",
    description: 
    "Fresh herbs usually goes off fast! A way to avoid them going off and throwing them away is to freeze them together " +
    "with olive oil or melted butter in an ice tray! When you need, just get a herb cube and toss it in a pot to cook a delicious meal!"
    ,
    timestamp: 1589637477000,
    image: require("../../images/herbs.jpg"),
  },

  {
    id: "4",
    title: "Check Your Fridge and Cupboards",
    description: 
    "Very often we overbuy food and end up forgetting things we have in the fridge and cupboards. Keeping control of food we have " +
    "helps avoid wasting. Use iShare Food Inventory to help you keep track of your items or take a look every now and then on your fridge and cupboard."
    ,
    timestamp: 1589637477000,
    image: require("../../images/fridge.jpg"),
  },

  {
    id: "5",
    title: "Turn Waste Into Compost",
    description: 
    "In case there are some food that will go to waste, instead of throwing them in the bin, recover it by turning into compost " +
    "and use it in your garden or plants! This way, we contribute with less greenhouse-gas emissions!"
    ,
    timestamp: 1589637477000,
    image: require("../../images/compost.jpg"),
  },
];

export default class Tips extends React.Component {

  //set state for the displayedText(read more feature)
  state = {
    displayedText: "",
  }

  //
  toggleNumberOfLines = (index) => {
    this.setState({
      displayedText: this.state.displayedText === index ? -1 : index,
    });
  };

  renderNews = (news, index) => {
    
    return (
      <View style={styles.newsContainer}>
        <View style={{ flex: 1 }}>
          
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.title}>{news.title}</Text>
              <Text style={styles.timestamp}>
                Posted: {} {moment(news.timestamp).fromNow()}
              </Text>
            </View>
          </View>

          <View style={{ marginLeft: -20 }}>
            <View>
              <Image source={news.image} style={styles.postImage} />
             
              <Text
                numberOfLines={this.state.displayedText === index ? undefined : 6}
                style={styles.post}>
                {news.description}
              </Text>
              <Text
                onPress={() => this.toggleNumberofLines()}
                style={{ color: "#09756c", fontWeight: "bold" }}>
                {this.state.displayedText === index ? 'read less...' : 'read more...'}
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
        <View style={styles.pageTitleContainer}>
          <Text style={styles.h1}>Tips to Reduce</Text>
          <Text style={styles.h1}>Food Waste</Text>
        </View>
        <View>
          <FlatList
            style={styles.feed}
            data={news}
            renderItem={({ item }) => this.renderNews(item)}
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

  h1: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#09756c",
  },

  feed: {
    marginHorizontal: 10,
    marginTop: 6,
    marginBottom: 220,
    
  },

  pageTitleContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 4,
  },

  newsContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    padding: 5,
    marginVertical: 5,
    paddingLeft: 50,
    borderRadius: 4,
    
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#474747",
    marginLeft: -20,
  },
  timestamp: {
    fontSize: 11,
    color: "#c2c3c9",
    marginTop: 4,
    marginLeft: -20,
  },

  post: {
    marginTop: 5,
    fontSize: 15,
    color: "#5f636f",
    marginRight: 40,
    
  },
  postImage: {
    width: "90%",
    height: 170,
    marginVertical: 5,
    borderRadius: 7,
  },
});
