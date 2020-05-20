import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Location, Permissions } from "expo";

export default class UserLocation extends React.Component {
  state = {
    location: {},
    errorMessage: "",
  };

  getLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      alert("iShare needs permission to access your location");
      this.setState({
        errorMessage: "Permission not granted",
      });
    }

    const location = await Location.getCurrentPositionAsync();

    this.setState({ location });
  };

  componentWillMount() {
    this.getLocationPermission();
  }

  //renders screen view the view
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.location}</Text>
      </View>
    );
  }
}

//create style for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "70%",
    height: "70%",
  },
});
