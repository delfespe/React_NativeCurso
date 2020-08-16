import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, ScrollView, View, Text, Dimensions } from "react-native";
import Loading from "../../component/Loading";
import Carousel from "../../component/Carousel";
import ListReviews from "../../component/Restaurants/ListReviews";
import Map from "../../component/Map";
import { map, size } from "lodash";

import { Rating, ListItem } from "react-native-elements";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(0);

  navigation.setOptions({ title: name });

  useFocusEffect(
    useCallback(() => {
      db.collection("restaurants")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setRestaurant(data);
          setRating(data.rating);
        });
    }, [])
  );

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
        <TitleRestaurant
          name={restaurant.name}
          description={restaurant.description}
          rating={restaurant.rating}
        />
        <RestautrantInfo
          location={restaurant.location}
          name={restaurant.name}
          address={restaurant.address}
          phone={restaurant.phone}
          email={restaurant.email}
        ></RestautrantInfo>
        <ListReviews
          navigation={navigation}
          idRestaurant={restaurant.id}
          setRating={setRating}
        ></ListReviews>
      </ScrollView>
    );
  }
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

function RestautrantInfo(props) {
  const { location, name, address, phone, email } = props;
  const listInfo = [
    {
      text: address,
      iconType: "material-community",
      iconName: "map-marker",
      action: null,
    },
    {
      text: phone,
      iconType: "material-community",
      iconName: "phone",
      action: null,
    },
    {
      text: email,
      iconType: "material-community",
      iconName: "at",
      action: null,
    },
  ];

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>
        Informacion sobre el restaurante
      </Text>
      <Map height={100} name={name} location={location} />
      {map(listInfo, (item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#00a680",
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewRestaurantTitle: {
    padding: 15,
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25,
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
});
