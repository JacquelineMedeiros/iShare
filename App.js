import React, { useState } from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import firebase from 'firebase';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';


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
const appStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false, //No header in this screen
    },
  },
});

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


export default createAppContainer(
  createSwitchNavigator({
    //GetStarted: GetStarted
    Home: Home,
    App: appStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "Home"
    //initialRouteName: "GetStarted"
  })
);

