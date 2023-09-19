import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

const Lab08 = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },
  
    onPanResponderMove: (evt, gestureState) => {
      const touches = evt.nativeEvent.touches;
      if (touches.length >= 2) {

        Animated.spring(scale, {
          toValue:3,
          friction: 3,
          useNativeDriver: false,

        }).start();

      }
      else{
        Animated.event(
          [
            null,
            {
              dx: pan.x, // x,y are Animated.Value
              dy: pan.y,
            },
          ],
          { useNativeDriver: false }
        )(evt,gestureState);
      }
    },
    onPanResponderRelease: () => {

          Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: false,
          }).start();
      pan.flattenOffset();
    },

    // 
  });

  const panResponder2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });

  
  return (
    <View  style={styles.container}>
       <Animated.Image
       {...panResponder.panHandlers}
      style={ [pan.getLayout(),styles.it_logo, { transform: [{ scale: scale }] }] }
      source={require("../assets/IT_Logo.png")}
      />

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#61dafb",
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  it_logo:{
    width: 80, height: 80, resizeMode: "stretch",
}
});

export default Lab08;
