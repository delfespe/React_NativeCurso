import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function RegisterForm() {
  const [showPassword, setshowPassword] = useState(false);
  const [showRepeatPassword, setshowRepeatPassword] = useState(false);

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        style={styles.inputForm}
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
        password={true}
        secureTextEntry={showPassword ? false : true}
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
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
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
      >
        Registrate
      </Button>
    </View>
  );
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
