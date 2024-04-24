import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Header() {
  return (
    <SafeAreaView style={styles.header}>
        <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Logo_T%E1%BB%95ng_Gi%C3%A1o_ph%E1%BA%ADn_H%C3%A0_N%E1%BB%99i.svg/1928px-Logo_T%E1%BB%95ng_Gi%C3%A1o_ph%E1%BA%ADn_H%C3%A0_N%E1%BB%99i.svg.png", cache: 'default'}} width={80} height={85}/>
        <View style={styles.content}>
            <Text style={{fontWeight: '700', fontSize: 20, color: '#f70303', letterSpacing: 0}}>Tổng Giáo Phận Hà Nội</Text>
            <Text style={{fontSize: 20, color: '#ea8203', letterSpacing: 0, marginTop: 4}}>Archdiocese of Ha Noi</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        marginLeft: 16
    }
})