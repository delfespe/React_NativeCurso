import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [showRepeatPassword, setshowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());

  const onSubmit = () => {
    //console.log(formData);
    //console.log(validateEmail(formData.email));
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      //console.log("Todos los campos son obligatorios.");
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      //console.log("El email no es correcto.");
      toastRef.current.show("El email no es correcto");
    } else if (formData.password != formData.repeatPassword) {
      //console.log("Las contraseñas tienen que ser iguales.");
      toastRef.current.show("Las contraseñas tienen que ser iguales");
    } else if (size(formData.password) < 6) {
      //console.log("La contraseña tiene que tener por lo menos 6 caracteres");
      toastRef.current.show(
        "La contraseña tiene que tener por lo menos 6 caracteres"
      );
    } else {
      console.log("ok");
    }
  };
  const onChange = (e, type) => {
    //console.log(e.nativeEvent.text);
    //setFormData({ [type]: e.nativeEvent.text });
    // ...formData devuelve el valor y no el objeto
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
        style={styles.inputForm}
        password="true"
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        style={styles.inputForm}
        password="true"
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      >
        Registrate
      </Button>
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
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
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
