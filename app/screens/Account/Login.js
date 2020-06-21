import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <Text>Login FORM</Text>
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <Text>Social Login</Text>
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aun no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Registrate
      </Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginLeft: 40,
    marginLeft: 40,
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
  textRegister: {
    width: "100%",
    height: 10,
    marginTop: 20,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
});
