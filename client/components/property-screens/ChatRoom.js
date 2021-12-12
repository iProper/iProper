import React, { useState, useRef } from "react";
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

const ChatRoom = ({
  navigation,
  route,
  userData,
  property,
  setProperty,
  socket,
}) => {
  const { roomId, title } = route.params;

  let messages = property.chatRooms.find((room) => room.id === roomId).chats;
  const [message, setMessage] = useState("");

  const scrollViewRef = useRef();

  const sendMessage = () => {
    socket.emit("message", {
      chatId: roomId,
      text: message,
    });
    setProperty((p) => {
      let prop = JSON.parse(JSON.stringify(p));
      prop.chatRooms
        .find((chatRoom) => chatRoom.id === roomId)
        .chats.push({
          user: userData,
          message: message,
          createdAt: new Date(),
        });
      return prop;
    });
    setMessage("");
  };

  return (
    <View style={[styles.container, { padding: 30, paddingBottom: 5 }]}>
      <NavigationHeader
        goBack={() => navigation.navigate("Chats")}
        title={title}
        Child={() => (
          <Pressable
            style={{
              position: "absolute",
              right: 15,
              top: "90%",
              transform: [{ scale: 5 }],
              height: "100%",
              justifyContent: "flex-end",
            }}
            onPress={() => {
              navigation.navigate("Edit chat room", {
                roomId,
                title,
              });
            }}
          >
            <Text
              style={{
                height: "100%",
                backgroundColor: "#fff",
                color: "#97CAEF",
                paddingHorizontal: 2,
              }}
            >
              ...
            </Text>
          </Pressable>
        )}
      />
      <KeyboardAvoidingView style={{ flex: 1, marginTop: 5 }}>
        <View
          style={{
            flex: 1,
            borderColor: "#97CAEF",
            borderRadius: 20,
            borderWidth: 2,
          }}
        >
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
            showsVerticalScrollIndicator={false}
          >
            <View style={[chatStyles.CT_Body]}>
              {messages.map((item, index) => {
                let firstMessage = true;
                if (
                  index > 0 &&
                  messages[index - 1].user.id === item.user.id &&
                  new Date(item.createdAt).getTime() -
                    new Date(messages[index - 1].createdAt).getTime() <
                    2 * 60 * 1000
                ) {
                  firstMessage = false;
                }
                return (
                  <View key={index} style={chatStyles.messageArea}>
                    {firstMessage ? (
                      <View style={chatStyles.messageHeading}>
                        <Text style={[chatStyles.UserName, { fontSize: 14 }]}>
                          {item.user.firstName} {item.user.lastName}
                        </Text>
                        <Text>
                          {("00" + new Date(item.createdAt).getHours()).slice(-2)}:
                          {("00" + new Date(item.createdAt).getMinutes()).slice(-2)}
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
                      <Text>{item.message}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;
