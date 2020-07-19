import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import Loading from "../../component/Loading";
import Carousel from "../../component/Carousel";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);

  navigation.setOptions({ title: name });

  useEffect(() => {
    db.collection("restaurants")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setRestaurant(data);
      });
  }, []);

  if (!restaurant) {
    return <Loading isVisible={true} text="Cargando restaurante" />;
  } else {
    return (
      <ScrollView style={styles.viewBody}>
        <Carousel
          arrayImages={restaurant.images}
          height={200}
          width={screenWidth}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
