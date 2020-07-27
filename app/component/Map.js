import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";

export default function Map(props) {
  const { height, name, location } = props;
  const openAppMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };
  return (
    <MapView
      style={{ height: height, width: "100%" }}
      initialRegion={location}
      onPress={openAppMap}
    >
      <MapView.Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        draggable
      />
    </MapView>
  );
}
