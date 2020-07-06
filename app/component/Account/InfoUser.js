import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
    setLoading,
    setLoadingText,
    setReloadUserInfo,
  } = props;
  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermisssionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermisssionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos en la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show("Has cerrado la seleccion de imagenes");
      } else {
        uploaddImage(result.uri)
          .then(() => {
            console.log("imagen subida");
            updatePhotoUrl();
            setReloadUserInfo(true);
            setLoading(false);
            toastRef.current.show("Imagen de avatar subida");
          })
          .catch(() => {
            setLoading(false);
            toastRef.current.show("Error al actualizar avatar");
          });
      }
    }
  };
  const uploaddImage = async (uri) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };
  const updatePhotoUrl = () => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = { photoURL: response };
        await firebase.auth().currentUser.updateProfile(update);
        console.log(photoURL);
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.avatarUserInfo}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/avatar-default.jpg")
        }
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  avatarUserInfo: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
