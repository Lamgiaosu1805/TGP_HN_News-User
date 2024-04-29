import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../components/DetailHeader'
import axios from 'axios'
import utils from '../utils'

const LinhMucItem = ({item}) => (
    <View style={{flexDirection: 'row', backgroundColor: 'white', marginBottom: 20, alignItems: 'center', borderRadius: 8, paddingVertical: 8, paddingRight: 8}}>
        <Image source={{uri: item.imgUrl}} width={100} height={120} resizeMode='contain' />
        <View style={{flex: 1}}>
            <Text style={{fontSize: 16, fontWeight: '600', marginVertical: 2}}>{`Lm. ${item.info[0].replace("Lm.", "").trim()}`}</Text>
            {
                item.info.map((e, index) => {
                    if(index == 0) return
                    return <Text style={{marginVertical: 2, fontSize: 15, overflow: 'visible'}} numberOfLines={1}>{e}</Text>
                })
            }
        </View>
    </View>
)

export default function LinhMucScreen({navigation}) {
    const [listLM, setListLM] = useState(null)
    const getListLinhMucPerPage = async (page) => {
        try {
            const res = await axios.get(`${utils.apiUrl}/linhMucDoan/${page}`)
            if(res.data.status == true) {
                setListLM(res.data.data.data)
            } else {
                alert("Lỗi hệ thống")
            }
        } catch (error) {
            console.log(error)
            alert("Lỗi hệ thống")
        }
    }
    useEffect(() => {
        getListLinhMucPerPage(1)
    }, [])
    return (
        <View style={styles.container}>
            <DetailHeader title={"Linh mục TGP Hà Nội"} leftIcon={{name: "chevron-left", callBack: () => {navigation.goBack()}}} />
            <View style={styles.content}>
                <FlatList
                    data={listLM}
                    renderItem={({item}) => (
                        <LinhMucItem item={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        paddingHorizontal: 16
    }
})