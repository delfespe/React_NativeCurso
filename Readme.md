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

## Cambiar nombre form en modal, input con mensaje error, button con loading

// en ChangeDisplayNameForm.js
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);

const onSubmit = () => {
...
} else {
setIsLoading(true);
const update = {
displayName: newDisplayName,
};
firebase
.auth()
.currentUser.updateProfile(update)
.then(() => {
setIsLoading(false);
setReloadUserInfo(true);
setShowModal(false);
})
...
<Input
...
errorMessage={error}
/>
<Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
/>

## Cambiar correo form en modal, reautenticacion y actualizar email en firebase

// en Api.js
export function reauthenticate(password) {
const user = firebase.auth().currentUser;
const credentials = firebase.auth.EmailAuthProvider.credential(
user.email,
password
);
return user.reauthenticateWithCredential(credentials);
}

// en ChangeEmailForm.js
const updateEmail = () => {
firebase
.auth()
.currentUser.updateEmail(formData.email)
.then(() => {
setReloadUserInfo(true);
toastRef.current.show("Email actualizado correctamente");
setIsLoading(false);
setShowModal(false);
})
.catch(() => {
setIsLoading(false);
setErrors({ email: "Error al actualizar el email" });
});
};

## Cambiar contraseña form modal y actualizar en firebase

// en ChangePasswordForm.js
...
} else {
setIsLoading(true);
reauthenticate(formData.password)
.then((response) => {
firebase
.auth()
.currentUser.updatePassword(formData.newPassword)
.then(() => {
setIsLoading(false);
setShowModal(false);
firebase.auth().signOut();
})
.catch(() => {
setErrors({ other: "Error al actualizar la contraseña" });
});
})

## Restaurantes, subir imagenes a la galeria, mostrar mapa google

//subir imagenes a firebase storage
const uploadImagesStorage = async () => {
const imageBlob = [];
await Promise.all(
map(imagesSelected, async (image) => {
const response = await fetch(image);
const blob = await response.blob();
const ref = firebase.storage().ref("restaurants").child(uuid());
await ref.put(blob).then(async (result) => {
await firebase
.storage()
.ref(`restaurants/${result.metadata.name}`)
.getDownloadURL()
.then((photoUrl) => {
imageBlob.push(photoUrl);
});
});
})
);
return imageBlob;
};

// crear registro en firebase base de datos
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
...
uploadImagesStorage().then((response) => {
//console.log(response);
db.collection("restaurants")
.add({
name: formData.name,
address: formData.address,
description: formData.description,
location: locationRestaurant,
images: response,
rating: 0,
ratingTotal: 0,
quantityVoting: 0,
createAt: new Date(),
createBy: firebase.auth().currentUser.uid,
})
.then(() => {
setIsLoading(false);
navigation.navigate("home");
})
.catch(() => {
setIsLoading(false);
toastRef.current.show("Error al subir restaurante");
});
});
}
};

// obtener ancho de la pantalla
import { Dimensions } from "react-native";
const widthScreen = Dimensions.get("window").width;

// funcion Alert
const removeImage = (image) => {
Alert.alert(
"Eliminar imagen",
"Estas seguro que quieres eliminar la imagen?",
[
{ text: "Cancel", style: "cancel" },
{
text: "Eliminar",
onPress: () => {
const test = filter(
imagesSelected,
(imageUrl) => imageUrl !== image
);
setImagesSelected(test);
},},]);};

// recorrer un arreglo con map (lodash)
<View style={styles.viewImages}>
{map(imagesSelected, (imageRestaurant, index) => (
<Avatar
key={index}
containerStyle={styles.miniatureStyles}
source={{ uri: imageRestaurant }}
onPress={() => removeImage(imageRestaurant)}
/>
))}
</View>

// isntalar reactive map: visor de mapas
yarn add react-native-maps@~0.26.1

// instalar expo location: lee informacion de geolocalizacion desde el celular
yarn add expo-location@~8.1.0

// en android para que funcione el mapa requiere configuracion: añadir sdk de google maps

// peticiones asincronas para await, anonima () y autoejecutable ()
(async () => {}) ()

// añadir permisos para que expor use la ubicacion
"android": {
"permissions": [
...
"LOCATION",
]
// añadir permisos para que ANDROID use la ubicacion
"android": {
"permissions": [
...
"ACCESS_COARSE_LOCATION",
"ACCESS_FINE_LOCATION",
]

// instalar libreria que genera numero unico que se usara para guardar las imagenes en firebase
yarn add random-uuid-v4@~0.0.9

// crear base de datos en firebase:

1. Seleccionar > Database > Crear base de datos > click
2. Seleccionar > empezar modo produccion > siguiente
3. Seleccionar > listo
4. Seleccionar > reglas > cambiar:
   allow read, write: if false;
   por:
   allow read, write: if true;
5. Seleccionar > publicar

// guardando en firestore

// corregir error: [Unhandled promise rejection: ReferenceError: Can't find variable: atob]
// instalae base-64
yarn add base-64@~0.1.0
// en App.js
import {decode, encode} from "base-64"
if(!global.btoa) global.btoa=encode;
if(!global.atob) global.btoa=decode;

// compilar aplicacion
// en app.json:
"android": {
"package": "com.delfin.cincotenedores",

expo build:android

// transferir archivo apk al mobile instalar en el celu la app: sweech - wifi file transfer

// desplegar app en Android

1.  modificar en app.json y compilar
    "android": {
    "package": "com.delfin.cincotenedores",
2.  Abrir en browser el Google API Manager:
    https://console.developers.google.com/
3.  crea proyecto o seleccionar: 5-Tenedores
4.  seleccionar: Habilitar APIS y servicios
5.  Seleccionar: Maps SDK for Android > HABILITAR
6.  Ir a:to https://console.developers.google.com/apis/credentials
7.  Seleccionar: Create Credentials > Clave de API
8.  En el modal > copiar clave :
    AIzaSyBn2X4PYNGNZen4PNOhH_0xafox6XrerBY
9.  click: RESTRICT KEY.
10. Debajo de Restricciones de Aplicacion, selecionar boton: Apps de Android
11. Click: AGREGAR ELEMENTO y escribir en Nombre del Paquete: com.delfin.cincotenedores
12. Para obtener la huella digital ejecutar: expo fetch:android:hashes
    Google Certificate Fingerprint: 53:9D:97:FA:5A:7E:BC:DF:9E:E3:0A:9F:13:B0:80:D9:77:A7:27:FE
    Google Certificate Hash (SHA-1): 539D97FA5A7EBCDF9EE30A9F13B080D977A727FE
    Google Certificate Hash (SHA-256): 3EAC6CCF38BFF19EA64F16993EF19E6400BF9D43C4A4C964BECDBFF2359541F2  
    Facebook Key Hash: U52X+lp+vN+e4wqfE7CA2XenJ/4=

13. Copiar: Google Certificate Fingerprint y ponerlo en el campo: "SHA-1 certificate fingerprint"
14. Click: LISTO
15. Copiar el API Key y ponerlo en app.json
    "config": {
    "googleMaps": {
    "apiKey": "AIzaSyBn2X4PYNGNZen4PNOhH_0xafox6XrerBY"
    }
    },
