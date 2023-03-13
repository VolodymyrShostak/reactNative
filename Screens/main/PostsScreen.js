import {} from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import CommentScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NestedStack = createNativeStackNavigator();

const PostsScreen = ({ navigation }) => {
  return(
  <NestedStack.Navigator>
    <NestedStack.Screen name="DefaultScreen" component={DefaultPostsScreen} />
    <NestedStack.Screen name="CommentsScreen" component={CommentScreen} />
    <NestedStack.Screen name="MapScreen" component={MapScreen} />
    </NestedStack.Navigator>
  ) 
};

export default PostsScreen;
