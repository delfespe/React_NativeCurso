import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { isEmpty } from "lodash";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailForm(props) {
  const { email, setShowModal, toastRef, setReloadUserInfo } = props;
  const [formData, setFormData] = useState(defaultFormValue);
  const [showPassword, setshowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setErrors({});
    if (isEmpty(formData.email) || formData.email === email) {
      setErrors({ email: "El correo no ha cambiado" });
    } else if (!validateEmail(formData.email)) {
      setErrors({ email: "El correo no es correcto" });
    } else if (isEmpty(formData.password)) {
      setErrors({ password: "La contraseña no puede ser vacio" });
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then((response) => {
          updateEmail();
        })
        .catch(() => {
          setIsLoading(false);
          setErrors({ password: "La contraseña no es correcta" });
        });
    }
  };
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const updateEmail = () => {
    firebase
      .auth()
      .currentUser.updateEmail(formData.email)
      .then(() => {
        setReloadUserInfo(true);
        toastRef.current.show("Email actualizado correctamente");
        setIsLoading(false);
        setShowModal(false);
      })
      .catch(() => {
        setIsLoading(false);
        setErrors({ email: "Error al actualizar el email" });
      });
  };

  return (
    <View style={styles.view}>
      <Input
        placeHolder="Correo electronico"
        containerStyle={styles.input}
        defaultValue={email ? email : ""}
        onChange={(e) => onChange(e, "email")}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        errorMessage={errors.email}
      />
      <Input
        placeHolder="Contraseña"
        containerStyle={styles.input}
        password="true"
        secureTextEntry={!showPassword}
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
      <Button
        title="Cambiar correo"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}
function defaultFormValue() {
  return {
    email: "",
    password: "",
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
});
