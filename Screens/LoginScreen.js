import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";

const initialState = {
  email: "",
  password: "",
  
  };


export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [hidePass, setHidePass] = useState(true);
  const [focus, setFocus] = useState({
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...styles.form,
            paddingBottom: isShowKeyboard ? 390 : 94,
          }}
        >
          <Text style={styles.title}>Ввійти</Text>

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
            <Text style={styles.btnTitle}>Ввійти</Text>
          </TouchableOpacity>
          <View style={styles.wrapperCustom}>
            <Text style={styles.text}>Немає акаунта?</Text>
            <Text style={styles.text}> Зареєструватись</Text>
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
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 15,
    fontFamily: "Roboto",
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
    marginTop: 32,
    marginBottom: 33,
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
  },
  text: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
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
