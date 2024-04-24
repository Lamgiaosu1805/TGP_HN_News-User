import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View style={{padding: 30}}>
      <ActivityIndicator size='large' color={'red'}/>
    </View>
  )
}

const styles = StyleSheet.create({})