import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import LibraryCard from "../components/LibraryCard";

const LibraryScreen = ({ navigation, route }) => {
  const [movies, setMovies] = useState([]);
  const [option, setOption] = useState(false);

  useEffect(() => {
    const unsubscribe = db
      .collection("userMovies")
      .doc(auth.currentUser.email)
      .collection("movies")
      .orderBy("original_title", "asc")
      .onSnapshot((snapshot) => {
        setMovies(
          snapshot.docs.map((item) => ({ id: item.id, item: item.data() }))
        );
      });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="ios-arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.profileName}>{auth.currentUser.displayName}</Text>
          <Image
            style={styles.profileImage}
            source={{
              uri: auth.currentUser.photoURL,
            }}
          />
        </View>
      </View>
      <Text style={styles.heroText}>Your library</Text>
      <TouchableWithoutFeedback onPress={() => setOption(true)}>
        <ScrollView
          style={{
            flex: 1,
            width: "90%",
            marginTop: 12,
            marginBottom: 10,
          }}
        >
          {movies.map(({ id, item }) => {
            return (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  setOption(false);
                  navigation.navigate("Movie", { item });
                }}
                onLongPress={() => {
                  Vibration.vibrate(20);
                  setOption(true);
                }}
              >
                <LibraryCard
                  title={item.original_title}
                  image={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  id={id}
                  rating={item.vote_average}
                  option={option}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </TouchableWithoutFeedback>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.9)",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 60,
    paddingHorizontal: 15,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroText: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Poppins_500Medium",
    fontSize: 35,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 20,
  },

  profileName: {
    marginLeft: 8,
    color: "white",
    fontFamily: "Poppins_500Medium",
    fontSize: 19,
  },
});
