import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
 
  const { photo, id } = route.params;
  const [isShownKeybord, setIsShownKeybord] = useState(false);
  const isFocused = useIsFocused();

 

  const { userId, login, avatar } = useSelector((state) => state.auth);

  const addComment = async () => {
    Keyboard.dismiss();
    if (comment.trim().length === 0) {
      onKeyboradHide();
      return;
    }
    try {
      const date = new Date().toLocaleString();
      await addDoc(collection(db, "posts", `${id}`, "comments"), {
        comment,
        // login,
        userId,
        date,
        avatar,
      });
      await updateDoc(doc(db, "posts", `${id}`), {
        comments: increment(1),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setComment("");
  };

  const getAllComments = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", `${id}`, "comments")
    );
    let allComments = [];
    querySnapshot.forEach((doc) => {
      allComments.push({ ...doc.data(), id: doc.id });
    });
    setComments(allComments);
  };

  useEffect(() => {
    if (!route.params) {
      return;
    }
    getAllComments();
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            marginVertical: 32,
          }}
        >
          <Image
            source={{ uri: photo }}
            style={{
              height: 240,
              borderRadius: 8,
            }}
          />
        </View>

        <View
          style={{
            height: isShownKeybord ? 40 : 280,
          }}
        >
          <FlatList
            style={{ marginBottom: 10 }}
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  ...styles.commentBox,
                  flexDirection: item.userId === userId ? "row-reverse" : "row",
                }}
                onStartShouldSetResponder={() => true}
              >
                <View
                  style={{
                    ...styles.comment,
                  }}
                >
                  <Text style={styles.text}>{item?.comment}</Text>
                  <Text style={styles.textDate}>{item?.date}</Text>
                </View>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.avatar}
                ></Image>
              </View>
            )} >
          </FlatList>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Додати коментар..."
            placeholderTextColor="#BDBDBD"
            onChangeText={setComment}
            value={comment}
            onFocus={() => setIsShownKeybord(true)}
            onBlur={() => setIsShownKeybord(false)}

          />
          <TouchableOpacity style={styles.button} onPress={addComment}>
            <AntDesign name="arrowup" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  inputWrapper: {
    width: "100%",
    
  },
  input: {
    width: "100%",
    height: 50,
    padding: 15,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 20,
    color: "#212121",
  },

  button: {
    position: "absolute",
    right: 10,
    top: 10,
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  commentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    minHeight: 30,
  },
  comment: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    width: "85%",
    minHeight: 69,
    padding: 16,
  },
  avatar: {
    height: 28,
    width: 28,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 28,
  },
  text: {
    color: "#212121",
    padding: 6,
  },
  textDate: {
    textAlign: "right",
    color: "#BDBDBD",
    fontSize: 11,
    paddingRight: 6,
  },
});

export default CommentsScreen;
