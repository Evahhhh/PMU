import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function Footer({ isLoggedIn, onLogout }) {
  const navigation = useNavigation();

  const handleLogout = () => {
    onLogout();
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView>
      <View style={styles.footer}>
        <View style={styles.divFooter}>
          <Text style={styles.autors}>Auteurs: Lisa, Hugo, Eve-Anne</Text>
          {isLoggedIn && (
            <TouchableOpacity onPress={handleLogout}>
              <Image
                source={require("../../media/logout_icon.png")}
                style={styles.logoutIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#1C3635",
    height: 60,
    justifyContent: "center",
    fontSize: 16,
  },
  autors: {
    color: "#F5FFFC",
    marginLeft: 15,
  },
  divFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "center",
  },
  logoutIcon: {
    borderRadius: 0,
    marginRight: 15,
  },
});

export default Footer;
