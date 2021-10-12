import { Text, View } from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import { getPropertyById } from "../queries/queries";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeRenter from "./property-screens/HomeRenter";
import HomeOwner from "./property-screens/HomeOwner";
import AboutScreen from "./property-screens/About";

const Tabs = createBottomTabNavigator();

export function PropertyTabs({ route, userData, jwtToken }) {
  let propertyId = 0;
  if (userData.isOwner === "true") {
    propertyId = route.params.id;
  }

  const { loading, error, data } = useQuery(getPropertyById, {
    context: {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
    variables: {
      id: propertyId,
    },
  });

  let property = data?.getProperty || null;

  return loading ? (
    <Tabs.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Tabs.Screen name='loading'>
        {(props) => (
          <View {...props}>
            <Text>Loading...</Text>
          </View>
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  ) : (
    <Tabs.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      {userData.isOwner ? (
        <Tabs.Screen name='Home'>
          {(props) => (
            <HomeOwner
              {...props}
              property={property}
              jwtToken={jwtToken}
              userData={userData}
            />
          )}
        </Tabs.Screen>
      ) : (
        <Tabs.Screen name='Home'>
          {(props) => (
            <HomeRenter
              {...props}
              property={property}
              jwtToken={jwtToken}
              userData={userData}
            />
          )}
        </Tabs.Screen>
      )}
      <Tabs.Screen name='About'>
        {(props) => (
          <AboutScreen
            {...props}
            property={data?.getProperty}
            jwtToken={jwtToken}
            userData={userData}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
