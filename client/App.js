import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegistrationScreens } from "./components/RegistrationScreens";
import { OwnerDashboard, AddProperty } from "./components/OwnerScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import styles from "./styles/App.styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { currentUser } from "./queries/queries";
import { useQuery } from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SideMenu from "./components/SideMenu";
import { PropertyTabs } from "./components/PropertyScreens";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const client = new ApolloClient({
  uri: "https://iproper.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const OwnerStack = ({ navigation, currentUser, jwtToken }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name='Home' option={{ title: "Home" }}>
        {(props) => (
          <OwnerDashboard {...props} userData={currentUser} jwtToken={jwtToken} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name='AddProperty'
        option={{ title: "AddProperty" }}
        component={AddProperty}
      />
    </Stack.Navigator>
  );
};

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
    <Drawer.Navigator
      drawerContent={(props) => (
        <SideMenu {...props} userData={data.currentUser} jwtToken={jwtToken} />
      )}
      screenOptions={{ headerShown: true, headerTitle: "" }}
    >
      <Drawer.Screen name='MainStack'>
        {(props) => (
          <OwnerStack
            {...props}
            jwtToken={jwtToken}
            currentUser={data.currentUser}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name='PropertyTabs'>
        {(props) => <PropertyTabs {...props} propertyId={0} userData={data.currentUser} jwtToken={jwtToken} />}
      </Drawer.Screen>
    </Drawer.Navigator>
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
