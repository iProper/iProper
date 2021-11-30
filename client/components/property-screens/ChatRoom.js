import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

import NavigationHeader from "../small/NavigationHeader";

import styles from "../../styles/App.styles";
import chatStyles from "../../styles/ChatScreens.styles";

const ChatRoom = ({ navigation, route, userData, socket }) => {
  const { roomId, title } = route.params;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
/* 
  const sendMessage = () => {
    setMessages((oldMessages) => {
      const copy = oldMessages.map((m) => m);
      copy.push({
        sender: {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
        dateCreated: new Date(),
        text: message,
      });
      return copy;
    });
    setMessage("");
  }; */

  const sendMessage = () => {
    socket.emit("message", {
      userId: userData.id,
      chatId: roomId,
      text: message,
    });
  }

  return (
    <View style={[styles.container, { padding: 30, paddingBottom: 5 }]}>
      <NavigationHeader goBack={() => navigation.navigate("Chat")} title={title} />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ height: "100%" }}
        >
          <View style={[chatStyles.CT_Body]}>
            {messages.map((item, index) => {
              let firstMessage = true;
              if (
                index > 0 &&
                messages[index - 1].sender.id === item.sender.id &&
                item.dateCreated.getTime() -
                  messages[index - 1].dateCreated.getTime() <
                  2 * 60 * 1000
              ) {
                firstMessage = false;
              }
              return (
                <View key={index} style={chatStyles.messageArea}>
                  {firstMessage ? (
                    <View style={chatStyles.messageHeading}>
                      <Text style={[chatStyles.UserName, { fontSize: 14 }]}>
                        {item.sender.firstName} {item.sender.lastName}
                      </Text>
                      <Text>
                        {("00" + item.dateCreated.getHours()).slice(-2)}:
                        {("00" + item.dateCreated.getMinutes()).slice(-2)}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}

                  <View
                    style={[
                      chatStyles.messageBody,
                      firstMessage ? chatStyles.firstMessage : {},
                    ]}
                  >
                    <Text>{item.text}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={[styles.flexRow, chatStyles.CT_TextInput, { marginTop: 10 }]}>
            <TextInput
              placeholder='Enter message'
              style={{ width: "90%" }}
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
              multiline={true}
            />

            <Pressable onPress={sendMessage}>
              <Image
                source={require("../../assets/send-blue.png")}
                resizeMode={"center"}
                style={[styles.iconS, { marginHorizontal: 7 }]}
              />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;
