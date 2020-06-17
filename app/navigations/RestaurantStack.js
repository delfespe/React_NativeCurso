
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from "../screens/Restaurants";

const Stack = createStackNavigator();

export default function RestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="restaurant" componente={Restaurants}  options={{ title: "Restaurantes"}}/>
        </Stack.Navigator>
    );
    
}
