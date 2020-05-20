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
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // image pic reference: https://docs.expo.io/versions/latest/sdk/imagepicker/
import DatePicker from "react-native-datepicker"; // date pic reference: https://aboutreact.com/react-native-datepicker/

import Fire from "../config/Fire";

const firebase = require("firebase");
require("firebase/firestore");

export default class Post extends React.Component {
  state = {
    title: "",
    description: "",
    expireDate: "",
    image: null,
  };

  createAlertItemAdded = () =>
    Alert.alert(
      "Success",
      "You shared an item!",
      [
        {
          text: "Ok",
          onPress: () => {
            this.createAlertItemAdded();
          },
        },
      ],
      { cancelable: false }
    );

  //image picker from expo plugin
  selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  //function that will be called when the button shared is pressed
  handlePost = () => {
    //call addPost function from Fire class and set state for title, description, expireDate and localuri(image)
    try {
      Fire.shared
        .addPost({
          title: this.state.title,
          description: this.state.description,
          expireDate: this.state.expireDate,
          localUri: this.state.image,
        })
        //
        .then((ref) => {
          this.setState({
            title: "",
            description: "",
            expireDate: "",
            image: null,
          });

          this.props.navigation.goBack(); //go to previous screen when the post is completed
        });
      //catch error and throw alert to user
    } catch (error) {
      alert("Error: ", error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
        <ScrollView>
          <View>
            <Text style={styles.paragraph}>Add title</Text>
            <TextInput
              style={styles.textInputStyle}
              multiline={false}
              autoFocus={true}
              placeholder="e.g tea bags"
              onChangeText={(title) => this.setState({ title })}
              value={this.state.title}
            ></TextInput>

            <Text style={styles.paragraph}>Add product description</Text>
            <TextInput
              style={styles.textInputStyle}
              multiline={false}
              autoFocus={true}
              placeholder="e.g gold blend, 20 teabags"
              onChangeText={(description) => this.setState({ description })}
              value={this.state.description}
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
          </View>

          <View style={{ height: 220, marginHorizontal: 5, marginTop: 5 }}>
            <Image
              source={{ uri: this.state.image }}
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </View>
          <View>
            <TouchableOpacity
              style={styles.iconsContainer}
              onPress={this.selectImage}
            >
              <Text style={styles.add}>Add a picture {""} </Text>
              <Entypo name="images" color="#09756c" size={25} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.containerShare}>
            <Text style={styles.share} onPress={this.handlePost}>
              Share
            </Text>
          </TouchableOpacity>
        </ScrollView>
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

  goBack: {
    color: "#616161",
    fontSize: 20,
    fontWeight: "bold",
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
    borderWidth: 1,
    borderRadius: 35,
    borderColor: "#8b8984",
    height: 40,
    marginHorizontal: 10,
    //paddingTop: 5,
    padding: 10,
    fontSize: 16,
  },
  inputContainer: {
    flex: 3,
    paddingHorizontal: 15,
    flexDirection: "column",
  },

  iconsContainer: {
    flex: 7,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },

  postContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },

  add: {
    fontSize: 17,
    color: "#09756c",
  },

  share: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#ffffff",
    borderWidth: 1,
    borderRadius: 35,
    borderColor: "#09756c",
    backgroundColor: "#09756c",
    height: 50,
    width: 120,
    paddingHorizontal: 28,
    padding: 10,
    alignSelf: "center",
  },

});
