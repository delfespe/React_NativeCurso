import React from "react";
import { Text, View, Button } from "react-native";
import * as firebase from "firebase";

export default function Userlogged() {
  return (
    <View>
      <Text>Userlogged...</Text>
      <Button title="Cerrar sesion" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
