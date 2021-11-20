import { GiftedChart } from "react-native-gifted-chat";
import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

import ChatScreenStyles, { styles } from "../../styles/ChatScreen.styles";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import io from "socket.io-client";
import NavigationHeader from "../small/NavigationHeader";
import { useNavigation } from "@react-navigation/native";
//const socket = io.connect("http://localhost:4000");

const GroupChat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //const { id, name } = route.params;

  const socketRef = useRef();
  const today = new Date();
  const [You, setYou] = useState([
    {
      id: 0,
      text: "Check Schedule for task",
      // userImg: require("../../assets/headshot1.jpg"),
      name: "You",
      chatMessage: "",
      dateCreated:
        new Date().getDate() +
        "/" +
        parseInt(today.getMonth() + 1) +
        "/" +
        today.getFullYear(),
      system: true,
    },
  ]);

  const [GroupMessages, setGroupMessage] = useState([
    //const Messages = [

    {
      id: 0,
      text: "New rules is posted",
      //userImg: require("../../assets/headshot2.jpg"),
      name: "Andrie Fedchenko",
      dateCreated:
        new Date().getDate() +
        "/" +
        parseInt(today.getMonth() + 1) +
        "/" +
        today.getFullYear(),
      system: true,
    },
    {
      id: 1,
      text: "I will pass the Message on",
      //userImg: require("../../assets/headshot3.jpg"),
      name: "Antonio Morris",
      dateCreated:
        new Date().getDate() +
        "/" +
        parseInt(today.getMonth() + 1) +
        "/" +
        today.getFullYear(),
      system: true,
    },
    {
      id: 3,
      text: "Hello",
      //userImg: require("../../assets/headshot4.png"),
      name: "Syed Muhammad Saad Bukhari",
      dateCreated:
        new Date().getDate() +
        "/" +
        parseInt(today.getMonth() + 1) +
        "/" +
        today.getFullYear(),
      system: true,
    },
    //];
  ]);

  useEffect(() => {
    setGroupMessage(GroupMessages);
    setYou(You);
  });
  /*
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io("http://192.168.0.36:19002");
    socketRef.current.on("ID", (id) => {
      setYourID(id);
      setMessage(message);
    });
    socketRef.current.on("message", (message) => {});
  });
  function receiveMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }
 */ function sendMessage(e) {
    e.preventDefault();
    const messageObj = {
      body: message,
      id: yourID,
    };
    setGroupMessage("");
    socketRef.current.emit("send message", messageObj);
    console.log(e.GroupMessages);
  }

  function handleChange(e) {
    setGroupMessage(e.value);
  }

  return (
    <View>
      <NavigationHeader
        goBack={() => navigation.navigate("Chat")}
        title="Property Group Chat"
      />
      <KeyboardAvoidingView
        style={ChatScreenStyles.KeyboardAvoidingView}
        behavior="padding"
      >
        <ScrollView>
          <View>
            {/*style={ChatScreenStyles.CT_Body}*/}
            {/* uncomment when backend completed */}
            {/* {messages.map((message, index) => {
            if (message.id == yourID) {
              return (
                <View key={index}>
                  <Text>{message.body}</Text>
                </View>
              );
            }
            return (
              <View key={index}>
                <Text>{message.body}</Text>
              </View>
            );
          })} */}

            {/* comment the code at the bottom and uncomment the code above when socket is establish */}
            <View style={ChatScreenStyles.CT_Body}>
              <FlatList
                data={You}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text
                      style={[
                        ChatScreenStyles.UserName,
                        { fontSize: 14, marginLeft: 250 },
                      ]}
                    >
                      {item.name}
                    </Text>

                    <View
                      style={[ChatScreenStyles.YouBody, ChatScreenStyles.Right]}
                    >
                      <Text>{item.text}</Text>
                      <Text>{item.dateCreated}</Text>
                    </View>
                  </View>
                )}
              />

              <FlatList
                data={GroupMessages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text style={[ChatScreenStyles.UserName, { fontSize: 14 }]}>
                      {item.name}
                    </Text>

                    <View
                      style={[ChatScreenStyles.TextBody, ChatScreenStyles.Left]}
                    >
                      <Text>{item.text}</Text>
                      <Text style={{ marginLeft: 140 }}>
                        {item.dateCreated}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
          <View
            style={[
              ChatScreenStyles.CT_TextInput,
              ChatScreenStyles.sectionStyle,
            ]}
          >
            <TextInput
              style={[ChatScreenStyles.Card]}
              placeholder="Enter message"
              onSubmitEditing={sendMessage}
              value={GroupMessages}
              onChangeText={handleChange}
            />
            <Pressable>
              <Image
                style={[ChatScreenStyles.imageStyle, {}]}
                source={require("../../assets/sendMsg-icon.png")}
                resizeMode={"center"}
              />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default GroupChat;
