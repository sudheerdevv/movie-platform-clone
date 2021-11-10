import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    try {
      if (email) {
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
          alert(error.message);
        });
      } else {
        alert("Email must be filled");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 80,
          width: 90,
          resizeMode: "contain",
          position: "absolute",
          top: 15,
          left: 25,
        }}
        source={require("../assets/netflix.png")}
      />
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          textContentType="password"
        />
        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
            Login
          </Text>
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 15 }}>Need help?</Text>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.signupBtn}
        >
          <Text
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 18,
              fontFamily: "Poppins_500Medium",
            }}
          >
            New to Clone? Sign up now.
          </Text>
        </Pressable>

        <StatusBar style="inverted" />
      </KeyboardAvoidingView>
      <Text
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.6)",
          fontFamily: "Poppins_500Medium",
          fontSize: 12,
          position: "absolute",
          bottom: 30,
          width: "80%",
        }}
      >
        Sign in is protected by Google reCAPTCHA to ensure you're not a bot.
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },

  form: {
    height: 340,
    width: "92%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 7,
  },
  input: {
    fontFamily: "Poppins_500Medium",
    height: 55,
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    color: "#fff",
  },

  loginBtn: {
    borderRadius: 5,
    height: 45,
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderColor: "rgba(255,255,255,0.6)",
    borderStyle: "solid",
    borderWidth: 1.5,
  },

  signupBtn: {
    marginTop: 15,
  },
});
