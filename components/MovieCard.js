import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const MovieCard = ({ image, title, overview, rating, id, navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text
        style={{ color: "#fff", fontSize: 11, fontFamily: "Poppins_500Medium" }}
      >
        {title}
      </Text>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 100,
    marginRight: 13,
    display: "flex",
    marginTop: 20,
    justifyContent: "space-between",
  },
  image: {
    height: 120,
    width: 95,
    resizeMode: "cover",
    borderRadius: 2,
  },
});
