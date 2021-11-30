import { View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getPropertyById } from "../queries/queries";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { io } from "socket.io-client";

import HomeRenter from "./property-screens/HomeRenter";
import HomeOwner from "./property-screens/HomeOwner";
import AboutScreen from "./property-screens/About";
import NoPropertyHome from "./property-screens/NoPropertyHomeRenter";
import ScheduleScreen from "./property-screens/Schedule";
import Loading from "./small/Loading";
import ChatScreens from "./property-screens/Chat";

const Tabs = createBottomTabNavigator();

const socket = io({
  autoConnect: false,
});

export function PropertyTabs({ route, userData, jwtToken, refetchUser }) {
  let propertyId = null;

  if (userData.isOwner) {
    if (route.params?.id) propertyId = route.params.id;
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

  let property = JSON.parse(JSON.stringify(data?.getProperty || null));
  if (property) {
    property.residents.sort((a, b) => a.id.localeCompare(b.id));
  }

  useEffect(() => {
    refetch();
  }, [jwtToken, propertyId]);

  useEffect(() => {
    socket.connect();

    socket.on("message", (message) => {
      property.chats.find((chat) => chat.id === message.id).messages.push(message);
    });
  }, [data]);

  return loading || propertyId === null ? (
    <Tabs.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Tabs.Screen
        name='loading'
        options={{ tabBarStyle: { position: "absolute", opacity: 0 } }}
      >
        {(props) => <Loading text={"Loading..."} style={{ flex: 1 }} />}
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
        tabBarIcon:
          userData.propertyCode || userData.isOwner
            ? ({ focused }) => {
                let iconImg;
                switch (route.name) {
                  case "Home":
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
                    break;
                  case "Schedule":
                    iconImg = (
                      <Image
                        source={
                          !focused
                            ? require("../assets/schedule-white.png")
                            : require("../assets/schedule-blue.png")
                        }
                        style={{ width: 30, height: 30 }}
                      />
                    );
                    break;
                  case "Chat":
                    iconImg = (
                      <Image
                        source={
                          !focused
                            ? require("../assets/chat-white.png")
                            : require("../assets/chat-blue.png")
                        }
                        style={{ width: 30, height: 30 }}
                      />
                    );
                    break;
                  case "About":
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
                    break;
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
      <Tabs.Screen name='Schedule'>
        {(props) => (
          <ScheduleScreen
            {...props}
            property={property}
            jwtToken={jwtToken}
            userData={userData}
            refetchProperty={refetch}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen name='Chat'>
        {(props) => (
          <ChatScreens
            {...props}
            property={property}
            jwtToken={jwtToken}
            userData={userData}
            socket={socket}
          />
        )}
      </Tabs.Screen>
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
