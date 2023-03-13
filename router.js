import React, { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DefaultPostsScreen from "./Screens/nestedScreens/DefaultPostsScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";

import CreatePostsScreen from "./Screens/main/CreatePostsScreen";
import RegisrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";


const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();


export const useRoute = (isAuth) => {
  

  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Registration"
          component={RegisrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarItemStyle: { borderRadius: 20, width: 70, height: 40 },
        tabBarStyle: {
          paddingTop: 9,
          justifyContent: "center",
          paddingLeft: 82,
          paddingRight: 82,
          paddingBottom: 32,
          height: 83,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={DefaultPostsScreen}
        options={{
          title: "Публікації",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: 500,
            color: "#212121",
          },
          headerStyle: {
            borderBottomWidth: 0.3,
            borderBottomColor: "#B3B3B3",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <Ionicons name="exit-outline" size={30} color="black" />
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="grid" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleStyle: {
            fontSize: 17,
            fontWeight: 500,
            color: "#212121",
          },
          headerStyle: {
            borderBottomWidth: 0.3,
            borderBottomColor: "#B3B3B3",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Профіль",
          headerShown: false,

          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
