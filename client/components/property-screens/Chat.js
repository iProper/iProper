import { GiftedChart } from "react-native-gifted-chat";
import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import NavigationHeader from "../small/NavigationHeader";
import styles from "../../styles/App.styles";
import ChatScreenStyles from "../../styles/ChatScreen.styles";
import AppStyles from "../../styles/App.styles";
import { useNavigation } from "@react-navigation/native";
import GroupChat from "./GroupChat";
export function Chat(props) {
  //today = new Date();

  const [GroupChatMessages, setGroupChatMessage] = useState([
    {
      name: "Property Group Cat",
      text: "Last message",
      userImg: require("../../assets/user.png"),
    },
  ]);

  const [Messages, setMessage] = useState([
    {
      id: 0,
      text: "Check Schedule for task",
      name: "Nekeisha Pope",
      chatMessage: "",
      system: true,
    },
    {
      id: 1,
      text: "New rules is posted",
      name: "Andrie Fedchenko",
      system: true,
    },
    {
      id: 2,
      text: "I will pass the Message on",
      name: "Antonio Morris",
      system: true,
    },
    {
      id: 3,
      text: "Hello",
      //userImg: require("../../assets/headshot4.png"),
      name: "Syed Muhammad Saad Bukhari",
      system: true,
    },
  ]);

  const navigation = useNavigation();
  const onClick = () => {
    setMessage({ Messages: Messages.name });
    navigation.navigate("ChatRoom", {
      id: Messages.id,
      name: Messages.name,
    });

    console.log(Messages.name);
  };
  const groupChatPressed = () => {
    setGroupChatMessage({
      Messages: GroupChatMessages.name,
    });
    navigation.navigate("GroupChat", {
      id: GroupChatMessages.id,
      name: GroupChatMessages.name,
    });
  };
  const joinGroup = () => {
    navigation.navigate("JoinGroupChat", {
      id: GroupChatMessages.id,
      name: GroupChatMessages.name,
    });
  };
  return (
    <View style={[AppStyles.container]}>
      <NavigationHeader
        goBack={() => navigation.navigate("Home")}
        title="Chat"
      />
      <Pressable onPress={groupChatPressed}>
        <View style={[ChatScreenStyles.Card]}>
          <View
            style={[
              ChatScreenStyles.TextSection,
              ChatScreenStyles.UserInfoText,
            ]}
          >
            <Text style={ChatScreenStyles.UserName}>Property Group Chat</Text>
            <Text>Last message...</Text>
            <Image
              source={require("../../assets/user.png")}
              style={{ width: 20, height: 40 }}
            />
          </View>
        </View>
      </Pressable>
      <View
        style={[
          AppStyles.separator,
          AppStyles.separatorBlue,
          AppStyles.separator60,
          { alignSelf: "center", marginBottom: 20, marginTop: 20 },
        ]}
      ></View>
      <Pressable onPress={onClick}>
        <FlatList
          data={Messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={ChatScreenStyles.Card}>
              <View
                style={[
                  ChatScreenStyles.TextSection,
                  ChatScreenStyles.UserInfoText,
                ]}
              >
                <Text style={ChatScreenStyles.UserName}>{item.name}</Text>
                <View
                  style={{
                    backgroundColor: "blue",
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                  }}
                />

                <Text>{item.text}</Text>
              </View>
            </View>
          )}
        />
      </Pressable>
    </View>
  );
}
export default Chat;
