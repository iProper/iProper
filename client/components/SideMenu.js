import styles from "../styles/App.styles";
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Pressable, Image } from "react-native";
import { useQuery } from "@apollo/client";
import { getOwnerProperties } from "../queries/queries";
import { ScrollView } from "react-native-gesture-handler";

function SideMenu(props) {
  let { loading, error, data } = useQuery(getOwnerProperties, {
    context: {
      headers: {
        Authorization: "Bearer " + props.jwtToken,
      },
    },
  });

  return (
    <DrawerContentScrollView
      style={[styles.container, styles.sideMenuDrawer]}
      {...props}
    >
      <View style={[styles.container, styles.sideMenu]}>
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
              props.navigation.navigate("MainStack");
            }}
          />
        </View>
        <Text
          style={[
            styles.textH3,
            styles.sideMenuItem,
            { textAlign: "center", paddingTop: 20, paddingBottom: 10 },
          ]}
        >
          Properties
        </Text>
        <ScrollView>
          {(() => {
            if (data?.getProperties) {
              return data.getProperties.map((prop, index) => {
                return (
                  <View style={styles.sideMenuItem} key={index}>
                    <DrawerItem
                      label={prop.address1}
                      labelStyle={{ fontSize: 15 }}
                      onPress={() => {
                        props.navigation.navigate("PropertyTabs", {
                          id: prop.id
                        })
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
    </DrawerContentScrollView>
  );
}

export default SideMenu;