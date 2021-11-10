import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MovieCard from "../components/MovieCard";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function HomeScreen({ navigation }) {
  const API_KEY = /* your API KEY*/;

  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setTopRated] = useState([]);
  const [banner, setBanner] = useState([]);
  const [modal, setModal] = useState(false);
  const [state, setState] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  const getUpcomingData = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setUpcoming(data.results);
        setBanner(
          data.results[Math.floor(Math.random() * data.results.length - 1)]
        );
      });
  };

  const getNowplayingData = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTopRated(data.results);
      });
  };

  const getPopularData = async () => {
    await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setPopular(data.results);
      });
  };

  useEffect(() => {
    getUpcomingData();
    getNowplayingData();
    getPopularData();

    return;
  }, []);

  //console.log(upcoming);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Movie", { item })}>
      <MovieCard
        image={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
        title={item.original_title}
        id={item.id}
      />
    </TouchableOpacity>
  );

  const logout = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };

  // console.log(upcoming);
  if (!fontsLoaded) return <AppLoading />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <ImageBackground
          style={styles.banner}
          resizeMode="cover"
          source={{
            uri: `http://image.tmdb.org/t/p/w500/${
              banner.backdrop_path
                ? banner.backdrop_path
                : require("../assets/netflix.png")
            }`,
          }}
        >
          <LinearGradient
            style={styles.headerBg}
            colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.9)"]}
          >
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

            <View style={styles.bannerInfo}>
              <Text style={styles.title}>{banner.original_title}</Text>
              <Text
                style={styles.overview}
                numberOfLines={2}
                ellipsizeMode="head"
              >
                {banner.overview}
              </Text>

              <View>
                <TouchableOpacity style={styles.playBtn}>
                  <Entypo name="controller-play" size={24} color="white" />
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                  >
                    Play
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={{ marginLeft: 15, marginBottom: 30 }}>
          <View>
            <Text style={styles.movieText}>Upcoming</Text>
            <FlatList
              horizontal
              style={styles.upcoming}
              data={upcoming}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          <View>
            <Text style={styles.movieText}>Top rated</Text>
            <FlatList
              horizontal
              style={styles.upcoming}
              data={toprated}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          <View>
            <Text style={styles.movieText}>Popular</Text>
            <FlatList
              horizontal
              style={styles.upcoming}
              data={popular}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search", upcoming)}
          style={styles.searchIcon}
          activeOpacity={0.5}
        >
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Library")}
          style={styles.searchIcon}
          activeOpacity={0.5}
        >
          <Ionicons name="library-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setState(true)} activeOpacity={0.5}>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Modal animationType={"fade"} transparent={true} visible={state}>
        <View style={styles.modal}>
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_500Medium",
              fontSize: 30,
            }}
          >
            Are you sure?
          </Text>
          <View
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Pressable onPress={() => setState(false)} style={styles.cancelBtn}>
              <Text style={{ color: "white", fontSize: 18 }}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.logoutBtn} onPress={logout}>
              <Text style={{ color: "white", fontSize: 18 }}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {state ? (
        <BlurView
          intensity={120}
          tint="dark"
          style={styles.blurContainer}
        ></BlurView>
      ) : (
        !state
      )}

      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBg: {
    height: 280,
    width: "100%",
  },
  banner: {
    width: "100%",
    height: 280,
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
    color: "#cecece",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    marginTop: 3,
    width: 290,
  },
  bannerInfo: {
    position: "absolute",
    bottom: 40,
    left: 15,
  },
  movieText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 4,
    marginTop: 4,
    fontWeight: "700",
  },
  playBtn: {
    backgroundColor: "#fc4343",
    width: 80,
    height: 30,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 2,
    elevation: 5,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "black",
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modal: {
    height: 200,
    width: 300,
    backgroundColor: "rgba(0,0,0,1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -100 }],
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },

  logoutBtn: {
    width: 100,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6484f",
    borderRadius: 4,
  },

  cancelBtn: {
    width: 100,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  blurContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});
