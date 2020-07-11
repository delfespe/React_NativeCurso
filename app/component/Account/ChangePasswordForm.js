import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { isEmpty, size } from "lodash";
import { reauthenticate } from "../../utils/api";
import * as firebase from "firebase";

export default function ChangePasswordForm(props) {
  const { setShowModal, toastRef } = props;
  const [formData, setFormData] = useState(defaultFormValue);
  const [showPassword, setshowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = () => {
    setErrors({});
    if (isEmpty(formData.password)) {
      setErrors({ password: "La contraseña no puede ser vacia" });
    } else if (isEmpty(formData.newPassword)) {
      setErrors({ newPasswordpassword: "La contraseña no puede ser vacia" });
    } else if (isEmpty(formData.repeatNewPassword)) {
      setErrors({ repeatNewPassword: "La contraseña no puede ser vacia" });
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      setErrors({ newPassword: "Las contraseñas no son iguales" });
      setErrors({ repeatNewPassword: "Las contraseñas no son iguales" });
    } else if (size(formData.newPassword) < 6) {
      setErrors({
        newPassword: "Las contraseñas tiene que ser mayor a 5 caracteres",
      });
      setErrors({
        repeatNewPassword: "Las contraseñas tiene que ser mayor a 5 caracteres",
      });
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then((response) => {
          firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              setIsLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch(() => {
              setErrors({ other: "Error al actualizar la contraseña" });
            });
        })
        .catch(() => {
          setIsLoading(false);
          setErrors({ password: "La contraseña no es correcta" });
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeHolder="Contraseña actual"
        containerStyle={styles.input}
        password="true"
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          ></Icon>
        }
        errorMessage={errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        style={styles.input}
        password="true"
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "newPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir nueva contraseña"
        style={styles.input}
        password="true"
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "repeatNewPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
        errorMessage={errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
      <Text>{errors.other}</Text>
    </View>
  );
}

function defaultFormValue() {
  return {
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  };
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
  iconRight: {
    color: "#c1c1c1",
  },
});
