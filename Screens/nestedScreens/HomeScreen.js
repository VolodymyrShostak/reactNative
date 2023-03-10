import { View, Image, StyleSheet, Text, FlatList, Button} from "react-native";

import React, {useEffect, useState} from "react";

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
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Image source={{ uri: item.photo }} style={{ height: 200 }} />
          </View>
        )}
      />

      <Button
        title="GO TO MAP"
        onPress={() => navigation.navigate("Map")}
      ></Button>
      <Button
        title="GO TO COMMENTS"
        onPress={() => navigation.navigate("Comments")}
      ></Button>
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
