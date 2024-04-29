import { Dimensions, Modal, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import WebView from 'react-native-webview';
import Loading from './Loading';
import { WIDTH } from '../constants/constants';

export default function WebViewComponent({link}) {
    const webViewRef = useRef(null);
    const [loading, setLoading] = useState(true)
    const injectHideScript = (className1, className2) => {
        const script = `
        var elements = document.getElementsByClassName("${className1}");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        var elements = document.getElementsByClassName("${className2}");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        `;
        webViewRef.current.injectJavaScript(script);
    };
    return (
        <View style = {{flex: 1, marginTop: 32}}>
           {
            loading &&
            <View style={{justifyContent: 'center', alignItems: 'center', position: 'relative', backgroundColor: 'whtie', width: WIDTH, height: Dimensions.get('window').height, top: 0}}>
                <Loading />
            </View>
           }
            <WebView
                style={styles.container}
                ref={webViewRef}
                onLoadProgress={() => injectHideScript('site-header', 'elementor-button-wrapper')}
                onLoadEnd={() => setLoading(false)}
                source={{ uri: link }}
                bounces={false}
                allowsBackForwardNavigationGestures={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                allowsInlineMediaPlayback={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({})