
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from "../screens/Favorites";

const Stack = createStackNavigator();

export default function FavoriteStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="favorites" componente={Favorites}  options={{ title: "Restaurantes Favoritos"}}/>
        </Stack.Navigator>
    );
    
}
