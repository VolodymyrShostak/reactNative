import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import React from "react";

const MapScreen = ({route}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude: route.params.longitude,
          latitude: route.params.latitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{ longitude: 23.9004518, latitude: 49.9038454 }} />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MapScreen;
