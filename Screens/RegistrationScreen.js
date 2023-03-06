import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [hidePass, setHidePass] = useState(true);
  const [focus, setFocus] = useState({
    login: false,
    email: false,
    password: false,
  });

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...styles.form,
            paddingBottom: isShowKeyboard ? 70 : 29,
          }}
        >
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: focus.login ? "#FF6C00" : "#E8E8E8",
            }}
            placeholder="Логін"
            value={state.login}
            onFocus={() => {
              setIsShowKeyboard(true);
              setFocus((focus) => ({ ...focus, login: true }));
            }}
            onBlur={() => {
              setIsShowKeyboard(false);
              setFocus((focus) => ({ ...focus, login: false }));
            }}
            onChangeText={(text) => setState({ ...state, login: text })}
          />
          <TextInput
            style={{
              ...styles.input,
              borderColor: focus.email ? "#FF6C00" : "#E8E8E8",
            }}
            placeholder="Адреса електронної пошти"
            value={state.email}
            onFocus={() => {
              setIsShowKeyboard(true);
              setFocus((focus) => ({ ...focus, email: true }));
            }}
            onBlur={() => {
              setIsShowKeyboard(false);
              setFocus((focus) => ({ ...focus, email: false }));
            }}
            onChangeText={(text) => setState({ ...state, email: text })}
          />
          <View style={styles.passwordWrap}>
            <TextInput
              style={{
                ...styles.input,
                borderColor: focus.password ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Пароль"
              secureTextEntry={hidePass ? true : false}
              value={state.password}
              onFocus={() => {
                setIsShowKeyboard(true);
                setFocus((focus) => ({ ...focus, password: true }));
              }}
              onBlur={() => {
                setIsShowKeyboard(false);
                setFocus((focus) => ({ ...focus, password: false }));
              }}
              onChangeText={(text) => setState({ ...state, password: text })}
            />
            <Text style={styles.show} onPress={() => setHidePass(!hidePass)}>
              {!hidePass ? "Hide" : "Show"}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={keyboardHide}>
            <Text style={styles.btnTitle}>Зареєструватись</Text>
          </TouchableOpacity>

          <View style={styles.wrapperCustom}>
            <Text style={styles.text}>Вже маєте акаунт?</Text>
            <Text style={styles.text}> Увійти</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
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
    fontWeight: 500,
    fontSize: 30,
    fontFamily: "Roboto-Bold",
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
    top: "25%",
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
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
    padding: 16,
  },
  wrapperCustom: {
    flexDirection: "row",
    justifyContent: "center",
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
