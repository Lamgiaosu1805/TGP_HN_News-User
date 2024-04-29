import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {FontAwesome5} from '@expo/vector-icons'

export default function DetailHeader({title, leftIcon, rightIcon}) {
  //Left & right icon là 1 đối tượng, gồm tên icon và callback
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} activeOpacity={0.7} onPress={leftIcon.callBack}>
        {leftIcon && <FontAwesome5 color='white' size={20} name={leftIcon.name} />}
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.icon}>
        {rightIcon && <FontAwesome5 color='white' size={20} name={leftIcon.name} />}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        paddingTop: 48,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    icon: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center'
    }
})