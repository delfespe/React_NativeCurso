import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";

export default function AccountOptions(props) {
  const { userInfo, toastRef } = props;
  const menuOptions = generateOptions();
  console.log(JSON.stringify(toastRef));
  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} title={menu.title} />
      ))}
    </View>
  );
}

function generateOptions() {
  return [
    {
      title: "Cambiar nombre y apellidos",
    },
    {
      title: "Cambiar email",
    },
    {
      title: "Cambiar contraseña",
    },
  ];
}

const styles = StyleSheet.create({});
