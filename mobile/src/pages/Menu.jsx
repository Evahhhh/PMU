import React from "react";
import { SafeAreaView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function Menu() {
  return (
    <LinearGradient
      colors={["#0E1C25", "#2E5958"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <Text>Menu</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Menu;
