import { StatusBar } from "expo-status-bar";

import * as SecureStore from "expo-secure-store";

import React, { useState, useEffect } from "react";
import { SafeAreaView, Platform } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Custom components
import NotLoggedInStack from "./components/NotLoggedInStack";
import LoggedInStack from "./components/LoggedInStack";
import { NavigationContainer } from "@react-navigation/native";

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
    if (Platform.OS === "web" || !jwtToken) return;

    SecureStore.setItemAsync("jwt_token", jwtToken).then(() => {});
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
            <LoggedInStack jwtToken={jwtToken} setJwtToken={setJwtToken}/>
          )}
        </NavigationContainer>
        <StatusBar style='auto' />
      </SafeAreaView>
    </ApolloProvider>
  );
}
