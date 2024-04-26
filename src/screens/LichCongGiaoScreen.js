import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WIDTH } from '../constants/constants'
import axios from 'axios'
import utils from '../utils'
import Loading from '../components/Loading'


const renderItem = (item, navigation) => (
    <TouchableOpacity key={item.title} activeOpacity={0.7} style={{marginVertical: 10, alignItems: 'center'}} onPress={() => {navigation.navigate('DetailPostScreen', {link: item.link})}}>
        <Text style={{fontSize: 18, textDecorationLine: 'underline', textDecorationColor: 'grey'}}>{item.title}</Text>
    </TouchableOpacity>
)

export default function LichCongGiaoScreen({navigation}) {
    const [lich, setLich] = useState(null)
    useEffect(() => {
        axios.get(`${utils.apiUrl}/lichCongGiao`)
            .then((res) => {
                if(res.data.status == true) {
                    setLich(res.data.data.data)
                }
                else {
                    setLich([])
                }
            })
            .catch((e) => {
                console.log("Có lỗi trong quá trình get Lịch CG", e)
                alert("Lỗi hệ thống, vui lòng thử lại sau")
            })
    }, [])
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
                <Image source={{uri: 'https://www.tonggiaophanhanoi.org/wp-content/uploads/2024/02/2-banner-nam-muc-vu-2024-TGP-HN-scaled.jpg'}} width={WIDTH} height={WIDTH * 320 / 2048}/>
                {
                    lich == null
                    ? 
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Loading />
                    </View>
                    :
                    <View style={{flex: 1, paddingHorizontal: 16}}>
                        <ScrollView style={{paddingVertical: 16}} showsVerticalScrollIndicator={false}>
                            <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 18, marginBottom: 20}}>LỊCH CÔNG GIÁO 2024</Text>
                            <View style={{marginBottom: 20}}>
                                {
                                    lich.map((item) => (
                                        renderItem(item, navigation)
                                    ))
                                }
                            </View>
                        </ScrollView> 
                    </View>
                }
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {

    }
})