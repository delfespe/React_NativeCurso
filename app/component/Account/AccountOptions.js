import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";

export default function AccountOptions(props) {
  const { userInfo, toastRef, setReloadUserInfo } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const selectComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "email":
        setRenderComponent(<Text>Cambiando email...</Text>);
        setShowModal(true);
        break;
      case "password":
        setRenderComponent(<Text>Cambiando password...</Text>);
        setShowModal(true);
        break;
      default:
        setRenderComponent(null);
        setShowModal(false);
        break;
    }
  };
  const menuOptions = generateOptions(selectComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        />
      ))}
      {renderComponent && (
        <Modal
          isVisible={showModal}
          setVisible={setShowModal}
          children={renderComponent}
        ></Modal>
      )}
    </View>
  );
}

function generateOptions(selectComponent) {
  return [
    {
      title: "Cambiar nombre y apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectComponent("displayName"),
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectComponent("password"),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
