import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBottomTabNavigator from './src/navigators/HomeBottomTabNavigator';

const Stack = createNativeStackNavigator();
export default function App() {
  // const webViewRef = useRef(null);
  // const injectHideScript = (className1, className2) => {
  //   const script = `
  //     var elements = document.getElementsByClassName("${className1}");
  //     for (var i = 0; i < elements.length; i++) {
  //       elements[i].style.display = 'none';
  //     }
  //     var elements = document.getElementsByClassName("${className2}");
  //     for (var i = 0; i < elements.length; i++) {
  //       elements[i].style.display = 'none';
  //     }
  //   `;
  //   webViewRef.current.injectJavaScript(script);
  // };
  // return (
  //     <WebView
  //       style={styles.container}
  //       ref={webViewRef}
  //       onLoad={() => injectHideScript('site-header', 'elementor-button-wrapper')}
  //       source={{ uri: "https://www.tonggiaophanhanoi.org/" }}
  //       bounces={false}
  //       allowsBackForwardNavigationGestures={true}
  //     />
  // );
  
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeBottomTabNavigator" component={HomeBottomTabNavigator} />
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
