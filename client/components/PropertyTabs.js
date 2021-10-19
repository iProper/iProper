import { Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getPropertyById } from "../queries/queries";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeRenter from "./property-screens/HomeRenter";
import HomeOwner from "./property-screens/HomeOwner";
import AboutScreen from "./property-screens/About";
import NoPropertyHome from "./property-screens/NoPropertyHomeRenter";

const Tabs = createBottomTabNavigator();

export function PropertyTabs({
  route,
  userData,
  jwtToken,
  propertyId,
  refetchUser,
}) {
  if (userData.isOwner) {
    propertyId = route.params.id;
  } else {
    propertyId = userData.propertyCode;
  }

  const { loading, error, data, refetch } = useQuery(getPropertyById, {
    context: {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
    variables: {
      id: propertyId,
    },
  });

  useEffect(() => {
    refetch();
  }, [jwtToken]);

  let property = data?.getProperty || null;

  return loading ? (
    <Tabs.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Tabs.Screen
        name='loading'
        options={{ tabBarStyle: { position: "absolute", opacity: 0 } }}
      >
        {(props) => (
          <View {...props}>
            <Text>Loading...</Text>
          </View>
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  ) : (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: "none",
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "#FC4445" }} />
        ),
        tabBarLabel: () => {},
        tabBarIcon: userData.propertyCode || userData.isOwner
          ? ({ focused }) => {
              let iconImg;
              if (route.name === "Home") {
                iconImg = (
                  <Image
                    source={
                      !focused
                        ? require("../assets/home-white.png")
                        : require("../assets/home-blue.png")
                    }
                    style={{ width: 30, height: 30 }}
                  />
                );
              } else if (route.name === "About") {
                iconImg = (
                  <Image
                    source={
                      !focused
                        ? require("../assets/about-white.png")
                        : require("../assets/about-blue.png")
                    }
                    style={{ width: 30, height: 30 }}
                  />
                );
              }

              return iconImg;
            }
          : () => {},
      })}
    >
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
      ) : userData.propertyCode ? (
        <Tabs.Screen name='Home'>
          {(props) => (
            <HomeRenter
              {...props}
              property={property}
              jwtToken={jwtToken}
              userData={userData}
              refetchUser={refetchUser}
            />
          )}
        </Tabs.Screen>
      ) : (
        <Tabs.Screen
          name='Home'
          options={{ tabBarStyle: { position: "absolute", opacity: 0 } }}
        >
          {(props) => (
            <NoPropertyHome
              {...props}
              property={property}
              jwtToken={jwtToken}
              userData={userData}
              refetchUser={refetchUser}
            />
          )}
        </Tabs.Screen>
      )}
      <Tabs.Screen name='About'>
        {(props) => (
          <AboutScreen
            {...props}
            property={property}
            jwtToken={jwtToken}
            userData={userData}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
