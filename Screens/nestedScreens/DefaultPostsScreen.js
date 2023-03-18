import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity} from "react-native";

import React, { useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const DefaultPostsScreen = ({ route, navigation }) => {
  
  const[posts,setPosts] = useState([]);
  
  useEffect(() => {
    if (route.params) { setPosts(prevState => [...prevState, route.params]) }
    
  }, [route.params])

  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <View style={styles.imageSpace}>
          <Image
            style={styles.imgUser}
            source={require("../../assets/imgUser.jpg")}
          />
        </View>
        <View style={styles.textDataWrap}>
          <Text style={styles.textName}>Natali Romanova</Text>
          <Text style={styles.textEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        style={{ marginTop: 32 }}
        data={posts}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Image source={{ uri: item.photo }} style={{ height: 200 }} />
            <Text style={{ fontSize: 16, fontWeight: 500, marginTop: 8 }}>
              {item.state.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 11,
                lineHeight: 19,
                fontSize: 16,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={() => {
                  navigation.navigate("Коментарі",{id: item.id, photo: item.photo});
                }}
              >
                <Feather name="message-circle" size={18} color="#BDBDBD" />
                <Text
                  style={{
                    color: "#BDBDBD",
                    marginLeft: 9,
                  }}
                >
                  0
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={() => {
                  navigation.navigate("Мапа", {
                    location: item.location,
                  });
                }}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={18}
                  color="#BDBDBD"
                />
                <Text
                  style={{ textDecorationLine: "underline", marginLeft: 8 }}
                >
                  {item.state.locate}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

         </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    height: "100%",
  },
  userData: {
    flexDirection: "row",
    marginTop: 32,
    width: "100%",
  },
  imageSpace: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  imgUser: {
    borderRadius: 16,
  },
  textDataWrap: {
    marginLeft: 8,
    justifyContent: "center",
  },
  textName: {
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
    fontWeight: 700,
  },
  textEmail: {
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
});
export default DefaultPostsScreen;
