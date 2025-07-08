import {StyleSheet,
  View,
  useWindowDimensions,
  Linking,
  Dimensions} from 'react-native';
import Colors from '../utils/Colors.js'
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { HTMLElementModel, HTMLContentModel } from '@native-html/transient-render-engine';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

function AdScript({containerStyle, script}) {

  const [useWebView, setUseWebView] = useState(true);
  const htmlContent = `<!DOCTYPE html><html><head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"></head>
  <body>${script}</body></html>`;

  return (
    <View style={[styles.container, containerStyle]}>
      {useWebView ? (
        <RenderWebView 
          htmlContent={htmlContent} 
          onRenderFailed={() => setUseWebView(false)} // Fallback if rendering fails
        />
      ) : (
        <RenderDiv 
          htmlContent={htmlContent}
        />
      )}
    </View>
  );
  
  function RenderWebView({htmlContent, onRenderFailed }) {
    console.log("RenderWebView:", htmlContent);
    const handleShouldStartLoadWithRequest = (event) => {
      const { url, navigationType } = event;
      console.log("Loading URL:", url);

      // Allow the WebView to load the initial HTML content
      // if (initialLoad) {
      //   // Check for 'about:blank' or data URL which indicates initial load
      //   if (url === 'about:blank' || url.startsWith('data:text/html')) {
      //     return true;
      //   }

      //   // If it's not the initial HTML content, block the request and stop the initial load
      //   setInitialLoad(false);
      //   return false;
      // }

      // For subsequent requests, open in the browser if navigationType is click (user-initiated)
      if (navigationType === 'click') {
        Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
        return false;
      }

      return true;
    };

    // Try to render HTML, and call onRenderFailed if it fails
    try {
      return(
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={false}
          bounces={false}
          contentMode="mobile"
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        />
      )
    } catch (error) {
      console.error('RenderWebView failed, falling back to RenderDiv:', error);
      onRenderFailed(); // Trigger fallback
      return null; // Or show a loading spinner while fallback is processed
    }
  }

    function RenderDiv({ htmlContent}) {
      console.log("RenderDiv:", htmlContent);
        const { width } = useWindowDimensions();
      
        const handleLinkPress = (evt, href) => {
          Linking.openURL(href);
        };
      
        const htmlModel = HTMLElementModel.fromCustomModel({
          tagName: 'html',
          contentModel: HTMLContentModel.block,
          isVoid: false,
        });
      
        const linkModel = HTMLElementModel.fromCustomModel({
          tagName: 'link',
          contentModel: HTMLContentModel.textual,
          isVoid: true,
        });
      
        const customHTMLElementModels = {
          html: htmlModel,
          link: linkModel,
        };
      
        return (
          <RenderHtml
            contentWidth={width}
            source={{ html: htmlContent }}
            renderersProps={{ a: { onPress: handleLinkPress } }}
            customHTMLElementModels={customHTMLElementModels}
            defaultTextProps={{ style: styles.defaultText }}
            baseStyle={styles.container}
          />
        );
  }

}

export default AdScript;

const styles =  StyleSheet.create({
    text: {
        textAlign: 'center', // <-- the magic
        fontSize: 12,
        color: Colors.purpleColor,
    },
    container: {
        margin: 0,
        padding: 0,
      },
      webView: {
        flex: 1,
        width: width,
        height: height,
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
      },
      defaultText: {
        margin: 0,
        padding: 0,
      },
});