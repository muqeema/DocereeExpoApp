
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Button } from 'react-native'
import Colors from '../utils/Colors.js'
import Strings from '../utils/Strings.js'
import Urls from '../utils/Urls.js'
import mediumRectangle from '../utils/Helpers.js'
import ConsentViewTwo from './ConsentViewTwo.js'
import ImageAssets from '../assets/ImageAssets';

const ConsentViewOne = ({ onCallback, adResponse=null}) => {
    adWidth = parseInt(typeof adResponse?.adSize !== 'undefined' ? (adResponse.adSize.split('x')[0]) : 0)
    adHeight = parseInt(typeof adResponse?.adSize !== 'undefined' ? (adResponse.adSize.split('x')[1]) : 0)
//    console.log('adSize DocereeAdView: ',adSize, 'adUnit: ',adUnit);

    isMediumRectangle = mediumRectangle(adResponse?.adSize);
    buttonWidth = isMediumRectangle ? (adWidth * 0.8) : (adWidth * 0.45);
    buttonHeight = isMediumRectangle ? adHeight * 0.2 : adHeight / 2;
    console.log("isMediumRectangle : " + isMediumRectangle)
    const onPressBack = () => {
        console.log("element.id : ")
        onCallback(false, false);
    }
    const onPressReportThisAd = () => {
        setClickedReport(true)
        console.log("element.id : ",clickedReport)
    }
    const onPressWhyThisAd = () => {
        Linking.openURL(Urls.whyThisAdUrl)
    }
    const styles = styling(adResponse, isMediumRectangle);
    const [clickedReport, setClickedReport] = useState(false);
    // Callback function to update value in ParentComponent
    const handleCallback = (showConsent, isRefresh) => {
        onCallback(false, isRefresh);
    };
    if(!clickedReport) {
        return (
        <View style={[styles.container]}>
            <View>
                <Text style={[styles.headline]}>Ads by doceree</Text>
                <TouchableOpacity style={[styles.overlay]} onPress={() => onPressBack()}>
                    <Image source={ImageAssets.icBack} style={{ height: 12, width: 15, tintColor: Colors.purpleColor}} />
                </TouchableOpacity>
            </View>

            <View style={[styles.buttonRow]}>
                    <TouchableOpacity style={[styles.button]} onPress={() => onPressReportThisAd()}>
                        <Text style={{alignSelf:'center'}}> {Strings.StringsConsent.reportThisAd}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={() => onPressWhyThisAd()}>
                        <View style={[styles.icon]}>
                            <Text>{Strings.StringsConsent.whyThisAd}</Text>
                            <Image source={ImageAssets.icInfo} style={{ height: 15, width: 15, tintColor: Colors.purpleColor}} />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        )
    } else {
    console.log("element.id here: ",clickedReport)
        return (
//        <View style={[styles.container]}>
//            <Text style={{alignSelf:'center'}}> {StringsConsent.reportThisAd}</Text>
//            </View>
            <ConsentViewTwo onCallback={handleCallback} adResponse={adResponse}/>
        )
    }
}

export default ConsentViewOne

export const styling = (adResponse, isMediumRectangle) =>
    StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.grey1BackgroundColor,
        width: adWidth,
        height: adHeight,
    },
    overlay: {
        position: 'absolute',
        flexDirection: 'row',
        gap: 5,
        width: 20,
        height: 20
    },
    headline: {
        textAlign: 'center', // <-- the magic
        fontSize: 12,
        color: Colors.purpleColor,
    },
    button: {
        justifyContent: "center",
        color: Colors.black,
        backgroundColor: Colors.white1Color,
        width: buttonWidth,
        height: buttonHeight,
    },
    buttonRow:  {
        flex: 1,
        gap: 10,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: isMediumRectangle ? 'column' : 'row',
    },
        icon: {
                justifyContent: "center",
                alignSelf:'center',
                flexDirection: 'row',
                color: Colors.purpleColor,
            },
});
