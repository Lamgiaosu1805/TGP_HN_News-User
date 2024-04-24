import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBottomTabNavigator from './src/navigators/HomeBottomTabNavigator';
import { StatusBar } from 'expo-status-bar';
import DetailPostScreen from './src/screens/DetailPostScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return(
    <NavigationContainer>
      <StatusBar translucent style='auto'/>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeBottomTabNavigator" component={HomeBottomTabNavigator} />
        <Stack.Screen name="DetailPostScreen" component={DetailPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: -100
  },
});
