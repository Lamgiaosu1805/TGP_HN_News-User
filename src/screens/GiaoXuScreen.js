import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../components/DetailHeader'
import utils from '../utils'
import axios from 'axios'
import {FontAwesome5} from '@expo/vector-icons'
import Loading from '../components/Loading'

export default function GiaoXuScreen({navigation}) {
    const [listGx, setListGx] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchString, setSearchString] = useState("")
    const [searchStatus, setSearchStatus] = useState(false)
    const getListGx = async (loadMore, page) => {
        if(page == 1) {
            setSearchStatus(true)
        }
        setLoading(true)
        try {
            const res = await axios.post(`${utils.apiUrl}/giaoXu/search`, {
                searchValue: searchString,
                page: page
            })
            const resData = res.data
            if(resData.status == true) {
                if(loadMore == true) {
                    setListGx([...listGx, ...resData.data.data]);
                    setPage(page + 1)
                }
                else{
                    setListGx(resData.data.data)
                    setPage(2)
                }
            }
            setLoading(false)
            setSearchStatus(false)
        } catch (error) {
            setLoading(false)
            setSearchStatus(false)
            console.log("có lỗi khi get gx", error)
            alert("Lỗi hệ thống")
        }
        
    }
    useEffect(() => {
        getListGx(false, 1)
    }, [])

    const LinhMucItem = ({item}) => (
        <TouchableOpacity 
            style={{
                backgroundColor: 'white', 
                alignItems: 'center',
                marginBottom: 12, 
                borderRadius: 8, 
                paddingVertical: 8, 
                paddingRight: 8
            }}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DetailPostScreen', {link: item.link})}
        >
            <Text style={{fontSize: 18, fontWeight: '600'}}>{`Giáo xứ ${item.tenGiaoXu}`}</Text>
            <Text style={{fontSize: 16, marginTop: 8}}>{`${item.tenGiaoHat}`}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <DetailHeader title={"Danh sách Giáo xứ"} leftIcon={{name: "chevron-left", callBack: () => {navigation.goBack()}}} />
            <View style={{backgroundColor: 'white', marginVertical: 12, marginHorizontal: 16, borderRadius: 8, paddingLeft: 12, flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5 color='grey' size={16} name={'search'} />
                <TextInput
                    style={{fontSize: 16, height: 40, flex: 1, marginLeft: 8}}
                    enterKeyHint='search'
                    placeholder='Tìm kiếm'
                    onChangeText={(value) => {
                        setSearchString(value)
                        if(value == "") {
                            getListGx(false, 1);
                        }
                    }}
                    onSubmitEditing={() => {
                        getListGx(false, 1);
                    }}
                />
                
            </View>
            {
                listGx.length == 0 || searchStatus == true
                ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Loading />
                </View>
                :
                <View style={styles.content}>
                    <FlatList
                        data={listGx}
                        renderItem={({item}) => (
                            <LinhMucItem item={item}/>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => {
                            if(loading == false) {
                                getListGx(true, page)
                            }
                        }}
                    />
                    {
                        (loading == true) && <ActivityIndicator style={{marginBottom: 20}}/>
                    }
                </View>
            }
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