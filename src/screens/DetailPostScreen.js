import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import WebView from 'react-native-webview';

export default function DetailPostScreen({route}) {
    const {link} = route.params
    const webViewRef = useRef(null);
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
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <SafeAreaView style={{flex: 1}}>
                <WebView
                    style={styles.container}
                    ref={webViewRef}
                    onLoadProgress={() => injectHideScript('site-header', 'elementor-button-wrapper')}
                    source={{ uri: link }}
                    bounces={false}
                    allowsBackForwardNavigationGestures={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    allowsInlineMediaPlayback={true}

                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: -100
      },
})