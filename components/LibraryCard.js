import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";

const LibraryCard = ({ image, title, rating, id, navigation, option }) => {
  //Removing movie from library
  const removeMovie = () => {
    db.collection("userMovies")
      .doc(auth.currentUser.email)
      .collection("movies")
      .doc(id)
      .delete();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.infoDiv}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>IMDB {rating}</Text>
        {option ? (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.moreBtn}
            onPress={removeMovie}
          >
            <Ionicons name="md-remove-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.85} style={styles.moreBtn}>
            <Feather name="more-vertical" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LibraryCard;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    marginRight: 13,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 5,
  },
  image: {
    height: 120,
    width: 95,
    resizeMode: "cover",
    borderRadius: 2,
  },

  infoDiv: {
    width: "70%",
    height: "100%",
    paddingVertical: 2,
    paddingHorizontal: 10,
  },

  title: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    marginVertical: 10,
    width: "90%",
  },

  rating: {
    color: "rgba(255,255,255,0.8)",
  },

  moreBtn: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
});
