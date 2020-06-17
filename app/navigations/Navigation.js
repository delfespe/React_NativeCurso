import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RestaurantStack from "../navigations/RestaurantStack";
import FavoriteStack from "../navigations/FavoriteStack";
import TopRestauranrStack from "../navigations/TopRestauranrStack";
import SearchStack from "../navigations/SearchStack";
import AccountStack from "../navigations/AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="restarants" component={RestaurantStack} options={{ title: "Restaurantes"}}/>
        <Tab.Screen name="favorites" component={FavoriteStack} options={{ title: "Favoritos"}} />
        <Tab.Screen name="toprestaurants" component={TopRestauranrStack} options={{ title: "Top 5"}} />
        <Tab.Screen name="search" component={SearchStack} options={{ title: "Buscar"}} />
        <Tab.Screen name="account" component={AccountStack} options={{ title: "Cuenta"}} />
        </Tab.Navigator>
      </NavigationContainer>
    )
}