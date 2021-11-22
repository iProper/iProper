import { Text, View, Animated, Image } from "react-native";
import React, { useEffect, useRef } from "react";

import styles from "../../styles/App.styles";

const Loading = ({ text, style = {} }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  const animation = useRef(
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
    )
  );
  useEffect(() => {
    animation.current.start();
    return () => animation.current.stop();
  }, []);

  return (
    <View style={[styles.loadingView, style]}>
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
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../../assets/loading.png")}
          resizeMode={"center"}
        />
      </Animated.View>
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

export default Loading;
