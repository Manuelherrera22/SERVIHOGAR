import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ServiceRequestScreen from './screens/ServiceRequestScreen';
import MyServicesScreen from './screens/MyServicesScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import QuotesScreen from './screens/QuotesScreen';
import ProfileScreen from './screens/ProfileScreen';
import TechnicianHomeScreen from './screens/TechnicianHomeScreen';
import AvailableServicesScreen from './screens/AvailableServicesScreen';
import CreateQuoteScreen from './screens/CreateQuoteScreen';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// User Tab Navigator
function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyServices') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyServices" component={MyServicesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Technician Tab Navigator
function TechnicianTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'TechnicianHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AvailableServices') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="TechnicianHome" component={TechnicianHomeScreen} />
      <Tab.Screen name="AvailableServices" component={AvailableServicesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main Navigator
function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // You can add a loading screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            {user.role === 'technician' ? (
              <Stack.Screen name="TechnicianTabs" component={TechnicianTabs} />
            ) : (
              <Stack.Screen name="UserTabs" component={UserTabs} />
            )}
            <Stack.Screen name="ServiceRequest" component={ServiceRequestScreen} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
            <Stack.Screen name="Quotes" component={QuotesScreen} />
            <Stack.Screen name="CreateQuote" component={CreateQuoteScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </AuthProvider>
  );
}


