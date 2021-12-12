import React, { useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";

import NavigationHeader from "../small/NavigationHeader";
import { useMutation } from "@apollo/client";

import { deleteChatRoom, updateChatRoom } from "../../queries/queries";

import styles from "../../styles/App.styles";
import propertyStyles from "../../styles/PropertyScreens.styles";

function EditChatRoomMembersPopUp({
  roomId,
  jwtToken,
  userData,
  property,
  setPopUpOpen,
  refetchProperty,
}) {
  const [renters, setRenters] = useState(
    JSON.parse(JSON.stringify(property.residents))
      .map((r) => {
        r.added = property.chatRooms
          .find((c) => c.id === roomId)
          .users.includes(r.id);
        return r;
      })
      .filter((r) => r.id != userData.id)
  );

  const [editChatRoomMembers] = useMutation(updateChatRoom);

  const changeRenters = (userId, added) => {
    let rentersCopy = JSON.parse(JSON.stringify(renters));

    rentersCopy[rentersCopy.findIndex((r) => r.id === userId)].added = added;

    setRenters(rentersCopy);
  };

  const editRoomOnPress = () => {
    editChatRoomMembers({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        propertyId: property.id,
        chatRoomId: roomId,
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
      <View style={[styles.popUpCard, { padding: 25 }]}>
        <Text style={styles.textH3}>Edit members</Text>
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
          onPress={editRoomOnPress}
          style={[styles.button, styles.buttonRound, { width: "100%" }]}
        >
          <Text style={[styles.buttonText]}>Save Changes</Text>
        </Pressable>
        <Pressable
          onPress={() => setPopUpOpen(false)}
          style={[
            styles.button,
            styles.buttonOff,
            styles.buttonRound,
            { width: "100%", marginTop: 5 },
          ]}
        >
          <Text style={[styles.buttonText, styles.buttonOffText]}>Cancel</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

function DeleteChatPopUp({
  roomId,
  jwtToken,
  property,
  setPopUpOpen,
  refetchProperty,
}) {
  const [deleteChat] = useMutation(deleteChatRoom);

  const deleteChatOnPress = () => {
    console.log(property.id);
    deleteChat({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        propertyId: property.id,
        chatRoomId: roomId,
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
      <View style={[styles.popUpCard, { padding: 25, paddingVertical: 20 }]}>
        <Text style={[styles.textH3, { color: "#FC4445" }]}>Important!</Text>
        <Text
          style={{
            marginVertical: 15,
            color: "#000",
          }}
        >
          Delete chat function only deletes data locally and doesn't remove user from
          the chat room. If you want to be removed from the room, ask creator of the
          room to do so. Otherwise even after chat deletion, this chat room can
          appear on your device if some of the members sends message.
        </Text>

        <Pressable
          onPress={deleteChatOnPress}
          style={[styles.button, styles.buttonRound, { width: "100%" }]}
        >
          <Text style={[styles.buttonText]}>Delete Room</Text>
        </Pressable>
        <Pressable
          onPress={() => setPopUpOpen(false)}
          style={[
            styles.button,
            styles.buttonOff,
            styles.buttonRound,
            { width: "100%", marginTop: 5 },
          ]}
        >
          <Text style={[styles.buttonText, styles.buttonOffText]}>Cancel</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function EditChatRoom({
  navigation,
  route,
  userData,
  property,
  jwtToken,
  refetchProperty,
}) {
  const { roomId, title } = route.params;

  const [editMembersChatRoomOpen, setEditMembersChatRoomOpen] = useState(false);
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false);

  return (
    <>
      <View style={[styles.container, { padding: 30 }]}>
        <NavigationHeader
          goBack={() => navigation.navigate("Chat room", { roomId, title })}
          title={title}
        />
        <View style={{ flex: 1, marginTop: 5, padding: 15 }}>
          <Text style={[styles.textH3, { textAlign: "center" }]}>Members:</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
            }}
          >
            {property.residents
              .filter((user) =>
                property.chatRooms
                  .find((c) => c.id === roomId)
                  .users.includes(user.id)
              )
              .map((item) => {
                let residentIndex = property.residents.findIndex(
                  (resident) => resident.id === item.id
                );
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
                      marginVertical: 3,
                    }}
                    key={item.id}
                  >
                    <Text>
                      {item.firstName} {item.lastName}
                    </Text>
                    <View
                      style={[
                        propertyStyles["residentColor" + (residentIndex + 1)],
                        {
                          width: 30,
                          height: 30,
                          borderRadius: 50,
                        },
                      ]}
                    />
                  </View>
                );
              })}
          </ScrollView>
          <Pressable
            style={[styles.button]}
            onPress={() => setEditMembersChatRoomOpen(true)}
          >
            <Text style={[styles.buttonText]}>Edit members</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOff, { marginTop: 15 }]}
            onPress={() => setDeletePopUpOpen(true)}
          >
            <Text style={[styles.buttonText, styles.buttonOffText]}>
              Delete chat
            </Text>
          </Pressable>
        </View>
      </View>

      {deletePopUpOpen && (
        <DeleteChatPopUp
          jwtToken={jwtToken}
          property={property}
          setPopUpOpen={setEditMembersChatRoomOpen}
          refetchProperty={refetchProperty}
          roomId={roomId}
        />
      )}
      {editMembersChatRoomOpen && (
        <EditChatRoomMembersPopUp
          jwtToken={jwtToken}
          userData={userData}
          property={property}
          setPopUpOpen={setDeletePopUpOpen}
          refetchProperty={refetchProperty}
          roomId={roomId}
        />
      )}
    </>
  );
}
