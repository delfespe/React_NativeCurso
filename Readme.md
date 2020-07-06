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

## Formulario Login

// navegacion:
Account -> UserGuest -> Login (toast)
------------------------------> LoginForm
------------------------------> Register (toast)
----------------------------------------> RegisterForm
---------> UserLogged (toast)
---------------------> InfoUser

## Login contra firebase

//En LoginForm.js
const onsubmit = () => {
...
firebase
.auth()
.signInWithEmailAndPassword(formData.email, formData.password)

## Estructura panel usuario, obtener datos desde firebase y mostrarlo

//En UserLogged.js obtener los datos del usuario asincronamente
useEffect(() => {
(async () => {
const user = await firebase.auth().currentUser;
setUserInfo(user);
})();
}, []);

//En InfoUser.js mostrar datos
export default function InfoUser(props) {
const {
userInfo: { photoURL, displayName, email },
} = props;

...
<Avatar
source={
photoURL
? { uri: photoURL }
: require("../../../assets/avatar-default.jpg")
}
/>
<Text style={styles.displayName}>
{displayName ? displayName : "Anonimo"}
</Text>
<Text>{email ? email : "Social Login"}</Text>

## Subir imagen a firebase, instalar paquetes acceso a mobil

// permite pedir los permisos al usuario de los recursos del mobile
https://docs.expo.io/versions/latest/sdk/permissions/
//buscar el paquete expo-permissions en yarn
yarn add expo-permissions@~8.1.0
// permite acceder a la galeria del mobile
https://docs.expo.io/versions/latest/sdk/imagepicker/
yarn add expo-image-picker@~8.1.0

// Permiso para que Expo(emulador) pueda accedea a la Galeria:en app.json adicionar
"android": {
"permissions": ["CAMERA_ROLL"]
}

// obtener permiso Galeria de imagenes: en InfoUser.js
export default function InfoUser(props) {
...
const changeAvatar = async () => {
const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
const resultPermisssionCamera = resultPermission.permissions.cameraRoll.status;
if (resultPermisssionCamera === "denied") {
toastRef.current.show("Es necesario aceptar los permisos en la galeria");
} else {
const result = await imagePicker.launchImageLibraryAsync({
allowsEditing: true,
aspect: [4, 3],
});
}
if (result.cancelled) {
toastRef.current.show("Has cerrado la seleccion de imagenes");
} else {
uploaddImage(result.uri)
.then(() => {
toastRef.current.show("Imagen de avatar subida");
})
.catch(() => {
toastRef.current.show("Error al actualizar avatar");
});
}
}
};

// Para que la App pueda acceder a la Galeria de Android ver permisos en:
https://docs.expo.io/versions/latest/sdk/permissions/#android-permissions-equivalents-inside-appjson

// Adicionaer en : app.json
"android": {
"permissions": [
"CAMERA_ROLL",
"READ_EXTERNAL_STORAGE",
"WRITE_EXTERNAL_STORAGE"
]
}

// No mostrar warning en el mobile
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);

## Lista opciones cuenta usuario, modal al seleccionar item

// en AccountOptions.js:
...
const [renderComponent, setRenderComponent] = useState(null);
const selectComponent = (key) => {
switch (key) {
case "displayName":
setRenderComponent(<Text>Cambiando nombres...</Text>);
setshowModal(true);
break;
...
};

const menuOptions = generateOptions(selectComponent);
return (
<View>
{map(menuOptions, (menu, index) => (
<ListItem key={index} title={menu.title} 
onPress={menu.onPress}/>
))}
{renderComponent && (
<Modal isVisible={showModal} setVisible={setshowModal}>
{renderComponent}
</Modal>
)}
</View>
...
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
