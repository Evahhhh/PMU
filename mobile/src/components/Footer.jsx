import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/footer";

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

export default Footer;
