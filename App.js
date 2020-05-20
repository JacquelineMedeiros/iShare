/*
iShare application
Final Project - BSc Honours in IT - Class 2020 - CCT College Dublin
Jacqueline Siqueira de Medeiros
Supervisor: Greg South
*/

import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

import GetStarted from "./src/screens/GetStarted";
import Loading from "./src/screens/Loading";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import Chat from "./src/screens/Chat";
import Home from "./src/screens/Home";
import Menu from "./src/screens/Menu";
import Message from "./src/screens/Message";
import Notification from "./src/screens/Notification";
import Post from "./src/screens/Post";
import Profile from "./src/screens/Profile";
import Inventory from "./src/screens/Inventory";
import Recipes from "./src/screens/Recipes";
import Tips from "./src/screens/Tips";
import UserLocation from "./src/screens/UserLocation";

//create the authentication navigation stack for Get Started/ Login and SignUp screens
const AuthStack = createStackNavigator({
  GetStarted: {
    screen: GetStarted,
    navigationOptions: {
      headerShown: false, //No header on this screen
    },
  },

  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false, //No header on this screen
    },
  },

  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerShown: false, //No header on this screen
    },
  },
});

/*create the app navigation stack (the bottom tab bar the default navigation options for most screens, the
special navigation option for the post option (postModal) and menu option (menuModel)*/
const AppStack = createStackNavigator(
  {
    //create and set Bottom Tab Navigation as default
    default: createBottomTabNavigator(
      {
        //home: first option on tab navigation
        Home: {
          screen: Home,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesome name="home" color="#474747" size={32} />
            ),
          },
        },
        //message: second option on tab navigation
        Message: {
          screen: Message,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-chatbubbles" color="#474747" size={32} />
            ),
          },
        },
      //post: third option on tab navigation  
        Post: {
          screen: Post,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="md-add-circle" color="#09756c" size={32} />
            ),
          },
        },
        //notification: fourth option on tab navigation
        Notification: {
          screen: Notification,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="md-notifications" color="#474747" size={32} />
            ),
          },
        },
        //menu: fifth option on tab navigation
        Menu: {
          screen: Menu,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Feather name="menu" color="#474747" size={32} />
            ),
          },
        },
      },
      /*create default navigation option and a different navigation for Port and Menu Screen as they will not display the
      tab bar navigation on the screen*/
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === "Post") {
              navigation.navigate("postModal");
            } else if (navigation.state.key === "Menu") {
              navigation.navigate("menuModal");
            } else {
              defaultHandler();
            }
          },
        },
        tabBarOptions: {
          activeTintColor: "#ffffff",
          activeBackgroundColor: "#00c7b0",
        },
      }
    ),

    postModal: {
      screen: Post,
    },

    menuModal: {
      screen: Menu,
    },

    SignUp: {
      screen: SignUp,
    },

    Profile: {
      screen: Profile,
    },

    Inventory: {
      screen: Inventory,
    },

    Recipes: {
      screen: Recipes,
    },

    UserLocation: {
      screen: UserLocation,

    },

    Tips: {
      screen: Tips,
    },

    Chat: {
      screen: Chat,
    }

  },
  
  {
    //reference: https://reactnavigation.org/docs/4.x/modal
    /*Create mode configuration for stack navigator and set to modal (only valid for iOS)
    The modal behavior slides the screen in from the bottom on iOS and allows the user to swipe down from the top to dismiss it.
    */
    mode: "modal",
    headerMode: "none", //not using default header on those screen so it is set to none
  }
);

//create the switch navigator for the app container and export 

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      //GetStarted: GetStarted,
      App: AppStack,  
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
