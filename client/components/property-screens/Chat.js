import React, { useState } from "react";
import { View, Text, FlatList, Image, Pressable, ScrollView } from "react-native";

import NavigationHeader from "../small/NavigationHeader";
import ChatRoom from "./ChatRoom";
import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";
import chatStyles from "../../styles/ChatScreens.styles";

import { useMutation } from "@apollo/client";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { addChatRoom } from "../../queries/queries";
import EditChatRoom from "./EditChatRoom";

const Stack = createNativeStackNavigator();

function CreateChatRoomPopUp({
  jwtToken,
  userData,
  property,
  setPopUpOpen,
  refetchProperty,
}) {
  const [renters, setRenters] = useState(
    JSON.parse(JSON.stringify(property.residents))
      .map((r) => {
        r.added = false;
        return r;
      })
      .filter((r) => r.id != userData.id)
  );

  const [createRoom] = useMutation(addChatRoom);

  const changeRenters = (userId, added) => {
    let rentersCopy = JSON.parse(JSON.stringify(renters));

    rentersCopy[rentersCopy.findIndex((r) => r.id === userId)].added = added;

    setRenters(rentersCopy);
  };

  const addRoom = () => {
    createRoom({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        propertyId: property.id,
        users: renters
          .filter((r) => r.added)
          .map((r) => r.id)
          .concat([userData.id]),
      },
    })
      .then(() => {
        refetchProperty();
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  return (
    <Pressable onPress={() => setPopUpOpen(false)} style={styles.popUp}>
      <View style={[styles.popUpCard, {padding: 25}]}>
        <Text style={styles.textH3}>Create Room</Text>
        <View style={[styles.separator, styles.separatorBlue]} />
        <View style={{ height: 200, width: "100%" }}>
          <Text
            style={[
              styles.textH4,
              { width: "100%", textAlign: "center", padding: 5 },
            ]}
          >
            Users:
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {renters.map((renter) => {
              return (
                <View
                  style={{
                    width: "100%",
                    padding: 5,
                    paddingHorizontal: 10,
                    borderColor: "#97CAEF",
                    borderRadius: 10,
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  key={renter.id}
                >
                  <Text>
                    {renter.firstName} {renter.lastName}
                  </Text>
                  <Pressable onPress={() => changeRenters(renter.id, !renter.added)}>
                    {!renter.added ? (
                      <Image
                        style={styles.iconS}
                        source={require("../../assets/plus-red.png")}
                        resizeMode={"center"}
                      />
                    ) : (
                      <Image
                        style={styles.iconS}
                        source={require("../../assets/cross-red.png")}
                        resizeMode={"center"}
                      />
                    )}
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Pressable
          onPress={addRoom}
          style={[styles.button, styles.buttonRound, { width: "100%" }]}
        >
          <Text style={[styles.buttonText]}>Create Room</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

function Chat({ navigation, property, jwtToken, userData, refetchProperty }) {
  const [createChatRoomOpen, setCreateChatRoomOpen] = useState(false);

  return (
    <View style={[styles.container]}>
      <View style={[styles.container, { padding: 30 }]}>
        <NavigationHeader goBack={() => navigation.navigate("Home")} title='Chat' />
        <FlatList
          data={property.chatRooms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            let title = property.residents
              .filter((r) => item.users.includes(r.id))
              .map((r) => r.firstName + " " + r.lastName)
              .join(", ");
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("Chat room", {
                    roomId: item.id,
                    title: title,
                  })
                }
                style={chatStyles.card}
              >
                <View style={[chatStyles.chatRoomText]}>
                  <Text style={chatStyles.chatRoomName}>{title}</Text>
                  <Text>{item.chats[item.chats.length - 1]?.message || ""}</Text>
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
            );
          }}
        />
        <Pressable
          onPress={() => {
            setCreateChatRoomOpen(true);
          }}
          style={[
            styles.button,
            styles.buttonBig,
            {
              position: "absolute",
              bottom: 10,
              alignSelf: "center",
              width: "100%",
            },
          ]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>
            Create Chat Room
          </Text>
        </Pressable>
      </View>
      {createChatRoomOpen && (
        <CreateChatRoomPopUp
          jwtToken={jwtToken}
          userData={userData}
          property={property}
          setPopUpOpen={setCreateChatRoomOpen}
          refetchProperty={refetchProperty}
        />
      )}
    </View>
  );
}

export default function ChatScreens({
  property,
  setProperty,
  userData,
  jwtToken,
  socket,
  refetchProperty,
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name='Chats'>
        {(props) => (
          <Chat
            {...props}
            property={property}
            userData={userData}
            jwtToken={jwtToken}
            refetchProperty={refetchProperty}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name='Chat room'>
        {(props) => (
          <ChatRoom
            {...props}
            property={property}
            setProperty={setProperty}
            userData={userData}
            jwtToken={jwtToken}
            socket={socket}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name='Edit chat room'>
        {(props) => (
          <EditChatRoom
            {...props}
            property={property}
            userData={userData}
            jwtToken={jwtToken}
            refetchProperty={refetchProperty}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
