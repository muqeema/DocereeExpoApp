
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../utils/Colors.js'
import Strings from '../utils/Strings.js'
import mediumRectangle from '../utils/Helpers.js'
import getAdTypeBySize from '../utils/AdTypeBySize.js'
import {Constants} from '../utils/constants.js'
import ThanksPage from './ThanksPage.js'
import { BlockLevel, getBlockLevelInfo } from '../constant/enums';

function ConsentViewThree({ onCallback, adResponse=null}) {
    adWidth = parseInt(typeof adResponse?.adSize !== 'undefined' ? (adResponse.adSize.split('x')[0]) : 0)
    adHeight = parseInt(typeof adResponse?.adSize !== 'undefined' ? (adResponse.adSize.split('x')[1]) : 0)

    isMediumRectangle = mediumRectangle(adResponse.adSize);
    buttonWidth = isMediumRectangle ? (adWidth * 0.9) : (adWidth * 0.23);
    buttonHeight = isMediumRectangle ? adHeight * 0.2 : adHeight * 0.90;

    isBanner = getAdTypeBySize(adResponse.adSize) == Constants.AdType.banner
    isSmallBanner = getAdTypeBySize(adResponse.adSize) == Constants.AdType.smallBanner
    console.log("isBanner,isSmallBanner",isBanner, isSmallBanner)

    const styles = styling(adResponse);
    const [clickedButton, setClickedButton] = useState(false);
    const [blockLevel, setBlockLevel] = useState(null);

    // Callback function to update value in ParentComponent
    function handleCallback(showConsent, isRefresh) {
        onCallback(false, isRefresh);
    }
    function onClickedForThanks(consentLabel) {
        setBlockLevel(getBlockLevelInfo(consentLabel).blockLevelCode);
        setClickedButton(true)
    }

    if(!clickedButton) {
        return (
            <View style={[styles.container]}>
                <View style={[styles.buttonRow]}>
                        <TouchableOpacity style={[styles.button]} onPress={() => onClickedForThanks(BlockLevel.NotInterestedInCampaign)}>
                            <Text style={[styles.headline]}> {Strings.StringsConsent3.productTypeAd}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={() => onClickedForThanks(BlockLevel.NotInterestedInBrand)}>
                            <Text style={[styles.headline]}>{Strings.StringsConsent3.brandTypeAd}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={() => onClickedForThanks(BlockLevel.NotInterestedInBrandType)}>
                            <Text style={[styles.headline]}>{Strings.StringsConsent3.categoryTypeAd}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button]} onPress={() => onClickedForThanks(BlockLevel.NotInterestedInClientType)}>
                            <Text style={[styles.headline]}>{Strings.StringsConsent3.pharmaTypeAd}</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <ThanksPage onCallback={handleCallback} adResponse={adResponse} adBlockLevel={blockLevel}/>
        )
    }
}

export default ConsentViewThree

export const styling = (adResponse) =>
    StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.grey1BackgroundColor,
        width: adWidth,
        height: adHeight,
    },
        headline: {
            textAlign: 'center', // <-- the magic
            alignSelf: 'center',
            fontSize: isSmallBanner ? Constants.FontSize.textFontSize7 : isBanner ? Constants.FontSize.textFontSize7 : Constants.FontSize.textFontSize12,
        },
    button: {
        justifyContent: "center",
        alignSelf:'center',
        color: Colors.black,
        backgroundColor: Colors.white1Color,
        width: buttonWidth,
        height: buttonHeight,
    },
    buttonRow:  {
        flex: 1,
        gap: 5,
        flexDirection: isMediumRectangle ? 'column' : 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
});
