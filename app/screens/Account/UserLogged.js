import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { Button } from "react-native-elements";
import Loading from "../../component/Loading";
import Toast from "react-native-easy-toast";
import InforUser from "../Account/InfoUser.js";
import InfoUser from "../Account/InfoUser.js";

export default function Userlogged() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setloadingText] = useState("Hola");
  const [userInfo, setUserInfo] = useState(null);
  const toastRef = useRef();
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
  }, []);

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && <InfoUser userInfo={userInfo} />}
      <Text>AccountOptions...</Text>
      <Button
        title="Cerrar sesion"
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.btnCloseSesionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSesion: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingBottom: 10,
    paddingTop: 10,
  },
  btnCloseSesionText: {
    color: "#00a680",
  },
});
