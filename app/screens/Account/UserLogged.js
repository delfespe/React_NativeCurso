import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { Button } from "react-native-elements";
import Loading from "../../component/Loading";
import Toast from "react-native-easy-toast";
import InfoUser from "../../component/Account/InfoUser";
import AccountOptions from "../../component/Account/AccountOptions";

export default function Userlogged() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Hola");
  const [userInfo, setUserInfo] = useState(null);
  const [reloadUserInfo, setReloadUserInfo] = useState(false);

  const toastRef = useRef();
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setReloadUserInfo(false);
  }, [reloadUserInfo]);

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && (
        <InfoUser
          userInfo={userInfo}
          toastRef={toastRef}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
          setReloadUserInfo={setReloadUserInfo}
        />
      )}
      <AccountOptions
        userInfo={userInfo}
        toastRef={toastRef}
        setReloadUserInfo={setReloadUserInfo}
      />
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
