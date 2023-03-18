import {} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign, Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";

const NestedStack = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="Публікації"
        component={DefaultPostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ right: 16 }} onPress={signOut}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            color: "#212121",
            fontSize: 17,
          },
          headerStyle: {
            borderBottomWidth: 0.3,
            borderBottomColor: "#B3B3B3",
          },
        }}
      />
      <NestedStack.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
      
          tabBarStyle: { display: "none" },

          headerLeft: () => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.arrow}
                onPress={() => navigation.navigate("Публікації")}
              >
                <AntDesign name="arrowleft" size={24} color="#212121" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <NestedStack.Screen
        name="Мапа"
        component={MapScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: "Roboto-Medium",
            color: "#212121",
          },
        }}
      />
    </NestedStack.Navigator>
  ); 
};
const styles = StyleSheet.create({
 
  arrow: {
    marginLeft: 20,
  },
});
export default PostsScreen;
