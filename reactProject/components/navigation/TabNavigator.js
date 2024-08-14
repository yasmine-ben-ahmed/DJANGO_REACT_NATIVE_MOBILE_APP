import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/map'; // Replace with your actual screen
import ProfileScreen from '../screens/profile'; // Replace with your actual screen
import Home from '../screens/home.js';
import { Ionicons } from '@expo/vector-icons'; // Or any other icon library you use

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'HOme') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#005B59'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#95B1AF',
      })}
    >
      <Tab.Screen name="HOme" component={Home} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
