import styles from "../styles/App.styles";
import React, { useEffect } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Pressable, Image } from "react-native";
import { useQuery } from "@apollo/client";
import { getOwnerProperties } from "../queries/queries";
import { ScrollView } from "react-native-gesture-handler";

import { CommonActions } from "@react-navigation/native";

function SideMenu(props) {
  let { loading, error, data, refetch } = useQuery(getOwnerProperties, {
    context: {
      headers: {
        Authorization: "Bearer " + props.jwtToken,
      },
    },
  });

  useEffect(() => {
    props.navigation.dispatch(CommonActions.navigate({
      name: props.userData.isOwner ? 'Main Stack' : 'Home',
    }));
  }, [props.userData]);

  useEffect(() => {
    refetch();
  }, [props.jwtToken, props.userData]);

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
        height: "50%",
      }}
      {...props}
    >
      <View>
        <View style={[styles.sideMenuHeaderArea]}>
          <View style={styles.sideMenuHeader}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.sideMenuLogo}
              resizeMode='center'
            />
            <View
              style={[styles.separator, styles.separatorRed, styles.separator60]}
            />
            <Text style={styles.sideMenuWelcomeMessage}>
              Welcome, {props.userData.firstName}
            </Text>
          </View>
        </View>
        <View style={styles.sideMenuMain}>
          <View style={[styles.sideMenuItem]}>
            <DrawerItem
              label={"Home"}
              labelStyle={{ fontSize: 20 }}
              onPress={() => {
                props.userData.isOwner
                  ? props.navigation.navigate("Main Stack")
                  : props.navigation.navigate("Home");
              }}
            />
          </View>
          {props.userData.isOwner && (
            <Text
              style={[
                styles.textH3,
                styles.sideMenuItem,
                { textAlign: "center", paddingTop: 20, paddingBottom: 10 },
              ]}
            >
              Properties
            </Text>
          )}
          <ScrollView>
            {(() => {
              if (props.userData.isOwner && data?.getProperties) {
                return data.getProperties.map((prop, index) => {
                  return (
                    <View style={styles.sideMenuItem} key={index}>
                      <DrawerItem
                        label={prop.address1}
                        labelStyle={{ fontSize: 15 }}
                        onPress={() => {
                          props.navigation.navigate("PropertyTabs", {
                            id: prop.propertyCode,
                          });
                        }}
                      />
                    </View>
                  );
                });
              } else {
                return <View />;
              }
            })()}
          </ScrollView>
        </View>
      </View>
      <View style={styles.sideMenuBottomArea}>
        <Pressable
          onPress={() => {
            props.setJwtToken(null);
          }}
          style={styles.sideMenuBottomItem}
        >
          <Text style={[styles.textH2, { color: "#97CAEF" }]}>Logout</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

export default SideMenu;
