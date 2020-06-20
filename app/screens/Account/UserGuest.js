import React from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  Button,
} from "react-native";

export default function UserGuest() {
  return (
    <ScrollView centerContent="true" style={styles.viewBody}>
      <Image
        style={styles.image}
        source={require("../../../assets/user-guest.jpg")}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        Como describirias tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de forma sencilla, voto cual te ha gustado mas y comenta
        como ha sido tu experienca.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          title="Ver tu perfil"
          buttonSyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => console.log("Click!!")}
        ></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  btnStyle: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    width: "70%",
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
});
