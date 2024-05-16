import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, Image } from "react-native";
import Rules from "./Rules";
import styles from "../styles/lightHeader";

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

export default LightHeader;
