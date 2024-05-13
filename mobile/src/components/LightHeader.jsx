import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Rules from "./Rules";

function LightHeader() {
  const [showRulesPopup, setShowRulesPopup] = useState(false);
  const toggleRulesPopup = () => {
    setShowRulesPopup(!showRulesPopup);
  };
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../../media/logo.png")}
        style={styles.lightLogo}
      />
      <TouchableOpacity style={styles.rulesButton} onPress={toggleRulesPopup}>
        <Image
          source={require("../../media/rules_icon.png")}
          style={styles.iconRules}
        />
      </TouchableOpacity>
      {showRulesPopup && (
        <Rules
          showPopup={showRulesPopup}
          closePopup={() => setShowRulesPopup(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    height: 200,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    position: "relative",
    zIndex: 0,
  },
  lightLogo: {
    width: 135,
    height: 135,
    marginTop: 30,
    alignSelf: "center",
  },
  rulesButton: {
    position: "absolute",
    right: 20,
    backgroundColor: "transparent",
    borderWidth: 0,
    height: 100,
    fontSize: 16,
  },
  txtButton: {},
  iconRules: {
    color: "#3498db",
    fontSize: 18,
    marginRight: 10,
  },
  rulesPopup: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.747)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    borderWidth: 0,
    fontSize: 20,
    color: "#fff",
    cursor: "pointer",
  },
  hidden: {
    display: "none",
  },
});

export default LightHeader;
