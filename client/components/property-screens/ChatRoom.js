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
import NavigationHeader from "../small/NavigationHeader";
//import styles from "../../styles/App.styles";
import ChatScreenStyles, { styles } from "../../styles/ChatScreen.styles";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import io from "socket.io-client";
import { Component } from "react";
import { render } from "react-dom";
import { useNavigation } from "@react-navigation/native";
//const socket = io.connect("http://localhost:4000");
//export default class ChatRoom extends Component {
const ChatRoom = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, name } = route.params;

  console.log(name);
  // const socketRef = useRef();

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
  function sendMessage(e) {
    e.preventDefault();
    const messageObj = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObj);
    console.log(e.message);
  }

  function handleChange(e) {
    setMessage(e.value);
  }
  // Comment code in the bottom when socket connection establish
  /*useEffect(() => {
    const socket = io("http://localhost:4000");
    //console.log("chat room");
    socket.on("client", console.log);
    // add your local ip
    //this.socket.on("chat message", (msg) => {
    //  this.setState({ chatMessages: [...this.state.ChatMessages, msg] });
    // });
  }, []);

  const submitChatMessage = () => {
    setChatMessages({ ChatMessage: "" });

    socket.emit("chat Message", this.state.ChatMessage);
  };*/
  /*
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
    };
  }
  componentDidMount() {
    this.socket = io("http://localhost:4000");
    this.socket.on("chat message", (msg) => {
      this.setState({ chatMessages: [...this.state.chatMessage, msg] });
    });
  }
  submitChatMessage = () => {
    this.socket.emit("chat Message", "this.state.chatMessage");
    this.setState({ chatMessage: "" });
    console.log("chatMessages");
  };*/
  // const chatMessages = this.state.chatMessages.map((chatMessage) => (
  //   <Text style={{ borderWidth: 2, top: 500 }}>{chatMessage}</Text>
  // ));
  // render() {
  //   const chatMessages = this.state.chatMessages.map((chatMessage) => (
  //     <Text key={chatMessage}></Text>
  //   ));

  // return (
  //     <View>
  //       {/* <Text>{ChatMessages}</Text> */}
  //       <Text>Chat Room</Text>
  //       {chatMessages}
  //       <TextInput
  //         style={{ height: 40, borderWidth: 2 }}
  //         autoCorrect={false}
  //         value={this.state.chatMessage}
  //         onSubmitEditing={() => this.submitChatMessage()}
  //         onChangeText={(chatMessage) => {
  //           this.setState({ chatMessage });
  //         }}
  //       />
  //     </View>
  //   );

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
          <View style={ChatScreenStyles.CT_Body}>
            {messages.map((message, index) => {
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
            })}
          </View>

          <TextInput
            style={ChatScreenStyles.CT_TextInput}
            placeholder="Enter message"
            onSubmitEditing={sendMessage}
            value={message}
            onChangeText={handleChange}

            //source={require("../../assets/rsend.png")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;
