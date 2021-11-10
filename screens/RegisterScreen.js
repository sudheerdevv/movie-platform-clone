import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  //Accessing permissions for storage
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  //Picking the image from the storage
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 10],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  //Registering
  const register = () => {
    if (password == confirmPass) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: name,
            photoURL: image,
          });
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Both passwords doesn't match");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Image
          style={{
            height: 80,
            width: 90,
            marginLeft: 10,
            resizeMode: "contain",
          }}
          source={require("../assets/netflix.png")}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }}
      >
        <KeyboardAvoidingView style={styles.form} behavior="padding">
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Image
              style={{ height: 100, width: 100, borderRadius: 100 }}
              source={{ uri: image }}
            />
            <AntDesign
              style={{
                zIndex: 3,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: -11 }, { translateY: -10 }],
              }}
              name="addfile"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
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
          <TextInput
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setConfirmPass(text)}
            secureTextEntry
            textContentType="password"
          />
          <TouchableOpacity style={styles.registerBtn} onPress={register}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
              Register
            </Text>
          </TouchableOpacity>

          <Text style={{ color: "white", fontSize: 15 }}>Need help?</Text>

          <StatusBar style="inverted" />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.9)",
  },

  header: {
    position: "absolute",
    top: 15,
    left: 20,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 100,
    alignItems: "center",
    zIndex: 2,
  },

  heroText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
    fontSize: 25,
    textAlign: "center",
  },

  form: {
    height: 540,
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
    marginBottom: 10,
    color: "#fff",
  },

  registerBtn: {
    borderRadius: 5,
    height: 45,
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
    borderColor: "rgba(255,255,255,0.6)",
    borderStyle: "solid",
    borderWidth: 1.5,
  },

  imagePicker: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});
