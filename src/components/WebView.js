import { StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import WebView from 'react-native-webview';

export default function WebViewComponent({link}) {
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
    );
}

const styles = StyleSheet.create({})