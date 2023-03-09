import { View, Image, StyleSheet, Text } from "react-native";

import React from "react";

const DefaultPostsScreen = ({route, navigation } ) => {
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
    fontWeight: 400,
  },
});
export default DefaultPostsScreen;
