
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../utils/Colors.js'
import Strings from '../utils/Strings.js'
import {Constants} from '../utils/constants.js'
import { AdBlockApi } from '../api/AdBlockApi.js'

function ThanksPage({ onCallback, adResponse, adBlockLevel}) {
    adWidth = parseInt(typeof adResponse?.adSize !== 'undefined' ? (adResponse.adSize.split('x')[0]) : 0)
    adHeight = parseInt(typeof adResponse?.adSize !== 'undefined' ? (adResponse.adSize.split('x')[1]) : 0)

  useEffect(() => {
    AdBlockApi(adBlockLevel, adResponse.adUnit)
    // Function to be executed after 2 seconds
    function delayedFunction() {
        onCallback(false, true);
        console.log('Function executed after 2 seconds');
    };

    // Call the delayed function after 2 seconds
    setTimeout(delayedFunction, 2000);

  }, []);

    const styles = styling();
    return (
        <View style={[styles.container]}>
            <Text style={[styles.headline]}> {Strings.Thanks.thanksText}</Text>
        </View>
    )
}

export default ThanksPage

export const styling = () =>
    StyleSheet.create({
    container: {
        backgroundColor: Colors.grey1BackgroundColor,
        width: adWidth,
        height: adHeight,
        justifyContent: "center",
    },
    headline: {
        textAlign: 'center', // <-- the magic
        fontSize: Constants.FontSize.textFontSize12,
    },
});
