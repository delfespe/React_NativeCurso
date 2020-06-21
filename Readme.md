## Git

alias.lg=log --oneline --decorate --all --graph
alias.s=status -s -b

## Prerequisitos

https://yarnpkg.com/

## React Navegation: stack, tab

Instaladar dependencia react-natigation
Ir a https://reactnavigation.org/docs/getting-started
Revisar en seccion: Installation

Ejecutar:
yarn add @react-navigation/native@~5.1.5
expo install react-native-gesture-handler@~1.6.0
expo install react-native-reanimated@~1.7.0
expo install react-native-screens@~2.2.0
expo install react-native-safe-area-context@~0.7.3
expo install @react-native-community/masked-view@~0.1.6

Instalar react-navigation stack:
yarn add @react-navigation/stack@~5.2.10

Instalar react-navigation tab:
yarn add @react-navigation/bottom-tabs@~5.2.6

## React Native Elements: iconos

yarn add react-native-elements@~1.2.7

web iconos:
https://materialdesignicon.com

## Firebase; prueba

yarn add firebase@~7.9.0

## Componente loading y Screen no logueado

## Screen login y registro

// desde la componente UserGuest.js navegar al screen loginscr creado en AccountStack
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();

          onPress={() => navigation.navigate("loginscr")}

// AccountStack.js
<Stack.Screen
name="loginscr"
component={Login}
options={{ title: "Iniciar sesión" }}
/>
