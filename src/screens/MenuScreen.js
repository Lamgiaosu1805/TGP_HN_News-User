import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {FontAwesome5} from '@expo/vector-icons'
import { Colors } from '../constants/colors'

export default function MenuScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView style={{paddingHorizontal: 16}}>
        <TouchableOpacity 
          style={{
            height: 92, 
            backgroundColor: 'white', 
            marginTop: 60, 
            borderRadius: 8, 
            flexDirection: 'row', 
            alignItems: 'center', 
            paddingHorizontal: 12
          }}
          activeOpacity={0.6}
        >
          <View style={{width: 70, height: 70, borderRadius: 35}}>
            <Image source={{uri: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474080vZF/anh-che-meo-cam-sung-ak_041008353.jpg'}} style={{width: 70, height: 70, borderRadius: 35}}/>
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>Đăng nhập</Text>
          </View>
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginTop: 32, marginBottom: 8, fontWeight: '600'}}>Thông tin</Text>
        <View style={styles.content}>
          <TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={() => navigation.navigate('DetailPostScreen', {link: 'https://www.tonggiaophanhanoi.org/luoc-su-tong-giao-phan-ha-noi/'})}>
            <View style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Coat_of_arms_of_Joseph_V%C5%A9_V%C4%83n_Thi%C3%AAn.svg/200px-Coat_of_arms_of_Joseph_V%C5%A9_V%C4%83n_Thi%C3%AAn.svg.png'}} width={26} height={26} resizeMode='contain'/>
            </View>
            <Text style={styles.textItem}>Giới thiệu về TGP Hà Nội</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.6}>
            <View style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name='newspaper' size={20} />
            </View>
            <Text style={styles.textItem}>Danh mục tin tức</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={() => navigation.navigate('LinhMucScreen')}>
            <View style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name='users' size={20} />
            </View>
            <Text style={styles.textItem}>Linh mục đoàn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {borderBottomWidth: 0}]} activeOpacity={0.6}>
            <View style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name='church' size={20} />
            </View>
            <Text style={styles.textItem}>Giáo xứ trong TGP Hà Nội</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 20, marginTop: 32, marginBottom: 8, fontWeight: '600'}}>Hệ thống</Text>
        <View style={styles.content}>
          <TouchableOpacity style={styles.item} activeOpacity={0.6}>
            <View style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name='bell' size={20} />
            </View>
            <Text style={styles.textItem}>Thông báo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item, {borderBottomWidth: 0}]} activeOpacity={0.6}>
            <View style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name='cog' size={20} />
            </View>
            <Text style={styles.textItem}>Cài đặt</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.content, {marginTop: 40}]}>
          <TouchableOpacity style={[styles.item, {borderBottomWidth: 0}]} activeOpacity={0.6}>
            <View style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5 name='sign-out-alt' size={20} color='red'/>
            </View>
            <Text style={[styles.textItem, {color: 'red'}]}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLine,
    alignItems: 'center'
  },
  textItem: {
    fontSize: 16, 
    fontWeight: '500',
    marginLeft: 12,
  }
})