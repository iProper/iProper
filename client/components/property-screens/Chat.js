import React, { useState } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";

import NavigationHeader from "../small/NavigationHeader";
import ChatRoom from "./ChatRoom";
import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";
import chatStyles from "../../styles/ChatScreens.styles";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function Chat({ navigation, property, userData }) {
  return (
    <View style={[styles.container, { padding: 30 }]}>
      <NavigationHeader goBack={() => navigation.navigate("Home")} title='Chat' />

      <Pressable onPress={() => navigation.navigate("Chat room", { roomId: 0, title: `Property Group Chat` })} style={[chatStyles.card]}>
        <View style={[chatStyles.chatRoomText]}>
          <Text style={chatStyles.chatRoomName}>Property Group Chat</Text>
          <Text>Last message...</Text>
        </View>
        <Image
          source={require("../../assets/users.png")}
          resizeMode={"center"}
          style={[styles.iconM]}
        />
      </Pressable>

      <View
        style={[
          styles.separator,
          styles.separatorBlue,
          { alignSelf: "center", marginVertical: 10 },
        ]}
      ></View>

      <FlatList
        data={property.residents.filter((r) => r.id != userData.id)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigation.navigate("Chat room", { roomId: item.id, title: `${item.firstName} ${item.lastName}` })}
            style={chatStyles.card}
          >
            <View style={[chatStyles.chatRoomText]}>
              <Text style={chatStyles.chatRoomName}>
                {item.firstName} {item.lastName}
              </Text>
              <Text>Last message...</Text>
            </View>
            <View
              style={[
                propertyStyles["residentColor" + (index + 1)],
                {
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                },
              ]}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

export default function ChatScreens({ property, userData, jwtToken, socket }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name='Chats'>
        {(props) => (
          <Chat
            {...props}
            property={property}
            userData={userData}
            jwtToken={jwtToken}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name='Chat room'>
        {(props) => (
          <ChatRoom
            {...props}
            property={property}
            userData={userData}
            jwtToken={jwtToken}
            socket={socket}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
