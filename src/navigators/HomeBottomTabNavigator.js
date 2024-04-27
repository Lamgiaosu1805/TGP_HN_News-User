import { Animated, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import LichCongGiaoScreen from '../screens/LichCongGiaoScreen'
import MenuScreen from '../screens/MenuScreen'
import {FontAwesome5} from '@expo/vector-icons'
import HocGiaoLyScreen from '../screens/HocGiaoLyScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator()

export default function HomeBottomTabNavigator() {
    const inset = useSafeAreaInsets()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, 
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingBottom: 34,
                    height: inset.bottom > 0 ? 80 : Platform.OS == 'android' ? 60 : 52
                }
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '30%'}}>
                        <FontAwesome5 name="home" size={20} color={focused ? 'red' : 'grey'}/>
                        <Text style={{fontSize: 11, marginTop: 6, color: focused ? 'red' : 'grey'}}>Trang chủ</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="HocGiaoLyScreen" component={HocGiaoLyScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '30%'}}>
                        <FontAwesome5 name="book-open" size={20} color={focused ? 'red' : 'grey'}/>
                        <Text style={{fontSize: 11, marginTop: 6, color: focused ? 'red' : 'grey'}}>Học Giáo lý</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="LichCongGiao" component={LichCongGiaoScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '30%'}}>
                        <FontAwesome5 name="calendar" size={20} color={focused ? 'red' : 'grey'}/>
                        <Text style={{fontSize: 11, marginTop: 6, color: focused ? 'red' : 'grey'}}>Lịch Công giáo</Text>
                    </View>
                ),
            }}/>
             <Tab.Screen name="MenuScreen" component={MenuScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '30%'}}>
                        <FontAwesome5 name="bars" size={20} color={focused ? 'red' : 'grey'}/>
                        <Text style={{fontSize: 11, marginTop: 6, color: focused ? 'red' : 'grey'}}>Menu</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>

    )
}

const styles = StyleSheet.create({})