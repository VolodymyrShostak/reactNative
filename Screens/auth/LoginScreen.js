import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,

} from "react-native";


import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
const initialState = {
  email: "",
  password: "",
  
  };


export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [hidePass, setHidePass] = useState(true);
  const [isReady, setIsReady] = useState(false);
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

  const [fontsLoaded] = useFonts({
    "Roboto-400": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-500": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/background.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 390 : 94,
              }}
              onLayout={onLayoutRootView}
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
                  onChangeText={(text) =>
                    setState({ ...state, password: text })
                  }
                />
                <Text
                  style={styles.show}
                  onPress={() => setHidePass(!hidePass)}
                >
                  {!hidePass ? "Сховати" : "Показати"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Main")}
              >
                <Text style={styles.btnTitle}>Ввійти</Text>
              </TouchableOpacity>
              <View style={styles.wrapperCustom}>
                <Text style={styles.text}>Немає акаунта?</Text>
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate("Registration")}
                >
                  {" "}
                  Зареєструватись
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  input: {
    height: 54,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    padding: 15,
    fontFamily: "Roboto-400",
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
    fontFamily: "Roboto-500",
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
