import React from "react";
import { StyleSheet, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";



import firebase from 'firebase';

import GetStarted from './screens/GetStarted';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Menu from './screens/Menu';
import Message from './screens/Message';
import Notification from './screens/Notification';
import Post from './screens/Post';



//configuration details (provided by Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyB43yCmmf6WU_SPHgks8aQyRy4cqTJHk-A",
  authDomain: "ishare-b59a2.firebaseapp.com",
  databaseURL: "https://ishare-b59a2.firebaseio.com",
  projectId: "ishare-b59a2",
  storageBucket: "ishare-b59a2.appspot.com",
  messagingSenderId: "834791910521",
  appId: "1:834791910521:web:e0b73fed3560f1267778a8",
  measurementId: "G-J67ED12V0J",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//create application navigation stack
// const appStack = createStackNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       headerShown: false, //No header in this screen
//     },
//   },
// });

//create authentication navigation stack
const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false, //No header in this screen
    },
  },
  
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerShown: false, //No header in this screen
    },
  },
  
});

const AppTabNavigator = createBottomTabNavigator (
  {

    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <FontAwesome name="home" color="#474747" size={32}/>
      }
    },

    Menu: {
      screen: Menu,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Feather name="menu" color="#474747" size={32}/>
      }
    },
    
    Post: {
      screen: Post,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="md-add-circle" color="#09756c" size={32}/>
      }
    },
    Message: {
      screen: Message,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatbubbles" color="#474747" size={32}/>
      }
    },

    Notification: {
      screen: Notification,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Ionicons name="md-notifications" color="#474747" size={32} />
      }
    }
  },
);
  



export default createAppContainer(
  createSwitchNavigator({
    //GetStarted: GetStarted,
    Home: Home,
    //Notification: Notification,
    App: AppTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: "Home"
    //initialRouteName: "Notification"
    //initialRouteName: "Post"
    //initialRouteName: "Message"
    //initialRouteName: "GetStarted"
  })
);
