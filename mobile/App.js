import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Components
import Header from "./src/components/Header";
import LightHeader from "./src/components/LightHeader";
import Footer from "./src/components/Footer";

//Pages
import Welcome from "./src/pages/Welcome";
import ResetPassword from "./src/pages/ResetPassword";
import Menu from "./src/pages/Menu";
import CreationParty from "./src/pages/CreationParty";
import JoinParty from "./src/pages/JoinParty";
import Room from "./src/pages/Room";
import Party from "./src/pages/Party";
import Results from "./src/pages/Results";

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getIdToken = async () => {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");

      if (id && token) {
        setIsLoggedIn(true);
      }
    };

    getIdToken();
  }, []);

  const handleLogin = async (id, token) => {
    await AsyncStorage.setItem("id", id);
    await AsyncStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ header: () => <LightHeader />, headerShown: true }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ header: () => <LightHeader />, headerShown: true }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ header: () => <Header />, headerShown: true }}
        />
        <Stack.Screen
          name="CreationParty"
          component={CreationParty}
          options={{ header: () => <Header />, headerShown: true }}
        />
        <Stack.Screen
          name="JoinParty"
          component={JoinParty}
          options={{ header: () => <Header />, headerShown: true }}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{ header: () => <Header />, headerShown: true }}
        />
        <Stack.Screen
          name="Party"
          component={Party}
          options={{ header: () => <Header />, headerShown: true }}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{ header: () => <Header />, headerShown: true }}
        />
      </Stack.Navigator>
      <Footer
        name="Footer"
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        options={{ headerShown: false }}
      />
    </NavigationContainer>
  );
}

export default App;
