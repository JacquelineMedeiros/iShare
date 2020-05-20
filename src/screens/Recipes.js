import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { SearchBar } from "react-native-elements";

import Header from "../components/Header";

export default class Recipes extends React.Component {
  state = {
    searchResult: "" 
  };

  handleSearch(searchResult) {
    this.setState({ searchResult });  
    fetch(
      'https://yummly2.p.rapidapi.com/feeds/search?&q' + searchResult + "&maxResult=10",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "yummly2.p.rapidapi.com",
          "x-rapidapi-key":
            "4ef33b568emsh8bd23e93994e0e1p157429jsnf1480d26df37",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          searchResult: responseJson,
        });
        console.log(responseJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { searchResult } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Header />
        </SafeAreaView>

        <ScrollView style={styles.searchContainer}>
          <SearchBar
            round={true}
            lightTheme={true}
            placeholder="Search for a recipe or ingredient..."
            onChangeText={this.handleSearch}
            value={searchResult}
          />
        </ScrollView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    //flexDirection: "column",
    height: "100%",
  },

  header: {
    height: "20%",
  },

  searchContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 4,
    flex: 2,
  },

  resultContainer: {
    backgroundColor: "#e0d9d9",
    marginHorizontal: 10,
    marginTop: 6,
    marginBottom: 100,
  },

  recipeContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    padding: 5,    
    marginVertical: 5,
    borderRadius: 4,
  },
});
