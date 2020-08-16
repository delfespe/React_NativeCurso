import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListReviews(props) {
  const { navigation, idRestaurant, setRating } = props;
  const [userLogged, setUserLogged] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  return (
    <View>
      {userLogged ? (
        <Button
          title="Escribe una opinion"
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnTitleReview}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          onPress={() => {
            navigation.navigate("add-review-restaurant", {
              idRestaurant: idRestaurant,
            });
          }}
        />
      ) : (
        <View>
          <Text
            style={{ textAlign: "center", color: "#00a680" }}
            onPress={() => {
              navigation.navigate("loginscr");
            }}
          >
            Para escribir un comentario es necesario estar logueado{" "}
            <Text style={{ fontWeight: "bold" }}>
              Pulsa AQUI para iniciar sesión
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  btnTitleReview: {
    color: "#00a680",
  },
});
