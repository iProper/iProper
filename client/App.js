import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegistrationScreens } from "./components/RegistrationScreens";
import { OwnerDashboard } from "./components/OwnerScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import styles from "./styles/App.styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: "https://iproper.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const HomeScreen = ({ setJwtToken }) => {
  const logOut = () => {
    setJwtToken("");
    SecureStore.setItemAsync("jwt_token", "").then(() => {});
  };

  return (
    <View style={[styles.container, styles.homeScreen]}>
      <Text style={styles.textH2}>Home Screen</Text>
      <Pressable style={styles.button} onPress={() => logOut()}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default function App() {
  const [jwtToken, setJwtToken] = useState("");

  useEffect(() => {
    if (Platform.OS === "web") return;

    SecureStore.getItemAsync("jwt_token").then((jwt_token) => {
      setJwtToken(jwt_token);
    });
  });

  useEffect(() => {
    if (Platform.OS === "web" || !jwtToken) return;

    SecureStore.setItemAsync("jwt_token", jwtToken).then(() => {});
  }, [jwtToken]);

  return (
    <ApolloProvider client={client}>
      <KeyboardAvoidingView style={[styles.App]}>
        <NavigationContainer>
          {!jwtToken ? (
            <Stack.Navigator
              screenOptions={{ headerShown: false, animation: "none" }}
            >
              <Stack.Screen name='Login' option={{ title: "Login" }}>
                {(props) => <LoginScreen {...props} setJwtToken={setJwtToken} />}
              </Stack.Screen>
              <Stack.Screen
                name='Registration'
                component={RegistrationScreens}
                option={{ title: "Registration" }}
              ></Stack.Screen>
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{ headerShown: false, animation: "none" }}
            >
              <Stack.Screen name='Home' option={{ title: "Home" }}>
                {(props) => <HomeScreen {...props} setJwtToken={setJwtToken} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
        <StatusBar style='auto' />
      </KeyboardAvoidingView>
    </ApolloProvider>
  );
}
