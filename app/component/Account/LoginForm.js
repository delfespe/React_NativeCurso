import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";

import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onsubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else if (size(formData.password) < 6) {
      toastRef.current.show(
        "La contraseña tiene que tener por lo menos 6 caracteres"
      );
    } else {
      console.log("ok");
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          toastRef.current.show("Contraseña correcta");
          setLoading(false);
          navigation.navigate("account");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toastRef.current.show("Error al iniciar sesion");
        });
    }
  };
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
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
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onsubmit}
      />
      <Loading isVisible={loading} text="Iniciando sesion" />
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
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
