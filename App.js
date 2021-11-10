import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import LibraryScreen from "./screens/LibraryScreen";
import MovieScreen from "./screens/MovieScreen";
import SearchScreen from "./screens/SearchScreen";
import RegisterScreen from "./screens/RegisterScreen";

//Creating stack for the screens
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          initialParams={{ transition: "fade" }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ animation: "slide_from_right" }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ animation: "slide_from_right" }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ animation: "slide_from_right" }}
          name="Library"
          component={LibraryScreen}
        />
        <Stack.Screen
          options={{ animation: "slide_from_right" }}
          name="Movie"
          component={MovieScreen}
        />
        <Stack.Screen
          options={{ animation: "slide_from_right" }}
          name="Search"
          component={SearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
