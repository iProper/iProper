import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useQuery } from "@apollo/client";

// Custom components
import OwnerStack from "./OwnerStack";
import { PropertyTabs } from "./PropertyTabs";
import SideMenu from "./SideMenu";
import Loading from "./small/Loading";

// Styles
import styles from "../styles/App.styles";

// Queries
import { currentUser } from "../queries/queries";

const Drawer = createDrawerNavigator();

const LoggedInStack = ({ jwtToken, setJwtToken }) => {
  let { loading, error, data, refetch } = useQuery(currentUser, {
    context: {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    refetch();
  }, [jwtToken]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Something went wrong...</Text>
      </View>
    );
  }

  return loading || data == null ? (
    <Loading text={"Loading..."} style={{flex: 1}}/>
  ) : (
    <Drawer.Navigator
      drawerContent={(props) => (
        <SideMenu
          {...props}
          userData={data.currentUser}
          jwtToken={jwtToken}
          setJwtToken={(jwtToken) => {
            setJwtToken(jwtToken);
          }}
        />
      )}
      screenOptions={{ headerShown: false, headerTitle: "" }}
    >
      {data.currentUser.isOwner && (
        <Drawer.Screen name='Main Stack'>
          {(props) => (
            <OwnerStack
              {...props}
              jwtToken={jwtToken}
              currentUser={data.currentUser}
            />
          )}
        </Drawer.Screen>
      )}
      <Drawer.Screen name='PropertyTabs'>
        {(props) => (
          <PropertyTabs
            {...props}
            userData={data.currentUser}
            jwtToken={jwtToken}
            refetchUser={refetch}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default LoggedInStack;
