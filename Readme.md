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

## Firebase 7.14

yarn add firebase@~7.9.0

// ./app/utils/firabase.js
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC2uInZSGC0wcQxWLcf3SO50agnfNGkQVE",
    authDomain: "tenedores-60e31.firebaseapp.com",
    databaseURL: "https://tenedores-60e31.firebaseio.com",
    projectId: "tenedores-60e31",
    storageBucket: "tenedores-60e31.appspot.com",
    messagingSenderId: "716914455653",
    appId: "1:716914455653:web:88ff256a454f4a2e83828c"
  };

export  const firabaseApp = firebase.initializeApp(firebaseConfig);

// app.js
…
import React, { useEffect} from "react";
import { firebaseApp } from "./app/utils/firebase";
import \* as firebase from "firebase";

export default function App() {

useEffect( () => {
firebase.auth().onAuthStateChange( (user) => {
console.log(user);
} );
}, [] )

return <Navigation />;
}

//====== comit -m "Añadir proyecto Firebase: probar"

// ./app/Account/UserGuest.js
