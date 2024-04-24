import { ActivityIndicator, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants/colors'
import Header from '../components/Header'
import axios from 'axios'
import Utils from '../utils'
import Loading from '../components/Loading'
import { WIDTH } from '../constants/constants'

const renderItem = (item) => (
    <TouchableOpacity key={item.title} style={{marginTop: 28}} activeOpacity={0.7}>
        <Image source={{uri: item.imgUrl, cache:'default'}} width={WIDTH - 16 * 2} height={240} resizeMode='cover' borderRadius={8} />
        <Text style={{fontSize: 16, color: '#54595f', fontWeight: '600', marginVertical: 8}}>{item.title}</Text>
        <Text style={{color: '#adadad'}}>{item.time == "" ? "---" : item.time}</Text>
    </TouchableOpacity>
)

export default function HomeScreen() {
    const [newPost, setNewPost] = useState(null);
    const [newPostReceived, setNewPostReceived] = useState(null)

    useEffect(() => {
        axios.get(`${Utils.apiUrl}/post/newPost`)
            .then((res) => {
                // console.log(res.data.data.data)
                setNewPost(res.data.data.data)
            })
            .catch(e => {
                console.log("Có lỗi khi get newPost");
                alert("Không thể tải dữ liệu")
            })
    }, [])
    useEffect(() => {
        axios.get(`${Utils.apiUrl}/post/newPostReceived`)
            .then((res) => {
                // console.log(res.data.data.data)
                setNewPostReceived(res.data.data.data)
            })
            .catch(e => {
                console.log("Có lỗi khi get newPostReceived");
                alert("Không thể tải dữ liệu")
            })
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <Header />
                <View style={styles.newsArea}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>BÀI NỔI BẬT</Text>
                    </View>
                    {
                        newPost == null
                        ?
                        <Loading />
                        :
                        newPost.map((item) => (
                            renderItem(item)
                        ))
                    }
                    <View style={[styles.titleContainer, {marginTop: 40}]}>
                        <Text style={styles.titleText}>BÀI MỚI NHẬN</Text>
                    </View>
                    {
                        newPostReceived == null
                        ?
                        <Loading />
                        :
                        newPostReceived.map((item) => (
                            renderItem(item)
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    newsArea: {
        // marginBottom: 40
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE9B2',
        paddingVertical: 8
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#0082D7'
    }
})