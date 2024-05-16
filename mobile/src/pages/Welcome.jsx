import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";

function Welcome() {
  return (
    <LinearGradient
      colors={["#0E1C25", "#2E5958"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Welcome</Text>
      </SafeAreaView>
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Footer />
      </View>
    </LinearGradient>
  );
}

export default Welcome;
