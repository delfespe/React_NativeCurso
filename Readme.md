## Git

alias.lg=log --oneline --decorate --all --graph
alias.s=status -s -b

## Prerequisitos

https://yarnpkg.com/

## Crear proyecto

expo init 5-tenedores
cd 5-tenedores
yarn start

Publicar proyecto en Expo
expo login
yarn start
Ir a la web 5-tenedored, seleccionar > Publish or republish project
darle > Publish
Ir a la web expo con nuestra cuenta: https://expo.io/@delfin
ir a proyectos, seleccionar > options > make public to everyone

Abrir en emulador proyecto publicado en expo con version diferente a la de desarrollo
Abrir app expo
Seleccionar profile
En proyectos, seleccionar 5 tenedores

## Sistema de navegacion

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

## React Navegation: stack, tab

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

## Crear el formulario de Registro de usuarios

### Evitar que el teclado oculte el input

// instalar react-native-keyboard-aware-scroll-view
yarn add react-native-keyboard-aware-scroll-view@~0.9.1

// funciona en orden jerarquico, en Register.js
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//reemplezar <View> por <KeyboardAwareScrollView>
// con el KeyboardAwareScrollView ya se puede usar los estilos en RegisterForm.js formContainer
const styles = StyleSheet.create({
formContainer: {
flex: 1,
alignItems: "center",
justifyContent: "center",
marginTop: 30,
},

### Ocultar/Mostrar password presionando icono y usando estados

// RegisterForm.js
const [showPassword, setshowPassword] = useState(false);
<Input
secureTextEntry={showPassword ? false : true}
rightIcon={
<Icon
type="material-community"
name={showPassword ? "eye-off" : "eye-outline"}
iconStyle={styles.iconRight}
onPress={() => setshowPassword(!showPassword)}
/>

## Guardar datos del formulario: mensajes validacion con Toast

// instalar libreria js que maneja funciones de arreglos, strings: https://lodash.com/ https://yarnpkg.com/package/lodash
yarn add lodash

// instalar libreria para mostrar mensajes: https://yarnpkg.com/package/react-native-easy-toast
yarn add react-native-easy-toast

// en Register.js
import React, { useRef } from "react";
...
import Toast from "react-native-easy-toast";
...
<RegisterForm toastRef={toastRef} />
...
<Toast ref={toastRef} position="center" opacity={0.9}></Toast>

## Registrar usuario en Firebase: loading y navegar

// configurar Firebase, ir a: https://console.firebase.google.com/u/0/project/tenedores-60e31/authentication/users?hl=es
// seleccionar: Signin method
// Seleccionar inicion de sesion: Correo electronico y contraseña
// seleccionar: Habilitar y Guardar

// en RegisterForm.js
const onSubmit = () => {
...
} else {
//console.log("ok");
firebase
.auth()
.createUserWithEmailAndPassword(formData.email, formData.password)
.then((response) => {
//console.log(response);
navigation.navigate("account");
})

// probar creando usuario: despejod@gmail.com
// para que funcione el loading en web
yarn add modal-react-native-web
