import React, { useState, useRef } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../component/Loading";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddReviewRestaurant(props) {
  const { navigation, route } = props;
  const { idRestaurant } = route.params;
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  const addReview = () => {
    //console.log("rating", rating);
    //console.log("title", title);
    //console.log("review", review);
    if (!rating) {
      toastRef.current.show("No has dado ninguna puntuacion");
    } else if (!title) {
      toastRef.current.show("El titulo es obligatorio");
    } else if (!review) {
      toastRef.current.show("El comentario es obligatorio");
    } else {
      //console.log("ok");
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const payload = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idRestaurant: idRestaurant,
        title: title,
        review: review,
        rating: rating,
        createAt: new Date(),
      };
      //console.log(payload);
      db.collection("reviews")
        .add(payload)
        .then(() => {
          toastRef.current.show("Se guardó el comentario");
          updateRestaurant();
        })
        .catch(() => {
          toastRef.current.show("Error al enviar el comentario");
          setIsLoading(false);
        });
    }
  };

  const updateRestaurant = () => {
    const restaurantRef = db.collection("restaurants").doc(idRestaurant);
    restaurantRef.get().then((response) => {
      const restaurantData = response.data();
      const ratingTotal = restaurantData.ratingTotal + rating;
      const quantityVoting = restaurantData.quantityVoting + 1;
      const ratingResult = ratingTotal / quantityVoting;
      restaurantRef
        .update({
          rating: ratingResult,
          ratingTotal: ratingTotal,
          quantityVoting: quantityVoting,
        })
        .then(() => {
          setIsLoading(false);
          navigation.goBack();
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    });
  };

  return (
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={["Pesimo", "Deficiente", "Normal", "Muy Bueno", "Excelente"]}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => {
            setRating(value);
          }}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Titulo"
          containerStyle={styles.input}
          onChange={(e) => {
            setTitle(e.nativeEvent.text);
          }}
        />
        <Input
          placeholder="Comentario..."
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => {
            setReview(e.nativeEvent.text);
          }}
        />
        <Button
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          title="Enviar comentario"
          onPress={addReview}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Enviando comentario" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2",
  },
  formReview: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
