import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../components/DetailHeader'
import axios from 'axios'
import utils from '../utils'
import Loading from '../components/Loading'

const LinhMucItem = ({item}) => (
    <View style={{flexDirection: 'row', backgroundColor: 'white', marginBottom: 20, alignItems: 'center', borderRadius: 8, paddingVertical: 8, paddingRight: 8}}>
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
    </View>
)

export default function LinhMucScreen({navigation}) {
    const [listLM, setListLM] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [searchString, setSearchString] = useState("")
    const [searchStatus, setSearchStatus] = useState(false)
    
    const getListLinhMucPerPage = async (page) => {
        setLoading(true)
        try {
            const res = await axios.get(`${utils.apiUrl}/linhMucDoan/${page}`)
            if(res.data.status == true) {
                if(res.data.data.data.length != 0) {
                    setListLM([...listLM, ...res.data.data.data])
                    setPage(page + 1)
                }
            } else {
                alert("Lỗi hệ thống")
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            alert("Lỗi hệ thống")
            setLoading(false)
        }
    }


    const searchLm = utils.debounce((async (searchString) => {
        setSearchStatus(true)
        try {
            if(searchString == "") {
                // setPage(1);
                // getListLinhMucPerPage
            }
            else {
                const res = await axios.post(`${utils.apiUrl}/linhMucDoan/search`, {
                    searchValue: searchString,
                    type: 1
                })
                const resData = res.data;
                setListLM(resData.data)
            }
            setSearchStatus(false)
        } catch (error) {
            console.log("có lỗi khi search LM")
            alert("Lỗi hệ thống")
            setSearchStatus(false)
        }
    }), 1000)

    useEffect(() => {
        getListLinhMucPerPage(page)
    }, [])
    return (
        <View style={styles.container}>
            <DetailHeader title={"Linh mục TGP Hà Nội"} leftIcon={{name: "chevron-left", callBack: () => {navigation.goBack()}}} />
            <View style={{backgroundColor: 'white', marginVertical: 12, marginHorizontal: 16, borderRadius: 8, paddingLeft: 12}}>
                <TextInput 
                    style={{fontSize: 16, height: 40}}
                    enterKeyHint='search'
                    onChangeText={(value) => {
                        searchLm(value)
                        setSearchString(value)
                    }}
                />
            </View>
            {
                (listLM.length == 0 && loading == true) || (searchStatus == true)
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
                            if(searchString == "") {
                                getListLinhMucPerPage(page)
                            }
                        }}
                    />
                    {
                        (loading == true && page > 1 && searchString == "") && <ActivityIndicator style={{marginBottom: 20}}/>
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