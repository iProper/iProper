import { StatusBar } from "expo-status-bar";

import * as SecureStore from "expo-secure-store";

import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Platform } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useQuery } from "@apollo/client";

// Custom components
import NotLoggedInStack from "./components/NotLoggedInStack";
import OwnerStack from "./components/OwnerScreens";
import { NavigationContainer } from "@react-navigation/native";
import { PropertyTabs } from "./components/PropertyScreens";
import SideMenu from "./components/SideMenu";

// Styles
import styles from "./styles/App.styles";

// Queries
import { currentUser } from "./queries/queries";

const Drawer = createDrawerNavigator();

const client = new ApolloClient({
  uri: "https://iproper.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

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

  console.log(data);

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
      {data.currentUser.isOwner === "true" && (
        <Drawer.Screen name='MainStack'>
          {(props) => (
            <OwnerStack
              {...props}
              jwtToken={jwtToken}
              currentUser={data.currentUser}
            />
          )}
        </Drawer.Screen>
      )}
      <Drawer.Screen name='PropertyTabs'>
        {(props) => (
          <PropertyTabs
            {...props}
            propertyId={0}
            userData={data.currentUser}
            jwtToken={jwtToken}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default function App() {
  const [jwtToken, setJwtToken] = useState("");

  //-------------------------------------------------------------------------
  // Jwt token saving and retrieval
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
  //-------------------------------------------------------------------------

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={[styles.App]}>
        <NavigationContainer>
          {!jwtToken ? (
            <NotLoggedInStack setJwtToken={setJwtToken} />
          ) : (
            <LoggedInStack jwtToken={jwtToken} />
          )}
        </NavigationContainer>
        <StatusBar style='auto' />
      </SafeAreaView>
    </ApolloProvider>
  );
}
