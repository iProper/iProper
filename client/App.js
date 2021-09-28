import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegistrationScreens } from "./components/RegistrationScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, KeyboardAvoidingView } from "react-native";
import styles from "./styles/App.styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: "https://iproper.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      <KeyboardAvoidingView style={[styles.App]}>
        <NavigationContainer>
          {!loggedIn ? (
            <Stack.Navigator
              screenOptions={{ headerShown: false, animation: "none" }}
            >
              <Stack.Screen name='Login' option={{ title: "Login" }}>
                {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn} />}
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
              <Stack.Screen
                name='Home'
                component={HomeScreen}
                option={{ title: "Home" }}
              ></Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
        <StatusBar style='auto' />
      </KeyboardAvoidingView>
    </ApolloProvider>
  );
}
