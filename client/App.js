import { StatusBar } from "expo-status-bar";

import * as SecureStore from "expo-secure-store";

import React, { useState, useEffect } from "react";
import { SafeAreaView, Platform } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import firebase from "firebase";

// Custom components
import NotLoggedInStack from "./components/NotLoggedInStack";
import LoggedInStack from "./components/LoggedInStack";
import { NavigationContainer } from "@react-navigation/native";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAy_YubuCOpudzb5CACI39ruVJrX-e8Iqg",
  authDomain: "iproper.firebaseapp.com",
  databaseURL: "https://iproper.firebaseio.com",
  projectId: "iproper",
  storageBucket: "gs://iproper.appspot.com",
  messagingSenderId: "973379366430",
  appId:
    Platform.OS === "ios"
      ? "1:973379366430:ios:7cec333e5007564ae6880f"
      : "1:973379366430:android:69db4fa11c5da2eee6880f",
};

Date.prototype.getDayMondayFirst = function() {
  let day = this.getDay();
  return day === 0 ? 7 : day; 
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// Styles
import styles from "./styles/App.styles";

const client = new ApolloClient({
  uri: "https://iproper.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [jwtToken, setJwtToken] = useState("");

  //-------------------------------------------------------------------------
  // Jwt token saving and retrieval
  useEffect(() => {
    if (Platform.OS === "web") return;

    SecureStore.getItemAsync("jwt_token").then((jwt_token) => {
      setJwtToken(jwt_token);
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") return;

    SecureStore.setItemAsync("jwt_token", jwtToken || "").then(() => {});
  }, [jwtToken]);
  //-------------------------------------------------------------------------

  return (
    <ApolloProvider client={client}>
      <SafeAreaView
        style={[styles.App, Platform.OS === "android" && { marginTop: 30 }]}
      >
        <NavigationContainer>
          {!jwtToken ? (
            <NotLoggedInStack setJwtToken={setJwtToken} />
          ) : (
            <LoggedInStack jwtToken={jwtToken} setJwtToken={setJwtToken} />
          )}
        </NavigationContainer>
        <StatusBar style='auto' />
      </SafeAreaView>
    </ApolloProvider>
  );
}
