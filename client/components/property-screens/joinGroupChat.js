import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const JoinGroupChat = (props) => {
  const [chatrooms, setChatrooms] = useState([]);
  //   const getChatrooms = () => {
  //     axios
  //       .get("http://localhost:8000/chatroom", {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("CC_Token"),
  //         },
  //       })
  //       .then((response) => {
  //         setChatrooms(response.data);
  //       })
  //       .catch((err) => {
  //         setTimeout(getChatrooms, 3000);
  //       });
  //   };

  //   useEffect(() => {
  //     getChatrooms();
  //     // eslint-disable-next-line
  //   }, []);

  return (
    <View>
      <Text>Chatrooms</Text>
      {/* <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <TextInput
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="ChatterBox Nepal"
          />
        </div>
      </div> */}
      <Text>Create Chatroom</Text>
      <View>
        {chatrooms.map((chatroom) => (
          <View key={chatroom._id}>
            <View>{chatroom.name}</View>

            <Text>Join</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default JoinGroupChat;
