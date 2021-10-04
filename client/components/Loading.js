import { Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

import styles from "../styles/App.styles";

const Loading = ({ text }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const rotate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    rotate();
  }, []);

  return (
    <View style={styles.loadingView}>
      <Animated.View
        style={[
          styles.loadingIcon,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      ></Animated.View>
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

export default Loading;
