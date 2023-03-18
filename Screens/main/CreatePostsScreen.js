import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import React, { useState, useEffect} from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useSelector } from "react-redux";


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
  const [place, setPlace] = useState(null);
   const [hasPermission, setHasPermission] = useState(null);
  const [coords, setCoords] = useState(null);
  const { userId, nickname } = useSelector((state) => state.auth);


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
  
 useEffect(() => {
   (async () => {
     const { status } = await Camera.requestCameraPermissionsAsync();
     await MediaLibrary.requestPermissionsAsync();

     setHasPermission(status === "granted");
   })();
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
     setCoords(coords);
   })();
 }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const resetPhoto = () => {
    setPhoto("");
    setLocation("");
    setPlace("");
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const storage = getStorage();
      const pathReference = await ref(storage, `postImage/${uniquePostId}`);
      await uploadBytes(pathReference, file).then((photo) =>
        console.log("Uploaded a blob photo", photo)
      );
      const downloadedPhoto = await getDownloadURL(pathReference)
        .then((data) => data)
        .catch((error) => {
          console.log(error);
        });
      return downloadedPhoto;
    } catch (error) {
      console.error(error);
    }
  };

  const uploadPost = async () => {
    const db = getFirestore();
    try {
      const photo = await uploadPhotoToServer();
      if (!photo) return;
      await addDoc(collection(db, "posts"), {
        userId,
        nickname,
        photo,
        place,
        location,
        coords: coords,
        date: Date.now().toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const sendPost = () => {
    if (!photo) return;
    uploadPost();
    navigation.navigate("Публікації", { photo, location, state });
    resetPhoto();
  };

  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {!photo ? (
          <View
            style={{
              ...styles.imgWrap,
              display: isShowKeyboard ? "none" : "flex",
            }}
          >
            <Camera style={styles.camera} ref={setCamera}>
              <TouchableOpacity style={styles.iconWrap} onPress={takePhoto}>
                <MaterialIcons name="camera-alt" size={35} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>

            <Text style={styles.hintText}>Завантажити фото</Text>
          </View>
        ) : (
          <View
            style={{
              ...styles.imgWrap,
              display: isShowKeyboard ? "none" : "flex",
            }}
          >
            <ImageBackground
              source={{ uri: photo }}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={styles.iconWrap} onPress={resetPhoto}>
                <MaterialIcons name="camera-alt" size={35} color="#BDBDBD" />
              </TouchableOpacity>
            </ImageBackground>

            <Text style={styles.hintText}>Редагувати фото</Text>
          </View>
        )}

        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Назва"
            value={state.title}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            onBlur={() => {
              setIsShowKeyboard(false);
            }}
            onChangeText={(value) => setState({ ...state, title: value })}
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
            }}
            onBlur={() => {
              setIsShowKeyboard(false);
            }}
            onChangeText={(value) => setState({ ...state, locate: value })}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={sendPost}>
          <Text style={styles.btnTitle}>Опублікувати</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
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
