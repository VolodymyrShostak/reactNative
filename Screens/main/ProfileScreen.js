import { View, Text, StyleSheet, ImageBackground, Image, TouchableWithoutFeedback} from "react-native";

import React from "react";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/background.jpg")}
        >
          <View style={styles.imageWrap}>
            <View style={styles.imageSpace}>
              <Image style={styles.imgUser} source={require("../../assets/imgUser.jpg")} />
              <Image
                style={styles.icon}
                source={require("../../assets/iconAddPhoto.png")}
              />
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.title}>Natali Romanova</Text>
            <View style={styles.img}></View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  img: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 54,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 15,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    color: "#212121",
    marginTop: 92,
    marginBottom: 32,
  },
  passwordWrap: {
    position: "relative",
  },
  show: {
    position: "absolute",
    right: 16,
    top: "20%",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  button: {
    backgroundColor: Platform.OS === "ios" ? "transparent" : "#FF6C00",
    borderRadius: 100,
    height: 54,
    marginBottom: 16,
    marginTop: 27,
  },
  btnTitle: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
    padding: 15,
  },
  wrapperCustom: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  imageWrap: {
    alignItems: "center",
    zIndex: 2,
  },
  imageSpace: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    transform: [{ translateY: 60 }],
  },
  imgUser: {
    borderRadius: 16,
  },
  icon: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  option: {
    textAlign: "right",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    transform: [{ translateY: -55 }],
    marginRight: 16,
  },
});

export default ProfileScreen;
