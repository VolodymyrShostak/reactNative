import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import React, { useState, useEffect} from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

const initialState = {
  title: "",
  locate: "",
};

const CreatePostsScreen = ({navigation}) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    
    setState(initialState);
  };
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();

    setPhoto(photo.uri);
    setLocation(location);
  };
  const sendPhoto = async () => {
   
    navigation.navigate("DefaultScreen", { photo, location, state });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);
  

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.imgWrap}>
          <Camera style={styles.camera} ref={setCamera}>
            {photo && (
              <View style={styles.image}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 130, width: 130 }}
                />
              </View>
            )}
            <TouchableOpacity style={styles.iconWrap} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={35} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>

          <Text style={styles.hintText}>Завантажте фото</Text>

          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
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
              onChangeText={(value) => setState({ ...state, title: value})}
            />
          </View>
          <View style={styles.inputWrap}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <TextInput
              style={styles.inputIcon}
              placeholder="Місцевість"
              value={state.locate}
              onFocus={() => {
                setIsShowKeyboard(true);
                // setFocus((focus) => ({ ...focus, password: true }));
              }}
              onBlur={() => {
                setIsShowKeyboard(false);
                // setFocus((focus) => ({ ...focus, password: false }));
              }}
              onChangeText={(value) => setState({ ...state, locate: value })}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={sendPhoto}>
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
  camera: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  hintText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
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
    flexDirection: "row",
    width: "100%",
    height: 50,

    alignItems: "center",
    marginTop: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputIcon: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 8,
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
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    padding: 15,
  },
});
export default CreatePostsScreen;
