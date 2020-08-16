import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import ListRestaurants from "../../component/Restaurants/ListRestaurants";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
  //console.log(props);
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitRestaurants = 5;

  //console.log(restaurants);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userinfo) => {
      setUser(userinfo);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      db.collection("restaurants")
        .get()
        .then((snap) => {
          setTotalRestaurants(snap.size);
        });
      const resultRestaurants = [];
      db.collection("restaurants")
        .orderBy("createAt", "desc")
        .limit(limitRestaurants)
        .get()
        .then((response) => {
          setStartRestaurants(response.docs[response.docs.length - 1]);
          response.forEach((doc) => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            resultRestaurants.push(restaurant);
          });
          setRestaurants(resultRestaurants);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);

    db.collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartRestaurants(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        });
        setRestaurants([...restaurants, ...resultRestaurants]);
      });
  };
  return (
    <View style={styles.viewBody}>
      <ListRestaurants
        restaurants={restaurants}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
        navigation={navigation}
      />
      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-restaurant")}
        ></Icon>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
