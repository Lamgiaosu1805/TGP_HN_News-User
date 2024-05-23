import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import utils from '../utils'
import { storeNewPost } from '../redux/slice/newPostSlice'
import { storeNewPostReceived } from '../redux/slice/newPostReceivedSlice'
import { storeLoiChuaMoiNgay } from '../redux/slice/loiChuaMoiNgaySlice'

export default function SplashScreen({navigation}) {
    const dispatch = useDispatch();
    const newPost = useSelector(state => state.newPost)
    const newPostReceived = useSelector(state => state.newPostReceived)
    const loiChuaMoiNgay = useSelector(state => state.loiChuaMoiNgay)
    const getNewPost = () => {
        axios.get(`${utils.apiUrl}/post/newPost`)
        .then((res) => {
            if(res.data.status == true) {
                const action = storeNewPost(res.data.data.data)
                dispatch(action);
            }
            else{
                const action = storeNewPost([])
                dispatch(action);
            }
        })
        .catch(e => {
            console.log("Có lỗi khi get newPost", e);
            alert("Không thể tải dữ liệu")
            const action = storeNewPost([])
            dispatch(action);
        })
    }
    const getNewPostReceived = () => {
        axios.get(`${utils.apiUrl}/post/newPostReceived`)
            .then((res) => {
                if(res.data.status == true) {
                    const action = storeNewPostReceived(res.data.data.data)
                    dispatch(action);
                }
                else{
                    const action = storeNewPostReceived([])
                    dispatch(action);
                }
            })
            .catch(e => {
                console.log("Có lỗi khi get newPostReceived", e);
                alert("Không thể tải dữ liệu")
                const action = storeNewPost([])
                dispatch(action);
            })
    }
    const getLoiChuaMoiNgay = () => {
        axios.get(`${utils.apiUrl}/post/loiChuaMoiNgay`)
        .then((res) => {
            if(res.data.status == true) {
                const action = storeLoiChuaMoiNgay(res.data.data.data)
                dispatch(action);
            }
            else{
                const action = storeLoiChuaMoiNgay([])
                dispatch(action);
            }
        })
        .catch(e => {
            console.log("Có lỗi khi get newPostReceived", e);
            alert("Không thể tải dữ liệu")
            const action = storeLoiChuaMoiNgay([])
            dispatch(action);
        })
    }
    useEffect(() => {
        getNewPost()
    }, [])
    useEffect(() => {
        getNewPostReceived()
    }, [])
    useEffect(() => {
        getLoiChuaMoiNgay()
    }, [])
    useEffect(() => {
        if(newPost != null && newPostReceived != null && loiChuaMoiNgay != null) {
            navigation.replace('HomeBottomTabNavigator')
        }
    })
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/tgphanoi.png')} style={{width: 200, height: 200}}/>
            <Text style={{fontSize: 16, fontWeight: '500', marginTop: 32}}>Đang tải dữ liệu ...</Text>
            <Loading />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})