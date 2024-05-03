import { ActivityIndicator, FlatList, Image, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../components/DetailHeader'
import axios from 'axios'
import utils from '../utils'
import Loading from '../components/Loading'
import {FontAwesome5} from '@expo/vector-icons'
import { WIDTH } from '../constants/constants'

export default function LinhMucScreen({navigation}) {
    const [listLM, setListLM] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchString, setSearchString] = useState("")
    const [searchStatus, setSearchStatus] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [item, setItem] = useState(null)

    const getListLm = async (loadMore, page) => {
        setLoading(true)
        const res = await axios.post(`${utils.apiUrl}/linhMucDoan/search`, {
            searchValue: searchString,
            page: page
        })
        const resData = res.data
        if(resData.status == true) {
            if(loadMore == true) {
                setListLM([...listLM, ...resData.data.data]);
                setPage(page + 1)
            }
            else{
                setListLM(resData.data.data)
                setPage(2)
            }
        }
        setLoading(false)
    }
    useEffect(() => {
        getListLm(false, 1)
    }, [])

    const LinhMucItem = ({item}) => (
        <TouchableOpacity 
            style={{
                flexDirection: 'row', 
                backgroundColor: 'white', 
                marginBottom: 20, 
                alignItems: 'center', 
                borderRadius: 8, 
                paddingVertical: 8, 
                paddingRight: 8
            }}
            activeOpacity={0.7}
            onPress={() => {
                setItem(item)
                setIsShowModal(true)
            }}
        >
            <Image source={{uri: item.imgUrl == "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" : item.imgUrl}} width={100} height={120} resizeMode='contain' />
            <View style={{flex: 1}}>
                <Text style={{fontSize: 16, fontWeight: '600', marginVertical: 2}}>{`Lm. ${item.info[0].replace("Lm.", "").trim()}`}</Text>
                {
                    item.info.map((e, index) => {
                        if(index == 0) return
                        return <Text key={index} style={{marginVertical: 2, fontSize: 15, overflow: 'visible'}} numberOfLines={1}>{e}</Text>
                    })
                }
            </View>
        </TouchableOpacity>
    )
    
    return (
        <View style={styles.container}>
            {
                item != null &&
                <Modal visible={isShowModal} statusBarTranslucent={Platform.OS === 'android'} transparent >
                    <TouchableWithoutFeedback onPressOut={() => {setIsShowModal(false)}}>
                        <View style={{backgroundColor:'rgba(0,0,0,0.5)',flex:1, alignItems:'center',justifyContent:'center'}} >
                            <TouchableOpacity style={{backgroundColor: 'white', width: WIDTH - 32, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8}} activeOpacity={1}>
                                <Image source={{uri: item.imgUrl == "" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png" : item.imgUrl}} width={120} height={200} resizeMode='contain' />
                                <Text style={{fontSize: 16, fontWeight: '600', marginVertical: 2}}>{`Lm. ${item.info[0].replace("Lm.", "").trim()}`}</Text>
                                {
                                    item.info.map((e, index) => {
                                        if(index == 0) return
                                        return <Text key={index} style={{marginVertical: 2, fontSize: 15, textAlign: 'center'}}>{e}</Text>
                                    })
                                }
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            }
            <DetailHeader title={"Linh mục TGP Hà Nội"} leftIcon={{name: "chevron-left", callBack: () => {navigation.goBack()}}} />
            <View style={{backgroundColor: 'white', marginVertical: 12, marginHorizontal: 16, borderRadius: 8, paddingLeft: 12, flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5 color='grey' size={16} name={'search'} />
                <TextInput
                    style={{fontSize: 16, height: 40, flex: 1, marginLeft: 8}}
                    enterKeyHint='search'
                    placeholder='Tìm kiếm'
                    onChangeText={(value) => {
                        setSearchString(value)
                        if(value == "") {
                            getListLm(false, 1);
                        }
                    }}
                    onSubmitEditing={() => {
                        getListLm(false, 1);
                    }}
                />
            </View>
            {
                (listLM.length == 0 && searchStatus == true)
                ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Loading />
                </View>
                :
                <View style={styles.content}>
                    <FlatList
                        data={listLM}
                        renderItem={({item}) => (
                            <LinhMucItem item={item}/>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => {
                            if(loading == false) {
                                getListLm(true, page)
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