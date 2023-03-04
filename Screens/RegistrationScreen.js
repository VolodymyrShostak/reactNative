import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function RegistrationScreen() {
  return (
    <View>
      <View style={styles.imageWrap}>
        <View style={styles.imageSpace}>
          <Image
            style={styles.icon}
            source={require("../assets/iconAddPhoto.png")}
          />
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Реєстрація</Text>
        <TextInput style={styles.input} placeholder="Логін" />
        <TextInput
          style={styles.input}
          placeholder="Адреса електронної пошти"
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry={true}
          />
          {/* <Text style={styles.option}>Показати</Text> */}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnTitle}>Зареєструватись</Text>
        </TouchableOpacity>
        <View style={styles.wrapperCustom}>
          <Text style={styles.text}>Вже маєте акаунт?</Text>
          <Text style={styles.text}> Увійти</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 54,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 15,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    // zIndex: 1,
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
  },
  title: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginTop: 92,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 54,
    marginBottom: 16,
    marginTop: 27,
  },
  btnTitle: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
    padding: 16,
  },
  wrapperCustom: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 29,
  },
  text: {
    textAlign: "center",
    fontWeight: 400,
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
  icon: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  option: {
    textAlign: "right",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    transform: [{ translateY: -55 }],
    marginRight: 16,
  },
});
