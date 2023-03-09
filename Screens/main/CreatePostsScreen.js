import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const initialState = {
  title: "",
  locate: "",
};

const CreatePostsScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.imgWrap}>
          <View style={styles.img}>
            <View style={styles.iconWrap}>
              <MaterialIcons name="camera-alt" size={35} color="#BDBDBD" />
            </View>
          </View>

          <Text style={styles.hintText}>Завантажте фото</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={{
                ...styles.input,
              }}
              placeholder="Назва"
              value={state.title}
              onFocus={() => {
                setIsShowKeyboard(true);
                // setFocus((focus) => ({ ...focus, password: true }));
              }}
              onBlur={() => {
                setIsShowKeyboard(false);
                // setFocus((focus) => ({ ...focus, password: false }));
              }}
              onChangeText={(text) => setState({ ...state, title: text })}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={{
                ...styles.input,
              }}
              placeholder="Місцевість"
              value={state.title}
              onFocus={() => {
                setIsShowKeyboard(true);
                // setFocus((focus) => ({ ...focus, password: true }));
              }}
              onBlur={() => {
                setIsShowKeyboard(false);
                // setFocus((focus) => ({ ...focus, password: false }));
              }}
              onChangeText={(text) => setState({ ...state, title: text })}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.btnTitle}>Опублікувати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,

    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
    height: "100%",
  },
  imgWrap: {
    width: "100%",
    height: 267,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  hintText: {
    fontSize: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
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
  iconWrap: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",
  },
  inputWrap: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    marginTop: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  button: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    height: 54,
    justifyContent: "center",
    marginTop: 32,
  },
  btnTitle: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    padding: 16,
  },
});
export default CreatePostsScreen;
