import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, toastRef, setReloadUserInfo } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);
    if (isEmpty(newDisplayName)) {
      setError("El nombre no puede estar vacio");
    } else if (displayName === newDisplayName) {
      setError("El nombre no puede ser igual al actual");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadUserInfo(true);
          setShowModal(false);
        })
        .catch(() => {
          setIsLoading(false);
          setError("Error al actualizar el nombre.");
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeHolder="Nombre y Apellidos"
        containerStyle={styles.input}
        defaultValue={displayName ? displayName : ""}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
