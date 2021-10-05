import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegistrationScreens } from "./components/RegistrationScreens";
import { OwnerDashboard, AddProperty } from "./components/OwnerScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import styles from "./styles/App.styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { currentUser } from "./queries/queries";
import { useQuery } from "@apollo/client";

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: "https://iproper.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
/* 
const HomeScreen = ({ setJwtToken, navigation }) => {
  const logOut = () => {
    setJwtToken("");
    SecureStore.setItemAsync("jwt_token", "").then(() => {});
  };
  //const { onPress } = props;
  // const AddNewPropertyPressed = () => {
  //   props.navigation.navigate("OwnerScreen");
  // };
  return (
    <View style={[styles.container, styles.homeScreen]}>
      <Text style={styles.textH2}>Home Screen</Text>
      <Pressable style={styles.button} onPress={() => logOut()}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("OwnerScreens")}
      >
        <Text style={styles.buttonText}>AddNewProperty</Text>
      </Pressable>
    </View>
  );
}; */

const LoggedInStack = ({ jwtToken }) => {
  let { loading, error, data } = useQuery(currentUser, {
    context: {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
  });

  if (error) {
    console.log(error);
    return (
      <View style={styles.container}>
        <Text>Something went wrong...</Text>
      </View>
    );
  }

  return loading && !data ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name='Home' option={{ title: "Home" }}>
        {(props) => <OwnerDashboard {...props} userData={data.currentUser} jwtToken={jwtToken}/>}
      </Stack.Screen>
      <Stack.Screen
        name='AddProperty'
        option={{ title: "AddProperty" }}
        component={AddProperty}
      />
    </Stack.Navigator>
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
            <LoggedInStack jwtToken={jwtToken} />
          )}
        </NavigationContainer>
        <StatusBar style='auto' />
      </KeyboardAvoidingView>
    </ApolloProvider>
  );
}
