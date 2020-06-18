import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RestaurantStack from "../navigations/RestaurantStack";
import FavoriteStack from "../navigations/FavoriteStack";
import TopRestauranrStack from "../navigations/TopRestauranrStack";
import SearchStack from "../navigations/SearchStack";
import AccountStack from "../navigations/AccountStack";

import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="restaurants"
          component={RestaurantStack}
          options={{ title: "Restaurantes" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoriteStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="toprestaurants"
          component={TopRestauranrStack}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "restaurants":
      iconName = "compass-outline";
      break;
    case "favorites":
      iconName = "heart-outline";
      break;
    case "toprestaurants":
      iconName = "start-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "home-outline";
      break;
    default:
      break;
  }
  return <Icon type="material-community" name={iconName} color={color}></Icon>;
}
