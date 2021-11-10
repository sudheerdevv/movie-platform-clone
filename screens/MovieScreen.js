import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { ToastAndroid } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const MovieScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const { item } = route.params;

  //Adding movies to database(library)
  const addToLibrary = () => {
    //Firestore database
    db.collection("userMovies")
      .doc(auth.currentUser.email)
      .collection("movies")
      .add({
        id: item.id,
        original_title: item.original_title,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        vote_average: item.vote_average,
        release_date: item.release_date,
      })
      .catch((err) => alert(err.message));

    //Toast message
    ToastAndroid.showWithGravity(
      "Added to library.",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.banner}
        resizeMode="cover"
        source={{
          uri: `http://image.tmdb.org/t/p/w500/${item?.backdrop_path}`,
        }}
      >
        <LinearGradient
          style={styles.headerBg}
          colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 40, left: 15 }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Image
            style={{
              height: 80,
              width: 90,
              resizeMode: "contain",
              position: "absolute",
              top: 10,
              right: 15,
            }}
            source={require("../assets/netflix.png")}
          />
        </LinearGradient>
      </ImageBackground>

      <View style={styles.headerInfo}>
        <Text style={styles.title}>{item.original_title}</Text>

        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_500Medium",
            marginTop: 10,
            opacity: 0.7,
          }}
        >
          {`IMDB ${item?.vote_average}`}, {item?.release_date.substr(0, 4)}
        </Text>
        <View style={styles.actionContainer}>
          <View style={styles.actionDiv}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="play" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.actionCap}>Play</Text>
          </View>
          <View style={styles.actionDiv}>
            <TouchableOpacity style={styles.actionBtn} onPress={addToLibrary}>
              <Ionicons name="add" size={27} color="white" />
            </TouchableOpacity>
            <Text style={styles.actionCap}>Add to library</Text>
          </View>
          <View style={styles.actionDiv}>
            <TouchableOpacity style={styles.actionBtn}>
              <Feather name="download" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.actionCap}>Download</Text>
          </View>
          <View style={styles.actionDiv}>
            <TouchableOpacity style={styles.actionBtn}>
              <Entypo name="share" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.actionCap}>Share</Text>
          </View>
        </View>
        <Text style={styles.overview} numberOfLines={4} ellipsizeMode="head">
          {item.overview}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
  },
  headerBg: {
    height: 280,
    width: "100%",
  },

  banner: {
    width: "100%",
    height: 280,
    position: "absolute",
    top: 0,
  },

  headerInfo: {
    height: 200,
    marginTop: 40,
    marginHorizontal: 20,
  },

  upcoming: {
    height: 220,
    marginTop: 5,
  },

  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  overview: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    marginTop: 25,
    width: 340,
  },

  movieText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "700",
  },
  playBtn: {
    backgroundColor: "#fc4343",
    width: "90%",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 19,
    borderRadius: 2,
    elevation: 5,
  },

  actionContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
  },

  actionDiv: {
    display: "flex",
    alignItems: "center",
  },

  actionBtn: {
    height: 50,
    width: 50,
    borderRadius: 50,
    // backgroundColor: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(131,139,249,0.3)",
    borderWidth: 2,
    borderStyle: "solid",
  },

  actionCap: {
    fontSize: 12,
    marginTop: 5,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Poppins_500Medium",
  },
});
