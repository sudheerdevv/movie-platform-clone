import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MovieCard from "../components/MovieCard";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = ({ navigation, route }) => {
  const [string, setString] = useState("");
  const [displayInfo, setDisplayInfo] = useState([]);
  const movies = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  //Flatlist rendering item
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Movie", { item })}>
      <MovieCard
        title={item.original_title}
        image={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
        id={item.id}
      />
    </TouchableOpacity>
  );

  //Search function
  const search = () => {
    const filteredInfo = movies.filter((uinfo) => {
      return uinfo.original_title.toLowerCase().includes(string);
    });
    //Setting filtered list into an array
    setDisplayInfo(filteredInfo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="ios-arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          onChangeText={(text) => {
            setString(text.toLowerCase());
            search();
          }}
          style={{
            width: "90%",
            height: 45,
            padding: 10,

            color: "white",
            backgroundColor: "rgba(255,255,255,0.4)",
            borderRadius: 10,
          }}
          placeholder="Search..."
          placeholderTextColor="rgba(255,255,255,1)"
        />
      </View>
      <View style={{ flex: 1, width: "90%" }}>
        <FlatList
          numColumns={3}
          style={styles.upcoming}
          data={displayInfo}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  upcoming: {
    height: 220,
    marginTop: 5,
  },
  header: {
    width: "100%",
    height: 60,
    paddingHorizontal: 15,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
