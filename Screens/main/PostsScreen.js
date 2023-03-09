import { } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

import DefaultPostsScreen from '../nestedScreens/HomeScreen';
import CommentScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';



const NestedStack = createStackNavigator();

const PostsScreen = () => { 
  <NestedStack.Navigator>
    <NestedStack.Screen name="DefaultScreen" component={DefaultPostsScreen} />
    <NestedStack.Screen name="Comments" component={CommentScreen} />
    <NestedStack.Screen name="Map" component={MapScreen} />
  </NestedStack.Navigator>;

}

export default PostsScreen;