import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  FlatList,
} from "react-native";
import DatePicker from "react-native-datepicker";
import Header from "../components/Header";

import Fire from "../config/Fire";

const firebase = require("firebase");
require("firebase/firestore");

//create products arrays with itemName and expireData
products = [
  {
    itemName: "",
    expireDate: "",
  },
];

//create and export class Inventory
export default class Inventory extends React.Component {
  //set initial state of products to empty
  state = {
    products: [],
  };

  //function that will be loaded when the components of the screen mounts. get the user id and search on firebase for the inventory of that user
  componentDidMount() {
    var that = this;
    let userID = firebase.auth().currentUser.uid;
    let inventoryRef = firebase.firestore().collection("inventory");
    let query = inventoryRef
      .where("uid", "==", userID)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        //for each that loops on the document folder and returns the data. set the state of products as product to populate array
        snapshot.forEach((doc) => {
          var product = that.state.products;
          const data = (doc.id, "=>", doc.data());
          that.setState({ products: product });
          //push the data to product to be displayed on the screen
          product.push({
            itemName: data.itemName,
            expireDate: data.expireDate,
          });
          console.log(data.expireDate);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  createAlertItemAdded = () =>
    Alert.alert(
      "Success",
      "A new item was added to your inventory",
      [
        {
          text: "Ok",
          onPress: () => {
            this.props.navigation.navigate("Inventory");
          },
        },
      ],
      { cancelable: false }
    );

  //add item to firebase
  handleAddItem = () => {
    try {
      Fire.shared
        .addToInventory({
          itemName: this.state.itemName,
          expireDate: this.state.expireDate,
        })

        .then((ref) => {
          this.setState({
            title: "",
            expireDate: "",
          });
        });
      this.createAlertItemAdded;
      //catch error and throw alert to user
    } catch (error) {
      alert("Error: ", error);
    }
  };

  renderInventory = (product) => {
    return (
      <View style={styles.inventoryContainer}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.paragraph}>Item: {product.itemName}</Text>
              <Text style={styles.paragraphRegular}>Expire Date: {product.expireDate}</Text>
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
        <View style={styles.inputContainer}>
          <Text style={styles.paragraph}>Add an item to the inventory</Text>
          <TextInput
            style={styles.textInputStyle}
            multiline={false}
            autoFocus={true}
            placeholder="e.g Beans"
            onChangeText={(itemName) => this.setState({ itemName })}
            value={this.state.itemName}
          ></TextInput>

          <Text style={styles.paragraph}>Add expire date</Text>

          <DatePicker
            style={{ width: 200 }}
            date={this.state.expireDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="Select expire date"
            format="DD-MM-YYYY"
            minDate="12-05-2020"
            maxDate="31-12-2040"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 16,
                //tintColor: "#09756c"
              },
              dateInput: {
                borderWidth: 1,
                borderRadius: 35,
                borderColor: "#8b8984",
                height: 40,
                marginHorizontal: 10,
                //padding: 15,
              },
            }}
            onDateChange={(expireDate) => this.setState({ expireDate })}
            value={this.state.expireDate}
          />
          <View style={styles.addButton}>
            <Button
              color="#00554e"
              title="Add item"
              onPress={this.handleAddItem}
            />
          </View>
        </View>

        <View>
          <FlatList
            style={styles.inventory}
            data={this.state.products}
            renderItem={({ item }) => this.renderInventory(item)}
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
    height: "18%",
  },

  inventory: {
    padding:5,
    marginHorizontal: 10,
    marginTop: 6,
    marginBottom: 220,
  },

  inventoryContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    padding: 5,
    marginVertical: 5,
    borderRadius: 4,
  },

  addButton: {
    paddingTop: 10,
    width: 120,
    alignContent: "center",
    alignSelf: "center",
  },

  inputContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,

  },

  paragraph: {
    fontSize: 16,
    marginHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: "bold",
    color: "#44423e",
  },
  paragraphRegular: {
    fontSize: 16,
    marginHorizontal: 15,
    paddingBottom: 5,
    color: "#44423e",
  },

  textInputStyle: {
    borderWidth: 1,
    borderRadius: 35,
    borderColor: "#8b8984",
    height: 40,
    marginHorizontal: 10,
    //paddingTop: 5,
    padding: 10,
    fontSize: 16,
  },
});
